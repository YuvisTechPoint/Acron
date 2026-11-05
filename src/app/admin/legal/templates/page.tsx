"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, ArrowLeft, CheckCircle2, Lock, Eye, Download } from "lucide-react";

export default function LegalTemplatesConsolePage() {
  const templates = [
    { code: "DOC-01", name: "Written Complaint Record", stage: "Intake", lang: "EN, BN, HI", version: "v2.0" },
    { code: "DOC-02", name: "Acknowledgement of Complaint", stage: "Intake", lang: "EN, BN, HI", version: "v2.0" },
    { code: "DOC-05", name: "IC Constitution Order (Sec 4)", stage: "Setup", lang: "EN", version: "v2.0" },
    { code: "DOC-06", name: "IC Confidentiality Undertaking (Sec 16)", stage: "Case", lang: "EN", version: "v2.0" },
    { code: "DOC-11", name: "Conciliation Terms & Outcome Record (Sec 10)", stage: "Conciliation", lang: "EN", version: "v2.0" },
    { code: "DOC-12", name: "Notice of Inquiry to Respondent (Rule 7)", stage: "Notice", lang: "EN, BN, HI", version: "v2.0" },
    { code: "DOC-14", name: "Interim Relief Recommendation (Sec 12)", stage: "Interim", lang: "EN", version: "v2.0" },
    { code: "DOC-16", name: "Hearing Notice & Summons", stage: "Inquiry", lang: "EN, BN", version: "v2.0" },
    { code: "DOC-19", name: "Hearing Minutes of Meeting", stage: "Inquiry", lang: "EN", version: "v2.0" },
    { code: "DOC-22", name: "Final Statutory Inquiry Report (Sec 13)", stage: "Report", lang: "EN", version: "v2.0" },
    { code: "DOC-31", name: "Section 21 Annual Report for District Officer", stage: "Reporting", lang: "EN", version: "v2.0" },
    { code: "DOC-34", name: "Notice of Penal Consequences for Display (Sec 19)", stage: "Display", lang: "EN, BN, HI", version: "v2.0" },
  ];

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-card">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-1.5 rounded hover:bg-surface text-ink-secondary hover:text-ink transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-bold">
                Legal Console &bull; Section 8.26
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Statutory Document &amp; Notice Template Library
              </h1>
            </div>
          </div>

          <Link
            href="/admin/legal/rules"
            className="text-xs text-primary font-semibold hover:underline"
          >
            &larr; View Rules Engine
          </Link>
        </div>

        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <table className="w-full text-left">
            <thead className="bg-surface border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
              <tr>
                <th className="p-3.5">Code</th>
                <th className="p-3.5">Template Name</th>
                <th className="p-3.5">Workflow Stage</th>
                <th className="p-3.5">Languages</th>
                <th className="p-3.5">Version</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {templates.map((t) => (
                <tr key={t.code} className="hover:bg-surface/50">
                  <td className="p-3.5 font-mono font-bold text-primary">{t.code}</td>
                  <td className="p-3.5 font-semibold text-ink">{t.name}</td>
                  <td className="p-3.5 text-ink-secondary">{t.stage}</td>
                  <td className="p-3.5 text-ink-secondary font-semibold">{t.lang}</td>
                  <td className="p-3.5 font-mono text-[11px]">{t.version}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => alert(`Previewing locked template ${t.code} (${t.name}). Verified by Acorn Legal Counsel.`)}
                      className="px-2.5 py-1 border border-border rounded text-[11px] font-semibold text-primary hover:bg-surface"
                    >
                      Preview &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

