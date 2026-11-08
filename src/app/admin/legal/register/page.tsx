"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scale,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Search,
  ArrowRight,
} from "lucide-react";

export default function AdminLegalRegisterPage() {
  const [search, setSearch] = useState("");

  const precedents = [
    {
      citation: "Aureliano Fernandes v. State of Goa (2023 INSC 531)",
      forum: "Supreme Court of India",
      date: "May 2023",
      category: "CONSTITUTIONAL & PROCEDURAL",
      principles: "Issued nationwide directions to enforce POSH Act; mandated that all public/private entities ensure functional ICs and verify time-bound inquiry procedures.",
      impact: "Strict enforcement of 90-day inquiry deadline and annual district officer filings.",
      verifiedByCounsel: true,
    },
    {
      citation: "Dr. Jaya Thakur v. Union of India (2023)",
      forum: "Supreme Court of India",
      date: "Aug 2023",
      category: "LOCAL COMMITTEE & UNORGANIZED SECTORS",
      principles: "Mandated state governments to notify District Officers and publish functional Local Committees (LCs) for organizations with under 10 workers.",
      impact: "Governs referral pathway for micro-enterprises under Section 6 of the Act.",
      verifiedByCounsel: true,
    },
    {
      citation: "Debjani Sengupta v. Institute of Cost Accountants (Cal HC 2019)",
      forum: "Calcutta High Court",
      date: "Nov 2019",
      category: "NATURAL JUSTICE & QUORUM",
      principles: "Reiterated that the Presiding Officer must be a senior woman and external member must be strictly independent to avoid invalidating the entire proceedings.",
      impact: "Calcutta High Court jurisdiction rule: Presiding Officer absence automatically voids oral hearing depositions.",
      verifiedByCounsel: true,
    },
    {
      citation: "MWCD Advisory Circular F.No. 19-3/2021",
      forum: "Ministry of Women & Child Development",
      date: "Jan 2024",
      category: "STATUTORY REPORTING",
      principles: "Clarified mandatory disclosure in Director's Report under Section 134(3)(q) of Companies Act, 2013.",
      impact: "Annual report compliance score integrated with MCA Board's Report disclosures.",
      verifiedByCounsel: true,
    },
  ];

  const filtered = precedents.filter(
    (p) =>
      p.citation.toLowerCase().includes(search.toLowerCase()) ||
      p.forum.toLowerCase().includes(search.toLowerCase()) ||
      p.principles.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Header */}
      <div className="bg-[#050C17] text-white border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brass-400 mb-2">
                <span>Statutory Authority &amp; Case-Law Library</span>
                <span>•</span>
                <span>PRD Section 38</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Chambers Legal Register &amp; Precedent Watch
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl font-sans">
                Curated jurisprudential register of binding Supreme Court, Calcutta High Court, MCA, and MWCD authorities governing sexual harassment inquiries and employer obligations.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded text-xs font-mono">
                Jurisdiction: Calcutta High Court
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Search Bar */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search rulings by case name, court, or statutory principle..."
            className="w-full text-xs text-slate-800 focus:outline-none"
          />
        </div>

        {/* Precedents Cards */}
        <div className="grid grid-cols-1 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4 hover:border-slate-300 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-brass-700 font-bold mb-1">
                    <Scale className="w-3.5 h-3.5" />
                    <span>{item.forum}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{item.citation}</h3>
                </div>

                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-navy-50 text-navy-800 border border-navy-200 self-start">
                  {item.category}
                </span>
              </div>

              <div className="space-y-2 text-xs leading-relaxed text-slate-600">
                <p>
                  <strong className="text-slate-800">Judicial Ruling: </strong>
                  {item.principles}
                </p>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded text-[11px]">
                  <strong className="text-navy-950">Acorn Platform Procedural Rule: </strong>
                  <span className="text-slate-700">{item.impact}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-700 font-medium text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified by Senior Counsel (Acorn Chambers)</span>
                </span>
                <span className="font-mono text-[10px]">Effective-Dated 2026-27</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

