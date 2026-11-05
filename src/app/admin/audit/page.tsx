"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Activity, ShieldCheck, ArrowLeft, Printer, Download } from "lucide-react";
import { platformStore } from "@/lib/store";

export default function AdminAuditPage() {
  const logs = platformStore.getAuditLogs();

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
                Governance &bull; Security
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Tamper-Evident System Audit Log
              </h1>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export Audit Trail</span>
          </button>
        </div>

        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
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
              {logs.map((l) => (
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
      </div>
    </div>
  );
}

