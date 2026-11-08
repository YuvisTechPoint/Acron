"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Upload,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  UserCheck,
  Plus,
  Trash2,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export default function PoshRespondentReplyPage() {
  const [caseNumber, setCaseNumber] = useState("POSH-TECHKOL-2026-0014");
  const [writtenStatement, setWrittenStatement] = useState("");
  const [witnesses, setWitnesses] = useState<Array<{ name: string; role: string; contact: string }>>([
    { name: "", role: "", contact: "" },
  ]);
  const [extensionRequested, setExtensionRequested] = useState(false);
  const [extensionGrounds, setExtensionGrounds] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [trackingReceipt, setTrackingReceipt] = useState("");

  const poshCase = platformStore.getCaseById(caseNumber);

  const handleAddWitness = () => {
    setWitnesses([...witnesses, { name: "", role: "", contact: "" }]);
  };

  const handleRemoveWitness = (index: number) => {
    setWitnesses(witnesses.filter((_, i) => i !== index));
  };

  const handleWitnessChange = (index: number, field: string, value: string) => {
    const updated = [...witnesses];
    (updated[index] as any)[field] = value;
    setWitnesses(updated);
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!writtenStatement.trim()) return;

    if (poshCase) {
      poshCase.respondentDefenseSummary = writtenStatement;
      poshCase.respondentReplyReceivedAt = new Date().toISOString();
      poshCase.state = "REPLY_RECEIVED";
      platformStore.updateCaseState(
        poshCase.id,
        "REPLY_RECEIVED",
        "Respondent submitted formal Section 11 written statement, witness list, and defense materials."
      );
    }

    const receipt = `REC-REP-${Date.now().toString().slice(-6)}`;
    setTrackingReceipt(receipt);
    setSubmitted(true);
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-10 text-ink">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link
            href="/posh/respondent"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to Respondent Desk</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/posh/respondent/status" className="text-primary font-medium hover:underline">
              View Case Status &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <FileText className="w-4 h-4 text-primary" />
            <span>PRD Screen R-02 &bull; Rule 7 of POSH Rules 2013</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            Formal Written Statement &amp; Counter-Evidence Submission
          </h1>
          <p className="text-xs text-ink-secondary leading-relaxed">
            Pursuant to Rule 7(1) of the POSH Rules 2013, you are required to submit your formal written reply along with a list of documents and witnesses within 10 working days of receipt of the inquiry notice.
          </p>
        </div>

        {submitted ? (
          <div className="bg-surface p-8 rounded-card border border-border shadow-card space-y-6 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="font-serif text-xl font-bold text-ink">
                Written Statement Registered Successfully
              </h2>
              <p className="text-xs text-ink-secondary">
                Your response has been sealed into the confidential IC docket. Receipt reference:
              </p>
              <div className="font-mono text-sm font-bold text-primary pt-1">
                {trackingReceipt}
              </div>
            </div>
            <div className="bg-white p-4 rounded border border-border text-xs text-ink-secondary text-left max-w-lg mx-auto space-y-1">
              <div className="font-bold text-ink">Procedural Next Steps:</div>
              <div>1. The Internal Committee will examine your statement and schedule oral hearing depositions.</div>
              <div>2. You will receive formal notice of hearing with at least 7 days advance notice.</div>
              <div>3. All documents submitted are protected under Section 16 statutory confidentiality.</div>
            </div>
            <div className="pt-2 flex justify-center gap-4">
              <Link
                href="/posh/respondent/status"
                className="px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover transition-colors inline-flex items-center gap-2"
              >
                <span>Track Case Status</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitReply} className="space-y-6">
            {/* Case Selector / Notice Verification */}
            <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
              <h2 className="font-serif font-bold text-base text-ink flex items-center gap-2">
                <span>1. Notice &amp; Inquiry Reference</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-ink-secondary font-medium mb-1">Docket Number</label>
                  <input
                    type="text"
                    value={caseNumber}
                    onChange={(e) => setCaseNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-border rounded font-mono text-xs focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-ink-secondary font-medium mb-1">Statutory Response Window</label>
                  <div className="px-3 py-2 bg-white border border-border rounded text-ink font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>10 Working Days (Rule 7(1))</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Written Statement Editor */}
            <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-serif font-bold text-base text-ink">
                  2. Formal Written Defense Statement
                </h2>
                <span className="text-[11px] text-ink-secondary">Detailed point-by-point reply</span>
              </div>
              <p className="text-xs text-ink-secondary">
                Address each allegation set out in the notice of inquiry. State all material facts, circumstances, timelines, and communications supporting your position.
              </p>
              <textarea
                rows={8}
                value={writtenStatement}
                onChange={(e) => setWrittenStatement(e.target.value)}
                placeholder="State your comprehensive written response here. Include precise dates, project contexts, witnesses present, and electronic communication references..."
                className="w-full p-4 bg-white border border-border rounded text-xs leading-relaxed focus:outline-none focus:border-primary"
                required
              />
            </div>

            {/* Witness Nomination */}
            <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-serif font-bold text-base text-ink">
                    3. Defense Witness Roster
                  </h2>
                  <p className="text-xs text-ink-secondary mt-0.5">
                    Nominate individuals who have direct knowledge of the events described.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddWitness}
                  className="px-3 py-1.5 border border-border text-xs font-medium rounded hover:bg-white inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Witness</span>
                </button>
              </div>

              <div className="space-y-3">
                {witnesses.map((w, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-3 rounded border border-border items-center">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={w.name}
                        onChange={(e) => handleWitnessChange(idx, "name", e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-border rounded text-xs"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Designation / Department"
                        value={w.role}
                        onChange={(e) => handleWitnessChange(idx, "role", e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-border rounded text-xs"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Email / Phone"
                        value={w.contact}
                        onChange={(e) => handleWitnessChange(idx, "contact", e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-border rounded text-xs"
                      />
                      {witnesses.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveWitness(idx)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence & Exhibits Upload */}
            <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
              <h2 className="font-serif font-bold text-base text-ink">
                4. Counter-Exhibits &amp; Documentary Records
              </h2>
              <p className="text-xs text-ink-secondary">
                Upload relevant emails, work logs, attendance records, or messaging transcripts. All files are encrypted at rest with SHA-256 chain-of-custody checksums.
              </p>
              <div className="border-2 border-dashed border-border rounded p-6 text-center bg-white space-y-2">
                <Upload className="w-8 h-8 text-primary mx-auto" />
                <div className="text-xs font-semibold text-ink">
                  Click to select defense files or drag &amp; drop
                </div>
                <div className="text-[11px] text-ink-secondary">
                  PDF, DOCX, PNG, JPG &bull; Maximum 25MB per exhibit
                </div>
              </div>
            </div>

            {/* Time Extension Request Option */}
            <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-3">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={extensionRequested}
                  onChange={(e) => setExtensionRequested(e.target.checked)}
                  className="mt-0.5 rounded text-primary"
                />
                <div>
                  <div className="text-xs font-bold text-ink">
                    Request Statutory Time Extension for Written Reply
                  </div>
                  <div className="text-xs text-ink-secondary">
                    Check if you require an extension beyond 10 working days on substantiated grounds (e.g., medical leave, official travel, or document retrieval).
                  </div>
                </div>
              </label>

              {extensionRequested && (
                <div className="pt-2">
                  <textarea
                    rows={3}
                    value={extensionGrounds}
                    onChange={(e) => setExtensionGrounds(e.target.value)}
                    placeholder="State detailed grounds for seeking extension of time under natural justice..."
                    className="w-full p-3 bg-white border border-border rounded text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              )}
            </div>

            {/* Legal Declaration & Submission */}
            <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
              <div className="text-xs text-ink-secondary leading-relaxed bg-white p-4 rounded border border-border">
                <strong>Solemn Declaration:</strong> I solemnly affirm that the contents of this written statement and all attached documents are true and correct to the best of my knowledge and belief. I understand that Section 16 of the POSH Act prohibits publishing or disseminating any information concerning this inquiry.
              </div>
              <div className="flex justify-end gap-3">
                <Link
                  href="/posh/respondent"
                  className="px-4 py-2 border border-border text-xs font-semibold rounded hover:bg-surface text-ink transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover transition-colors inline-flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>Submit Statement to IC</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
