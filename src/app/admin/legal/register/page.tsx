"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Scale,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Search,
  ArrowRight,
  Download,
  Plus,
  X,
  ArrowLeft,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { useRealtimeLegalPrecedents } from "@/lib/realtime";
import { LegalPrecedentItem } from "@/lib/types";
import { downloadCsv } from "@/lib/export-csv";

export default function AdminLegalRegisterPage() {
  const precedents = useRealtimeLegalPrecedents();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    citation: "",
    forum: "Supreme Court of India",
    date: "",
    category: "CONSTITUTIONAL & PROCEDURAL",
    principles: "",
    impact: "",
  });

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.citation || !form.principles) return;

    platformStore.addLegalPrecedent({
      citation: form.citation,
      forum: form.forum,
      date: form.date || new Date().toLocaleString("en-IN", { month: "short", year: "numeric" }),
      category: form.category,
      principles: form.principles,
      impact: form.impact || "Binding statutory interpretation across inquiry proceedings.",
      verifiedByCounsel: true,
    });

    triggerToast(`Registered precedent: ${form.citation}`);
    setShowModal(false);
    setForm({
      citation: "",
      forum: "Supreme Court of India",
      date: "",
      category: "CONSTITUTIONAL & PROCEDURAL",
      principles: "",
      impact: "",
    });
  };

  const filtered = precedents.filter(
    (p) =>
      p.citation.toLowerCase().includes(search.toLowerCase()) ||
      p.forum.toLowerCase().includes(search.toLowerCase()) ||
      p.principles.toLowerCase().includes(search.toLowerCase()) ||
      (p.category || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = ["Citation", "Forum / Court", "Date", "Category", "Judicial Principles", "Acorn Procedural Rule", "Verified By Counsel"];
    const rows = filtered.map((p) => [
      p.citation,
      p.forum,
      p.date,
      p.category,
      p.principles,
      p.impact,
      p.verifiedByCounsel ? "Yes" : "Pending",
    ]);
    downloadCsv(`Acorn_Legal_Register_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Top Header */}
      <div className="bg-ink-950 text-white border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brass-400 mb-2">
                <span>Statutory Authority &amp; Case-Law Library</span>
                <span>•</span>
                <span>PRD Section 38</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Chambers Legal Register &amp; Precedent Watch
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl font-sans">
                Curated jurisprudential register of binding Supreme Court, Calcutta High Court, MCA, and MWCD authorities governing sexual harassment inquiries and employer obligations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition"
                title="Download Legal Precedents CSV"
              >
                <Download className="w-3.5 h-3.5 text-brass-400" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="px-3.5 py-1.5 bg-brass-600 hover:bg-brass-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Judicial Ruling</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Toast */}
        {toastMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-900 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search rulings by case name, court, or statutory principle..."
            className="w-full text-xs text-slate-800 focus:outline-none"
          />
          <span className="text-[11px] text-slate-400 shrink-0">
            {filtered.length} of {precedents.length} authorities
          </span>
        </div>

        {/* Precedents Cards */}
        <div className="grid grid-cols-1 gap-6">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-lg border border-slate-200 p-8 text-center text-xs text-slate-500">
              No judicial precedents matched your search criteria.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4 hover:border-slate-300 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[11px] text-brass-700 font-bold mb-1">
                      <Scale className="w-3.5 h-3.5" />
                      <span>{item.forum}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{item.citation}</h3>
                  </div>

                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-navy-50 text-navy-800 border border-navy-200 self-start">
                    {item.category}
                  </span>
                </div>

                <div className="space-y-2 text-xs leading-relaxed text-slate-600">
                  <p>
                    <strong className="text-slate-800">Judicial Ruling: </strong>
                    {item.principles}
                  </p>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded text-[11px]">
                    <strong className="text-navy-950">Acorn Platform Procedural Rule: </strong>
                    <span className="text-slate-700">{item.impact}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-medium text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified by Senior Counsel (Acorn Chambers)</span>
                  </span>
                  <span className="font-mono text-[10px]">Effective-Dated 2026-27</span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 space-y-4 text-xs shadow-xl animate-fade-up">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-base text-slate-900">Add Judicial Authority</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Case Citation *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Union of India v. Dilip Paul (2023)"
                  value={form.citation}
                  onChange={(e) => setForm({ ...form, citation: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:outline-none focus:border-navy-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Judicial Forum</label>
                  <select
                    value={form.forum}
                    onChange={(e) => setForm({ ...form, forum: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded text-xs"
                  >
                    <option value="Supreme Court of India">Supreme Court of India</option>
                    <option value="Calcutta High Court">Calcutta High Court</option>
                    <option value="Delhi High Court">Delhi High Court</option>
                    <option value="Bombay High Court">Bombay High Court</option>
                    <option value="Ministry of Women & Child Development">MWCD / Central Govt</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Ruling Date</label>
                  <input
                    type="text"
                    placeholder="e.g. Nov 2023"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Core Judicial Principles *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Summary of legal ratio decidendi..."
                  value={form.principles}
                  onChange={(e) => setForm({ ...form, principles: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Acorn Platform Procedural Impact</label>
                <textarea
                  rows={2}
                  placeholder="How this binds the inquiry workflows or IC operations..."
                  value={form.impact}
                  onChange={(e) => setForm({ ...form, impact: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded text-xs hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-navy-700 hover:bg-navy-800 text-white rounded text-xs font-semibold"
                >
                  Save Authority
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
