"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Upload,
  Lock,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Download,
  AlertCircle
} from "lucide-react";
import { platformStore } from "@/lib/store";

export default function ComplainantDocsPage() {
  const [activeCaseId, setActiveCaseId] = useState("POSH-TECHKOL-2026-0014");
  const [supplementalTitle, setSupplementalTitle] = useState("");
  const [supplementalType, setSupplementalType] = useState("CHAT_SCREENSHOT");
  const [supplementalDesc, setSupplementalDesc] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

  const poshCase = platformStore.getCaseById(activeCaseId);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplementalTitle) return;
    setIsUploaded(true);
    setTimeout(() => {
      alert("Supplemental exhibit deposited with SHA-256 seal. Presiding Officer notified.");
      setSupplementalTitle("");
      setSupplementalDesc("");
      setIsUploaded(false);
    }, 800);
  };

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/posh/my-case"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Case Status</span>
          </Link>
          <span className="text-[11px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
            PRD Screen Ref: C-07
          </span>
        </div>

        {/* Header */}
        <div className="bg-white p-6 rounded-card border border-border shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
            <FileText className="w-4 h-4 text-primary" />
            <span>Document Vault &bull; Evidence Record (C-07)</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink mt-1">
            Released Exhibits &amp; Supplemental Deposits
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Inspect verified exhibits, download served respondent written responses (Rule 7(3)), or deposit supplemental documentary proof under cryptographic SHA-256 integrity check.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <Link
              href="/posh/my-case"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
            >
              Overview &amp; Timers
            </Link>
            <span className="px-3 py-1.5 bg-primary text-white rounded font-bold">
              Documents &amp; Evidence (C-07)
            </span>
            <Link
              href="/posh/my-case/interim"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
            >
              Interim Relief (C-08)
            </Link>
            <Link
              href="/posh/my-case/request"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
            >
              Conciliation / Motions (C-09)
            </Link>
            <Link
              href="/posh/my-case/support"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
            >
              Support Accommodations (C-10)
            </Link>
          </div>
        </div>

        {/* Existing Exhibits */}
        <div className="bg-white p-6 rounded-card border border-border shadow-sm space-y-4">
          <h2 className="font-serif text-base font-bold text-ink flex items-center justify-between">
            <span>Verified Exhibits in Evidence Vault</span>
            <span className="text-xs font-normal text-slate-500 font-mono">Case ID: {activeCaseId}</span>
          </h2>

          {poshCase?.evidence && poshCase.evidence.length > 0 ? (
            <div className="space-y-3">
              {poshCase.evidence.map((ev) => (
                <div key={ev.id} className="p-4 bg-slate-50 rounded border border-border flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 bg-white border border-border rounded">
                        {ev.exhibitCode}
                      </span>
                      <span className="text-xs font-bold text-ink">{ev.title}</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded border border-emerald-200">
                        {ev.verificationStatus}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{ev.description}</p>
                    <div className="text-[11px] font-mono text-slate-400 mt-1">
                      SHA-256: {ev.sha256Hash}
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Downloading verified exhibit ${ev.exhibitCode}...`)}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-border rounded text-xs font-medium text-slate-700 flex items-center gap-1.5 shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500">No exhibits currently accessible in this vault.</p>
          )}
        </div>

        {/* Supplemental Upload Form */}
        <div className="bg-white p-6 rounded-card border border-border shadow-sm space-y-4">
          <div className="flex items-center gap-2 font-serif text-base font-bold text-ink">
            <Upload className="w-4 h-4 text-primary" />
            <span>Deposit Supplemental Evidence</span>
          </div>
          <p className="text-xs text-slate-600">
            You may deposit additional chat records, emails, call records, or witness statements during the ongoing inquiry. All uploads are hashed upon ingestion.
          </p>

          <form onSubmit={handleUpload} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Exhibit Title / Heading *</label>
                <input
                  type="text"
                  required
                  value={supplementalTitle}
                  onChange={(e) => setSupplementalTitle(e.target.value)}
                  placeholder="e.g. Teams message log dated 14 Oct 2026"
                  className="w-full p-2.5 border border-border rounded"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Document Classification *</label>
                <select
                  value={supplementalType}
                  onChange={(e) => setSupplementalType(e.target.value)}
                  className="w-full p-2.5 border border-border rounded bg-white"
                >
                  <option value="CHAT_SCREENSHOT">Instant Messaging / Chat Log</option>
                  <option value="EMAIL_RECORD">Corporate Email Correspondence</option>
                  <option value="AUDIO_RECORDING">Audio Recording / Voicemail</option>
                  <option value="WITNESS_AFFIDAVIT">Witness Statement / Affidavit</option>
                  <option value="MEDICAL_REPORT">Medical / Psychological Record</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Contextual Description</label>
              <textarea
                rows={2}
                value={supplementalDesc}
                onChange={(e) => setSupplementalDesc(e.target.value)}
                placeholder="Explain the relevance of this document to the alleged incident..."
                className="w-full p-2.5 border border-border rounded"
              />
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <div className="font-bold text-ink">Click or drag file here to deposit exhibit</div>
              <div className="text-[11px] text-slate-500 mt-1">Supported: PDF, PNG, JPG, MP3, MP4 (Max 50MB)</div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isUploaded}
                className="px-5 py-2.5 bg-primary hover:bg-primary-light text-white font-bold rounded flex items-center gap-2 shadow"
              >
                <Lock className="w-3.5 h-3.5 text-gold" />
                <span>Submit &amp; Seal Exhibit</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

