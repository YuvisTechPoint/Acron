"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Edit2,
  ArrowLeft,
  CheckCircle2,
  Tag,
  Search,
  Check,
  X,
  Power
} from "lucide-react";
import { formatINR } from "@/lib/utils";
import { platformStore } from "@/lib/store";
import { CatalogueFeeItem } from "@/lib/types";

export default function AdminPaymentCataloguePage() {
  const [catalogue, setCatalogue] = useState<CatalogueFeeItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogueFeeItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    sacCode: "998211",
    amount: 5000,
    gstRatePercent: 18,
    isActive: true,
  });

  const loadData = () => {
    setCatalogue(platformStore.getCatalogueItems());
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
      name: "",
      code: "",
      description: "",
      sacCode: "998211",
      amount: 5000,
      gstRatePercent: 18,
      isActive: true,
    });
    setShowModal(true);
  };

  const openEditModal = (item: CatalogueFeeItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      code: item.code,
      description: item.description,
      sacCode: item.sacCode,
      amount: item.amountPaise / 100,
      gstRatePercent: item.gstRatePercent,
      isActive: item.isActive,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;

    if (editingItem) {
      platformStore.updateCatalogueItem(editingItem.id, {
        name: formData.name,
        code: formData.code.toUpperCase(),
        description: formData.description,
        sacCode: formData.sacCode,
        amountPaise: Math.round(formData.amount * 100),
        gstRatePercent: Number(formData.gstRatePercent),
        isActive: formData.isActive,
      });
      triggerToast(`Updated fee item ${formData.code.toUpperCase()}`);
    } else {
      platformStore.addCatalogueItem({
        name: formData.name,
        code: formData.code.toUpperCase(),
        description: formData.description,
        sacCode: formData.sacCode,
        amountPaise: Math.round(formData.amount * 100),
        gstRatePercent: Number(formData.gstRatePercent),
        isActive: formData.isActive,
      });
      triggerToast(`Added fee item ${formData.code.toUpperCase()}`);
    }

    setShowModal(false);
    loadData();
  };

  const handleToggleActive = (item: CatalogueFeeItem) => {
    platformStore.updateCatalogueItem(item.id, { isActive: !item.isActive });
    triggerToast(`${item.code} is now ${!item.isActive ? "Active" : "Inactive"}`);
    loadData();
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from the active fee schedule?`)) {
      platformStore.deleteCatalogueItem(id);
      triggerToast(`Removed item ${name}`);
      loadData();
    }
  };

  const filtered = catalogue.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sacCode.toLowerCase().includes(searchTerm.toLowerCase())
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
            PRD Screen Ref: A-12
          </span>
        </div>

        {/* Toast Notification */}
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
              <Tag className="w-4 h-4 text-primary" />
              <span>Billing &amp; Tax Master</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink mt-1">
              Legal Service Catalogue &amp; Fee Schedule
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Standard professional fee items, SAC 998211 categorization, and 18% GST tax computation parameters.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Fee Schedule Item</span>
          </button>
        </div>

        {/* Search & Counter Bar */}
        <div className="bg-white p-4 rounded-card border border-border shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by code, service name, or SAC..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-border rounded text-xs focus:outline-none focus:border-primary"
            />
          </div>
          <div className="text-slate-500 text-[11px]">
            Showing <strong className="text-ink">{filtered.length}</strong> of {catalogue.length} fee items
          </div>
        </div>

        {/* Catalogue Cards / Table */}
        <div className="bg-white rounded-card border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-border uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Item Code &amp; Name</th>
                  <th className="py-3 px-4">SAC Code</th>
                  <th className="py-3 px-4">Base Fee (INR)</th>
                  <th className="py-3 px-4">GST Rate</th>
                  <th className="py-3 px-4">Total Payable</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((item) => {
                  const gst = (item.amountPaise * item.gstRatePercent) / 100;
                  const total = item.amountPaise + gst;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-ink">{item.name}</div>
                        <div className="text-[11px] text-slate-500 max-w-sm truncate">{item.description}</div>
                        <div className="font-mono text-[10px] text-primary mt-0.5">{item.code}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-600">
                        {item.sacCode}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {formatINR(item.amountPaise)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {item.gstRatePercent}% GST
                      </td>
                      <td className="py-3.5 px-4 font-bold text-primary">
                        {formatINR(total)}
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleActive(item)}
                          title="Click to toggle status"
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border transition ${
                            item.isActive
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                              : "bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${item.isActive ? "bg-emerald-500" : "bg-slate-400"}`}></span>
                          <span>{item.isActive ? "Active" : "Inactive"}</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1">
                        <button
                          onClick={() => openEditModal(item)}
                          className="text-slate-500 hover:text-primary p-1 rounded hover:bg-slate-100 transition"
                          title="Edit Item"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-slate-100 transition"
                          title="Delete Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      No catalogue fee items found matching &quot;{searchTerm}&quot;.
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
                  {editingItem ? "Edit Fee Schedule Item" : "New Catalogue Fee Item"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded text-slate-400 hover:text-ink"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Service / Package Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Trademark Filing & Hearing"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Service Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="e.g. TM-FILING"
                      className="w-full p-2 border border-border rounded uppercase font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">SAC Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.sacCode}
                      onChange={(e) => setFormData({ ...formData, sacCode: e.target.value })}
                      className="w-full p-2 border border-border rounded font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Base Amount (INR) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      step={100}
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                      className="w-full p-2 border border-border rounded font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">GST Rate (%)</label>
                    <input
                      type="number"
                      required
                      value={formData.gstRatePercent}
                      onChange={(e) => setFormData({ ...formData, gstRatePercent: Number(e.target.value) })}
                      className="w-full p-2 border border-border rounded font-mono"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-border rounded flex justify-between items-center text-[11px]">
                  <span>Total (incl. GST):</span>
                  <span className="font-bold text-primary text-sm font-mono">
                    {formatINR(Math.round(formData.amount * (1 + formData.gstRatePercent / 100) * 100))}
                  </span>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description &amp; Deliverable Scope</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Scope of work covered..."
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isActiveCheck"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <label htmlFor="isActiveCheck" className="text-slate-700 font-semibold cursor-pointer">
                    Enable in Billing &amp; Invoicing Menus
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
                    {editingItem ? "Update Fee Item" : "Save to Catalogue"}
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
