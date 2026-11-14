"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Activity, ShieldCheck, ArrowLeft, Printer, Download, Search, Filter } from "lucide-react";
import { platformStore } from "@/lib/store";
import { useRealtimeAuditLogs } from "@/lib/realtime";
import { downloadCsv } from "@/lib/export-csv";

export default function AdminAuditPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("ALL");
  const logs = useRealtimeAuditLogs();

  const filteredLogs = logs.filter((l) => {
    const matchesSearch =
      l.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.actorRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === "ALL" || l.action.toLowerCase() === actionFilter.toLowerCase();
    return matchesSearch && matchesAction;
  });

  const uniqueActions = ["ALL", ...Array.from(new Set(logs.map((l) => l.action)))];

  const handleExportCSV = () => {
    const headers = ["ID", "Timestamp", "Actor", "Role", "Action", "Target Entity", "IP Address", "Event Details"];
    const rows = filteredLogs.map((l) => [
      l.id,
      l.timestamp,
      l.actor,
      l.actorRole,
      l.action,
      l.entityId,
      l.ipAddress,
      l.details || "",
    ]);
    downloadCsv(`Acorn_Audit_Log_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
  };

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-card">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-1.5 rounded hover:bg-surface text-ink-secondary hover:text-ink transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-bold">
                Governance &bull; Security &bull; PRD Section 7.4
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Tamper-Evident System Audit Log
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-white border border-border text-navy-700 text-xs font-semibold rounded hover:bg-slate-50 flex items-center gap-1.5 transition shadow-sm"
              title="Export Tamper-Evident CSV Trail"
            >
              <Download className="w-3.5 h-3.5 text-brass-500" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Audit Trail</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-card border border-border shadow-card flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs w-full md:w-auto">
            <span className="font-semibold text-ink flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5 text-brass-500" />
              Action:
            </span>
            {uniqueActions.slice(0, 6).map((a) => (
              <button
                key={a}
                onClick={() => setActionFilter(a)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                  actionFilter === a
                    ? "bg-primary text-white"
                    : "bg-surface border border-border text-ink-secondary hover:bg-slate-100"
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-ink-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search actor, entity, or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2 bg-surface border border-border rounded focus:outline-none focus:border-primary text-ink"
            />
          </div>
        </div>

        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <div className="p-4 bg-surface border-b border-border font-bold text-ink text-xs uppercase tracking-wider flex justify-between items-center">
            <span>Immutable Hash-Chained Audit Trail ({filteredLogs.length})</span>
            <span className="text-[11px] font-normal text-emerald-700 font-mono">SHA-256 Verified Append-Only</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
                <tr>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Actor &bull; Role</th>
                  <th className="p-3.5">Action Event</th>
                  <th className="p-3.5">Target Entity</th>
                  <th className="p-3.5">IP Address</th>
                  <th className="p-3.5">Event Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filteredLogs.map((l) => (
                  <tr key={l.id} className="hover:bg-surface/50 font-mono text-[11px]">
                    <td className="p-3.5 text-ink-secondary whitespace-nowrap">{l.timestamp}</td>
                    <td className="p-3.5 font-semibold text-ink whitespace-nowrap">
                      {l.actor} ({l.actorRole})
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-primary-light text-primary font-bold text-[10px]">
                        {l.action}
                      </span>
                    </td>
                    <td className="p-3.5 text-ink">{l.entityId}</td>
                    <td className="p-3.5 text-ink-secondary">{l.ipAddress}</td>
                    <td className="p-3.5 font-sans text-xs text-ink">{l.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="py-12 text-center text-ink-secondary text-xs">
              No audit log entries match your search and filter criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

