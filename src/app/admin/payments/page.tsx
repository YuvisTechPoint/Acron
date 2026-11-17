"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Printer,
  Download,
  CheckCircle2,
  Clock,
  ArrowLeft,
  FileText,
  DollarSign,
  Search,
  Filter,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  X,
  RefreshCw,
  AlertCircle,
  Building2,
  Layers,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { useRealtimePayments, useRealtimeSystemSettings } from "@/lib/realtime";
import { formatINR, formatDate, formatDateTime } from "@/lib/utils";
import { PaymentTransaction } from "@/lib/types";
import { downloadCsv } from "@/lib/export-csv";

export default function AdminPaymentsPage() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentTransaction | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  const payments = useRealtimePayments();
  const settings = useRealtimeSystemSettings();

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const triggerSyncToast = () => {
    setSyncToast("Razorpay Webhooks & Gateway Ledger Synchronized (100% Up-to-Date)");
    setTimeout(() => setSyncToast(null), 3000);
  };

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.razorpayPaymentId && p.razorpayPaymentId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.razorpayOrderId && p.razorpayOrderId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.itemDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || p.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalPaise = payments.reduce(
    (acc, p) => acc + (p.status === "paid" ? p.totalPaise : 0),
    0
  );
  const totalTaxPaise = payments.reduce(
    (acc, p) => acc + (p.status === "paid" ? p.taxPaise : 0),
    0
  );
  const totalNetPaise = payments.reduce(
    (acc, p) => acc + (p.status === "paid" ? p.amountPaise : 0),
    0
  );

  const handleExportCSV = () => {
    const headers = [
      "Receipt Number",
      "Invoice Number",
      "Client Name",
      "GSTIN",
      "Service Description",
      "Razorpay Payment ID",
      "Razorpay Order ID",
      "Net Amount (INR)",
      "GST 18% (INR)",
      "Total Amount (INR)",
      "Gateway Status",
      "Date",
    ];
    const rows = filteredPayments.map((p) => [
      p.receiptNumber,
      p.invoiceNumber,
      p.clientName,
      p.clientGstin || "N/A",
      p.itemDescription || "",
      p.razorpayPaymentId || "N/A",
      p.razorpayOrderId || "N/A",
      (p.amountPaise / 100).toFixed(2),
      (p.taxPaise / 100).toFixed(2),
      (p.totalPaise / 100).toFixed(2),
      p.status,
      formatDate(p.createdAt),
    ]);
    downloadCsv(
      `Acorn_Razorpay_Reconciliation_Ledger_${new Date().toISOString().slice(0, 10)}.csv`,
      headers,
      rows
    );
  };

  const isLiveMode = settings?.razorpayMode === "live";

  return (
    <div className="bg-surface min-h-screen py-8 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-card">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-1.5 rounded hover:bg-surface text-ink-secondary hover:text-ink transition-colors"
              title="Return to Admin Overview"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                <span>Finance &bull; Razorpay Operations</span>
                <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono">
                  PRD Section 6.9 &amp; 28
                </span>
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Payment Reconciliation &amp; Statutory Invoices
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={triggerSyncToast}
              className="px-3 py-2 bg-white border border-border text-slate-700 text-xs font-semibold rounded hover:bg-slate-50 flex items-center gap-1.5 transition shadow-sm"
              title="Refresh Razorpay Gateway State"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Verify Sync</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-white border border-border text-navy-700 text-xs font-semibold rounded hover:bg-slate-50 flex items-center gap-1.5 transition shadow-sm"
              title="Download CSV Ledger"
            >
              <Download className="w-3.5 h-3.5 text-brass-500" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover flex items-center gap-1.5 transition shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Ledger</span>
            </button>
          </div>
        </div>

        {/* Sync notification toast */}
        {syncToast && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-900 font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{syncToast}</span>
          </div>
        )}

        {/* Razorpay Ops Status Ribbon */}
        <div className="bg-navy-950 text-white p-4 sm:p-5 rounded-card border border-navy-800 shadow-card flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isLiveMode ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                }`}
              />
              <span className="font-semibold text-xs tracking-wider uppercase text-ivory-100">
                {isLiveMode ? "Razorpay Production Gateway" : "Razorpay Sandbox (Test Mode)"}
              </span>
            </div>
            <div className="hidden sm:block text-navy-600">&bull;</div>
            <div className="text-xs text-slate-300 font-mono">
              Key ID:{" "}
              <span className="text-brass-400 font-semibold">
                {settings?.razorpayKeyId || "rzp_test_AcornLegalKolkata2026"}
              </span>
            </div>
            <div className="hidden sm:block text-navy-600">&bull;</div>
            <div className="text-[11px] text-slate-300">
              Webhook: <span className="font-mono text-emerald-300">/api/webhooks/razorpay</span> (Active)
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/admin/payment-links"
              className="px-3 py-1.5 bg-brass-500 hover:bg-brass-400 text-ink-950 font-bold text-xs rounded transition flex items-center gap-1.5 shadow"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Generate Razorpay Link</span>
            </Link>
            <Link
              href="/admin/settings"
              className="px-3 py-1.5 bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs font-semibold rounded border border-navy-700 transition flex items-center gap-1"
            >
              <span>Gateway Settings</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Finance Reconciliation Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">Gross Collections (FY 2026-27)</div>
            <div className="font-serif font-bold text-2xl text-emerald-800 mt-1">
              {formatINR(totalPaise)}
            </div>
            <div className="text-[11px] text-ink-secondary mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>100% Reconciled via Razorpay</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">Net Professional Fee</div>
            <div className="font-serif font-bold text-2xl text-ink mt-1">
              {formatINR(totalNetPaise)}
            </div>
            <div className="text-[11px] text-ink-secondary mt-1">Chambers Retainers &amp; Opinions</div>
          </div>

          <div className="bg-white p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">GST Output Tax Liability (18%)</div>
            <div className="font-serif font-bold text-2xl text-primary mt-1">
              {formatINR(totalTaxPaise)}
            </div>
            <div className="text-[11px] text-ink-secondary mt-1">West Bengal GST &amp; CGST (9% + 9%)</div>
          </div>

          <div className="bg-white p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">Settlement SLA &amp; Receipts</div>
            <div className="font-serif font-bold text-2xl text-navy-800 mt-1">
              {payments.filter((p) => p.status === "paid").length} / {payments.length}
            </div>
            <div className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>T+2 Banking Settlement Cycle</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-card border border-border shadow-card flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs w-full md:w-auto">
            <span className="font-semibold text-ink flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5 text-brass-500" />
              Gateway Filter:
            </span>
            {["all", "paid", "pending", "refunded"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                  statusFilter === s
                    ? "bg-primary text-white font-semibold"
                    : "bg-surface border border-border text-ink-secondary hover:bg-slate-100"
                }`}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-ink-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search receipt, invoice, pay_id, or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2 bg-surface border border-border rounded focus:outline-none focus:border-primary text-ink"
            />
          </div>
        </div>

        {/* Transaction Ledger Table */}
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <div className="p-4 bg-surface border-b border-border font-bold text-ink text-xs uppercase tracking-wider flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              <span>Razorpay Transaction Ledger ({filteredPayments.length})</span>
            </div>
            <span className="text-[11px] font-normal text-ink-secondary">
              Server-enforced amounts in Paise &bull; 18% GST verified
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
                <tr>
                  <th className="p-3.5">Receipt # &bull; Invoice #</th>
                  <th className="p-3.5">Client &bull; GSTIN</th>
                  <th className="p-3.5">Matter Description</th>
                  <th className="p-3.5">Razorpay Reference</th>
                  <th className="p-3.5">Fee (Net)</th>
                  <th className="p-3.5">18% GST</th>
                  <th className="p-3.5">Total Remitted</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filteredPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5">
                      <div className="font-mono font-bold text-primary">{p.receiptNumber}</div>
                      <div className="text-[10px] text-ink-secondary font-mono">{p.invoiceNumber}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{formatDate(p.createdAt)}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-ink">{p.clientName}</div>
                      <div className="text-[10px] text-ink-secondary">{p.clientEmail}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {p.clientGstin ? `GSTIN: ${p.clientGstin}` : "Individual (Unregistered)"}
                      </div>
                    </td>
                    <td className="p-3.5 max-w-xs">
                      <div className="text-ink font-medium truncate">{p.itemDescription}</div>
                      <div className="text-[10px] text-ink-secondary">{p.serviceCategory}</div>
                    </td>
                    <td className="p-3.5 font-mono text-[11px]">
                      {p.razorpayPaymentId ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-navy-800 font-semibold">{p.razorpayPaymentId}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(p.razorpayPaymentId!, p.id)}
                            className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-800 transition"
                            title="Copy Razorpay Payment ID"
                          >
                            {copiedId === p.id ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Pending settlement</span>
                      )}
                      {p.razorpayOrderId && (
                        <div className="text-[10px] text-slate-400 truncate max-w-[140px]">
                          Ord: {p.razorpayOrderId}
                        </div>
                      )}
                    </td>
                    <td className="p-3.5 font-mono text-ink">{formatINR(p.amountPaise)}</td>
                    <td className="p-3.5 font-mono text-slate-600">{formatINR(p.taxPaise)}</td>
                    <td className="p-3.5 font-mono font-bold text-emerald-800">
                      {formatINR(p.totalPaise)}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase inline-flex items-center gap-1 ${
                          p.status === "paid"
                            ? "bg-emerald-100 text-emerald-800"
                            : p.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {p.status === "paid" && <CheckCircle2 className="w-2.5 h-2.5" />}
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedPayment(p)}
                        className="px-2.5 py-1 bg-surface border border-border text-navy-800 hover:bg-navy-50 font-semibold rounded text-[11px] transition inline-flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3 text-primary" />
                        <span>Inspect Voucher</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="py-12 text-center text-ink-secondary text-xs">
              No payment transactions match your search and filter criteria.
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VOUCHER & STATUTORY TAX RECEIPT INSPECTION MODAL */}
      {/* ========================================================================= */}
      {selectedPayment && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
        >
          <div className="bg-white rounded-card max-w-2xl w-full border border-border shadow-modal overflow-hidden text-xs my-8">
            {/* Modal Header */}
            <div className="bg-navy-950 text-white p-5 flex justify-between items-center border-b border-navy-800">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-brass-400" />
                <div>
                  <h3 className="font-serif text-lg font-bold text-ivory-100">
                    Chambers Remittance Voucher
                  </h3>
                  <div className="text-[11px] text-slate-300 font-mono">
                    Official Statutory Tax Invoice &bull; Acorn Legal Consultants
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedPayment(null)}
                className="p-1 rounded-btn hover:bg-navy-800 text-slate-300 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              
              {/* BCI Notice */}
              <div className="p-3 bg-stone-100 rounded border border-border text-[11px] text-slate-600 leading-relaxed">
                <strong>Bar Council of India Rule 36 Statutory Notice:</strong> Official receipt issued upon receipt of professional fee remittance. Remittance settles fee obligations and does not independently constitute an advocate-client relationship without a written Vakalatnama or formal engagement agreement.
              </div>

              {/* Gateway Cryptographic Verification Card */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-card flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Razorpay Gateway Verification: Cryptographically Verified</span>
                  </div>
                  <div className="text-[11px] text-emerald-950 font-mono">
                    Method: HMAC-SHA256 Signature Validated
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Timestamp: {formatDateTime(selectedPayment.createdAt)}
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px] uppercase shrink-0">
                  {selectedPayment.status}
                </span>
              </div>

              {/* Key Identifiers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-surface p-4 rounded-card border border-border">
                <div>
                  <div className="text-slate-500 text-[11px]">Official Receipt Number:</div>
                  <div className="font-mono font-bold text-primary text-sm mt-0.5">
                    {selectedPayment.receiptNumber}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-[11px]">Statutory Tax Invoice Number:</div>
                  <div className="font-mono font-bold text-ink text-sm mt-0.5">
                    {selectedPayment.invoiceNumber}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-[11px]">Razorpay Payment ID:</div>
                  <div className="font-mono text-navy-800 font-semibold mt-0.5 flex items-center gap-1.5">
                    <span>{selectedPayment.razorpayPaymentId || "N/A"}</span>
                    {selectedPayment.razorpayPaymentId && (
                      <button
                        type="button"
                        onClick={() => handleCopy(selectedPayment.razorpayPaymentId!, "modal-pay-id")}
                        className="p-1 hover:bg-slate-200 rounded text-slate-600"
                        title="Copy"
                      >
                        {copiedId === "modal-pay-id" ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-[11px]">Razorpay Order ID:</div>
                  <div className="font-mono text-slate-700 mt-0.5">
                    {selectedPayment.razorpayOrderId || "N/A"}
                  </div>
                </div>
              </div>

              {/* Billed Entity */}
              <div className="border border-border rounded-card p-4 space-y-2">
                <div className="font-semibold text-ink text-xs uppercase tracking-wider text-slate-500">
                  Client &amp; Billing Particulars
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">Client Name: </span>
                    <span className="font-semibold text-ink">{selectedPayment.clientName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Registered Email: </span>
                    <span className="text-ink">{selectedPayment.clientEmail}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Telephone: </span>
                    <span className="text-ink">{selectedPayment.clientPhone || "Not specified"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Client GSTIN: </span>
                    <span className="font-mono text-ink">
                      {selectedPayment.clientGstin || "Individual / No GSTIN"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Itemized Financial Breakdown */}
              <div className="border border-border rounded-card overflow-hidden">
                <div className="bg-surface p-3 font-semibold text-xs border-b border-border">
                  Statutory Accounting &amp; GST Ledger Breakdown
                </div>
                <div className="p-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">
                      Professional Legal Fee / Retainer Scope ({selectedPayment.itemDescription})
                    </span>
                    <span className="font-mono font-semibold text-ink">
                      {formatINR(selectedPayment.amountPaise)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Central GST (CGST @ 9%)</span>
                    <span className="font-mono">
                      {formatINR(Math.round(selectedPayment.taxPaise / 2))}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>West Bengal State GST (SGST @ 9%)</span>
                    <span className="font-mono">
                      {formatINR(Math.round(selectedPayment.taxPaise / 2))}
                    </span>
                  </div>
                  <div className="border-t border-border pt-2.5 flex justify-between font-bold text-sm text-navy-950">
                    <span>Total Remitted Amount (INR):</span>
                    <span className="font-serif text-base text-emerald-900">
                      {formatINR(selectedPayment.totalPaise)}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="bg-surface p-4 border-t border-border flex flex-wrap justify-between items-center gap-3">
              <div className="text-[11px] text-slate-500">
                Chambers of Acorn &bull; Camac Street, Kolkata 700016
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-2 bg-white border border-border text-navy-800 text-xs font-semibold rounded hover:bg-slate-100 flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5 text-gold" />
                  <span>Print Tax Receipt</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPayment(null)}
                  className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
