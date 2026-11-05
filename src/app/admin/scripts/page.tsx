"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Code,
  ShieldAlert,
  ShieldCheck,
  Power,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Plus,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { ScriptTag } from "@/lib/types";

export default function AdminScriptsPage() {
  const [masterKillSwitch, setMasterKillSwitch] = useState(false);
  const [scripts, setScripts] = useState<ScriptTag[]>(platformStore.getScripts());
  const [selectedScript, setSelectedScript] = useState<ScriptTag | null>(scripts[0] || null);

  const toggleScript = (id: string, currentState: boolean) => {
    platformStore.updateScript(id, !currentState);
    setScripts([...platformStore.getScripts()]);
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
                Tag &amp; Script Governance
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Script Injection &amp; Pixel Manager
              </h1>
            </div>
          </div>

          {/* Master Kill Switch per PRD */}
          <div className="flex items-center gap-3 bg-red-50 p-3 rounded border border-red-200">
            <div>
              <div className="text-xs font-bold text-red-900">Master Script Kill Switch</div>
              <div className="text-[10px] text-red-700">Disables all non-essential scripts instantly</div>
            </div>
            <button
              onClick={() => {
                const next = !masterKillSwitch;
                setMasterKillSwitch(next);
                if (next) {
                  scripts.forEach((s) => platformStore.updateScript(s.id, false));
                  setScripts([...platformStore.getScripts()]);
                }
              }}
              className={`p-2 rounded-full transition-colors ${
                masterKillSwitch ? "bg-status-danger text-white" : "bg-white border border-red-300 text-red-700"
              }`}
            >
              <Power className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Safeguard Notice for POSH Portal per PRD Section 22.2 */}
        <div className="p-4 bg-emerald-50 rounded border border-emerald-300 text-xs text-emerald-950 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <strong>Strict POSH Privacy Safeguard (PRD Rule BR-046):</strong> By architectural design, all tracking scripts, marketing pixels, and third-party telemetry are strictly blocked on all <code>/posh/*</code> complaint and survivor pages to ensure 100% confidentiality under Section 16 of the Act.
          </div>
        </div>

        {/* Scripts List & Code Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
            <div className="p-4 bg-surface border-b border-border font-bold text-ink text-xs uppercase tracking-wider">
              Installed Scripts ({scripts.length})
            </div>

            <div className="divide-y divide-border-subtle">
              {scripts.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedScript(s)}
                  className={`p-4 hover:bg-surface cursor-pointer transition-colors space-y-2 ${
                    selectedScript?.id === s.id ? "bg-primary-light/40" : ""
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-ink">{s.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleScript(s.id, s.isEnabled);
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        s.isEnabled ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {s.isEnabled ? "ENABLED" : "DISABLED"}
                    </button>
                  </div>
                  <div className="text-[11px] text-ink-secondary flex justify-between">
                    <span>Provider: {s.provider}</span>
                    <span>Placement: &lt;{s.placement}&gt;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-card p-6 border border-border shadow-card space-y-4 text-xs">
            {selectedScript ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-border pb-3">
                  <div>
                    <h3 className="font-serif font-bold text-base text-ink">
                      {selectedScript.name}
                    </h3>
                    <div className="text-[11px] text-ink-secondary mt-0.5">
                      Scope: {selectedScript.scope} &bull; Consent: {selectedScript.consentCategory}
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                    selectedScript.isEnabled ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-800"
                  }`}>
                    {selectedScript.isEnabled ? "ACTIVE IN PRODUCTION" : "INACTIVE"}
                  </span>
                </div>

                <div>
                  <label className="block font-semibold text-ink mb-1">
                    Raw Script Code (Read-Only Preview):
                  </label>
                  <pre className="p-3 bg-slate-900 text-slate-200 rounded font-mono text-[11px] overflow-x-auto leading-relaxed">
                    {selectedScript.code}
                  </pre>
                </div>

                <div className="bg-surface p-3 rounded border border-border space-y-1 text-[11px] text-ink-secondary">
                  <div>Last modified by: <strong>{selectedScript.lastModifiedBy}</strong></div>
                  <div>Disallowed on POSH portals: <strong>True (Enforced by Layout)</strong></div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-ink-secondary">
                Select a script to inspect code and properties.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

