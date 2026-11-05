"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Award, CheckCircle2, ShieldCheck, Search, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function CertificateVerificationPage() {
  const [certCode, setCertCode] = useState("CERT-ACORN-2026-884");
  const [verifiedCert, setVerifiedCert] = useState<any | null>({
    code: "CERT-ACORN-2026-884",
    recipientName: "Sneha Ganguly",
    courseTitle: "Comprehensive Workplace POSH & Prevention of Harassment (2026 Edition)",
    organisation: "Kolkata Cloud Technologies Pvt Ltd",
    issuedDate: "2026-08-15",
    validUntil: "2027-08-14",
    status: "valid",
    accreditation: "Acorn Legal Consultants Compliance Academy",
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (certCode.trim().toUpperCase().includes("ACORN")) {
      setVerifiedCert({
        code: certCode.trim().toUpperCase(),
        recipientName: "Verified Professional Learner",
        courseTitle: "Statutory POSH Employee Awareness & IC Capacity Certification",
        organisation: "Accredited Corporate Client",
        issuedDate: "2026-09-01",
        validUntil: "2027-08-31",
        status: "valid",
        accreditation: "Acorn Legal Consultants Statutory Compliance Desk",
      });
    } else {
      setVerifiedCert(null);
      alert("Certificate code not found in Acorn Central Registry.");
    }
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="border-b border-border pb-4 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-primary text-accent-gold flex items-center justify-center mx-auto shadow">
            <Award className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            Statutory Certificate Verification
          </h1>
          <p className="text-xs text-ink-secondary max-w-sm mx-auto">
            Public verification portal for POSH Training &amp; Internal Committee Competency credentials issued by Acorn Legal Consultants.
          </p>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="bg-surface p-4 rounded-card border border-border flex gap-3">
          <input
            type="text"
            required
            value={certCode}
            onChange={(e) => setCertCode(e.target.value)}
            placeholder="Enter Certificate Code (e.g. CERT-ACORN-2026-884)"
            className="flex-1 text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary font-mono uppercase"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded transition-colors"
          >
            Verify
          </button>
        </form>

        {/* Verification Result Card */}
        {verifiedCert && (
          <div className="bg-surface rounded-card p-6 border border-border shadow-modal space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="font-serif font-bold text-base text-ink">
                  Certificate Authenticity Confirmed
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                ACTIVE
              </span>
            </div>

            <div className="space-y-2 text-ink">
              <div className="flex justify-between">
                <span className="text-ink-secondary">Credential ID:</span>
                <span className="font-mono font-bold text-primary">{verifiedCert.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary">Awarded To:</span>
                <span className="font-semibold">{verifiedCert.recipientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary">Organisation:</span>
                <span>{verifiedCert.organisation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary">Course:</span>
                <span className="font-medium text-right max-w-xs">{verifiedCert.courseTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary">Issued On:</span>
                <span>{formatDate(verifiedCert.issuedDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary">Valid Until:</span>
                <span>{formatDate(verifiedCert.validUntil)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border-subtle text-[11px] text-ink-secondary text-center">
              Verified by: <strong>{verifiedCert.accreditation}</strong> &bull; Kolkata
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

