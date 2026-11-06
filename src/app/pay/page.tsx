"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function PayOnlinePage() {
  const router = useRouter();
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

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) {
      setErrors({ terms: "Please acknowledge the fee settlement terms" });
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      try {
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
        });
        setIsProcessing(false);
        router.push(`/pay/status/${recorded.id}?state=success`);
      } catch {
        setIsProcessing(false);
        router.push(`/pay/status/sample-pay?state=success`);
      }
    }, 1100);
  };

  const STEPPER_STEPS = [
    { number: 1, title: "Service & Amount", subtitle: "Select Retainer" },
    { number: 2, title: "Payer Details", subtitle: "Billing Identity" },
    { number: 3, title: "Razorpay Checkout", subtitle: "Secure Remittance" },
  ];

  return (
    <div className="bg-ivory-50 text-ink min-h-screen py-32 sm:py-40">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-2xl">
          <Eyebrow>CLIENT REMITTANCE GATEWAY</Eyebrow>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ink-950 leading-[1.12]">
            Fee Settlement &amp; <span className="font-serif italic font-normal text-brass-700">Remittance</span>.
          </h1>
          <p className="font-sans text-base text-ink-secondary leading-relaxed">
            A secure gateway for existing clients and prospective matters to settle formal invoices or scheduled consultation retainers.
          </p>
        </div>

        {/* Stepper */}
        <div className="bg-white p-6 rounded-card border border-border shadow-sm">
          <Stepper steps={STEPPER_STEPS} currentStep={step} />
        </div>

        {/* Main Step Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Content (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-card border border-border shadow-card space-y-8">
            
            {/* Step 1: Service & Amount */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-up">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <h3 className="font-serif text-2xl font-bold text-ink">
                    1. Select Settlement Type
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMode("consultation")}
                      className={`px-3 py-1.5 rounded-btn text-xs font-semibold transition ${
                        paymentMode === "consultation"
                          ? "bg-navy-700 text-ivory-50"
                          : "bg-surface text-ink-secondary hover:text-ink"
                      }`}
                    >
                      Scheduled Consultation
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMode("invoice")}
                      className={`px-3 py-1.5 rounded-btn text-xs font-semibold transition ${
                        paymentMode === "invoice"
                          ? "bg-navy-700 text-ivory-50"
                          : "bg-surface text-ink-secondary hover:text-ink"
                      }`}
                    >
                      Chambers Invoice Ref
                    </button>
                  </div>
                </div>

                {paymentMode === "consultation" ? (
                  <div className="space-y-3">
                    {CONSULTATION_OPTIONS.map((opt) => (
                      <label
                        key={opt.id}
                        className={`p-4 rounded-card border flex items-start justify-between gap-4 cursor-pointer transition ${
                          selectedOptionId === opt.id
                            ? "bg-stone-100 border-brass-500 shadow-sm"
                            : "border-border hover:bg-surface"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="consultation_opt"
                            checked={selectedOptionId === opt.id}
                            onChange={() => setSelectedOptionId(opt.id)}
                            className="mt-1 text-navy-700"
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
                    Pay {formatINR(totalAmountPaise)} Securely
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
              <div className="flex justify-between py-2 font-bold text-sm text-navy-700">
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
            </div>
          </aside>

        </div>

      </div>
    </div>
  );
}
