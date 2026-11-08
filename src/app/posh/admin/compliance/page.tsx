"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Download,
  ArrowLeft,
  ArrowRight,
  Filter,
} from "lucide-react";
import { platformStore } from "@/lib/store";

export default function PoshAdminCompliancePage() {
  const orgs = platformStore.getOrganizations();
  const [filterQuery, setFilterQuery] = useState("");

  const filteredOrgs = orgs.filter((o) =>
    o.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    o.code.toLowerCase().includes(filterQuery.toLowerCase())
  );

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
            <Link href="/posh/admin/intake" className="text-primary font-semibold hover:underline">
              Intake Triage Desk (X-08) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>PRD Screen X-05 &bull; Multi-Organisation Compliance Oversight</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            Enterprise POSH Compliance &amp; Statutory Duty Register
          </h1>
          <p className="text-xs text-ink-secondary leading-relaxed">
            Oversight of Section 19 statutory duties, Internal Committee health scores, and District Officer (DO) filing deadlines across all retainer clients.
          </p>
        </div>

        {/* Aggregate KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">Retainer Organisations</div>
            <div className="font-serif font-bold text-3xl text-primary mt-1">{orgs.length}</div>
            <div className="text-[11px] text-ink-secondary mt-1">100% Empanelled ICs</div>
          </div>

          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">Average Compliance Score</div>
            <div className="font-serif font-bold text-3xl text-emerald-700 mt-1">
              {Math.round(orgs.reduce((acc, o) => acc + o.complianceScore, 0) / (orgs.length || 1))}%
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">Statutory Green Zone</div>
          </div>

          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">DO West Bengal Filing</div>
            <div className="font-serif font-bold text-3xl text-ink mt-1">Jan 31</div>
            <div className="text-[11px] text-ink-secondary mt-1">Statutory Annual Deadline</div>
          </div>

          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">Policy Acknowledgment Avg</div>
            <div className="font-serif font-bold text-3xl text-primary mt-1">
              {Math.round(orgs.reduce((acc, o) => acc + o.policyAcknowledgedPct, 0) / (orgs.length || 1))}%
            </div>
            <div className="text-[11px] text-ink-secondary mt-1">Audited via digital ledger</div>
          </div>
        </div>

        {/* Client Organisations Matrix */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-border-subtle pb-3">
            <h2 className="font-serif font-bold text-base text-ink">
              Client Organisation Compliance Matrix
            </h2>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Filter by organisation or code..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="px-3 py-1.5 bg-white border border-border rounded text-xs focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-muted text-ink-secondary uppercase tracking-wider text-[10px] border-b border-border">
                <tr>
                  <th className="py-2.5 px-3">Organisation</th>
                  <th className="py-2.5 px-3">IC Presiding Officer</th>
                  <th className="py-2.5 px-3">Acorn External Member</th>
                  <th className="py-2.5 px-3">Compliance Score</th>
                  <th className="py-2.5 px-3">Policy Acknowledged</th>
                  <th className="py-2.5 px-3">Annual DO Report</th>
                  <th className="py-2.5 px-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle bg-white">
                {filteredOrgs.map((o) => (
                  <tr key={o.id} className="hover:bg-surface/50">
                    <td className="py-3 px-3">
                      <div className="font-bold text-ink">{o.name}</div>
                      <div className="text-[11px] text-ink-secondary">
                        Code: <span className="font-mono text-primary font-semibold">{o.code}</span> &bull; {o.employeeCount} Staff
                      </div>
                    </td>
                    <td className="py-3 px-3 text-ink-secondary">
                      {o.icPresidingOfficer}
                    </td>
                    <td className="py-3 px-3 text-primary font-semibold">
                      {o.icExternalMember}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-ink">{o.complianceScore}%</span>
                        <div className="w-16 h-1.5 bg-surface rounded-full overflow-hidden">
                          <div
                            className={`h-full ${o.complianceScore >= 85 ? "bg-emerald-600" : "bg-amber-600"}`}
                            style={{ width: `${o.complianceScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-ink">{o.policyAcknowledgedPct}%</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        o.annualReportStatus === "submitted_to_do"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {o.annualReportStatus === "submitted_to_do" ? "FILED (2025)" : "DRAFT PENDING"}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <Link
                        href={`/posh/org`}
                        className="text-primary hover:underline font-semibold"
                      >
                        Inspect Org &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
