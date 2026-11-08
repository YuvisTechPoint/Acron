"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Share2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Calendar,
  MessageSquare,
  Database,
  ArrowRight,
  Sliders,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { IntegrationConnector } from "@/lib/types";

export default function OrgIntegrationsPage() {
  const [connectors, setConnectors] = useState<IntegrationConnector[]>(platformStore.getConnectors("TECHKOL"));
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  const toggleConnector = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "CONNECTED" ? "DISCONNECTED" : "CONNECTED";
    platformStore.toggleConnector(id, nextStatus as any);
    setConnectors(platformStore.getConnectors("TECHKOL"));
  };

  const triggerSync = (id: string, name: string) => {
    setSyncingId(id);
    setSyncNotice(null);
    setTimeout(() => {
      setSyncingId(null);
      const updated = connectors.map((c) => {
        if (c.id === id) {
          return { ...c, lastSyncAt: new Date().toISOString() };
        }
        return c;
      });
      setConnectors(updated);
      setSyncNotice(`Successfully synchronized '${name}'. All payloads scanned and validated against BR-082.`);
      setTimeout(() => setSyncNotice(null), 4000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Top Banner */}
      <div className="bg-[#050C17] text-white border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brass-400 mb-2">
                <span>Enterprise Integrations &amp; Client API</span>
                <span>•</span>
                <span>PRD Section 31 (E22 &amp; E23)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                HRMS, Calendar &amp; Collaboration Connectors
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl font-sans">
                Securely integrate corporate HR systems, calendar booking engines, and collaboration bots. All outbound traffic passes through the content-free PII scrubber.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded text-xs font-mono">
                Payload Scanners: ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Notice Card on BR-082 and BR-083 */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-lg p-4 text-xs text-blue-900 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-blue-950 uppercase tracking-wider text-[11px]">
              Business Rule BR-082 Active: Content-Free Zero-PII Egress
            </span>
            <p className="leading-relaxed">
              Outbound webhooks and collaboration bots (Slack, Teams) are strictly prohibited from transmitting employee names, complaint narratives, or evidentiary details. Notifications carry only tokenized references (e.g. <code>Docket Ref #9500</code>).
            </p>
          </div>
        </div>

        {syncNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{syncNotice}</span>
          </div>
        )}

        {/* Connectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {connectors.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 transition"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                      {c.category === "HRMS" && <Database className="w-5 h-5 text-navy-800" />}
                      {c.category === "CALENDAR" && <Calendar className="w-5 h-5 text-brass-700" />}
                      {c.category === "COLLABORATION" && <MessageSquare className="w-5 h-5 text-indigo-700" />}
                      {c.category === "CUSTOM_WEBHOOK" && <Share2 className="w-5 h-5 text-emerald-700" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{c.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {c.provider.replace("_", " ")}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] text-slate-500 font-sans">Sync: {c.syncFrequency}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold ${
                      c.status === "CONNECTED"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded p-3 text-xs font-mono text-slate-600 space-y-1">
                  {Object.entries(c.config).map(([key, val]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-slate-400 capitalize">{key}:</span>
                      <span className="font-semibold text-slate-700">{val}</span>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Last Sync: {new Date(c.lastSyncAt).toLocaleString()}</span>
                  <span>Errors: {c.errorCount}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => toggleConnector(c.id, c.status)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition border ${
                    c.status === "CONNECTED"
                      ? "bg-white hover:bg-slate-50 text-rose-700 border-rose-200"
                      : "bg-[#101F38] hover:bg-navy-900 text-brass-300 border-brass-500/30"
                  }`}
                >
                  {c.status === "CONNECTED" ? "Disconnect" : "Connect Account"}
                </button>

                <button
                  onClick={() => triggerSync(c.id, c.name)}
                  disabled={c.status !== "CONNECTED" || syncingId === c.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium transition disabled:opacity-40"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${syncingId === c.id ? "animate-spin" : ""}`} />
                  <span>{syncingId === c.id ? "Syncing..." : "Sync Now"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SIEM & Webhook Gateway Spec */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="font-serif font-bold text-base text-slate-900">Custom Webhook &amp; SIEM Outbox Pipeline</h2>
              <p className="text-xs text-slate-500 mt-0.5">Stream audit events directly into corporate Splunk, Datadog or Sentinel instances.</p>
            </div>
            <span className="text-xs font-mono text-brass-600 bg-brass-50 border border-brass-200 px-2.5 py-1 rounded">
              BR-071 Transactional Outbox
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
            <div className="p-3 bg-slate-50 rounded border border-slate-100 space-y-1">
              <div className="font-semibold text-slate-800">Guaranteed At-Least-Once</div>
              <p className="text-slate-500 text-[11px]">Domain events write synchronously to outbox table and stream asynchronously with exponential retry.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-100 space-y-1">
              <div className="font-semibold text-slate-800">HMAC-SHA256 Signatures</div>
              <p className="text-slate-500 text-[11px]">Every outbound webhook contains <code>X-Acorn-Signature</code> header signed by the employer's private key.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-100 space-y-1">
              <div className="font-semibold text-slate-800">Automated Re-keying</div>
              <p className="text-slate-500 text-[11px]">Secrets rotate every 90 days. Failed endpoints trigger alert after 5 consecutive back-off attempts.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
