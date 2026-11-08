"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FileText,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  UserCheck,
  Award,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { POSHCase } from "@/lib/types";

export default function ICConciliationPage() {
  const params = useParams();
  const caseId = (params?.id as string) || "case-01";
  const [poshCase, setPoshCase] = useState<POSHCase | undefined>(undefined);

  const [requestedByComplainant, setRequestedByComplainant] = useState(true);
  const [monetaryFreeAcknowledged, setMonetaryFreeAcknowledged] = useState(false);
  const [apologyRequired, setApologyRequired] = useState(true);
  const [teamReassignment, setTeamReassignment] = useState(true);
  const [behavioralCounselling, setBehavioralCounselling] = useState(true);
  const [writtenTerms, setWrittenTerms] = useState(
    "1. The respondent tenders an unconditional written apology to the complainant.\n2. The respondent is reassigned to the Bidhannagar project team with zero reporting overlap.\n3. The respondent completes mandatory 1-on-1 gender sensitisation counselling within 30 days.\n4. Both parties agree to maintain strict Section 16 statutory confidentiality."
  );
  const [conciliationStatus, setConciliationStatus] = useState<"IN_PROGRESS" | "CONCLUDED" | "FAILED">("IN_PROGRESS");

  useEffect(() => {
    const c = platformStore.getCaseById(caseId);
    if (c) setPoshCase(c);
  }, [caseId]);

  const handleRecordConciliation = (outcome: "CONCLUDED" | "FAILED") => {
    if (!poshCase) return;
    if (outcome === "CONCLUDED" && !monetaryFreeAcknowledged) {
      alert("Statutory Error: You must acknowledge the statutory prohibition against monetary settlement (Section 10(1) Proviso).");
      return;
    }

    if (outcome === "CONCLUDED") {
      platformStore.updateCaseState(
        poshCase.id,
        "CONCILIATION_SUCCESS",
        "Section 10 conciliation agreement concluded and forwarded to employer. No monetary terms involved."
      );
      setConciliationStatus("CONCLUDED");
      alert("Conciliation agreement executed successfully. Forwarded to employer per Section 10(2).");
    } else {
      platformStore.updateCaseState(
        poshCase.id,
        "INQUIRY_IN_PROGRESS",
        "Conciliation failed or terminated. Formal inquiry initiated pursuant to Section 11(1) proviso."
      );
      setConciliationStatus("FAILED");
      alert("Conciliation failed. Case transitioned to formal Section 11 inquiry.");
    }
  };

  if (!poshCase) {
    return (
      <div className="p-12 text-center text-xs text-ink-secondary">
        Case not found. <Link href="/posh/ic" className="text-primary underline">Return to IC Workspace</Link>
      </div>
    );
  }

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
              href={`/posh/ic/cases/${poshCase.id}/notices`}
              className="text-primary font-semibold hover:underline"
            >
              Notices &amp; Summons (Sec 11) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <Award className="w-4 h-4 text-primary" />
            <span>PRD Screen I-04 &bull; Section 10 of POSH Act 2013</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            Informal Conciliation &amp; Settlement Protocol
          </h1>
          <p className="text-xs text-ink-secondary leading-relaxed">
            Docket <span className="font-mono font-bold text-primary">{poshCase.caseNumber}</span> &bull; Section 10 permits conciliation strictly at the request of the aggrieved woman before initiating inquiry. No monetary settlement is permissible under law.
          </p>
        </div>

        {/* Statutory Safeguards & Warnings */}
        <div className="p-4 bg-red-50 rounded-card border border-red-200 text-xs text-red-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-red-950">
            <ShieldAlert className="w-4 h-4 text-red-700" />
            <span>Statutory Proviso to Section 10(1) &bull; Mandatory Compliance</span>
          </div>
          <p className="leading-relaxed">
            <strong>&quot;Provided that no monetary settlement shall be made as a basis of conciliation.&quot;</strong> Any agreement containing monetary compensation or commercial settlement at the conciliation stage is illegal and void ab initio under the POSH Act 2013.
          </p>
        </div>

        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-6">
          <h2 className="font-serif font-bold text-base text-ink border-b border-border-subtle pb-3">
            1. Pre-Conditions Checklist
          </h2>

          <div className="space-y-3 text-xs">
            <label className="flex items-start gap-3 bg-white p-3 rounded border border-border cursor-pointer">
              <input
                type="checkbox"
                checked={requestedByComplainant}
                onChange={(e) => setRequestedByComplainant(e.target.checked)}
                className="mt-0.5 text-primary rounded"
              />
              <div>
                <div className="font-bold text-ink">Voluntary Complainant Request (Section 10(1))</div>
                <div className="text-ink-secondary">
                  The aggrieved woman has expressly and voluntarily submitted a written request seeking conciliation prior to formal inquiry. (The IC or employer cannot propose conciliation).
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 bg-white p-3 rounded border border-border cursor-pointer">
              <input
                type="checkbox"
                checked={monetaryFreeAcknowledged}
                onChange={(e) => setMonetaryFreeAcknowledged(e.target.checked)}
                className="mt-0.5 text-primary rounded"
              />
              <div>
                <div className="font-bold text-ink">Zero Monetary Settlement Confirmation</div>
                <div className="text-ink-secondary">
                  I confirm that the proposed terms do NOT include any financial payout, severance package, hush money, or cash compensation.
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Settlement Terms Editor */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-serif font-bold text-base text-ink">
              2. Terms of Settlement Agreement (Section 10(2))
            </h2>
            <span className="text-xs text-ink-secondary">Forwarded to Employer for Implementation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <label className="flex items-center gap-2 bg-white p-2.5 rounded border border-border cursor-pointer">
              <input
                type="checkbox"
                checked={apologyRequired}
                onChange={(e) => setApologyRequired(e.target.checked)}
                className="rounded text-primary"
              />
              <span className="font-medium text-ink">Written Apology</span>
            </label>

            <label className="flex items-center gap-2 bg-white p-2.5 rounded border border-border cursor-pointer">
              <input
                type="checkbox"
                checked={teamReassignment}
                onChange={(e) => setTeamReassignment(e.target.checked)}
                className="rounded text-primary"
              />
              <span className="font-medium text-ink">Team Reassignment</span>
            </label>

            <label className="flex items-center gap-2 bg-white p-2.5 rounded border border-border cursor-pointer">
              <input
                type="checkbox"
                checked={behavioralCounselling}
                onChange={(e) => setBehavioralCounselling(e.target.checked)}
                className="rounded text-primary"
              />
              <span className="font-medium text-ink">Sensitisation Program</span>
            </label>
          </div>

          <textarea
            rows={6}
            value={writtenTerms}
            onChange={(e) => setWrittenTerms(e.target.value)}
            className="w-full p-4 bg-white border border-border rounded text-xs font-mono leading-relaxed focus:outline-none focus:border-primary"
          />

          <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-border-subtle">
            <button
              type="button"
              onClick={() => handleRecordConciliation("FAILED")}
              className="px-4 py-2 border border-red-300 text-red-700 text-xs font-semibold rounded hover:bg-red-50 transition-colors"
            >
              Conciliation Failed &rarr; Proceed to Sec 11 Inquiry
            </button>

            <div className="flex gap-3">
              <Link
                href={`/posh/ic/cases/${poshCase.id}`}
                className="px-4 py-2 border border-border text-xs font-semibold rounded text-ink hover:bg-white"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={() => handleRecordConciliation("CONCLUDED")}
                className="px-6 py-2 bg-emerald-800 text-white text-xs font-semibold rounded hover:bg-emerald-900 transition-colors inline-flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Execute Settlement (Sec 10(2))</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
