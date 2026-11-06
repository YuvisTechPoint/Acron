"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Eye,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  AlertCircle,
  FileText,
  UserCheck,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { POSHCase } from "@/lib/types";

export default function AdminCasesPage() {
  const [filterState, setFilterState] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCase, setSelectedCase] = useState<POSHCase | null>(null);
  const [statusNote, setStatusNote] = useState("");

  const cases = platformStore.getCases();

  const filteredCases = cases.filter((c) => {
    const matchesState = filterState === "ALL" || c.state === filterState;
    const matchesSearch =
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.orgName || c.orgId || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.complainantName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.respondentName || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesState && matchesSearch;
  });

  const activeCount = cases.filter((c) => c.state !== "CLOSED").length;
  const closedCount = cases.filter((c) => c.state === "CLOSED").length;
  const inquiryCount = cases.filter((c) => c.state === "INQUIRY").length;

  const handleStateChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase) return;
    // update status
    platformStore.updateCaseState(selectedCase.id, selectedCase.state, statusNote);
    setStatusNote("");
    // refresh
    const updated = platformStore.getCaseById(selectedCase.id);
    if (updated) setSelectedCase({ ...updated });
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-navy-700 hover:text-blue-600 font-medium transition"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-brass-500" />
            <span>Back to Firm Operations</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/posh/ic"
              className="px-3.5 py-1.5 bg-white border border-border text-navy-700 text-xs font-semibold rounded-btn hover:bg-slate-50 transition shadow-sm inline-flex items-center gap-1.5"
            >
              <span>IC Committee Docket</span>
              <ExternalLink className="w-3.5 h-3.5 text-brass-500" />
            </Link>
          </div>
        </div>

        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-ping"></span>
              <span className="text-xs uppercase tracking-widest text-brass-700 font-bold">
                Matter Docket Registry &bull; Statutory Records
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950 mt-1">
              Active Matters &amp; Case Dockets
            </h1>
            <p className="text-xs text-text-muted mt-0.5">
              Confidential matter supervision, IC inquiry tracking, and statutory compliance schedules.
            </p>
          </div>
        </div>

        {/* Operational KPI Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-card border-x border-b border-border border-t-2 border-t-brass-500 shadow-card">
            <div className="flex justify-between items-center text-xs text-text-muted">
              <span>Total Dockets</span>
              <Briefcase className="w-4 h-4 text-navy-700" />
            </div>
            <div className="font-serif font-bold text-2xl text-ink-950 mt-2">
              {cases.length}
            </div>
            <div className="text-[11px] text-brass-700 font-medium mt-1">
              All registered proceedings
            </div>
          </div>

          <div className="bg-white p-5 rounded-card border-x border-b border-border border-t-2 border-t-navy-700 shadow-card">
            <div className="flex justify-between items-center text-xs text-text-muted">
              <span>Active Matters</span>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div className="font-serif font-bold text-2xl text-ink-950 mt-2">
              {activeCount}
            </div>
            <div className="text-[11px] text-blue-600 font-medium mt-1">
              Within 90-day statutory limit
            </div>
          </div>

          <div className="bg-white p-5 rounded-card border-x border-b border-border border-t-2 border-t-amber-500 shadow-card">
            <div className="flex justify-between items-center text-xs text-text-muted">
              <span>Inquiry in Progress</span>
              <ShieldCheck className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-serif font-bold text-2xl text-ink-950 mt-2">
              {inquiryCount}
            </div>
            <div className="text-[11px] text-amber-700 font-medium mt-1">
              Hearings &amp; evidence review
            </div>
          </div>

          <div className="bg-white p-5 rounded-card border-x border-b border-border border-t-2 border-t-emerald-600 shadow-card">
            <div className="flex justify-between items-center text-xs text-text-muted">
              <span>Closed / Disposed</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif font-bold text-2xl text-ink-950 mt-2">
              {closedCount}
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">
              Final reports filed
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-card border border-border shadow-card flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs w-full md:w-auto">
            <span className="font-semibold text-ink-950 flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5 text-brass-500" />
              State:
            </span>
            {["ALL", "DRAFT", "FILED", "ACKNOWLEDGED", "INQUIRY", "REPORT_ISSUED", "CLOSED"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterState(s)}
                className={`px-3 py-1.5 rounded-btn text-xs font-medium transition ${
                  filterState === s
                    ? "bg-navy-700 text-ivory-50 shadow-sm"
                    : "bg-surface border border-border text-text-muted hover:text-navy-700 hover:bg-slate-50"
                }`}
              >
                {s.replace("_", " ")}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search docket # or entity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2 bg-ivory-50 border border-border rounded-btn focus:outline-none focus:border-navy-700 text-ink-950"
            />
          </div>
        </div>

        {/* Dockets Table & Detail Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className={`space-y-4 ${selectedCase ? "lg:col-span-7" : "lg:col-span-12"}`}>
            <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-ivory-50 text-text-muted uppercase text-[10px] tracking-wider border-b border-border">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Docket #</th>
                      <th className="px-4 py-3 font-semibold">Entity / Org</th>
                      <th className="px-4 py-3 font-semibold">Stage</th>
                      <th className="px-4 py-3 font-semibold">Filed Date</th>
                      <th className="px-4 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border font-sans">
                    {filteredCases.map((c) => {
                      const isSelected = selectedCase?.id === c.id;
                      return (
                        <tr
                          key={c.id}
                          className={`hover:bg-slate-50 transition cursor-pointer ${
                            isSelected ? "bg-blue-100/40" : ""
                          }`}
                          onClick={() => setSelectedCase(c)}
                        >
                          <td className="px-4 py-3.5 font-mono font-semibold text-navy-700">
                            {c.caseNumber}
                          </td>
                          <td className="px-4 py-3.5 font-medium text-ink-950">
                            {(c.orgName || c.orgId || "Acorn Chambers").replace("org-", "Entity ")}
                          </td>
                          <td className="px-4 py-3.5">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase ${
                                c.state === "CLOSED"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : c.state === "INQUIRY"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {c.state.replace("_", " ")}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-text-muted">
                            {formatDate(c.createdAt)}
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCase(c);
                              }}
                              className="px-2.5 py-1 text-xs text-navy-700 font-semibold hover:underline"
                            >
                              Inspect &rarr;
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredCases.length === 0 && (
                <div className="py-12 text-center text-text-muted text-xs">
                  No case dockets match your search criteria.
                </div>
              )}
            </div>
          </div>

          {/* Case Detail Panel */}
          {selectedCase && (
            <div className="lg:col-span-5 bg-white rounded-card border border-border shadow-card p-6 space-y-6">
              <div className="flex justify-between items-start border-b border-border pb-3">
                <div>
                  <div className="text-[10px] uppercase font-bold text-brass-700 tracking-wider">
                    Docket Inspection
                  </div>
                  <h3 className="font-serif font-bold text-lg text-ink-950 font-mono">
                    {selectedCase.caseNumber}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="text-text-muted hover:text-ink-950 text-xs px-2 py-1 rounded"
                >
                  Close &times;
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-text-muted">Current State:</span>
                  <span className="font-bold text-navy-700">{selectedCase.state}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-text-muted">Entity / Organization:</span>
                  <span className="font-medium text-ink-950">{selectedCase.orgName || selectedCase.orgId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-text-muted">Registration Date:</span>
                  <span className="font-medium text-ink-950">{formatDate(selectedCase.createdAt)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-text-muted">Hearings Logged:</span>
                  <span className="font-medium text-ink-950">{selectedCase.hearings?.length || 0}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-text-muted">Evidence Files Deposited:</span>
                  <span className="font-medium text-ink-950">{selectedCase.evidence?.length || 0}</span>
                </div>
              </div>

              {/* Action Links */}
              <div className="space-y-2 pt-2">
                <Link
                  href={`/posh/ic/cases/${selectedCase.caseNumber}`}
                  className="w-full py-2.5 bg-navy-700 hover:bg-blue-600 text-ivory-50 text-xs font-semibold rounded-btn transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5 text-brass-300" />
                  <span>Open Full IC Tribunal Docket</span>
                </Link>
                <Link
                  href={`/posh/my-case`}
                  className="w-full py-2 bg-surface hover:bg-slate-100 text-navy-700 border border-border text-xs font-medium rounded-btn transition flex items-center justify-center gap-1.5"
                >
                  <span>View Complainant Progress View</span>
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

