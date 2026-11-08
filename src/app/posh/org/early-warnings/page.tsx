"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Building,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  Info,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { EarlyWarningSignal } from "@/lib/types";

export default function OrgEarlyWarningsPage() {
  const [warnings, setWarnings] = useState<EarlyWarningSignal[]>(platformStore.getEarlyWarnings("TECHKOL"));
  const [actionDone, setActionDone] = useState<string | null>(null);

  const markActionInitiated = (id: string, metric: string) => {
    setActionDone(`Statutory preventive advisory generated for '${metric}'. Logged in Section 19 compliance ledger.`);
    setTimeout(() => setActionDone(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Header */}
      <div className="bg-[#050C17] text-white border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brass-400 mb-2">
                <span>Preventive Governance &amp; Risk Detection</span>
                <span>•</span>
                <span>PRD Section 33 (E25)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Section 19 Preventive Early Warning Signals
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl font-sans">
                Real-time leading indicators derived from anonymized climate surveys, transport manifests, and policy sign-offs to remediate friction before formal grievances arise.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-950/80 border border-amber-500/40 text-amber-300 rounded text-xs font-mono">
                Active Signals: 3 Monitored
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Statutory Context Alert */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-lg p-4 text-xs text-blue-900 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-blue-950 uppercase tracking-wider text-[11px]">
              Employer Duty under Section 19(a) of the POSH Act, 2013
            </span>
            <p className="leading-relaxed">
              Employers must provide a safe working environment at the workplace which shall include safety from the persons coming into contact at the workplace. Early warnings surface structural blindspots (such as late-night client visits and vendor transit) before escalation.
            </p>
          </div>
        </div>

        {actionDone && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionDone}</span>
          </div>
        )}

        {/* Signals List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-lg text-slate-900">Departmental Risk Signals</h2>
            <span className="text-xs text-slate-500">Tenant: TECHKOL (Kolkata Cloud Technologies)</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {warnings.map((w) => (
              <div
                key={w.id}
                className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-300 transition"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                        w.riskLevel === "HIGH"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : w.riskLevel === "MEDIUM"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {w.riskLevel} PRIORITY
                    </span>
                    <span className="text-xs font-semibold text-navy-900 font-mono">{w.department}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm">{w.metricName}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-slate-50 p-2.5 rounded border border-slate-100">
                    <div>
                      <span className="text-slate-400">Statutory Benchmark: </span>
                      <strong className="text-slate-700">{w.threshold}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Current Reading: </span>
                      <strong className="text-rose-700">{w.currentVal}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 font-sans">
                    <strong className="text-slate-800">Counsel Recommended Intervention:</strong> {w.suggestedIntervention}
                  </p>
                </div>

                <div className="shrink-0 flex md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                  <button
                    onClick={() => markActionInitiated(w.id, w.metricName)}
                    className="px-4 py-2 bg-[#101F38] hover:bg-navy-900 text-brass-300 rounded text-xs font-medium transition"
                  >
                    Initiate Preventive Advisory
                  </button>
                  <Link
                    href="/posh/org/training"
                    className="text-[11px] text-slate-500 hover:text-slate-800 transition inline-flex items-center gap-1"
                  >
                    <span>Schedule Awareness Session</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

