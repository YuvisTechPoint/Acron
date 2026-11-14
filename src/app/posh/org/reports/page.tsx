"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  Upload,
  Calendar,
  CheckCircle2,
  Printer,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building,
  Check,
  X,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatSuppressedCount, isCellSuppressed, downloadFile } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

export default function PoshOrgReportsPage() {
  const { toast } = useToast();
  const [selectedOrgId, setSelectedOrgId] = useState("org-1");
  const [reportYear, setReportYear] = useState("2025");
  const orgs = platformStore.getOrganizations();
  const activeOrg = orgs.find((o) => o.id === selectedOrgId) || orgs[0];

  const [ackNumber, setAckNumber] = useState("DO/KOL/POSH/2025/ACK-092");
  const [ackDate, setAckDate] = useState("2026-01-22");
  const [showAckModal, setShowAckModal] = useState(false);
  const [newAckNumber, setNewAckNumber] = useState("");
  const [newAckDate, setNewAckDate] = useState(new Date().toISOString().split("T")[0]);

  const statutoryMetrics = {
    received: 4, // Note: suppressed in public views if < 5 per privacy rules
    disposed: 4,
    pendingAbove90: 0,
    workshopsConducted: 8,
    employeesSensitised: 395,
    employerActionCompleted: "Disciplinary written warnings issued; 1 salary deduction executed.",
  };

  const handleUpdateAck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAckNumber.trim()) {
      toast({
        title: "Validation Incomplete",
        description: "Please enter the official District Officer acknowledgement receipt number.",
        variant: "warning",
      });
      return;
    }
    setAckNumber(newAckNumber.trim());
    setAckDate(newAckDate);
    setShowAckModal(false);
    setNewAckNumber("");

    toast({
      title: "DO Filing Acknowledgement Updated",
      description: `Receipt ${newAckNumber.trim()} recorded for Calendar Year ${reportYear}.`,
      variant: "success",
    });
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-10 text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link
            href="/posh/org"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-primary transition-colors min-h-[44px] px-2 -ml-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to Organisation Console ({activeOrg.name})</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/posh/org/prevention"
              className="text-primary font-semibold hover:underline min-h-[44px] flex items-center px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              Prevention &amp; Climate Surveys (O-08) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                <FileText className="w-4 h-4 text-primary" />
                <span>PRD Screen O-07 &bull; Sections 21 &amp; 22 Annual Report</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
                Statutory Annual Report to the District Officer (DO)
              </h1>
              <p className="text-xs text-ink-secondary mt-1">
                Employer: <span className="font-semibold text-ink">{activeOrg.name}</span> &bull; Filing due by January 31st each calendar year under West Bengal POSH Rules.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <label htmlFor="report-year" className="sr-only">Select Report Calendar Year</label>
              <select
                id="report-year"
                value={reportYear}
                onChange={(e) => setReportYear(e.target.value)}
                className="px-3 py-2 min-h-[44px] bg-white border border-border rounded text-xs font-semibold text-ink shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <option value="2026">Calendar Year 2026</option>
                <option value="2025">Calendar Year 2025</option>
                <option value="2024">Calendar Year 2024</option>
              </select>

              <label htmlFor="org-select-reports" className="sr-only">Select Employer Organisation</label>
              <select
                id="org-select-reports"
                value={selectedOrgId}
                onChange={(e) => setSelectedOrgId(e.target.value)}
                className="px-3 py-2 min-h-[44px] bg-white border border-border rounded text-xs font-semibold text-ink shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {orgs.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 21 / 22 Mandate & Small-Group Suppression Notice */}
        <div className="p-5 bg-white rounded-card border border-border shadow-card text-xs space-y-2">
          <div className="flex items-center gap-2 font-serif font-bold text-primary text-sm">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>Statutory Filing Mandate &bull; Section 21 &amp; Rule 14</span>
          </div>
          <p className="text-ink-secondary leading-relaxed">
            The Internal Committee shall in each calendar year prepare an annual report and submit the same to the employer and the District Officer (DO), Kolkata. In the Annual Report forwarded to the Board of Directors under Section 22, the employer must include the number of cases filed and disposed of.
          </p>
          <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded border border-amber-200">
            <strong>Confidentiality Safeguard (PRD Section 8.6.3):</strong> Small-group suppression threshold of 5 is active. Breakdown by department is suppressed to prevent indirect identification of complainants.
          </div>
        </div>

        {/* Statutory Report Metrics Box */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-border-subtle pb-3">
            <h2 className="font-serif font-bold text-base text-ink">
              Official Annual Return Summary ({reportYear})
            </h2>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold inline-flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Status: Filed with DO Kolkata</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setNewAckNumber(ackNumber);
                  setShowAckModal(true);
                }}
                className="text-xs font-semibold text-primary hover:underline px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                Update Receipt
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-white p-4 rounded border border-border space-y-1">
              <span className="text-ink-secondary">1. Complaints Received (Sec 21(a)):</span>
              <div className="font-serif font-bold text-2xl text-primary mt-1">
                {formatSuppressedCount(statutoryMetrics.received)}
              </div>
              <div className="text-[10px] text-ink-secondary">
                {isCellSuppressed(statutoryMetrics.received) ? "Small-cell suppressed (< 5)" : "Registered within calendar year"}
              </div>
            </div>

            <div className="bg-white p-4 rounded border border-border space-y-1">
              <span className="text-ink-secondary">2. Complaints Disposed Of (Sec 21(b)):</span>
              <div className="font-serif font-bold text-2xl text-emerald-700 mt-1">
                {formatSuppressedCount(statutoryMetrics.disposed)}
              </div>
              <div className="text-[10px] text-ink-secondary">
                {isCellSuppressed(statutoryMetrics.disposed) ? "Small-cell suppressed (< 5)" : "Findings reports concluded"}
              </div>
            </div>

            <div className="bg-white p-4 rounded border border-border space-y-1">
              <span className="text-ink-secondary">3. Cases Pending &gt;90 Days (Sec 21(c)):</span>
              <div className="font-serif font-bold text-2xl text-ink mt-1">
                {statutoryMetrics.pendingAbove90}
              </div>
              <div className="text-[10px] text-emerald-600 font-semibold">Zero statutory delays</div>
            </div>

            <div className="bg-white p-4 rounded border border-border space-y-1">
              <span className="text-ink-secondary">4. Awareness Workshops Conducted (Sec 21(d)):</span>
              <div className="font-serif font-bold text-2xl text-primary mt-1">
                {statutoryMetrics.workshopsConducted}
              </div>
              <div className="text-[10px] text-ink-secondary">{statutoryMetrics.employeesSensitised} employees trained</div>
            </div>

            <div className="bg-white p-4 rounded border border-border space-y-1 sm:col-span-2">
              <span className="text-ink-secondary">5. Nature of Action Taken by Employer (Sec 21(e)):</span>
              <div className="font-bold text-ink text-xs mt-1">
                {statutoryMetrics.employerActionCompleted}
              </div>
              <div className="text-[10px] text-ink-secondary">Implemented within 60 days per Section 13(4)</div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-border-subtle text-xs">
            <span className="text-ink-secondary">
              Submission Proof: <strong className="text-ink font-mono">{ackNumber}</strong> (Dated: {ackDate})
            </span>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  const docxDoc = [
                    "===========================================================",
                    `     SECTION 21 ANNUAL REPORT &bull; CALENDAR YEAR ${reportYear}`,
                    "===========================================================",
                    `Submitted To: District Officer, Kolkata / North 24 Parganas`,
                    `Reporting Entity: ${activeOrg.name} (${activeOrg.code})`,
                    `Acknowledgement No: ${ackNumber}`,
                    "-----------------------------------------------------------",
                    "STATUTORY DISCLOSURES PER SECTION 21 & RULE 14:",
                    `1. Number of complaints received in the year: ${statutoryMetrics.received}`,
                    `2. Number of complaints disposed of in the year: ${statutoryMetrics.disposed}`,
                    `3. Number of cases pending for more than ninety days: ${statutoryMetrics.pendingAbove90}`,
                    `4. Number of workshops / awareness programmes carried out: ${statutoryMetrics.workshopsConducted}`,
                    `5. Nature of action taken by employer: ${statutoryMetrics.employerActionCompleted} recommendations fully implemented`,
                    "-----------------------------------------------------------",
                    "Certified under the seal of the Internal Committee and",
                    "authorized by Acorn Legal Consultants (Chambers Registry).",
                    "Strictly Confidential per Section 16 POSH Act 2013.",
                    "===========================================================",
                  ].join("\n");
                  downloadFile(`Section-21-Annual-Report-${activeOrg.code}-${reportYear}.docx`, docxDoc, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
                  toast({
                    title: "Annual Report Downloaded",
                    description: `Certified Section 21 Annual Report (DOCX) for ${reportYear} downloaded.`,
                    variant: "success",
                  });
                }}
                className="px-3.5 py-2 min-h-[44px] border border-border rounded text-ink hover:bg-white flex items-center gap-1.5 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Download className="w-3.5 h-3.5 text-primary" />
                <span>Download DOCX</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const pdfDoc = [
                    "===========================================================",
                    `  GOVERNMENT OF WEST BENGAL - DISTRICT OFFICER REPORTING`,
                    `     STATUTORY SECTION 21 ANNUAL COMPLIANCE RETURN`,
                    "===========================================================",
                    `Year of Report: ${reportYear}`,
                    `Employer Name: ${activeOrg.name}`,
                    `Registered Address: ${activeOrg.registeredAddress || "Kolkata, West Bengal"}`,
                    `Presiding Officer: ${activeOrg.presidingOfficerName || "Dr. Ananya Mukherjee"}`,
                    `External Member: ${activeOrg.externalMemberName || "Adv. Debjani Sen (Acorn Legal)"}`,
                    `Filing Proof Receipt: ${ackNumber} (Dated: ${ackDate})`,
                    "-----------------------------------------------------------",
                    `Complaints Lodged: ${statutoryMetrics.received}`,
                    `Complaints Disposed: ${statutoryMetrics.disposed}`,
                    `Pending > 90 Days: ${statutoryMetrics.pendingAbove90} (ZERO DEFAULT)`,
                    `Workshops Executed: ${statutoryMetrics.workshopsConducted}`,
                    "-----------------------------------------------------------",
                    "Statutory Verification: The Internal Committee certifies that all",
                    "complaints were investigated strictly following the principles of",
                    "natural justice and the provisions of the POSH Act 2013.",
                    "===========================================================",
                  ].join("\n");
                  downloadFile(`Section-21-Annual-Report-${activeOrg.code}-${reportYear}.txt`, pdfDoc);
                  toast({
                    title: "Certified PDF Downloaded",
                    description: `Certified Section 21 Annual Report for ${reportYear} downloaded.`,
                    variant: "success",
                  });
                }}
                className="px-4 py-2 min-h-[44px] bg-primary text-white rounded hover:bg-primary-hover flex items-center gap-1.5 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 focus-visible:ring-offset-2"
              >
                <Download className="w-3.5 h-3.5 text-accent" />
                <span>Download Certified PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal for DO Filing Acknowledgement */}
        {showAckModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ack-modal-title"
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in"
          >
            <div className="bg-white rounded-card border border-border shadow-raised max-w-md w-full p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 id="ack-modal-title" className="font-serif font-bold text-base text-ink">
                  Record DO Filing Acknowledgement
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAckModal(false)}
                  aria-label="Close dialog"
                  className="p-2 min-h-[44px] min-w-[44px] hover:bg-border rounded text-ink-secondary flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleUpdateAck} className="space-y-4 text-xs">
                <div>
                  <label htmlFor="ack-number" className="block font-bold text-ink mb-1">
                    District Officer Acknowledgement / Challan No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="ack-number"
                    type="text"
                    required
                    placeholder="e.g. DO/KOL/POSH/2026/ACK-108"
                    value={newAckNumber}
                    onChange={(e) => setNewAckNumber(e.target.value)}
                    className="w-full px-3 py-2.5 min-h-[44px] font-mono border border-border rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="ack-date" className="block font-bold text-ink mb-1">
                    Submission / Stamp Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="ack-date"
                    type="date"
                    required
                    value={newAckDate}
                    onChange={(e) => setNewAckDate(e.target.value)}
                    className="w-full px-3 py-2.5 min-h-[44px] border border-border rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowAckModal(false)}
                    className="px-4 py-2 min-h-[44px] border border-border rounded text-ink-secondary hover:bg-surface font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 min-h-[44px] bg-primary text-white rounded font-bold hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 focus-visible:ring-offset-2"
                  >
                    Save Acknowledgement
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

