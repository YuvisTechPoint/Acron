"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building,
  ShieldCheck,
  Award,
  Users,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Download,
  Calendar,
  Printer,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export default function PoshOrgConsolePage() {
  const [selectedOrgId, setSelectedOrgId] = useState("org-1");
  const [activeSubTab, setActiveSubTab] = useState<string>("overview");

  const orgs = platformStore.getOrganizations();
  const activeOrg = orgs.find((o) => o.id === selectedOrgId) || orgs[0];
  const icMembers = platformStore.getICMembers(activeOrg.id);

  return (
    <div className="bg-ivory-50 min-h-screen py-8 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Organisation Console Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-border pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Building className="w-3.5 h-3.5" />
              <span>Organisation POSH Compliance Console</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink mt-2">
              {activeOrg.name}
            </h1>
            <p className="text-xs text-ink-secondary mt-0.5">
              Code: <span className="font-mono font-semibold text-primary">{activeOrg.code}</span> &bull; {activeOrg.employeeCount} Employees &bull; {activeOrg.city} HQ
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedOrgId}
              onChange={(e) => setSelectedOrgId(e.target.value)}
              className="px-3 py-2 bg-surface border border-border rounded text-xs font-semibold text-ink"
            >
              {orgs.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>

            <Link
              href="/posh/ic"
              className="px-4 py-2 border border-border text-xs font-semibold rounded hover:bg-surface transition-colors"
            >
              Open IC Docket &rarr;
            </Link>
          </div>
        </div>

        {/* Dedicated Module Deep Links */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-accent shrink-0">Org Consoles:</span>
          <Link href="/posh/org/ic" className="px-2.5 py-1 bg-surface border border-border rounded hover:bg-white text-ink shrink-0 font-medium">
            IC Roster (O-02)
          </Link>
          <Link href="/posh/org/policies" className="px-2.5 py-1 bg-surface border border-border rounded hover:bg-white text-ink shrink-0 font-medium">
            Policies (O-03)
          </Link>
          <Link href="/posh/org/notices" className="px-2.5 py-1 bg-surface border border-border rounded hover:bg-white text-ink shrink-0 font-medium">
            Notices (O-04)
          </Link>
          <Link href="/posh/org/training" className="px-2.5 py-1 bg-surface border border-border rounded hover:bg-white text-ink shrink-0 font-medium">
            Training LMS (O-05)
          </Link>
          <Link href="/posh/org/actions" className="px-2.5 py-1 bg-surface border border-border rounded hover:bg-white text-ink shrink-0 font-medium">
            Employer Actions (O-06)
          </Link>
          <Link href="/posh/org/reports" className="px-2.5 py-1 bg-surface border border-border rounded hover:bg-white text-ink shrink-0 font-medium">
            Annual Report (O-07)
          </Link>
          <Link href="/posh/org/prevention" className="px-2.5 py-1 bg-surface border border-border rounded hover:bg-white text-ink shrink-0 font-medium">
            Surveys (O-08)
          </Link>
          <Link href="/posh/org/plan" className="px-2.5 py-1 bg-surface border border-border rounded hover:bg-white text-ink shrink-0 font-medium">
            Subscription Plan (O-09)
          </Link>
          <Link href="/posh/org/support" className="px-2.5 py-1 bg-surface border border-border rounded hover:bg-white text-ink shrink-0 font-medium">
            Support Desk (O-10)
          </Link>
        </div>

        {/* Sub-Navigation */}
        <div className="flex overflow-x-auto border-b border-border gap-2 text-xs">
          {[
            { id: "overview", label: "Dashboard & Health Score" },
            { id: "roster", label: "IC Committee Roster (Sec 4)" },
            { id: "annual-report", label: "Statutory Annual Report (Sec 21)" },
            { id: "training", label: "Training & Sensitisation LMS" },
            { id: "notices", label: "Notice Board Displays (Sec 19)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-4 py-2.5 font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeSubTab === tab.id
                  ? "border-primary text-primary font-bold bg-surface"
                  : "border-transparent text-ink-secondary hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Dashboard & Health Score */}
        {activeSubTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-surface p-5 rounded-card border border-border shadow-card">
                <div className="text-xs text-ink-secondary">Compliance Health Score</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-serif font-bold text-3xl text-emerald-700">
                    {activeOrg.complianceScore}%
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Statutory Compliant
                  </span>
                </div>
                <div className="w-full bg-border-subtle h-2 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${activeOrg.complianceScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-surface p-5 rounded-card border border-border shadow-card">
                <div className="text-xs text-ink-secondary">Internal Committee</div>
                <div className="font-serif font-bold text-lg text-primary mt-1">Constituted</div>
                <div className="text-[11px] text-ink-secondary mt-1">
                  Quorum: 4 Members &bull; 75% Women &bull; External Member active
                </div>
              </div>

              <div className="bg-surface p-5 rounded-card border border-border shadow-card">
                <div className="text-xs text-ink-secondary">Policy Acknowledged</div>
                <div className="font-serif font-bold text-2xl text-ink mt-1">
                  {activeOrg.policyAcknowledgedPct}%
                </div>
                <div className="text-[11px] text-emerald-700 mt-1">&bull; Digital employee signatures</div>
              </div>

              <div className="bg-surface p-5 rounded-card border border-border shadow-card">
                <div className="text-xs text-ink-secondary">Section 21 Filing (DO)</div>
                <div className="font-serif font-bold text-lg text-emerald-700 mt-1 capitalize">
                  {activeOrg.annualReportStatus.replace(/_/g, " ")}
                </div>
                <div className="text-[11px] text-ink-secondary mt-1">For Calendar Year {activeOrg.lastAnnualReportYear}</div>
              </div>
            </div>

            {/* Statutory Checklist Card */}
            <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-4">
              <h3 className="font-serif font-bold text-base text-ink">
                Employer Statutory Compliance Audit Checklist
              </h3>
              <div className="space-y-3 text-xs">
                <div className="bg-white p-3.5 rounded border border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Constituted Internal Committee with Acorn Legal External Member (Sec 4)</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700">COMPLIANT</span>
                </div>

                <div className="bg-white p-3.5 rounded border border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Conspicuous Display of Penal Consequences and IC Contacts at Kolkata Office (Sec 19(b))</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700">VERIFIED</span>
                </div>

                <div className="bg-white p-3.5 rounded border border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Annual Sensitisation &amp; Employee Awareness Program (Sec 19(c))</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700">91% TRAINED</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: IC Committee Roster */}
        {activeSubTab === "roster" && (
          <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif font-bold text-base text-ink">
                  Internal Committee (IC) Composition Registry
                </h3>
                <p className="text-xs text-ink-secondary mt-0.5">
                  Tenure of IC members cannot exceed 3 years under Section 4(3) of the Act.
                </p>
              </div>
            </div>

            <div className="bg-white rounded border border-border overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-surface border-b border-border text-[11px] uppercase text-ink-secondary font-semibold">
                  <tr>
                    <th className="p-3">Member Name</th>
                    <th className="p-3">Statutory Role</th>
                    <th className="p-3">Designation</th>
                    <th className="p-3">Tenure Period</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {icMembers.map((m) => (
                    <tr key={m.id} className="hover:bg-surface/50">
                      <td className="p-3 font-semibold text-ink">
                        {m.name} {m.isWoman ? "(F)" : "(M)"}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          m.role === "presiding_officer"
                            ? "bg-primary text-white"
                            : m.role === "external_member"
                            ? "bg-accent-light text-accent"
                            : "bg-surface border border-border text-ink"
                        }`}>
                          {m.role.replace(/_/g, " ").toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3 text-ink-secondary">{m.designation}</td>
                      <td className="p-3 text-ink-secondary">
                        {m.tenureStartDate} to {m.tenureEndDate}
                      </td>
                      <td className="p-3">
                        <span className="text-emerald-700 font-bold uppercase text-[10px]">
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Statutory Annual Report (Section 21) */}
        {activeSubTab === "annual-report" && (
          <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-6">
            <div className="border-b border-border pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-serif font-bold text-lg text-ink">
                  Section 21 Annual Report for District Officer (DO)
                </h3>
                <p className="text-xs text-ink-secondary mt-0.5">
                  Statutory filing submitted to the District Magistrate, Kolkata under Rule 14.
                </p>
              </div>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover flex items-center gap-1.5 shadow"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export &amp; Print Statutory Form</span>
              </button>
            </div>

            {/* Generated Annual Report Form */}
            <div className="bg-white p-6 rounded border border-border space-y-4 text-xs">
              <div className="text-center pb-4 border-b border-border space-y-1">
                <div className="font-serif font-bold text-sm uppercase tracking-wider text-primary">
                  Annual Report on Prevention of Sexual Harassment of Women at Workplace
                </div>
                <div className="text-ink-secondary text-[11px]">
                  [Prepared in accordance with Section 21 of the POSH Act, 2013 and Rule 14]
                </div>
                <div className="font-semibold text-ink">
                  Establishment: {activeOrg.name} ({activeOrg.registeredAddress})
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between py-1.5 border-b border-border-subtle">
                  <span>(a) Number of complaints of sexual harassment received in the year:</span>
                  <span className="font-bold text-primary">1</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border-subtle">
                  <span>(b) Number of complaints disposed of during the year:</span>
                  <span className="font-bold text-primary">0 (Inquiry in progress under 90-day timeline)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border-subtle">
                  <span>(c) Number of cases pending for more than ninety days:</span>
                  <span className="font-bold text-emerald-700">0 (Zero Overdue)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border-subtle">
                  <span>(d) Number of workshops or awareness programmes carried out:</span>
                  <span className="font-bold text-primary">4 Workshops (390 employees sensitized)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border-subtle">
                  <span>(e) Nature of action taken by the employer:</span>
                  <span className="font-bold text-primary">Interim relief transfer executed under Sec 12</span>
                </div>
              </div>

              <div className="pt-6 border-t border-border flex justify-between items-end text-[11px] text-ink-secondary">
                <div>
                  Date: {new Date().toLocaleDateString("en-IN")}<br />
                  Place: Kolkata, West Bengal
                </div>
                <div className="text-right">
                  <strong>Dr. Ananya Mukherjee</strong><br />
                  Presiding Officer, Internal Committee<br />
                  {activeOrg.name}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Training & Sensitisation LMS */}
        {activeSubTab === "training" && (
          <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-4">
            <h3 className="font-serif font-bold text-base text-ink">
              Employee Sensitisation &amp; Training Module Status
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-4 rounded border border-border space-y-2">
                <div className="font-bold text-primary">General Employee POSH Awareness E-Learning</div>
                <div className="text-ink-secondary">Coverage: 382 out of 420 employees completed (91%)</div>
                <div className="w-full bg-border-subtle h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: "91%" }}></div>
                </div>
              </div>

              <div className="bg-white p-4 rounded border border-border space-y-2">
                <div className="font-bold text-primary">Manager &amp; Leadership Responsibility Workshop</div>
                <div className="text-ink-secondary">Coverage: 28 out of 30 people managers completed (93%)</div>
                <div className="w-full bg-border-subtle h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: "93%" }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Notice Board Displays */}
        {activeSubTab === "notices" && (
          <div className="bg-surface rounded-card p-6 border border-border shadow-card space-y-4">
            <h3 className="font-serif font-bold text-base text-ink">
              Workplace Notice Board Compliance (Section 19(b))
            </h3>
            <p className="text-xs text-ink-secondary">
              Statute mandates visible physical notices in English and Bengali at conspicuous workplace premises.
            </p>
            <div className="bg-white p-4 rounded border border-border space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-ink">Sector V HQ Reception Display</div>
                  <div className="text-[11px] text-ink-secondary">Last inspected and verified: 15 Oct 2026</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  VERIFIED ACTIVE
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-ink">Cafeteria &amp; Common Floor Notice Board</div>
                  <div className="text-[11px] text-ink-secondary">Last inspected and verified: 15 Oct 2026</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  VERIFIED ACTIVE
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

