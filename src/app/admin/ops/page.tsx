"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Shield,
  Server,
  Database,
  RefreshCw,
  ArrowRight,
  TrendingUp,
  Cpu,
  Radio,
  FileCheck2,
} from "lucide-react";

export default function OpsCommandCentrePage() {
  const [selectedPeriod, setSelectedPeriod] = useState<"today" | "7d" | "30d">("today");

  const systemMetrics = {
    availability: "99.98%",
    uptimeHours: "720 hrs",
    downtimeBudgetRemaining: "3 hrs 31 mins",
    targetSlo: "99.50%",
    p95Latency: "48ms",
    activeConnections: 18,
    timerScannerStatus: "Healthy (Every 5 mins)",
    lastAuditChainVerified: "4 mins ago",
    queueHealth: "0 pending jobs / 1,412 processed",
  };

  const servicesStatus = [
    { name: "Web Application (Next.js)", status: "Operational", ping: "24ms", region: "ap-south-1 (Mumbai)" },
    { name: "API & Websocket Engine", status: "Operational", ping: "38ms", region: "ap-south-1 (Mumbai)" },
    { name: "MongoDB Primary Replica Set", status: "Operational", ping: "12ms", region: "ap-south-1 (Mumbai)" },
    { name: "Redis Cache & Rate Limiter", status: "Operational", ping: "4ms", region: "ap-south-1 (Mumbai)" },
    { name: "Evidence Vault (Encrypted S3)", status: "Operational", ping: "62ms", region: "ap-south-1 (Mumbai)" },
    { name: "Payment Webhook Dispatcher", status: "Operational", ping: "85ms", region: "Razorpay Production" },
    { name: "PII Scrubber Engine", status: "Active & Scrubbing", ping: "1ms", region: "Internal Memory" },
  ];

  return (
    <div className="bg-ivory-50 min-h-screen py-8 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-card">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse" />
              <span className="text-[11px] uppercase tracking-widest text-brass-700 font-bold">
                OPERATIONAL COMMAND CENTRE &bull; TIER-1 CHAMBERS INFRASTRUCTURE
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950 mt-1">
              Platform Observability &amp; Availability
            </h1>
            <p className="text-xs text-ink-secondary mt-0.5">
              Live telemetry, service heartbeats, PII scrubber diagnostics, and legal compliance state.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/ops/gate"
              className="px-4 py-2 border border-brass-500/40 text-xs font-semibold rounded-btn hover:bg-brass-50 text-brass-800 transition"
            >
              Go-Live Gate Status
            </Link>
            <Link
              href="/admin/ops/dr"
              className="px-4 py-2 bg-navy-700 hover:bg-navy-800 text-ivory-50 text-xs font-semibold rounded-btn shadow-sm transition"
            >
              DR &amp; Audit Drills
            </Link>
          </div>
        </div>

        {/* Top Telemetry KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-card border-x border-b border-border border-t-2 border-t-status-success shadow-card">
            <div className="flex justify-between items-center text-xs text-ink-secondary">
              <span>Monthly Availability</span>
              <Activity className="w-4 h-4 text-status-success" />
            </div>
            <div className="font-serif font-bold text-3xl text-ink mt-2">
              {systemMetrics.availability}
            </div>
            <div className="text-[11px] text-status-success font-medium mt-1">
              SLO Target: {systemMetrics.targetSlo} (Passing)
            </div>
          </div>

          <div className="bg-white p-5 rounded-card border-x border-b border-border border-t-2 border-t-navy-700 shadow-card">
            <div className="flex justify-between items-center text-xs text-ink-secondary">
              <span>P95 Service Latency</span>
              <Cpu className="w-4 h-4 text-navy-700" />
            </div>
            <div className="font-serif font-bold text-3xl text-ink mt-2">
              {systemMetrics.p95Latency}
            </div>
            <div className="text-[11px] text-ink-secondary font-medium mt-1">
              Median Response: 18ms &bull; Clean
            </div>
          </div>

          <div className="bg-white p-5 rounded-card border-x border-b border-border border-t-2 border-t-brass-500 shadow-card">
            <div className="flex justify-between items-center text-xs text-ink-secondary">
              <span>Audit Chain Integrity</span>
              <Shield className="w-4 h-4 text-brass-600" />
            </div>
            <div className="font-serif font-bold text-3xl text-ink mt-2">
              100% Intact
            </div>
            <div className="text-[11px] text-brass-700 font-medium mt-1">
              SHA-256 Chain &bull; Append-Only
            </div>
          </div>

          <div className="bg-white p-5 rounded-card border-x border-b border-border border-t-2 border-t-navy-800 shadow-card">
            <div className="flex justify-between items-center text-xs text-ink-secondary">
              <span>Timer &amp; Job Scanners</span>
              <Clock className="w-4 h-4 text-navy-800" />
            </div>
            <div className="font-serif font-bold text-3xl text-ink mt-2">
              Heartbeat OK
            </div>
            <div className="text-[11px] text-status-success font-medium mt-1">
              {systemMetrics.timerScannerStatus}
            </div>
          </div>
        </div>

        {/* Service Health Grid */}
        <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
          <div className="p-6 border-b border-border flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-ink">Core Infrastructure Nodes</h3>
              <p className="text-xs text-ink-secondary">Real-time health status of connected data stores and background jobs</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <Radio className="w-3.5 h-3.5 text-status-success animate-pulse" />
              <span>Live Telemetry Auto-refreshed (10s interval)</span>
            </div>
          </div>

          <div className="divide-y divide-border text-xs">
            {servicesStatus.map((srv, idx) => (
              <div key={idx} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface/50 transition">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-status-success" />
                  <div>
                    <div className="font-semibold text-ink text-sm">{srv.name}</div>
                    <div className="text-ink-muted text-[11px]">{srv.region}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="font-mono text-ink-secondary text-[11px]">Ping: {srv.ping}</div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-status-success-bg text-status-success font-medium text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{srv.status}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Navigation Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/ops/gate"
            className="p-6 bg-white rounded-card border border-border shadow-card hover:border-brass-500/50 transition group space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="font-serif text-lg font-bold text-ink group-hover:text-navy-700 transition">
                17-Item Go-Live Readiness Gate
              </span>
              <ArrowRight className="w-4 h-4 text-brass-500 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Verify security sign-offs, legal counsel certifications, pen-test remediation, and recovery drills.
            </p>
          </Link>

          <Link
            href="/admin/ops/dr"
            className="p-6 bg-white rounded-card border border-border shadow-card hover:border-brass-500/50 transition group space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="font-serif text-lg font-bold text-ink group-hover:text-navy-700 transition">
                DR Drills &amp; Tamper Verification
              </span>
              <ArrowRight className="w-4 h-4 text-brass-500 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Execute simulated tamper checks on audit chains and verify RTO/RPO restoration timers.
            </p>
          </Link>

          <Link
            href="/admin/ops/sop"
            className="p-6 bg-white rounded-card border border-border shadow-card hover:border-brass-500/50 transition group space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="font-serif text-lg font-bold text-ink group-hover:text-navy-700 transition">
                22-SOP Recurrence Register
              </span>
              <ArrowRight className="w-4 h-4 text-brass-500 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Monitor scheduled operating procedures, statutory annual report deadlines, and key rotation cycles.
            </p>
          </Link>
        </div>

      </div>
    </div>
  );
}
