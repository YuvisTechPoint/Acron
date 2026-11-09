"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  ArrowLeft,
  CheckCircle2,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Star,
  Eye,
  DollarSign,
  Clock,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { useRealtimeServices } from "@/lib/realtime";
import { CustomService } from "@/lib/types";
import { formatINR } from "@/lib/utils";

export default function AdminServicesCataloguePage() {
  const realtimeServices = useRealtimeServices(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [editingService, setEditingService] = useState<CustomService | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newFeaturesText, setNewFeaturesText] = useState("");

  // New service state
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("General Legal");
  const [newShortDesc, setNewShortDesc] = useState("");
  const [newPriceINR, setNewPriceINR] = useState("5000");
  const [newTurnaround, setNewTurnaround] = useState("2 Business Days");
  const [newIsPopular, setNewIsPopular] = useState(false);

  const services = realtimeServices;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const pricePaise = Math.round((parseFloat(newPriceINR) || 0) * 100);
    const features = newFeaturesText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const newSrv = platformStore.addService({
      name: newName,
      category: newCategory,
      shortDesc: newShortDesc,
      pricePaise,
      displayPrice: `₹${parseFloat(newPriceINR).toLocaleString("en-IN")}`,
      turnaroundDays: newTurnaround,
      features: features.length > 0 ? features : ["Consultation and legal advisory"],
      isPopular: newIsPopular,
      isActive: true,
    });

    try {
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSrv),
      });
    } catch {}

    setIsCreating(false);
    setNewName("");
    setNewShortDesc("");
    setNewFeaturesText("");
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    platformStore.updateService(editingService.id, editingService);

    try {
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      });
    } catch {}

    setEditingService(null);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete service "${name}" from the catalogue?`)) {
      platformStore.deleteService(id);
      try {
        await fetch(`/api/services?id=${id}`, { method: "DELETE" });
      } catch {}
    }
  };

  const categories = ["ALL", ...Array.from(new Set(services.map((s) => s.category)))];

  const filtered = services.filter((s) =>
    categoryFilter === "ALL" ? true : s.category === categoryFilter
  );

  return (
    <div className="bg-ivory-50 min-h-screen py-8 text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-navy-700 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-brass-500" />
            <span>Back to Firm Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/services"
              target="_blank"
              className="px-3 py-1 bg-white border border-border rounded text-xs text-navy-700 hover:text-blue-600 font-semibold shadow-sm"
            >
              View Public Services &rarr;
            </Link>
          </div>
        </div>

        {/* Header Card */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-card">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-navy-700 font-bold">
              <Package className="w-4 h-4 text-brass-500" />
              <span>Commercial Architecture &bull; Section 8.12</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink-950 mt-1">
              Services &amp; Retainer Packages CMS
            </h1>
            <p className="text-xs text-ink-secondary mt-1">
              Add, edit, adjust pricing, manage inclusions, or retire legal services displayed across the platform.
            </p>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-navy-700 hover:bg-blue-600 text-white text-xs font-bold rounded-btn transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service Package</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-3 py-1.5 rounded-btn font-medium transition ${
                categoryFilter === c
                  ? "bg-navy-800 text-white shadow-sm"
                  : "bg-white border border-border text-ink-secondary hover:text-ink hover:bg-slate-50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-card p-6 border border-border shadow-card flex flex-col justify-between text-xs space-y-4 hover:border-navy-700/60 transition group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-brass-600 bg-brass-50 border border-brass-200/60 px-2 py-0.5 rounded uppercase tracking-wider">
                    {s.category}
                  </span>
                  {s.isPopular && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-bold text-base text-ink-950 group-hover:text-navy-700 transition">
                  {s.name}
                </h3>

                <p className="text-[11px] text-ink-secondary leading-relaxed">
                  {s.shortDesc}
                </p>

                <div className="pt-2 border-t border-border-subtle flex items-baseline gap-2">
                  <span className="font-serif font-bold text-xl text-ink-950">
                    {formatINR(s.pricePaise)}
                  </span>
                  <span className="text-[10px] text-ink-secondary">(+ 18% GST)</span>
                </div>

                <div className="text-[11px] text-ink-muted flex items-center gap-1">
                  <Clock className="w-3 h-3 text-brass-500" />
                  <span>Turnaround: {s.turnaroundDays}</span>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-border-subtle">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Inclusions:</span>
                  <ul className="space-y-1">
                    {s.features.slice(0, 4).map((f, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[11px] text-ink">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                    {s.features.length > 4 && (
                      <li className="text-[10px] text-ink-muted italic pl-5">
                        +{s.features.length - 4} more inclusions
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-border-subtle flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  s.isActive ? "bg-emerald-50 text-emerald-800" : "bg-slate-100 text-slate-600"
                }`}>
                  {s.isActive ? "Live in Catalogue" : "Archived"}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingService({ ...s })}
                    className="p-1.5 hover:bg-slate-100 rounded text-slate-600 hover:text-navy-700 transition"
                    title="Edit Service"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id, s.name)}
                    className="p-1.5 hover:bg-rose-50 rounded text-slate-400 hover:text-rose-600 transition"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Create New Service */}
        {isCreating && (
          <div className="fixed inset-0 bg-ink-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-card max-w-lg w-full p-6 space-y-4 shadow-xl border border-border text-xs max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <h3 className="font-serif text-lg font-bold text-ink-950">Add New Service Package</h3>
                <button onClick={() => setIsCreating(false)} className="p-1 text-slate-400 hover:text-ink">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="font-bold block mb-1">Service Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Corporate M&A Due Diligence"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full p-2 border border-border rounded bg-white"
                    >
                      <option value="General Legal">General Legal</option>
                      <option value="POSH Retainer">POSH Retainer</option>
                      <option value="Documentation">Documentation</option>
                      <option value="Corporate Advisory">Corporate Advisory</option>
                      <option value="Dispute Resolution">Dispute Resolution</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Base Fee (in ₹ INR)</label>
                    <input
                      type="number"
                      required
                      value={newPriceINR}
                      onChange={(e) => setNewPriceINR(e.target.value)}
                      className="w-full p-2 border border-border rounded font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold block mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    required
                    value={newShortDesc}
                    onChange={(e) => setNewShortDesc(e.target.value)}
                    placeholder="Brief description for clients..."
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Turnaround Timeline</label>
                  <input
                    type="text"
                    value={newTurnaround}
                    onChange={(e) => setNewTurnaround(e.target.value)}
                    placeholder="e.g. 3-5 Business Days"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Inclusions / Features (one per line)</label>
                  <textarea
                    rows={4}
                    value={newFeaturesText}
                    onChange={(e) => setNewFeaturesText(e.target.value)}
                    placeholder="Drafting of petition&#10;Two rounds of revisions&#10;Counsel strategy session"
                    className="w-full p-2 border border-border rounded font-mono text-[11px]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={newIsPopular}
                    onChange={(e) => setNewIsPopular(e.target.checked)}
                    className="rounded text-navy-700"
                  />
                  <label htmlFor="featured" className="font-semibold text-slate-700">
                    Feature on Homepage and Services highlights
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 border border-border rounded text-slate-600 hover:bg-slate-50 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-navy-700 hover:bg-blue-600 text-white rounded font-bold"
                  >
                    Create Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Edit Existing Service */}
        {editingService && (
          <div className="fixed inset-0 bg-ink-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-card max-w-lg w-full p-6 space-y-4 shadow-xl border border-border text-xs max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <h3 className="font-serif text-lg font-bold text-ink-950">Edit Service Package</h3>
                <button onClick={() => setEditingService(null)} className="p-1 text-slate-400 hover:text-ink">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="font-bold block mb-1">Service Name</label>
                  <input
                    type="text"
                    required
                    value={editingService.name}
                    onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Category</label>
                    <input
                      type="text"
                      value={editingService.category}
                      onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                      className="w-full p-2 border border-border rounded"
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Fee in Paise</label>
                    <input
                      type="number"
                      value={editingService.pricePaise}
                      onChange={(e) =>
                        setEditingService({ ...editingService, pricePaise: parseInt(e.target.value) || 0 })
                      }
                      className="w-full p-2 border border-border rounded font-mono"
                    />
                    <span className="text-[10px] text-ink-muted">
                      = {formatINR(editingService.pricePaise)}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="font-bold block mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={editingService.shortDesc}
                    onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Turnaround Timeline</label>
                  <input
                    type="text"
                    value={editingService.turnaroundDays}
                    onChange={(e) =>
                      setEditingService({ ...editingService, turnaroundDays: e.target.value })
                    }
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Inclusions (one per line)</label>
                  <textarea
                    rows={5}
                    value={editingService.features.join("\n")}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        features: e.target.value.split("\n").filter(Boolean),
                      })
                    }
                    className="w-full p-2 border border-border rounded font-mono text-[11px]"
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 font-semibold">
                    <input
                      type="checkbox"
                      checked={editingService.isPopular}
                      onChange={(e) =>
                        setEditingService({ ...editingService, isPopular: e.target.checked })
                      }
                      className="rounded text-navy-700"
                    />
                    <span>Featured in Highlights</span>
                  </label>

                  <label className="flex items-center gap-2 font-semibold">
                    <input
                      type="checkbox"
                      checked={editingService.isActive}
                      onChange={(e) =>
                        setEditingService({ ...editingService, isActive: e.target.checked })
                      }
                      className="rounded text-navy-700"
                    />
                    <span>Active in Catalogue</span>
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-4 py-2 border border-border rounded text-slate-600 hover:bg-slate-50 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-navy-700 hover:bg-blue-600 text-white rounded font-bold"
                  >
                    Save Changes
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
