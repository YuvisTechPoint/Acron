"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldAlert, CheckCircle2, ArrowRight, AlertTriangle } from "lucide-react";
import { platformStore } from "@/lib/store";

export default function PoshRetaliationPage() {
  const [caseNumber, setCaseNumber] = useState("POSH-TECHKOL-2026-0014");
  const [reporterName, setReporterName] = useState("");
  const [retaliationDetails, setRetaliationDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    platformStore.addAuditLog(
      "Complainant",
      "complainant",
      "PRIORITY_RETALIATION_FLAG",
      "case",
      caseNumber,
      `URGENT: Retaliation incident reported for case ${caseNumber}`
    );
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="max-w-xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-border pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-status-danger font-bold">
            <ShieldAlert className="w-4 h-4 text-status-danger" />
            <span>Highest Priority Redressal</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink mt-1">
            Report Retaliation or Hostile Actions
          </h1>
          <p className="text-xs text-ink-secondary mt-1">
            Retaliation against a complainant, witness, or IC member is a grave statutory violation. The IC will issue urgent protective directives to the employer.
          </p>
        </div>

        <div className="bg-surface rounded-card p-6 sm:p-8 border border-border shadow-card">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-red-100 text-status-danger rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-xl text-ink">
                Priority Incident Escalated
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                The Internal Committee Presiding Officer and Acorn External Member have received immediate notification. Interim protective measures will be reviewed within 24 hours.
              </p>
              <div className="pt-2">
                <Link
                  href="/posh/portal"
                  className="px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover transition-colors inline-block"
                >
                  Return to Portal Desk
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Associated Case ID *
                </label>
                <input
                  type="text"
                  required
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  placeholder="POSH-ORG-YYYY-NNNN"
                  className="w-full text-xs font-mono px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  placeholder="Complainant or Witness Name"
                  className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Specific Details of Retaliation / Threats *
                </label>
                <textarea
                  required
                  rows={5}
                  value={retaliationDetails}
                  onChange={(e) => setRetaliationDetails(e.target.value)}
                  placeholder="Describe negative appraisal ratings, isolation, verbal intimidation, abrupt reassignment, or hostile communications."
                  className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <Link
                  href="/posh/portal"
                  className="text-xs text-ink-secondary hover:text-ink underline"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-status-danger hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-colors"
                >
                  Escalate Immediately
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

