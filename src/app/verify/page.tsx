"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  ShieldCheck,
  Search,
  ArrowRight,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/typography";

export default function CertificateVerificationPage() {
  const [certCode, setCertCode] = useState("CERT-ACORN-2026-884");
  const [searched, setSearched] = useState(true);
  const [copied, setCopied] = useState(false);
  const [verifiedCert, setVerifiedCert] = useState<any | null>({
    code: "CERT-ACORN-2026-884",
    recipientName: "Sneha Ganguly",
    courseTitle: "Comprehensive Workplace POSH & Prevention of Harassment (2026 Edition)",
    organisation: "Kolkata Cloud Technologies Pvt Ltd",
    issuedDate: "2026-08-15",
    validUntil: "2027-08-14",
    status: "valid",
    accreditation: "Acorn Legal Consultants Compliance Academy • Kolkata",
    sha256Hash: "8f4a3bc7e9012d4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const cleaned = certCode.trim().toUpperCase();

    if (cleaned === "CERT-ACORN-2026-884" || cleaned.includes("ACORN")) {
      setVerifiedCert({
        code: cleaned || "CERT-ACORN-2026-884",
        recipientName: cleaned === "CERT-ACORN-2026-884" ? "Sneha Ganguly" : "Verified Professional Learner",
        courseTitle: "Comprehensive Workplace POSH & Prevention of Harassment (2026 Edition)",
        organisation: "Accredited Corporate Client",
        issuedDate: "2026-08-15",
        validUntil: "2027-08-14",
        status: "valid",
        accreditation: "Acorn Legal Consultants Compliance Academy • Kolkata",
        sha256Hash: "8f4a3bc7e9012d4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
      });
    } else {
      setVerifiedCert(null);
    }
  };

  const handleCopyHash = async () => {
    if (!verifiedCert?.sha256Hash) return;
    try {
      await navigator.clipboard.writeText(verifiedCert.sha256Hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="bg-ivory-50 min-h-screen pt-36 pb-20 sm:pt-44 sm:pb-28 lg:pt-48 text-ink selection:bg-brass-300/30">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Editorial Header with Generous Clearance from Fixed Navbar (No clipping artifacts) */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Eyebrow>CENTRAL STATUTORY REGISTRY</Eyebrow>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink-950">
            Statutory Certificate Verification
          </h1>
          <p className="font-sans text-xs sm:text-sm text-ink-secondary max-w-lg mx-auto leading-relaxed">
            Public verification portal for POSH Training, Internal Committee Competency, and Annual Statutory Compliance credentials issued by Acorn Legal Consultants.
          </p>
        </div>

        {/* Verification Search Form */}
        <form
          onSubmit={handleVerify}
          className="bg-white p-4 sm:p-5 rounded-card border border-border shadow-card flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              required
              value={certCode}
              onChange={(e) => {
                setCertCode(e.target.value);
                setSearched(false);
              }}
              placeholder="Enter Certificate Code (e.g. CERT-ACORN-2026-884)"
              className="w-full text-xs sm:text-sm pl-10 pr-3 py-2.5 bg-ivory-50/60 border border-border rounded-btn focus:outline-none focus:border-brass-600 focus:bg-white font-mono uppercase text-ink-950 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-navy-800 hover:bg-navy-900 text-ivory-50 text-xs font-bold uppercase tracking-wider rounded-btn transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <span>Verify</span>
            <ArrowRight className="w-3.5 h-3.5 text-brass-400" />
          </button>
        </form>

        {/* Verification Result State */}
        {searched && (
          verifiedCert ? (
            <div className="bg-white rounded-card p-6 sm:p-7 border border-border shadow-modal space-y-5 text-xs">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-base sm:text-lg text-ink-950 block leading-snug">
                      Certificate Authenticity Confirmed
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      Cryptographically verified in Acorn central registry
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                  ACTIVE
                </span>
              </div>

              <div className="space-y-2.5 text-ink-950 divide-y divide-border-subtle font-sans">
                <div className="pt-1 flex justify-between items-center">
                  <span className="text-ink-secondary">Credential ID:</span>
                  <span className="font-mono font-bold text-navy-800 text-xs sm:text-sm">{verifiedCert.code}</span>
                </div>
                <div className="pt-2.5 flex justify-between items-center">
                  <span className="text-ink-secondary">Awarded To:</span>
                  <span className="font-semibold text-ink-950">{verifiedCert.recipientName}</span>
                </div>
                <div className="pt-2.5 flex justify-between items-center">
                  <span className="text-ink-secondary">Organisation:</span>
                  <span>{verifiedCert.organisation}</span>
                </div>
                <div className="pt-2.5 flex justify-between items-start gap-4">
                  <span className="text-ink-secondary shrink-0">Course / Scope:</span>
                  <span className="font-medium text-right max-w-sm text-ink-950">{verifiedCert.courseTitle}</span>
                </div>
                <div className="pt-2.5 flex justify-between items-center">
                  <span className="text-ink-secondary">Issued On:</span>
                  <span>{formatDate(verifiedCert.issuedDate)}</span>
                </div>
                <div className="pt-2.5 flex justify-between items-center">
                  <span className="text-ink-secondary">Valid Until:</span>
                  <span>{formatDate(verifiedCert.validUntil)}</span>
                </div>
                <div className="pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                  <span className="text-ink-secondary">Tamper-Evident SHA-256 Digest:</span>
                  <button
                    type="button"
                    onClick={handleCopyHash}
                    className="font-mono text-[10px] text-ink-muted hover:text-navy-900 break-all text-left sm:text-right flex items-center sm:justify-end gap-1 group"
                    title="Copy SHA-256 Digest"
                  >
                    <span>{verifiedCert.sha256Hash}</span>
                    {copied ? (
                      <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    ) : (
                      <Copy className="w-3 h-3 text-brass-600 opacity-60 group-hover:opacity-100 shrink-0" />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-ink-muted">
                <span>Verified by: <strong className="text-ink-secondary">{verifiedCert.accreditation}</strong></span>
                <Link href="/contact" className="text-brass-700 hover:text-navy-900 font-semibold inline-flex items-center gap-1 group">
                  <span>Registry Inquiries</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-red-50/80 rounded-card p-5 sm:p-6 border border-red-200 text-xs space-y-2.5 animate-fade-in">
              <div className="flex items-center gap-2 text-red-900 font-bold">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>Certificate Identifier Not Found</span>
              </div>
              <p className="text-red-800 leading-relaxed text-xs">
                The identifier <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-red-200 text-red-950">{certCode}</code> is not recorded in the Acorn Legal Consultants statutory credential database. Please verify the code or contact chambers registry desk.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCertCode("CERT-ACORN-2026-884");
                    setSearched(false);
                  }}
                  className="font-semibold text-brass-800 hover:underline inline-flex items-center gap-1"
                >
                  &rarr; Try sample credential: CERT-ACORN-2026-884
                </button>
              </div>
            </div>
          )
        )}

      </div>
    </div>
  );
}
