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
  Building,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { POSHCase } from "@/lib/types";

export default function ICInterimReliefPage() {
  const params = useParams();
  const caseId = (params?.id as string) || "case-01";
  const [poshCase, setPoshCase] = useState<POSHCase | undefined>(undefined);

  const [reliefType, setReliefType] = useState<"TRANSFER" | "PAID_LEAVE" | "RESTRAIN" | "APPRAISAL_PROTECT">("TRANSFER");
  const [reliefDetails, setReliefDetails] = useState(
    "Immediate temporary reassignment of the respondent to the New Town Development Centre, with complete segregation of team reporting structures and floor access during the inquiry pendency."
  );
  const [status, setStatus] = useState<"REQUESTED" | "RECOMMENDED" | "IMPLEMENTED">("RECOMMENDED");
  const [employerNotified, setEmployerNotified] = useState(true);

  useEffect(() => {
    const c = platformStore.getCaseById(caseId);
    if (c) setPoshCase(c);
  }, [caseId]);

  const handleRecommendInterimRelief = (e: React.FormEvent) => {
    e.preventDefault();
    if (!poshCase) return;

    poshCase.interimReliefRequested = {
      type: reliefType === "TRANSFER" ? "transfer" : reliefType === "PAID_LEAVE" ? "paid_leave_up_to_3_months" : "restrain_respondent",
      details: reliefDetails,
      status: "recommended",
      recommendedAt: new Date().toISOString(),
    };

    platformStore.updateCaseState(
      poshCase.id,
      poshCase.state,
      `Section 12 Interim Relief recommended to employer: ${reliefType}. Employer required to implement and send report to IC.`
    );

    setStatus("RECOMMENDED");
    alert("Interim Relief order issued to employer under Section 12 of POSH Act 2013.");
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
              href={`/posh/ic/cases/${poshCase.id}/close`}
              className="text-primary font-semibold hover:underline"
            >
              Closure &amp; Aftercare &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <ShieldAlert className="w-4 h-4 text-primary" />
            <span>PRD Screen I-09 &bull; Section 12 of POSH Act 2013</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            Statutory Interim Relief &amp; Workplace Protection
          </h1>
          <p className="text-xs text-ink-secondary leading-relaxed">
            Docket <span className="font-mono font-bold text-primary">{poshCase.caseNumber}</span> &bull; During the pendency of inquiry, the IC may recommend to the employer to transfer parties, grant paid leave up to 3 months, or restrain the respondent. The employer must implement and report back to the IC.
          </p>
        </div>

        {/* Interim Relief Options & Recommendation */}
        <form onSubmit={handleRecommendInterimRelief} className="bg-surface p-6 rounded-card border border-border shadow-card space-y-6">
          <h2 className="font-serif font-bold text-base text-ink border-b border-border-subtle pb-3">
            Section 12 Relief Evaluation
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <button
              type="button"
              onClick={() => setReliefType("TRANSFER")}
              className={`p-3.5 rounded border text-left transition-colors ${
                reliefType === "TRANSFER"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-ink border-border hover:bg-surface"
              }`}
            >
              <div className="font-bold">Workplace Transfer</div>
              <div className="text-[10px] opacity-80 mt-1">
                Transfer complainant or respondent to another site (Sec 12(1)(a)).
              </div>
            </button>

            <button
              type="button"
              onClick={() => setReliefType("PAID_LEAVE")}
              className={`p-3.5 rounded border text-left transition-colors ${
                reliefType === "PAID_LEAVE"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-ink border-border hover:bg-surface"
              }`}
            >
              <div className="font-bold">Paid Leave (Up to 3 Mo.)</div>
              <div className="text-[10px] opacity-80 mt-1">
                In addition to normal leave entitlements (Sec 12(1)(b)).
              </div>
            </button>

            <button
              type="button"
              onClick={() => setReliefType("RESTRAIN")}
              className={`p-3.5 rounded border text-left transition-colors ${
                reliefType === "RESTRAIN"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-ink border-border hover:bg-surface"
              }`}
            >
              <div className="font-bold">Restraining Directive</div>
              <div className="text-[10px] opacity-80 mt-1">
                Restrain contact, floor access, and communication.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setReliefType("APPRAISAL_PROTECT")}
              className={`p-3.5 rounded border text-left transition-colors ${
                reliefType === "APPRAISAL_PROTECT"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-ink border-border hover:bg-surface"
              }`}
            >
              <div className="font-bold">Appraisal Immunity</div>
              <div className="text-[10px] opacity-80 mt-1">
                Restrain respondent from reporting on work performance.
              </div>
            </button>
          </div>

          <div className="text-xs space-y-1">
            <label className="block text-ink-secondary font-medium">Interim Order Directives &amp; Specific Terms</label>
            <textarea
              rows={5}
              value={reliefDetails}
              onChange={(e) => setReliefDetails(e.target.value)}
              className="w-full p-3 bg-white border border-border rounded text-xs leading-relaxed focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div className="p-3.5 bg-white rounded border border-border flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={employerNotified}
                onChange={(e) => setEmployerNotified(e.target.checked)}
                className="rounded text-primary"
              />
              <span className="font-medium text-ink">
                Notify Employer Authorised Officer (60-day action obligation triggered)
              </span>
            </label>

            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Section 12(3) Mandatory Compliance</span>
            </span>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Link
              href={`/posh/ic/cases/${poshCase.id}`}
              className="px-4 py-2 border border-border rounded text-xs font-semibold text-ink hover:bg-white"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Issue Section 12 Interim Order</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
