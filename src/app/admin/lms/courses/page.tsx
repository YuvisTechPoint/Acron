"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, ArrowLeft, CheckCircle2, Plus } from "lucide-react";

export default function AdminLMSCourseBuilderPage() {
  const courses = [
    { code: "TRN-101", title: "Understanding the POSH Act and your rights", audience: "All employees", duration: "35 mins", passMark: "80%" },
    { code: "TRN-102", title: "Respectful workplaces: what is and is not acceptable", audience: "All employees", duration: "25 mins", passMark: "80%" },
    { code: "TRN-201", title: "Managers: responding to disclosures and preventing retaliation", audience: "People managers", duration: "45 mins", passMark: "80%" },
    { code: "TRN-301", title: "IC members: procedure, natural justice and confidentiality", audience: "IC members", duration: "3 hours", passMark: "Mock Assessment" },
    { code: "TRN-401", title: "Remote and hybrid work: online harassment and evidence", audience: "All employees", duration: "20 mins", passMark: "80%" },
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
                E-Learning &bull; Section 8.23
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Statutory POSH Course &amp; Quiz Builder
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <table className="w-full text-left">
            <thead className="bg-surface border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
              <tr>
                <th className="p-3.5">Code</th>
                <th className="p-3.5">Course Title</th>
                <th className="p-3.5">Target Audience</th>
                <th className="p-3.5">Duration</th>
                <th className="p-3.5">Assessment Standard</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {courses.map((c) => (
                <tr key={c.code} className="hover:bg-surface/50">
                  <td className="p-3.5 font-mono font-bold text-primary">{c.code}</td>
                  <td className="p-3.5 font-semibold text-ink">{c.title}</td>
                  <td className="p-3.5 text-ink-secondary">{c.audience}</td>
                  <td className="p-3.5 text-ink-secondary">{c.duration}</td>
                  <td className="p-3.5 text-ink-secondary font-medium">{c.passMark}</td>
                  <td className="p-3.5 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      PUBLISHED
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

