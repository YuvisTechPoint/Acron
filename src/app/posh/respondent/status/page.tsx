"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Download,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  UserCheck,
  Eye,
  Lock,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export default function PoshRespondentStatusPage() {
  const [caseNumber, setCaseNumber] = useState("POSH-TECHKOL-2026-0014");

  const poshCase = platformStore.getCaseById(caseNumber);

  return (
    <div className="bg-ivory-50 min-h-screen py-10 text-ink">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link
            href="/posh/respondent"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to Respondent Desk</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/posh/respondent/reply" className="text-primary font-medium hover:underline">
              Submit Statement &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <Calendar className="w-4 h-4 text-primary" />
            <span>PRD Screen R-03 &bull; Section 11 &amp; Natural Justice</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            Respondent Case Docket &amp; Procedural Status
          </h1>
          <p className="text-xs text-ink-secondary leading-relaxed">
            Track statutory timelines, scheduled oral hearings, released inquiry documents, and procedural findings in your case.
          </p>
        </div>

        {/* Case Search / Selector */}
        <div className="bg-surface p-4 rounded-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-medium text-ink-secondary">Docket:</span>
            <input
              type="text"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              className="px-3 py-1.5 bg-white border border-border rounded font-mono text-xs font-bold text-primary focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded bg-primary text-white font-bold">
              {poshCase?.state || "NOTICE_SERVED"}
            </span>
            <span className="text-ink-secondary">
              Filed: {formatDate(poshCase?.filedAt || "2026-09-24")}
            </span>
          </div>
        </div>

        {/* Procedural Progress Bar */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <h2 className="font-serif font-bold text-base text-ink">
            Statutory Procedural Lifecycle
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-white rounded border border-border space-y-1">
              <div className="text-[10px] uppercase font-bold text-accent">Step 1</div>
              <div className="font-bold text-ink flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Notice Served</span>
              </div>
              <div className="text-[11px] text-ink-secondary">7 Working Days</div>
            </div>

            <div className="p-3 bg-white rounded border border-border space-y-1">
              <div className="text-[10px] uppercase font-bold text-accent">Step 2</div>
              <div className="font-bold text-ink flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Written Reply</span>
              </div>
              <div className="text-[11px] text-ink-secondary">10 Working Days</div>
            </div>

            <div className="p-3 bg-white rounded border border-primary/40 bg-primary/5 space-y-1">
              <div className="text-[10px] uppercase font-bold text-primary">Step 3</div>
              <div className="font-bold text-primary flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>Hearings</span>
              </div>
              <div className="text-[11px] text-ink-secondary">Oral Depositions</div>
            </div>

            <div className="p-3 bg-white rounded border border-border opacity-60 space-y-1">
              <div className="text-[10px] uppercase font-bold text-ink-secondary">Step 4</div>
              <div className="font-bold text-ink flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-ink-secondary" />
                <span>Findings Report</span>
              </div>
              <div className="text-[11px] text-ink-secondary">Sec 13(1) Notice</div>
            </div>
          </div>
        </div>

        {/* Scheduled Hearings Section */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-serif font-bold text-base text-ink flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Scheduled Oral Examination &amp; Depositions</span>
            </h2>
            <span className="text-xs text-ink-secondary font-medium">Sec 11(3) Civil Powers</span>
          </div>

          <div className="space-y-3">
            <div className="bg-white p-4 rounded border border-border space-y-2 text-xs">
              <div className="flex justify-between items-center border-b border-border-subtle pb-2">
                <span className="font-bold text-ink">Hearing #1: Primary Cross-Examination of Documents</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  CONFIRMED
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-ink-secondary">
                <div>Date: <span className="font-semibold text-ink">18 Nov 2026</span></div>
                <div>Time: <span className="font-semibold text-ink">02:30 PM IST</span></div>
                <div>Venue: <span className="font-semibold text-ink">IC Chamber, Camac St / Webex</span></div>
              </div>
              <p className="text-ink-secondary text-[11px] pt-1 leading-relaxed">
                Agenda: Verification of electronic messaging transcripts and examination of respondent written statement. Both parties are strictly barred from bringing legal practitioners pursuant to Section 11(4) of the Act.
              </p>
            </div>
          </div>
        </div>

        {/* Released Exhibits & Documents Repository */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-serif font-bold text-base text-ink flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span>Released Inquiry Exhibits (Natural Justice)</span>
            </h2>
            <span className="text-xs text-ink-secondary">Rule 7 Compliance</span>
          </div>

          <div className="space-y-2">
            {[
              {
                code: "EX-001",
                title: "Formal Notice of Inquiry & Summary of Complaint",
                date: "25 Sep 2026",
                size: "450 KB",
              },
              {
                code: "EX-002",
                title: "Redacted Work Chat Extracts (Slack / WhatsApp)",
                date: "28 Sep 2026",
                size: "1.2 MB",
              },
              {
                code: "EX-003",
                title: "Advisory Order on Interim Workplace Separation",
                date: "02 Oct 2026",
                size: "280 KB",
              },
            ].map((doc) => (
              <div
                key={doc.code}
                className="bg-white p-3 rounded border border-border flex items-center justify-between text-xs hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-primary">{doc.code}</span>
                  <div>
                    <div className="font-semibold text-ink">{doc.title}</div>
                    <div className="text-[11px] text-ink-secondary">
                      Released: {doc.date} &bull; {doc.size}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Downloading verified exhibit ${doc.code}...`)}
                  className="px-3 py-1.5 border border-border rounded text-ink hover:bg-surface flex items-center gap-1.5 font-medium"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Statutory Rights Notice */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-3 text-xs">
          <h3 className="font-serif font-bold text-ink flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Statutory Fair Trial Protections</span>
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-ink-secondary leading-relaxed">
            <li>Right to receive copies of all allegations and evidence produced before the IC.</li>
            <li>Right to present defense witnesses and produce documentary or electronic exhibits.</li>
            <li>Opportunity to submit questions for cross-examination of the complainant and witnesses.</li>
            <li>Copy of final inquiry findings report under Section 13(1) within 10 days of completion.</li>
            <li>Right to appeal under Section 18 to the appellate court or tribunal within 90 days.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
