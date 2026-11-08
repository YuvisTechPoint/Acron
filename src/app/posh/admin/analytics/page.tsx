"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Clock,
  ShieldCheck,
  Download,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  PieChart,
  Lock,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatINR } from "@/lib/utils";

export default function PoshAdminAnalyticsPage() {
  const [selectedYear, setSelectedYear] = useState("2026");

  const analyticsMetrics = {
    totalInquiriesInitiated: 18,
    disposedWithin90DaysPct: 100,
    avgInquiryDays: 48, // Well under 90-day statutory limit
    conciliationSuccessCount: 6,
    formalInquirySubstantiatedCount: 9,
    formalInquiryExoneratedCount: 3,
    avgCompensationAwardedPaise: 27500000, // ₹2,75,000
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-10 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link
            href="/posh/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to POSH Admin Console</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/posh/admin/retention" className="text-primary font-semibold hover:underline">
              Retention &amp; Legal Hold (X-09) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span>PRD Screen X-10 &bull; Aggregate Platform Analytics</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
                POSH Case Velocity, Outcomes &amp; Statutory Telemetry
              </h1>
              <p className="text-xs text-ink-secondary mt-1">
                Macro insights across all empanelled corporate committees &bull; Automatic k-anonymity small-cell suppression (&lt;5).
              </p>
            </div>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 bg-white border border-border rounded text-xs font-semibold text-ink shrink-0"
            >
              <option value="2026">Calendar Year 2026</option>
              <option value="2025">Calendar Year 2025</option>
            </select>
          </div>
        </div>

        {/* Privacy Safeguard Active Notice */}
        <div className="p-4 bg-white rounded-card border border-border shadow-card text-xs flex items-start gap-3">
          <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-serif font-bold text-ink">
              Confidentiality &amp; k-Anonymity Suppression Active (Section 16 &amp; PRD Section 8.6.3)
            </div>
            <p className="text-ink-secondary leading-relaxed">
              All reporting queries enforce mandatory aggregation. Cross-tabulation resulting in cohort counts below 5 is automatically masked as &quot;&lt;5&quot; to prohibit deductive re-identification of complainants, respondents, or witnesses.
            </p>
          </div>
        </div>

        {/* Core Statutory KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">Inquiries Initiated</div>
            <div className="font-serif font-bold text-3xl text-primary mt-1">
              {analyticsMetrics.totalInquiriesInitiated}
            </div>
            <div className="text-[11px] text-ink-secondary mt-1">Across 3 Retainer Clients</div>
          </div>

          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">Average Inquiry Duration</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif font-bold text-3xl text-emerald-700">
                {analyticsMetrics.avgInquiryDays} Days
              </span>
              <span className="text-xs text-emerald-600 font-semibold">47% of limit</span>
            </div>
            <div className="text-[11px] text-ink-secondary mt-1">
              Statutory ceiling: 90 Days (Sec 11(4))
            </div>
          </div>

          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">90-Day Ceiling Adherence</div>
            <div className="font-serif font-bold text-3xl text-emerald-700 mt-1">
              {analyticsMetrics.disposedWithin90DaysPct}%
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              Zero Cases Overdue
            </div>
          </div>

          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">Average Sec 15 Compensation</div>
            <div className="font-serif font-bold text-2xl text-primary mt-1">
              {formatINR(analyticsMetrics.avgCompensationAwardedPaise)}
            </div>
            <div className="text-[11px] text-ink-secondary mt-1">
              Substantiated Inquiries
            </div>
          </div>
        </div>

        {/* Procedural Outcomes Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
            <h2 className="font-serif font-bold text-base text-ink border-b border-border-subtle pb-3">
              Resolution Mechanism Breakdown
            </h2>

            <div className="space-y-3 text-xs">
              <div className="bg-white p-3.5 rounded border border-border flex justify-between items-center">
                <div>
                  <div className="font-bold text-ink">Section 10 Conciliation Agreements</div>
                  <div className="text-[11px] text-ink-secondary">Voluntary non-monetary settlements</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-base text-primary">{analyticsMetrics.conciliationSuccessCount}</div>
                  <div className="text-[10px] text-ink-secondary">33.3% of total</div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded border border-border flex justify-between items-center">
                <div>
                  <div className="font-bold text-ink">Section 13 Inquiries &bull; Charges Substantiated</div>
                  <div className="text-[11px] text-ink-secondary">Disciplinary penalty and compensation awarded</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-base text-emerald-700">{analyticsMetrics.formalInquirySubstantiatedCount}</div>
                  <div className="text-[10px] text-ink-secondary">50.0% of total</div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded border border-border flex justify-between items-center">
                <div>
                  <div className="font-bold text-ink">Section 13 Inquiries &bull; Charges Not Proved</div>
                  <div className="text-[11px] text-ink-secondary">Exoneration on merits / insufficient evidence</div>
                </div>
                <div className="text-right">
                  {/* Suppressed under <5 rule */}
                  <div className="font-bold text-base text-ink-secondary">&lt; 5</div>
                  <div className="text-[10px] text-amber-800 font-semibold">Small-Cell Suppressed</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h2 className="font-serif font-bold text-base text-ink">
                Export Macro Telemetry Data
              </h2>
              <span className="text-xs text-ink-secondary">Sanitized JSON / CSV</span>
            </div>

            <p className="text-xs text-ink-secondary leading-relaxed">
              Export aggregate telemetry records for chambers management, academic research, Bar Council filings, or client board presentations. Exported datasets contain zero PII, zero organization names, and enforce suppression boundaries.
            </p>

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => alert("Generating anonymized macro analytics CSV...")}
                className="w-full py-2.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-accent" />
                <span>Export Anonymized Macro Dataset (CSV)</span>
              </button>
              <button
                onClick={() => alert("Generating annual Chambers POSH Practice Whitepaper (PDF)...")}
                className="w-full py-2.5 bg-white border border-border text-ink text-xs font-semibold rounded hover:bg-surface flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Executive Summary Report (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
