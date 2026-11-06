"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LegalRulesConsolePage() {
  const [rules, setRules] = useState([
    { param: "complaint_period_months", value: "3", source: "Section 9(1) POSH Act", status: "Active (v1.0)" },
    { param: "complaint_extension_months", value: "3", source: "Section 9(1) Proviso", status: "Active (v1.0)" },
    { param: "copy_to_respondent_working_days", value: "7", source: "Rule 7(2) POSH Rules 2013", status: "Active (v1.0)" },
    { param: "respondent_reply_working_days", value: "10", source: "Rule 7(3) POSH Rules 2013", status: "Active (v1.0)" },
    { param: "inquiry_days", value: "90", source: "Section 11(4) POSH Act", status: "Active (v1.0)" },
    { param: "report_days", value: "10", source: "Section 13(1) POSH Act", status: "Active (v1.0)" },
    { param: "employer_action_days", value: "60", source: "Section 13(4) POSH Act", status: "Active (v1.0)" },
    { param: "appeal_days", value: "90", source: "Section 18 POSH Act", status: "Active (v1.0)" },
    { param: "conciliation_allows_monetary", value: "false", source: "Section 10(1) Proviso", status: "LOCKED (Statutory Guard)" },
  ]);

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
                Legal Console &bull; Section 8.30
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Effective-Dated Statutory Rules Engine
              </h1>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/admin/legal/templates"
              className="px-3.5 py-1.5 border border-border text-xs font-semibold rounded hover:bg-surface text-ink"
            >
              Templates Console &rarr;
            </Link>
            <Link
              href="/admin/legal/watch"
              className="px-3.5 py-1.5 border border-border text-xs font-semibold rounded hover:bg-surface text-ink"
            >
              Statutory Watch &rarr;
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <div className="p-4 bg-surface border-b border-border flex justify-between items-center">
            <span className="font-bold text-ink uppercase tracking-wider text-[11px]">
              Active Statutory Parameters (Effective Rule Set: v1.0 &bull; 29 Oct 2026)
            </span>
            <span className="text-[11px] text-emerald-700 font-bold">&check; Dual Approval Enforced</span>
          </div>

          <table className="w-full text-left">
            <thead className="bg-surface/50 border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
              <tr>
                <th className="p-3.5">Parameter Key</th>
                <th className="p-3.5">Configured Value</th>
                <th className="p-3.5">Statutory Source</th>
                <th className="p-3.5 text-right">Rule Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {rules.map((r, idx) => (
                <tr key={idx} className="hover:bg-surface/50">
                  <td className="p-3.5 font-mono font-bold text-primary">{r.param}</td>
                  <td className="p-3.5 font-bold text-ink">{r.value}</td>
                  <td className="p-3.5 text-ink-secondary">{r.source}</td>
                  <td className="p-3.5 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.param === "conciliation_allows_monetary"
                        ? "bg-red-100 text-status-danger"
                        : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {r.status}
                    </span>
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

