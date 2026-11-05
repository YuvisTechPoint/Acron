"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scale,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Send,
  Lock
} from "lucide-react";

export default function ComplainantMotionsPage() {
  const [requestType, setRequestType] = useState<"CONCILIATION" | "WITHDRAWAL">("CONCILIATION");
  const [statement, setStatement] = useState("");
  const [noMonetaryAck, setNoMonetaryAck] = useState(false);
  const [noCoercionAck, setNoCoercionAck] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requestType === "CONCILIATION" && !noMonetaryAck) {
      alert("You must acknowledge that no monetary settlement can form the basis of conciliation.");
      return;
    }
    if (requestType === "WITHDRAWAL" && !noCoercionAck) {
      alert("You must confirm this withdrawal is made freely without coercion or inducement.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/posh/my-case"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Case Status</span>
          </Link>
          <span className="text-[11px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
            PRD Screen Ref: C-09
          </span>
        </div>

        {/* Header */}
        <div className="bg-white p-6 rounded-card border border-border shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
            <Scale className="w-4 h-4 text-primary" />
            <span>Procedural Motions &bull; Section 10 (C-09)</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink mt-1">
            Section 10 Conciliation &amp; Formal Motions
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Exercise your statutory rights under the POSH Act to request conciliation prior to formal inquiry, or submit a formal withdrawal petition.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <Link
              href="/posh/my-case"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
            >
              Overview &amp; Timers
            </Link>
            <Link
              href="/posh/my-case/docs"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
            >
              Documents &amp; Evidence (C-07)
            </Link>
            <Link
              href="/posh/my-case/interim"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
            >
              Interim Relief (C-08)
            </Link>
            <span className="px-3 py-1.5 bg-primary text-white rounded font-bold">
              Conciliation / Motions (C-09)
            </span>
            <Link
              href="/posh/my-case/support"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
            >
              Support Accommodations (C-10)
            </Link>
          </div>
        </div>

        {/* Action Form */}
        {submitted ? (
          <div className="bg-white p-8 rounded-card border border-emerald-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-ink">Motion Registered with Internal Committee</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your submission has been logged into the case docket. The Presiding Officer and Acorn External Member will review your petition in strict confidence.
            </p>
            <Link
              href="/posh/my-case"
              className="inline-block mt-3 px-4 py-2 bg-primary text-white text-xs font-semibold rounded"
            >
              Return to Case Progress Tracker
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-card border border-border shadow-sm space-y-6">
            
            {/* Toggle */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Select Motion Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRequestType("CONCILIATION")}
                  className={`p-3.5 rounded-lg border text-left transition ${
                    requestType === "CONCILIATION"
                      ? "border-primary bg-primary/5 text-primary font-bold shadow-sm"
                      : "border-border text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="text-xs">Section 10 Conciliation</div>
                  <div className="text-[11px] font-normal text-slate-500 mt-0.5">
                    Request amicable resolution (apology, behavioral agreement) prior to formal inquiry.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRequestType("WITHDRAWAL")}
                  className={`p-3.5 rounded-lg border text-left transition ${
                    requestType === "WITHDRAWAL"
                      ? "border-primary bg-primary/5 text-primary font-bold shadow-sm"
                      : "border-border text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="text-xs">Withdrawal of Complaint</div>
                  <div className="text-[11px] font-normal text-slate-500 mt-0.5">
                    Formal application to discontinue proceedings with anti-coercion review.
                  </div>
                </button>
              </div>
            </div>

            {/* Explanation box */}
            {requestType === "CONCILIATION" && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 leading-relaxed">
                <strong>Statutory Notice under Section 10(1) Proviso:</strong>
                <p className="mt-1">
                  &ldquo;Provided that no monetary settlement shall be made as a basis of conciliation.&rdquo;
                  Settlements can include formal written apologies, departmental transfers, sensitivity coaching, or behavioral commitments. Once recorded and implemented, no further inquiry shall be conducted.
                </p>
              </div>
            )}

            {requestType === "WITHDRAWAL" && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded text-xs text-blue-900 leading-relaxed">
                <strong>Anti-Coercion Safeguard (Rule BR-038):</strong>
                <p className="mt-1">
                  The Internal Committee has a legal obligation under the Act to ensure that any request for withdrawal is genuinely voluntary and not the result of threat, inducement, retaliation, or duress by the respondent or employer.
                </p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                {requestType === "CONCILIATION"
                  ? "Proposed Terms / Objectives for Conciliation *"
                  : "Reasons for Requesting Withdrawal *"}
              </label>
              <textarea
                rows={4}
                required
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                placeholder={
                  requestType === "CONCILIATION"
                    ? "State what terms you seek (e.g. unconditional written apology, commitment to maintain professional distance, relocation to another project)..."
                    : "Detail the background and reasons for requesting withdrawal of the formal complaint..."
                }
                className="w-full text-xs p-2.5 border border-border rounded focus:outline-none focus:border-primary"
              />
            </div>

            {/* Mandatory Acknowledgement Checkboxes */}
            <div className="space-y-2.5 pt-2 border-t border-border">
              {requestType === "CONCILIATION" && (
                <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={noMonetaryAck}
                    onChange={(e) => setNoMonetaryAck(e.target.checked)}
                    className="mt-0.5 rounded text-primary border-border"
                  />
                  <span>
                    I solemnly confirm and acknowledge that this conciliation request involves <strong>no monetary settlement</strong>, payment, or financial consideration whatsoever, in strict adherence to Section 10(1) of the POSH Act 2013.
                  </span>
                </label>
              )}

              {requestType === "WITHDRAWAL" && (
                <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={noCoercionAck}
                    onChange={(e) => setNoCoercionAck(e.target.checked)}
                    className="mt-0.5 rounded text-primary border-border"
                  />
                  <span>
                    I solemnly affirm that this withdrawal is initiated of my own free will and volition, without any fear, favour, threat, promise, coercion or inducement from any person.
                  </span>
                </label>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded flex items-center gap-1.5 transition shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Motion to IC</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

