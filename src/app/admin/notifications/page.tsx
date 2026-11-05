"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Settings,
  Filter
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface NotificationLog {
  id: string;
  channel: "EMAIL" | "SMS" | "INTERNAL";
  recipient: string;
  templateCode: string;
  subject: string;
  status: "SENT" | "DELIVERED" | "QUEUED";
  timestamp: string;
}

const INITIAL_LOGS: NotificationLog[] = [
  {
    id: "NTF-902",
    channel: "EMAIL",
    recipient: "subhasish@acornlegal.in",
    templateCode: "TMPL-SR-NEW",
    subject: "New Service Request: ACN-SR-2026-000042 (Corporate Restructuring)",
    status: "DELIVERED",
    timestamp: "2026-10-28T11:20:00Z"
  },
  {
    id: "NTF-901",
    channel: "EMAIL",
    recipient: "debjani.sen@acornlegal.in",
    templateCode: "TMPL-POSH-INTAKE",
    subject: "Statutory Intake Alert: POSH-TECHKOL-2026-0014 (Section 16 Masked)",
    status: "DELIVERED",
    timestamp: "2026-10-27T09:15:00Z"
  },
  {
    id: "NTF-900",
    channel: "SMS",
    recipient: "+91 98300 *****",
    templateCode: "TMPL-OTP-SIGN",
    subject: "Acorn Legal OTP verification code for complaint filing affirmation.",
    status: "DELIVERED",
    timestamp: "2026-10-27T09:12:00Z"
  }
];

export default function AdminNotificationCenterPage() {
  const [logs] = useState<NotificationLog[]>(INITIAL_LOGS);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [poshMaskingStrict, setPoshMaskingStrict] = useState(true);

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Firm Dashboard</span>
          </Link>
          <span className="text-[11px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
            PRD Screen Ref: A-16
          </span>
        </div>

        {/* Header */}
        <div className="bg-white p-6 rounded-card border border-border shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
            <Bell className="w-4 h-4 text-primary" />
            <span>Dispatch Channels &bull; Template Gateway</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink mt-1">
            Notification Operations &amp; Delivery Logs
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Monitors transactional dispatches via AWS SES and SMS gateways, with mandatory Section 16 masking safeguards for POSH matters.
          </p>
        </div>

        {/* Global Channel Toggles */}
        <div className="bg-white p-5 rounded-card border border-border shadow-sm space-y-4">
          <h2 className="font-bold text-sm text-ink border-b pb-2 flex items-center gap-2">
            <Settings className="w-4 h-4 text-primary" />
            <span>Channel Master Controls &amp; Privacy Rules</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <label className="p-3 bg-slate-50 border border-slate-200 rounded flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="mt-0.5 rounded text-primary"
              />
              <div>
                <div className="font-bold text-ink flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span>Email Alerts (AWS SES)</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Instant lead &amp; fee notifications to counsel</div>
              </div>
            </label>

            <label className="p-3 bg-slate-50 border border-slate-200 rounded flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="mt-0.5 rounded text-primary"
              />
              <div>
                <div className="font-bold text-ink flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-primary" />
                  <span>SMS Gateway</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">High-priority OTP &amp; hearing summons</div>
              </div>
            </label>

            <label className="p-3 bg-emerald-50/70 border border-emerald-200 rounded flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={poshMaskingStrict}
                onChange={(e) => setPoshMaskingStrict(e.target.checked)}
                className="mt-0.5 rounded text-emerald-700"
              />
              <div>
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Rule BR-046 Masking</span>
                </div>
                <div className="text-[11px] text-emerald-800 mt-0.5">Never include party names in unencrypted emails</div>
              </div>
            </label>
          </div>
        </div>

        {/* Notification Logs */}
        <div className="bg-white rounded-card border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-slate-50 flex items-center justify-between">
            <h2 className="font-bold text-xs uppercase text-slate-700">Recent Transmission Ledger</h2>
            <span className="text-xs font-mono text-slate-500">Live Gateway Queue</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-600 font-semibold border-b border-border uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-2.5 px-4">Event ID &amp; Channel</th>
                  <th className="py-2.5 px-4">Recipient</th>
                  <th className="py-2.5 px-4">Template</th>
                  <th className="py-2.5 px-4">Subject Line</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-mono">
                      <span className="font-bold text-primary">{log.id}</span>
                      <span className="text-[10px] text-slate-400 block">{log.channel}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-mono text-[11px]">
                      {log.recipient}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {log.templateCode}
                    </td>
                    <td className="py-3 px-4 text-slate-800 max-w-sm truncate" title={log.subject}>
                      {log.subject}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px]">
                      {formatDate(log.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

