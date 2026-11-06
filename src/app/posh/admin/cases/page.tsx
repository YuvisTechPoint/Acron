"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Landmark,
  Search,
  Filter,
  Building2,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Eye,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Download,
  AlertCircle
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export default function PoshCrossTenantCasesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orgFilter, setOrgFilter] = useState("all");

  const cases = platformStore.getCases();
  const orgs = platformStore.getOrganizations();

  const filteredCases = cases.filter((c) => {
    const matchesSearch = c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.complainantCode?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (c.respondentCode?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesStatus = statusFilter === "all" || c.state === statusFilter;
    const matchesOrg = orgFilter === "all" || c.orgId === orgFilter;
    return matchesSearch && matchesStatus && matchesOrg;
  });

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/posh/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Central POSH Command</span>
          </Link>
          <span className="text-[11px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
            PRD Screen Ref: X-03
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
              <Landmark className="w-4 h-4 text-primary" />
              <span>Cross-Tenant Oversight &bull; Statutory Inquiries</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink mt-1">
              Statutory 90-Day Timeline &amp; Inquiry Roster
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Supervises case progression, Rule 7 notice delivery, Section 11(4) 90-day strict expiry, and Section 13 report submission across client organisations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 text-xs font-semibold rounded border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Section 16 Masking Active</span>
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-card border border-border shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search case # or pseudonym..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs border border-border rounded w-full focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={orgFilter}
              onChange={(e) => setOrgFilter(e.target.value)}
              className="text-xs border border-border rounded px-3 py-1.5 bg-white text-slate-700 focus:outline-none focus:border-primary"
            >
              <option value="all">All Client Organisations</option>
              {orgs.map((org) => (
                <option key={org.id} value={org.id}>{org.name} ({org.code})</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-border rounded px-3 py-1.5 bg-white text-slate-700 focus:outline-none focus:border-primary"
            >
              <option value="all">All States</option>
              <option value="DRAFT">Draft</option>
              <option value="SUBMITTED">Submitted / Intake</option>
              <option value="TRIAGE_PENDING">Triage Pending</option>
              <option value="NOTICE_ISSUED">Notice Served (Rule 7)</option>
              <option value="INQUIRY_HEARING">Inquiry / Hearings</option>
              <option value="REPORT_SUBMITTED">Section 13 Report Submitted</option>
              <option value="CLOSED">Closed / Implemented</option>
            </select>
          </div>
        </div>

        {/* Cases Table */}
        <div className="bg-white rounded-card border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-border uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Case Number &amp; Client</th>
                  <th className="py-3 px-4">Pseudonyms (Sec 16)</th>
                  <th className="py-3 px-4">Filed Date</th>
                  <th className="py-3 px-4">Inquiry State</th>
                  <th className="py-3 px-4">Statutory 90-Day Clock</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCases.map((c) => {
                  const daysRemaining = c.daysRemaining90 ?? 64;
                  const isExpiringSoon = daysRemaining <= 15;
                  const org = orgs.find((o) => o.id === c.orgId);

                  return (
                    <tr key={c.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-primary">{c.caseNumber}</div>
                        <div className="text-[11px] text-slate-500 font-medium">{org?.name || c.orgId}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-mono text-[11px] text-slate-700">{c.complainantCode}</div>
                        <div className="font-mono text-[10px] text-slate-400">vs {c.respondentCode}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {formatDate(c.filedAt || new Date().toISOString())}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                          {c.state.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <Clock className={`w-3.5 h-3.5 ${isExpiringSoon ? 'text-red-500' : 'text-slate-400'}`} />
                          <span className={`font-bold ${isExpiringSoon ? 'text-red-600' : 'text-slate-700'}`}>
                            {daysRemaining} days left
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400">Sec 11(4) max 90 days</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          c.priority === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                          c.priority === 'URGENT' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {c.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/posh/ic/cases/${c.id}`}
                          className="px-2.5 py-1 text-[11px] bg-primary hover:bg-primary-light text-white rounded transition font-medium inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Open File</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

