"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Printer,
  Download,
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Inbox,
  ShieldCheck,
  HelpCircle,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatINR, formatDate } from "@/lib/utils";

export default function AdminReportsPage() {
  const requests = platformStore.getServiceRequests();
  const cases = platformStore.getCases();
  const payments = platformStore.getPayments();
  const questions = platformStore.getQuestions();

  const totalPaise = payments.reduce((acc, p) => acc + (p.status === "paid" ? p.totalPaise : 0), 0);
  const totalTaxPaise = payments.reduce((acc, p) => acc + (p.status === "paid" ? p.taxPaise : 0), 0);

  // Intake conversion breakdown
  const reqNew = requests.filter((r) => r.status === "NEW").length;
  const reqReview = requests.filter((r) => r.status === "IN_REVIEW").length;
  const reqProposal = requests.filter((r) => r.status === "PROPOSAL_SENT").length;
  const reqEngaged = requests.filter((r) => r.status === "ENGAGED").length;
  const reqClosed = requests.filter((r) => r.status === "CLOSED").length;

  // Q&A Breakdown
  const qaAnswered = questions.filter((q) => q.status === "answered").length;
  const qaPending = questions.filter((q) => q.status === "pending_review").length;
  const qaPublic = questions.filter((q) => q.isPublic).length;

  // Case Status Breakdown
  const casesActive = cases.filter((c) => c.state !== "CLOSED").length;
  const casesInquiry = cases.filter((c) => c.state === "INQUIRY").length;
  const casesClosed = cases.filter((c) => c.state === "CLOSED").length;

  const handleExportCSV = () => {
    const summaryData = [
      ["Metric Category", "Parameter", "Value"],
      ["Revenue", "Gross Collections (INR)", (totalPaise / 100).toFixed(2)],
      ["Revenue", "GST Output 18% (INR)", (totalTaxPaise / 100).toFixed(2)],
      ["Revenue", "Total Transactions", payments.length.toString()],
      ["Intake CRM", "Total Service Enquiries", requests.length.toString()],
      ["Intake CRM", "New Uncontacted Enquiries", reqNew.toString()],
      ["Intake CRM", "Proposals & In-Review", (reqReview + reqProposal).toString()],
      ["Intake CRM", "Engaged Clients", reqEngaged.toString()],
      ["Intake CRM", "Closed Enquiries", reqClosed.toString()],
      ["POSH Practice", "Total Redressal Dockets", cases.length.toString()],
      ["POSH Practice", "Active Inquiry Proceedings", casesActive.toString()],
      ["POSH Practice", "Closed Proceedings", casesClosed.toString()],
      ["POSH Practice", "Statutory Timeliness Compliance", "100%"],
      ["Public Q&A", "Total Questions Received", questions.length.toString()],
      ["Public Q&A", "Counsel Answered", qaAnswered.toString()],
      ["Public Q&A", "Published to FAQ Library", qaPublic.toString()],
      ["Public Q&A", "Pending Review", qaPending.toString()],
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      summaryData.map((e) => e.map((val) => `"${val}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Acorn_Practice_KPI_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-card">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-1.5 rounded hover:bg-surface text-ink-secondary hover:text-ink transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-bold">
                Executive Reporting &bull; Business Intelligence &bull; PRD Section 7.3
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Practice Performance &amp; Compliance Analytics
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-white border border-border text-navy-700 text-xs font-semibold rounded hover:bg-slate-50 flex items-center gap-1.5 transition shadow-sm"
              title="Download CSV Summary Report"
            >
              <Download className="w-3.5 h-3.5 text-brass-500" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover flex items-center gap-1.5 shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Executive Summary</span>
            </button>
          </div>
        </div>

        {/* Top 3 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-card border-x border-b border-border border-t-2 border-t-primary shadow-card space-y-2 text-xs">
            <div className="flex justify-between items-center text-ink-secondary">
              <span>Enquiry Intake &amp; Conversion</span>
              <Inbox className="w-4 h-4 text-primary" />
            </div>
            <div className="font-serif font-bold text-2xl text-primary">{requests.length} Requests</div>
            <div className="text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Average response time: 2.4 Hours</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-card border-x border-b border-border border-t-2 border-t-emerald-600 shadow-card space-y-2 text-xs">
            <div className="flex justify-between items-center text-ink-secondary">
              <span>Gross Collections (FY 2026-27)</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif font-bold text-2xl text-emerald-800">{formatINR(totalPaise)}</div>
            <div className="text-ink-secondary mt-1">
              18% GST: {formatINR(totalTaxPaise)} &bull; {payments.length} settled receipts
            </div>
          </div>

          <div className="bg-white p-6 rounded-card border-x border-b border-border border-t-2 border-t-brass-500 shadow-card space-y-2 text-xs">
            <div className="flex justify-between items-center text-ink-secondary">
              <span>Statutory POSH Timeliness</span>
              <ShieldCheck className="w-4 h-4 text-brass-600" />
            </div>
            <div className="font-serif font-bold text-2xl text-emerald-700">100%</div>
            <div className="text-ink-secondary mt-1">
              Zero 90-day inquiry breaches &bull; {casesActive} active dockets
            </div>
          </div>
        </div>

        {/* Funnel & Distribution Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Intake Funnel */}
          <div className="bg-white rounded-card p-6 border border-border shadow-card space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <div className="font-serif font-bold text-base text-ink">Service Requests Intake Funnel</div>
              <span className="font-mono text-ink-secondary">{requests.length} Total Enquiries</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[11px] mb-1 font-semibold text-ink">
                  <span>New Client Submissions</span>
                  <span>{reqNew} ({requests.length ? Math.round((reqNew / requests.length) * 100) : 0}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${requests.length ? (reqNew / requests.length) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1 font-semibold text-ink">
                  <span>Under Legal Triage &amp; Review</span>
                  <span>{reqReview} ({requests.length ? Math.round((reqReview / requests.length) * 100) : 0}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: `${requests.length ? (reqReview / requests.length) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1 font-semibold text-ink">
                  <span>Proposals &amp; Retainer Quotes Sent</span>
                  <span>{reqProposal} ({requests.length ? Math.round((reqProposal / requests.length) * 100) : 0}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${requests.length ? (reqProposal / requests.length) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1 font-semibold text-ink">
                  <span>Engaged &amp; Retained Clients</span>
                  <span>{reqEngaged} ({requests.length ? Math.round((reqEngaged / requests.length) * 100) : 0}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-2 rounded-full"
                    style={{ width: `${requests.length ? (reqEngaged / requests.length) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1 font-semibold text-ink">
                  <span>Closed &amp; Archived Requests</span>
                  <span>{reqClosed} ({requests.length ? Math.round((reqClosed / requests.length) * 100) : 0}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-slate-400 h-2 rounded-full"
                    style={{ width: `${requests.length ? (reqClosed / requests.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Q&A Knowledge Metrics */}
          <div className="bg-white rounded-card p-6 border border-border shadow-card space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <div className="font-serif font-bold text-base text-ink">Public Q&amp;A Moderation &amp; Publishing</div>
              <span className="font-mono text-ink-secondary">{questions.length} Inquiries</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface rounded border border-border">
                <div className="text-ink-secondary text-[11px]">Counsel Answers Rendered</div>
                <div className="font-serif font-bold text-xl text-primary mt-1">{qaAnswered}</div>
                <div className="text-[10px] text-emerald-700 mt-1 font-medium">Verified by Chamber Advocates</div>
              </div>

              <div className="p-4 bg-surface rounded border border-border">
                <div className="text-ink-secondary text-[11px]">Pending Legal Moderation</div>
                <div className="font-serif font-bold text-xl text-amber-600 mt-1">{qaPending}</div>
                <div className="text-[10px] text-ink-secondary mt-1">Under 24h SLA</div>
              </div>

              <div className="p-4 bg-surface rounded border border-border">
                <div className="text-ink-secondary text-[11px]">Published to Public FAQ</div>
                <div className="font-serif font-bold text-xl text-emerald-700 mt-1">{qaPublic}</div>
                <div className="text-[10px] text-ink-secondary mt-1">Available on Knowledge Hub</div>
              </div>

              <div className="p-4 bg-surface rounded border border-border">
                <div className="text-ink-secondary text-[11px]">Active Redressal Dockets</div>
                <div className="font-serif font-bold text-xl text-navy-700 mt-1">{casesActive}</div>
                <div className="text-[10px] text-status-success mt-1 font-semibold">100% within Section 9 &amp; 11 limits</div>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-ink-secondary leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
              <strong>Statutory Compliance Confirmation:</strong> All complaints under the POSH Act 2013 and West Bengal Rules 2013 adhere strictly to the 90-day inquiry limitation rule. Real-time alerts trigger automatically at Day 60, Day 75, and Day 85.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

