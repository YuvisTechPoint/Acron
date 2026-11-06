"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Send,
  AlertTriangle,
  Building2,
  FileCheck
} from "lucide-react";
import { platformStore } from "@/lib/store";

export default function ComplainantInterimReliefPage() {
  const [caseId] = useState("POSH-TECHKOL-2026-0014");
  const [reliefType, setReliefType] = useState("REMOTE_WORK");
  const [justification, setJustification] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const poshCase = platformStore.getCaseById(caseId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!justification.trim()) return;
    platformStore.addInterimRelief(caseId, {
      type: reliefType,
      details: justification,
      status: "requested"
    });
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
            PRD Screen Ref: C-08
          </span>
        </div>

        {/* Header */}
        <div className="bg-white p-6 rounded-card border border-border shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
            <ShieldAlert className="w-4 h-4 text-primary" />
            <span>Statutory Safeguards &bull; Section 12 (C-08)</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink mt-1">
            Section 12 Interim Relief &amp; Workplace Protection
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            During inquiry pendency, you have the statutory right under Section 12 to request temporary workplace accommodations to protect your safety, wellbeing, and psychological security.
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
            <span className="px-3 py-1.5 bg-primary text-white rounded font-bold">
              Interim Relief (C-08)
            </span>
            <Link
              href="/posh/my-case/request"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
            >
              Conciliation / Motions (C-09)
            </Link>
            <Link
              href="/posh/my-case/support"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
            >
              Support Accommodations (C-10)
            </Link>
          </div>
        </div>

        {/* Active Relief Measures in Force */}
        <div className="bg-white p-6 rounded-card border border-border shadow-sm space-y-4">
          <h2 className="font-serif text-base font-bold text-ink flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Active Interim Measures Granted by IC</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-lg flex items-start justify-between">
              <div>
                <div className="font-bold text-emerald-900">Restraint on Performance Reporting (Sec 12(1)(b))</div>
                <p className="text-emerald-800 mt-0.5">
                  Respondent is legally restrained from writing, reviewing, or influencing complainant&apos;s annual or quarterly performance appraisals during inquiry.
                </p>
                <div className="text-[11px] text-emerald-700 font-mono mt-1">Order Ref: IC-ORD-2026-004 &bull; Effective until final report</div>
              </div>
              <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 font-bold rounded text-[10px]">
                ACTIVE
              </span>
            </div>

            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-lg flex items-start justify-between">
              <div>
                <div className="font-bold text-blue-900">Full Remote Work Arrangement (Sec 12(1)(a))</div>
                <p className="text-blue-800 mt-0.5">
                  Complainant permitted to work 100% remotely to avoid physical contact with the respondent at Kolkata Salt Lake Sector V office.
                </p>
                <div className="text-[11px] text-blue-700 font-mono mt-1">Order Ref: IC-ORD-2026-005 &bull; Implemented by HR</div>
              </div>
              <span className="px-2 py-0.5 bg-blue-200 text-blue-900 font-bold rounded text-[10px]">
                ACTIVE
              </span>
            </div>

            {poshCase?.interimReliefs && poshCase.interimReliefs.map((ir: any) => (
              <div key={ir.id} className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg flex items-start justify-between">
                <div>
                  <div className="font-bold text-amber-900">Requested: {ir.type}</div>
                  <p className="text-amber-800 mt-0.5">{ir.details}</p>
                  <div className="text-[11px] text-amber-700 font-mono mt-1">
                    Application Ref: {ir.id} &bull; Transmitted {new Date(ir.requestedAt || Date.now()).toLocaleDateString("en-IN")}
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-amber-200 text-amber-900 font-bold rounded text-[10px] uppercase">
                  {ir.status || "PENDING"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Request New Interim Relief Form */}
        {submitted ? (
          <div className="bg-white p-6 rounded-card border border-emerald-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-ink">Interim Relief Application Transmitted</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your petition under Section 12 has been delivered to Presiding Officer &amp; Acorn External Member. Under statutory rules, the IC will deliberate within 48 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 border border-border text-xs rounded hover:bg-slate-50 text-slate-700 font-medium"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-card border border-border shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-ink flex items-center gap-2">
              <Send className="w-4 h-4 text-primary" />
              <span>Apply for Additional Interim Relief</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Statutory Interim Relief Type *</label>
                <select
                  value={reliefType}
                  onChange={(e) => setReliefType(e.target.value)}
                  className="w-full p-2.5 border border-border rounded bg-white"
                >
                  <option value="PAID_LEAVE">Grant of Special Paid Leave up to 3 Months (Sec 12(1)(a))</option>
                  <option value="TRANSFER_RESPONDENT">Transfer of Respondent to Alternate Branch / Unit (Sec 12(1)(a))</option>
                  <option value="TRANSFER_COMPLAINANT">Voluntary Transfer to Alternate Location / Team</option>
                  <option value="NO_CONTACT">Strict Legal No-Contact Restraining Order</option>
                  <option value="REPORTING_LINE">Change of Functional Supervisory Reporting Line</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Grounds &amp; Urgency Statement *</label>
                <textarea
                  rows={4}
                  required
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  placeholder="Explain why this interim protection is necessary to prevent harassment, distress or professional detriment..."
                  className="w-full p-2.5 border border-border rounded"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200 text-slate-600 leading-relaxed text-[11px]">
                <strong>Section 12(2) Mandate:</strong> The employer is statutorily bound to implement the IC&apos;s recommendations for interim relief and send a compliance report to the committee within 7 days.
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary hover:bg-primary-light text-white font-bold rounded flex items-center gap-2 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Application to IC</span>
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}

