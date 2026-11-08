"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileCheck2,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  Clock,
  Lock,
  ArrowRight,
  Fingerprint,
  FileText,
  BadgeCheck,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { SignatureRequest } from "@/lib/types";

export default function PoshSignaturesPage() {
  const [requests, setRequests] = useState<SignatureRequest[]>(platformStore.getSignatures());
  const [activeSigningId, setActiveSigningId] = useState<string | null>(null);
  const [signingMethod, setSigningMethod] = useState<"AADHAAR" | "DSC">("AADHAAR");
  const [aadhaarOtp, setAadhaarOtp] = useState("");
  const [signingCompleteNotice, setSigningCompleteNotice] = useState<string | null>(null);

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSigningId) return;

    const updated = requests.map((r) => {
      if (r.id === activeSigningId) {
        return {
          ...r,
          status: "COMPLETED" as any,
          signers: r.signers.map((s) => ({
            ...s,
            status: "SIGNED" as any,
            signedAt: new Date().toISOString(),
          })),
        };
      }
      return r;
    });

    setRequests(updated);
    setActiveSigningId(null);
    setAadhaarOtp("");
    setSigningCompleteNotice(
      "Document successfully counter-signed. Immutable SHA-256 seal inscribed to WORM storage."
    );
    setTimeout(() => setSigningCompleteNotice(null), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Header */}
      <div className="bg-[#050C17] text-white border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brass-400 mb-2">
                <span>Statutory Evidence Sealing</span>
                <span>•</span>
                <span>PRD Sections 34.5 &amp; 35</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Statutory e-Signatures &amp; Document Trust Registry
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl font-sans">
                Aadhaar eSign &amp; Class 3 DSC USB verification under the Information Technology Act, 2000. Multi-signer ordered flows with tamper-evident cryptographic locks.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded text-xs font-mono">
                IT Act 2000: COMPLIANT
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Legal Trust Notice */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-lg p-4 text-xs text-blue-900 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-blue-950 uppercase tracking-wider text-[11px]">
              Evidentiary Validity under Section 65B of the Indian Evidence Act
            </span>
            <p className="leading-relaxed">
              Inquiry Reports and Conciliation Agreements signed via licensed CCA eSign services carry equal evidentiary weight as physically inked documents in High Court proceedings. Each signature embeds a cryptographically verifiable timestamp and certificate chain.
            </p>
          </div>
        </div>

        {signingCompleteNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{signingCompleteNotice}</span>
          </div>
        )}

        {/* Documents Pending Signatures */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-lg text-slate-900">Statutory Documents Requiring Signatures</h2>
            <span className="text-xs text-slate-500">{requests.length} Document In Flight</span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {requests.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs text-brass-700 font-semibold mb-1">
                      <FileText className="w-4 h-4" />
                      <span>{r.documentCode}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{r.documentTitle}</h3>
                  </div>

                  <span
                    className={`px-3 py-1 rounded text-xs font-mono font-bold self-start ${
                      r.status === "COMPLETED"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {r.status === "COMPLETED" ? "SEALED & ARCHIVED" : "PARTIALLY COUNTERSIGNED"}
                  </span>
                </div>

                {/* Signers Progress Bar */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-700">Multi-Signer Ordered Execution Flow</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {r.signers.map((s, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded border text-xs space-y-1 ${
                          s.status === "SIGNED"
                            ? "bg-emerald-50/60 border-emerald-200 text-emerald-950"
                            : "bg-slate-50 border-slate-200 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[11px] font-mono">{s.role}</span>
                          {s.status === "SIGNED" ? (
                            <BadgeCheck className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                          )}
                        </div>
                        <div className="font-medium text-slate-900">{s.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {s.status === "SIGNED" ? `Signed: ${new Date(s.signedAt!).toLocaleDateString()}` : "Awaiting DSC/Aadhaar"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cryptographic Hash */}
                <div className="p-3 bg-slate-50 rounded border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
                  <span className="text-slate-500">SHA-256 Custody Hash:</span>
                  <span className="text-slate-800 break-all">{r.sha256Checksum}</span>
                </div>

                {/* Action Dock */}
                {r.status !== "COMPLETED" && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setActiveSigningId(r.id)}
                      className="px-4 py-2 bg-[#101F38] hover:bg-navy-900 text-brass-300 rounded text-xs font-semibold transition inline-flex items-center gap-2"
                    >
                      <Fingerprint className="w-4 h-4" />
                      <span>Countersign as Member (Rita Basu)</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modal: Interactive eSign Flow */}
        {activeSigningId && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 max-w-md w-full shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-serif font-bold text-base text-slate-900">Execute Statutory Digital Signature</h3>
                <button
                  onClick={() => setActiveSigningId(null)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-mono"
                >
                  ✕
                </button>
              </div>

              <div className="flex border border-slate-200 rounded p-1 bg-slate-50 text-xs">
                <button
                  onClick={() => setSigningMethod("AADHAAR")}
                  className={`flex-1 py-1.5 rounded font-medium transition ${
                    signingMethod === "AADHAAR" ? "bg-white shadow text-slate-900" : "text-slate-600"
                  }`}
                >
                  Aadhaar OTP eSign
                </button>
                <button
                  onClick={() => setSigningMethod("DSC")}
                  className={`flex-1 py-1.5 rounded font-medium transition ${
                    signingMethod === "DSC" ? "bg-white shadow text-slate-900" : "text-slate-600"
                  }`}
                >
                  Class 3 DSC USB Token
                </button>
              </div>

              {signingMethod === "AADHAAR" ? (
                <form onSubmit={handleSign} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Aadhaar Virtual ID / UID</label>
                    <input
                      type="text"
                      disabled
                      value="•••• •••• •••• 9842"
                      className="w-full bg-slate-100 border border-slate-200 rounded p-2 text-slate-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Enter 6-Digit UIDAI OTP</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 749201"
                      value={aadhaarOtp}
                      onChange={(e) => setAadhaarOtp(e.target.value)}
                      maxLength={6}
                      className="w-full border border-slate-300 rounded p-2 font-mono text-sm tracking-widest text-center focus:border-brass-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Demo OTP: Enter any 6 digits to verify mock ESP service.
                    </span>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveSigningId(null)}
                      className="px-3 py-1.5 text-slate-600 hover:text-slate-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#101F38] hover:bg-navy-900 text-brass-300 rounded font-semibold text-xs"
                    >
                      Verify &amp; Seal Document
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-2">
                    <div className="flex items-center gap-2 text-slate-800 font-semibold">
                      <KeyRound className="w-4 h-4 text-brass-600" />
                      <span>Detecting Hardware Token...</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Found: <strong>ePass2003 FIPS 140-2 Level 3 Cryptographic USB Token</strong>. Issued to: Adv. Rita Basu.
                    </p>
                  </div>

                  <button
                    onClick={handleSign}
                    className="w-full py-2 bg-[#101F38] hover:bg-navy-900 text-brass-300 rounded font-semibold text-xs"
                  >
                    Authorize with USB Token PIN
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
