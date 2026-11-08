"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckSquare,
  ArrowLeft,
  ShieldCheck,
  Plus,
  Trash2,
  Edit2,
  Search,
  X,
  CheckCircle2
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { SurveyItem } from "@/lib/types";

export default function AdminSurveysPage() {
  const [surveys, setSurveys] = useState<SurveyItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "Anonymous Climate Survey",
    questions: 15,
    status: "Active",
    kAnonymityMet: true,
  });

  const loadData = () => {
    setSurveys(platformStore.getSurveys());
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    platformStore.addSurvey({
      name: formData.name,
      type: formData.type,
      questions: Number(formData.questions),
      responses: 0,
      status: formData.status,
      kAnonymityMet: formData.kAnonymityMet,
    });

    triggerToast(`Created climate survey: ${formData.name}`);
    setShowModal(false);
    setFormData({
      name: "",
      type: "Anonymous Climate Survey",
      questions: 15,
      status: "Active",
      kAnonymityMet: true,
    });
    loadData();
  };

  const handleToggleStatus = (s: SurveyItem) => {
    const nextStatus = s.status === "Active" ? "Completed" : "Active";
    platformStore.updateSurvey(s.id, { status: nextStatus });
    triggerToast(`Survey status set to ${nextStatus}`);
    loadData();
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove survey "${name}"?`)) {
      platformStore.deleteSurvey(id);
      triggerToast(`Removed survey ${id}`);
      loadData();
    }
  };

  const filtered = surveys.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
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
            PRD Screen Ref: A-28
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
                Prevention &amp; Climate &bull; Section 8.24
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Workplace Climate Survey &amp; Risk Audit Builder
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Configure anonymous culture audits, organizational risk assessments, and post-inquiry feedback.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Climate Survey</span>
          </button>
        </div>

        {/* Privacy Notice */}
        <div className="p-4 bg-emerald-50 rounded border border-emerald-300 text-xs text-emerald-950 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <span>
            <strong>K-Anonymity Privacy Guarantee (PRD Rule BR-045):</strong> Survey response reporting enforces minimum 5-respondent cell suppression. Data from smaller units is automatically merged to prevent re-identification of complainants or witnesses.
          </span>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-card border border-border shadow-card flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search surveys by title or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-border rounded text-xs focus:outline-none focus:border-primary"
            />
          </div>
          <div className="text-slate-500 text-[11px]">
            Showing <strong className="text-ink">{filtered.length}</strong> of {surveys.length} survey instruments
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
                <tr>
                  <th className="p-3.5">Survey Title</th>
                  <th className="p-3.5">Instrument Type</th>
                  <th className="p-3.5">Questions</th>
                  <th className="p-3.5">Responses Logged</th>
                  <th className="p-3.5">K-Anonymity</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-surface/50 transition">
                    <td className="p-3.5 font-semibold text-ink">{s.name}</td>
                    <td className="p-3.5 text-ink-secondary">{s.type}</td>
                    <td className="p-3.5 text-ink-secondary">{s.questions} Items</td>
                    <td className="p-3.5 font-bold text-primary">{s.responses} Verified</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        &ge; 5 Cell Suppressed
                      </span>
                    </td>
                    <td className="p-3.5">
                      <button
                        onClick={() => handleToggleStatus(s)}
                        title="Click to toggle status"
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border transition ${
                          s.status === "Active"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200"
                            : "bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200"
                        }`}
                      >
                        {s.status}
                      </button>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDelete(s.id, s.name)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-slate-100 transition"
                        title="Delete Survey"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      No climate surveys found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-card max-w-md w-full p-6 shadow-xl border border-border space-y-4 text-xs animate-fadeIn">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <h3 className="font-serif text-lg font-bold text-ink">New Workplace Climate Instrument</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded text-slate-400 hover:text-ink"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Survey Instrument Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Annual POSH Workplace Climate & Culture Survey 2026"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Instrument Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-2 border border-border rounded bg-white"
                  >
                    <option value="Anonymous Climate Survey">Anonymous Climate Survey</option>
                    <option value="Risk Assessment (HR & IC)">Risk Assessment (HR &amp; IC)</option>
                    <option value="Process Feedback (Anonymized)">Process Feedback (Anonymized)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Questions Count</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={50}
                      value={formData.questions}
                      onChange={(e) => setFormData({ ...formData, questions: Number(e.target.value) })}
                      className="w-full p-2 border border-border rounded font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full p-2 border border-border rounded bg-white"
                    >
                      <option value="Active">Active</option>
                      <option value="Draft">Draft</option>
                      <option value="Ongoing">Ongoing</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-[11px] text-emerald-900 leading-snug">
                  &check; Responses will be protected with statutory K-anonymity cell suppression before generating aggregate analytics.
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
                    Create Survey
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
