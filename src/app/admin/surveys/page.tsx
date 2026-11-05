"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckSquare, ArrowLeft, ShieldCheck, Plus } from "lucide-react";

export default function AdminSurveysPage() {
  const surveys = [
    { id: "srv-1", name: "Annual POSH Workplace Climate & Culture Survey 2026", type: "Anonymous Climate Survey", questions: 14, responses: 312, status: "Active" },
    { id: "srv-2", name: "Workplace Risk Assessment & Hotspot Audit", type: "Risk Assessment (HR & IC)", questions: 22, responses: 4, status: "Completed" },
    { id: "srv-3", name: "Post-Inquiry Redressal Experience Feedback", type: "Process Feedback (Anonymized)", questions: 6, responses: 12, status: "Ongoing" },
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
                Prevention &amp; Climate &bull; Section 8.24
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Workplace Climate Survey &amp; Risk Audit Builder
              </h1>
            </div>
          </div>
        </div>

        <div className="p-4 bg-emerald-50 rounded border border-emerald-300 text-xs text-emerald-950 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <span>
            <strong>K-Anonymity Privacy Guarantee (PRD Rule BR-045):</strong> Survey response reporting enforces minimum 5-respondent cell suppression. Data from smaller groups is automatically merged to prevent re-identification.
          </span>
        </div>

        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <table className="w-full text-left">
            <thead className="bg-surface border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
              <tr>
                <th className="p-3.5">Survey Title</th>
                <th className="p-3.5">Instrument Type</th>
                <th className="p-3.5">Questions</th>
                <th className="p-3.5">Responses Logged</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {surveys.map((s) => (
                <tr key={s.id} className="hover:bg-surface/50">
                  <td className="p-3.5 font-semibold text-ink">{s.name}</td>
                  <td className="p-3.5 text-ink-secondary">{s.type}</td>
                  <td className="p-3.5 text-ink-secondary">{s.questions} Items</td>
                  <td className="p-3.5 font-bold text-primary">{s.responses} Verified</td>
                  <td className="p-3.5 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-light text-primary">
                      {s.status}
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

