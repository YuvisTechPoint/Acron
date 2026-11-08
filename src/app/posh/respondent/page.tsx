"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  ShieldAlert,
  CheckCircle2,
  Download,
  Upload,
  ArrowRight,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate, calculateDaysRemaining } from "@/lib/utils";

export default function PoshRespondentDeskPage() {
  const [caseId, setCaseId] = useState("POSH-TECHKOL-2026-0014");
  const [defenseStatement, setDefenseStatement] = useState("");
  const [witnessNames, setWitnessNames] = useState("");
  const [submittedReply, setSubmittedReply] = useState(false);

  const poshCase = platformStore.getCaseById(caseId);

  const handleSubmitDefense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!poshCase) return;

    poshCase.respondentDefenseSummary = defenseStatement;
    poshCase.respondentReplyReceivedAt = new Date().toISOString();
    poshCase.state = "REPLY_RECEIVED";
    platformStore.updateCaseState(
      poshCase.id,
      "REPLY_RECEIVED",
      "Respondent submitted formal written statement and defense documents"
    );
    setSubmittedReply(true);
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-16 text-ink">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="border-b border-border pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-accent font-bold">
              Statutory Redressal &bull; Natural Justice
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
              Respondent Desk &amp; Formal Reply Portal
            </h1>
            <p className="text-xs text-ink-secondary mt-1">
              In accordance with Section 11 of the POSH Act 2013 and Rule 7, you are provided full opportunity to examine allegations and submit your written statement.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/posh/respondent/reply"
              className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover transition-colors"
            >
              Dedicated Reply Portal (R-02) &rarr;
            </Link>
            <Link
              href="/posh/respondent/status"
              className="px-3 py-1.5 border border-border text-xs font-semibold rounded hover:bg-surface text-ink transition-colors"
            >
              Case Status (R-03)
            </Link>
            <Link
              href="/posh/portal"
              className="text-xs text-primary font-semibold hover:underline"
            >
              &larr; Portal Home
            </Link>
          </div>
        </div>

        {poshCase && (
          <div className="space-y-6">
            {/* Notice Summary Card */}
            <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-border-subtle pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-primary">{poshCase.caseNumber}</span>
                  <h3 className="font-serif font-bold text-lg text-ink mt-0.5">
                    Notice of Inquiry &bull; {poshCase.orgName}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded bg-amber-100 text-amber-900 text-xs font-bold">
                    Reply Deadline: {formatDate(poshCase.respondentReplyDeadline || "2026-10-08")}
                  </span>
                </div>
              </div>

              {/* Allegation Summary */}
              <div className="bg-white p-4 rounded border border-border space-y-2 text-xs">
                <div className="font-bold text-primary uppercase tracking-wider text-[11px]">
                  Summary of Allegations Served:
                </div>
                <p className="text-ink leading-relaxed">
                  {poshCase.summary}
                </p>
                <div className="text-[11px] text-ink-secondary pt-1">
                  Incident Dates: {poshCase.incidentDates?.join(", ") || "Not specified"} &bull; Location: {poshCase.incidentLocation || "Kolkata"}
                </div>
              </div>

              {/* Anti-Retaliation Warning */}
              <div className="p-3.5 bg-red-50 rounded border border-red-200 text-xs text-red-900 flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Statutory Anti-Retaliation Directive:</strong> You are strictly directed not to initiate contact (direct or indirect), harass, intimidate, or influence the complainant or any prospective witnesses during the pendency of inquiry. Any breach will be recorded as misconduct.
                </div>
              </div>
            </div>

            {/* Written Reply Submission */}
            <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-4">
              <h3 className="font-serif font-bold text-base text-ink">
                Submit Written Statement of Defense &amp; List of Witnesses
              </h3>

              {submittedReply ? (
                <div className="p-6 bg-emerald-50 rounded border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <div className="font-serif font-bold text-lg text-emerald-950">
                    Written Reply Submitted Successfully
                  </div>
                  <p className="text-xs text-emerald-900">
                    Your defense statement and witness nominations have been delivered to the Internal Committee. You will receive formal summons regarding the date of your personal hearing.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitDefense} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">
                      Detailed Written Statement &bull; Your Defense *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={defenseStatement}
                      onChange={(e) => setDefenseStatement(e.target.value)}
                      placeholder="State your response to each allegation, including chronology, contextual facts, and explanations."
                      className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">
                      List of Witnesses You Wish to Produce (Names &amp; Contact Details)
                    </label>
                    <input
                      type="text"
                      value={witnessNames}
                      onChange={(e) => setWitnessNames(e.target.value)}
                      placeholder="e.g. S. Sen (Lead Developer), M. Roy (Finance Manager)"
                      className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-colors flex items-center gap-2"
                    >
                      <span>Submit Formal Defense Statement</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

