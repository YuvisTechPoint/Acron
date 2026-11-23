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
  Filter,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast";

interface SupportTicket {
  id: string;
  subject: string;
  priority: string;
  caseRef: string;
  status: string;
  sla: string;
  createdAt: string;
  description?: string;
}

export default function PoshOrgSupportPage() {
  const { toast } = useToast();
  const [selectedOrgId, setSelectedOrgId] = useState("org-1");
  const orgs = platformStore.getOrganizations();
  const activeOrg = orgs.find((o) => o.id === selectedOrgId) || orgs[0];

  const [ticketSubject, setTicketSubject] = useState("");
  const [priority, setPriority] = useState<"P1_CRITICAL" | "P2_HIGH" | "P3_STANDARD">("P2_HIGH");
  const [caseReference, setCaseReference] = useState("");
  const [description, setDescription] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "IN_PROGRESS" | "RESOLVED">("ALL");

  const [tickets, setTickets] = useState<SupportTicket[]>(() =>
    platformStore.getOrgSupportTickets(selectedOrgId)
  );

  const handleOrgChange = (orgId: string) => {
    setSelectedOrgId(orgId);
    setTickets(platformStore.getOrgSupportTickets(orgId));
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !description.trim()) {
      toast({
        title: "Validation Incomplete",
        description: "Please provide both an advisory subject and detailed inquiry description.",
        variant: "warning",
      });
      return;
    }

    const priorityLabels = {
      P1_CRITICAL: "P1 - Critical",
      P2_HIGH: "P2 - High",
      P3_STANDARD: "P3 - Standard",
    };

    const slaLabels = {
      P1_CRITICAL: "2-Hour Immediate Response",
      P2_HIGH: "Resolution due within 6h",
      P3_STANDARD: "Resolution due within 24h",
    };

    const newTicketId = `TCK-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const formattedDate = `${now.toISOString().split("T")[0]} ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

    const newTicket: SupportTicket = {
      id: newTicketId,
      subject: ticketSubject.trim(),
      priority: priorityLabels[priority],
      caseRef: caseReference.trim() || "N/A",
      status: "In Progress (Chambers Counsel)",
      sla: slaLabels[priority],
      createdAt: formattedDate,
      description: description.trim(),
    };

    platformStore.addOrgSupportTicket(selectedOrgId, newTicket);
    setTickets(platformStore.getOrgSupportTickets(selectedOrgId));
    setTicketSubject("");
    setCaseReference("");
    setDescription("");

    toast({
      title: "Support Request Lodged",
      description: `Support ticket ${newTicketId} registered. Assigned to Acorn Senior POSH Counsel.`,
      variant: "success",
    });
  };

  const filteredTickets = tickets.filter((t) => {
    if (statusFilter === "IN_PROGRESS") return t.status.includes("In Progress");
    if (statusFilter === "RESOLVED") return t.status.includes("Resolved");
    return true;
  });

  return (
    <div className="bg-ivory-50 min-h-screen py-10 text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
          <Link
            href="/posh/org"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-primary transition-colors min-h-[44px] px-2 -ml-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to Organisation Console ({activeOrg.name})</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/help"
              className="text-primary font-semibold hover:underline min-h-[44px] flex items-center px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
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

            <div className="flex items-center gap-3">
              <label htmlFor="org-select-support" className="sr-only">Select Employer Organisation</label>
              <div className="relative inline-flex items-center">
                <Building className="w-4 h-4 text-brass-700 absolute left-3 pointer-events-none" />
                <select
                  id="org-select-support"
                  value={selectedOrgId}
                  onChange={(e) => handleOrgChange(e.target.value)}
                  className="pl-9 pr-8 py-2 min-h-[44px] bg-white border border-border rounded-lg text-xs font-semibold text-ink shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-2xs hover:border-brass-500/60 transition"
                >
                  {orgs.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* SLA Coverage Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-surface p-4 rounded-lg border border-border border-l-4 border-l-rose-500 shadow-2xs text-xs space-y-1 hover:shadow-xs transition">
            <div className="text-[10px] uppercase font-bold text-rose-700">P1 Critical SLA (2 Hours)</div>
            <div className="font-bold text-ink">Urgent Safety / Police Threat</div>
            <p className="text-ink-secondary text-[11px] leading-relaxed">Immediate intervention by managing counsel.</p>
          </div>

          <div className="bg-surface p-4 rounded-lg border border-border border-l-4 border-l-amber-500 shadow-2xs text-xs space-y-1 hover:shadow-xs transition">
            <div className="text-[10px] uppercase font-bold text-amber-700">P2 High SLA (6 Hours)</div>
            <div className="font-bold text-ink">Procedural Inquiry Questions</div>
            <p className="text-ink-secondary text-[11px] leading-relaxed">Limitation, quorum, or interim transfer advice.</p>
          </div>

          <div className="bg-surface p-4 rounded-lg border border-border border-l-4 border-l-emerald-600 shadow-2xs text-xs space-y-1 hover:shadow-xs transition">
            <div className="text-[10px] uppercase font-bold text-emerald-700">P3 Standard SLA (24 Hours)</div>
            <div className="font-bold text-ink">Statutory Filing &amp; LMS Queries</div>
            <p className="text-ink-secondary text-[11px] leading-relaxed">Policy updates and DO return assistance.</p>
          </div>
        </div>

        {/* Ticket Submission Form */}
        <form onSubmit={handleCreateTicket} className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <h2 className="font-serif font-bold text-base text-ink border-b border-border-subtle pb-3">
            Open Advisory Request with Chambers Counsel
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label htmlFor="ticket-subject" className="block text-ink font-semibold mb-1">
                Subject / Advisory Topic <span className="text-red-500">*</span>
              </label>
              <input
                id="ticket-subject"
                type="text"
                placeholder="e.g. Quorum validity check for emergency hearing"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="w-full px-3 py-2.5 min-h-[44px] bg-white border border-border rounded-lg text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-2xs"
                required
              />
            </div>

            <div>
              <label htmlFor="ticket-priority" className="block text-ink font-semibold mb-1">
                Priority Level <span className="text-red-500">*</span>
              </label>
              <select
                id="ticket-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2.5 min-h-[44px] bg-white border border-border rounded-lg text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-2xs"
              >
                <option value="P1_CRITICAL">P1 - Critical (2-Hour SLA)</option>
                <option value="P2_HIGH">P2 - High (6-Hour SLA)</option>
                <option value="P3_STANDARD">P3 - Standard (24-Hour SLA)</option>
              </select>
            </div>

            <div>
              <label htmlFor="ticket-case-ref" className="block text-ink font-semibold mb-1">
                Docket Ref (Optional &bull; Case ID only)
              </label>
              <input
                id="ticket-case-ref"
                type="text"
                placeholder="e.g. POSH-TECHKOL-2026-0014"
                value={caseReference}
                onChange={(e) => setCaseReference(e.target.value)}
                className="w-full px-3 py-2.5 min-h-[44px] bg-white border border-border rounded-lg text-xs font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-2xs"
              />
            </div>
          </div>

          <div className="text-xs space-y-1">
            <label htmlFor="ticket-description" className="block text-ink font-semibold">
              Detailed Advisory Request <span className="text-red-500">*</span>
            </label>
            <textarea
              id="ticket-description"
              rows={4}
              placeholder="State the statutory question or procedural challenge. Remember to omit personal names or complaint allegations pursuant to Section 16 confidentiality..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-white border border-border rounded-lg text-xs leading-relaxed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-2xs"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 min-h-[44px] bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-hover flex items-center gap-2 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 focus-visible:ring-offset-2 transition"
            >
              <Send className="w-3.5 h-3.5 text-accent" />
              <span>Submit Request to Counsel</span>
            </button>
          </div>
        </form>

        {/* Active Tickets Ledger */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-border-subtle pb-3">
            <h2 className="font-serif font-bold text-base text-ink">
              Advisory Ticket History &amp; Counsel Turnaround ({filteredTickets.length})
            </h2>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-ink-secondary font-medium">Filter:</span>
              {(["ALL", "IN_PROGRESS", "RESOLVED"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setStatusFilter(mode)}
                  className={`px-3.5 py-2 min-h-[44px] rounded text-xs font-semibold transition inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    statusFilter === mode
                      ? "bg-primary text-white"
                      : "bg-white border border-border text-ink-secondary hover:bg-surface"
                  }`}
                >
                  {mode === "ALL" ? "All Tickets" : mode === "IN_PROGRESS" ? "In Progress" : "Resolved"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredTickets.map((t) => (
              <div
                key={t.id}
                className={`bg-white p-4 rounded-lg border border-border space-y-2.5 text-xs shadow-2xs hover:shadow-xs transition ${
                  t.status.includes("Resolved") ? "border-l-4 border-l-emerald-600" : "border-l-4 border-l-primary"
                }`}
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-border-subtle pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-primary bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{t.id}</span>
                    <span className="font-bold text-ink text-sm">{t.subject}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-[10.5px] font-bold ${
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

                {t.description && (
                  <p className="text-[11.5px] text-ink-secondary bg-surface p-2.5 rounded-lg border border-border-subtle leading-relaxed">
                    {t.description}
                  </p>
                )}

                <div className="text-[10.5px] text-ink-muted">
                  Lodged on: {t.createdAt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

