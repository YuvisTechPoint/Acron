"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  CheckCircle2,
  Globe,
  Upload,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Building,
} from "lucide-react";
import { platformStore } from "@/lib/store";

export default function PoshOrgPoliciesPage() {
  const [selectedOrgId, setSelectedOrgId] = useState("org-1");
  const orgs = platformStore.getOrganizations();
  const activeOrg = orgs.find((o) => o.id === selectedOrgId) || orgs[0];

  const [activeTab, setActiveTab] = useState<"ACTIVE" | "ARCHIVED" | "ACKNOWLEDGMENT">("ACTIVE");

  const policies = [
    {
      id: "POL-2026-V3",
      title: "Prevention of Sexual Harassment at Workplace (POSH) Corporate Policy",
      edition: "Edition 3.2 (2026 Statutory Harmonised Revision)",
      effectiveDate: "2026-01-01",
      status: "Active & Binding",
      languages: ["English", "Bengali (বাংলা)", "Hindi (हिन्दी)"],
      ackPct: 91,
    },
    {
      id: "POL-2024-V2",
      title: "Workplace Harassment Redressal Guidelines",
      edition: "Edition 2.0 (2024 Hybrid Workplace Protocol)",
      effectiveDate: "2024-04-01",
      status: "Superseded",
      languages: ["English"],
      ackPct: 88,
    },
  ];

  const departmentAcks = [
    { dept: "Engineering & Cloud Platforms", total: 180, signed: 172, pct: 95 },
    { dept: "Human Resources & Legal Operations", total: 45, signed: 45, pct: 100 },
    { dept: "Enterprise Sales & Client Solutions", total: 110, signed: 98, pct: 89 },
    { dept: "Field Logistics & Admin Facilities", total: 85, signed: 71, pct: 83 },
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
            <Link href="/posh/org/notices" className="text-primary font-semibold hover:underline">
              Notice Board Displays (O-04) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                <FileText className="w-4 h-4 text-primary" />
                <span>PRD Screen O-03 &bull; Section 19(a) Duty to Formulate Policy</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
                Corporate POSH Policy Library &amp; Acknowledgment Campaigns
              </h1>
              <p className="text-xs text-ink-secondary mt-1">
                Employer: <span className="font-semibold text-ink">{activeOrg.name}</span> &bull; Multilingual policy versions and annual signing telemetry.
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

        {/* Policy Navigation Tabs */}
        <div className="flex gap-2 border-b border-border text-xs">
          {[
            { id: "ACTIVE", label: "Active Statutory Policies" },
            { id: "ACKNOWLEDGMENT", label: "Employee Acknowledgment Tracking" },
            { id: "ARCHIVED", label: "Version History & Archive" },
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

        {/* Active Policies List */}
        {activeTab === "ACTIVE" && (
          <div className="space-y-4">
            {policies.filter((p) => p.status === "Active & Binding").map((p) => (
              <div key={p.id} className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3 border-b border-border-subtle pb-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-primary">{p.id}</span>
                    <h3 className="font-serif font-bold text-lg text-ink mt-0.5">{p.title}</h3>
                    <div className="text-xs text-ink-secondary mt-1">
                      {p.edition} &bull; Effective: {p.effectiveDate}
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {p.status}
                  </span>
                </div>

                <div className="text-xs text-ink-secondary leading-relaxed">
                  Drafted by Acorn Legal Consultants in full accordance with the POSH Act 2013, Supreme Court of India directives in <em>Aureliano Fernandes v. State of Goa (2023)</em>, and digital workplace protections. Includes definition of extended workplace, non-monetary conciliation, civil inquiry powers, and Section 16 non-disclosure obligations.
                </div>

                <div className="pt-2 flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-t border-border-subtle text-xs">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="font-medium text-ink">Certified Statutory Translations:</span>
                    <div className="flex gap-1.5">
                      {p.languages.map((l) => (
                        <button
                          key={l}
                          onClick={() => alert(`Downloading verified ${l} POSH Policy PDF...`)}
                          className="px-2.5 py-1 bg-white border border-border rounded text-[11px] hover:bg-surface font-semibold text-primary"
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => alert("Downloading signed Order of Constitution of IC...")}
                    className="px-4 py-2 bg-primary text-white font-semibold rounded hover:bg-primary-hover flex items-center gap-1.5 shrink-0"
                  >
                    <Download className="w-3.5 h-3.5 text-accent" />
                    <span>Download Order of Constitution</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Employee Acknowledgment Tracking */}
        {activeTab === "ACKNOWLEDGMENT" && (
          <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-6">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <div>
                <h3 className="font-serif font-bold text-base text-ink">
                  2026 Policy Acknowledgment Coverage: {activeOrg.policyAcknowledgedPct}%
                </h3>
                <p className="text-xs text-ink-secondary mt-0.5">
                  Audited under Section 19(a) &bull; Minimum 80% coverage required for compliance health score.
                </p>
              </div>
              <button
                onClick={() => alert("Automated reminder dispatched to unacknowledged employees.")}
                className="px-3.5 py-1.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover"
              >
                Send Automated Reminders
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {departmentAcks.map((d) => (
                <div key={d.dept} className="bg-white p-3.5 rounded border border-border space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-ink">{d.dept}</span>
                    <span className="font-semibold text-primary">
                      {d.signed} of {d.total} employees ({d.pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-surface rounded-full overflow-hidden border border-border-subtle">
                    <div
                      className={`h-full ${d.pct >= 90 ? "bg-emerald-600" : "bg-amber-600"}`}
                      style={{ width: `${d.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Archived Policies */}
        {activeTab === "ARCHIVED" && (
          <div className="space-y-3">
            {policies.filter((p) => p.status === "Superseded").map((p) => (
              <div key={p.id} className="bg-white p-4 rounded border border-border flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-ink">{p.title} &bull; {p.edition}</div>
                  <div className="text-[11px] text-ink-secondary">
                    Replaced on 2026-01-01 &bull; Archived in compliance repository
                  </div>
                </div>
                <button
                  onClick={() => alert(`Downloading archived policy ${p.id}...`)}
                  className="px-3 py-1.5 border border-border rounded text-ink hover:bg-surface flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Archive</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
