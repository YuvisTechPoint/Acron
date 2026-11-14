"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, AlertTriangle, ArrowLeft, Shield, FileCheck, ExternalLink, Download } from "lucide-react";
import { downloadCsv } from "@/lib/export-csv";
import { platformStore } from "@/lib/store";
import { useRealtimeGoLiveGate } from "@/lib/realtime";
import { GoLiveChecklistItem } from "@/lib/types";

export default function GoLiveGatePage() {
  const items = useRealtimeGoLiveGate();
  const [filter, setFilter] = useState<string>("All");

  const passedCount = items.filter((i) => i.status === "Passed").length;
  const reviewCount = items.filter((i) => i.status === "Human Review Required").length;
  const pendingCount = items.filter((i) => i.status === "Pending Sign-off").length;

  const categories = ["All", "Legal & Regulatory", "Security & Privacy", "Infrastructure & Disaster Recovery", "Operations & Handover"];

  const filteredItems = filter === "All" ? items : items.filter((i) => i.category === filter);

  const toggleStatus = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const nextStatus = item.status === "Passed" ? "Human Review Required" : "Passed";
    platformStore.updateGoLiveItem(id, { status: nextStatus });
  };

  const handleExportCSV = () => {
    const headers = ["Checklist ID", "Category", "Verification Title", "Statutory Requirement", "Responsible Owner", "Audit Status", "Evidence Reference"];
    const rows = filteredItems.map((i) => [
      i.id,
      i.category,
      i.title,
      i.requirement,
      i.owner,
      i.status,
      i.evidence,
    ]);
    downloadCsv(`Acorn_GoLive_Readiness_Gate_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-8 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link href="/admin/ops" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brass-700 hover:text-navy-900 transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Operations Command Centre</span>
        </Link>

        {/* Top Header */}
        <div className="bg-white p-6 rounded-card border border-border shadow-card flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-brass-700 font-bold block">
              PRD SECTION 28.8 COMPLIANCE VERIFICATION
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950 mt-1">
              17-Item Production Go-Live Readiness Gate
            </h1>
            <p className="text-xs text-ink-secondary mt-0.5">
              Strict multi-party verification gate. Production deployment is prohibited while any Critical or S1 item is open.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-white border border-border text-navy-700 text-xs font-semibold rounded-btn hover:bg-slate-50 flex items-center gap-1.5 transition shadow-sm"
              title="Download Readiness Gate CSV"
            >
              <Download className="w-3.5 h-3.5 text-brass-500" />
              <span>Export Gate CSV</span>
            </button>
            <span className="px-3.5 py-1.5 rounded-full bg-status-warning-bg text-status-warning text-xs font-bold border border-status-warning/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-status-warning animate-pulse" />
              <span>Gate: {passedCount === 17 ? "Fully Verified (17/17)" : `Ready for Human Review (${passedCount}/17 Passed)`}</span>
            </span>
          </div>
        </div>

        {/* Summary Counter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-card border border-border border-t-2 border-t-status-success shadow-card">
            <span className="text-xs text-ink-secondary">Automated &amp; Verified Checks</span>
            <div className="font-serif text-2xl font-bold text-status-success mt-1">{passedCount} Verified</div>
          </div>
          <div className="bg-white p-5 rounded-card border border-border border-t-2 border-t-status-warning shadow-card">
            <span className="text-xs text-ink-secondary">Human Review Gates</span>
            <div className="font-serif text-2xl font-bold text-status-warning mt-1">{reviewCount} Ready for Review</div>
          </div>
          <div className="bg-white p-5 rounded-card border border-border border-t-2 border-t-navy-700 shadow-card">
            <span className="text-xs text-ink-secondary">Final Partner Sign-Off</span>
            <div className="font-serif text-2xl font-bold text-navy-700 mt-1">{pendingCount} Pending Final Sign</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-btn text-xs font-semibold transition ${
                filter === cat
                  ? "bg-navy-700 text-white shadow-sm"
                  : "bg-white text-ink-secondary hover:text-ink border border-border hover:bg-surface"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Checklist Table */}
        <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
          <div className="divide-y divide-border">
            {filteredItems.map((item) => (
              <div key={item.id} className="p-5 hover:bg-surface/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-brass-700">{item.id}</span>
                    <span className="text-xs text-ink-muted">&bull;</span>
                    <span className="text-xs font-medium text-ink-muted">{item.category}</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-ink">{item.title}</h4>
                  <p className="text-xs text-ink-secondary leading-relaxed">{item.requirement}</p>
                  <div className="text-[11px] text-ink-muted pt-1">
                    <span className="font-semibold text-ink">Owner:</span> {item.owner} &bull;{" "}
                    <span className="font-semibold text-ink">Evidence:</span> {item.evidence}
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  <button
                    onClick={() => toggleStatus(item.id)}
                    className="focus:outline-none transition cursor-pointer"
                    title="Click to toggle gate verification status"
                  >
                    {item.status === "Passed" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-status-success-bg text-status-success text-xs font-semibold hover:bg-emerald-100">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified &check;</span>
                      </span>
                    ) : item.status === "Human Review Required" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-status-warning-bg text-status-warning text-xs font-semibold hover:bg-amber-100">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Review Required</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-navy-800 text-xs font-semibold hover:bg-blue-200">
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>Pending Sign</span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

