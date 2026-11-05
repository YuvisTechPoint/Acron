"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, Clock, CheckCircle2, ArrowLeft, AlertCircle } from "lucide-react";

export default function LegalWatchListPage() {
  const watchItems = [
    {
      ref: "LAW-05",
      title: "Supreme Court Directions (Aureliano Fernandes Implementation)",
      subject: "District Officer notification, Nodal Officer 7-day forwarding, Local Committee status.",
      owner: "Adv. Debjani Sen",
      reviewDate: "Quarterly (Q4 2026)",
      status: "In Compliance & Tracking",
    },
    {
      ref: "LAW-27",
      title: "Companies (Accounts) Second Amendment Rules 2025",
      subject: "Mandatory Board Report disclosures: complaints received, disposed of, pending >90 days, gender counts.",
      owner: "Adv. Subhasish Mukherjee",
      reviewDate: "Annual (31 March 2027)",
      status: "Active (Effective 14 July 2025)",
    },
    {
      ref: "LAW-29",
      title: "Digital Personal Data Protection Act 2023 & Rules 2025",
      subject: "Consent manager rules, retention review, data fiduciary security obligations.",
      owner: "Technical Lead",
      reviewDate: "Semi-Annual (May 2027)",
      status: "Monitored",
    },
    {
      ref: "LAW-32",
      title: "Bar Council of India Rule 36 & Advisories",
      subject: "Prohibition on advertising and solicitation for legal practitioners.",
      owner: "Managing Partner",
      reviewDate: "Continuous",
      status: "Strictly Enforced",
    },
    {
      ref: "LAW-40",
      title: "SHe-Box Revamped Portal (MWCD)",
      subject: "Central portal complaint routing and private sector IC registration mandates.",
      owner: "POSH Administrator",
      reviewDate: "Monthly",
      status: "Integrated Helper",
    },
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
                Regulatory Horizon &bull; Section 8.30
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Statutory Judicial &amp; Regulatory Watch List
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <table className="w-full text-left">
            <thead className="bg-surface border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
              <tr>
                <th className="p-3.5">Ref</th>
                <th className="p-3.5">Statutory Subject &amp; Judicial Source</th>
                <th className="p-3.5">Review Owner</th>
                <th className="p-3.5">Next Review Date</th>
                <th className="p-3.5 text-right">Monitoring Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {watchItems.map((item) => (
                <tr key={item.ref} className="hover:bg-surface/50">
                  <td className="p-3.5 font-mono font-bold text-primary">{item.ref}</td>
                  <td className="p-3.5 space-y-0.5">
                    <div className="font-semibold text-ink">{item.title}</div>
                    <div className="text-[11px] text-ink-secondary">{item.subject}</div>
                  </td>
                  <td className="p-3.5 text-ink font-medium">{item.owner}</td>
                  <td className="p-3.5 text-ink-secondary">{item.reviewDate}</td>
                  <td className="p-3.5 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-light text-primary">
                      {item.status}
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

