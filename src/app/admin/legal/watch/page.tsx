"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Eye,
  Clock,
  CheckCircle2,
  ArrowLeft,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
  Search,
  X,
  Scale
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { LegalWatchItem } from "@/lib/types";

export default function LegalWatchListPage() {
  const [watchItems, setWatchItems] = useState<LegalWatchItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<LegalWatchItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    ref: "",
    title: "",
    subject: "",
    owner: "Adv. Debjani Sen",
    reviewDate: "Quarterly (Q4 2026)",
    status: "In Compliance & Tracking",
    impactLevel: "HIGH" as "HIGH" | "MEDIUM" | "ADVISORY",
  });

  const loadData = () => {
    setWatchItems(platformStore.getLegalWatchItems());
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      ref: `LAW-${watchItems.length + 41}`,
      title: "",
      subject: "",
      owner: "Adv. Debjani Sen",
      reviewDate: "Quarterly (Q1 2027)",
      status: "Monitored",
      impactLevel: "HIGH",
    });
    setShowModal(true);
  };

  const openEditModal = (item: LegalWatchItem) => {
    setEditingItem(item);
    setFormData({
      ref: item.ref,
      title: item.title,
      subject: item.subject,
      owner: item.owner,
      reviewDate: item.reviewDate,
      status: item.status,
      impactLevel: item.impactLevel || "HIGH",
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.ref) return;

    if (editingItem) {
      platformStore.updateLegalWatchItem(editingItem.ref, {
        title: formData.title,
        subject: formData.subject,
        owner: formData.owner,
        reviewDate: formData.reviewDate,
        status: formData.status,
        impactLevel: formData.impactLevel,
      });
      triggerToast(`Updated regulatory item: ${formData.ref}`);
    } else {
      platformStore.addLegalWatchItem({
        ref: formData.ref.toUpperCase(),
        title: formData.title,
        subject: formData.subject,
        owner: formData.owner,
        reviewDate: formData.reviewDate,
        status: formData.status,
        impactLevel: formData.impactLevel,
      });
      triggerToast(`Added precedent watch item: ${formData.ref.toUpperCase()}`);
    }

    setShowModal(false);
    loadData();
  };

  const handleDelete = (ref: string) => {
    if (confirm(`Are you sure you want to delete watch item ${ref}?`)) {
      platformStore.deleteLegalWatchItem(ref);
      triggerToast(`Removed watch item ${ref}`);
      loadData();
    }
  };

  const filtered = watchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchTerm.toLowerCase())
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
            PRD Screen Ref: A-22
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
                Regulatory Horizon &bull; Section 8.30
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Statutory Judicial &amp; Regulatory Watch List
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Monitor binding Supreme Court directives, High Court interpretations, and MWCD gazette revisions.
              </p>
            </div>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Regulatory Watch Item</span>
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-card border border-border shadow-card flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by citation, subject, or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-border rounded text-xs focus:outline-none focus:border-primary"
            />
          </div>
          <div className="text-slate-500 text-[11px]">
            Showing <strong className="text-ink">{filtered.length}</strong> of {watchItems.length} monitored precedents
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
                <tr>
                  <th className="p-3.5">Ref</th>
                  <th className="p-3.5">Statutory Subject &amp; Judicial Source</th>
                  <th className="p-3.5">Review Owner</th>
                  <th className="p-3.5">Next Review Date</th>
                  <th className="p-3.5">Impact Level</th>
                  <th className="p-3.5">Monitoring Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filtered.map((item) => (
                  <tr key={item.ref} className="hover:bg-surface/50 transition">
                    <td className="p-3.5 font-mono font-bold text-primary">{item.ref}</td>
                    <td className="p-3.5 space-y-0.5">
                      <div className="font-semibold text-ink">{item.title}</div>
                      <div className="text-[11px] text-ink-secondary max-w-md">{item.subject}</div>
                    </td>
                    <td className="p-3.5 text-ink font-medium">{item.owner}</td>
                    <td className="p-3.5 text-ink-secondary">{item.reviewDate}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.impactLevel === "HIGH"
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}>
                        {item.impactLevel || "HIGH"}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-light text-primary">
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-1">
                      <button
                        onClick={() => openEditModal(item)}
                        className="text-slate-500 hover:text-primary p-1 rounded hover:bg-slate-100 transition"
                        title="Edit Precedent"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.ref)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-slate-100 transition"
                        title="Delete Precedent"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      No precedents found matching &quot;{searchTerm}&quot;.
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
                <h3 className="font-serif text-lg font-bold text-ink">
                  {editingItem ? "Edit Precedent Watch Item" : "New Judicial Precedent Watch"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded text-slate-400 hover:text-ink"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Watch Ref *</label>
                    <input
                      type="text"
                      required
                      value={formData.ref}
                      onChange={(e) => setFormData({ ...formData, ref: e.target.value })}
                      placeholder="e.g. LAW-42"
                      className="w-full p-2 border border-border rounded font-mono uppercase"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Impact Level</label>
                    <select
                      value={formData.impactLevel}
                      onChange={(e) => setFormData({ ...formData, impactLevel: e.target.value as any })}
                      className="w-full p-2 border border-border rounded bg-white"
                    >
                      <option value="HIGH">High (Mandatory Audit)</option>
                      <option value="MEDIUM">Medium (Procedural)</option>
                      <option value="ADVISORY">Advisory (Good Practice)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Judicial Source / Directives Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Supreme Court in Aureliano Fernandes v. State of Goa"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Statutory Subject &amp; Directives *</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Mandatory district officer notifications, time-bound forwarding rules..."
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Review Owner</label>
                    <input
                      type="text"
                      required
                      value={formData.owner}
                      onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                      placeholder="e.g. Adv. Debjani Sen"
                      className="w-full p-2 border border-border rounded"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Review Cadence / Date</label>
                    <input
                      type="text"
                      required
                      value={formData.reviewDate}
                      onChange={(e) => setFormData({ ...formData, reviewDate: e.target.value })}
                      placeholder="e.g. Quarterly (Q1 2027)"
                      className="w-full p-2 border border-border rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Monitoring Status</label>
                  <input
                    type="text"
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    placeholder="e.g. In Compliance & Tracking"
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
                    {editingItem ? "Update Precedent" : "Save Precedent"}
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
