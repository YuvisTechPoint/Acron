"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  RefreshCw,
  Download,
  Search,
  Filter,
} from "lucide-react";
import { downloadCsv } from "@/lib/export-csv";
import { platformStore } from "@/lib/store";
import { useRealtimeSopRegister } from "@/lib/realtime";
import { SopItem } from "@/lib/types";

export default function SopRegisterPage() {
  const sops = useRealtimeSopRegister();
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleToggleStatus = (id: string) => {
    const item = sops.find((s) => s.id === id);
    if (!item) return;
    const nextStatus: SopItem["status"] = item.status === "Completed" ? "Scheduled" : "Completed";
    platformStore.updateSopItem(id, {
      status: nextStatus,
      lastExecuted: nextStatus === "Completed" ? "Just now (Verified)" : item.lastExecuted,
    });
    triggerToast(`Updated ${id} status to ${nextStatus}`);
  };

  const filtered = sops.filter((s) => {
    const matchesFilter = filter === "All" || s.cadence === filter;
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.owner.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = ["SOP ID", "Procedure Name", "Cadence", "Target Schedule", "Accountable Owner", "Last Executed", "Next Due", "Status"];
    const rows = filtered.map((s) => [
      s.id,
      s.name,
      s.cadence,
      s.targetTime,
      s.owner,
      s.lastExecuted,
      s.nextDue,
      s.status,
    ]);
    downloadCsv(`Acorn_SOP_Recurrence_Register_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-8 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link href="/admin/ops" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brass-700 hover:text-navy-900 transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Operations Command Centre</span>
        </Link>

        {/* Toast */}
        {toastMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-900 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

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

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-white border border-border text-navy-700 text-xs font-semibold rounded hover:bg-slate-50 flex items-center gap-1.5 transition shadow-sm"
            title="Download SOP Register CSV"
          >
            <Download className="w-3.5 h-3.5 text-brass-500" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-card border border-border shadow-card flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-ink-950 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-brass-500" />
              Cadence:
            </span>
            {["All", "Daily", "Weekly", "Monthly", "Quarterly", "Annual"].map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 py-1.5 rounded-btn text-xs font-semibold transition ${
                  filter === c
                    ? "bg-navy-700 text-white shadow-sm"
                    : "bg-surface text-ink-secondary hover:text-ink border border-border hover:bg-slate-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by procedure name, owner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-border rounded text-xs focus:outline-none focus:border-navy-700"
            />
          </div>
        </div>

        {/* SOP Table */}
        <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
          <div className="divide-y divide-border text-xs">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-ink-secondary">
                No standard operating procedures match your search or filter.
              </div>
            ) : (
              filtered.map((sop) => (
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

                  <div className="flex sm:flex-col sm:items-end justify-between gap-2 text-[11px]">
                    <button
                      onClick={() => handleToggleStatus(sop.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                        sop.status === "Completed"
                          ? "bg-status-success-bg text-status-success hover:bg-emerald-100"
                          : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{sop.status} (Click to toggle)</span>
                    </button>
                    <span className="text-ink-muted">Next Due: {sop.nextDue}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
