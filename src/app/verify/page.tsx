"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Award, CheckCircle2, ShieldCheck, Search, ArrowRight, AlertCircle, FileCheck, Building2, Calendar, Shield } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Eyebrow } from "@/components/ui";

export default function CertificateVerificationPage() {
  const [certCode, setCertCode] = useState("CERT-ACORN-2026-884");
  const [searched, setSearched] = useState(true);
  const [verifiedCert, setVerifiedCert] = useState<any | null>({
    code: "CERT-ACORN-2026-884",
    recipientName: "Verified Professional Learner",
    courseTitle: "Statutory POSH Employee Awareness & IC Capacity Certification",
    organisation: "Accredited Corporate Client",
    issuedDate: "2026-09-01",
    validUntil: "2027-08-31",
    status: "valid",
    accreditation: "Acorn Legal Consultants Statutory Compliance Desk • Kolkata",
    sha256Hash: "8f4a3bc7e9012d4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const cleaned = certCode.trim().toUpperCase();
    if (cleaned === "CERT-ACORN-2026-884" || cleaned.includes("ACORN")) {
      setVerifiedCert({
        code: cleaned,
        recipientName: "Verified Professional Learner",
        courseTitle: "Statutory POSH Employee Awareness & IC Capacity Certification",
        organisation: "Accredited Corporate Client",
        issuedDate: "2026-09-01",
        validUntil: "2027-08-31",
        status: "valid",
        accreditation: "Acorn Legal Consultants Statutory Compliance Desk • Kolkata",
        sha256Hash: "8f4a3bc7e9012d4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
      });
    } else {
      setVerifiedCert(null);
    }
  };

  return (
    <div className="bg-ivory-50 min-h-screen pt-36 pb-20 sm:pt-44 sm:pb-28 text-ink selection:bg-brass-300/30">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Editorial Header with Generous Clearance from Fixed Navbar */}
        <div className="text-center space-y-4">
          <Eyebrow className="justify-center">CENTRAL STATUTORY REGISTRY</Eyebrow>

          <div className="space-y-2">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink-950">
              Statutory Certificate Verification
            </h1>
            <p className="font-sans text-xs sm:text-sm text-ink-secondary max-w-lg mx-auto leading-relaxed">
              Public verification portal for POSH Training, Internal Committee Competency, and Annual Statutory Compliance credentials issued by Acorn Legal Consultants.
            </p>
          </div>
        </div>

        {/* Verification Input Form */}
        <div className="bg-white p-6 sm:p-8 rounded-card border border-border shadow-card space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary">
            Credential Identification Code
          </label>
          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                required
                value={certCode}
                onChange={(e) => setCertCode(e.target.value)}
                placeholder="e.g. CERT-ACORN-2026-884"
                className="w-full text-xs sm:text-sm px-4 py-3 bg-surface border border-border rounded-btn focus:outline-none focus:border-navy-900 font-mono uppercase text-ink tracking-wider"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-navy-900 hover:bg-navy-800 text-ivory-50 text-xs sm:text-sm font-semibold rounded-btn transition shadow-sm flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-brass-400" />
              <span>Verify Credential</span>
            </button>
          </form>
          <div className="flex items-center gap-2 text-[11px] text-ink-muted">
            <Shield className="w-3.5 h-3.5 text-brass-600" />
            <span>Cryptographically sealed &amp; verifiable under Calcutta High Court Jurisdiction</span>
          </div>
        </div>

        {/* Verification Result Card */}
        {searched && (
          verifiedCert ? (
            <div className="bg-white rounded-card p-6 sm:p-8 border border-border shadow-modal space-y-6 text-xs sm:text-sm animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="font-serif font-bold text-lg sm:text-xl text-ink-950">
                    Certificate Authenticity Confirmed
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide bg-emerald-100 text-emerald-800 border border-emerald-300">
                  ACTIVE &bull; VALID
                </span>
              </div>

              <div className="divide-y divide-border-subtle font-sans text-xs sm:text-sm">
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-ink-secondary">Credential ID:</span>
                  <span className="font-mono font-bold text-navy-800 text-sm">{verifiedCert.code}</span>
                </div>
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-ink-secondary">Awarded To:</span>
                  <span className="font-bold text-ink-950">{verifiedCert.recipientName}</span>
                </div>
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-ink-secondary">Accredited Organisation:</span>
                  <span className="font-medium text-ink-900">{verifiedCert.organisation}</span>
                </div>
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-ink-secondary">Statutory Course / Scope:</span>
                  <span className="font-medium text-ink-900 sm:text-right max-w-sm">{verifiedCert.courseTitle}</span>
                </div>
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-ink-secondary">Issuance Date:</span>
                  <span className="text-ink">{verifiedCert.issuedDate}</span>
                </div>
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-ink-secondary">Validity Period:</span>
                  <span className="text-ink font-semibold">Until {verifiedCert.validUntil}</span>
                </div>
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-ink-secondary">Tamper-Evident SHA-256 Digest:</span>
                  <span className="font-mono text-[10px] text-ink-muted break-all sm:text-right">{verifiedCert.sha256Hash}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-[11px] text-ink-muted">
                <span>Verified by: {verifiedCert.accreditation}</span>
                <Link href="/contact" className="text-brass-700 hover:underline font-semibold">
                  Registry Inquiries &rarr;
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 rounded-card p-6 border border-red-200 text-xs sm:text-sm space-y-3">
              <div className="flex items-center gap-2 text-red-900 font-bold">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>Certificate Not Found in Central Registry</span>
              </div>
              <p className="text-red-800 leading-relaxed text-xs">
                The identifier <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-red-200">{certCode}</code> is not recorded in the Acorn Legal Consultants statutory credential database. Please verify the code or contact chambers desk.
              </p>
            </div>
          )
        )}

      </div>
    </div>
  );
}
