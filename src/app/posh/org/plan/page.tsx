"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building,
  FileText,
  Clock,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatINR } from "@/lib/utils";

export default function PoshOrgPlanPage() {
  const [selectedOrgId, setSelectedOrgId] = useState("org-1");
  const orgs = platformStore.getOrganizations();
  const activeOrg = orgs.find((o) => o.id === selectedOrgId) || orgs[0];

  const invoices = [
    {
      invoiceNo: "ACN/INV/2026-27/00481",
      period: "Q3 2026 (Oct - Dec 2026)",
      sacCode: "998211 (Legal Advisory Services)",
      amountPaise: 7500000, // ₹75,000
      gstPaise: 1350000,    // 18% GST = ₹13,500
      totalPaise: 8850000,  // ₹88,500
      status: "Paid",
      paidAt: "2026-10-05",
    },
    {
      invoiceNo: "ACN/INV/2026-27/00234",
      period: "Q2 2026 (Jul - Sep 2026)",
      sacCode: "998211 (Legal Advisory Services)",
      amountPaise: 7500000,
      gstPaise: 1350000,
      totalPaise: 8850000,
      status: "Paid",
      paidAt: "2026-07-04",
    },
  ];

  return (
    <div className="bg-ivory-50 min-h-screen py-10 text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link
            href="/posh/org"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to Organisation Console ({activeOrg.name})</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/posh/org/support" className="text-primary font-semibold hover:underline">
              Legal Counsel Support Desk (O-10) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                <CreditCard className="w-4 h-4 text-primary" />
                <span>PRD Screen O-09 &bull; Retainer Advisory Plan &amp; Billing</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
                Statutory POSH Retainer Subscription &amp; Tax Invoices
              </h1>
              <p className="text-xs text-ink-secondary mt-1">
                Employer: <span className="font-semibold text-ink">{activeOrg.name}</span> &bull; Plan Tier: <span className="font-bold text-primary uppercase">{activeOrg.planTier}</span>
              </p>
            </div>

            <select
              value={selectedOrgId}
              onChange={(e) => setSelectedOrgId(e.target.value)}
              className="px-3 py-2 bg-white border border-border rounded text-xs font-semibold text-ink shrink-0"
            >
              {orgs.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Retainer Details */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-border-subtle pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent">Comprehensive Enterprise Retainer</span>
              <h2 className="font-serif font-bold text-xl text-ink mt-0.5">
                Retainer Enterprise Tier &bull; Annual Legal Coverage
              </h2>
              <div className="text-xs text-ink-secondary mt-1">
                Designated Chambers External Member: <strong className="text-ink">Adv. Debjani Sen, Senior Consultant</strong>
              </div>
            </div>

            <div className="text-right">
              <div className="font-serif font-bold text-2xl text-primary">₹3,00,000 / year</div>
              <div className="text-[11px] text-ink-secondary">+ 18% GST &bull; Billed Quarterly</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Dedicated Acorn Legal External Member on IC</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full Inquiry Drafting &amp; Section 13 Findings Review</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Annual Section 21 District Officer Return Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Enterprise Employee LMS with Unlimited Certifications</span>
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-border-subtle">
            <button
              onClick={() => alert("Retainer renewal confirmed. Advance invoice generated.")}
              className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover"
            >
              Request Scope Amendment / Custom Add-on
            </button>
          </div>
        </div>

        {/* Invoices & GST Tax Ledger */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <div className="flex justify-between items-center border-b border-border-subtle pb-3">
            <h2 className="font-serif font-bold text-base text-ink">
              Statutory Tax Invoices (SAC 998211)
            </h2>
            <span className="text-xs text-ink-secondary">GST Compliant &bull; 18% Tax Ledger</span>
          </div>

          <div className="space-y-3">
            {invoices.map((inv) => (
              <div
                key={inv.invoiceNo}
                className="bg-white p-4 rounded border border-border flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-primary">{inv.invoiceNo}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {inv.status}
                    </span>
                  </div>
                  <div className="font-bold text-ink mt-0.5">{inv.period}</div>
                  <div className="text-[11px] text-ink-secondary">
                    SAC: {inv.sacCode} &bull; Paid on {inv.paidAt}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-serif font-bold text-sm text-ink">{formatINR(inv.totalPaise)}</div>
                    <div className="text-[10px] text-ink-secondary">
                      (Base: {formatINR(inv.amountPaise)} + GST: {formatINR(inv.gstPaise)})
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Downloading verified Tax Invoice ${inv.invoiceNo}...`)}
                    className="px-3 py-1.5 border border-border rounded text-ink hover:bg-surface flex items-center gap-1.5 font-medium"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Tax Invoice</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
