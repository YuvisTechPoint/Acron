"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ShieldCheck,
  Calendar,
  Clock,
  UserCheck,
  FileText,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Printer,
  Download,
  Upload,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate, formatDateTime, calculateDaysRemaining, formatINR } from "@/lib/utils";
import { POSHCase } from "@/lib/types";

export default function ICCaseDetailPage() {
  const params = useParams();
  const caseId = (params?.id as string) || "case-01";

  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isMasked, setIsMasked] = useState(false);
  const [poshCase, setPoshCase] = useState<POSHCase | undefined>(undefined);

  // Hearing modal / form state
  const [newHearingDate, setNewHearingDate] = useState("");
  const [newHearingTime, setNewHearingTime] = useState("11:00 AM IST");
  const [newHearingAgenda, setNewHearingAgenda] = useState("");
  const [newHearingVenue, setNewHearingVenue] = useState("IC Confidential Chamber, Camac Street / Webex");

  // Evidence upload state
  const [newExhibitTitle, setNewExhibitTitle] = useState("");
  const [newExhibitUploader, setNewExhibitUploader] = useState<any>("ic_member");

  // Compensation worksheet state (Section 15)
  const [mentalTrauma, setMentalTrauma] = useState(150000); // ₹1,50,000
  const [careerLoss, setCareerLoss] = useState(100000);
  const [medicalExpenses, setMedicalExpenses] = useState(25000);
  const [recommendationDecision, setRecommendationDecision] = useState("charges_substantiated");
  const [findingsSummary, setFindingsSummary] = useState(
    "Based on the WhatsApp digital transcripts and witness depositions, the Internal Committee unanimously finds that the respondent made unwelcome physical contact and sexually coloured remarks."
  );

  useEffect(() => {
    const c = platformStore.getCaseById(caseId);
    if (c) setPoshCase(c);
  }, [caseId]);

  if (!poshCase) {
    return (
      <div className="p-12 text-center text-xs text-ink-secondary">
        Case docket not found. <Link href="/posh/ic" className="text-primary underline">Return to IC Workspace</Link>
      </div>
    );
  }

  const daysRemaining = calculateDaysRemaining(poshCase.inquiryDeadline || "");

  const handleScheduleHearing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHearingDate || !newHearingAgenda) return;

    platformStore.addHearing(poshCase.id, {
      hearingNumber: (poshCase.hearings?.length || 0) + 1,
      scheduledDate: newHearingDate,
      scheduledTime: newHearingTime,
      locationOrLink: newHearingVenue,
      attendees: ["Dr. Ananya Mukherjee (PO)", "Adv. Debjani Sen (External Member)", poshCase.complainantName || "Complainant"],
      agenda: newHearingAgenda,
      status: "scheduled",
    });

    // Refresh local case
    const updated = platformStore.getCaseById(poshCase.id);
    if (updated) setPoshCase({ ...updated });
    setNewHearingAgenda("");
    setNewHearingDate("");
  };

  const handleDepositEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExhibitTitle) return;

    platformStore.addEvidence(poshCase.id, {
      title: newExhibitTitle,
      fileType: "application/pdf",
      fileSizeKb: 1024,
      uploadedBy: newExhibitUploader,
      sha256Hash: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
      isRedacted: false,
    });

    const updated = platformStore.getCaseById(poshCase.id);
    if (updated) setPoshCase({ ...updated });
    setNewExhibitTitle("");
  };

  const handleStateTransition = (newState: POSHCase["state"]) => {
    platformStore.updateCaseState(poshCase.id, newState, `Transitioned state to ${newState}`);
    const updated = platformStore.getCaseById(poshCase.id);
    if (updated) setPoshCase({ ...updated });
  };

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <Link
              href="/posh/ic"
              className="p-1.5 rounded hover:bg-surface text-ink-secondary hover:text-ink transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-primary">{poshCase.caseNumber}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-white">
                  {poshCase.state}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {poshCase.orgName}
                </span>
              </div>
              <div className="text-xs text-ink-secondary mt-0.5">
                Filed on {formatDate(poshCase.filedAt)} &bull; Jurisdiction: Internal Committee (10+ Employees)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMasked(!isMasked)}
              className="px-3 py-1.5 border border-border text-xs font-medium rounded hover:bg-surface flex items-center gap-1.5"
            >
              {isMasked ? <Eye className="w-3.5 h-3.5 text-accent" /> : <EyeOff className="w-3.5 h-3.5 text-ink-secondary" />}
              <span>{isMasked ? "Reveal Names" : "Mask PII"}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-surface border border-border text-xs font-medium rounded hover:bg-surface-muted flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Docket</span>
            </button>
          </div>
        </div>

        {/* Dedicated Procedural Step Pages (PRD Section 22.4.3: I-03 to I-10) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-accent shrink-0">Dedicated Screens:</span>
          <Link href={`/posh/ic/cases/${poshCase.id}/triage`} className="px-2.5 py-1 bg-surface border border-border rounded hover:bg-white text-ink shrink-0 font-medium">
            Triage (I-03)
          </Link>
          <Link href={`/posh/ic/cases/${poshCase.id}/conciliation`} className="px-2.5 py-1 bg-surface border border-border rounded hover:bg-white text-ink shrink-0 font-medium">
            Conciliation (I-04)
          </Link>
          <Link href={`/posh/ic/cases/${poshCase.id}/notices`} className="px-2.5 py-1 bg-surface border border-border rounded hover:bg-white text-ink shrink-0 font-medium">
            Notices &amp; Summons (I-05)
          </Link>
          <Link href={`/posh/ic/cases/${poshCase.id}/hearings`} className="px-2.5 py-1 bg-surface border border-border rounded hover:bg-white text-ink shrink-0 font-medium">
            Hearings (I-06)
          </Link>
          <Link href={`/posh/ic/cases/${poshCase.id}/evidence`} className="px-2.5 py-1 bg-surface border border-border rounded hover:bg-white text-ink shrink-0 font-medium">
            Evidence Vault (I-07)
          </Link>
          <Link href={`/posh/ic/cases/${poshCase.id}/report`} className="px-2.5 py-1 bg-surface border border-border rounded hover:bg-white text-ink shrink-0 font-medium">
            Report &amp; Sec 15 (I-08)
          </Link>
          <Link href={`/posh/ic/cases/${poshCase.id}/interim`} className="px-2.5 py-1 bg-surface border border-border rounded hover:bg-white text-ink shrink-0 font-medium">
            Interim Relief (I-09)
          </Link>
          <Link href={`/posh/ic/cases/${poshCase.id}/close`} className="px-2.5 py-1 bg-surface border border-border rounded hover:bg-white text-ink shrink-0 font-medium">
            Closure &amp; Aftercare (I-10)
          </Link>
        </div>

        {/* 9-Tab Navigation Bar */}
        <div className="flex overflow-x-auto border-b border-border gap-1 text-xs">
          {[
            { id: "overview", label: "1. Overview & Timers" },
            { id: "complaint", label: "2. Complaint Record" },
            { id: "triage", label: "3. Triage & Quorum" },
            { id: "conciliation", label: "4. Conciliation (Sec 10)" },
            { id: "notices", label: "5. Notices & Summons" },
            { id: "hearings", label: "6. Hearings & Minutes" },
            { id: "evidence", label: "7. Evidence Vault" },
            { id: "interim", label: "8. Interim Relief (Sec 12)" },
            { id: "report", label: "9. Findings & Report (Sec 13)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary font-bold bg-surface"
                  : "border-transparent text-ink-secondary hover:text-ink hover:bg-surface/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Overview & Statutory Timelines */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Timeline Progress Bar */}
            <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold font-serif text-sm text-primary">
                  Statutory 90-Day Inquiry Clock (Section 11(4))
                </span>
                <span className="font-semibold text-emerald-700">
                  {daysRemaining.label} (Statutory Deadline: {formatDate(poshCase.inquiryDeadline)})
                </span>
              </div>

              {/* Progress visual */}
              <div className="w-full bg-border-subtle h-3 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, Math.max(15, (90 - daysRemaining.days) / 0.9))}%` }}
                ></div>
              </div>

              {/* Statutory Milestone Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
                <div className="bg-white p-3 rounded border border-border">
                  <div className="text-ink-secondary text-[11px]">Notice to Respondent:</div>
                  <div className="font-semibold text-ink">Within 7 Working Days</div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-0.5">&bull; Served</div>
                </div>

                <div className="bg-white p-3 rounded border border-border">
                  <div className="text-ink-secondary text-[11px]">Respondent Reply:</div>
                  <div className="font-semibold text-ink">Within 10 Working Days</div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-0.5">&bull; Received</div>
                </div>

                <div className="bg-white p-3 rounded border border-border">
                  <div className="text-ink-secondary text-[11px]">Report to Employer:</div>
                  <div className="font-semibold text-ink">Within 10 Days of Inquiry</div>
                  <div className="text-[10px] text-primary font-bold mt-0.5">Due: {formatDate(poshCase.reportDeadline)}</div>
                </div>

                <div className="bg-white p-3 rounded border border-border">
                  <div className="text-ink-secondary text-[11px]">Employer Action Taken:</div>
                  <div className="font-semibold text-ink">Within 60 Days of Report</div>
                  <div className="text-[10px] text-ink-secondary mt-0.5">Section 13(4)</div>
                </div>
              </div>
            </div>

            {/* Quick State Transition Actions */}
            <div className="bg-white p-6 rounded-card border border-border shadow-card space-y-3">
              <div className="text-xs font-bold text-ink uppercase tracking-wider">
                Procedural State Transitions (State Machine)
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => handleStateTransition("PRELIMINARY_ASSESSMENT")}
                  className="px-3 py-1.5 rounded bg-surface border border-border hover:bg-surface-muted font-medium"
                >
                  &rarr; Preliminary Assessment
                </button>
                <button
                  onClick={() => handleStateTransition("NOTICE_SERVED")}
                  className="px-3 py-1.5 rounded bg-surface border border-border hover:bg-surface-muted font-medium"
                >
                  &rarr; Notice Served (7-Day)
                </button>
                <button
                  onClick={() => handleStateTransition("HEARING_SCHEDULED")}
                  className="px-3 py-1.5 rounded bg-surface border border-border hover:bg-surface-muted font-medium"
                >
                  &rarr; Hearing Scheduled
                </button>
                <button
                  onClick={() => handleStateTransition("REPORT_DRAFTED")}
                  className="px-3 py-1.5 rounded bg-surface border border-border hover:bg-surface-muted font-medium"
                >
                  &rarr; Report Drafted (Sec 13)
                </button>
                <button
                  onClick={() => handleStateTransition("CLOSED")}
                  className="px-3 py-1.5 rounded bg-emerald-100 text-emerald-800 font-bold hover:bg-emerald-200"
                >
                  &check; Close Docket
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Complaint Record */}
        {activeTab === "complaint" && (
          <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="bg-white p-4 rounded border border-border space-y-2">
                <div className="font-bold text-primary uppercase text-[11px]">Complainant Details</div>
                <div><strong>Name:</strong> {isMasked ? "S*** G***" : poshCase.complainantName}</div>
                <div><strong>Designation:</strong> {poshCase.complainantDesignation}</div>
                <div><strong>Department:</strong> {poshCase.complainantDepartment}</div>
                <div><strong>Safe Contact:</strong> {isMasked ? "REDACTED" : poshCase.complainantEmail}</div>
                <div><strong>Preferred Language:</strong> {poshCase.preferredLanguage?.toUpperCase() || "EN"}</div>
              </div>

              <div className="bg-white p-4 rounded border border-border space-y-2">
                <div className="font-bold text-primary uppercase text-[11px]">Respondent Details</div>
                <div><strong>Name:</strong> {isMasked ? "R*** M***" : poshCase.respondentName}</div>
                <div><strong>Designation:</strong> {poshCase.respondentDesignation}</div>
                <div><strong>Department:</strong> {poshCase.respondentDepartment}</div>
                <div><strong>Email:</strong> {isMasked ? "REDACTED" : poshCase.respondentEmail}</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded border border-border space-y-3 text-xs">
              <div className="font-bold text-primary uppercase text-[11px]">Sworn Detailed Statement</div>
              <p className="text-ink leading-relaxed whitespace-pre-line">
                {poshCase.detailedStatement}
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: Triage & Quorum */}
        {activeTab === "triage" && (
          <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-6">
            <h3 className="font-serif font-bold text-lg text-ink">
              Statutory Quorum &amp; Limitation Verification
            </h3>

            <div className="space-y-3 text-xs">
              <div className="bg-white p-4 rounded border border-border flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-ink">Section 4(2) IC Composition Validation: Valid</div>
                  <div className="text-ink-secondary mt-0.5">
                    &bull; Presiding Officer is a Senior Woman Employee: <strong>Dr. Ananya Mukherjee</strong><br />
                    &bull; &ge; 50% Women Members requirement satisfied (3 out of 4 members are women)<br />
                    &bull; External Legal Member present: <strong>Adv. Debjani Sen (Acorn Legal)</strong>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded border border-border flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-ink">Section 9(1) Limitation Status: Within 3 Months</div>
                  <div className="text-ink-secondary mt-0.5">
                    Incident date (18 Sep 2026) is within 90 days of filing. No condonation of delay required.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Conciliation (Section 10) */}
        {activeTab === "conciliation" && (
          <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-4">
            <h3 className="font-serif font-bold text-lg text-ink">
              Section 10 Conciliation Redressal
            </h3>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Under Section 10 of the Act, conciliation can only be initiated upon the express request of the complainant.
            </p>

            <div className="p-4 bg-white rounded border border-border text-xs space-y-2">
              <div>
                <strong>Complainant Requested Conciliation:</strong>{" "}
                {poshCase.conciliationRequested ? "Yes" : "No (Proceed directly to Section 11 formal inquiry)"}
              </div>
              <div className="p-3 bg-amber-50 rounded border border-amber-200 text-amber-900 text-[11px]">
                <strong>Statutory Guardrail:</strong> Section 10(1) proviso explicitly prohibits any monetary settlement as the basis of conciliation.
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Notices & Summons */}
        {activeTab === "notices" && (
          <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif font-bold text-lg text-ink">
                Statutory Notices &amp; Summons Registry
              </h3>
              <button
                onClick={() => alert("Notice drafted from standard template. Ready to issue via email and registered post.")}
                className="px-3.5 py-1.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Issue New Notice</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-white p-4 rounded border border-border flex justify-between items-center">
                <div>
                  <div className="font-bold text-primary">Notice of Inquiry to Respondent (Rule 7)</div>
                  <div className="text-[11px] text-ink-secondary mt-0.5">
                    Served on: {formatDate(poshCase.noticeServedAt || "2026-09-24")} &bull; Acknowledged by Respondent
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  DELIVERED
                </span>
              </div>

              <div className="bg-white p-4 rounded border border-border flex justify-between items-center">
                <div>
                  <div className="font-bold text-primary">Summons for Hearing #2 (Personal Appearance)</div>
                  <div className="text-[11px] text-ink-secondary mt-0.5">
                    Issued to: {poshCase.respondentName} &bull; Scheduled for 08 Nov 2026
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                  SUMMONED
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: Hearings & Minutes */}
        {activeTab === "hearings" && (
          <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif font-bold text-lg text-ink">
                Hearing Management &amp; Minutes
              </h3>
            </div>

            {/* Schedule Hearing Form */}
            <form onSubmit={handleScheduleHearing} className="bg-white p-4 rounded border border-border space-y-3 text-xs">
              <div className="font-bold text-primary uppercase text-[11px]">Schedule Next Hearing Session</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-ink-secondary mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={newHearingDate}
                    onChange={(e) => setNewHearingDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-border rounded"
                  />
                </div>
                <div>
                  <label className="block text-ink-secondary mb-1">Time *</label>
                  <input
                    type="text"
                    required
                    value={newHearingTime}
                    onChange={(e) => setNewHearingTime(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-border rounded"
                  />
                </div>
                <div>
                  <label className="block text-ink-secondary mb-1">Agenda / Purpose *</label>
                  <input
                    type="text"
                    required
                    value={newHearingAgenda}
                    onChange={(e) => setNewHearingAgenda(e.target.value)}
                    placeholder="e.g. Cross-examination of witness W1"
                    className="w-full px-2.5 py-1.5 border border-border rounded"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white font-semibold rounded hover:bg-primary-hover"
                >
                  Schedule Hearing
                </button>
              </div>
            </form>

            {/* Hearings List */}
            <div className="space-y-3 text-xs">
              {poshCase.hearings?.map((h) => (
                <div key={h.id} className="bg-white p-4 rounded border border-border space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">
                      Hearing #{h.hearingNumber}: {h.agenda}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      h.status === "completed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {h.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-ink-secondary">
                    Date: <strong>{formatDate(h.scheduledDate)}</strong> at {h.scheduledTime} &bull; Venue: {h.locationOrLink}
                  </div>
                  {h.minutesSummary && (
                    <div className="bg-surface p-2.5 rounded border border-border-subtle text-[11px] text-ink">
                      <strong>Recorded Minutes:</strong> {h.minutesSummary}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: Evidence Vault */}
        {activeTab === "evidence" && (
          <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif font-bold text-lg text-ink">
                  Secure Evidence Vault &amp; Chain of Custody
                </h3>
                <p className="text-xs text-ink-secondary mt-0.5">
                  All exhibits carry one-way SHA-256 cryptographic hashes for tamper-evident inquiry records.
                </p>
              </div>
            </div>

            {/* Quick Upload Form */}
            <form onSubmit={handleDepositEvidence} className="bg-white p-4 rounded border border-border flex gap-3 text-xs">
              <input
                type="text"
                required
                value={newExhibitTitle}
                onChange={(e) => setNewExhibitTitle(e.target.value)}
                placeholder="Exhibit Description (e.g. CCTV recording log or Slack export)"
                className="flex-1 px-3 py-1.5 border border-border rounded"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-primary text-white font-semibold rounded hover:bg-primary-hover flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Deposit Exhibit</span>
              </button>
            </form>

            <div className="space-y-3 text-xs">
              {poshCase.evidence?.map((ev) => (
                <div key={ev.id} className="bg-white p-4 rounded border border-border space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">
                      {ev.exhibitCode}: {ev.title}
                    </span>
                    <span className="text-[10px] text-ink-secondary">
                      Deposited by: {ev.uploadedBy}
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-ink-secondary bg-surface p-2 rounded">
                    SHA-256: {ev.sha256Hash}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Chain of Custody: {ev.chainOfCustody?.map((c) => `${c.action} (${c.timestamp})`).join(" &bull; ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: Interim Relief */}
        {activeTab === "interim" && (
          <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-4">
            <h3 className="font-serif font-bold text-lg text-ink">
              Section 12 Interim Relief Directives
            </h3>
            {poshCase.interimReliefRequested ? (
              <div className="bg-white p-4 rounded border border-border space-y-2 text-xs">
                <div><strong>Requested Relief Type:</strong> {poshCase.interimReliefRequested.type.replace(/_/g, " ")}</div>
                <div><strong>Details:</strong> {poshCase.interimReliefRequested.details}</div>
                <div>
                  <strong>Statutory Status:</strong>{" "}
                  <span className="text-emerald-700 font-bold uppercase">{poshCase.interimReliefRequested.status}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-ink-secondary">No interim relief requested by complainant.</p>
            )}
          </div>
        )}

        {/* TAB 9: Findings & Final Report (Section 13 & 15) */}
        {activeTab === "report" && (
          <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-6">
            <div className="border-b border-border pb-3">
              <h3 className="font-serif font-bold text-lg text-ink">
                Section 13 Inquiry Report &amp; Section 15 Compensation Assessment
              </h3>
              <p className="text-xs text-ink-secondary mt-0.5">
                The Internal Committee prepares findings of fact and issues formal recommendations to the employer.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-ink mb-1">
                  Inquiry Determination:
                </label>
                <select
                  value={recommendationDecision}
                  onChange={(e) => setRecommendationDecision(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-border rounded font-semibold text-primary"
                >
                  <option value="charges_substantiated">Charges Substantiated (Guilty of Harassment)</option>
                  <option value="charges_not_substantiated">Charges Not Substantiated (Dismissed)</option>
                  <option value="settlement_concluded">Settlement Concluded via Section 10</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-ink mb-1">
                  Executive Findings &amp; Evidentiary Reasoning:
                </label>
                <textarea
                  rows={4}
                  value={findingsSummary}
                  onChange={(e) => setFindingsSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-border rounded"
                ></textarea>
              </div>

              {/* Section 15 Compensation Worksheet */}
              <div className="bg-white p-5 rounded border border-border space-y-4">
                <div className="font-bold text-primary uppercase text-[11px]">
                  Section 15 Statutory Compensation Computation
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-ink-secondary mb-1">Mental Trauma / Distress (₹)</label>
                    <input
                      type="number"
                      value={mentalTrauma}
                      onChange={(e) => setMentalTrauma(Number(e.target.value))}
                      className="w-full px-3 py-1.5 border border-border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-ink-secondary mb-1">Loss of Career Opportunity (₹)</label>
                    <input
                      type="number"
                      value={careerLoss}
                      onChange={(e) => setCareerLoss(Number(e.target.value))}
                      className="w-full px-3 py-1.5 border border-border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-ink-secondary mb-1">Medical / Psychiatric Treatment (₹)</label>
                    <input
                      type="number"
                      value={medicalExpenses}
                      onChange={(e) => setMedicalExpenses(Number(e.target.value))}
                      className="w-full px-3 py-1.5 border border-border rounded"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-border flex justify-between items-center text-sm font-bold text-ink">
                  <span>Total Recommended Compensation:</span>
                  <span className="text-primary font-serif text-base">
                    ₹{(mentalTrauma + careerLoss + medicalExpenses).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Digital Affirmation & Generation */}
              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => alert(`Section 13 Final Inquiry Report generated for ${poshCase.caseNumber}. Prepared for submission to Employer within 10 days.`)}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold uppercase tracking-wider rounded shadow transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Sign &amp; Generate Statutory Section 13 Report</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

