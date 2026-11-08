"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  LifeBuoy,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Building,
} from "lucide-react";
import { platformStore } from "@/lib/store";

export default function PoshOrgSupportPage() {
  const [selectedOrgId, setSelectedOrgId] = useState("org-1");
  const orgs = platformStore.getOrganizations();
  const activeOrg = orgs.find((o) => o.id === selectedOrgId) || orgs[0];

  const [ticketSubject, setTicketSubject] = useState("");
  const [priority, setPriority] = useState<"P1_CRITICAL" | "P2_HIGH" | "P3_STANDARD">("P2_HIGH");
  const [caseReference, setCaseReference] = useState("");
  const [description, setDescription] = useState("");
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const activeTickets = [
    {
      id: "TCK-2026-041",
      subject: "Clarification on Notice Delivery via Personal WhatsApp",
      priority: "P2 - High",
      caseRef: "POSH-TECHKOL-2026-0014",
      status: "In Progress (Adv. Debjani Sen)",
      sla: "Resolution due within 4h",
      createdAt: "2026-11-08 09:30 AM",
    },
    {
      id: "TCK-2026-018",
      subject: "Annual DO West Bengal Form Submission Attestation",
      priority: "P3 - Standard",
      caseRef: "N/A",
      status: "Resolved",
      sla: "Met (1.5h turnaround)",
      createdAt: "2026-10-20 11:15 AM",
    },
  ];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !description) return;

    const newTicketId = `TCK-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    setSubmittedTicket(newTicketId);
    setTicketSubject("");
    setDescription("");
    alert(`Support request registered: ${newTicketId}. Assigned to Acorn Senior POSH Counsel.`);
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-10 text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link
            href="/posh/org"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to Organisation Console ({activeOrg.name})</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/help" className="text-primary font-semibold hover:underline">
              Public Knowledge Base &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                <LifeBuoy className="w-4 h-4 text-primary" />
                <span>PRD Screen O-10 &bull; Dedicated Legal Counsel Desk</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
                Employer Legal Support Desk &amp; Advisory Helpdesk
              </h1>
              <p className="text-xs text-ink-secondary mt-1">
                Employer: <span className="font-semibold text-ink">{activeOrg.name}</span> &bull; Confidential legal advisory SLA backed by Acorn Legal Consultants.
              </p>
            </div>

            <select
              value={selectedOrgId}
              onChange={(e) => setSelectedOrgId(e.target.value)}
              className="px-3 py-2 bg-white border border-border rounded text-xs font-semibold text-ink shrink-0"
            >
              {orgs.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* SLA Coverage Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-surface p-4 rounded-card border border-border text-xs space-y-1">
            <div className="text-[10px] uppercase font-bold text-red-700">P1 Critical SLA (2 Hours)</div>
            <div className="font-bold text-ink">Urgent Safety / Police Threat</div>
            <p className="text-ink-secondary text-[11px]">Immediate intervention by managing counsel.</p>
          </div>

          <div className="bg-surface p-4 rounded-card border border-border text-xs space-y-1">
            <div className="text-[10px] uppercase font-bold text-amber-700">P2 High SLA (6 Hours)</div>
            <div className="font-bold text-ink">Procedural Inquiry Questions</div>
            <p className="text-ink-secondary text-[11px]">Limitation, quorum, or interim transfer advice.</p>
          </div>

          <div className="bg-surface p-4 rounded-card border border-border text-xs space-y-1">
            <div className="text-[10px] uppercase font-bold text-emerald-700">P3 Standard SLA (24 Hours)</div>
            <div className="font-bold text-ink">Statutory Filing &amp; LMS Queries</div>
            <p className="text-ink-secondary text-[11px]">Policy updates and DO return assistance.</p>
          </div>
        </div>

        {/* Ticket Submission Form */}
        <form onSubmit={handleCreateTicket} className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <h2 className="font-serif font-bold text-base text-ink border-b border-border-subtle pb-3">
            Open Advisory Request with Chambers Counsel
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-ink-secondary font-medium mb-1">Subject / Advisory Topic</label>
              <input
                type="text"
                placeholder="e.g. Quorum validity check for emergency hearing"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-border rounded text-xs focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-ink-secondary font-medium mb-1">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-border rounded text-xs focus:outline-none focus:border-primary"
              >
                <option value="P1_CRITICAL">P1 - Critical (2-Hour SLA)</option>
                <option value="P2_HIGH">P2 - High (6-Hour SLA)</option>
                <option value="P3_STANDARD">P3 - Standard (24-Hour SLA)</option>
              </select>
            </div>

            <div>
              <label className="block text-ink-secondary font-medium mb-1">Docket Ref (Optional &bull; Case ID only)</label>
              <input
                type="text"
                placeholder="e.g. POSH-TECHKOL-2026-0014"
                value={caseReference}
                onChange={(e) => setCaseReference(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-border rounded text-xs font-mono focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="text-xs space-y-1">
            <label className="block text-ink-secondary font-medium">Detailed Advisory Request</label>
            <textarea
              rows={4}
              placeholder="State the statutory question or procedural challenge. Remember to omit personal names or complaint allegations pursuant to Section 16 confidentiality..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-white border border-border rounded text-xs leading-relaxed focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-accent" />
              <span>Submit Request to Counsel</span>
            </button>
          </div>
        </form>

        {/* Active Tickets Ledger */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <h2 className="font-serif font-bold text-base text-ink">
            Advisory Ticket History &amp; Counsel Turnaround
          </h2>

          <div className="space-y-3">
            {activeTickets.map((t) => (
              <div key={t.id} className="bg-white p-4 rounded border border-border space-y-2 text-xs">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-border-subtle pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-primary">{t.id}</span>
                    <span className="font-bold text-ink text-sm">{t.subject}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                    t.status.includes("Resolved") ? "bg-emerald-100 text-emerald-800" : "bg-primary text-white"
                  }`}>
                    {t.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-ink-secondary">
                  <div>Priority: <span className="font-semibold text-ink">{t.priority}</span></div>
                  <div>Docket Ref: <span className="font-mono text-primary font-semibold">{t.caseRef}</span></div>
                  <div>SLA Tracking: <span className="font-semibold text-ink">{t.sla}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
