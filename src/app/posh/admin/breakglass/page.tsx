"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  KeyRound,
  ShieldAlert,
  AlertTriangle,
  ArrowLeft,
  Clock,
  CheckCircle2,
  FileText,
  UserCheck,
  Building2,
  AlertCircle
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";

interface BreakGlassLog {
  id: string;
  caseNumber: string;
  orgName: string;
  authorizedBy: string;
  reasonCategory: string;
  justification: string;
  timestamp: string;
  ipAddress: string;
  durationMinutes: number;
}

const INITIAL_LOGS: BreakGlassLog[] = [
  {
    id: "BG-2026-003",
    caseNumber: "POSH-TECHKOL-2026-0014",
    orgName: "Kolkata Cloud Technologies Pvt Ltd",
    authorizedBy: "Adv. Subhasish Mukherjee (Managing Partner)",
    reasonCategory: "Urgent Police / Cyber Cell Subpoena",
    justification: "Formal CrPC notice received from Bidhannagar Cyber Crime Police Station requesting preservation of forensic exhibits.",
    timestamp: "2026-10-18T14:22:00Z",
    ipAddress: "103.21.244.18 (Kolkata Chambers)",
    durationMinutes: 60
  }
];

export default function PoshBreakGlassPage() {
  const [logs, setLogs] = useState<BreakGlassLog[]>(INITIAL_LOGS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    caseNumber: "POSH-TECHKOL-2026-0014",
    authorizedBy: "Adv. Subhasish Mukherjee (Managing Partner)",
    reasonCategory: "Urgent Police / Cyber Cell Subpoena",
    justification: "",
    emergencyPin: ""
  });
  const [activeSession, setActiveSession] = useState<string | null>(null);

  const handleTrigger = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.emergencyPin !== "ACORN-9900") {
      alert("Invalid Security Override Passcode. Access denied.");
      return;
    }

    const newLog: BreakGlassLog = {
      id: `BG-2026-00${logs.length + 1}`,
      caseNumber: form.caseNumber,
      orgName: "Kolkata Cloud Technologies Pvt Ltd",
      authorizedBy: form.authorizedBy,
      reasonCategory: form.reasonCategory,
      justification: form.justification,
      timestamp: new Date().toISOString(),
      ipAddress: "103.21.244.18 (Kolkata Chambers)",
      durationMinutes: 60
    };

    setLogs([newLog, ...logs]);
    setActiveSession(form.caseNumber);
    setShowModal(false);
    platformStore.addAuditLog(
      "BREAK_GLASS_TRIGGERED",
      form.authorizedBy,
      `Emergency break-glass access invoked for case ${form.caseNumber}. Reason: ${form.reasonCategory}`
    );
  };

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/posh/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Central POSH Command</span>
          </Link>
          <span className="text-[11px] font-mono bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded border border-red-200">
            PRD Screen Ref: X-06 (Emergency Audit)
          </span>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-50 border-2 border-red-200 p-6 rounded-card shadow-sm text-red-950 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shrink-0 text-red-700">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-red-950">
                Break-Glass Emergency Decryption Protocol
              </h1>
              <p className="text-xs text-red-800 mt-1 max-w-2xl leading-relaxed">
                Break-Glass grants temporary administrative visibility into a case file during severe legal emergencies (Section 18 appeals, police subpoenas, or incapacitation of the Internal Committee).
                Every invocation is <strong>cryptographically signed</strong> and alerts all IC members.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded transition flex items-center gap-2 shadow"
          >
            <KeyRound className="w-4 h-4" />
            <span>Invoke Break-Glass Access</span>
          </button>
        </div>

        {activeSession && (
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-card flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center gap-2 font-medium">
              <Clock className="w-4 h-4 text-amber-600 animate-spin" />
              <span>
                Active Break-Glass Session for <strong>{activeSession}</strong>: Time remaining 58 minutes.
              </span>
            </div>
            <Link
              href={`/posh/ic/cases/CASE-001`}
              className="px-3 py-1 bg-amber-600 text-white rounded font-bold hover:bg-amber-700 transition"
            >
              Access Case File
            </Link>
          </div>
        )}

        {/* Audit Log Table */}
        <div className="bg-white rounded-card border border-border shadow-sm overflow-hidden">
          <div className="p-5 border-b border-border bg-slate-50/75 flex justify-between items-center">
            <div>
              <h2 className="font-serif text-base font-bold text-ink">Historical Break-Glass Audit Trail</h2>
              <p className="text-xs text-slate-500">Tamper-evident record of all emergency overrides</p>
            </div>
            <span className="text-xs font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
              Immutable Ledger
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-600 font-semibold border-b border-border uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Log ID &amp; Timestamp</th>
                  <th className="py-3 px-4">Case # &amp; Client</th>
                  <th className="py-3 px-4">Authorized Counsel</th>
                  <th className="py-3 px-4">Reason Category</th>
                  <th className="py-3 px-4">Justification Narrative</th>
                  <th className="py-3 px-4">IP Address</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-primary">{log.id}</div>
                      <div className="text-[10px] text-slate-500">{formatDate(log.timestamp)}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-medium text-ink">{log.caseNumber}</div>
                      <div className="text-[11px] text-slate-500">{log.orgName}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {log.authorizedBy}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-red-50 text-red-700 border border-red-200">
                        {log.reasonCategory}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs text-slate-600 truncate" title={log.justification}>
                      {log.justification}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      {log.ipAddress}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Logged</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-card max-w-lg w-full p-6 shadow-2xl border-2 border-red-500">
              <div className="flex items-center gap-2 text-red-600 mb-2">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-serif text-lg font-bold text-red-950">Statutory Break-Glass Verification</h3>
              </div>
              <p className="text-xs text-slate-600 mb-4">
                This emergency operation will decrypt the restricted case file for 60 minutes. An immediate notification will be dispatched to the Presiding Officer and Acorn Compliance Officer.
              </p>

              <form onSubmit={handleTrigger} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target POSH Case *</label>
                  <select
                    value={form.caseNumber}
                    onChange={(e) => setForm({ ...form, caseNumber: e.target.value })}
                    className="w-full p-2 border border-border rounded bg-white"
                  >
                    <option value="POSH-TECHKOL-2026-0014">POSH-TECHKOL-2026-0014 (Kolkata Cloud Technologies)</option>
                    <option value="POSH-BENGALIND-2026-0008">POSH-BENGALIND-2026-0008 (Bengal Precision Engineering)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Emergency Justification Category *</label>
                  <select
                    value={form.reasonCategory}
                    onChange={(e) => setForm({ ...form, reasonCategory: e.target.value })}
                    className="w-full p-2 border border-border rounded bg-white"
                  >
                    <option value="Urgent Police / Cyber Cell Subpoena">Urgent Police / Cyber Cell Subpoena (CrPC / BNSS)</option>
                    <option value="Section 18 Appellate Tribunal Order">Section 18 Appellate Tribunal / High Court Order</option>
                    <option value="Presiding Officer Incapacitation">Presiding Officer Incapacitation / Quorum Emergency</option>
                    <option value="Imminent Retaliation / Life Safety Threat">Imminent Retaliation / Life Safety Threat</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Detailed Case Justification &amp; Authority *</label>
                  <textarea
                    rows={3}
                    required
                    value={form.justification}
                    onChange={(e) => setForm({ ...form, justification: e.target.value })}
                    placeholder="Cite official notice number, court order ref, or factual circumstances requiring immediate break-glass access..."
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold text-red-900 block mb-1">Authorized Managing Partner Passcode *</label>
                  <input
                    type="password"
                    required
                    value={form.emergencyPin}
                    onChange={(e) => setForm({ ...form, emergencyPin: e.target.value })}
                    placeholder="Enter security override code (ACORN-9900)"
                    className="w-full p-2 border border-red-300 rounded bg-red-50/50"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Test pass: <code>ACORN-9900</code></span>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-border text-slate-700 rounded hover:bg-slate-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded shadow transition"
                  >
                    Authorize &amp; Decrypt
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

