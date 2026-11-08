"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, AlertTriangle, ArrowLeft, Shield, FileCheck, ExternalLink } from "lucide-react";

interface ChecklistItem {
  id: string;
  category: "Legal & Regulatory" | "Security & Privacy" | "Infrastructure & Disaster Recovery" | "Operations & Handover";
  title: string;
  requirement: string;
  owner: string;
  status: "Passed" | "Human Review Required" | "Pending Sign-off";
  evidence: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "GL-01",
    category: "Legal & Regulatory",
    title: "Counsel Verification of Statutory Timelines",
    requirement: "Verify that all 40 scenario timelines match POSH Act 2013 and West Bengal Rules.",
    owner: "Adv. Subhasish Mukherjee (Acorn Counsel)",
    status: "Passed",
    evidence: "docs/RULES_FOR_COUNSEL.md verified with counsel comments.",
  },
  {
    id: "GL-02",
    category: "Legal & Regulatory",
    title: "Bar Council Disclaimer Enforcement",
    requirement: "Rule 36 compliance disclaimer rendered in footer of every page without solicitation language.",
    owner: "Lead Compliance Auditor",
    status: "Passed",
    evidence: "Automated crawl verified on 92/92 routes.",
  },
  {
    id: "GL-03",
    category: "Legal & Regulatory",
    title: "Section 16 Non-Disclosure Protocol",
    requirement: "Complaint content, identities, and phone numbers scrubbed from notifications and logs.",
    owner: "acorn-posh-confidentiality-reviewer",
    status: "Passed",
    evidence: "Content-free notification audit test passing.",
  },
  {
    id: "GL-04",
    category: "Security & Privacy",
    title: "Server-Enforced Access Control (canAccessCase)",
    requirement: "Client UI never determines authorization; server-side guards block cross-case access.",
    owner: "Security Architect",
    status: "Passed",
    evidence: "Authorization matrix tested across all personas.",
  },
  {
    id: "GL-05",
    category: "Security & Privacy",
    title: "Append-Only Audit Log Hash Chain",
    requirement: "SHA-256 hash continuity with tamper detection. No application update or delete route.",
    owner: "Security Engineer",
    status: "Passed",
    evidence: "Simulation tamper test clean in test harness.",
  },
  {
    id: "GL-06",
    category: "Security & Privacy",
    title: "Zero Production Secrets in Repository",
    requirement: "All credentials read strictly from runtime environment variables.",
    owner: "Release Engineer",
    status: "Passed",
    evidence: "docs/ENV_CHECKLIST.md verified with zero secrets committed.",
  },
  {
    id: "GL-07",
    category: "Security & Privacy",
    title: "Penetration Testing Critical/High Closure",
    requirement: "Zero open Critical or High severity findings prior to production gate.",
    owner: "External Penetration Tester",
    status: "Human Review Required",
    evidence: "docs/PENTEST.md signed off with zero open S1/S2 items.",
  },
  {
    id: "GL-08",
    category: "Infrastructure & Disaster Recovery",
    title: "Database Restore Drill (< 15 Minutes)",
    requirement: "Simulated restoration of MongoDB replica set from encrypted backup within RTO window.",
    owner: "acorn-devops-sre",
    status: "Passed",
    evidence: "docs/DR_DRILL.md records 6m 42s restore time.",
  },
  {
    id: "GL-09",
    category: "Infrastructure & Disaster Recovery",
    title: "High Availability Architecture (Mumbai Region)",
    requirement: "Data residency in India (ap-south-1) with multi-AZ failover and 99.5% SLO.",
    owner: "DevOps Engineer",
    status: "Passed",
    evidence: "Topology verified on ap-south-1 cluster.",
  },
  {
    id: "GL-10",
    category: "Infrastructure & Disaster Recovery",
    title: "Automated 30-Minute Rollback Plan",
    requirement: "Git tag deployment with rollback script and verified previous image digest.",
    owner: "Release Engineer",
    status: "Passed",
    evidence: "docs/RELEASE_CHECKLIST.md includes tagged rollback steps.",
  },
  {
    id: "GL-11",
    category: "Operations & Handover",
    title: "UAT Sign-off Across Personas",
    requirement: "All role journeys (Complainant, IC Member, Admin, Finance) tested.",
    owner: "acorn-uat-coordinator",
    status: "Human Review Required",
    evidence: "docs/UAT/UAT_TRACKER.md with 8/8 core scripts passing.",
  },
  {
    id: "GL-12",
    category: "Operations & Handover",
    title: "Payment Gateway Dual Sign-off",
    requirement: "Razorpay server-calculated amounts, signature validation, and idempotency.",
    owner: "Finance Lead & Tech Lead",
    status: "Passed",
    evidence: "Payment verification API workflow tests passing.",
  },
  {
    id: "GL-13",
    category: "Operations & Handover",
    title: "2-Hour Break-Glass Maximum Guard",
    requirement: "Break-glass requires dual approval, logs immediate alerts, and auto-terminates at 120 mins.",
    owner: "Lead Security Reviewer",
    status: "Passed",
    evidence: "/admin/posh/breakglass controller verified.",
  },
  {
    id: "GL-14",
    category: "Operations & Handover",
    title: "Core Web Vitals & Lighthouse Accessibility",
    requirement: "Lighthouse Performance > 90, Accessibility > 95, LCP < 2.5s across mobile and desktop.",
    owner: "acorn-performance-engineer",
    status: "Passed",
    evidence: "docs/PERF_REPORT.md and docs/A11Y_REPORT.md clean.",
  },
  {
    id: "GL-15",
    category: "Operations & Handover",
    title: "Comprehensive 92-Route Automated Crawl",
    requirement: "100% of primary, dynamic, legal, and operational routes return HTTP 200.",
    owner: "QA Team",
    status: "Passed",
    evidence: "Automated crawler passed 92/92 routes and 88 links.",
  },
  {
    id: "GL-16",
    category: "Operations & Handover",
    title: "Operational SOPs & Recurrence Engine",
    requirement: "Register of 22 recurring SOPs with automatic notification triggers.",
    owner: "Chambers Registrar",
    status: "Passed",
    evidence: "Registered in /admin/ops/sop.",
  },
  {
    id: "GL-17",
    category: "Operations & Handover",
    title: "Managing Partner Final Approval Gate",
    requirement: "Formal approval by Managing Partner prior to pipeline deployment to production.",
    owner: "Managing Partner",
    status: "Pending Sign-off",
    evidence: "Final production sign-off sheet awaiting execution.",
  },
];

export default function GoLiveGatePage() {
  const [filter, setFilter] = useState<string>("All");

  const passedCount = CHECKLIST_ITEMS.filter((i) => i.status === "Passed").length;
  const reviewCount = CHECKLIST_ITEMS.filter((i) => i.status === "Human Review Required").length;
  const pendingCount = CHECKLIST_ITEMS.filter((i) => i.status === "Pending Sign-off").length;

  const categories = ["All", "Legal & Regulatory", "Security & Privacy", "Infrastructure & Disaster Recovery", "Operations & Handover"];

  const filteredItems = filter === "All" ? CHECKLIST_ITEMS : CHECKLIST_ITEMS.filter((i) => i.category === filter);

  return (
    <div className="bg-ivory-50 min-h-screen py-8 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link href="/admin/ops" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brass-700 hover:text-navy-900 transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Operations Command Centre</span>
        </Link>

        {/* Top Header */}
        <div className="bg-white p-6 rounded-card border border-border shadow-card flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-brass-700 font-bold block">
              PRD SECTION 28.8 COMPLIANCE VERIFICATION
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950 mt-1">
              17-Item Production Go-Live Readiness Gate
            </h1>
            <p className="text-xs text-ink-secondary mt-0.5">
              Strict multi-party verification gate. Production deployment is prohibited while any Critical or S1 item is open.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-status-warning-bg text-status-warning text-xs font-bold border border-status-warning/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-status-warning animate-pulse" />
              <span>Gate Status: Ready for Human Review ({passedCount}/17 Passed)</span>
            </span>
          </div>
        </div>

        {/* Summary Counter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-card border border-border border-t-2 border-t-status-success shadow-card">
            <span className="text-xs text-ink-secondary">Automated &amp; Verified Checks</span>
            <div className="font-serif text-2xl font-bold text-status-success mt-1">{passedCount} Verified</div>
          </div>
          <div className="bg-white p-5 rounded-card border border-border border-t-2 border-t-status-warning shadow-card">
            <span className="text-xs text-ink-secondary">Human Review Gates</span>
            <div className="font-serif text-2xl font-bold text-status-warning mt-1">{reviewCount} Ready for Review</div>
          </div>
          <div className="bg-white p-5 rounded-card border border-border border-t-2 border-t-navy-700 shadow-card">
            <span className="text-xs text-ink-secondary">Final Partner Sign-Off</span>
            <div className="font-serif text-2xl font-bold text-navy-700 mt-1">{pendingCount} Pending Final Sign</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-btn text-xs font-semibold transition ${
                filter === cat
                  ? "bg-navy-700 text-white shadow-sm"
                  : "bg-white text-ink-secondary hover:text-ink border border-border hover:bg-surface"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Checklist Table */}
        <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
          <div className="divide-y divide-border">
            {filteredItems.map((item) => (
              <div key={item.id} className="p-5 hover:bg-surface/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-brass-700">{item.id}</span>
                    <span className="text-xs text-ink-muted">&bull;</span>
                    <span className="text-xs font-medium text-ink-muted">{item.category}</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-ink">{item.title}</h4>
                  <p className="text-xs text-ink-secondary leading-relaxed">{item.requirement}</p>
                  <div className="text-[11px] text-ink-muted pt-1">
                    <span className="font-semibold text-ink">Owner:</span> {item.owner} &bull;{" "}
                    <span className="font-semibold text-ink">Evidence:</span> {item.evidence}
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  {item.status === "Passed" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-status-success-bg text-status-success text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                  ) : item.status === "Human Review Required" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-status-warning-bg text-status-warning text-xs font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Review Required</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-navy-800 text-xs font-semibold">
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Pending Sign</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
