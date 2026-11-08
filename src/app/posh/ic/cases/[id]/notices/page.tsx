"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FileText,
  Mail,
  Send,
  Clock,
  Printer,
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { POSHCase } from "@/lib/types";

export default function ICNoticesPage() {
  const params = useParams();
  const caseId = (params?.id as string) || "case-01";
  const [poshCase, setPoshCase] = useState<POSHCase | undefined>(() => platformStore.getCaseById(caseId));

  const [selectedTemplate, setSelectedTemplate] = useState<"NOTICE_RESPONDENT" | "WITNESS_SUMMONS" | "HEARING_NOTICE">("NOTICE_RESPONDENT");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [advanceDays, setAdvanceDays] = useState(7);
  const [issuedNotices, setIssuedNotices] = useState([
    {
      id: "NOT-001",
      template: "Notice of Formal Inquiry (Section 11)",
      recipient: "Respondent (Confidential)",
      channel: "Encrypted Email + Physical Sealed Cover",
      dateIssued: "2026-09-25",
      status: "Delivered & Acknowledged",
      trackingRef: "ACN/NOT/2026/0411",
    },
  ]);

  useEffect(() => {
    const c = platformStore.getCaseById(caseId);
    if (c) {
      setPoshCase(c);
      setRecipientEmail(c.respondentEmail || "respondent@clientorg.com");
    }
  }, [caseId]);

  const handleIssueNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!poshCase) return;

    const newNotice = {
      id: `NOT-${Date.now().toString().slice(-4)}`,
      template:
        selectedTemplate === "NOTICE_RESPONDENT"
          ? "Notice of Formal Inquiry (Section 11)"
          : selectedTemplate === "WITNESS_SUMMONS"
          ? "Statutory Witness Summons (Section 11(3) CPC Powers)"
          : "Notice of Oral Deposition Hearing",
      recipient: recipientEmail,
      channel: "Encrypted Digital Delivery",
      dateIssued: new Date().toISOString().split("T")[0],
      status: "Dispatched",
      trackingRef: `ACN/NOT/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setIssuedNotices([newNotice, ...issuedNotices]);
    alert(`Notice dispatched successfully. Reference: ${newNotice.trackingRef}`);
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
              href={`/posh/ic/cases/${poshCase.id}/hearings`}
              className="text-primary font-semibold hover:underline"
            >
              Hearings &amp; Minutes (Sec 11) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <Mail className="w-4 h-4 text-primary" />
            <span>PRD Screen I-05 &bull; Section 11 of POSH Act &amp; Rule 7</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            Statutory Notices &amp; Witness Summons Generator
          </h1>
          <p className="text-xs text-ink-secondary leading-relaxed">
            Docket <span className="font-mono font-bold text-primary">{poshCase.caseNumber}</span> &bull; Issue legally compliant notices under Section 11 and witness summons under Section 11(3) exercising powers vested under the Code of Civil Procedure, 1908.
          </p>
        </div>

        {/* Form and Template Picker */}
        <form onSubmit={handleIssueNotice} className="bg-surface p-6 rounded-card border border-border shadow-card space-y-6">
          <div className="flex justify-between items-center border-b border-border-subtle pb-3">
            <h2 className="font-serif font-bold text-base text-ink">
              1. Statutory Notice Template Selection
            </h2>
            <span className="text-xs text-ink-secondary">7 Working Days Advance Window</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <button
              type="button"
              onClick={() => setSelectedTemplate("NOTICE_RESPONDENT")}
              className={`p-3.5 rounded border text-left transition-colors ${
                selectedTemplate === "NOTICE_RESPONDENT"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-ink border-border hover:bg-surface"
              }`}
            >
              <div className="font-bold">Section 11 Notice to Respondent</div>
              <div className="text-[11px] opacity-80 mt-1">
                Serves complaint copy; sets 10-day reply timer.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTemplate("WITNESS_SUMMONS")}
              className={`p-3.5 rounded border text-left transition-colors ${
                selectedTemplate === "WITNESS_SUMMONS"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-ink border-border hover:bg-surface"
              }`}
            >
              <div className="font-bold">Sec 11(3) CPC Witness Summons</div>
              <div className="text-[11px] opacity-80 mt-1">
                Compels attendance &amp; document production.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTemplate("HEARING_NOTICE")}
              className={`p-3.5 rounded border text-left transition-colors ${
                selectedTemplate === "HEARING_NOTICE"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-ink border-border hover:bg-surface"
              }`}
            >
              <div className="font-bold">Oral Hearing Notice</div>
              <div className="text-[11px] opacity-80 mt-1">
                Notice of deposition date, time &amp; chamber venue.
              </div>
            </button>
          </div>

          {/* Delivery Configuration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-ink-secondary font-medium mb-1">Recipient Address (Encrypted Channel)</label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-border rounded text-xs focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-ink-secondary font-medium mb-1">Statutory Advance Notice (Days)</label>
              <input
                type="number"
                min={7}
                value={advanceDays}
                onChange={(e) => setAdvanceDays(parseInt(e.target.value) || 7)}
                className="w-full px-3 py-2 bg-white border border-border rounded text-xs focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="bg-white p-4 rounded border border-border space-y-2 text-xs font-mono text-ink leading-relaxed">
            <div className="text-[11px] uppercase tracking-wider text-accent font-bold">Document Preview:</div>
            <div className="p-3 bg-surface rounded border border-border-subtle whitespace-pre-line">
              {selectedTemplate === "NOTICE_RESPONDENT" &&
                `BEFORE THE INTERNAL COMMITTEE &bull; ${poshCase.orgName?.toUpperCase()}\n` +
                `NOTICE UNDER SECTION 11 OF THE SEXUAL HARASSMENT OF WOMEN AT WORKPLACE ACT 2013\n\n` +
                `To: The Respondent (Ref: ${poshCase.respondentCode || "RSP-0014"})\n` +
                `Matter: Complaint of Sexual Harassment &bull; Docket: ${poshCase.caseNumber}\n\n` +
                `TAKE NOTICE that a formal complaint alleging sexual harassment at the workplace has been filed against you. Enclosed is a copy of the complaint with all accompanying materials. Pursuant to Rule 7(1) of the POSH Rules, you are hereby required to file your written reply along with supporting documents and list of witnesses within TEN (10) WORKING DAYS of receipt of this notice.`}
              {selectedTemplate === "WITNESS_SUMMONS" &&
                `BEFORE THE INTERNAL COMMITTEE &bull; ${poshCase.orgName?.toUpperCase()}\n` +
                `SUMMONS TO WITNESS UNDER SECTION 11(3) READ WITH ORDER XVI CODE OF CIVIL PROCEDURE 1908\n\n` +
                `To: [Witness Name / Designation]\n` +
                `In the Matter of Inquiry Docket: ${poshCase.caseNumber}\n\n` +
                `WHEREAS your attendance is required to give evidence on behalf of the inquiry. You are hereby required to appear personally before this Internal Committee on the scheduled hearing date. FAIL NOT at your peril.`}
              {selectedTemplate === "HEARING_NOTICE" &&
                `BEFORE THE INTERNAL COMMITTEE &bull; ${poshCase.orgName?.toUpperCase()}\n` +
                `NOTICE OF ORAL HEARING &bull; DOCKET ${poshCase.caseNumber}\n\n` +
                `Notice is hereby given that the next oral hearing and witness cross-examination will take place at the IC Confidential Chamber on the appointed date. Legal practitioners are not permitted under Section 11(4).`}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 border border-border rounded text-xs font-semibold text-ink hover:bg-white flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Draft</span>
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-accent" />
              <span>Dispatch Statutory Notice</span>
            </button>
          </div>
        </form>

        {/* Issued Notices Ledger */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <h2 className="font-serif font-bold text-base text-ink">
            2. Notice Delivery &amp; Service Ledger
          </h2>
          <div className="space-y-2">
            {issuedNotices.map((n) => (
              <div
                key={n.id}
                className="bg-white p-3.5 rounded border border-border flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-primary">{n.trackingRef}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {n.status}
                    </span>
                  </div>
                  <div className="font-semibold text-ink mt-0.5">{n.template}</div>
                  <div className="text-[11px] text-ink-secondary">
                    Issued: {n.dateIssued} &bull; Recipient: {n.recipient} &bull; {n.channel}
                  </div>
                </div>

                <button
                  onClick={() => alert(`Downloading signed certificate of service for ${n.trackingRef}...`)}
                  className="px-3 py-1.5 border border-border rounded text-xs hover:bg-surface inline-flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Service Certificate</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
