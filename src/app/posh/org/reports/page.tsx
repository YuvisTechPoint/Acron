"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  Upload,
  Calendar,
  CheckCircle2,
  Printer,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building,
} from "lucide-react";
import { platformStore } from "@/lib/store";

export default function PoshOrgReportsPage() {
  const [selectedOrgId, setSelectedOrgId] = useState("org-1");
  const [reportYear, setReportYear] = useState("2025");
  const orgs = platformStore.getOrganizations();
  const activeOrg = orgs.find((o) => o.id === selectedOrgId) || orgs[0];

  const statutoryMetrics = {
    received: 4, // Note: suppressed in public views if < 5 per privacy rules
    disposed: 4,
    pendingAbove90: 0,
    workshopsConducted: 8,
    employeesSensitised: 395,
    employerActionCompleted: "Disciplinary written warnings issued; 1 salary deduction executed.",
  };

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
            <Link href="/posh/org/prevention" className="text-primary font-semibold hover:underline">
              Prevention &amp; Climate Surveys (O-08) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                <FileText className="w-4 h-4 text-primary" />
                <span>PRD Screen O-07 &bull; Sections 21 &amp; 22 Annual Report</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
                Statutory Annual Report to the District Officer (DO)
              </h1>
              <p className="text-xs text-ink-secondary mt-1">
                Employer: <span className="font-semibold text-ink">{activeOrg.name}</span> &bull; Filing due by January 31st each calendar year under West Bengal POSH Rules.
              </p>
            </div>

            <div className="flex gap-2">
              <select
                value={reportYear}
                onChange={(e) => setReportYear(e.target.value)}
                className="px-3 py-2 bg-white border border-border rounded text-xs font-semibold text-ink shrink-0"
              >
                <option value="2025">Calendar Year 2025</option>
                <option value="2024">Calendar Year 2024</option>
              </select>

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
        </div>

        {/* Section 21 / 22 Mandate & Small-Group Suppression Notice */}
        <div className="p-5 bg-white rounded-card border border-border shadow-card text-xs space-y-2">
          <div className="flex items-center gap-2 font-serif font-bold text-primary text-sm">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>Statutory Filing Mandate &bull; Section 21 &amp; Rule 14</span>
          </div>
          <p className="text-ink-secondary leading-relaxed">
            The Internal Committee shall in each calendar year prepare an annual report and submit the same to the employer and the District Officer (DO), Kolkata. In the Annual Report forwarded to the Board of Directors under Section 22, the employer must include the number of cases filed and disposed of.
          </p>
          <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded border border-amber-200">
            <strong>Confidentiality Safeguard (PRD Section 8.6.3):</strong> Small-group suppression threshold of 5 is active. Breakdown by department is suppressed to prevent indirect identification of complainants.
          </div>
        </div>

        {/* Statutory Report Metrics Box */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-6">
          <div className="flex justify-between items-center border-b border-border-subtle pb-3">
            <h2 className="font-serif font-bold text-base text-ink">
              Official Annual Return Summary ({reportYear})
            </h2>
            <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
              Status: Filed with DO Kolkata
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-white p-4 rounded border border-border space-y-1">
              <span className="text-ink-secondary">1. Complaints Received (Sec 21(a)):</span>
              <div className="font-serif font-bold text-2xl text-primary mt-1">
                {statutoryMetrics.received}
              </div>
              <div className="text-[10px] text-ink-secondary">Registered within calendar year</div>
            </div>

            <div className="bg-white p-4 rounded border border-border space-y-1">
              <span className="text-ink-secondary">2. Complaints Disposed Of (Sec 21(b)):</span>
              <div className="font-serif font-bold text-2xl text-emerald-700 mt-1">
                {statutoryMetrics.disposed}
              </div>
              <div className="text-[10px] text-ink-secondary">Findings reports concluded</div>
            </div>

            <div className="bg-white p-4 rounded border border-border space-y-1">
              <span className="text-ink-secondary">3. Cases Pending &gt;90 Days (Sec 21(c)):</span>
              <div className="font-serif font-bold text-2xl text-ink mt-1">
                {statutoryMetrics.pendingAbove90}
              </div>
              <div className="text-[10px] text-emerald-600 font-semibold">Zero statutory delays</div>
            </div>

            <div className="bg-white p-4 rounded border border-border space-y-1">
              <span className="text-ink-secondary">4. Awareness Workshops Conducted (Sec 21(d)):</span>
              <div className="font-serif font-bold text-2xl text-primary mt-1">
                {statutoryMetrics.workshopsConducted}
              </div>
              <div className="text-[10px] text-ink-secondary">{statutoryMetrics.employeesSensitised} employees trained</div>
            </div>

            <div className="bg-white p-4 rounded border border-border space-y-1 sm:col-span-2">
              <span className="text-ink-secondary">5. Nature of Action Taken by Employer (Sec 21(e)):</span>
              <div className="font-bold text-ink text-xs mt-1">
                {statutoryMetrics.employerActionCompleted}
              </div>
              <div className="text-[10px] text-ink-secondary">Implemented within 60 days per Section 13(4)</div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-border-subtle text-xs">
            <span className="text-ink-secondary">
              Submission Proof: <strong className="text-ink">DO/KOL/POSH/2025/ACK-092</strong> (Uploaded on 22 Jan 2026)
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => alert("Downloading certified Section 21 Annual Report (DOCX)...")}
                className="px-3 py-1.5 border border-border rounded text-ink hover:bg-white flex items-center gap-1.5 font-medium"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download DOCX</span>
              </button>
              <button
                onClick={() => alert("Downloading certified Section 21 Annual Report (PDF)...")}
                className="px-4 py-1.5 bg-primary text-white rounded hover:bg-primary-hover flex items-center gap-1.5 font-semibold"
              >
                <Download className="w-3.5 h-3.5 text-accent" />
                <span>Download Certified PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
