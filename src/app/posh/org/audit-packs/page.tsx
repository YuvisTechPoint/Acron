"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FolderArchive,
  Download,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { AuditInspectionPack } from "@/lib/types";

export default function OrgAuditPacksPage() {
  const [packs, setPacks] = useState<AuditInspectionPack[]>(platformStore.getAuditPacks("TECHKOL"));
  const [generating, setGenerating] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const generatePack = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setNotice(
        "Inspection-Ready Audit Pack FY 2026-27 compiled with SHA-256 seal. Ready for Labour Inspectorate or DO audit."
      );
      setTimeout(() => setNotice(null), 5000);
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Header */}
      <div className="bg-[#050C17] text-white border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brass-400 mb-2">
                <span>Statutory Inspection Readiness</span>
                <span>•</span>
                <span>PRD Section 35 &amp; 38 (E27)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Section 19 Inspection-Ready Audit Packs
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl font-sans">
                Automated compilation of mandatory Section 19 evidence: physical notice manifests, workshop sign-in sheets, Internal Committee gazette notification, and annual DO filings.
              </p>
            </div>

            <button
              onClick={generatePack}
              disabled={generating}
              className="px-4 py-2 bg-[#101F38] hover:bg-navy-900 text-brass-300 rounded text-xs font-semibold border border-brass-500/30 transition disabled:opacity-40 inline-flex items-center gap-2"
            >
              <FolderArchive className="w-4 h-4" />
              <span>{generating ? "Compiling Audit Evidence..." : "Compile Inspection Pack"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Statutory Inspection Context */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-4 text-xs text-emerald-900 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-emerald-950 uppercase tracking-wider text-[11px]">
              Labour Department &amp; District Officer Inspection Defense
            </span>
            <p className="leading-relaxed">
              Under Section 26 of the POSH Act, failure to constitute an IC or file the annual report attracts a ₹50,000 fine and cancellation of business licenses on repeat offense. This pack produces a one-click court-admissible bundle mapped item-for-item to Section 19 duties.
            </p>
          </div>
        </div>

        {notice && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {/* Existing Audit Bundles */}
        <div className="space-y-4">
          <h2 className="font-serif font-bold text-lg text-slate-900">Sealed Statutory Bundles</h2>

          <div className="grid grid-cols-1 gap-6">
            {packs.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-brass-700 font-bold mb-1">
                      <FileCheck className="w-4 h-4" />
                      <span>Fiscal Year {p.fiscalYear}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">
                      Complete Section 19 Compliance Dossier — {p.orgCode}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs font-mono font-bold">
                      Score: {p.complianceScore}% (Audit Ready)
                    </span>
                    <button
                      onClick={() => alert(`Downloading signed inspection pack for ${p.orgCode} (${p.fiscalYear})...`)}
                      className="px-3 py-1.5 bg-[#101F38] hover:bg-navy-900 text-brass-300 rounded text-xs font-medium transition inline-flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF Dossier</span>
                    </button>
                  </div>
                </div>

                {/* Evidence Checklist Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">Section 19(a) Policy</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-slate-500">91% acknowledged by 420 active employees.</p>
                  </div>

                  <div className="p-3 rounded bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">Section 19(b) Notices</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-slate-500">Physical boards verified across 3 Kolkata hubs.</p>
                  </div>

                  <div className="p-3 rounded bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">Section 19(c) Workshops</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-slate-500">4 quarterly awareness sessions logged.</p>
                  </div>

                  <div className="p-3 rounded bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">Sec 21/22 DO Report</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-slate-500">Submitted with DO acknowledgment receipt.</p>
                  </div>
                </div>

                {/* Cryptographic SHA-256 Seal */}
                <div className="p-3 bg-slate-50 rounded border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
                  <span className="text-slate-500">Tamper-Evident SHA-256 Bundle Seal:</span>
                  <span className="text-slate-800 break-all">{p.sha256Seal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

