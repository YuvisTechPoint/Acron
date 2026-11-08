"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Edit2, Save, X, CheckCircle2, Scale, Plus } from "lucide-react";
import { platformStore } from "@/lib/store";
import { LegalRule } from "@/lib/types";

export default function LegalRulesConsolePage() {
  const [rules, setRules] = useState<LegalRule[]>([]);
  const [editingParam, setEditingParam] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setRules(platformStore.getLegalRules());
  }, []);

  const refreshRules = () => {
    setRules(platformStore.getLegalRules());
  };

  const handleStartEdit = (rule: LegalRule) => {
    if (rule.param === "conciliation_allows_monetary") {
      alert("This parameter is a statutory guardrail locked by Section 10(1) Proviso of the POSH Act.");
      return;
    }
    setEditingParam(rule.param);
    setEditValue(rule.value);
  };

  const handleSaveEdit = (param: string) => {
    platformStore.updateLegalRule(param, editValue);
    setEditingParam(null);
    refreshRules();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-8 text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-navy-700 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-brass-500" />
            <span>Back to Firm Dashboard</span>
          </Link>
          <span className="text-[11px] font-mono bg-navy-50 text-navy-800 border border-navy-200 px-2 py-0.5 rounded">
            PRD Ref: Section 8.30
          </span>
        </div>

        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-card">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-navy-700 font-bold">
              <Scale className="w-4 h-4 text-brass-500" />
              <span>Legal Rules Engine &bull; Statutory Timeline Parameters</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink-950 mt-1">
              Effective-Dated Statutory Rules Registry
            </h1>
            <p className="text-xs text-ink-secondary mt-1">
              Configure statutory periods, inquiry limits, notice days, and conciliation boundaries.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/admin/legal/templates"
              className="px-3.5 py-1.5 border border-border text-xs font-semibold rounded-btn hover:bg-slate-50 text-navy-700 transition"
            >
              Templates Console &rarr;
            </Link>
            <Link
              href="/admin/legal/watch"
              className="px-3.5 py-1.5 border border-border text-xs font-semibold rounded-btn hover:bg-slate-50 text-navy-700 transition"
            >
              Statutory Watch &rarr;
            </Link>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-btn text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">Statutory rule updated and effective across the workflow engine.</span>
          </div>
        )}

        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <div className="p-4 bg-ivory-50 border-b border-border flex justify-between items-center">
            <span className="font-bold text-ink-950 uppercase tracking-wider text-[11px]">
              Active Statutory Parameters (Effective Rule Set: v1.0 &bull; 2026-27)
            </span>
            <span className="text-[11px] text-emerald-700 font-bold">&check; Counsel Dual Approval Active</span>
          </div>

          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
              <tr>
                <th className="p-3.5">Parameter Key</th>
                <th className="p-3.5">Configured Value</th>
                <th className="p-3.5">Statutory Source</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {rules.map((r) => (
                <tr key={r.param} className="hover:bg-slate-50/60 transition">
                  <td className="p-3.5 font-mono font-bold text-navy-700">
                    <div>{r.param}</div>
                    {r.description && (
                      <div className="text-[10px] text-ink-secondary font-sans font-normal mt-0.5">
                        {r.description}
                      </div>
                    )}
                  </td>
                  <td className="p-3.5 font-bold text-ink-950">
                    {editingParam === r.param ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="p-1 border border-border rounded font-bold w-24 text-xs"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEdit(r.param)}
                          className="p-1 bg-navy-700 text-white rounded hover:bg-blue-600"
                          title="Save"
                        >
                          <Save className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingParam(null)}
                          className="p-1 text-slate-400 hover:text-ink"
                          title="Cancel"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span>{r.value}</span>
                    )}
                  </td>
                  <td className="p-3.5 text-ink-secondary">{r.source}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.param === "conciliation_allows_monetary"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    {r.param !== "conciliation_allows_monetary" && (
                      <button
                        onClick={() => handleStartEdit(r)}
                        className="p-1 text-slate-400 hover:text-navy-700 rounded transition"
                        title="Edit Value"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
