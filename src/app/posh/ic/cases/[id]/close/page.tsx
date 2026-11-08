"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Printer,
  Download,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  HeartHandshake,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { POSHCase } from "@/lib/types";

export default function ICCloseCasePage() {
  const params = useParams();
  const caseId = (params?.id as string) || "case-01";
  const [poshCase, setPoshCase] = useState<POSHCase | undefined>(() => platformStore.getCaseById(caseId));

  const [reportSubmittedChecked, setReportSubmittedChecked] = useState(true);
  const [partiesReceivedCopies, setPartiesReceivedCopies] = useState(true);
  const [employerActionVerified, setEmployerActionVerified] = useState(true);
  const [appealWindowActive, setAppealWindowActive] = useState(true);
  const [aftercareEnrolled, setAftercareEnrolled] = useState(true);
  const [closureNotes, setClosureNotes] = useState(
    "All statutory stages completed. Report submitted to Employer within 10 days of completion per Section 13(1). Employer implemented recommended action within 60 days. Complainant enrolled into 90-day anti-retaliation aftercare program."
  );

  useEffect(() => {
    const c = platformStore.getCaseById(caseId);
    if (c) setPoshCase(c);
  }, [caseId]);

  const handleFormalClose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!poshCase) return;

    platformStore.updateCaseState(
      poshCase.id,
      "CLOSED",
      `Case formally closed by Internal Committee. Employer implementation verified. 90-day Section 18 appeal period running.`
    );

    const updated = platformStore.getCaseById(poshCase.id);
    if (updated) setPoshCase({ ...updated });
    alert("Inquiry docket formally closed and archived into 7-year statutory retention vault.");
  };

  if (!poshCase) {
    return (
      <div className="p-12 text-center text-xs text-ink-secondary">
        Case not found. <Link href="/posh/ic" className="text-primary underline">Return to IC Workspace</Link>
      </div>
    );
  }

  const isClosed = poshCase.state === "CLOSED";

  return (
    <div className="bg-ivory-50 min-h-screen py-10 text-ink">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link
            href={`/posh/ic/cases/${poshCase.id}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to Case Overview ({poshCase.caseNumber})</span>
          </Link>
          <div className="flex items-center gap-2 text-xs">
            <Link
              href="/posh/admin/aftercare"
              className="text-primary font-semibold hover:underline"
            >
              Aftercare &amp; Retaliation Desk &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>PRD Screen I-10 &bull; Case Closure, Appeal &amp; Aftercare</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            Formal Docket Closure &amp; Post-Inquiry Aftercare
          </h1>
          <p className="text-xs text-ink-secondary leading-relaxed">
            Docket <span className="font-mono font-bold text-primary">{poshCase.caseNumber}</span> &bull; Ensure all post-inquiry statutory obligations under Section 13(4) (employer action within 60 days) and Section 18 (90-day appeal window) are verified prior to formal archive.
          </p>
        </div>

        {/* Closure Form */}
        <form onSubmit={handleFormalClose} className="space-y-6">
          <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
            <h2 className="font-serif font-bold text-base text-ink border-b border-border-subtle pb-3">
              1. Statutory Post-Inquiry Checklist
            </h2>

            <div className="space-y-3 text-xs">
              <label className="flex items-start gap-3 bg-white p-3 rounded border border-border cursor-pointer">
                <input
                  type="checkbox"
                  checked={reportSubmittedChecked}
                  onChange={(e) => setReportSubmittedChecked(e.target.checked)}
                  className="mt-0.5 rounded text-primary"
                />
                <div>
                  <div className="font-bold text-ink">Report Submitted to Employer within 10 Days &bull; Section 13(1)</div>
                  <div className="text-ink-secondary">Inquiry report along with compensation worksheet dispatched to employer.</div>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-white p-3 rounded border border-border cursor-pointer">
                <input
                  type="checkbox"
                  checked={partiesReceivedCopies}
                  onChange={(e) => setPartiesReceivedCopies(e.target.checked)}
                  className="mt-0.5 rounded text-primary"
                />
                <div>
                  <div className="font-bold text-ink">Copies Supplied to Complainant &amp; Respondent &bull; Section 13(1)</div>
                  <div className="text-ink-secondary">Both parties provided formal certified copies of the findings.</div>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-white p-3 rounded border border-border cursor-pointer">
                <input
                  type="checkbox"
                  checked={employerActionVerified}
                  onChange={(e) => setEmployerActionVerified(e.target.checked)}
                  className="mt-0.5 rounded text-primary"
                />
                <div>
                  <div className="font-bold text-ink">Employer Action Implemented within 60 Days &bull; Section 13(4)</div>
                  <div className="text-ink-secondary">Disciplinary order or compensation deduction confirmed by employer.</div>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-white p-3 rounded border border-border cursor-pointer">
                <input
                  type="checkbox"
                  checked={appealWindowActive}
                  onChange={(e) => setAppealWindowActive(e.target.checked)}
                  className="mt-0.5 rounded text-primary"
                />
                <div>
                  <div className="font-bold text-ink">Section 18 Statutory Appeal Window Running (90 Days)</div>
                  <div className="text-ink-secondary">Any person aggrieved may prefer an appeal to court or tribunal within 90 days.</div>
                </div>
              </label>
            </div>
          </div>

          {/* Aftercare & Monitoring Plan */}
          <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
            <h2 className="font-serif font-bold text-base text-ink flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-primary" />
              <span>2. Anti-Retaliation Aftercare &amp; Well-being Plan</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3.5 rounded border border-border space-y-1">
                <div className="text-[10px] uppercase font-bold text-primary">Day 30 Post-Closure</div>
                <div className="font-bold text-ink">First Well-Being Check-in</div>
                <div className="text-ink-secondary text-[11px]">Assess workplace climate, reporting neutrality, and subtle reprisals.</div>
              </div>

              <div className="bg-white p-3.5 rounded border border-border space-y-1">
                <div className="text-[10px] uppercase font-bold text-primary">Day 60 Post-Closure</div>
                <div className="font-bold text-ink">Performance Review Safeguard</div>
                <div className="text-ink-secondary text-[11px]">Independent verification that appraisal ratings were not impacted.</div>
              </div>

              <div className="bg-white p-3.5 rounded border border-border space-y-1">
                <div className="text-[10px] uppercase font-bold text-primary">Day 90 Post-Closure</div>
                <div className="font-bold text-ink">Final Aftercare Audit</div>
                <div className="text-ink-secondary text-[11px]">Conclusion of aftercare monitoring cycle and formal sign-off.</div>
              </div>
            </div>

            <div className="text-xs space-y-1 pt-2">
              <label className="block text-ink-secondary font-medium">Closure Minute &amp; Final Order Notes</label>
              <textarea
                rows={4}
                value={closureNotes}
                onChange={(e) => setClosureNotes(e.target.value)}
                className="w-full p-3 bg-white border border-border rounded text-xs font-mono leading-relaxed focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-border-subtle">
              <Link
                href={`/posh/ic/cases/${poshCase.id}`}
                className="px-4 py-2 border border-border rounded text-xs font-semibold text-ink hover:bg-white"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isClosed}
                className="px-6 py-2 bg-emerald-800 text-white text-xs font-semibold rounded hover:bg-emerald-900 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isClosed ? "Case Docket Closed" : "Execute Formal Docket Closure"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
