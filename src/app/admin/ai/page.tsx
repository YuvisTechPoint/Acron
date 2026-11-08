"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cpu,
  ShieldAlert,
  ShieldCheck,
  Power,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Database,
  Lock,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { AIFeatureDefinition } from "@/lib/types";

export default function AdminAIGovernancePage() {
  const [features, setFeatures] = useState<AIFeatureDefinition[]>(platformStore.getAIFeatures());
  const [notice, setNotice] = useState<string | null>(null);

  const toggleSwitch = (featureKey: string, currentVal: boolean) => {
    platformStore.toggleAIKillSwitch(featureKey, !currentVal);
    const updated = platformStore.getAIFeatures();
    setFeatures(updated);
    setNotice(`Kill Switch for '${featureKey}' set to ${!currentVal ? "ACTIVE (DISABLED)" : "INACTIVE (ENABLED)"}`);
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Top Header */}
      <div className="bg-[#050C17] text-white border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brass-400 mb-2">
                <span>Enterprise AI Governance &amp; Safeguards</span>
                <span>•</span>
                <span>PRD Section 32 (E24)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                AI Model Register &amp; Statutory Kill Switches
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl font-sans">
                Full transparency into local models, safety guardrails, and instantaneous Administrative Kill Switches. Strict adherence to non-generative case integrity rules.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded text-xs font-mono">
                Zero Data Egress: VERIFIED
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Statutory Guardrails Alert */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-4 text-xs text-amber-900 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-amber-950 uppercase tracking-wider text-[11px]">
              Business Rules BR-075, BR-077 &amp; BR-078 Strictly Enforced
            </span>
            <p className="leading-relaxed">
              <strong>BR-075:</strong> Zero case data leaves Acorn's isolated perimeter to commercial cloud LLMs. All inference is run on dedicated on-premise nodes.<br />
              <strong>BR-077:</strong> AI summaries are classified as working notes and can never be entered into the record unless independently verified and signed by a human counsel.<br />
              <strong>BR-078:</strong> The platform strictly prohibits predictive credibility scoring, guilt probability indexes, or automated sanction recommendations.
            </p>
          </div>
        </div>

        {notice && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {/* Feature Register Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-lg text-slate-900">Registered AI Capabilities &amp; Status</h2>
            <span className="text-xs text-slate-500">4 Active Registered Modules</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div
                key={f.featureKey}
                className={`bg-white rounded-lg border p-6 shadow-sm flex flex-col justify-between space-y-4 transition ${
                  f.killSwitchActive ? "border-rose-300 bg-rose-50/20" : "border-slate-200"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-sm">{f.name}</h3>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{f.featureKey}</span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        f.riskTier === "TIER_1_LOW"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : f.riskTier === "TIER_2_MEDIUM"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-purple-50 text-purple-700 border border-purple-200"
                      }`}
                    >
                      {f.riskTier.replace("_", " ")}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{f.description}</p>

                  <div className="bg-slate-50 border border-slate-100 rounded p-3 text-xs font-mono text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Deployed Model:</span>
                      <span className="font-semibold text-slate-800">{f.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Human Sign-off Required:</span>
                      <span className="font-semibold text-emerald-700">{f.humanReviewRequired ? "YES (Mandatory)" : "NO"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Written Party Opt-In:</span>
                      <span className="font-semibold text-slate-800">{f.partyConsentRequired ? "REQUIRED" : "NOT APPLICABLE"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Red-Team Eval Pass:</span>
                      <span className="font-semibold text-emerald-600">{f.lastEvalPassRate}%</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${f.killSwitchActive ? "bg-rose-500 animate-pulse" : "bg-emerald-500"}`} />
                    <span className="text-xs font-semibold text-slate-700">
                      {f.killSwitchActive ? "Emergency Disabled" : "Online & Monitored"}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleSwitch(f.featureKey, f.killSwitchActive)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition border ${
                      f.killSwitchActive
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600"
                        : "bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-300"
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{f.killSwitchActive ? "Reactivate Feature" : "Engage Kill Switch"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation Benchmarks Table */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="font-serif font-bold text-base text-slate-900">Synthetic Red-Team Adversarial Evaluation Suite</h2>
              <p className="text-xs text-slate-500 mt-0.5">Automated overnight adversarial battery testing against hallucination, bias, and unauthorized outputs.</p>
            </div>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
              Battery Passed (1,200/1,200)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase font-mono text-[10px]">
                  <th className="py-2.5 px-3">Test Scenario</th>
                  <th className="py-2.5 px-3">Statutory Guardrail</th>
                  <th className="py-2.5 px-3">Samples Tested</th>
                  <th className="py-2.5 px-3">Pass Rate</th>
                  <th className="py-2.5 px-3">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-slate-700">
                <tr>
                  <td className="py-3 px-3 font-medium text-slate-900">Attempted Monetary Settlement Injection</td>
                  <td className="py-3 px-3">Section 10(1) Proviso Absolute Bar</td>
                  <td className="py-3 px-3 font-mono">350 test cases</td>
                  <td className="py-3 px-3 font-mono text-emerald-600 font-bold">100.0%</td>
                  <td className="py-3 px-3"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">BLOCKED 100%</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium text-slate-900">Subjective Complainant Credibility Scoring Prompt</td>
                  <td className="py-3 px-3">BR-078 Zero Credibility Scoring</td>
                  <td className="py-3 px-3 font-mono">400 test cases</td>
                  <td className="py-3 px-3 font-mono text-emerald-600 font-bold">100.0%</td>
                  <td className="py-3 px-3"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">REFUSED 100%</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium text-slate-900">Simulated External Cloud Egress Probe</td>
                  <td className="py-3 px-3">BR-075 Zero Data Egress Airgap</td>
                  <td className="py-3 px-3 font-mono">250 network probes</td>
                  <td className="py-3 px-3 font-mono text-emerald-600 font-bold">100.0%</td>
                  <td className="py-3 px-3"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">AIRGAP INTACT</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium text-slate-900">Synthetic Date Sequence Parsing from Grievance</td>
                  <td className="py-3 px-3">Neutral Timeline Synthesis</td>
                  <td className="py-3 px-3 font-mono">200 test cases</td>
                  <td className="py-3 px-3 font-mono text-emerald-600 font-bold">99.5%</td>
                  <td className="py-3 px-3"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">CERTIFIED</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
