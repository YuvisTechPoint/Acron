"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calendar,
  Clock,
  UserCheck,
  FileText,
  Plus,
  Printer,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Download,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { POSHCase } from "@/lib/types";

export default function ICHearingsPage() {
  const params = useParams();
  const caseId = (params?.id as string) || "case-01";
  const [poshCase, setPoshCase] = useState<POSHCase | undefined>(() => platformStore.getCaseById(caseId));

  const [hearingDate, setHearingDate] = useState("2026-11-20");
  const [hearingTime, setHearingTime] = useState("11:30 AM IST");
  const [hearingVenue, setHearingVenue] = useState("IC Confidential In-Camera Chambers, Kolkata / Secure Video Bridge");
  const [agenda, setAgenda] = useState("Examination of Complainant Deposition and Verification of Exhibits");
  const [attendeeCount, setAttendeeCount] = useState(4);
  const [womenPresentCount, setWomenPresentCount] = useState(3);
  const [poPresent, setPoPresent] = useState(true);
  const [depositionNotes, setDepositionNotes] = useState("");

  useEffect(() => {
    const c = platformStore.getCaseById(caseId);
    if (c) setPoshCase(c);
  }, [caseId]);

  const isQuorumMet = attendeeCount >= 3 && poPresent && womenPresentCount >= Math.ceil(attendeeCount / 2);

  const handleAddHearing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!poshCase || !hearingDate || !agenda) return;

    if (!isQuorumMet) {
      alert("Statutory Quorum Violation (Section 4 & Rule 7): An Internal Committee hearing cannot convene with deficient quorum. Quorum requires minimum 3 members present, Presiding Officer present, and at least 50% women representation.");
      return;
    }

    platformStore.addHearing(poshCase.id, {
      hearingNumber: (poshCase.hearings?.length || 0) + 1,
      scheduledDate: hearingDate,
      scheduledTime: hearingTime,
      locationOrLink: hearingVenue,
      attendees: ["Dr. Ananya Mukherjee (PO)", "Adv. Debjani Sen (External Member)", "Sharmila Roy (Member)"],
      agenda,
      minutesSummary: depositionNotes || "Hearing convened with verified statutory quorum. Deposition recorded in-camera.",
      status: "scheduled",
    });

    const updated = platformStore.getCaseById(poshCase.id);
    if (updated) setPoshCase({ ...updated });
    setDepositionNotes("");
    alert("Hearing and Daily Order Sheet scheduled into statutory docket.");
  };

  if (!poshCase) {
    return (
      <div className="p-12 text-center text-xs text-ink-secondary">
        Case not found. <Link href="/posh/ic" className="text-primary underline">Return to IC Workspace</Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory-50 min-h-screen py-10 text-ink">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link
            href={`/posh/ic/cases/${poshCase.id}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to Case Overview ({poshCase.caseNumber})</span>
          </Link>
          <div className="flex items-center gap-2 text-xs">
            <Link
              href={`/posh/ic/cases/${poshCase.id}/evidence`}
              className="text-primary font-semibold hover:underline"
            >
              Evidence Vault (EX-001) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <Calendar className="w-4 h-4 text-primary" />
            <span>PRD Screen I-06 &bull; Section 11 &amp; Inquiry Proceedings</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            Oral Hearings, Depositions &amp; Quorum Verification
          </h1>
          <p className="text-xs text-ink-secondary leading-relaxed">
            Docket <span className="font-mono font-bold text-primary">{poshCase.caseNumber}</span> &bull; Conduct in-camera proceedings in accordance with principles of natural justice. Under Section 11(4), no legal practitioners are permitted to represent any party.
          </p>
        </div>

        {/* Quorum Compliance Gate Card */}
        <div className={`p-5 rounded-card border shadow-card text-xs space-y-3 ${
          isQuorumMet ? "bg-emerald-50 border-emerald-200 text-emerald-950" : "bg-red-50 border-red-200 text-red-950"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm">
              <UserCheck className="w-4 h-4 text-primary" />
              <span>Statutory Quorum Gate (Rule 7 &amp; Section 4)</span>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
              isQuorumMet ? "bg-emerald-200 text-emerald-900" : "bg-red-200 text-red-900"
            }`}>
              {isQuorumMet ? "QUORUM SATISFIED" : "QUORUM DEFICIENT"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-white/80 p-2.5 rounded border border-border-subtle">
              <span className="text-ink-secondary">Members Present:</span>
              <div className="font-bold text-ink">{attendeeCount} Members (Min 3 required)</div>
            </div>
            <div className="bg-white/80 p-2.5 rounded border border-border-subtle">
              <span className="text-ink-secondary">Presiding Officer Present:</span>
              <div className="font-bold text-ink">{poPresent ? "Yes (Mandatory)" : "No (Deficient)"}</div>
            </div>
            <div className="bg-white/80 p-2.5 rounded border border-border-subtle">
              <span className="text-ink-secondary">Women Representation:</span>
              <div className="font-bold text-ink">
                {womenPresentCount} Women ({Math.round((womenPresentCount / (attendeeCount || 1)) * 100)}% &bull; Min 50%)
              </div>
            </div>
          </div>
        </div>

        {/* Hearing Scheduler & Deposition Form */}
        <form onSubmit={handleAddHearing} className="bg-surface p-6 rounded-card border border-border shadow-card space-y-6">
          <h2 className="font-serif font-bold text-base text-ink border-b border-border-subtle pb-3">
            Schedule Hearing &amp; Record Daily Order Sheet
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-ink-secondary font-medium mb-1">Hearing Date</label>
              <input
                type="date"
                value={hearingDate}
                onChange={(e) => setHearingDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-border rounded text-xs focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-ink-secondary font-medium mb-1">Time (IST)</label>
              <input
                type="text"
                value={hearingTime}
                onChange={(e) => setHearingTime(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-border rounded text-xs focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-ink-secondary font-medium mb-1">Venue / Mode</label>
              <input
                type="text"
                value={hearingVenue}
                onChange={(e) => setHearingVenue(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-border rounded text-xs focus:outline-none focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-ink-secondary font-medium mb-1">Hearing Agenda &amp; Focus</label>
            <input
              type="text"
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-border rounded text-xs focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div className="text-xs space-y-1">
            <label className="block text-ink-secondary font-medium">Verbatim Deposition &amp; Cross-Examination Notes</label>
            <textarea
              rows={6}
              value={depositionNotes}
              onChange={(e) => setDepositionNotes(e.target.value)}
              placeholder="Record in-camera examination questions, witness answers, demeanor observations, and oral concessions verbatim..."
              className="w-full p-3 bg-white border border-border rounded text-xs font-mono leading-relaxed focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 border border-border rounded text-xs font-semibold text-ink hover:bg-white flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Order Sheet</span>
            </button>
            <button
              type="submit"
              disabled={!isQuorumMet}
              className="px-6 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-accent" />
              <span>Record Hearing</span>
            </button>
          </div>
        </form>

        {/* Existing Hearings Docket */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <h2 className="font-serif font-bold text-base text-ink">
            Statutory Hearing Records &amp; Minutes
          </h2>

          <div className="space-y-3">
            {(poshCase.hearings && poshCase.hearings.length > 0) ? (
              poshCase.hearings.map((h, i) => (
                <div key={h.id || i} className="bg-white p-4 rounded border border-border space-y-2 text-xs">
                  <div className="flex justify-between items-center border-b border-border-subtle pb-2">
                    <span className="font-bold text-ink">Hearing #{h.hearingNumber || i + 1}: {h.agenda}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                      {h.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-ink-secondary">
                    <div>Date: <span className="font-semibold text-ink">{h.scheduledDate}</span></div>
                    <div>Time: <span className="font-semibold text-ink">{h.scheduledTime}</span></div>
                    <div>Venue: <span className="font-semibold text-ink">{h.locationOrLink}</span></div>
                  </div>
                  {h.minutesSummary && (
                    <div className="p-2.5 bg-surface rounded text-ink leading-relaxed border border-border-subtle mt-2">
                      <strong>Order Sheet Summary:</strong> {h.minutesSummary}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-ink-secondary bg-white rounded border border-border">
                No hearings convened yet. Use the scheduler above to initiate the first deposition.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
