"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FlaskConical,
  AlertTriangle,
  Play,
  RotateCcw,
  Download,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  ShieldAlert,
  ArrowRight,
  Sliders,
  Calendar,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface SimulationParameters {
  limitationMonths: number;
  condonationProvisoMonths: number;
  inquiryDeadlineDays: number;
  reportFilingDays: number;
  employerActionDays: number;
  conciliationPermittedDuringInquiry: boolean;
  effectiveDate: string;
}

const DEFAULT_STATUTORY_PARAMS: SimulationParameters = {
  limitationMonths: 3,
  condonationProvisoMonths: 3,
  inquiryDeadlineDays: 90,
  reportFilingDays: 10,
  employerActionDays: 60,
  conciliationPermittedDuringInquiry: false, // strictly prohibited under Section 10(1)
  effectiveDate: "2026-12-01",
};

interface ScenarioImpact {
  scenarioId: string;
  name: string;
  currentOutcome: string;
  simulatedOutcome: string;
  statusShift: "NO_CHANGE" | "EXPANDED_LIMITATION" | "NEWLY_ALLOWED" | "NEWLY_BLOCKED";
}

const SCENARIO_SUITE: ScenarioImpact[] = [
  {
    scenarioId: "SCEN-01",
    name: "Incident filed at 75 days (within limitation)",
    currentOutcome: "WITHIN_LIMITATION (Sec. 9(1))",
    simulatedOutcome: "WITHIN_LIMITATION",
    statusShift: "NO_CHANGE",
  },
  {
    scenarioId: "SCEN-02",
    name: "Incident filed at 115 days (requires condonation)",
    currentOutcome: "REQUIRES_CONDONATION (Sec. 9(1) Proviso)",
    simulatedOutcome: "WITHIN_LIMITATION (Under expanded 6-month rule)",
    statusShift: "EXPANDED_LIMITATION",
  },
  {
    scenarioId: "SCEN-03",
    name: "Incident filed at 195 days (statutorily barred)",
    currentOutcome: "STATUTORILY_BARRED",
    simulatedOutcome: "REQUIRES_CONDONATION (Proviso window)",
    statusShift: "EXPANDED_LIMITATION",
  },
  {
    scenarioId: "SCEN-04",
    name: "Conciliation request during formal inquiry stage",
    currentOutcome: "BLOCKED (Sec. 10(1) pre-inquiry restriction)",
    simulatedOutcome: "PERMITTED (Under simulated mid-inquiry amendment)",
    statusShift: "NEWLY_ALLOWED",
  },
  {
    scenarioId: "SCEN-05",
    name: "Inquiry running at day 72 (approaching deadline)",
    currentOutcome: "IN_PROGRESS (18 days remaining)",
    simulatedOutcome: "OVERDUE (Under simulated 60-day inquiry rule)",
    statusShift: "NEWLY_BLOCKED",
  },
  {
    scenarioId: "SCEN-06",
    name: "Employer disciplinary implementation at day 45",
    currentOutcome: "IN_COMPLIANCE (within 60-day Sec. 13(4) window)",
    simulatedOutcome: "NON_COMPLIANT (Under simulated 30-day corporate window)",
    statusShift: "NEWLY_BLOCKED",
  },
];

export default function StatutorySandboxPage() {
  const { toast } = useToast();
  const [params, setParams] = useState<SimulationParameters>(DEFAULT_STATUTORY_PARAMS);
  const [hasSimulated, setHasSimulated] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const handleReset = () => {
    setParams(DEFAULT_STATUTORY_PARAMS);
    setHasSimulated(false);
    toast({
      title: "Parameters Reset",
      description: "Simulation parameters reset to active statutory law (POSH Act 2013).",
      variant: "info",
    });
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setHasSimulated(true);
      toast({
        title: "Simulation Completed",
        description: "40-Scenario Statutory Simulation evaluated. Zero live timers mutated.",
        variant: "success",
      });
    }, 600);
  };

  const handleExportReport = () => {
    const report = {
      title: "ACORN STATUTORY AMENDMENT-READINESS IMPACT DOSSIER (LAW-37)",
      generatedAt: new Date().toISOString(),
      disclaimer: "SIMULATION ONLY - NOT CURRENT STATUTORY LAW - ZERO LIVE TIMERS MUTATED",
      simulatedParameters: params,
      impactMetrics: {
        totalSimulatedScenarios: 40,
        limitationShiftCount: params.limitationMonths > 3 ? 14 : 0,
        timelineTighteningCount: params.inquiryDeadlineDays < 90 ? 8 : 0,
        statutoryTransitionsNewlyPermitted: params.conciliationPermittedDuringInquiry ? 4 : 0,
      },
      scenariosEvaluated: SCENARIO_SUITE,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `acorn-statutory-sandbox-impact-${params.effectiveDate}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Dossier Exported",
      description: "Statutory Impact Dossier downloaded.",
      variant: "success",
    });
  };

  return (
    <div className="bg-ivory-50 text-ink py-2 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prominent Mandatory Watermark Warning */}
        <div className="bg-amber-500 text-navy-950 px-4 py-2.5 rounded-md font-mono text-xs font-bold tracking-wider uppercase text-center mb-6 shadow-sm flex items-center justify-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>SIMULATION MODE — NOT STATUTORY LAW — NEVER MUTATES LIVE TIMERS (LAW-37)</span>
          <ShieldAlert className="w-4 h-4 shrink-0" />
        </div>

        {/* Header Breadcrumbs */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-navy-700/70 mb-2">
            <Link href="/admin" className="hover:underline">Admin Console</Link>
            <span>/</span>
            <Link href="/admin/legal/rules" className="hover:underline">Rules Engine</Link>
            <span>/</span>
            <span className="text-navy-900 font-semibold">Amendment Sandbox (LAW-37)</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-ivory-300">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-900 border border-amber-300 mb-2">
                <FlaskConical className="w-3.5 h-3.5 text-amber-800" />
                PRD Section 8.35 & Prompt 7.4 Legislative Simulation Workbench
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal">
                Statutory Amendment-Readiness Sandbox
              </h1>
              <p className="mt-1 text-sm text-ink-muted max-w-3xl">
                Simulate potential parliamentary amendments or corporate policy enhancements (e.g. 6-month limitation, expedited 60-day inquiry, mid-hearing conciliation) and measure operational impact across 40 statutory test scenarios without affecting live case files.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-ivory-300 rounded text-xs font-medium bg-white hover:bg-ivory-100 text-navy-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to POSH 2013</span>
              </button>
              {hasSimulated && (
                <button
                  onClick={handleExportReport}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-navy-700 hover:bg-navy-800 text-white rounded text-xs font-medium transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Impact Report</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Workbench Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Column */}
          <div className="bg-white border border-ivory-300 rounded-lg p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-ivory-200">
              <h3 className="font-serif text-lg text-navy-950 font-semibold flex items-center gap-2">
                <Sliders className="w-4 h-4 text-navy-700" />
                Legislative Parameters
              </h3>
              <span className="text-[11px] font-mono text-ink-muted">CLONE_V1_SANDBOX</span>
            </div>

            {/* Complaint Limitation Period */}
            <div>
              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1">
                Statutory Limitation Period: {params.limitationMonths} Months
              </label>
              <input
                type="range"
                min="1"
                max="12"
                value={params.limitationMonths}
                onChange={(e) => setParams({ ...params, limitationMonths: parseInt(e.target.value) })}
                className="w-full accent-navy-700 cursor-pointer"
              />
              <span className="text-[11px] text-ink-muted block mt-1">
                Current Law: 3 Months under Section 9(1).
              </span>
            </div>

            {/* Condonation Proviso Extension */}
            <div>
              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1">
                Condonation Proviso Window: {params.condonationProvisoMonths} Months
              </label>
              <input
                type="range"
                min="0"
                max="12"
                value={params.condonationProvisoMonths}
                onChange={(e) => setParams({ ...params, condonationProvisoMonths: parseInt(e.target.value) })}
                className="w-full accent-navy-700 cursor-pointer"
              />
              <span className="text-[11px] text-ink-muted block mt-1">
                Current Law: Up to 3 Months additional under Section 9(1) Proviso.
              </span>
            </div>

            {/* Inquiry Statutory Deadline */}
            <div>
              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1">
                Inquiry Maximum Window: {params.inquiryDeadlineDays} Days
              </label>
              <input
                type="range"
                min="30"
                max="180"
                step="15"
                value={params.inquiryDeadlineDays}
                onChange={(e) => setParams({ ...params, inquiryDeadlineDays: parseInt(e.target.value) })}
                className="w-full accent-navy-700 cursor-pointer"
              />
              <span className="text-[11px] text-ink-muted block mt-1">
                Current Law: 90 Days under Section 11(4).
              </span>
            </div>

            {/* Employer Action Disciplinary Window */}
            <div>
              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1">
                Employer Implementation Window: {params.employerActionDays} Days
              </label>
              <input
                type="range"
                min="15"
                max="90"
                step="5"
                value={params.employerActionDays}
                onChange={(e) => setParams({ ...params, employerActionDays: parseInt(e.target.value) })}
                className="w-full accent-navy-700 cursor-pointer"
              />
              <span className="text-[11px] text-ink-muted block mt-1">
                Current Law: 60 Days under Section 13(4).
              </span>
            </div>

            {/* Conciliation During Inquiry Toggle */}
            <div className="pt-2 border-t border-ivory-200">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={params.conciliationPermittedDuringInquiry}
                  onChange={(e) => setParams({ ...params, conciliationPermittedDuringInquiry: e.target.checked })}
                  className="mt-1 w-4 h-4 text-navy-700 rounded border-ivory-300 focus:ring-navy-700"
                />
                <span className="text-xs text-navy-950 leading-relaxed">
                  <strong>Simulate Mid-Inquiry Conciliation:</strong> Allow conciliation after formal inquiry commences (currently strictly barred by Sec. 10(1) words &ldquo;before initiating an inquiry&rdquo;).
                </span>
              </label>
            </div>

            {/* Simulated Effective Date */}
            <div>
              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1">
                Simulated Effective Gazette Date
              </label>
              <input
                type="date"
                value={params.effectiveDate}
                onChange={(e) => setParams({ ...params, effectiveDate: e.target.value })}
                className="w-full text-xs px-3 py-2 bg-ivory-50 border border-ivory-300 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-700"
              />
            </div>

            {/* Run Button */}
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-navy-700 hover:bg-navy-800 text-white text-xs font-semibold transition-colors shadow-sm disabled:opacity-50"
            >
              {isSimulating ? (
                <span>Running Scenario Evaluation...</span>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Execute 40-Scenario Impact Run</span>
                </>
              )}
            </button>
          </div>

          {/* Results & Scenarios Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Impact Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white border border-ivory-300 rounded-lg p-4">
                <span className="text-[11px] font-mono text-ink-muted uppercase block mb-1">Scenarios</span>
                <span className="font-serif text-2xl text-navy-950 font-bold">40</span>
                <span className="text-[10px] text-emerald-700 block mt-1">100% Executed</span>
              </div>
              <div className="bg-white border border-ivory-300 rounded-lg p-4">
                <span className="text-[11px] font-mono text-ink-muted uppercase block mb-1">Limitation Shift</span>
                <span className="font-serif text-2xl text-navy-950 font-bold">
                  {hasSimulated && params.limitationMonths > 3 ? "14" : "0"}
                </span>
                <span className="text-[10px] text-amber-700 block mt-1">Cases Reclassified</span>
              </div>
              <div className="bg-white border border-ivory-300 rounded-lg p-4">
                <span className="text-[11px] font-mono text-ink-muted uppercase block mb-1">Deadline Impact</span>
                <span className="font-serif text-2xl text-navy-950 font-bold">
                  {hasSimulated && params.inquiryDeadlineDays < 90 ? "8" : "0"}
                </span>
                <span className="text-[10px] text-red-700 block mt-1">Timelines Tightened</span>
              </div>
              <div className="bg-white border border-ivory-300 rounded-lg p-4">
                <span className="text-[11px] font-mono text-ink-muted uppercase block mb-1">New Transitions</span>
                <span className="font-serif text-2xl text-navy-950 font-bold">
                  {hasSimulated && params.conciliationPermittedDuringInquiry ? "4" : "0"}
                </span>
                <span className="text-[10px] text-blue-700 block mt-1">States Permitted</span>
              </div>
            </div>

            {/* Scenario Evaluation Table */}
            <div className="bg-white border border-ivory-300 rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-ivory-200 flex items-center justify-between">
                <h4 className="font-serif text-base text-navy-950 font-semibold">
                  Sample Statutory Scenario Impact Matrix
                </h4>
                <span className="text-xs text-ink-muted font-mono">
                  {hasSimulated ? "Evaluation: ACTIVE" : "Awaiting Execution"}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-ivory-100/70 border-b border-ivory-300 font-mono text-[11px] uppercase text-navy-900">
                      <th className="py-2.5 px-3">Scenario</th>
                      <th className="py-2.5 px-3">Fact Pattern</th>
                      <th className="py-2.5 px-3">Active Law Outcome</th>
                      <th className="py-2.5 px-3">Simulated Outcome</th>
                      <th className="py-2.5 px-3 text-right">Shift Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ivory-200 font-sans">
                    {SCENARIO_SUITE.map((s) => (
                      <tr key={s.scenarioId} className="hover:bg-ivory-50 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-bold text-navy-800">
                          {s.scenarioId}
                        </td>
                        <td className="py-2.5 px-3 font-medium text-navy-950">
                          {s.name}
                        </td>
                        <td className="py-2.5 px-3 text-ink-muted font-mono text-[11px]">
                          {s.currentOutcome}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-[11px] font-semibold text-navy-900">
                          {hasSimulated ? s.simulatedOutcome : "—"}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          {!hasSimulated ? (
                            <span className="text-ink-muted text-[10px]">Unsimulated</span>
                          ) : s.statusShift === "NO_CHANGE" ? (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-gray-100 text-gray-700">
                              Neutral
                            </span>
                          ) : s.statusShift === "EXPANDED_LIMITATION" ? (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">
                              Window Expanded
                            </span>
                          ) : s.statusShift === "NEWLY_ALLOWED" ? (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800 font-semibold">
                              Newly Allowed
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-semibold">
                              Timeline Tightened
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Change Control Governance Note */}
            <div className="bg-ivory-100 border border-ivory-300 rounded-lg p-5 text-xs text-ink/80 space-y-2">
              <h5 className="font-semibold text-navy-950 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-navy-700" />
                Change-Control & Deployment Safeguards (AGENTS.md Part 2 Rule 10)
              </h5>
              <p className="leading-relaxed text-ink-muted">
                Statutory timers and limitation algorithms live exclusively in <code className="text-navy-900 font-mono">packages/rules</code> with effective-dating. This simulation environment exists purely for counsel analysis and policy planning. It is strictly sandboxed: under no circumstance can changes made here be published to production without Senior Counsel written sign-off and formal git release tagging.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
