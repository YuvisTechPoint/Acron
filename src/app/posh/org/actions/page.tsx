"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Building,
  Lock,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export default function PoshOrgActionsPage() {
  const [selectedOrgId, setSelectedOrgId] = useState("org-1");
  const orgs = platformStore.getOrganizations();
  const activeOrg = orgs.find((o) => o.id === selectedOrgId) || orgs[0];

  const tasks = [
    {
      id: "ACT-001",
      caseId: "POSH-TECHKOL-2026-0014",
      actionType: "Withholding of Promotion & Performance Bonus",
      recommendationDate: "2026-10-10",
      deadline60Days: "2026-12-09",
      status: "Implemented",
      implementedAt: "2026-10-22",
      complianceProof: "Board HR Sanction Order #2026/088",
    },
    {
      id: "ACT-002",
      caseId: "POSH-TECHKOL-2026-0019",
      actionType: "Salary Deduction for Section 15 Compensation & Permanent Floor Segregation",
      recommendationDate: "2026-10-28",
      deadline60Days: "2026-12-27",
      status: "Pending Action",
      implementedAt: null,
      complianceProof: null,
    },
  ];

  return (
    <div className="bg-ivory-50 min-h-screen py-10 text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link
            href="/posh/org"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to Organisation Console ({activeOrg.name})</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/posh/org/reports" className="text-primary font-semibold hover:underline">
              Annual Reports (O-07) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                <FileText className="w-4 h-4 text-primary" />
                <span>PRD Screen O-06 &bull; Section 13(4) Employer Action Mandate</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
                Employer Action Tasks &amp; 60-Day Implementation Tracker
              </h1>
              <p className="text-xs text-ink-secondary mt-1">
                Employer: <span className="font-semibold text-ink">{activeOrg.name}</span> &bull; Content-free task queue tracking employer implementation of IC recommendations.
              </p>
            </div>

            <select
              value={selectedOrgId}
              onChange={(e) => setSelectedOrgId(e.target.value)}
              className="px-3 py-2 bg-white border border-border rounded text-xs font-semibold text-ink shrink-0"
            >
              {orgs.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Statutory 60-Day Mandate Banner */}
        <div className="p-5 bg-white rounded-card border border-border shadow-card text-xs space-y-2">
          <div className="flex items-center gap-2 font-serif font-bold text-primary text-sm">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>Statutory Timeline: Section 13(4) of POSH Act 2013</span>
          </div>
          <p className="text-ink-secondary leading-relaxed">
            &quot;The employer or the District Officer shall act upon the recommendation within sixty days of its receipt by him.&quot; The system displays case IDs and generic action categories only to preserve Section 16 confidentiality.
          </p>
        </div>

        {/* Tasks Ledger */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <div className="flex justify-between items-center border-b border-border-subtle pb-3">
            <h2 className="font-serif font-bold text-base text-ink">
              Implementation Action Queue
            </h2>
            <span className="text-xs text-ink-secondary">60-Day Clock Monitored</span>
          </div>

          <div className="space-y-4">
            {tasks.map((t) => (
              <div key={t.id} className="bg-white p-5 rounded border border-border space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 border-b border-border-subtle pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-primary">{t.caseId}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface border border-border">
                        Ref: {t.id}
                      </span>
                    </div>
                    <div className="font-serif font-bold text-base text-ink mt-1">
                      {t.actionType}
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    t.status === "Implemented" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {t.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-ink-secondary">
                  <div>Received: <span className="font-semibold text-ink">{t.recommendationDate}</span></div>
                  <div>
                    60-Day Deadline:{" "}
                    <span className="font-semibold text-primary">{t.deadline60Days}</span>
                  </div>
                  <div>
                    Proof Document:{" "}
                    <span className="font-semibold text-ink">{t.complianceProof || "Pending Submission"}</span>
                  </div>
                </div>

                {t.status === "Pending Action" ? (
                  <div className="pt-2 flex justify-between items-center border-t border-border-subtle">
                    <span className="text-amber-800 font-semibold text-[11px] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Action Due within Statutory Window</span>
                    </span>
                    <button
                      onClick={() => alert(`Marking task ${t.id} implemented and uploading compliance memo...`)}
                      className="px-4 py-1.5 bg-primary text-white font-semibold rounded hover:bg-primary-hover"
                    >
                      Record Implementation Memo
                    </button>
                  </div>
                ) : (
                  <div className="pt-2 text-emerald-700 font-semibold text-[11px] flex items-center gap-1 border-t border-border-subtle">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Statutory Implementation Completed &amp; Audited on {t.implementedAt}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
