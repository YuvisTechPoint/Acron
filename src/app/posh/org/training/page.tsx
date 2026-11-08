"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Users,
  Download,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { platformStore } from "@/lib/store";

export default function PoshOrgTrainingPage() {
  const [selectedOrgId, setSelectedOrgId] = useState("org-1");
  const orgs = platformStore.getOrganizations();
  const activeOrg = orgs.find((o) => o.id === selectedOrgId) || orgs[0];

  const courses = [
    {
      code: "LMS-EMP-2026",
      title: "Statutory Employee POSH Sensitisation & Workplace Rights (2026)",
      target: "All Regular & Contractual Employees",
      completionRate: 94,
      totalAssigned: 420,
      completedCount: 395,
      status: "Active & Mandatory",
    },
    {
      code: "LMS-IC-2026",
      title: "Internal Committee (IC) Capacity Building & Natural Justice Mastery",
      target: "Presiding Officer & IC Members",
      completionRate: 100,
      totalAssigned: 5,
      completedCount: 5,
      status: "Completed & Certified",
    },
    {
      code: "LMS-MGR-2026",
      title: "Managerial Anti-Retaliation & Incident Escalation Protocol",
      target: "People Managers & Team Leads",
      completionRate: 88,
      totalAssigned: 60,
      completedCount: 53,
      status: "In Progress",
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
            <Link href="/posh/org/actions" className="text-primary font-semibold hover:underline">
              Employer Actions (O-06) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                <Award className="w-4 h-4 text-primary" />
                <span>PRD Screen O-05 &bull; Section 19(c) Employee Sensitisation LMS</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
                LMS Training Dashboard &amp; Statutory Sensitisation Ledger
              </h1>
              <p className="text-xs text-ink-secondary mt-1">
                Employer: <span className="font-semibold text-ink">{activeOrg.name}</span> &bull; Mandatory employee compliance training and IC member competence certification.
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

        {/* Overall Completion Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">Overall Workforce Trained</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif font-bold text-3xl text-emerald-700">93.8%</span>
              <span className="text-xs text-emerald-600 font-semibold">&uarr; Compliant</span>
            </div>
            <p className="text-[11px] text-ink-secondary mt-1">
              395 of 420 active employees certified.
            </p>
          </div>

          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">IC Committee Master Training</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif font-bold text-3xl text-primary">100%</span>
              <span className="text-xs text-primary font-semibold">Certified</span>
            </div>
            <p className="text-[11px] text-ink-secondary mt-1">
              All 5 IC members certified by Acorn Legal.
            </p>
          </div>

          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">Annual Recertification Window</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif font-bold text-3xl text-ink">31 Dec</span>
              <span className="text-xs text-ink-secondary font-medium">2026 Cycle</span>
            </div>
            <p className="text-[11px] text-ink-secondary mt-1">
              Automatic re-enrolment 30 days before expiration.
            </p>
          </div>
        </div>

        {/* Assigned Courses List */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <div className="flex justify-between items-center border-b border-border-subtle pb-3">
            <h2 className="font-serif font-bold text-base text-ink">
              Mandatory Curriculum &amp; Training Tracks
            </h2>
            <Link
              href="/lp/posh-training"
              className="text-xs text-primary font-semibold hover:underline"
            >
              Browse Enterprise Modules &rarr;
            </Link>
          </div>

          <div className="space-y-4">
            {courses.map((c) => (
              <div key={c.code} className="bg-white p-5 rounded border border-border space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-primary">{c.code}</span>
                    <h3 className="font-serif font-bold text-base text-ink mt-0.5">{c.title}</h3>
                    <div className="text-ink-secondary mt-0.5">Audience: {c.target}</div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                    c.completionRate >= 90 ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {c.status}
                  </span>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-ink-secondary">Progress:</span>
                    <span className="font-bold text-ink">
                      {c.completedCount} / {c.totalAssigned} ({c.completionRate}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-surface rounded-full overflow-hidden border border-border-subtle">
                    <div
                      className={`h-full ${c.completionRate >= 90 ? "bg-emerald-600" : "bg-amber-600"}`}
                      style={{ width: `${c.completionRate}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center border-t border-border-subtle">
                  <span className="text-[11px] text-ink-secondary">
                    Standard Assessment Passmark: 80% &bull; Interactive Scenarios Included
                  </span>
                  <button
                    onClick={() => alert(`Exporting audit completion ledger for ${c.code}...`)}
                    className="px-3 py-1.5 border border-border rounded hover:bg-surface text-ink flex items-center gap-1.5 font-medium"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Completion Ledger</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
