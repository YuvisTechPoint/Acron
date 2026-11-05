"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  Download,
  ArrowLeft,
  RotateCcw,
  Phone,
  Mail,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatINR, formatDate } from "@/lib/utils";
import { BRAND_CONFIG } from "@/lib/constants";

function PaymentStatusContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const paymentId = (params?.id as string) || "";
  const queryState = searchParams.get("state") as "success" | "failed" | "pending" | null;

  // Read recorded payment if exists
  const payments = platformStore.getPayments();
  const recorded = payments.find((p) => p.id === paymentId) || payments[0] || {
    id: paymentId || "PAY-SAMPLE-01",
    receiptNumber: "ACN/RC/2026/000412",
    invoiceNumber: "ACN/INV/2026/000412",
    clientName: "Subir Chakraborty",
    clientEmail: "subir@example.com",
    serviceCategory: "Senior Consultation",
    itemDescription: "Initial Consultation (45 Mins)",
    amountPaise: 450000,
    taxPaise: 81000,
    totalPaise: 531000,
    createdAt: new Date().toISOString(),
  };

  const [status, setStatus] = useState<"success" | "failed" | "pending">(
    queryState || "success"
  );

  const [pendingTimer, setPendingTimer] = useState<number>(5);

  useEffect(() => {
    if (status === "pending") {
      const interval = setInterval(() => {
        setPendingTimer((prev) => {
          if (prev <= 1) {
            setStatus("success");
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <div className="bg-ivory-50 min-h-screen py-16 md:py-28 text-ink">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* Toggle bar for demonstration / testing (Success, Failed, Pending) */}
        <div className="mb-6 flex items-center justify-between bg-white px-4 py-2.5 rounded-btn border border-border text-xs text-slate">
          <span>View payment status states:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setStatus("success")}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                status === "success"
                  ? "bg-emerald-100 text-emerald-800"
                  : "hover:bg-slate-100 text-slate"
              }`}
            >
              Success
            </button>
            <button
              onClick={() => setStatus("pending")}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                status === "pending"
                  ? "bg-amber-100 text-amber-800"
                  : "hover:bg-slate-100 text-slate"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatus("failed")}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                status === "failed"
                  ? "bg-red-100 text-red-800"
                  : "hover:bg-slate-100 text-slate"
              }`}
            >
              Failed
            </button>
          </div>
        </div>

        {/* ===================== SUCCESS STATE ===================== */}
        {status === "success" && (
          <div className="bg-white rounded-card p-6 sm:p-10 border border-border shadow-modal space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
                Payment Confirmed
              </h1>
              <p className="text-xs sm:text-sm text-slate max-w-md mx-auto leading-relaxed">
                Thank you. Your remittance has been processed securely via Razorpay and verified by our registry.
              </p>
            </div>

            {/* Receipt Details Card */}
            <div className="bg-surface rounded-card p-5 sm:p-6 border border-border space-y-3 text-xs">
              <div className="flex justify-between border-b border-border pb-2.5">
                <span className="text-slate">Receipt Number:</span>
                <span className="font-mono font-bold text-navy">
                  {recorded.receiptNumber || `ACN/RC/2026/${paymentId.slice(-6) || "000412"}`}
                </span>
              </div>

              <div className="flex justify-between border-b border-border pb-2.5">
                <span className="text-slate">Statutory Tax Invoice:</span>
                <span className="font-mono font-bold text-navy">
                  {recorded.invoiceNumber || `ACN/INV/2026/${paymentId.slice(-6) || "000412"}`}
                </span>
              </div>

              <div className="flex justify-between border-b border-border pb-2.5">
                <span className="text-slate">Razorpay Payment ID:</span>
                <span className="font-mono text-slate font-medium">
                  {`pay_rzp_${paymentId.slice(0, 10) || "Acorn8912"}`}
                </span>
              </div>

              <div className="flex justify-between border-b border-border pb-2.5">
                <span className="text-slate">Date &amp; Time:</span>
                <span className="font-medium text-ink">
                  {formatDate(recorded.createdAt || new Date().toISOString())}
                </span>
              </div>

              <div className="flex justify-between border-b border-border pb-2.5">
                <span className="text-slate">Billed Client:</span>
                <span className="font-medium text-ink">{recorded.clientName}</span>
              </div>

              <div className="flex justify-between border-b border-border pb-2.5">
                <span className="text-slate">Matter / Service:</span>
                <span className="font-medium text-ink text-right max-w-[240px]">
                  {recorded.itemDescription}
                </span>
              </div>

              <div className="flex justify-between border-b border-border pb-2.5">
                <span className="text-slate">Net Fee:</span>
                <span className="font-mono text-ink">{formatINR(recorded.amountPaise)}</span>
              </div>

              <div className="flex justify-between border-b border-border pb-2.5">
                <span className="text-slate">Output GST (18%):</span>
                <span className="font-mono text-ink">{formatINR(recorded.taxPaise)}</span>
              </div>

              <div className="flex justify-between pt-1 font-bold text-sm text-navy">
                <span>Total Amount Paid:</span>
                <span className="font-serif text-base text-navy font-bold">
                  {formatINR(recorded.totalPaise)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-white border border-border hover:bg-surface text-navy text-xs font-semibold rounded-btn transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-gold" />
                <span>Print / Download Tax Receipt</span>
              </button>

              <Link
                href="/"
                className="flex-1 py-3 bg-navy hover:bg-blue-hover text-white text-xs font-semibold uppercase tracking-wider rounded-btn transition-colors text-center"
              >
                Return to Homepage
              </Link>
            </div>

            {/* Note */}
            <p className="text-[11px] text-slate text-center leading-relaxed">
              An official GST invoice copy has been dispatched to {recorded.clientEmail || "your email"}. For accounting inquiries, contact <a href="mailto:chambers@acornlegal.in" className="underline text-navy">chambers@acornlegal.in</a>.
            </p>
          </div>
        )}

        {/* ===================== FAILED STATE ===================== */}
        {status === "failed" && (
          <div className="bg-white rounded-card p-6 sm:p-10 border border-border shadow-modal space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto border border-red-200">
                <XCircle className="w-8 h-8" />
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
                Payment Not Completed
              </h1>
              <p className="text-xs sm:text-sm text-slate max-w-md mx-auto leading-relaxed">
                The transaction could not be completed. Your account has not been debited. If an amount was deducted, your bank will release it within 3–5 working days.
              </p>
            </div>

            {/* Failure Reason */}
            <div className="bg-red-50/60 rounded-card p-4 border border-red-100 text-xs text-red-900 space-y-1">
              <span className="font-semibold block">Gateway Advisory:</span>
              <p className="text-red-800 leading-relaxed">
                The issuing bank or card network did not approve the transaction, or the session expired before confirmation.
              </p>
            </div>

            {/* Assistance Card */}
            <div className="bg-surface rounded-card p-5 border border-border space-y-3 text-xs">
              <span className="font-semibold text-navy block text-sm">Chambers Assistance</span>
              <p className="text-slate leading-relaxed">
                If you encounter repeated gateway issues, you may also remit fees via direct RTGS/NEFT to our official chambers bank account or arrange payment by cheque.
              </p>
              <div className="pt-1 flex flex-col sm:flex-row gap-4 text-navy">
                <a href={`tel:${BRAND_CONFIG.phone.replace(/[^0-9+]/g, "")}`} className="flex items-center gap-2 font-medium hover:underline">
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  <span>Call Chambers: {BRAND_CONFIG.phone}</span>
                </a>
                <a href="mailto:chambers@acornlegal.in" className="flex items-center gap-2 font-medium hover:underline">
                  <Mail className="w-3.5 h-3.5 text-gold" />
                  <span>Email: chambers@acornlegal.in</span>
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/pay"
                className="flex-1 py-3 bg-navy hover:bg-blue-hover text-white text-xs font-semibold uppercase tracking-wider rounded-btn transition-colors text-center flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4 text-gold" />
                <span>Retry Payment</span>
              </Link>
              <Link
                href="/contact"
                className="flex-1 py-3 bg-white border border-border hover:bg-surface text-navy text-xs font-semibold rounded-btn transition-colors text-center"
              >
                Contact Chambers
              </Link>
            </div>
          </div>
        )}

        {/* ===================== PENDING STATE ===================== */}
        {status === "pending" && (
          <div className="bg-white rounded-card p-6 sm:p-10 border border-border shadow-modal space-y-6 text-center">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-200 animate-pulse">
              <Clock className="w-8 h-8" />
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
              Payment Verification Pending
            </h1>

            <p className="text-xs sm:text-sm text-slate max-w-md mx-auto leading-relaxed">
              We are awaiting final settlement confirmation from Razorpay and your bank network. Please do not close or refresh this tab.
            </p>

            <div className="inline-block bg-surface px-4 py-2 rounded-btn border border-border font-mono text-xs text-navy">
              Auto-checking gateway status in {pendingTimer}s...
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => setStatus("success")}
                className="px-6 py-2.5 bg-navy hover:bg-blue-hover text-white text-xs font-semibold rounded-btn transition-colors"
              >
                Check Status Now
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-surface min-h-[60vh] flex items-center justify-center py-20 text-center">
          <div className="text-xs font-semibold text-navy">Loading payment status...</div>
        </div>
      }
    >
      <PaymentStatusContent />
    </Suspense>
  );
}
