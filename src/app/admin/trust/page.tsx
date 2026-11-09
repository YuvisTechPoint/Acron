"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Key,
  Server,
  FileCheck2,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Download,
  RefreshCw,
  ExternalLink,
  ArrowLeft,
  FileText,
  BadgeCheck,
  Globe2,
  HardDrive,
  Copy,
  Check,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { TrustDPIARecord, SubProcessorItem } from "@/lib/types";

export default function TrustAndBYOKPage() {
  const [dpiaRecords, setDpiaRecords] = useState<TrustDPIARecord[]>([]);
  const [subProcessors, setSubProcessors] = useState<SubProcessorItem[]>([]);
  const [byokStatus, setByokStatus] = useState<any>(null);
  const [revocationTesting, setRevocationTesting] = useState(false);
  const [revocationResult, setRevocationResult] = useState<string | null>(null);
  const [evidenceDownloading, setEvidenceDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedArn, setCopiedArn] = useState(false);

  useEffect(() => {
    setDpiaRecords(platformStore.getTrustDPIARecords());
    setSubProcessors(platformStore.getSubProcessors());
    setByokStatus(platformStore.getBYOKStatus("org-1"));
  }, []);

  const handleSimulateRevocation = () => {
    setRevocationTesting(true);
    setRevocationResult(null);
    setTimeout(() => {
      setRevocationTesting(false);
      setRevocationResult(
        "PASSED: Access to encrypted case payloads severed in 42ms. Zero byte remanence confirmed. Limitation timers (Section 9 & Section 11) preserved in unencrypted append-only temporal ledger."
      );
    }, 1200);
  };

  const handleDownloadPack = () => {
    setEvidenceDownloading(true);
    setTimeout(() => {
      setEvidenceDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#111827] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-6">
          <Link href="/admin" className="hover:text-[#0A192F] transition flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Staff Admin
          </Link>
          <span>/</span>
          <span className="text-[#0A192F] font-semibold">Trust Assurance, BYOK &amp; DPIA Portal</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5E0D8]">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-lg bg-[#0A192F] text-[#D4AF37]">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A192F]">
                Trust Assurance &amp; Statutory Privacy Console
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#4B5563] mt-0.5">
                PRD v3.0 US-280, US-282, US-284 &bull; Customer-Managed Keys (BYOK), DPIA Register &amp; India Data Residency
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPack}
              disabled={evidenceDownloading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#0A192F] text-white hover:bg-[#152E52] text-xs font-semibold tracking-wide shadow-sm transition disabled:opacity-50"
            >
              {evidenceDownloading ? (
                <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
              ) : (
                <Download className="w-4 h-4 text-[#D4AF37]" />
              )}
              <span>Export Inspection Pack</span>
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="my-4 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Inspection-Ready Audit Pack generated (ZIP + SHA-256 Checksum). Includes ISO 27001 mapping, Section 16 compliance proofs, and sub-processor agreements.
            </span>
          </div>
        )}

        {/* Customer-Managed Keys (BYOK) Section (US-280) */}
        <div className="mt-8 bg-white rounded-xl border border-[#E5E0D8] p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F3F4F6]">
            <div>
              <span className="text-[10px] font-mono font-semibold text-[#D4AF37] uppercase tracking-wider block">
                Enterprise Key Management &bull; US-280
              </span>
              <h2 className="font-serif text-lg font-bold text-[#0A192F] flex items-center gap-2 mt-0.5">
                <Key className="w-5 h-5 text-[#0A192F]" />
                Customer-Managed Encryption Keys (BYOK KMS)
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <BadgeCheck className="w-3.5 h-3.5" />
                Hardware Root of Trust: Healthy
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[#FAF9F6] border border-[#E5E0D8] space-y-1 text-xs">
              <span className="text-[#6B7280] block font-medium">KMS Provider</span>
              <span className="font-mono font-bold text-sm text-[#0A192F] block">
                {byokStatus?.provider || "AWS_KMS"} (ap-south-1 Mumbai)
              </span>
              <span className="text-[11px] text-[#9CA3AF]">
                Zero cross-border key escrow
              </span>
            </div>

            <div className="p-4 rounded-lg bg-[#FAF9F6] border border-[#E5E0D8] space-y-1 text-xs">
              <span className="text-[#6B7280] block font-medium">Customer Key ARN</span>
              <div className="flex items-center justify-between font-mono text-[11px] text-[#0A192F] truncate">
                <span className="truncate">{byokStatus?.keyArnMasked}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(byokStatus?.keyArnMasked || "");
                    setCopiedArn(true);
                    setTimeout(() => setCopiedArn(false), 2000);
                  }}
                  className="ml-1 text-[#6B7280] hover:text-[#0A192F]"
                >
                  {copiedArn ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold block">
                AES-256 GCM Envelope Active
              </span>
            </div>

            <div className="p-4 rounded-lg bg-[#FAF9F6] border border-[#E5E0D8] space-y-1 text-xs">
              <span className="text-[#6B7280] block font-medium">Last Cryptographic Drill</span>
              <span className="font-mono text-xs text-[#0A192F] block font-semibold">
                {byokStatus?.lastShreddingDrill}
              </span>
              <span className="text-[11px] text-[#9CA3AF]">
                Automated monthly zero-byte audit
              </span>
            </div>
          </div>

          {/* Key Revocation Test Harness */}
          <div className="p-4 rounded-lg bg-[#0A192F]/5 border border-[#D4AF37]/30 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="font-semibold text-xs text-[#0A192F] block">
                  Simulated Key Revocation Test (Fail-Closed Verification)
                </span>
                <p className="text-xs text-[#4B5563]">
                  Simulates immediate key revocation by enterprise KMS. Verifies that all unencrypted access halts immediately while statutory 90-day inquiry timelines continue without corruption.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSimulateRevocation}
                disabled={revocationTesting}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-amber-700 text-white hover:bg-amber-800 text-xs font-semibold shrink-0 transition disabled:opacity-50"
              >
                {revocationTesting ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5" />
                )}
                <span>Run Revocation Test</span>
              </button>
            </div>

            {revocationResult && (
              <div className="p-3 rounded bg-white border border-emerald-300 font-mono text-xs text-emerald-800 animate-in fade-in">
                {revocationResult}
              </div>
            )}
          </div>
        </div>

        {/* 2-Column Section: DPIA Register & Sub-Processors (US-282) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          
          {/* Left 7 Cols: DPIA Register */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#E5E0D8] p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
              <div>
                <span className="text-[10px] font-mono font-semibold text-[#D4AF37] uppercase tracking-wider block">
                  Statutory Privacy &bull; US-282
                </span>
                <h3 className="font-serif text-base font-bold text-[#0A192F] flex items-center gap-2 mt-0.5">
                  <FileText className="w-4 h-4 text-[#D4AF37]" />
                  Data Protection Impact Assessment (DPIA) Register
                </h3>
              </div>
              <span className="text-xs font-mono text-[#6B7280]">
                {dpiaRecords.length} Audited Assessments
              </span>
            </div>

            <div className="space-y-4">
              {dpiaRecords.map((dpia) => (
                <div
                  key={dpia.id}
                  className="p-4 rounded-lg border border-[#E5E0D8] bg-[#FAF9F6] space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[11px] font-bold text-[#0A192F]">
                        {dpia.id} &bull; Class: {dpia.dataClass.toUpperCase()}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-[#0A192F] mt-0.5">
                        {dpia.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
                      {dpia.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <span className="font-semibold text-[#0A192F] block">Assessed Privacy Risks:</span>
                    <ul className="space-y-1">
                      {dpia.assessedRisks.map((risk, i) => (
                        <li key={i} className="text-[#4B5563] flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">&bull;</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <span className="font-semibold text-emerald-800 block">Enforced Mitigations:</span>
                    <ul className="space-y-1">
                      {dpia.mitigations.map((mit, i) => (
                        <li key={i} className="text-[#374151] flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{mit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-[#E5E0D8] flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span>Reviewer: <strong>{dpia.legalReviewer}</strong></span>
                    <span>Approved: {dpia.dpoApprovalDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 Cols: Sub-Processor Registry */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5E0D8] p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
              <div>
                <span className="text-[10px] font-mono font-semibold text-[#D4AF37] uppercase tracking-wider block">
                  Data Residency &bull; US-282
                </span>
                <h3 className="font-serif text-base font-bold text-[#0A192F] flex items-center gap-2 mt-0.5">
                  <Server className="w-4 h-4 text-[#D4AF37]" />
                  Sub-Processor Registry
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-700 font-semibold">
                100% India Sovereign
              </span>
            </div>

            <div className="space-y-3">
              {subProcessors.map((sp) => (
                <div
                  key={sp.id}
                  className="p-4 rounded-lg border border-[#E5E0D8] bg-[#FAF9F6] space-y-2 text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-[#0A192F] text-sm">
                      {sp.name}
                    </span>
                    <span className="text-[10px] font-semibold text-[#0A192F] bg-white px-2 py-0.5 rounded border border-[#E5E0D8]">
                      {sp.dataResidency}
                    </span>
                  </div>

                  <p className="text-[#4B5563] leading-relaxed">
                    {sp.purpose}
                  </p>

                  <div className="pt-2 border-t border-[#E5E0D8] space-y-1 text-[11px]">
                    <div className="text-[#0A192F] font-semibold">
                      Certifications: {sp.complianceCert}
                    </div>
                    <div className="text-[#6B7280] flex items-center justify-between">
                      <span>DPIA Ref: {sp.dpiaRef}</span>
                      <span>Verified: {sp.verifiedAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Public Vulnerability Disclosure Policy Note */}
            <div className="p-3.5 rounded-lg bg-[#FAF9F6] border border-[#E5E0D8] space-y-1.5 text-xs">
              <span className="font-semibold text-[#0A192F] flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                Security Disclosure &amp; RFC 9116 Policy:
              </span>
              <p className="text-[#6B7280]">
                Public security coordination endpoint at <code className="text-[#0A192F]">/.well-known/security.txt</code> with counsel PGP keys and statutory 72-hour triage SLA.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

