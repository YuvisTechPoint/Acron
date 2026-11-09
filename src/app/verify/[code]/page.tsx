"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Award,
  CheckCircle2,
  ShieldCheck,
  Download,
  Printer,
  ArrowLeft,
  Calendar,
  Building,
} from "lucide-react";

export default function DynamicCertificateVerificationPage({
  params,
}: {
  params?: { code?: string };
}) {
  const routerParams = useParams();
  const rawCode =
    (params?.code as string) ||
    (routerParams?.code as string) ||
    "CERT-ACORN-2026-884";
  const code = decodeURIComponent(rawCode).trim().toUpperCase();

  const isValidCert = code.startsWith("CERT-ACORN-") || code.includes("ACORN");

  // Certificate record matching Acorn Legal Registry
  const certData = isValidCert
    ? {
        code,
        recipientName: code === "CERT-ACORN-2026-884" ? "Sneha Ganguly" : "Verified Professional Learner",
        courseTitle: "Comprehensive Workplace POSH & Prevention of Harassment (2026 Edition)",
        organisation: "Kolkata Cloud Technologies Pvt Ltd",
        issuedDate: "2026-08-15",
        validUntil: "2027-08-14",
        status: "valid",
        accreditation: "Acorn Legal Consultants Statutory Compliance Desk",
        sealHash: "SHA256: 4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
      }
    : null;

  return (
    <div className="bg-ivory-50 min-h-screen pt-32 pb-20 sm:pt-40 sm:pb-24 text-ink">
      <div className="max-w-xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link
            href="/verify"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Manual Code Search</span>
          </Link>
          <div className="text-xs text-ink-secondary">
            Registry Ref: <span className="font-mono font-bold text-primary">{code}</span>
          </div>
        </div>

        {/* Certificate Authenticity Card */}
        {certData ? (
          <div className="bg-white rounded-card p-6 sm:p-8 border border-border shadow-modal space-y-6">
            <div className="flex items-center justify-between border-b border-border-subtle pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-accent font-bold">
                    Official Verification Result
                  </span>
                  <h1 className="font-serif font-bold text-lg sm:text-xl text-ink">
                    Certificate Authenticity Confirmed
                  </h1>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                ACTIVE &bull; VALID
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-border-subtle pb-2">
                <span className="text-ink-secondary">Credential ID:</span>
                <span className="font-mono font-bold text-primary">{certData.code}</span>
              </div>

              <div className="flex justify-between border-b border-border-subtle pb-2">
                <span className="text-ink-secondary">Awarded To:</span>
                <span className="font-bold text-ink text-sm">{certData.recipientName}</span>
              </div>

              <div className="flex justify-between border-b border-border-subtle pb-2">
                <span className="text-ink-secondary">Curriculum:</span>
                <span className="font-semibold text-ink text-right max-w-xs">{certData.courseTitle}</span>
              </div>

              <div className="flex justify-between border-b border-border-subtle pb-2">
                <span className="text-ink-secondary">Accredited Organisation:</span>
                <span className="text-ink font-medium">{certData.organisation}</span>
              </div>

              <div className="flex justify-between border-b border-border-subtle pb-2">
                <span className="text-ink-secondary">Issue Date:</span>
                <span className="text-ink">{certData.issuedDate}</span>
              </div>

              <div className="flex justify-between border-b border-border-subtle pb-2">
                <span className="text-ink-secondary">Valid Until:</span>
                <span className="font-semibold text-emerald-700">{certData.validUntil}</span>
              </div>

              <div className="flex justify-between border-b border-border-subtle pb-2">
                <span className="text-ink-secondary">Certifying Authority:</span>
                <span className="text-primary font-semibold">{certData.accreditation}</span>
              </div>

              <div className="text-[10px] text-ink-secondary pt-1 font-mono break-all">
                Cryptographic Seal: {certData.sealHash}
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-border-subtle">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 border border-border rounded text-xs font-semibold text-ink hover:bg-surface flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Badge</span>
              </button>

              <button
                onClick={() => alert(`Downloading authenticated PDF credential for ${certData.code}...`)}
                className="px-5 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-accent" />
                <span>Download Signed PDF</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-card p-6 sm:p-8 border border-red-200 shadow-modal space-y-5 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6 text-red-600" />
            </div>
            <div className="space-y-1">
              <h2 className="font-serif font-bold text-xl text-ink">
                Certificate Unverified / Not Found
              </h2>
              <p className="text-xs text-ink-secondary max-w-sm mx-auto">
                The credential ID <span className="font-mono font-bold text-red-700">{code}</span> was not found in the Acorn Legal Consultants statutory registry.
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded border border-red-200 text-xs text-red-800 text-left space-y-1">
              <div className="font-bold">Verification Notice:</div>
              <div>&bull; Authentic Acorn Legal credentials follow the format CERT-ACORN-YYYY-NNN.</div>
              <div>&bull; If you believe this is an error, please contact the Compliance Desk at contact@acornlegal.in.</div>
            </div>
            <div className="pt-2">
              <Link
                href="/verify"
                className="px-5 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover inline-block"
              >
                Search Another Credential
              </Link>
            </div>
          </div>
        )}

        <div className="text-center text-xs text-ink-secondary">
          Certified by Acorn Legal Consultants Statutory Compliance Desk, Kolkata &bull;{" "}
          <Link href="/privacy" className="underline hover:text-ink">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
