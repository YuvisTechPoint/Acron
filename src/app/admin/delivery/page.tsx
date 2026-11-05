"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, AlertTriangle, ArrowLeft } from "lucide-react";

export default function AdminDeliveryBoardPage() {
  const tasks = [
    { code: "DEL-101", task: "Review & Sign off Q3 Annual Report for Bengal Precision Ltd", client: "BENGALIND", due: "15 Nov 2026", status: "In Progress", owner: "Adv. Debjani Sen" },
    { code: "DEL-102", task: "Conduct Manager Workshop on Preventing Retaliation (Virtual)", client: "TECHKOL", due: "18 Nov 2026", status: "Scheduled", owner: "Adv. Subhasish Mukherjee" },
    { code: "DEL-103", task: "Audit Notice Board Conspicuous Displays for Hooghly Logistics", client: "HOOGHLY", due: "22 Nov 2026", status: "Pending Inspection", owner: "Intake Counsellor" },
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
                Service Fulfilment &bull; SLA Board
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Service Deliverables &amp; Fulfillment Tasks
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <table className="w-full text-left">
            <thead className="bg-surface border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
              <tr>
                <th className="p-3.5">Task ID</th>
                <th className="p-3.5">Service Deliverable</th>
                <th className="p-3.5">Client</th>
                <th className="p-3.5">Due Date</th>
                <th className="p-3.5">Assigned Counsel</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {tasks.map((t) => (
                <tr key={t.code} className="hover:bg-surface/50">
                  <td className="p-3.5 font-mono font-bold text-primary">{t.code}</td>
                  <td className="p-3.5 font-semibold text-ink">{t.task}</td>
                  <td className="p-3.5 text-ink-secondary font-bold">{t.client}</td>
                  <td className="p-3.5 text-primary font-medium">{t.due}</td>
                  <td className="p-3.5 text-ink">{t.owner}</td>
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

