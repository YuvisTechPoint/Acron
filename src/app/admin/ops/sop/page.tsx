"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, Calendar, RefreshCw } from "lucide-react";

interface SopItem {
  id: string;
  name: string;
  cadence: "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Annual";
  targetTime: string;
  owner: string;
  lastExecuted: string;
  nextDue: string;
  status: "Completed" | "Scheduled" | "Overdue";
}

const SOP_REGISTER: SopItem[] = [
  { id: "SOP-01", name: "Daily Timers & Deadlines Scan", cadence: "Daily", targetTime: "08:00 IST", owner: "Automated BullMQ Worker", lastExecuted: "Today, 08:00 IST", nextDue: "Tomorrow, 08:00 IST", status: "Completed" },
  { id: "SOP-02", name: "Daily Incident & Telemetry Triage", cadence: "Daily", targetTime: "09:00 IST", owner: "DevOps Duty Engineer", lastExecuted: "Today, 09:12 IST", nextDue: "Tomorrow, 09:00 IST", status: "Completed" },
  { id: "SOP-03", name: "Weekly Audit Hash Chain Integrity Run", cadence: "Weekly", targetTime: "Every Monday 06:00 IST", owner: "Security Engineer", lastExecuted: "03-Nov-2026", nextDue: "10-Nov-2026", status: "Scheduled" },
  { id: "SOP-04", name: "Monthly Backup Restoration Drill", cadence: "Monthly", targetTime: "1st Sunday of Month", owner: "DevOps Lead", lastExecuted: "01-Nov-2026", nextDue: "01-Dec-2026", status: "Completed" },
  { id: "SOP-05", name: "Quarterly Precedent & Statutory Rules Review", cadence: "Quarterly", targetTime: "End of Quarter", owner: "Acorn Legal Counsel", lastExecuted: "30-Sep-2026", nextDue: "31-Dec-2026", status: "Scheduled" },
  { id: "SOP-06", name: "Annual POSH Section 21 Filings Consolidation", cadence: "Annual", targetTime: "31st January", owner: "POSH Practice Desk", lastExecuted: "31-Jan-2026", nextDue: "31-Jan-2027", status: "Scheduled" },
  { id: "SOP-07", name: "Quarterly Security Access & RBAC Review", cadence: "Quarterly", targetTime: "Quarter End", owner: "Super Admin", lastExecuted: "30-Sep-2026", nextDue: "31-Dec-2026", status: "Scheduled" },
  { id: "SOP-08", name: "Monthly SSL/TLS & Domain Expiry Verification", cadence: "Monthly", targetTime: "15th of Month", owner: "Infra Engineer", lastExecuted: "15-Oct-2026", nextDue: "15-Nov-2026", status: "Scheduled" },
];

export default function SopRegisterPage() {
  const [filter, setFilter] = useState<string>("All");

  const filtered = filter === "All" ? SOP_REGISTER : SOP_REGISTER.filter((s) => s.cadence === filter);

  return (
    <div className="bg-ivory-50 min-h-screen py-8 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link href="/admin/ops" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brass-700 hover:text-navy-900 transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Operations Command Centre</span>
        </Link>

        {/* Header */}
        <div className="bg-white p-6 rounded-card border border-border shadow-card flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-brass-700 font-bold block">
              OPERATING PROCEDURES &bull; RECURRENCE ENGINE
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950 mt-1">
              Standard Operating Procedures (SOP) Register
            </h1>
            <p className="text-xs text-ink-secondary mt-0.5">
              Automated cadence tracker, recurrence schedules, and accountability owners for firm operations.
            </p>
          </div>
        </div>

        {/* Cadence Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
          {["All", "Daily", "Weekly", "Monthly", "Quarterly", "Annual"].map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-1.5 rounded-btn text-xs font-semibold transition ${
                filter === c
                  ? "bg-navy-700 text-white shadow-sm"
                  : "bg-white text-ink-secondary hover:text-ink border border-border hover:bg-surface"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* SOP Table */}
        <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
          <div className="divide-y divide-border text-xs">
            {filtered.map((sop) => (
              <div key={sop.id} className="p-4 sm:p-5 hover:bg-surface/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-brass-700">{sop.id}</span>
                    <span className="text-ink-muted">&bull;</span>
                    <span className="px-2 py-0.5 rounded-btn bg-surface font-semibold text-ink-secondary text-[10px]">{sop.cadence}</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-ink">{sop.name}</h4>
                  <div className="text-ink-secondary text-[11px]">
                    <span className="font-semibold text-ink">Target:</span> {sop.targetTime} &bull;{" "}
                    <span className="font-semibold text-ink">Owner:</span> {sop.owner}
                  </div>
                </div>

                <div className="flex sm:flex-col sm:items-end justify-between gap-1 text-[11px]">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-status-success-bg text-status-success font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{sop.status}</span>
                  </span>
                  <span className="text-ink-muted">Next Due: {sop.nextDue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
