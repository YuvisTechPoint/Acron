"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Building2,
  Landmark,
  Users,
  AlertTriangle,
  Clock,
  CheckCircle2,
  FileCheck2,
  Activity,
  ArrowRight,
  Search,
  Filter,
  HeartPulse,
  Calendar,
  ChevronRight,
  ShieldCheck,
  Eye,
  KeyRound,
  FileText
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export default function PoshCentralAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");

  const orgs = platformStore.getOrganizations();
  const cases = platformStore.getCases();

  const activeCases = cases.filter((c) => !["CLOSED", "WITHDRAWN"].includes(c.state));
  const urgentCases = cases.filter((c) => c.priority === "URGENT" || c.priority === "CRITICAL");
  const totalOrgs = orgs.length;

  const filteredOrgs = orgs.filter((org) => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = sectorFilter === "all" || (org.industry?.toLowerCase().includes(sectorFilter.toLowerCase()) ?? false);
    return matchesSearch && matchesSector;
  });

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Breadcrumb & Status */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-primary text-white p-6 rounded-card shadow-card">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold">
              <ShieldAlert className="w-4 h-4" />
              <span>Acorn Legal &bull; POSH Practice Group Central Oversight (X-01)</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-white">
              Multi-Organisation POSH Command Centre
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Cross-tenant statutory oversight, IC External Member appointments, SLA monitoring & Section 16 compliance governance.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/posh/admin/orgs"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold hover:bg-gold-light text-primary font-bold text-sm rounded transition shadow"
            >
              <Building2 className="w-4 h-4" />
              <span>Onboard Organisation (X-02)</span>
            </Link>
            <Link
              href="/posh/admin/breakglass"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-red-900/60 hover:bg-red-800 text-red-200 border border-red-700/50 text-xs font-semibold rounded transition"
            >
              <KeyRound className="w-3.5 h-3.5 text-red-400" />
              <span>Break-Glass Log (X-06)</span>
            </Link>
          </div>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-card border border-border shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Active Retainer Clients</span>
              <Building2 className="w-4 h-4 text-primary" />
            </div>
            <div className="text-3xl font-bold text-ink">{totalOrgs}</div>
            <div className="text-xs text-emerald-600 font-medium mt-1">100% compliant IC constitutions</div>
          </div>

          <div className="bg-white p-5 rounded-card border border-border shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Active Inquiries</span>
              <Landmark className="w-4 h-4 text-gold" />
            </div>
            <div className="text-3xl font-bold text-primary">{activeCases.length}</div>
            <div className="text-xs text-slate-600 mt-1">Across {orgs.length} client employers</div>
          </div>

          <div className="bg-white p-5 rounded-card border border-border shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Priority / Retaliation</span>
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-red-600">{urgentCases.length}</div>
            <div className="text-xs text-red-500 mt-1">Requiring immediate interim relief</div>
          </div>

          <div className="bg-white p-5 rounded-card border border-border shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">External Panel Pool</span>
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div className="text-3xl font-bold text-ink">14</div>
            <div className="text-xs text-slate-600 mt-1">Advocates & certified NGO experts</div>
          </div>
        </div>

        {/* Quick Access Grid to Sub-Screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <Link
            href="/posh/admin/cases"
            className="p-4 bg-white rounded-card border border-border hover:border-primary transition group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <Landmark className="w-5 h-5 text-primary group-hover:text-gold transition" />
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">X-03</span>
              </div>
              <h3 className="font-bold text-sm text-ink group-hover:text-primary transition">Case Oversight</h3>
              <p className="text-xs text-slate-500 mt-1">Cross-tenant statutory 90-day progress tracker & notices.</p>
            </div>
            <div className="flex items-center text-xs font-semibold text-primary mt-3 pt-2 border-t border-slate-100">
              <span>View Inquiries</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            href="/posh/admin/panel"
            className="p-4 bg-white rounded-card border border-border hover:border-primary transition group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-primary group-hover:text-gold transition" />
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">X-04</span>
              </div>
              <h3 className="font-bold text-sm text-ink group-hover:text-primary transition">External Members</h3>
              <p className="text-xs text-slate-500 mt-1">Roster of Acorn Advocates appointed to client ICs under Sec 4(2)(c).</p>
            </div>
            <div className="flex items-center text-xs font-semibold text-primary mt-3 pt-2 border-t border-slate-100">
              <span>Manage Panel</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            href="/posh/admin/aftercare"
            className="p-4 bg-white rounded-card border border-border hover:border-primary transition group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <HeartPulse className="w-5 h-5 text-primary group-hover:text-gold transition" />
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">X-07</span>
              </div>
              <h3 className="font-bold text-sm text-ink group-hover:text-primary transition">Aftercare & Retaliation</h3>
              <p className="text-xs text-slate-500 mt-1">30, 90 & 180-day post-inquiry climate check and retaliation audit.</p>
            </div>
            <div className="flex items-center text-xs font-semibold text-primary mt-3 pt-2 border-t border-slate-100">
              <span>View Queue</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            href="/posh/admin/retention"
            className="p-4 bg-white rounded-card border border-border hover:border-primary transition group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <FileCheck2 className="w-5 h-5 text-primary group-hover:text-gold transition" />
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">X-09</span>
              </div>
              <h3 className="font-bold text-sm text-ink group-hover:text-primary transition">Retention & Legal Hold</h3>
              <p className="text-xs text-slate-500 mt-1">7-year statutory archive policy & Section 18 appeal freeze orders.</p>
            </div>
            <div className="flex items-center text-xs font-semibold text-primary mt-3 pt-2 border-t border-slate-100">
              <span>Retention Console</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            href="/posh/admin/breakglass"
            className="p-4 bg-white rounded-card border border-border hover:border-primary transition group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <KeyRound className="w-5 h-5 text-red-600 group-hover:text-red-700 transition" />
                <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-mono">X-06</span>
              </div>
              <h3 className="font-bold text-sm text-ink group-hover:text-red-700 transition">Break-Glass Access</h3>
              <p className="text-xs text-slate-500 mt-1">Emergency administrative override log with reason & timestamping.</p>
            </div>
            <div className="flex items-center text-xs font-semibold text-red-700 mt-3 pt-2 border-t border-slate-100">
              <span>Audit Access</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>

        {/* Client Organizations Roster with Health Score */}
        <div className="bg-white rounded-card border border-border shadow-sm overflow-hidden">
          <div className="p-5 border-b border-border flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-slate-50/50">
            <div>
              <h2 className="font-serif text-lg font-bold text-ink">Client Organisations & Compliance Health</h2>
              <p className="text-xs text-slate-500">Live monitoring of tenant IC composition, annual filing status, and case load</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search client org or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs border border-border rounded focus:outline-none focus:border-primary w-52"
                />
              </div>

              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className="text-xs border border-border rounded px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:border-primary"
              >
                <option value="all">All Sectors</option>
                <option value="Technology">Technology</option>
                <option value="Engineering">Engineering / Mfg</option>
                <option value="Logistics">Logistics & Supply Chain</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-600 font-semibold border-b border-border uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Org Code & Name</th>
                  <th className="py-3 px-4">Industry & City</th>
                  <th className="py-3 px-4">Workforce</th>
                  <th className="py-3 px-4">IC External Member</th>
                  <th className="py-3 px-4">Active Cases</th>
                  <th className="py-3 px-4">Health Score</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrgs.map((org) => {
                  const orgCases = cases.filter((c) => c.orgId === org.id);
                  const activeOrgCases = orgCases.filter((c) => !["CLOSED", "WITHDRAWN"].includes(c.state));
                  const healthScore = org.healthScore || 94;

                  return (
                    <tr key={org.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-primary">{org.name}</div>
                        <div className="font-mono text-[10px] text-slate-500">{org.code} &bull; Retainer Plan: {org.plan || "Standard Enterprise"}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <div>{org.industry}</div>
                        <div className="text-[11px] text-slate-400">{org.city}, West Bengal</div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-700">
                        {org.employeeCount} employees
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-primary font-medium">{org.externalMemberName || "Adv. Debjani Sen (Acorn)"}</div>
                        <div className="text-[10px] text-slate-500">Appointed under Sec 4(2)(c)</div>
                      </td>
                      <td className="py-3.5 px-4">
                        {activeOrgCases.length > 0 ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            {activeOrgCases.length} active inquiry
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                            Zero active
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${healthScore >= 90 ? 'text-emerald-700' : 'text-amber-700'}`}>
                            {healthScore}%
                          </span>
                          <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${healthScore >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                              style={{ width: `${healthScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/posh/org`}
                            className="px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition font-medium inline-flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Tenant Portal</span>
                          </Link>
                          <Link
                            href={`/posh/admin/cases?org=${org.code}`}
                            className="px-2.5 py-1 text-[11px] bg-primary/10 hover:bg-primary/20 text-primary rounded transition font-medium inline-flex items-center gap-1"
                          >
                            <Landmark className="w-3 h-3" />
                            <span>Cases</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 16 Statutory Warning Card */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-card flex items-start gap-3 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <div className="font-bold">Section 16 Statutory Prohibition &amp; Audit Warning</div>
            <p className="mt-0.5 text-amber-800 leading-relaxed">
              Every action taken within this Central POSH Admin is logged to the immutable audit trail.
              Access to case details across tenant boundaries is strictly restricted to designated External IC Members and the managing counsel.
              Disclosure of identity or proceedings to unauthorised persons is an offence under Section 16 and 17 of the POSH Act 2013 with penalty up to ₹5,000.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

