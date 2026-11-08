"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  UserCheck,
  Building,
  Scale,
  ShieldAlert,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate, evaluateLimitationStatus } from "@/lib/utils";
import { POSHCase } from "@/lib/types";

export default function ICTriagePage() {
  const params = useParams();
  const caseId = (params?.id as string) || "case-01";
  const [poshCase, setPoshCase] = useState<POSHCase | undefined>(undefined);

  // 4-Point Checklist
  const [isAggrievedWoman, setIsAggrievedWoman] = useState(true);
  const [isWorkplaceJurisdiction, setIsWorkplaceJurisdiction] = useState(true);
  const [isWithinLimitation, setIsWithinLimitation] = useState(true);
  const [condonationReasons, setCondonationReasons] = useState("");
  const [isQuorumValid, setIsQuorumValid] = useState(true);
  const [conflictFree, setConflictFree] = useState(true);
  const [triageAction, setTriageAction] = useState<"PROCEED" | "CONDONE" | "REFER_LC" | "REQUEST_INFO">("PROCEED");

  useEffect(() => {
    const c = platformStore.getCaseById(caseId);
    if (c) {
      setPoshCase(c);
      const lastDate = c.incidentDates?.[c.incidentDates.length - 1];
      const evalResult = evaluateLimitationStatus(lastDate, c.filedAt);
      if (evalResult.status !== "WITHIN_LIMITATION") {
        setIsWithinLimitation(false);
        if (evalResult.status === "REQUIRES_CONDONATION") {
          setTriageAction("CONDONE");
        } else if (evalResult.status === "STATUTORILY_BARRED") {
          setTriageAction("REFER_LC");
        }
      }
    }
  }, [caseId]);

  const lastIncidentDate = poshCase?.incidentDates?.[poshCase.incidentDates.length - 1];
  const limitationEvaluation = evaluateLimitationStatus(lastIncidentDate, poshCase?.filedAt);

  const handleSaveTriage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!poshCase) return;

    if (triageAction === "PROCEED" || triageAction === "CONDONE") {
      if (!isAggrievedWoman) {
        alert("Statutory Threshold Error: Complainant must meet Section 2(a) Aggrieved Woman definition to proceed under POSH.");
        return;
      }
      if (!isWorkplaceJurisdiction) {
        alert("Jurisdiction Defect: Section 2(o) Workplace Jurisdiction not met. IC cannot admit non-workplace complaints. Must refer to Local Committee (LC) or external authority.");
        return;
      }
      if (!isQuorumValid || !conflictFree) {
        alert("Quorum / Conflict Defect: Section 4 IC constitution and conflict clearance must be valid prior to initiating formal inquiry.");
        return;
      }
      if (limitationEvaluation.status === "STATUTORILY_BARRED") {
        alert("Statutory Bar (Section 9(1) Proviso): Complaint filed beyond the maximum 3-month condonation ceiling (more than 6 months total). The IC has no statutory authority to admit or condone this complaint. Must be referred to Local Committee or dismissed as time-barred.");
        return;
      }
      if (!isWithinLimitation && triageAction === "PROCEED") {
        alert("Limitation Notice: Complaint is beyond initial 3 months. You must choose 'Condone Delay' and record written reasons pursuant to the Proviso to Section 9(1).");
        return;
      }
      if (triageAction === "CONDONE" && !condonationReasons.trim()) {
        alert("Mandatory Statutory Requirement: Section 9(1) Proviso mandates that the IC record its reasons in writing for condoning delay.");
        return;
      }

      platformStore.updateCaseState(
        poshCase.id,
        "NOTICE_SERVED",
        `Triage passed. Jurisdiction and limitation verified. Condonation: ${isWithinLimitation ? "N/A" : condonationReasons || "Approved under Section 9(1) Proviso"}`
      );
      alert("Triage decision recorded: Proceed to Notice of Inquiry (Section 11).");
    } else if (triageAction === "REFER_LC") {
      platformStore.updateCaseState(
        poshCase.id,
        "REFERRED_TO_LC",
        "Referred to District Local Committee (LC) due to lack of workplace IC jurisdiction or statutory time-bar."
      );
      alert("Docket routed to District Local Committee.");
    } else {
      alert("Information request dispatched to complainant.");
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
        {/* Breadcrumb Navigation */}
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
              href={`/posh/ic/cases/${poshCase.id}/conciliation`}
              className="text-primary font-semibold hover:underline"
            >
              Conciliation (Sec 10) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <Scale className="w-4 h-4 text-primary" />
            <span>PRD Screen I-03 &bull; Preliminary Assessment &amp; Limitation</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            Statutory Triage &amp; Jurisdiction Verification
          </h1>
          <p className="text-xs text-ink-secondary leading-relaxed">
            Docket <span className="font-mono font-bold text-primary">{poshCase.caseNumber}</span> &bull; Verify statutory conditions precedent under Section 2, 4, and 9 of the POSH Act 2013 prior to initiating formal inquiry.
          </p>
        </div>

        <form onSubmit={handleSaveTriage} className="space-y-6">
          {/* Statutory Checklist */}
          <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-6">
            <h2 className="font-serif font-bold text-base text-ink border-b border-border-subtle pb-3">
              1. Four-Point Statutory Threshold Assessment
            </h2>

            {/* Point 1: Aggrieved Woman */}
            <div className="bg-white p-4 rounded border border-border space-y-2 text-xs">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAggrievedWoman}
                  onChange={(e) => setIsAggrievedWoman(e.target.checked)}
                  className="mt-0.5 rounded text-primary"
                />
                <div>
                  <div className="font-bold text-ink text-sm">
                    Aggrieved Woman Definition &bull; Section 2(a)
                  </div>
                  <div className="text-ink-secondary leading-relaxed mt-0.5">
                    Is the complainant a woman of any age, whether employed or not (regular, temporary, ad hoc, daily wage, probationer, apprentice, or visitor), alleging sexual harassment?
                  </div>
                </div>
              </label>
            </div>

            {/* Point 2: Workplace Jurisdiction */}
            <div className="bg-white p-4 rounded border border-border space-y-2 text-xs">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isWorkplaceJurisdiction}
                  onChange={(e) => setIsWorkplaceJurisdiction(e.target.checked)}
                  className="mt-0.5 rounded text-primary"
                />
                <div>
                  <div className="font-bold text-ink text-sm">
                    Workplace Jurisdiction &bull; Section 2(o) &amp; Extended Workplace Doctrine
                  </div>
                  <div className="text-ink-secondary leading-relaxed mt-0.5">
                    Did the alleged acts occur within the office, client site, business travel, official dinner, company-provided transport, or electronic/remote communication channel?
                  </div>
                </div>
              </label>
            </div>

            {/* Limitation Calculator Output */}
            <div className={`p-4 rounded border text-xs space-y-1.5 ${
              limitationEvaluation.status === "WITHIN_LIMITATION"
                ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                : limitationEvaluation.status === "REQUIRES_CONDONATION"
                ? "bg-amber-50 border-amber-200 text-amber-950"
                : "bg-red-50 border-red-200 text-red-950"
            }`}>
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-primary" />
                  Statutory Limitation Evaluation (Section 9(1) &amp; Proviso)
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  limitationEvaluation.status === "WITHIN_LIMITATION"
                    ? "bg-emerald-200 text-emerald-900"
                    : limitationEvaluation.status === "REQUIRES_CONDONATION"
                    ? "bg-amber-200 text-amber-900"
                    : "bg-red-200 text-red-900"
                }`}>
                  {limitationEvaluation.status.replace(/_/g, " ")}
                </span>
              </div>
              <div className="text-[11px] leading-relaxed">
                {limitationEvaluation.message}
              </div>
              {limitationEvaluation.status === "STATUTORILY_BARRED" && (
                <div className="text-[11px] font-bold text-red-700 pt-1">
                  &bull; IC Authority Barred: Section 9(1) Proviso strictly limits condonation to a maximum of 3 additional months. Complaints older than 6 months cannot be admitted for inquiry.
                </div>
              )}
            </div>

            {/* Point 3: Limitation */}
            <div className="bg-white p-4 rounded border border-border space-y-3 text-xs">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isWithinLimitation}
                  onChange={(e) => setIsWithinLimitation(e.target.checked)}
                  className="mt-0.5 rounded text-primary"
                />
                <div>
                  <div className="font-bold text-ink text-sm">
                    Limitation Period &bull; Section 9(1) (Within 3 Months)
                  </div>
                  <div className="text-ink-secondary leading-relaxed mt-0.5">
                    Complaint filed within 3 months of the incident date (or last incident date in series of incidents).
                  </div>
                </div>
              </label>

              {!isWithinLimitation && (
                <div className="pl-7 pt-2 space-y-1">
                  <div className="font-bold text-amber-900">
                    Proviso to Section 9(1) Condonation of Delay (Max 3 Months Additional):
                  </div>
                  <textarea
                    rows={3}
                    value={condonationReasons}
                    onChange={(e) => setCondonationReasons(e.target.value)}
                    placeholder="Record recorded reasons satisfying the IC that circumstances prevented the woman from filing within 3 months (medical trauma, fear of reprisal, etc.)..."
                    className="w-full p-2.5 bg-surface border border-border rounded text-xs"
                    required
                  />
                </div>
              )}
            </div>

            {/* Point 4: IC Quorum & Conflict Check */}
            <div className="bg-white p-4 rounded border border-border space-y-2 text-xs">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isQuorumValid && conflictFree}
                  onChange={(e) => {
                    setIsQuorumValid(e.target.checked);
                    setConflictFree(e.target.checked);
                  }}
                  className="mt-0.5 rounded text-primary"
                />
                <div>
                  <div className="font-bold text-ink text-sm">
                    IC Quorum &amp; Conflict-of-Interest Clearance &bull; Section 4
                  </div>
                  <div className="text-ink-secondary leading-relaxed mt-0.5">
                    Quorum verified: Presiding Officer, at least 2 employee members, 1 external member, and at least 50% women. All assigned members have signed Form IC-DEC (No Conflict).
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Triage Decision Selection */}
          <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
            <h2 className="font-serif font-bold text-base text-ink">
              2. Formal Triage Determination
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <button
                type="button"
                disabled={limitationEvaluation.status === "STATUTORILY_BARRED"}
                onClick={() => setTriageAction("PROCEED")}
                className={`p-4 rounded border text-left transition-colors ${
                  limitationEvaluation.status === "STATUTORILY_BARRED"
                    ? "bg-surface-muted text-ink-secondary/50 border-border cursor-not-allowed opacity-50"
                    : triageAction === "PROCEED"
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-ink border-border hover:bg-surface"
                }`}
              >
                <div className="font-bold text-sm">Admit Docket</div>
                <div className="text-[11px] opacity-80 mt-1">
                  {limitationEvaluation.status === "STATUTORILY_BARRED"
                    ? "Disabled: Barred by statute (> 6 months)."
                    : "All statutory criteria satisfied. Proceed to notice & inquiry."}
                </div>
              </button>

              <button
                type="button"
                disabled={limitationEvaluation.status === "STATUTORILY_BARRED"}
                onClick={() => setTriageAction("CONDONE")}
                className={`p-4 rounded border text-left transition-colors ${
                  limitationEvaluation.status === "STATUTORILY_BARRED"
                    ? "bg-surface-muted text-ink-secondary/50 border-border cursor-not-allowed opacity-50"
                    : triageAction === "CONDONE"
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-ink border-border hover:bg-surface"
                }`}
              >
                <div className="font-bold text-sm">Condone Delay</div>
                <div className="text-[11px] opacity-80 mt-1">
                  {limitationEvaluation.status === "STATUTORILY_BARRED"
                    ? "Disabled: Condonation ceiling exceeded."
                    : "Admit under Proviso to Sec 9(1) with recorded grounds."}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTriageAction("REFER_LC")}
                className={`p-4 rounded border text-left transition-colors ${
                  triageAction === "REFER_LC"
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-ink border-border hover:bg-surface"
                }`}
              >
                <div className="font-bold text-sm">Refer to Local Committee</div>
                <div className="text-[11px] opacity-80 mt-1">
                  Harassment alleged against employer or outside workplace scope.
                </div>
              </button>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-border-subtle">
              <Link
                href={`/posh/ic/cases/${poshCase.id}`}
                className="px-4 py-2 border border-border rounded text-xs font-semibold text-ink hover:bg-white"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded text-xs font-semibold hover:bg-primary-hover flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Record Triage Order</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
