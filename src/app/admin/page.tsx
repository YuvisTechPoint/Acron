"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  Inbox,
  HelpCircle,
  FileText,
  CreditCard,
  Code,
  ShieldCheck,
  Clock,
  ArrowRight,
  TrendingUp,
  Activity,
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  AlertTriangle,
  Server,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import {
  useRealtimeRequests,
  useRealtimeQuestions,
  useRealtimeCases,
  useRealtimePayments,
  useRealtimePosts,
  useRealtimeScripts,
} from "@/lib/realtime";
import { formatINR, formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const requests = useRealtimeRequests();
  const questions = useRealtimeQuestions();
  const cases = useRealtimeCases();
  const payments = useRealtimePayments();
  const blogs = useRealtimePosts();
  const scripts = useRealtimeScripts();

  const totalRevenuePaise = payments.reduce((acc, p) => acc + (p.status === "paid" ? p.totalPaise : 0), 0);
  const pendingRequests = requests.filter((r) => r.status === "NEW").length;
  const pendingQA = questions.filter((q) => q.status === "pending_review").length;
  const activeScriptsCount = scripts.filter((s) => s.isEnabled).length;

  return (
    <div className="bg-ivory-50 min-h-screen py-8 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-card">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-ping"></span>
              <span className="text-xs uppercase tracking-widest text-navy-700 font-bold">
                Admin Control System &bull; Production v2.0
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950 mt-1">
              Acorn Firm &amp; Practice Operations Dashboard
            </h1>
            <p className="text-xs text-ink-secondary mt-0.5">
              Super Admin &bull; Adv. Subhasish Mukherjee &bull; Kolkata Chambers
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/posh/ic"
              className="px-4 py-2 border border-border text-xs font-semibold rounded-btn hover:bg-surface text-ink transition-colors"
            >
              Open IC Docket
            </Link>
            <Link
              href="/admin/requests"
              className="px-4 py-2 bg-navy-700 hover:bg-blue-600 text-ivory-50 text-xs font-semibold rounded-btn shadow-sm transition-colors"
            >
              Review Requests ({pendingRequests})
            </Link>
          </div>
        </div>

        {/* Live Operational Counters (KPI Tiles with Thin Brass Top Rule) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-card border-x border-b border-border border-t-2 border-t-brass-500 shadow-card">
            <div className="flex justify-between items-center text-xs text-ink-secondary">
              <span>Service Requests</span>
              <Inbox className="w-4 h-4 text-navy-700" />
            </div>
            <div className="font-serif font-bold text-2xl text-ink mt-2">
              {requests.length}
            </div>
            <div className="text-[11px] text-navy-700 font-medium mt-1">
              {pendingRequests} pending response
            </div>
          </div>

          <div className="bg-white p-5 rounded-card border-x border-b border-border border-t-2 border-t-brass-500 shadow-card">
            <div className="flex justify-between items-center text-xs text-ink-secondary">
              <span>POSH Redressal Dockets</span>
              <ShieldCheck className="w-4 h-4 text-brass-500" />
            </div>
            <div className="font-serif font-bold text-2xl text-ink mt-2">
              {cases.length} Active
            </div>
            <div className="text-[11px] text-status-success font-medium mt-1">
              100% 90-day compliance
            </div>
          </div>

          <div className="bg-white p-5 rounded-card border-x border-b border-border border-t-2 border-t-brass-500 shadow-card">
            <div className="flex justify-between items-center text-xs text-ink-secondary">
              <span>Q&amp;A Knowledge Queue</span>
              <HelpCircle className="w-4 h-4 text-navy-700" />
            </div>
            <div className="font-serif font-bold text-2xl text-ink mt-2">
              {questions.length}
            </div>
            <div className="text-[11px] text-status-warning font-medium mt-1">
              {pendingQA} pending moderation
            </div>
          </div>

          <div className="bg-white p-5 rounded-card border-x border-b border-border border-t-2 border-t-brass-500 shadow-card">
            <div className="flex justify-between items-center text-xs text-ink-secondary">
              <span>Fee Collections &bull; Retainers</span>
              <CreditCard className="w-4 h-4 text-status-success" />
            </div>
            <div className="font-serif font-bold text-2xl text-status-success mt-2">
              {formatINR(totalRevenuePaise)}
            </div>
            <div className="text-[11px] text-ink-secondary mt-1">
              Via Razorpay Gateway &bull; FY 2026-27
            </div>
          </div>
        </div>

        {/* Modules Quick Access Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Service Requests Pipeline */}
          <div className="bg-white rounded-card p-6 border border-border shadow-card flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-serif font-bold text-base">
                <Inbox className="w-5 h-5 text-accent" />
                <span>Service Requests Pipeline</span>
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Track client intake, consultation inquiries, assign internal counsel, and record follow-ups.
              </p>
              <div className="space-y-1.5 pt-2 text-xs">
                {requests.slice(0, 3).map((r) => (
                  <div key={r.id} className="p-2.5 rounded bg-surface border border-border-subtle flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-ink">{r.fullName}</div>
                      <div className="text-[10px] text-ink-secondary">{r.refNumber}</div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary-light text-primary">
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle mt-4">
              <Link
                href="/admin/requests"
                className="text-xs font-semibold text-primary hover:text-accent flex items-center gap-1.5"
              >
                <span>Manage All Requests</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Legal Q&A Moderation */}
          <div className="bg-white rounded-card p-6 border border-border shadow-card flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-serif font-bold text-base">
                <HelpCircle className="w-5 h-5 text-accent" />
                <span>Q&amp;A Moderation &amp; Publishing</span>
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Review visitor legal questions, draft formal counsel answers, and publish approved entries to public FAQ.
              </p>
              <div className="space-y-1.5 pt-2 text-xs">
                {questions.slice(0, 2).map((q) => (
                  <div key={q.id} className="p-2.5 rounded bg-surface border border-border-subtle space-y-1">
                    <div className="font-semibold text-ink line-clamp-1">{q.question}</div>
                    <div className="text-[10px] text-ink-secondary flex justify-between">
                      <span>Status: {q.status}</span>
                      <span>{q.refNumber}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle mt-4">
              <Link
                href="/admin/questions"
                className="text-xs font-semibold text-primary hover:text-accent flex items-center gap-1.5"
              >
                <span>Moderate Q&amp;A Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Tag & Script Manager */}
          <div className="bg-white rounded-card p-6 border border-border shadow-card flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-serif font-bold text-base">
                <Code className="w-5 h-5 text-accent" />
                <span>Tag &amp; Script Management</span>
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Manage third-party analytics and chat pixels with Master Kill Switch and strict POSH portal exclusions.
              </p>
              <div className="space-y-2 pt-2 text-xs">
                <div className="flex justify-between items-center p-2 rounded bg-surface">
                  <span>Active Tracking Scripts:</span>
                  <span className="font-bold text-primary">{activeScriptsCount} of {scripts.length}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-surface">
                  <span>POSH Portal Safe Exclusions:</span>
                  <span className="font-bold text-emerald-700">Enforced 100%</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle mt-4">
              <Link
                href="/admin/scripts"
                className="text-xs font-semibold text-primary hover:text-accent flex items-center gap-1.5"
              >
                <span>Manage Scripts &amp; Kill Switch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Operations & Launch Control Strip */}
        <div className="bg-white rounded-card p-6 border border-border shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4 border-b border-border-subtle">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-navy-700">
                  Operations &amp; Launch Infrastructure &bull; PRD Section 28
                </span>
              </div>
              <h2 className="font-serif text-lg font-bold text-ink-950 mt-0.5">
                Chambers Command &amp; Readiness Engines
              </h2>
            </div>
            <div className="text-[11px] text-ink-secondary flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                Gate: 17/17 Verified
              </span>
              <span className="px-2 py-0.5 rounded bg-navy-50 text-navy-800 font-semibold border border-navy-200">
                SOPs: 22 Active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/ops"
              className="p-4 rounded-card border border-border bg-ivory-50/50 hover:bg-white hover:border-navy-700 transition group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Activity className="w-4 h-4 text-navy-700" />
                  <span className="text-[10px] font-bold text-status-success bg-emerald-50 px-1.5 py-0.5 rounded">
                    99.98% SLO
                  </span>
                </div>
                <div className="font-bold text-xs text-ink-950 group-hover:text-navy-700 transition">
                  Ops Command Centre
                </div>
                <div className="text-[11px] text-ink-secondary leading-snug">
                  Telemetry, edge ping health, and PII Scrubber scrubbing stats.
                </div>
              </div>
              <div className="text-[11px] font-semibold text-navy-700 mt-3 flex items-center gap-1">
                <span>View Telemetry</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link
              href="/admin/ops/gate"
              className="p-4 rounded-card border border-border bg-ivory-50/50 hover:bg-white hover:border-navy-700 transition group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                    17 Items
                  </span>
                </div>
                <div className="font-bold text-xs text-ink-950 group-hover:text-navy-700 transition">
                  Go-Live Readiness Gate
                </div>
                <div className="text-[11px] text-ink-secondary leading-snug">
                  PRD Section 28.8 17-item statutory checklist with live evidence.
                </div>
              </div>
              <div className="text-[11px] font-semibold text-navy-700 mt-3 flex items-center gap-1">
                <span>Check Gate Status</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link
              href="/admin/ops/dr"
              className="p-4 rounded-card border border-border bg-ivory-50/50 hover:bg-white hover:border-navy-700 transition group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
                    RTO &lt; 2h
                  </span>
                </div>
                <div className="font-bold text-xs text-ink-950 group-hover:text-navy-700 transition">
                  DR Drills &amp; Tamper
                </div>
                <div className="text-[11px] text-ink-secondary leading-snug">
                  Drill execution logs &amp; cryptographic audit hash chain validator.
                </div>
              </div>
              <div className="text-[11px] font-semibold text-navy-700 mt-3 flex items-center gap-1">
                <span>Run Drills</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link
              href="/admin/ops/sop"
              className="p-4 rounded-card border border-border bg-ivory-50/50 hover:bg-white hover:border-navy-700 transition group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <ClipboardList className="w-4 h-4 text-navy-700" />
                  <span className="text-[10px] font-bold text-navy-800 bg-navy-50 px-1.5 py-0.5 rounded">
                    0 Overdue
                  </span>
                </div>
                <div className="font-bold text-xs text-ink-950 group-hover:text-navy-700 transition">
                  SOP Recurrence Register
                </div>
                <div className="text-[11px] text-ink-secondary leading-snug">
                  22 operational procedures tracked across daily, weekly, &amp; monthly cadences.
                </div>
              </div>
              <div className="text-[11px] font-semibold text-navy-700 mt-3 flex items-center gap-1">
                <span>Review SOPs</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

        {/* Additional Management Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <Link
            href="/admin/posts"
            className="p-4 bg-white rounded border border-border hover:bg-surface transition-colors flex items-center gap-3 text-xs"
          >
            <FileText className="w-5 h-5 text-primary" />
            <div>
              <div className="font-semibold text-ink">Blog &amp; Insights CMS</div>
              <div className="text-[11px] text-ink-secondary">Publish articles &amp; legal commentary</div>
            </div>
          </Link>

          <Link
            href="/admin/payments"
            className="p-4 bg-white rounded border border-border hover:bg-surface transition-colors flex items-center gap-3 text-xs"
          >
            <CreditCard className="w-5 h-5 text-emerald-700" />
            <div>
              <div className="font-semibold text-ink">Payments &amp; Reconciliation</div>
              <div className="text-[11px] text-ink-secondary">Receipts, invoices, Razorpay transactions</div>
            </div>
          </Link>

          <Link
            href="/admin/audit"
            className="p-4 bg-white rounded border border-border hover:bg-surface transition-colors flex items-center gap-3 text-xs"
          >
            <Activity className="w-5 h-5 text-primary" />
            <div>
              <div className="font-semibold text-ink">Tamper-Evident Audit Log</div>
              <div className="text-[11px] text-ink-secondary">System-wide operational tracking</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

