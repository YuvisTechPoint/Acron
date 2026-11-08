"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Inbox,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Filter,
  Eye,
  Building,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export default function PoshAdminIntakeDeskPage() {
  const [activeTab, setActiveTab] = useState<"CONCERNS" | "ASSISTED" | "UNASSIGNED">("CONCERNS");

  const bystanderConcerns = [
    {
      id: "CR-TECHKOL-2026-004",
      orgName: "Kolkata Cloud Technologies Pvt Ltd",
      reporterType: "Anonymous Colleague / Bystander",
      department: "Cloud Platforms & Devops",
      approxDate: "2026-11-02",
      partiesInvolved: "Senior Lead & Junior Trainee",
      incidentSummary: "Witnessed persistent unwelcome comments regarding personal appearance during late-night standup meetings and on team communication threads.",
      triageStatus: "New / Under Review",
    },
    {
      id: "CR-BENGALIND-2026-001",
      orgName: "Bengal Precision Engineering Ltd",
      reporterType: "Operations Floor Manager",
      department: "Taratala Plant Floor",
      approxDate: "2026-10-25",
      partiesInvolved: "Contractual Quality Inspector & Vendor Supervisor",
      incidentSummary: "Inappropriate physical proximity and verbal intimidations in the testing laboratory.",
      triageStatus: "Converted to Formal Case",
    },
  ];

  const assistedSessions = [
    {
      id: "AST-2026-102",
      mode: "Confidential Chambers Session (Camac Street)",
      date: "2026-11-04",
      counsellor: "Adv. Debjani Sen",
      status: "Draft Completed & Transferred to Complainant",
      language: "Bengali (বাংলা) with English Transcript",
    },
    {
      id: "AST-2026-098",
      mode: "Secure End-to-End Encrypted Video Call",
      date: "2026-10-29",
      counsellor: "Senior POSH Consultant",
      status: "Assisted Filing Submitted",
      language: "English",
    },
  ];

  return (
    <div className="bg-ivory-50 min-h-screen py-10 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link
            href="/posh/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to POSH Admin Console</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/posh/admin/analytics" className="text-primary font-semibold hover:underline">
              Platform Analytics (X-10) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <Inbox className="w-4 h-4 text-primary" />
            <span>PRD Screen X-08 &bull; Central Intake &amp; Assisted Filing Desk</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            Central Complaint Intake, Triage &amp; Bystander Concern Desk
          </h1>
          <p className="text-xs text-ink-secondary leading-relaxed">
            Centralized clearinghouse for incoming complaint dockets, anonymous bystander workplace concern filings, and trauma-informed assisted drafting sessions.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-border text-xs">
          {[
            { id: "CONCERNS", label: "Bystander Concern Inbox" },
            { id: "ASSISTED", label: "Assisted Drafting Sessions" },
            { id: "UNASSIGNED", label: "Non-Statutory / External Routing" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === t.id
                  ? "border-primary text-primary font-bold bg-white"
                  : "border-transparent text-ink-secondary hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Bystander Concern Inbox */}
        {activeTab === "CONCERNS" && (
          <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h2 className="font-serif font-bold text-base text-ink">
                Workplace Concern &amp; Anonymous Reports
              </h2>
              <span className="text-xs text-ink-secondary">PRD Section 8.14 Concern Channel</span>
            </div>

            <div className="space-y-4">
              {bystanderConcerns.map((c) => (
                <div key={c.id} className="bg-white p-5 rounded border border-border space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 border-b border-border-subtle pb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-primary">{c.id}</span>
                        <span className="font-bold text-ink text-sm">{c.orgName}</span>
                      </div>
                      <div className="text-[11px] text-ink-secondary mt-0.5">
                        Reporter: {c.reporterType} &bull; Dept: {c.department} &bull; Incident Date: {c.approxDate}
                      </div>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      c.triageStatus.includes("Converted")
                        ? "bg-purple-100 text-purple-900"
                        : "bg-amber-100 text-amber-900"
                    }`}>
                      {c.triageStatus}
                    </span>
                  </div>

                  <p className="text-ink leading-relaxed">
                    <strong>Incident Summary:</strong> {c.incidentSummary}
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-t border-border-subtle">
                    <span className="text-[11px] text-ink-secondary">
                      Parties: <strong>{c.partiesInvolved}</strong>
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => alert(`Assigning concern ${c.id} to Presiding Officer for preliminary inquiry...`)}
                        className="px-3 py-1.5 border border-border rounded text-ink hover:bg-surface font-semibold"
                      >
                        Forward to Presiding Officer
                      </button>
                      <button
                        onClick={() => alert(`Converting concern ${c.id} into formal Section 9 statutory inquiry docket...`)}
                        className="px-4 py-1.5 bg-primary text-white font-semibold rounded hover:bg-primary-hover"
                      >
                        Convert to Case Docket
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Assisted Drafting Sessions */}
        {activeTab === "ASSISTED" && (
          <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h2 className="font-serif font-bold text-base text-ink">
                Trauma-Informed Assisted Complaint Sessions
              </h2>
              <span className="text-xs text-ink-secondary">PRD Section 8.14.1 Support Protocols</span>
            </div>

            <div className="space-y-3">
              {assistedSessions.map((s) => (
                <div key={s.id} className="bg-white p-4 rounded border border-border space-y-2 text-xs">
                  <div className="flex justify-between items-center border-b border-border-subtle pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-primary">{s.id}</span>
                      <span className="font-semibold text-ink">{s.mode}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {s.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-ink-secondary">
                    <div>Date: <span className="font-semibold text-ink">{s.date}</span></div>
                    <div>Assisted By: <span className="font-semibold text-ink">{s.counsellor}</span></div>
                    <div>Language: <span className="font-semibold text-ink">{s.language}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Non-Statutory / External Routing */}
        {activeTab === "UNASSIGNED" && (
          <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
            <h2 className="font-serif font-bold text-base text-ink border-b border-border-subtle pb-3">
              Non-Statutory &amp; External Forum Routing Protocols
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-4 rounded border border-border space-y-2">
                <div className="font-serif font-bold text-ink text-sm">
                  1. Local Committee (LC) Referrals &bull; Section 6
                </div>
                <p className="text-ink-secondary leading-relaxed">
                  Complaints where the harassment is alleged against the employer themselves, or where the enterprise has fewer than 10 employees (unorganised sector), are routed directly to the District Officer&apos;s Local Committee.
                </p>
                <button
                  onClick={() => alert("Initiating formal referral notice to District Officer / LC...")}
                  className="px-3.5 py-1.5 border border-border rounded text-ink hover:bg-surface font-semibold"
                >
                  Prepare LC Referral Pack
                </button>
              </div>

              <div className="bg-white p-4 rounded border border-border space-y-2">
                <div className="font-serif font-bold text-ink text-sm">
                  2. Criminal / Police Assistance &bull; Section 19(h)
                </div>
                <p className="text-ink-secondary leading-relaxed">
                  Where the aggrieved woman chooses to register an FIR under Bharatiya Nyaya Sanhita (BNS) / IPC, Acorn Legal Consultants provides dedicated assistance in lodging the complaint with local police authorities.
                </p>
                <button
                  onClick={() => alert("Dispatching criminal legal aid counsel support checklist...")}
                  className="px-3.5 py-1.5 border border-border rounded text-ink hover:bg-surface font-semibold"
                >
                  Generate Sec 19(h) Police Aid Checklist
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
