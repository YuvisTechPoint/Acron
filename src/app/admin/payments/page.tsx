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
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { useRealtimePayments } from "@/lib/realtime";
import { formatINR, formatDate, formatDateTime } from "@/lib/utils";
import { PaymentTransaction } from "@/lib/types";

export default function AdminPaymentsPage() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentTransaction | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const payments = useRealtimePayments();

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.itemDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalPaise = payments.reduce((acc, p) => acc + (p.status === "paid" ? p.totalPaise : 0), 0);
  const totalTaxPaise = payments.reduce((acc, p) => acc + (p.status === "paid" ? p.taxPaise : 0), 0);

  const handleExportCSV = () => {
    const headers = ["Receipt Number", "Invoice Number", "Client Name", "GSTIN", "Service Description", "Amount (INR)", "GST 18% (INR)", "Total (INR)", "Status", "Date"];
    const rows = payments.map((p) => [
      `"${p.receiptNumber}"`,
      `"${p.invoiceNumber}"`,
      `"${p.clientName}"`,
      `"${p.clientGstin || ""}"`,
      `"${(p.itemDescription || "").replace(/"/g, '""')}"`,
      (p.amountPaise / 100).toFixed(2),
      (p.taxPaise / 100).toFixed(2),
      (p.totalPaise / 100).toFixed(2),
      p.status,
      `"${formatDate(p.createdAt)}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Acorn_Payments_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-card">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-1.5 rounded hover:bg-surface text-ink-secondary hover:text-ink transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-bold">
                Finance &amp; Razorpay Gateway
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Payment Reconciliation &amp; Tax Invoices
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
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
              className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Ledger</span>
            </button>
          </div>
        </div>

        {/* Finance Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">Gross Collections (FY 2026-27)</div>
            <div className="font-serif font-bold text-2xl text-emerald-800 mt-1">
              {formatINR(totalPaise)}
            </div>
            <div className="text-[11px] text-ink-secondary mt-1">Including 18% GST</div>
          </div>

          <div className="bg-white p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">GST Output Tax Liability (18%)</div>
            <div className="font-serif font-bold text-2xl text-primary mt-1">
              {formatINR(totalTaxPaise)}
            </div>
            <div className="text-[11px] text-ink-secondary mt-1">Payable under West Bengal GST</div>
          </div>

          <div className="bg-white p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">Receipts Generated</div>
            <div className="font-serif font-bold text-2xl text-ink mt-1">{payments.length}</div>
            <div className="text-[11px] text-emerald-700 mt-1">100% Reconciled</div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-card border border-border shadow-card flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs w-full md:w-auto">
            <span className="font-semibold text-ink flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5 text-brass-500" />
              Status:
            </span>
            {["all", "paid", "pending", "refunded"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                  statusFilter === s
                    ? "bg-primary text-white"
                    : "bg-surface border border-border text-ink-secondary hover:bg-slate-100"
                }`}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-ink-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search receipt, invoice, or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2 bg-surface border border-border rounded focus:outline-none focus:border-primary text-ink"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <div className="p-4 bg-surface border-b border-border font-bold text-ink text-xs uppercase tracking-wider flex justify-between items-center">
            <span>Transaction Ledger ({filteredPayments.length})</span>
            <span className="text-[11px] font-normal text-ink-secondary">Showing matched records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
                <tr>
                  <th className="p-3.5">Receipt # &bull; Invoice #</th>
                  <th className="p-3.5">Client &bull; GSTIN</th>
                  <th className="p-3.5">Service Description</th>
                  <th className="p-3.5">Fee (excl. tax)</th>
                  <th className="p-3.5">18% GST</th>
                  <th className="p-3.5">Total Paid</th>
                  <th className="p-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filteredPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-surface transition-colors">
                    <td className="p-3.5">
                      <div className="font-mono font-bold text-primary">{p.receiptNumber}</div>
                      <div className="text-[10px] text-ink-secondary font-mono">{p.invoiceNumber}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-ink">{p.clientName}</div>
                      <div className="text-[10px] text-ink-secondary">{p.clientGstin || "Individual / No GSTIN"}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="text-ink">{p.itemDescription}</div>
                      <div className="text-[10px] text-ink-secondary">{p.serviceCategory}</div>
                    </td>
                    <td className="p-3.5 font-medium text-ink">{formatINR(p.amountPaise)}</td>
                    <td className="p-3.5 font-medium text-slate-600">{formatINR(p.taxPaise)}</td>
                    <td className="p-3.5 font-bold text-emerald-800">{formatINR(p.totalPaise)}</td>
                    <td className="p-3.5 text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                        {p.status}
                      </span>
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
    </div>
  );
}

