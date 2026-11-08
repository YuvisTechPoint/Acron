"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  BarChart3,
  Users,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Building,
  Lock,
} from "lucide-react";
import { platformStore } from "@/lib/store";

export default function PoshOrgPreventionPage() {
  const [selectedOrgId, setSelectedOrgId] = useState("org-1");
  const orgs = platformStore.getOrganizations();
  const activeOrg = orgs.find((o) => o.id === selectedOrgId) || orgs[0];

  const riskFactors = [
    {
      area: "Hybrid & Remote Messaging Channels",
      level: "Medium Risk",
      finding: "After-hours messaging on personal WhatsApp accounts reported by 18% of junior female staff.",
      action: "Mandate official Slack/Teams channels and issue night-time communication blackout directive.",
    },
    {
      area: "Official Off-Site Client Dinners & Travel",
      level: "Low Risk",
      finding: "Clear travel policy with verified single-room corporate accommodation and dedicated transport.",
      action: "Maintain quarterly vendor cab safety inspections.",
    },
    {
      area: "Late Evening Shift Operations (Sector V DC)",
      level: "Controlled Risk",
      finding: "Security guard accompaniment and GPS tracking enabled on all night transport drops.",
      action: "Periodic safety audits conducted by Acorn Legal external advisor.",
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
            <Link href="/posh/org/plan" className="text-primary font-semibold hover:underline">
              Retainer Subscription (O-09) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                <ShieldAlert className="w-4 h-4 text-primary" />
                <span>PRD Screen O-08 &bull; Section 19 Prevention &amp; Safety Risk Audits</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
                Workplace Climate Surveys &amp; Harassment Prevention Analytics
              </h1>
              <p className="text-xs text-ink-secondary mt-1">
                Employer: <span className="font-semibold text-ink">{activeOrg.name}</span> &bull; k-Anonymity privacy protected (minimum 5 respondents per cohort).
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

        {/* k-Anonymity Privacy Guarantee Banner */}
        <div className="p-4 bg-white rounded-card border border-border shadow-card text-xs flex items-start gap-3">
          <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-serif font-bold text-ink">
              Cryptographic k-Anonymity &amp; Zero-Knowledge Safeguards (PRD Section 8.24)
            </div>
            <p className="text-ink-secondary leading-relaxed">
              Survey responses are completely dissociated from employee identity. Aggregate scores are rendered only if a department or cohort contains 5 or more respondents, preventing any retaliatory de-anonymization.
            </p>
          </div>
        </div>

        {/* Climate Survey Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">Psychological Safety Index</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif font-bold text-3xl text-emerald-700">88%</span>
              <span className="text-xs text-emerald-600 font-semibold">&uarr; +4% YoY</span>
            </div>
            <p className="text-[11px] text-ink-secondary mt-1">
              Employees feel confident reporting grievances without reprisal.
            </p>
          </div>

          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">IC Awareness Index</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif font-bold text-3xl text-primary">96%</span>
              <span className="text-xs text-primary font-semibold">High Visibility</span>
            </div>
            <p className="text-[11px] text-ink-secondary mt-1">
              Workforce knows IC members and contact email coordinates.
            </p>
          </div>

          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">Survey Participation Rate</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif font-bold text-3xl text-ink">82%</span>
              <span className="text-xs text-ink-secondary font-medium">344 Responses</span>
            </div>
            <p className="text-[11px] text-ink-secondary mt-1">
              Statistically valid sample size across all 4 departments.
            </p>
          </div>
        </div>

        {/* Harassment Risk Zones & Preventive Action Plans */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <div className="flex justify-between items-center border-b border-border-subtle pb-3">
            <h2 className="font-serif font-bold text-base text-ink">
              Workplace Risk Factor Matrix &amp; Remedial Roadmap
            </h2>
            <button
              onClick={() => alert("Initiating new biannual anonymous climate survey campaign...")}
              className="px-3.5 py-1.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover"
            >
              Launch Climate Survey
            </button>
          </div>

          <div className="space-y-3">
            {riskFactors.map((r, i) => (
              <div key={i} className="bg-white p-4 rounded border border-border space-y-2 text-xs">
                <div className="flex justify-between items-center border-b border-border-subtle pb-2">
                  <span className="font-serif font-bold text-ink text-sm">{r.area}</span>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                    r.level === "Low Risk" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"
                  }`}>
                    {r.level}
                  </span>
                </div>
                <div className="text-ink-secondary leading-relaxed">
                  <strong>Assessment Finding:</strong> {r.finding}
                </div>
                <div className="text-primary font-medium leading-relaxed">
                  <strong>Recommended Preventive Measure:</strong> {r.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
