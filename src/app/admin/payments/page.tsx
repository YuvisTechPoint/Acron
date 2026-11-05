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
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatINR, formatDate, formatDateTime } from "@/lib/utils";
import { PaymentTransaction } from "@/lib/types";

export default function AdminPaymentsPage() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentTransaction | null>(null);
  const payments = platformStore.getPayments();

  const totalPaise = payments.reduce((acc, p) => acc + (p.status === "paid" ? p.totalPaise : 0), 0);
  const totalTaxPaise = payments.reduce((acc, p) => acc + (p.status === "paid" ? p.taxPaise : 0), 0);

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

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Ledger</span>
          </button>
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

        {/* Table */}
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <div className="p-4 bg-surface border-b border-border font-bold text-ink text-xs uppercase tracking-wider">
            Transaction Ledger
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
                {payments.map((p) => (
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
        </div>
      </div>
    </div>
  );
}

