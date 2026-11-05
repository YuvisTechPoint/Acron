"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Users,
  PenTool
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface DeclarationItem {
  id: string;
  type: "ANNUAL_SEC16_UNDERTAKING" | "CASE_SPECIFIC_NO_CONFLICT";
  title: string;
  caseRef?: string;
  signedBy: string;
  role: string;
  signedAt?: string;
  status: "SIGNED" | "PENDING_SIGNATURE";
}

const INITIAL_DECLARATIONS: DeclarationItem[] = [
  {
    id: "DEC-2026-001",
    type: "ANNUAL_SEC16_UNDERTAKING",
    title: "Annual Statutory Section 16 Non-Disclosure Undertaking (2026)",
    signedBy: "Adv. Debjani Sen (External Member)",
    role: "Acorn Legal Consultants",
    signedAt: "2026-01-05T10:00:00Z",
    status: "SIGNED"
  },
  {
    id: "DEC-2026-002",
    type: "CASE_SPECIFIC_NO_CONFLICT",
    title: "Independence & No-Conflict Declaration - POSH-TECHKOL-2026-0014",
    caseRef: "POSH-TECHKOL-2026-0014",
    signedBy: "Adv. Debjani Sen (External Member)",
    role: "Acorn Legal Consultants",
    signedAt: "2026-10-12T11:30:00Z",
    status: "SIGNED"
  },
  {
    id: "DEC-2026-003",
    type: "CASE_SPECIFIC_NO_CONFLICT",
    title: "Independence & No-Conflict Declaration - POSH-BENGALIND-2026-0008",
    caseRef: "POSH-BENGALIND-2026-0008",
    signedBy: "Adv. Debjani Sen (External Member)",
    role: "Acorn Legal Consultants",
    status: "PENDING_SIGNATURE"
  }
];

export default function PoshIcDeclarationsPage() {
  const [declarations, setDeclarations] = useState<DeclarationItem[]>(INITIAL_DECLARATIONS);
  const [signingModal, setSigningModal] = useState<DeclarationItem | null>(null);
  const [confirmedCheck, setConfirmedCheck] = useState(false);

  const handleSign = () => {
    if (!confirmedCheck || !signingModal) return;
    setDeclarations(
      declarations.map((d) =>
        d.id === signingModal.id
          ? { ...d, status: "SIGNED", signedAt: new Date().toISOString() }
          : d
      )
    );
    setSigningModal(null);
    setConfirmedCheck(false);
  };

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/posh/ic"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Internal Committee Roster</span>
          </Link>
          <span className="text-[11px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
            PRD Screen Ref: I-11
          </span>
        </div>

        {/* Header */}
        <div className="bg-white p-6 rounded-card border border-border shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
            <Lock className="w-4 h-4 text-primary" />
            <span>Statutory Undertakings &bull; Sections 16 &amp; 17</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink mt-1">
            Section 16 Confidentiality &amp; No-Conflict Undertakings
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Mandatory statutory execution: Every member of the Internal Committee must affirm annual non-disclosure obligations and execute a formal conflict-of-interest check prior to accessing individual case dockets.
          </p>
        </div>

        {/* Declarations List */}
        <div className="space-y-4">
          {declarations.map((dec) => (
            <div
              key={dec.id}
              className={`bg-white p-5 rounded-card border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition ${
                dec.status === 'PENDING_SIGNATURE' ? 'border-amber-300 ring-1 ring-amber-100' : 'border-border'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-primary">{dec.id}</span>
                  <span className="text-xs font-bold text-ink">{dec.title}</span>
                  {dec.status === "SIGNED" ? (
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                      EXECUTED
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300 px-2 py-0.5 rounded animate-pulse">
                      SIGNATURE REQUIRED
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-600 mt-1">
                  Designated Signatory: <strong>{dec.signedBy}</strong> ({dec.role})
                </div>

                {dec.signedAt && (
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Affirmed digitally on: {formatDate(dec.signedAt)} &bull; Cryptographic hash verified
                  </div>
                )}
              </div>

              <div className="shrink-0">
                {dec.status === "PENDING_SIGNATURE" ? (
                  <button
                    onClick={() => { setSigningModal(dec); setConfirmedCheck(false); }}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded flex items-center gap-2 shadow"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Review &amp; Sign Undertaking</span>
                  </button>
                ) : (
                  <button
                    onClick={() => alert(`Undertaking ${dec.id} is securely sealed and archived in the compliance vault.`)}
                    className="px-3 py-1.5 border border-border bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 rounded flex items-center gap-1.5"
                  >
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>View Signed Docket</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for signing */}
        {signingModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-card max-w-xl w-full p-6 shadow-2xl border border-border space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck className="w-5 h-5 text-gold" />
                <h3 className="font-serif text-lg font-bold text-ink">
                  {signingModal.title}
                </h3>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 space-y-2 max-h-60 overflow-y-auto leading-relaxed">
                <p>
                  <strong>Statutory Declaration under Sections 16 &amp; 17 of POSH Act 2013:</strong>
                </p>
                <p>
                  I, the undersigned Internal Committee member, do hereby solemnly declare, affirm and undertake:
                </p>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>I shall maintain absolute confidentiality concerning all contents of the complaint, identities and addresses of the aggrieved woman, respondent and witnesses, and all documentary and audio-visual evidence.</li>
                  <li>I shall not publish, communicate, or make known any information directly or indirectly to any media or unauthorized person.</li>
                  <li>I confirm that I have no personal, familial, commercial, or hierarchical bias or interest in the subject matter or between the parties to this proceeding.</li>
                  <li>I understand that violation is punishable with statutory penalties under Section 17.</li>
                </ol>
              </div>

              <label className="flex items-start gap-2 text-xs text-slate-800 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={confirmedCheck}
                  onChange={(e) => setConfirmedCheck(e.target.checked)}
                  className="mt-0.5 rounded text-primary border-border"
                />
                <span className="font-medium">
                  I have read, understood, and solemnly affirm the statutory undertaking above.
                </span>
              </label>

              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setSigningModal(null)}
                  className="px-4 py-2 border border-border rounded text-xs text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!confirmedCheck}
                  onClick={handleSign}
                  className={`px-5 py-2 text-xs font-bold rounded flex items-center gap-1.5 text-white ${
                    confirmedCheck ? 'bg-primary hover:bg-primary-light shadow' : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Execute Digital Signature</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

