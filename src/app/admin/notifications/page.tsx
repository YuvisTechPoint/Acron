"use client";

import React, { useState, useEffect } from "react";
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
  Filter,
  Plus,
  Send,
  X
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { platformStore } from "@/lib/store";
import { NotificationLogItem } from "@/lib/types";

export default function AdminNotificationCenterPage() {
  const [logs, setLogs] = useState<NotificationLogItem[]>([]);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [poshMaskingStrict, setPoshMaskingStrict] = useState(true);
  const [channelFilter, setChannelFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [testForm, setTestForm] = useState({
    channel: "EMAIL" as "EMAIL" | "SMS" | "INTERNAL",
    recipient: "subhasish@acornlegal.in",
    templateCode: "TMPL-TEST-DISPATCH",
    subject: "Chambers System Test Dispatch - Gateway Operational",
  });

  const loadData = () => {
    setLogs(platformStore.getNotificationLogs());
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSendTest = (e: React.FormEvent) => {
    e.preventDefault();
    platformStore.addNotificationLog({
      channel: testForm.channel,
      recipient: testForm.recipient,
      templateCode: testForm.templateCode,
      subject: testForm.subject,
      status: "DELIVERED",
    });

    triggerToast(`Sent test notification to ${testForm.recipient}`);
    setShowModal(false);
    loadData();
  };

  const handleTogglePref = (type: "email" | "sms" | "posh") => {
    if (type === "email") {
      const next = !emailAlerts;
      setEmailAlerts(next);
      triggerToast(`Email alerts ${next ? "Enabled" : "Disabled"}`);
    } else if (type === "sms") {
      const next = !smsAlerts;
      setSmsAlerts(next);
      triggerToast(`SMS alerts ${next ? "Enabled" : "Disabled"}`);
    } else {
      const next = !poshMaskingStrict;
      setPoshMaskingStrict(next);
      triggerToast(`POSH strict masking ${next ? "Enforced" : "Relaxed"}`);
    }
  };

  const filtered = logs.filter((l) => channelFilter === "all" || l.channel === channelFilter);

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

        {/* Toast */}
        {toastMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-900 font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-sm">
          <div>
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

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Test Alert</span>
          </button>
        </div>

        {/* Global Channel Toggles */}
        <div className="bg-white p-5 rounded-card border border-border shadow-sm space-y-4">
          <h2 className="font-bold text-sm text-ink border-b pb-2 flex items-center gap-2">
            <Settings className="w-4 h-4 text-primary" />
            <span>Channel Master Controls &amp; Privacy Rules</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div
              onClick={() => handleTogglePref("email")}
              className="p-3 bg-slate-50 border border-slate-200 rounded flex items-start gap-2.5 cursor-pointer hover:bg-slate-100 transition"
            >
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={() => {}}
                className="mt-0.5 rounded text-primary"
              />
              <div>
                <div className="font-bold text-ink flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span>Email Alerts (AWS SES)</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Instant lead &amp; fee notifications to counsel</div>
              </div>
            </div>

            <div
              onClick={() => handleTogglePref("sms")}
              className="p-3 bg-slate-50 border border-slate-200 rounded flex items-start gap-2.5 cursor-pointer hover:bg-slate-100 transition"
            >
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={() => {}}
                className="mt-0.5 rounded text-primary"
              />
              <div>
                <div className="font-bold text-ink flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-primary" />
                  <span>SMS Gateway</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">High-priority OTP &amp; hearing summons</div>
              </div>
            </div>

            <div
              onClick={() => handleTogglePref("posh")}
              className="p-3 bg-emerald-50/70 border border-emerald-200 rounded flex items-start gap-2.5 cursor-pointer hover:bg-emerald-100/70 transition"
            >
              <input
                type="checkbox"
                checked={poshMaskingStrict}
                onChange={() => {}}
                className="mt-0.5 rounded text-emerald-700"
              />
              <div>
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>POSH Section 16 Masking</span>
                </div>
                <div className="text-[11px] text-emerald-800 mt-0.5">Enforces redaction of all party identifiers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-card border border-border shadow-sm flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-semibold">Filter Channel:</span>
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="p-1.5 border border-border rounded text-xs bg-white text-slate-700"
            >
              <option value="all">All Channels</option>
              <option value="EMAIL">Email (AWS SES)</option>
              <option value="SMS">SMS Gateway</option>
              <option value="INTERNAL">Internal Notifications</option>
            </select>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {filtered.length} logs recorded
          </span>
        </div>

        {/* Dispatch Log Table */}
        <div className="bg-white rounded-card border border-border shadow-sm overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-border uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Log ID &amp; Channel</th>
                  <th className="py-3 px-4">Recipient</th>
                  <th className="py-3 px-4">Template &amp; Subject</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4 font-mono font-bold text-primary">
                      <div>{log.id}</div>
                      <span className="text-[10px] font-sans font-normal text-slate-500">{log.channel}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {log.recipient}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-ink">{log.subject}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{log.templateCode}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-slate-500 font-mono text-[11px]">
                      {new Date(log.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-card max-w-md w-full p-6 shadow-xl border border-border space-y-4 text-xs animate-fadeIn">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <h3 className="font-serif text-lg font-bold text-ink">Dispatch Test Alert</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded text-slate-400 hover:text-ink"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSendTest} className="space-y-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Notification Channel</label>
                  <select
                    value={testForm.channel}
                    onChange={(e) => setTestForm({ ...testForm, channel: e.target.value as any })}
                    className="w-full p-2 border border-border rounded bg-white"
                  >
                    <option value="EMAIL">Email (AWS SES)</option>
                    <option value="SMS">SMS Gateway</option>
                    <option value="INTERNAL">Internal Alert</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Recipient Address / Number *</label>
                  <input
                    type="text"
                    required
                    value={testForm.recipient}
                    onChange={(e) => setTestForm({ ...testForm, recipient: e.target.value })}
                    placeholder="e.g. subhasish@acornlegal.in or +91 98300..."
                    className="w-full p-2 border border-border rounded font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject Header *</label>
                  <input
                    type="text"
                    required
                    value={testForm.subject}
                    onChange={(e) => setTestForm({ ...testForm, subject: e.target.value })}
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-border text-slate-600 rounded hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded font-bold hover:bg-primary-light transition"
                  >
                    Dispatch Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
