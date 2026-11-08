"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FileText,
  Upload,
  ShieldCheck,
  Lock,
  Download,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Hash,
  Share2,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { POSHCase, EvidenceItem } from "@/lib/types";

export default function ICEvidencePage() {
  const params = useParams();
  const caseId = (params?.id as string) || "case-01";
  const [poshCase, setPoshCase] = useState<POSHCase | undefined>(() => platformStore.getCaseById(caseId));

  const [newTitle, setNewTitle] = useState("");
  const [newUploader, setNewUploader] = useState<"complainant" | "respondent" | "ic_member">("complainant");
  const [newCategory, setNewCategory] = useState("Electronic Messaging / Email Logs");
  const [isRedacted, setIsRedacted] = useState(false);

  useEffect(() => {
    const c = platformStore.getCaseById(caseId);
    if (c) setPoshCase(c);
  }, [caseId]);

  const handleDepositExhibit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!poshCase || !newTitle) return;

    platformStore.addEvidence(poshCase.id, {
      title: newTitle,
      fileType: "application/pdf",
      fileSizeKb: 1420,
      uploadedBy: newUploader,
      sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      isRedacted,
    });

    const updated = platformStore.getCaseById(poshCase.id);
    if (updated) setPoshCase({ ...updated });
    setNewTitle("");
    alert("Exhibit registered into cryptographic evidence vault with SHA-256 custody entry.");
  };

  if (!poshCase) {
    return (
      <div className="p-12 text-center text-xs text-ink-secondary">
        Case not found. <Link href="/posh/ic" className="text-primary underline">Return to IC Workspace</Link>
      </div>
    );
  }

  const exhibits = poshCase.evidence || [];

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
              href={`/posh/ic/cases/${poshCase.id}/report`}
              className="text-primary font-semibold hover:underline"
            >
              Findings &amp; Report (Sec 13) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>PRD Screen I-07 &bull; Evidence Vault &amp; Chain of Custody</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            Cryptographic Evidence Repository &amp; Custody Ledger
          </h1>
          <p className="text-xs text-ink-secondary leading-relaxed">
            Docket <span className="font-mono font-bold text-primary">{poshCase.caseNumber}</span> &bull; All exhibits deposited are hashed with SHA-256 and subject to immutable chain-of-custody logging. Redaction of sensitive third-party PII must be completed before release under natural justice.
          </p>
        </div>

        {/* Upload & Deposit Form */}
        <form onSubmit={handleDepositExhibit} className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <h2 className="font-serif font-bold text-base text-ink border-b border-border-subtle pb-3">
            Deposit New Documentary or Electronic Exhibit
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-ink-secondary font-medium mb-1">Exhibit Title / Description</label>
              <input
                type="text"
                placeholder="e.g., Slack Channel Export (Oct 2026)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-border rounded text-xs focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-ink-secondary font-medium mb-1">Deposited By</label>
              <select
                value={newUploader}
                onChange={(e) => setNewUploader(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-border rounded text-xs focus:outline-none focus:border-primary"
              >
                <option value="complainant">Complainant</option>
                <option value="respondent">Respondent</option>
                <option value="ic_member">Internal Committee (Sua Sponte)</option>
              </select>
            </div>
            <div>
              <label className="block text-ink-secondary font-medium mb-1">Evidence Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-border rounded text-xs focus:outline-none focus:border-primary"
              >
                <option value="Electronic Messaging / Email Logs">Electronic Messaging / Email Logs</option>
                <option value="CCTV / Security Footage Logs">CCTV / Security Footage Logs</option>
                <option value="Performance Appraisal Records">Performance Appraisal Records</option>
                <option value="Medical Certificate / Psychiatric Evaluation">Medical / Trauma Evaluation</option>
                <option value="Witness Sworn Affidavit">Witness Sworn Affidavit</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={isRedacted}
                onChange={(e) => setIsRedacted(e.target.checked)}
                className="rounded text-primary"
              />
              <span className="text-ink font-medium">PII Redaction Applied (Sec 16 Safeguard)</span>
            </label>

            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover flex items-center gap-2"
            >
              <Upload className="w-3.5 h-3.5 text-accent" />
              <span>Seal Exhibit into Vault</span>
            </button>
          </div>
        </form>

        {/* Exhibits List & Chain of Custody */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-serif font-bold text-base text-ink">
              Sealed Exhibits &amp; SHA-256 Checksums
            </h2>
            <span className="text-xs text-ink-secondary">{exhibits.length} Registered Exhibits</span>
          </div>

          <div className="space-y-3">
            {exhibits.length > 0 ? (
              exhibits.map((ex) => (
                <div key={ex.id} className="bg-white p-4 rounded border border-border space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-border-subtle pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-primary">{ex.exhibitCode}</span>
                      <span className="font-bold text-ink">{ex.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface border border-border">
                        Uploaded by: {ex.uploadedBy.toUpperCase()}
                      </span>
                      {ex.isRedacted && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                          REDACTED
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-ink-secondary">
                    <div>
                      File: {ex.fileType} &bull; {ex.fileSizeKb} KB &bull; {formatDate(ex.uploadedAt)}
                    </div>
                    <div className="font-mono text-[11px] text-ink flex items-center gap-1 overflow-hidden text-ellipsis">
                      <Hash className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{ex.sha256Hash || "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center border-t border-border-subtle">
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Integrity Verified &bull; Tamper-Evident Chain Intact</span>
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => alert(`Releasing exhibit ${ex.exhibitCode} to opposing party under natural justice...`)}
                        className="px-3 py-1 border border-border rounded hover:bg-surface flex items-center gap-1 text-ink"
                      >
                        <Share2 className="w-3 h-3 text-primary" />
                        <span>Release to Parties</span>
                      </button>
                      <button
                        onClick={() => alert(`Downloading verified exhibit ${ex.exhibitCode}...`)}
                        className="px-3 py-1 bg-surface border border-border rounded hover:bg-surface-muted flex items-center gap-1 text-ink"
                      >
                        <Download className="w-3 h-3 text-primary" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-ink-secondary bg-white rounded border border-border">
                No exhibits deposited in the vault yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
