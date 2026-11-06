"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HeartPulse,
  ShieldAlert,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Building2,
  Mail,
  UserCheck,
  Send,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface AftercareItem {
  id: string;
  caseNumber: string;
  orgName: string;
  complainantCode: string;
  closureDate: string;
  interval: "30_DAYS" | "90_DAYS" | "180_DAYS";
  dueDate: string;
  status: "PENDING_DISPATCH" | "SURVEY_SENT" | "RESPONSE_RECEIVED" | "RETALIATION_FLAGGED";
  retaliationScore: "LOW" | "MODERATE" | "HIGH";
  notes: string;
}

const INITIAL_QUEUE: AftercareItem[] = [
  {
    id: "AFT-001",
    caseNumber: "POSH-TECHKOL-2026-0009",
    orgName: "Kolkata Cloud Technologies Pvt Ltd",
    complainantCode: "CMP-9021",
    closureDate: "2026-09-15T00:00:00Z",
    interval: "30_DAYS",
    dueDate: "2026-10-15T00:00:00Z",
    status: "RESPONSE_RECEIVED",
    retaliationScore: "LOW",
    notes: "Complainant confirmed peaceful work atmosphere following respondent's department transfer."
  },
  {
    id: "AFT-002",
    caseNumber: "POSH-BENGALIND-2026-0004",
    orgName: "Bengal Precision Engineering Ltd",
    complainantCode: "CMP-7714",
    closureDate: "2026-08-01T00:00:00Z",
    interval: "90_DAYS",
    dueDate: "2026-11-01T00:00:00Z",
    status: "PENDING_DISPATCH",
    retaliationScore: "LOW",
    notes: "90-day comprehensive check-in scheduled. Automated confidential survey ready."
  },
  {
    id: "AFT-003",
    caseNumber: "POSH-HOOGHLY-2026-0001",
    orgName: "Hooghly River Shipping Logistics",
    complainantCode: "CMP-3108",
    closureDate: "2026-05-10T00:00:00Z",
    interval: "180_DAYS",
    dueDate: "2026-11-10T00:00:00Z",
    status: "RETALIATION_FLAGGED",
    retaliationScore: "HIGH",
    notes: "Complainant reported subtle exclusion from project planning meetings by interim supervisor."
  }
];

export default function PoshAftercarePage() {
  const [queue, setQueue] = useState<AftercareItem[]>(INITIAL_QUEUE);
  const [activeTab, setActiveTab] = useState<"ALL" | "DUE" | "FLAGGED">("ALL");

  const handleSendSurvey = (id: string) => {
    setQueue(
      queue.map((item) =>
        item.id === id ? { ...item, status: "SURVEY_SENT" } : item
      )
    );
    alert("Confidential Aftercare check-in pulse dispatched via encrypted SMS & Email.");
  };

  const filtered = queue.filter((item) => {
    if (activeTab === "DUE") return item.status === "PENDING_DISPATCH";
    if (activeTab === "FLAGGED") return item.status === "RETALIATION_FLAGGED";
    return true;
  });

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/posh/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Central POSH Command</span>
          </Link>
          <span className="text-[11px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
            PRD Screen Ref: X-07
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
              <HeartPulse className="w-4 h-4 text-primary" />
              <span>Post-Inquiry Care &amp; Retaliation Prevention</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink mt-1">
              30 / 90 / 180-Day Post-Case Aftercare Queue
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Statutory duty of care: monitors complainant and witness reintegration, tracks performance appraisal equity, and investigates early indicators of reprisal.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("ALL")}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition ${activeTab === "ALL" ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              All Checkpoints ({queue.length})
            </button>
            <button
              onClick={() => setActiveTab("DUE")}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition ${activeTab === "DUE" ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              Pending Dispatch
            </button>
            <button
              onClick={() => setActiveTab("FLAGGED")}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition ${activeTab === "FLAGGED" ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700'}`}
            >
              Retaliation Flags (1)
            </button>
          </div>
        </div>

        {/* Aftercare List */}
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`bg-white p-5 rounded-card border shadow-sm transition ${
                item.status === 'RETALIATION_FLAGGED'
                  ? 'border-red-300 ring-1 ring-red-200'
                  : 'border-border'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-primary">{item.caseNumber}</span>
                    <span className="text-xs text-slate-500 font-medium">&bull; {item.orgName}</span>
                    <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                      Subject: {item.complainantCode}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                      {item.interval.replace("_", " ")} Milestone
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 mt-2">
                    <strong className="text-ink">Clinical / Legal Note:</strong> {item.notes}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Check Date</div>
                    <div className="text-xs font-bold text-ink">{formatDate(item.dueDate)}</div>
                  </div>

                  {item.status === "PENDING_DISPATCH" && (
                    <button
                      onClick={() => handleSendSurvey(item.id)}
                      className="px-3 py-1.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded flex items-center gap-1.5 transition shadow"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Pulse</span>
                    </button>
                  )}

                  {item.status === "SURVEY_SENT" && (
                    <span className="px-3 py-1.5 bg-amber-50 text-amber-800 text-xs font-semibold rounded border border-amber-200 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Survey Awaiting Response</span>
                    </span>
                  )}

                  {item.status === "RESPONSE_RECEIVED" && (
                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded border border-emerald-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Safe Climate Confirmed</span>
                    </span>
                  )}

                  {item.status === "RETALIATION_FLAGGED" && (
                    <Link
                      href="/posh/retaliation"
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded flex items-center gap-1.5 transition shadow"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Open Retaliation Inquiry</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

