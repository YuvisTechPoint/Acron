"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  ArrowLeft,
  CheckCircle2,
  Plus,
  Trash2,
  AlertCircle,
  X,
  Scale
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { CourtHoliday } from "@/lib/types";

export default function LegalCalendarsPage() {
  const [holidays, setHolidays] = useState<CourtHoliday[]>([]);
  const [selectedCalendar, setSelectedCalendar] = useState<"wb" | "central">("wb");
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    date: "",
    name: "",
    type: "State Gazetted",
    calendar: "wb" as "wb" | "central",
    affectsLimitation: true,
  });

  const loadData = () => {
    setHolidays(platformStore.getHolidays());
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.name) return;

    platformStore.addHoliday({
      date: formData.date,
      name: formData.name,
      type: formData.type,
      calendar: formData.calendar,
      affectsLimitation: formData.affectsLimitation,
    });

    triggerToast(`Added holiday: ${formData.name}`);
    setShowModal(false);
    setFormData({
      date: "",
      name: "",
      type: "State Gazetted",
      calendar: selectedCalendar,
      affectsLimitation: true,
    });
    loadData();
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove holiday "${name}" from judicial computation calendar?`)) {
      platformStore.deleteHoliday(id);
      triggerToast(`Removed holiday ${name}`);
      loadData();
    }
  };

  const displayedHolidays = holidays.filter(
    (h) => h.calendar === selectedCalendar || (selectedCalendar === "wb" && h.calendar === "central")
  );

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
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
            PRD Screen Ref: A-21
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
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-card">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-bold">
                Working-Day Computation &bull; Section 8.16 &bull; PRD Section 25
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Statutory Holiday &amp; Judicial Calendars
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Calcutta High Court vacations, City Civil Court gazetted days, and statutory limitation recalculation.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setFormData({
                date: "2026-11-15",
                name: "",
                type: selectedCalendar === "wb" ? "State Gazetted" : "National Gazetted",
                calendar: selectedCalendar,
                affectsLimitation: true,
              });
              setShowModal(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Court Holiday</span>
          </button>
        </div>

        {/* Statutory Info Banner */}
        <div className="p-4 bg-blue-50/70 border border-blue-200 rounded text-xs text-blue-900 flex items-start gap-2.5">
          <Scale className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <span>
            <strong>Section 4, Limitation Act 1963:</strong> Where the prescribed period for any suit, appeal or application expires on a day when the court is closed, the suit or application may be instituted on the day the court reopens. Days marked with limitation impact automatically extend POSH 90-day inquiry deadlines.
          </span>
        </div>

        {/* Calendar Switcher & Table */}
        <div className="bg-white rounded-card p-6 border border-border shadow-card space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-border pb-3">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCalendar("wb")}
                className={`px-3 py-1.5 rounded font-semibold transition ${
                  selectedCalendar === "wb" ? "bg-primary text-white" : "bg-surface text-ink hover:bg-slate-200"
                }`}
              >
                West Bengal &bull; Kolkata Jurisdiction
              </button>
              <button
                onClick={() => setSelectedCalendar("central")}
                className={`px-3 py-1.5 rounded font-semibold transition ${
                  selectedCalendar === "central" ? "bg-primary text-white" : "bg-surface text-ink hover:bg-slate-200"
                }`}
              >
                Central Government &bull; All India
              </button>
            </div>
            <span className="text-[11px] text-ink-secondary">
              Calendar Year 2026 &bull; Asia/Kolkata
            </span>
          </div>

          <div className="divide-y divide-border-subtle">
            {displayedHolidays.map((h) => (
              <div key={h.id} className="py-3 flex justify-between items-center hover:bg-slate-50/50 px-2 rounded transition">
                <div>
                  <div className="font-semibold text-ink flex items-center gap-2">
                    <span>{h.name}</span>
                    {h.affectsLimitation && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        Extends Limitation
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-ink-secondary mt-0.5">
                    {h.type} &bull; Jurisdiction: <span className="uppercase font-mono">{h.calendar}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-primary text-sm">{h.date}</span>
                  <button
                    onClick={() => handleDelete(h.id, h.name)}
                    className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-slate-100 transition"
                    title="Remove Holiday"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {displayedHolidays.length === 0 && (
              <div className="py-8 text-center text-slate-500">
                No holidays recorded for this jurisdiction.
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-card max-w-md w-full p-6 shadow-xl border border-border space-y-4 text-xs animate-fadeIn">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <h3 className="font-serif text-lg font-bold text-ink">Add Court / Gazetted Holiday</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded text-slate-400 hover:text-ink"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAdd} className="space-y-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Holiday / Vacation Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. High Court Summer Vacation (First Fortnight)"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Date (YYYY-MM-DD) *</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full p-2 border border-border rounded font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Jurisdiction</label>
                    <select
                      value={formData.calendar}
                      onChange={(e) => setFormData({ ...formData, calendar: e.target.value as any })}
                      className="w-full p-2 border border-border rounded bg-white"
                    >
                      <option value="wb">West Bengal / Kolkata</option>
                      <option value="central">Central / All India</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Holiday Classification</label>
                  <input
                    type="text"
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="e.g. Court Vacation / State Gazetted"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="limitationCheck"
                    checked={formData.affectsLimitation}
                    onChange={(e) => setFormData({ ...formData, affectsLimitation: e.target.checked })}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <label htmlFor="limitationCheck" className="text-slate-700 font-semibold cursor-pointer">
                    Applies Section 4 Limitation Extension to Filings
                  </label>
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
                    Add Holiday
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
