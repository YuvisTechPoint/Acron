"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Plus,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Building,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export default function PoshOrgICRosterPage() {
  const [selectedOrgId, setSelectedOrgId] = useState("org-1");
  const orgs = platformStore.getOrganizations();
  const activeOrg = orgs.find((o) => o.id === selectedOrgId) || orgs[0];
  const icMembers = platformStore.getICMembers(activeOrg.id);

  // Section 4 Composition Validation:
  // 1. Presiding Officer must be senior woman employee
  // 2. At least 2 employee members
  // 3. At least 1 external member from NGO / familiar with POSH
  // 4. At least 50% women
  const po = icMembers.find((m) => m.role === "presiding_officer");
  const employeeMembers = icMembers.filter((m) => m.role === "employee_member");
  const externalMember = icMembers.find((m) => m.role === "external_member");
  const womenCount = icMembers.filter((m) => m.isWoman).length;
  const womenPct = icMembers.length > 0 ? Math.round((womenCount / icMembers.length) * 100) : 0;

  const isCompositionValid =
    po && po.isWoman &&
    employeeMembers.length >= 2 &&
    externalMember &&
    womenPct >= 50;

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
            <Link href="/posh/org/policies" className="text-primary font-semibold hover:underline">
              Policy Library (O-03) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                <Users className="w-4 h-4 text-primary" />
                <span>PRD Screen O-02 &bull; Section 4 of POSH Act 2013</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
                Internal Committee (IC) Roster &amp; Statutory Validity Engine
              </h1>
              <p className="text-xs text-ink-secondary mt-1">
                Employer: <span className="font-semibold text-ink">{activeOrg.name}</span> &bull; Code: <span className="font-mono text-primary font-bold">{activeOrg.code}</span> &bull; Salt Lake &amp; Rajarhat Works
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

        {/* Statutory Composition Engine Card */}
        <div className={`p-6 rounded-card border shadow-card text-xs space-y-4 ${
          isCompositionValid ? "bg-emerald-50 border-emerald-200 text-emerald-950" : "bg-amber-50 border-amber-200 text-amber-950"
        }`}>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-border-subtle pb-3">
            <div>
              <div className="font-serif font-bold text-base text-ink flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>Section 4 Mandatory Committee Constitution Status</span>
              </div>
              <p className="text-xs text-ink-secondary mt-0.5">
                Every workplace with 10 or more employees must constitute an IC by written order.
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              isCompositionValid ? "bg-emerald-200 text-emerald-900" : "bg-amber-200 text-amber-900"
            }`}>
              {isCompositionValid ? "STATUTORILY VALID" : "COMPOSITION DEFICIENT"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="bg-white/80 p-3 rounded border border-border-subtle">
              <span className="text-ink-secondary">Presiding Officer:</span>
              <div className="font-bold text-ink mt-0.5">
                {po ? po.name : "None Appointed"}
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                {po?.isWoman ? "Senior Woman Employee (Sec 4(2)(a))" : "Must be woman"}
              </div>
            </div>

            <div className="bg-white/80 p-3 rounded border border-border-subtle">
              <span className="text-ink-secondary">Employee Members:</span>
              <div className="font-bold text-ink mt-0.5">
                {employeeMembers.length} Members
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                {employeeMembers.length >= 2 ? "Minimum 2 Satisfied (Sec 4(2)(b))" : "Deficient (<2)"}
              </div>
            </div>

            <div className="bg-white/80 p-3 rounded border border-border-subtle">
              <span className="text-ink-secondary">External Member:</span>
              <div className="font-bold text-ink mt-0.5">
                {externalMember ? externalMember.name : "None Appointed"}
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                {externalMember ? "Acorn Legal Counsel (Sec 4(2)(c))" : "Mandatory NGO / Lawyer"}
              </div>
            </div>

            <div className="bg-white/80 p-3 rounded border border-border-subtle">
              <span className="text-ink-secondary">Women Representation:</span>
              <div className="font-bold text-ink mt-0.5">
                {womenCount} of {icMembers.length} ({womenPct}%)
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                {womenPct >= 50 ? "50% Quorum Satisfied (Sec 4(2))" : "Deficient (<50%)"}
              </div>
            </div>
          </div>
        </div>

        {/* IC Committee Members Table */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-serif font-bold text-base text-ink">
              Gazetted Internal Committee Members
            </h2>
            <span className="text-xs text-ink-secondary">Max 3-Year Tenure per Section 4(3)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-muted text-ink-secondary uppercase tracking-wider text-[10px] border-b border-border">
                <tr>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Member Name &amp; Designation</th>
                  <th className="py-2.5 px-3">Gender</th>
                  <th className="py-2.5 px-3">Contact</th>
                  <th className="py-2.5 px-3">Tenure Window</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle bg-white">
                {icMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-surface/50">
                    <td className="py-3 px-3 font-semibold text-primary">
                      {m.role === "presiding_officer"
                        ? "Presiding Officer"
                        : m.role === "external_member"
                        ? "External Member (Acorn)"
                        : "Employee Member"}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-ink">{m.name}</div>
                      <div className="text-[11px] text-ink-secondary">{m.designation}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.isWoman ? "bg-purple-100 text-purple-900" : "bg-slate-100 text-slate-800"
                      }`}>
                        {m.isWoman ? "Woman" : "Man"}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-ink-secondary">
                      <div>{m.email}</div>
                      <div className="text-[10px]">{m.phone}</div>
                    </td>
                    <td className="py-3 px-3 text-ink-secondary">
                      {formatDate(m.tenureStartDate)} &ndash; {formatDate(m.tenureEndDate)}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                        {m.status}
                      </span>
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
