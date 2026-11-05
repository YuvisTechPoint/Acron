"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Scale,
  Calendar,
  AlertTriangle,
  Clock,
  UserCheck,
  FileText,
  Search,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate, calculateDaysRemaining } from "@/lib/utils";

export default function ICWorkspaceDashboard() {
  const [filterState, setFilterState] = useState<string>("ALL");
  const cases = platformStore.getCases();

  const filteredCases = filterState === "ALL"
    ? cases
    : cases.filter((c) => c.state === filterState);

  return (
    <div className="bg-ivory-50 min-h-screen py-10 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Workspace Header */}
        <div className="border-b border-border pb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-bold uppercase tracking-wider">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Internal Committee (IC) Confidential Workspace</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink mt-2">
              Statutory Case Roster &amp; Inquiries
            </h1>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              For Presiding Officers, IC Members, and Acorn Legal External Members. Protected under POSH Act Section 16.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/posh/org"
              className="px-4 py-2 border border-border text-xs font-semibold rounded hover:bg-surface transition-colors"
            >
              Org Console &rarr;
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded shadow transition-colors"
            >
              Acorn Admin Control
            </Link>
          </div>
        </div>

        {/* Live Statutory Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-surface p-4 rounded-card border border-border">
            <div className="text-xs text-ink-secondary">Total Assigned Cases</div>
            <div className="font-serif font-bold text-2xl text-primary mt-1">{cases.length}</div>
            <div className="text-[11px] text-emerald-700 mt-1">&bull; Active statutory dockets</div>
          </div>

          <div className="bg-surface p-4 rounded-card border border-border">
            <div className="text-xs text-ink-secondary">Inquiry in Progress (&lt;90 Days)</div>
            <div className="font-serif font-bold text-2xl text-amber-700 mt-1">
              {cases.filter((c) => c.state !== "CLOSED").length}
            </div>
            <div className="text-[11px] text-ink-secondary mt-1">&bull; Strict statutory countdown</div>
          </div>

          <div className="bg-surface p-4 rounded-card border border-border">
            <div className="text-xs text-ink-secondary">Hearings Scheduled</div>
            <div className="font-serif font-bold text-2xl text-primary mt-1">
              {cases.reduce((acc, c) => acc + (c.hearings ? c.hearings.filter((h) => h.status === "scheduled").length : 0), 0)}
            </div>
            <div className="text-[11px] text-ink-secondary mt-1">&bull; Natural justice examinations</div>
          </div>

          <div className="bg-surface p-4 rounded-card border border-border">
            <div className="text-xs text-ink-secondary">Statutory Compliance Status</div>
            <div className="font-serif font-bold text-2xl text-emerald-700 mt-1">100%</div>
            <div className="text-[11px] text-emerald-700 mt-1">&bull; Zero timeline defaults</div>
          </div>
        </div>

        {/* Case List Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface p-4 rounded-card border border-border">
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setFilterState("ALL")}
              className={`px-3 py-1.5 rounded font-medium ${
                filterState === "ALL" ? "bg-primary text-white" : "bg-white border border-border text-ink hover:bg-surface-muted"
              }`}
            >
              All Cases ({cases.length})
            </button>
            <button
              onClick={() => setFilterState("PRELIMINARY_ASSESSMENT")}
              className={`px-3 py-1.5 rounded font-medium ${
                filterState === "PRELIMINARY_ASSESSMENT" ? "bg-primary text-white" : "bg-white border border-border text-ink hover:bg-surface-muted"
              }`}
            >
              Triage &amp; Limitation
            </button>
            <button
              onClick={() => setFilterState("HEARING_SCHEDULED")}
              className={`px-3 py-1.5 rounded font-medium ${
                filterState === "HEARING_SCHEDULED" ? "bg-primary text-white" : "bg-white border border-border text-ink hover:bg-surface-muted"
              }`}
            >
              Hearings Underway
            </button>
          </div>
        </div>

        {/* Cases Table */}
        <div className="bg-surface rounded-card border border-border overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ink">
              <thead className="bg-white border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
                <tr>
                  <th className="p-4">Case Identifier</th>
                  <th className="p-4">Organisation</th>
                  <th className="p-4">Complainant / Respondent</th>
                  <th className="p-4">Statutory 90-Day Deadline</th>
                  <th className="p-4">State</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle bg-white">
                {filteredCases.map((c) => {
                  const deadlineInfo = calculateDaysRemaining(c.inquiryDeadline);
                  return (
                    <tr key={c.id} className="hover:bg-surface transition-colors">
                      <td className="p-4">
                        <div className="font-mono font-bold text-primary">{c.caseNumber}</div>
                        <div className="text-[11px] text-ink-secondary">Filed: {formatDate(c.filedAt)}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-ink">{c.orgName}</div>
                        <div className="text-[11px] text-ink-secondary">Sector V, Kolkata</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-ink">
                          {c.complainantName} <span className="text-ink-secondary text-[10px]">({c.complainantDesignation})</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          vs. {c.respondentName} ({c.respondentDesignation})
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-primary">{formatDate(c.inquiryDeadline)}</div>
                        <div className="text-[11px] text-emerald-700 font-medium">
                          {deadlineInfo.label}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary-light text-primary">
                          {c.state}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/posh/ic/cases/${c.id}`}
                          className="px-3.5 py-1.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover transition-colors inline-flex items-center gap-1.5"
                        >
                          <span>Open File</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

