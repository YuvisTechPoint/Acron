"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LifeBuoy, ArrowLeft, Clock, CheckCircle2, AlertTriangle, Plus } from "lucide-react";

export default function AdminHelpdeskPage() {
  const tickets = [
    { id: "TKT-2026-0012", subject: "Request for Acorn External Member for upcoming Q4 IC Review", client: "Kolkata Cloud Technologies Pvt Ltd", priority: "P2 - High", status: "In Progress", sla: "Within SLA (3h remaining)" },
    { id: "TKT-2026-0018", subject: "Annual Awareness E-learning Roster Import Issue", client: "Bengal Precision Engineering Ltd", priority: "P3 - Normal", status: "Resolved", sla: "SLA Met" },
    { id: "TKT-2026-0021", subject: "Inquiry on SHe-Box IC Registration Procedure", client: "Hooghly Logistics Corp", priority: "P3 - Normal", status: "Open", sla: "Within SLA (1d remaining)" },
  ];

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
                Client Support &bull; Section 8.29
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                POSH Operations Helpdesk &amp; Service Desk
              </h1>
            </div>
          </div>

          <Link
            href="/admin/delivery"
            className="px-3.5 py-1.5 border border-border rounded text-xs font-semibold hover:bg-surface text-ink"
          >
            Delivery SLA Board &rarr;
          </Link>
        </div>

        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <table className="w-full text-left">
            <thead className="bg-surface border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
              <tr>
                <th className="p-3.5">Ticket ID</th>
                <th className="p-3.5">Subject</th>
                <th className="p-3.5">Client Organisation</th>
                <th className="p-3.5">Priority</th>
                <th className="p-3.5">SLA Target</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-surface/50">
                  <td className="p-3.5 font-mono font-bold text-primary">{t.id}</td>
                  <td className="p-3.5 font-semibold text-ink">{t.subject}</td>
                  <td className="p-3.5 text-ink-secondary">{t.client}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      t.priority.startsWith("P2") ? "bg-amber-100 text-amber-800" : "bg-surface border border-border text-ink"
                    }`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="p-3.5 text-emerald-700 font-medium">{t.sla}</td>
                  <td className="p-3.5 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-light text-primary">
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

