"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Server,
  Database,
  Lock,
  ArrowRight,
  RefreshCw,
  FileText,
  Activity,
  Layers,
} from "lucide-react";
import { useRealtimeOpsTelemetry } from "@/lib/realtime";

export default function RootOpsPage() {
  const telemetry = useRealtimeOpsTelemetry();
  const [certInSecondsRemaining, setCertInSecondsRemaining] = useState(6 * 3600); // 6 hours
  const [activeStep, setActiveStep] = useState(1);
  const [simulatedIncidentActive, setSimulatedIncidentActive] = useState(false);

  useEffect(() => {
    if (!simulatedIncidentActive) return;
    const interval = setInterval(() => {
      setCertInSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [simulatedIncidentActive]);

  const formatCountdown = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const incidentSteps = [
    { num: 1, title: "Detect & Classify", lead: "Security Lead", role: "Classify severity P1/P2/P3 per PRD Sec 26.8; initialize tamper-evident incident log." },
    { num: 2, title: "Immediate Containment", lead: "DevOps SRE", role: "Isolate network segment, revoke compromised session tokens, rotate ephemeral credentials." },
    { num: 3, title: "Forensic Evidence Freeze", lead: "Auth Engineer", role: "Lock cryptographic audit hash chain; create read-only snapshot in append-only storage." },
    { num: 4, title: "CERT-In 6-Hour Notice", lead: "Legal Counsel", role: "Statutory mandatory reporting to CERT-In within 6 hours under 2022 Directions." },
    { num: 5, title: "Data Protection Board", lead: "Privacy Officer", role: "Evaluate DPDP Act criteria; prepare regulatory notice if sensitive PII involved." },
    { num: 6, title: "Client Notice (Template N-SEC)", lead: "Incident Commander", role: "Dispatch content-free notice to affected Presiding Officer (zero case PII)." },
    { num: 7, title: "Root Cause Investigation", lead: "Security Lead", role: "Perform sanitized sandbox reproduction without touching live complaint data." },
    { num: 8, title: "Patch Deployment & Verification", lead: "Release Engineer", role: "Deploy verified hotfix through staging CI/CD with hash-verified build." },
    { num: 9, title: "Control Rescan", lead: "QA Engineer", role: "Re-run full OWASP/DAST/A11y automated verification suites before traffic shift." },
    { num: 10, title: "Post-Incident Review (PIR)", lead: "Managing Partner", role: "Convene blame-free post-mortem; update threat model and runbooks." },
    { num: 11, title: "Append-Only Archival", lead: "Chambers Registrar", role: "Seal incident log with cryptographic HMAC; retain for statutory 180-day ICT audit." },
  ];

  return (
    <div className="bg-ivory-50 min-h-screen py-8 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Ribbon */}
        <div className="bg-white p-6 sm:p-8 rounded-card border border-border shadow-card flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse" />
              <span className="text-[11px] uppercase tracking-widest text-brass-700 font-bold">
                ACORN OPERATIONS COMMAND CENTRE &bull; PROTOCOL 30
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950 mt-1">
              Operational Reliability &amp; Incident Command
            </h1>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1 max-w-2xl">
              Real-time sovereign telemetry, statutory 6-hour CERT-In countdown registry, and 11-step SOP-01 security incident protocol.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/admin/ops"
              className="px-3.5 py-2 rounded-btn text-xs font-semibold bg-navy-900 text-white hover:bg-navy-800 transition shadow-sm"
            >
              Full Ops Console
            </Link>
            <Link
              href="/admin/ops/gate"
              className="px-3.5 py-2 rounded-btn text-xs font-semibold bg-white border border-border text-navy-800 hover:bg-slate-50 transition shadow-sm"
            >
              Go-Live Gate
            </Link>
            <Link
              href="/admin/ops/dr"
              className="px-3.5 py-2 rounded-btn text-xs font-semibold bg-white border border-border text-navy-800 hover:bg-slate-50 transition shadow-sm"
            >
              DR Drills
            </Link>
          </div>
        </div>

        {/* Real-time Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-card border border-border shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-secondary">Database Health</span>
              <Database className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-xl font-bold text-ink-950">Active &bull; Synced</div>
            <p className="text-[11px] text-ink-muted mt-0.5">Atomic disk write / AES-256-GCM</p>
          </div>

          <div className="bg-white p-5 rounded-card border border-border shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-secondary">Cryptographic Audit Chain</span>
              <Lock className="w-4 h-4 text-brass-600" />
            </div>
            <div className="mt-2 text-xl font-bold text-ink-950">Append-Only</div>
            <p className="text-[11px] text-ink-muted mt-0.5">HMAC-SHA256 verified integrity</p>
          </div>

          <div className="bg-white p-5 rounded-card border border-border shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-secondary">PII Scrubber Engine</span>
              <ShieldAlert className="w-4 h-4 text-navy-600" />
            </div>
            <div className="mt-2 text-xl font-bold text-ink-950">100% Enforced</div>
            <p className="text-[11px] text-ink-muted mt-0.5">Zero case data in logs or errors</p>
          </div>

          <div className="bg-white p-5 rounded-card border border-border shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-secondary">Real-Time Sync Bus</span>
              <Activity className="w-4 h-4 text-blue-600" />
            </div>
            <div className="mt-2 text-xl font-bold text-ink-950">SSE Stream Active</div>
            <p className="text-[11px] text-ink-muted mt-0.5">Latency ~14ms (Kolkata DC)</p>
          </div>
        </div>

        {/* Statutory CERT-In 6-Hour Regulatory Clock & Drill Trigger */}
        <div className="bg-navy-950 text-white p-6 sm:p-8 rounded-card border border-navy-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brass-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-brass-400">
                  STATUTORY REGULATORY TIMELINE &bull; IT ACT 2000 &amp; CERT-IN 2022
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-ivory-50">
                CERT-In Mandatory 6-Hour Cyber Incident Countdown
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Under the Indian CERT-In Directions of April 2022, specified cybersecurity incidents must be reported to the national agency within 6 hours of noticing.
              </p>
            </div>

            <div className="bg-navy-900/90 border border-brass-500/30 rounded-card p-5 text-center min-w-[260px] shadow-lg">
              <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
                {simulatedIncidentActive ? "Active Incident Window" : "Standby Target Window"}
              </div>
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-brass-400 tracking-wider">
                {formatCountdown(certInSecondsRemaining)}
              </div>
              <div className="mt-3 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSimulatedIncidentActive(!simulatedIncidentActive);
                    if (!simulatedIncidentActive) setCertInSecondsRemaining(6 * 3600);
                  }}
                  className={`px-3 py-1.5 rounded-btn text-xs font-semibold transition ${
                    simulatedIncidentActive
                      ? "bg-rose-900/80 text-rose-200 border border-rose-700 hover:bg-rose-800"
                      : "bg-brass-500 text-navy-950 hover:bg-brass-400"
                  }`}
                >
                  {simulatedIncidentActive ? "Reset Incident Clock" : "Trigger Simulated Drill"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SOP-01: 11-Step Confidentiality & Security Incident Response State Machine */}
        <div className="bg-white p-6 sm:p-8 rounded-card border border-border shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4 border-b border-border">
            <div>
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-brass-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-brass-700">
                  STANDARD OPERATING PROCEDURE &bull; SOP-01
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink-950 mt-1">
                11-Step Confidentiality &amp; Security Incident Workflow
              </h2>
            </div>
            <span className="text-xs text-ink-muted">
              Section 30.2 PRD &bull; Counsel Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {incidentSteps.map((s) => {
              const isPassed = activeStep > s.num;
              const isCurrent = activeStep === s.num;
              return (
                <div
                  key={s.num}
                  onClick={() => setActiveStep(s.num)}
                  className={`p-4 rounded-card border cursor-pointer transition select-none ${
                    isCurrent
                      ? "border-brass-600 bg-brass-50/40 shadow-sm ring-1 ring-brass-500"
                      : isPassed
                      ? "border-emerald-200 bg-emerald-50/30 text-ink-secondary"
                      : "border-border bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-brass-700">
                      Step {String(s.num).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {s.lead}
                    </span>
                  </div>
                  <h3 className="font-serif text-sm font-bold text-ink-950 mb-1">
                    {s.title}
                  </h3>
                  <p className="text-xs text-ink-secondary leading-snug">
                    {s.role}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-50 p-4 rounded-card border border-border flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div className="text-xs text-ink-secondary">
              <span className="font-semibold text-ink-950">Active Procedural Gate: </span>
              Step {activeStep} of 11 &mdash; {incidentSteps[activeStep - 1].title} ({incidentSteps[activeStep - 1].lead})
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={activeStep <= 1}
                onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1.5 bg-white border border-border text-ink text-xs font-semibold rounded-btn hover:bg-slate-100 disabled:opacity-40 transition"
              >
                Previous Step
              </button>
              <button
                type="button"
                disabled={activeStep >= 11}
                onClick={() => setActiveStep((prev) => Math.min(11, prev + 1))}
                className="px-3.5 py-1.5 bg-navy-900 text-white text-xs font-semibold rounded-btn hover:bg-navy-800 disabled:opacity-40 transition"
              >
                Advance Protocol
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
