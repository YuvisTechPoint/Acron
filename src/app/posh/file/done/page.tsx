"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Printer, ArrowRight, ExternalLink, Phone } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function PoshSubmissionDonePage() {
  const [activeCase, setActiveCase] = useState<any | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("acorn_posh_active_case");
      if (stored) {
        setActiveCase(JSON.parse(stored));
      }
    }
  }, []);

  const caseNumber = activeCase ? activeCase.caseNumber : "POSH-TECHKOL-2026-0015";
  const orgName = activeCase ? activeCase.orgName : "Kolkata Cloud Technologies Pvt Ltd";

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Success Card */}
        <div className="bg-surface rounded-card p-8 border border-border shadow-modal text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            Complaint Registered Successfully
          </h1>

          <div className="inline-block bg-white px-5 py-2.5 rounded border border-border">
            <div className="text-[11px] text-ink-secondary uppercase tracking-wider font-semibold">
              Official Case Identifier
            </div>
            <div className="font-mono text-lg font-bold text-primary mt-0.5">
              {caseNumber}
            </div>
          </div>

          <p className="text-xs text-ink-secondary max-w-lg mx-auto leading-relaxed">
            Your complaint has been submitted under strict Section 16 statutory confidentiality and routed to the Internal Committee of <strong>{orgName}</strong>.
          </p>

          {/* Statutory Timelines Next Steps */}
          <div className="bg-white p-5 rounded border border-border-subtle text-left space-y-3 text-xs text-ink">
            <div className="font-bold text-primary uppercase tracking-wider text-[11px]">
              What Happens Next (Statutory Sequence):
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="font-bold text-primary">&bull;</span>
                <span>
                  <strong>Within 7 Working Days:</strong> The IC will serve formal notice of the complaint and evidence to the respondent (under 2013 Statutory Rules).
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-primary">&bull;</span>
                <span>
                  <strong>10 Working Days:</strong> The respondent is granted 10 working days to submit a written reply and witness list.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-primary">&bull;</span>
                <span>
                  <strong>Within 90 Days:</strong> The IC will conduct private hearings and conclude the statutory inquiry in full compliance with natural justice.
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-white border border-border text-ink text-xs font-semibold rounded hover:bg-surface flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Print Acknowledgment</span>
            </button>

            <Link
              href="/posh/my-case"
              className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-colors flex items-center gap-2"
            >
              <span>Track Case Progress</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => {
                window.location.replace("https://www.google.com/search?q=kolkata+weather+forecast");
              }}
              className="px-4 py-2.5 bg-status-danger text-white text-xs font-semibold rounded hover:bg-red-700 transition-colors"
            >
              Safe Quick Exit (ESC)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

