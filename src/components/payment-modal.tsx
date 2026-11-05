"use client";

import React, { useState } from "react";
import { CheckCircle2, CreditCard, Shield, X, Receipt, Download, Printer } from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatINR } from "@/lib/utils";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
  category: string;
  amountPaise: number;
}

export function PaymentModal({
  isOpen,
  onClose,
  serviceTitle,
  category,
  amountPaise,
}: PaymentModalProps) {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [gstin, setGstin] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedPayment, setCompletedPayment] = useState<any | null>(null);

  if (!isOpen) return null;

  const gstPaise = Math.round(amountPaise * 0.18);
  const totalPaise = amountPaise + gstPaise;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const recorded = platformStore.recordPayment({
        clientName: clientName || "Valued Client",
        clientEmail: clientEmail || "client@domain.com",
        clientPhone: clientPhone || "+91 98000 00000",
        serviceCategory: category,
        itemDescription: serviceTitle,
        amountPaise,
        gstin: gstin || undefined,
      });
      setIsProcessing(false);
      setCompletedPayment(recorded);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white max-w-lg w-full rounded-card shadow-modal border border-border overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-accent-gold" />
            <h3 className="font-serif font-bold text-base">
              {completedPayment ? "Payment Receipt & Confirmation" : "Acorn Legal Secure Checkout"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!completedPayment ? (
            <form onSubmit={handlePay} className="space-y-4">
              <div className="bg-surface p-4 rounded border border-border-subtle">
                <div className="text-xs font-semibold text-ink-secondary uppercase tracking-wider">
                  Service / Retainer Item
                </div>
                <div className="font-semibold text-primary text-base mt-1">
                  {serviceTitle}
                </div>
                <div className="text-xs text-ink-secondary mt-0.5">
                  Category: {category}
                </div>

                <div className="mt-4 pt-3 border-t border-border flex justify-between items-center text-xs text-ink">
                  <span>Professional Fee:</span>
                  <span className="font-medium">{formatINR(amountPaise)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-ink mt-1">
                  <span>GST (18% Statutory):</span>
                  <span className="font-medium">{formatINR(gstPaise)}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-border flex justify-between items-center text-sm font-bold text-primary">
                  <span>Total Payable:</span>
                  <span className="text-base text-accent">{formatINR(totalPaise)}</span>
                </div>
              </div>

              {/* Client Billing Info */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-ink mb-1">
                    Full Name / Organisation Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Ananya Mukherjee or Bengal Cloud Ltd"
                    className="w-full text-xs px-3 py-2 border border-border rounded focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-ink mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="billing@company.com"
                      className="w-full text-xs px-3 py-2 border border-border rounded focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+91 98300 00000"
                      className="w-full text-xs px-3 py-2 border border-border rounded focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink mb-1">
                    GSTIN (Optional, for Input Tax Credit)
                  </label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    placeholder="19AAAAA0000A1Z5"
                    className="w-full text-xs px-3 py-2 border border-border rounded focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Gateway security assurance */}
              <div className="flex items-center gap-2 text-[11px] text-ink-secondary bg-surface p-2.5 rounded">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Processed securely via Razorpay PCI-DSS compliant 256-bit encrypted gateway. Official tax invoice and payment receipt issued instantly upon authorisation.
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Authorising Payment...</span>
                ) : (
                  <span>Pay {formatINR(totalPaise)} &amp; Generate Receipt</span>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="text-center py-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif font-bold text-lg text-ink">
                  Payment Successful
                </h4>
                <p className="text-xs text-ink-secondary">
                  Transaction authorised. Official receipt and tax invoice generated.
                </p>
              </div>

              {/* Receipt Details Box */}
              <div className="bg-surface p-4 rounded border border-border space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Receipt Number:</span>
                  <span className="font-mono font-semibold text-primary">{completedPayment.receiptNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Invoice Number:</span>
                  <span className="font-mono font-semibold text-primary">{completedPayment.invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Billed To:</span>
                  <span className="font-medium text-ink">{completedPayment.clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Amount Paid:</span>
                  <span className="font-bold text-emerald-700">{formatINR(completedPayment.totalPaise)} (incl. 18% GST)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Transaction Date:</span>
                  <span className="text-ink">{new Date().toLocaleString("en-IN")} IST</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2 px-3 border border-border text-xs font-medium rounded hover:bg-surface flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2 px-3 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

