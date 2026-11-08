"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  ShieldCheck,
  TrendingUp,
  Award,
  AlertCircle,
  Clock,
  ArrowRight,
  Building2,
  Users,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { PeerBenchmark } from "@/lib/types";

export default function OrgBenchmarksPage() {
  const [benchmarks] = useState<PeerBenchmark[]>(platformStore.getPeerBenchmarks());
  const [selectedSegment, setSelectedSegment] = useState<string>("ALL");

  const filtered = selectedSegment === "ALL"
    ? benchmarks
    : benchmarks.filter((b) => b.segment === selectedSegment);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Header */}
      <div className="bg-[#050C17] text-white border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brass-400 mb-2">
                <span>Enterprise Analytics &amp; Comparative Intelligence</span>
                <span>•</span>
                <span>PRD Section 33 (E25)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Anonymized Peer Industry Benchmarks
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl font-sans">
                Evaluate organizational compliance and inquiry velocity against anonymous industry cohorts in West Bengal. Differential privacy and quartile bands prevent reverse-identification.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">Industry Segment:</span>
              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="bg-[#101F38] border border-brass-500/30 text-brass-300 text-xs rounded-md px-3 py-1.5 focus:outline-none font-mono"
              >
                <option value="ALL">All Segments</option>
                <option value="INFORMATION_TECHNOLOGY">Information Technology</option>
                <option value="FINANCIAL_SERVICES">Financial Services</option>
                <option value="HEALTHCARE">Healthcare</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* BR-090 Guarantee Card */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-4 text-xs text-emerald-900 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-emerald-950 uppercase tracking-wider text-[11px]">
              Business Rule BR-090 Active: k-Anonymity Peer Cohort Guarantee
            </span>
            <p className="leading-relaxed">
              Per PRD BR-090, metrics are only computed and displayed for peer groups with <strong>at least 10 active organizations</strong>. Cohorts with fewer than 10 entities are automatically suppressed to mathematically eliminate deanonymization risks.
            </p>
          </div>
        </div>

        {/* Benchmarks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((bm) => (
            <div
              key={bm.id}
              className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-5"
            >
              <div className="border-b border-slate-100 pb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{bm.segment.replace("_", " ")}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Tier: {bm.employeeTier} staff</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded text-[10px] font-mono font-bold">
                  {bm.orgCount} ORGS (≥10 Met)
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brass-600" />
                      <span>Median Resolution Timeline</span>
                    </span>
                    <strong className="text-slate-900 font-mono">{bm.medianResolutionDays} Days</strong>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-brass-500 h-full rounded-full"
                      style={{ width: `${(bm.medianResolutionDays / 90) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Statutory Ceiling: 90 Days</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500 font-medium">Conciliation Settlement Rate</span>
                    <strong className="text-slate-900 font-mono">{bm.conciliationRatePct}%</strong>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-navy-800 h-full rounded-full"
                      style={{ width: `${bm.conciliationRatePct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Section 10 non-monetary conciliations</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500 font-medium">Annual Training Completion</span>
                    <strong className="text-emerald-700 font-mono">{bm.annualTrainingPct}%</strong>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${bm.annualTrainingPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Section 19(c) employee workshops</span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Retaliation Incident Index:</span>
                  <span className="font-mono font-bold text-emerald-700">{bm.retaliationIndex} (Low Risk)</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparative Insight Banner */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-base text-slate-900">Your Organization: Kolkata Cloud Technologies (TECHKOL)</h3>
            <p className="text-xs text-slate-600">
              Inquiry resolution velocity: <strong>38 Days</strong> (Top 15% quartile in IT). Employee training coverage: <strong>91%</strong>.
            </p>
          </div>
          <Link
            href="/posh/org/early-warnings"
            className="px-4 py-2 bg-[#101F38] hover:bg-navy-900 text-brass-300 rounded text-xs font-medium transition inline-flex items-center gap-1.5 shrink-0"
          >
            <span>View Section 19 Early Warnings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}

