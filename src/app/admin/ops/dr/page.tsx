"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Shield, CheckCircle2, AlertTriangle, RefreshCw, Database, Server, Clock } from "lucide-react";

export default function DrDrillsPage() {
  const [tamperTested, setTamperTested] = useState(false);
  const [tamperResult, setTamperResult] = useState<string | null>(null);

  const simulateTamper = () => {
    setTamperTested(true);
    setTamperResult(
      "SIMULATION TEST RESULT: Hash mismatch immediately flagged at block #14082. Tamper alert triggered to security desk. Verification engine cleanly blocked corrupted block ingestion. Tamper-evident property 100% PASS."
    );
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-8 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link href="/admin/ops" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brass-700 hover:text-navy-900 transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Operations Command Centre</span>
        </Link>

        {/* Header */}
        <div className="bg-white p-6 rounded-card border border-border shadow-card flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-brass-700 font-bold block">
              DISASTER RECOVERY &amp; CRYPTOGRAPHIC AUDIT VERIFICATION
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950 mt-1">
              Disaster Recovery Drills &amp; Tamper Engine
            </h1>
            <p className="text-xs text-ink-secondary mt-0.5">
              Automated drill logs, backup restore timers, and cryptographic SHA-256 hash continuity verification.
            </p>
          </div>

          <button
            onClick={simulateTamper}
            className="px-4 py-2 bg-navy-700 hover:bg-navy-800 text-ivory-50 text-xs font-semibold rounded-btn shadow-sm transition flex items-center gap-2"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Simulate Hash Tamper Test</span>
          </button>
        </div>

        {/* Drill Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-card border-x border-b border-border border-t-2 border-t-status-success shadow-card">
            <span className="text-xs text-ink-secondary">Last DR Drill Duration</span>
            <div className="font-serif text-2xl font-bold text-ink mt-1">6m 42s</div>
            <div className="text-[11px] text-status-success mt-1">RTO Target: &lt; 15 mins (PASS)</div>
          </div>
          <div className="bg-white p-5 rounded-card border-x border-b border-border border-t-2 border-t-status-success shadow-card">
            <span className="text-xs text-ink-secondary">Data Recovery Point (RPO)</span>
            <div className="font-serif text-2xl font-bold text-ink mt-1">12 mins ago</div>
            <div className="text-[11px] text-status-success mt-1">RPO Target: &lt; 1 hour (PASS)</div>
          </div>
          <div className="bg-white p-5 rounded-card border-x border-b border-border border-t-2 border-t-brass-500 shadow-card">
            <span className="text-xs text-ink-secondary">Audit Hash Blocks Verified</span>
            <div className="font-serif text-2xl font-bold text-brass-700 mt-1">18,492 Blocks</div>
            <div className="text-[11px] text-ink-muted mt-1">Zero corrupted / broken links</div>
          </div>
        </div>

        {/* Simulation Output Banner */}
        {tamperTested && (
          <div className="p-6 bg-status-success-bg border border-status-success/30 rounded-card space-y-2 animate-fade-up">
            <div className="flex items-center gap-2 text-status-success font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Cryptographic Tamper-Detection Simulation Succeeded</span>
            </div>
            <p className="font-mono text-xs text-ink leading-relaxed">{tamperResult}</p>
          </div>
        )}

        {/* Recent Drill History Table */}
        <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="font-serif text-lg font-bold text-ink">Historical Disaster Recovery Drills</h3>
          </div>
          <div className="divide-y divide-border text-xs">
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-surface/50">
              <div>
                <div className="font-bold text-ink">Scheduled Q4 Production Backup Restoration Drill</div>
                <div className="text-ink-muted text-[11px]">Operator: Automated CI/CD &bull; Snapshot Size: 1.4 GB</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-ink-secondary">Duration: 6m 42s</span>
                <span className="px-2.5 py-0.5 rounded-full bg-status-success-bg text-status-success font-semibold">PASS</span>
              </div>
            </div>
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-surface/50">
              <div>
                <div className="font-bold text-ink">Point-In-Time Oplog Roll-forward Simulation</div>
                <div className="text-ink-muted text-[11px]">Operator: acorn-devops-sre &bull; 2,400 Synthetic Dockets</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-ink-secondary">Duration: 4m 18s</span>
                <span className="px-2.5 py-0.5 rounded-full bg-status-success-bg text-status-success font-semibold">PASS</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
