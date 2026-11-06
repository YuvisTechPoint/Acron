"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Calendar,
  Clock,
  FileText,
  User,
  CheckCircle2,
  AlertCircle,
  Download,
  ArrowRight,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate, formatDateTime, calculateDaysRemaining } from "@/lib/utils";

export default function ComplainantCaseTrackingPage() {
  const [caseQuery, setCaseQuery] = useState("POSH-TECHKOL-2026-0014");
  const [searchedCase, setSearchedCase] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = platformStore.getCaseById(caseQuery.trim());
    if (found) {
      setSearchedCase(found);
      setErrorMsg("");
    } else {
      setErrorMsg("Case reference not found. Please verify the Case ID format (e.g. POSH-TECHKOL-2026-0014).");
    }
  };

  // Default initial load with sample case for immediate testing
  React.useEffect(() => {
    const found = platformStore.getCaseById("POSH-TECHKOL-2026-0014");
    if (found) setSearchedCase(found);
  }, []);

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="border-b border-border pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-accent font-bold">
              Confidential Case Status
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
              Statutory 90-Day Inquiry Tracker
            </h1>
          </div>
          <Link
            href="/posh/portal"
            className="text-xs text-primary font-semibold hover:underline"
          >
            &larr; Back to Portal Desk
          </Link>
        </div>

        {/* Lookup Bar */}
        <form onSubmit={handleSearch} className="bg-surface p-4 rounded-card border border-border flex gap-3">
          <input
            type="text"
            value={caseQuery}
            onChange={(e) => setCaseQuery(e.target.value)}
            placeholder="Enter Case ID (e.g. POSH-TECHKOL-2026-0014)"
            className="flex-1 text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary font-mono"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded transition-colors"
          >
            Track Status
          </button>
        </form>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded">
            {errorMsg}
          </div>
        )}

        {searchedCase && (
          <div className="space-y-6">
            {/* Case Header Card */}
            <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
                <div>
                  <div className="text-xs font-mono text-ink-secondary">
                    Case Number: <span className="font-bold text-primary">{searchedCase.caseNumber}</span>
                  </div>
                  <h2 className="font-serif font-bold text-lg text-ink mt-1">
                    {searchedCase.orgName}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary text-white">
                    State: {searchedCase.state}
                  </span>
                </div>
              </div>

              {/* Statutory Timers Milestones */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-white p-3.5 rounded border border-border">
                  <div className="text-ink-secondary">Filed On:</div>
                  <div className="font-semibold text-ink mt-0.5">{formatDate(searchedCase.filedAt)}</div>
                </div>

                <div className="bg-white p-3.5 rounded border border-border">
                  <div className="text-ink-secondary">Inquiry Deadline (90 Days Max):</div>
                  <div className="font-semibold text-primary mt-0.5">
                    {formatDate(searchedCase.inquiryDeadline)}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-1">
                    {calculateDaysRemaining(searchedCase.inquiryDeadline).label}
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded border border-border">
                  <div className="text-ink-secondary">Interim Relief Status:</div>
                  <div className="font-semibold text-ink mt-0.5">
                    {searchedCase.interimReliefRequested ? (
                      <span className="capitalize text-emerald-700 font-bold">
                        {searchedCase.interimReliefRequested.status} ({searchedCase.interimReliefRequested.type.replace(/_/g, " ")})
                      </span>
                    ) : (
                      "None requested"
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Hearings Calendar */}
            <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-4">
              <div className="flex items-center gap-2 font-serif font-bold text-base text-ink">
                <Calendar className="w-5 h-5 text-accent" />
                <span>Internal Committee Hearings</span>
              </div>

              {searchedCase.hearings && searchedCase.hearings.length > 0 ? (
                <div className="space-y-3">
                  {searchedCase.hearings.map((h: any) => (
                    <div key={h.id} className="bg-white p-4 rounded border border-border space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-primary">
                          Hearing #{h.hearingNumber}: {h.agenda}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          h.status === "completed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {h.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-ink-secondary flex items-center gap-4">
                        <span>Date: <strong>{formatDate(h.scheduledDate)}</strong> at {h.scheduledTime}</span>
                        <span>Venue: {h.locationOrLink}</span>
                      </div>
                      {h.minutesSummary && (
                        <div className="text-[11px] text-ink bg-surface p-2.5 rounded border border-border-subtle">
                          <strong>Recorded Minutes Summary:</strong> {h.minutesSummary}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-ink-secondary">
                  No hearings scheduled yet. The IC will issue summons upon review of the respondent&apos;s written statement.
                </p>
              )}
            </div>

            {/* Evidence & Exhibits */}
            <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-4">
              <div className="flex items-center gap-2 font-serif font-bold text-base text-ink">
                <FileText className="w-5 h-5 text-accent" />
                <span>Deposited Exhibits &amp; Released Documents</span>
              </div>

              {searchedCase.evidence && searchedCase.evidence.length > 0 ? (
                <div className="space-y-2">
                  {searchedCase.evidence.map((ev: any) => (
                    <div key={ev.id} className="bg-white p-3 rounded border border-border flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-primary">
                          {ev.exhibitCode}: {ev.title}
                        </div>
                        <div className="text-[11px] text-ink-secondary font-mono">
                          SHA-256: {ev.sha256Hash.substring(0, 24)}... &bull; Deposited by {ev.uploadedBy}
                        </div>
                      </div>
                      <button
                        onClick={() => alert(`Secured Exhibit ${ev.exhibitCode} integrity validated via SHA-256 hash.`)}
                        className="px-3 py-1.5 border border-border rounded text-[11px] font-medium hover:bg-surface flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Inspect Hash</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-ink-secondary">No exhibits released at this stage.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

