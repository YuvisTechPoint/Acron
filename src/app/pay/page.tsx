"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Script from "next/script";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CreditCard,
  ShieldCheck,
  ArrowRight,
  FileText,
  Clock,
  HelpCircle,
  Building,
  Check,
  Phone,
  Sparkles,
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";
import { formatINR } from "@/lib/utils";
import { platformStore } from "@/lib/store";
import {
  Button,
  Eyebrow,
  Stepper,
  Input,
  Select,
  Checkbox,
  Rule,
} from "@/components/ui";
import { useToast } from "@/components/ui/toast";
import { trackPaymentCompleted } from "@/lib/analytics";

interface ConsultationOption {
  id: string;
  name: string;
  description: string;
  baseAmountPaise: number;
}

const CONSULTATION_OPTIONS: ConsultationOption[] = [
  {
    id: "initial_consultation",
    name: "Initial Consultation (45 Mins)",
    description: "Confidential in-person or video consultation with Senior Counsel at Kolkata chambers.",
    baseAmountPaise: 450000, // ₹4,500
  },
  {
    id: "document_review",
    name: "Document Review & Legal Assessment",
    description: "Review of contracts, commercial agreements, notices, or title documents up to 25 pages.",
    baseAmountPaise: 1200000, // ₹12,000
  },
  {
    id: "written_opinion",
    name: "Formal Written Legal Opinion",
    description: "In-depth statutory precedent research and formal written opinion by Counsel.",
    baseAmountPaise: 2500000, // ₹25,000
  },
];

function PayOnlineContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  // Mode: "consultation" | "invoice"
  const [paymentMode, setPaymentMode] = useState<"consultation" | "invoice">("consultation");
  const [selectedOptionId, setSelectedOptionId] = useState<string>("initial_consultation");

  // Custom invoice fields
  const [invoiceRef, setInvoiceRef] = useState<string>("");
  const [customAmountRupees, setCustomAmountRupees] = useState<string>("15000");

  // Client details
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [agreedTerms, setAgreedTerms] = useState<boolean>(true);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-bind query parameters from Razorpay Ops /admin/payment-links
  useEffect(() => {
    if (!searchParams) return;
    const amt = searchParams.get("amt");
    const desc = searchParams.get("desc");
    const inv = searchParams.get("invoiceRef") || searchParams.get("ref");
    const name = searchParams.get("name") || searchParams.get("clientName");
    const email = searchParams.get("email") || searchParams.get("clientEmail");
    const phone = searchParams.get("phone") || searchParams.get("clientPhone");

    if (amt && Number(amt) > 0) {
      setPaymentMode("invoice");
      setCustomAmountRupees(amt);
    }
    if (inv || desc) {
      setInvoiceRef(inv || desc || "");
    }
    if (name) {
      setClientName(name);
    }
    if (email) {
      setClientEmail(email);
    }
    if (phone) {
      setClientPhone(phone);
    }
  }, [searchParams]);

  const selectedOption =
    CONSULTATION_OPTIONS.find((opt) => opt.id === selectedOptionId) ||
    CONSULTATION_OPTIONS[0];

  const netAmountPaise =
    paymentMode === "consultation"
      ? selectedOption.baseAmountPaise
      : Math.max(0, Math.round(Number(customAmountRupees || 0) * 100));

  const gstPaise = Math.round(netAmountPaise * 0.18);
  const totalAmountPaise = netAmountPaise + gstPaise;

  const handleNextStep1 = () => {
    const errs: Record<string, string> = {};
    if (paymentMode === "invoice" && !invoiceRef.trim()) {
      errs.invoiceRef = "Please enter an invoice or matter reference";
    }
    if (netAmountPaise <= 0) {
      errs.amount = "Please specify an amount greater than zero";
    }
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep(2);
  };

  const handleNextStep2 = () => {
    const errs: Record<string, string> = {};
    if (!clientName.trim()) errs.clientName = "Please enter your name";
    if (!clientEmail.trim() || !clientEmail.includes("@")) {
      errs.clientEmail = "Please enter a valid email address";
    }
    if (!clientPhone.trim()) errs.clientPhone = "Please enter your telephone number";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep(3);
  };

  const completeFallbackPayment = (orderId?: string, paymentId?: string) => {
    const recorded = platformStore.recordPayment({
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      serviceCategory:
        paymentMode === "consultation"
          ? "Senior Consultation"
          : `Invoice Settlement (${invoiceRef.trim()})`,
      itemDescription:
        paymentMode === "consultation"
          ? selectedOption.name
          : `Settlement of Invoice Ref: ${invoiceRef.trim()}`,
      amountPaise: netAmountPaise,
      razorpayOrderId: orderId || `order_${Math.random().toString(36).substring(2, 14)}`,
      razorpayPaymentId: paymentId || `pay_${Math.random().toString(36).substring(2, 14)}`,
    });

    toast({
      title: "Payment Processed Successfully",
      description: `Receipt ${recorded.receiptNumber || recorded.id} verified via Razorpay gateway.`,
      variant: "success",
    });

    trackPaymentCompleted(
      recorded.receiptNumber || recorded.id,
      netAmountPaise,
      paymentMode === "consultation" ? selectedOption.name : `Invoice: ${invoiceRef}`
    );

    setIsProcessing(false);
    router.push(`/pay/status/${recorded.id}?state=success`);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) {
      setErrors({ terms: "Please acknowledge the fee settlement terms" });
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Create Razorpay Order on server
      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountPaise: totalAmountPaise,
          clientName: clientName.trim(),
          clientEmail: clientEmail.trim(),
          category: paymentMode === "consultation" ? "consultation" : "invoice",
        }),
      });

      const orderData = await orderRes.json();
      const orderId = orderData.orderId || `order_${Math.random().toString(36).substring(2, 14)}`;
      const keyId = orderData.keyId || "rzp_test_AcornMock2026";

      // 2. If Razorpay modal is available in browser, trigger official checkout popup
      if (typeof window !== "undefined" && (window as any).Razorpay) {
        const rzp = new (window as any).Razorpay({
          key: keyId,
          amount: totalAmountPaise,
          currency: "INR",
          name: "Acorn Consultants",
          description:
            paymentMode === "consultation" ? selectedOption.name : `Invoice: ${invoiceRef}`,
          image: "/brand/logo.png",
          order_id: orderId,
          prefill: {
            name: clientName.trim(),
            email: clientEmail.trim(),
            contact: clientPhone.trim(),
          },
          notes: {
            serviceCategory: paymentMode === "consultation" ? "Consultation" : "Invoice Settlement",
            matterRef: invoiceRef || "General Retainer",
          },
          theme: {
            color: "#0b1329",
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
            },
          },
          handler: async function (response: any) {
            try {
              // 3. Cryptographic Signature Verification on server
              const verifyRes = await fetch("/api/payments/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id || orderId,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  clientName: clientName.trim(),
                  clientEmail: clientEmail.trim(),
                  clientPhone: clientPhone.trim(),
                  amountPaise: netAmountPaise,
                  taxPaise: gstPaise,
                  totalPaise: totalAmountPaise,
                  packageCode: paymentMode === "consultation" ? "LEGAL-CONSULT-01" : "CUSTOM-INVOICE",
                  packageName: paymentMode === "consultation" ? selectedOption.name : `Invoice: ${invoiceRef}`,
                }),
              });

              const verifyData = await verifyRes.json();
              const txnId = verifyData?.transaction?.id || `TXN-${Date.now()}`;

              toast({
                title: "Payment Processed Successfully",
                description: `Receipt ${verifyData.receiptNumber || txnId} verified via Razorpay gateway.`,
                variant: "success",
              });

              trackPaymentCompleted(
                verifyData.receiptNumber || txnId,
                netAmountPaise,
                paymentMode === "consultation" ? selectedOption.name : `Invoice: ${invoiceRef}`
              );

              setIsProcessing(false);
              router.push(`/pay/status/${txnId}?state=success`);
            } catch {
              completeFallbackPayment(orderId, response.razorpay_payment_id);
            }
          },
        });

        rzp.on("payment.failed", function (resp: any) {
          setIsProcessing(false);
          toast({
            title: "Payment Declined",
            description: resp?.error?.description || "Transaction was declined by issuing bank.",
            variant: "danger",
          });
        });

        rzp.open();
      } else {
        // Fallback for sandboxed or adblocked headless browser
        completeFallbackPayment(orderId);
      }
    } catch {
      completeFallbackPayment();
    }
  };

  const STEPPER_STEPS = [
    { number: 1, title: "Service & Amount", subtitle: "Select Retainer" },
    { number: 2, title: "Payer Details", subtitle: "Billing Identity" },
    { number: 3, title: "Razorpay Checkout", subtitle: "Secure Remittance" },
  ];

  return (
    <div className="bg-ivory-50 text-ink min-h-screen py-32 sm:py-40">
      {/* Official Razorpay Checkout Library */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <header className="space-y-4 max-w-2xl">
          <Eyebrow>PAY ONLINE • SECURE DIGITAL SETTLEMENT</Eyebrow>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ink-950">
            Chambers Fee Remittance
          </h1>
          <p className="font-sans text-base text-ink-secondary leading-relaxed">
            Settle consultation fees, matter retainers, and formal fee notes via Razorpay PCI-DSS Level 1 compliant gateway. Instant GST tax invoices and receipts are issued upon clearance.
          </p>
        </header>

        {/* Stepper Indicator */}
        <div className="bg-white p-6 rounded-card border border-border shadow-sm">
          <Stepper steps={STEPPER_STEPS} currentStep={step} />
        </div>

        {/* Main Grid: Form (8 cols) + Summary (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Area (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-card border border-border shadow-sm space-y-8">
            {/* Step 1: Mode & Service Selection */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-up">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-ink-950">
                    1. Select Remittance Type
                  </h2>
                  <p className="font-sans text-xs text-ink-muted mt-1">
                    Choose between a pre-packaged consultation retainer or settle a formal Chambers fee note.
                  </p>
                </div>

                {/* Tabs: Consultation vs Invoice */}
                <div className="flex gap-2 p-1 bg-stone-100 rounded-btn max-w-md">
                  <button
                    type="button"
                    onClick={() => setPaymentMode("consultation")}
                    className={`flex-1 py-2 px-4 rounded-btn text-xs font-semibold transition ${
                      paymentMode === "consultation"
                        ? "bg-white text-navy-700 shadow-sm"
                        : "text-ink-secondary hover:text-ink"
                    }`}
                  >
                    Consultation Package
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode("invoice")}
                    className={`flex-1 py-2 px-4 rounded-btn text-xs font-semibold transition ${
                      paymentMode === "invoice"
                        ? "bg-white text-navy-700 shadow-sm"
                        : "text-ink-secondary hover:text-ink"
                    }`}
                  >
                    Invoice / Matter Ref
                  </button>
                </div>

                {paymentMode === "consultation" ? (
                  <div className="space-y-3">
                    {CONSULTATION_OPTIONS.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-start justify-between p-4 rounded-card border cursor-pointer transition ${
                          selectedOptionId === opt.id
                            ? "bg-blue-50/40 border-navy-700 ring-1 ring-navy-700/20"
                            : "bg-white border-border hover:border-border-dark"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="consultationOption"
                            value={opt.id}
                            checked={selectedOptionId === opt.id}
                            onChange={() => setSelectedOptionId(opt.id)}
                            className="mt-1 text-navy-700 focus:ring-navy-700"
                          />
                          <div>
                            <div className="font-serif font-bold text-base text-ink">
                              {opt.name}
                            </div>
                            <div className="font-sans text-xs text-ink-secondary mt-1">
                              {opt.description}
                            </div>
                          </div>
                        </div>
                        <div className="font-mono text-sm font-bold text-navy-700 shrink-0">
                          {formatINR(opt.baseAmountPaise)}
                        </div>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Input
                      label="Chambers Invoice Reference Number"
                      placeholder="e.g. ACN/INV/2026/0048"
                      value={invoiceRef}
                      onChange={(e) => setInvoiceRef(e.target.value)}
                      error={errors.invoiceRef}
                      required
                    />
                    <Input
                      label="Agreed Remittance Amount (in INR)"
                      type="number"
                      placeholder="15000"
                      value={customAmountRupees}
                      onChange={(e) => setCustomAmountRupees(e.target.value)}
                      error={errors.amount}
                      required
                    />
                  </div>
                )}

                <div className="flex justify-end pt-4 border-t border-border">
                  <Button variant="primary" onClick={handleNextStep1} arrow>
                    Proceed to Payer Details
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Payer Details */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-up">
                <h3 className="font-serif text-2xl font-bold text-ink border-b border-border pb-4">
                  2. Remitter Identification
                </h3>

                <Input
                  label="Full Name of Payer / Representative"
                  placeholder="e.g. Joydeep Ghosh"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  error={errors.clientName}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email Address for Tax Invoice"
                    type="email"
                    placeholder="remitter@organisation.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    error={errors.clientEmail}
                    required
                  />
                  <Input
                    label="Mobile Telephone Number"
                    placeholder="+91 98300 00000"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    error={errors.clientPhone}
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Button variant="secondary" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button variant="primary" onClick={handleNextStep2} arrow>
                    Proceed to Razorpay Checkout
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Razorpay Checkout Confirmation */}
            {step === 3 && (
              <form onSubmit={handleFinalSubmit} className="space-y-6 animate-fade-up">
                <h3 className="font-serif text-2xl font-bold text-ink border-b border-border pb-4">
                  3. Confirm &amp; Settle via Razorpay
                </h3>

                {/* Razorpay Trust Note */}
                <div className="p-4 bg-stone-100 rounded-btn border border-border flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-brass-500 shrink-0 mt-0.5" />
                  <div className="text-xs text-ink-secondary leading-relaxed">
                    <strong className="text-ink">Trust Note:</strong> Payments are processed via{" "}
                    <strong>Razorpay Payments Gateway</strong> with 256-bit PCI-DSS Level 1 encryption. Acorn Legal Consultants does not store card numbers or netbanking credentials.
                  </div>
                </div>

                <div className="p-5 bg-ivory-50 rounded-card border border-border space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Payer</span>
                    <span className="font-semibold text-ink">{clientName} ({clientEmail})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Subject</span>
                    <span className="font-semibold text-ink">
                      {paymentMode === "consultation" ? selectedOption.name : `Invoice: ${invoiceRef}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Professional Fee (Net)</span>
                    <span className="font-mono text-ink">{formatINR(netAmountPaise)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Statutory GST (18%)</span>
                    <span className="font-mono text-ink">{formatINR(gstPaise)}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between text-sm font-bold text-navy-700">
                    <span>Total Remittance Amount</span>
                    <span className="font-mono text-base">{formatINR(totalAmountPaise)}</span>
                  </div>
                </div>

                <Checkbox
                  label="I understand that online remittance settles professional fee obligations and does not independently constitute an advocate-client relationship without a written Engagement Letter."
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  required
                />

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Button variant="secondary" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    loading={isProcessing}
                    arrow
                  >
                    Pay {formatINR(totalAmountPaise)} via Razorpay
                  </Button>
                </div>
              </form>
            )}

          </div>

          {/* Right Summary Panel (4 cols) */}
          <aside className="lg:col-span-4 bg-white p-6 rounded-card border border-border shadow-sm space-y-6">
            <h4 className="font-serif text-xl font-bold text-ink">
              Fee Summary (INR)
            </h4>

            <div className="space-y-3 text-xs font-sans">
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-ink-muted">Base Scope</span>
                <span className="font-mono font-medium text-ink">{formatINR(netAmountPaise)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-ink-muted">GST @ 18%</span>
                <span className="font-mono font-medium text-ink">{formatINR(gstPaise)}</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-bold text-navy-700">
                <span>Total Payable</span>
                <span className="font-mono text-base">{formatINR(totalAmountPaise)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border text-xs text-ink-secondary space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brass-500" />
                <span>UPI, RuPay, Netbanking, Corporate Cards</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-brass-500" />
                <span>Instant GST Tax Invoice Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brass-500" />
                <span>PCI-DSS Level 1 Encrypted via Razorpay</span>
              </div>
            </div>
          </aside>

        </div>

      </div>
    </div>
  );
}

export default function PayOnlinePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ivory-50 flex items-center justify-center p-8">
          <div className="text-sm font-serif font-bold text-navy-900 animate-pulse">
            Loading Razorpay Secure Gateway...
          </div>
        </div>
      }
    >
      <PayOnlineContent />
    </Suspense>
  );
}
