"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  AlertTriangle,
  ArrowLeft,
  PenTool,
} from "lucide-react";

export default function ICAIAssistantPage() {
  const params = useParams();
  const caseId = (params?.id as string) || "ACN-POSH-2026-0041";

  const [hasPartyConsent, setHasPartyConsent] = useState(false);
  const [isRunningTimeline, setIsRunningTimeline] = useState(false);
  const [timelineResult, setTimelineResult] = useState<any[] | null>(null);
  const [isCounselSigned, setIsCounselSigned] = useState(false);

  const runTimelineSynthesis = () => {
    setIsRunningTimeline(true);
    setTimeout(() => {
      setIsRunningTimeline(false);
      setTimelineResult([
        { date: "12 Aug 2026", time: "14:30 IST", event: "Project sprint kickoff meeting in 3rd Floor conference hall." },
        { date: "18 Aug 2026", time: "22:15 IST", event: "Late-night Slack direct message exchange cited in statement." },
        { date: "24 Aug 2026", time: "11:00 IST", event: "Managerial 1-on-1 performance review discussion." },
        { date: "01 Sept 2026", time: "09:45 IST", event: "Formal Section 9 grievance submitted to Internal Committee." },
      ]);
    }, 1100);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Header */}
      <div className="bg-[#050C17] text-white border-b border-navy-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link
            href={`/posh/ic/cases/${caseId}`}
            className="inline-flex items-center gap-1.5 text-xs text-brass-400 hover:text-brass-300 font-mono mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Case Workbench ({caseId})</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brass-400 mb-1">
                <span>IC Case Deliberation Tools</span>
                <span>•</span>
                <span>PRD Section 32</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Case Chronology &amp; Procedural Due-Diligence Aid
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-xl font-sans">
                Assists the Internal Committee in extracting factual chronologies and tracking natural justice milestones. Operates entirely within Acorn&apos;s zero-egress perimeter.
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block font-mono">Docket Number</span>
              <span className="text-sm font-bold text-brass-300 font-mono">{caseId}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Statutory Consent Gate (BR-075) */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="font-serif font-bold text-base text-slate-900">
                Statutory Party Written Consent Verification Gate
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Under Acorn Enterprise Rule BR-075 and Section 16 of the POSH Act, algorithmic assistance on party statements may only be initialized if both the Complainant and Respondent have executed written opt-in declarations.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer text-xs font-medium text-slate-800 select-none">
              <input
                type="checkbox"
                checked={hasPartyConsent}
                onChange={(e) => setHasPartyConsent(e.target.checked)}
                className="w-4 h-4 rounded text-navy-900 focus:ring-brass-400 border-slate-300"
              />
              <span>Confirmed: Complainant and Respondent written consent on file in custody log.</span>
            </label>

            <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold ${
              hasPartyConsent ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-500"
            }`}>
              {hasPartyConsent ? "GATE OPEN" : "LOCKED"}
            </span>
          </div>
        </div>

        {/* Feature Workbench */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Feature 1: Timeline Synthesizer */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brass-600" />
                <h3 className="font-bold text-slate-900 text-sm">Chronological Timeline Synthesis</h3>
              </div>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                Local Llama3-8B
              </span>
            </div>

            <p className="text-xs text-slate-600">
              Aggregates dates, times, and cited encounters from Complainant complaint (Exhibit A) and Respondent defense statement (Exhibit B) into an unvarnished sequence.
            </p>

            <div className="pt-2">
              <button
                onClick={runTimelineSynthesis}
                disabled={!hasPartyConsent || isRunningTimeline}
                className="w-full py-2 px-4 bg-[#101F38] hover:bg-navy-900 text-brass-300 rounded font-medium text-xs transition disabled:opacity-40 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isRunningTimeline ? "Extracting Factual Chronology..." : "Synthesize Event Chronology"}</span>
              </button>
            </div>

            {timelineResult && (
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider font-mono">
                  Extracted Factual Events
                </div>
                <div className="space-y-2">
                  {timelineResult.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex items-center justify-between font-mono text-[11px] text-brass-700 font-semibold mb-0.5">
                        <span>{item.date}</span>
                        <span className="text-slate-400 text-[10px]">{item.time}</span>
                      </div>
                      <p className="text-slate-700">{item.event}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 bg-slate-100 text-slate-500 rounded text-[10px] font-mono">
                  BR-078 Guard: Zero credibility or reliability rating applied.
                </div>
              </div>
            )}
          </div>

          {/* Feature 2: Natural Justice Milestones */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-sm">Natural Justice Compliance Checklist</h3>
              </div>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                Rule Validator v3
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded border border-slate-100 space-y-1">
                <div className="flex justify-between font-semibold text-slate-800">
                  <span>7-Day Hearing Notice Window</span>
                  <span className="text-emerald-700">COMPLIANT (10d)</span>
                </div>
                <p className="text-[11px] text-slate-500">Notice served on 04 Oct for scheduled hearing on 14 Oct.</p>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-100 space-y-1">
                <div className="flex justify-between font-semibold text-slate-800">
                  <span>Equal Documentary Disclosure</span>
                  <span className="text-emerald-700">COMPLIANT</span>
                </div>
                <p className="text-[11px] text-slate-500">Exhibits A-01 through A-04 released to Respondent with 10-day reply window.</p>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-100 space-y-1">
                <div className="flex justify-between font-semibold text-slate-800">
                  <span>Section 4(2) Quorum Balance</span>
                  <span className="text-emerald-700">COMPLIANT (66% F)</span>
                </div>
                <p className="text-[11px] text-slate-500">Presiding Officer + External Member + 1 Employee Member confirmed.</p>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-100 space-y-1">
                <div className="flex justify-between font-semibold text-slate-800">
                  <span>Section 10(1) Financial Ban Guard</span>
                  <span className="text-emerald-700">PASS (0 Settlement Terms)</span>
                </div>
                <p className="text-[11px] text-slate-500">No monetary consideration detected in conciliation draft.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Mandatory Counsel Human Sign-Off (BR-077) */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <PenTool className="w-4 h-4 text-brass-600" />
              <h2 className="font-serif font-bold text-base text-slate-900">
                Human Counsel Verification &amp; Docket Inscription
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">BR-077 Mandatory Sign-Off</span>
          </div>

          <p className="text-xs text-slate-600">
            In compliance with PRD Rule BR-077, working notes produced by algorithmic tools cannot be incorporated into the inquiry record or final report until an appointed Internal Committee Member personally reviews and counter-signs the extraction.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Reviewing Member: <strong className="text-slate-800">Adv. Debjani Sen (Acorn External Member)</strong>
            </div>

            <button
              onClick={() => setIsCounselSigned(!isCounselSigned)}
              className={`px-4 py-2 rounded text-xs font-medium transition border ${
                isCounselSigned
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                  : "bg-[#101F38] hover:bg-navy-900 text-brass-300 border-brass-500/30"
              }`}
            >
              {isCounselSigned ? "✓ Digitally Signed & Inscribed to Docket" : "Review & Counter-Sign Extracted Chronology"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
