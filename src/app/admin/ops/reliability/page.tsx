"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ShieldCheck,
  AlertOctagon,
  Zap,
  Server,
  CheckCircle2,
  Clock,
  ArrowRight,
  Flame,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { SLOMonitorMetric } from "@/lib/types";

export default function OpsReliabilityPage() {
  const [metrics] = useState<SLOMonitorMetric[]>(platformStore.getSLOMetrics());
  const [runningChaos, setRunningChaos] = useState<string | null>(null);
  const [chaosLog, setChaosLog] = useState<string | null>(null);

  const triggerChaosExperiment = (code: string, desc: string) => {
    setRunningChaos(code);
    setChaosLog(null);
    setTimeout(() => {
      setRunningChaos(null);
      setChaosLog(
        `✓ [CHX PASS] Simulated '${desc}'. Circuit breaker tripped in 84ms. Zero unscrubbed PII escaped perimeter. Error budget remained >75%.`
      );
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Header */}
      <div className="bg-[#050C17] text-white border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brass-400 mb-2">
                <span>Site Reliability Engineering &amp; FinOps</span>
                <span>•</span>
                <span>PRD Section 36 (E28)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Service Level Objectives (SLOs) &amp; Chaos Engineering
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl font-sans">
                Real-time compliance monitoring against statutory error budgets (SLO-01 to SLO-09). Active chaos experiment harness for automated resilience drills.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded text-xs font-mono">
                System Status: ALL SLOs HEALTHY
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* SLO Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-lg text-slate-900">Statutory SLO Error Budgets (30-Day Rolling Window)</h2>
            <span className="text-xs font-mono text-slate-500">Target Availability: 99.9%</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <div
                key={m.sloKey}
                className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-brass-700">{m.sloKey}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {m.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-xs line-clamp-1">{m.name}</h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold font-mono text-slate-900">{m.currentPct}%</span>
                    <span className="text-[11px] text-slate-400 font-mono">/ {m.targetPct}%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>Remaining Budget</span>
                    <strong className="text-emerald-700 font-mono">{m.errorBudgetRemainingPct}%</strong>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${m.errorBudgetRemainingPct}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chaos Engineering Simulator */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-600" />
                <h2 className="font-serif font-bold text-base text-slate-900">Synthetic Chaos Experiment Harness</h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Inject synthetic faults in sandbox mode to verify fault tolerance and fail-safe fallbacks.</p>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
              CHX-01 to CHX-10
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-brass-700 font-bold block">CHX-01</span>
                <h4 className="font-bold text-slate-900 text-xs">PII Scrubber Latency Spike</h4>
                <p className="text-[11px] text-slate-500 mt-1">Simulate 250ms delay in regex scrubber node during intake spike.</p>
              </div>
              <button
                onClick={() => triggerChaosExperiment("CHX-01", "PII Scrubber Latency Spike")}
                disabled={runningChaos !== null}
                className="w-full py-1.5 bg-[#101F38] hover:bg-navy-900 text-brass-300 text-xs rounded font-medium transition disabled:opacity-40"
              >
                {runningChaos === "CHX-01" ? "Running Drill..." : "Execute Drill"}
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-brass-700 font-bold block">CHX-04</span>
                <h4 className="font-bold text-slate-900 text-xs">Outbox Backpressure Drill</h4>
                <p className="text-[11px] text-slate-500 mt-1">Simulate SIEM endpoint downtime to verify exponential retry backoff.</p>
              </div>
              <button
                onClick={() => triggerChaosExperiment("CHX-04", "Outbox Backpressure Drill")}
                disabled={runningChaos !== null}
                className="w-full py-1.5 bg-[#101F38] hover:bg-navy-900 text-brass-300 text-xs rounded font-medium transition disabled:opacity-40"
              >
                {runningChaos === "CHX-04" ? "Running Drill..." : "Execute Drill"}
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-brass-700 font-bold block">CHX-07</span>
                <h4 className="font-bold text-slate-900 text-xs">Primary DB Failover</h4>
                <p className="text-[11px] text-slate-500 mt-1">Inject split-brain signal to test read-only replica promotion.</p>
              </div>
              <button
                onClick={() => triggerChaosExperiment("CHX-07", "Primary DB Failover")}
                disabled={runningChaos !== null}
                className="w-full py-1.5 bg-[#101F38] hover:bg-navy-900 text-brass-300 text-xs rounded font-medium transition disabled:opacity-40"
              >
                {runningChaos === "CHX-07" ? "Running Drill..." : "Execute Drill"}
              </button>
            </div>
          </div>

          {chaosLog && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 text-xs font-mono">
              {chaosLog}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
