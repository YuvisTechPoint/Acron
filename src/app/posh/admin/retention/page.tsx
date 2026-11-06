"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileCheck2,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Clock,
  ArrowLeft,
  Building2,
  CheckCircle2,
  Trash2,
  Search,
  Download,
  FileText
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface RetentionRecord {
  id: string;
  caseNumber: string;
  orgName: string;
  closedDate: string;
  retentionExpiryDate: string;
  status: "ACTIVE_RETENTION" | "LEGAL_HOLD" | "ELIGIBLE_FOR_PURGE" | "PURGED_SECURELY";
  legalHoldReason?: string;
  holdImposedBy?: string;
}

const INITIAL_RECORDS: RetentionRecord[] = [
  {
    id: "RET-001",
    caseNumber: "POSH-TECHKOL-2024-0002",
    orgName: "Kolkata Cloud Technologies Pvt Ltd",
    closedDate: "2024-04-12T00:00:00Z",
    retentionExpiryDate: "2031-04-12T00:00:00Z",
    status: "ACTIVE_RETENTION",
  },
  {
    id: "RET-002",
    caseNumber: "POSH-BENGALIND-2023-0001",
    orgName: "Bengal Precision Engineering Ltd",
    closedDate: "2023-11-20T00:00:00Z",
    retentionExpiryDate: "2030-11-20T00:00:00Z",
    status: "LEGAL_HOLD",
    legalHoldReason: "Section 18 statutory appeal preferred before High Court at Calcutta (WPA 18921/2024).",
    holdImposedBy: "Adv. Subhasish Mukherjee"
  },
  {
    id: "RET-003",
    caseNumber: "POSH-HOOGHLY-2018-0001",
    orgName: "Hooghly River Shipping Logistics",
    closedDate: "2018-02-10T00:00:00Z",
    retentionExpiryDate: "2025-02-10T00:00:00Z",
    status: "ELIGIBLE_FOR_PURGE"
  }
];

export default function PoshRetentionPage() {
  const [records, setRecords] = useState<RetentionRecord[]>(INITIAL_RECORDS);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleHold = (id: string) => {
    setRecords(records.map((r) => {
      if (r.id !== id) return r;
      if (r.status === "LEGAL_HOLD") {
        return { ...r, status: "ACTIVE_RETENTION", legalHoldReason: undefined, holdImposedBy: undefined };
      } else {
        const reason = prompt("Enter official reason / court case number for Legal Hold:");
        if (!reason) return r;
        return {
          ...r,
          status: "LEGAL_HOLD",
          legalHoldReason: reason,
          holdImposedBy: "Adv. Debjani Sen (Acorn Legal)"
        };
      }
    }));
  };

  const filtered = records.filter((r) =>
    r.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.orgName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            PRD Screen Ref: X-09
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
              <FileCheck2 className="w-4 h-4 text-primary" />
              <span>Records Lifecycle &amp; Litigation Preservation</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink mt-1">
              Statutory 7-Year Retention &amp; Legal Hold Console
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Governs automated 7-year statutory archive, Section 18 judicial appeal holds, and cryptographic certificate of destruction generation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded font-mono font-medium">
              Policy: Rule BR-043 (7-Year Default)
            </span>
          </div>
        </div>

        {/* Records Table */}
        <div className="bg-white rounded-card border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-slate-50 flex items-center justify-between">
            <div className="relative w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search case # or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs border border-border rounded w-full bg-white focus:outline-none focus:border-primary"
              />
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {filtered.length} Archived Case Dossiers
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-600 font-semibold border-b border-border uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Case # &amp; Client</th>
                  <th className="py-3 px-4">Closed Date</th>
                  <th className="py-3 px-4">Statutory 7-Yr Expiry</th>
                  <th className="py-3 px-4">Retention Status</th>
                  <th className="py-3 px-4">Litigation Hold Details</th>
                  <th className="py-3 px-4 text-right">Legal Hold Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-primary">{r.caseNumber}</div>
                      <div className="text-[11px] text-slate-500">{r.orgName}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {formatDate(r.closedDate)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      {formatDate(r.retentionExpiryDate)}
                    </td>
                    <td className="py-3.5 px-4">
                      {r.status === "ACTIVE_RETENTION" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                          Active Vault (7-Yr)
                        </span>
                      )}
                      {r.status === "LEGAL_HOLD" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-300">
                          <ShieldAlert className="w-3 h-3 mr-1" />
                          LEGAL HOLD ACTIVE
                        </span>
                      )}
                      {r.status === "ELIGIBLE_FOR_PURGE" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                          Eligible For Purge
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs text-slate-600 truncate">
                      {r.legalHoldReason ? (
                        <div>
                          <div className="text-red-700 font-medium truncate" title={r.legalHoldReason}>
                            {r.legalHoldReason}
                          </div>
                          <div className="text-[10px] text-slate-400">By {r.holdImposedBy}</div>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">None (Standard schedule)</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {r.status === "LEGAL_HOLD" ? (
                        <button
                          onClick={() => toggleHold(r.id)}
                          className="px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium inline-flex items-center gap-1 border border-border"
                        >
                          <ShieldCheck className="w-3 h-3" />
                          <span>Release Hold</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleHold(r.id)}
                          className="px-2.5 py-1 text-[11px] bg-red-50 hover:bg-red-100 text-red-700 rounded font-medium inline-flex items-center gap-1 border border-red-200"
                        >
                          <ShieldAlert className="w-3 h-3" />
                          <span>Impose Legal Hold</span>
                        </button>
                      )}
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

