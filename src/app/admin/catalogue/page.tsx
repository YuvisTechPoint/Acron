"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Plus,
  Trash2,
  Edit2,
  Save,
  ArrowLeft,
  CheckCircle2,
  Tag,
  DollarSign
} from "lucide-react";
import { formatINR } from "@/lib/utils";

interface CatalogueItem {
  id: string;
  code: string;
  name: string;
  description: string;
  sacCode: string;
  amountPaise: number;
  gstRatePercent: number;
  isActive: boolean;
}

const INITIAL_CATALOGUE: CatalogueItem[] = [
  {
    id: "CAT-001",
    code: "CONSULT-PARTNER",
    name: "Partner Initial Legal Consultation (60 Mins)",
    description: "In-depth case evaluation and legal strategy session with Partner at Kolkata Chambers or via secure VC.",
    sacCode: "998211",
    amountPaise: 450000,
    gstRatePercent: 18,
    isActive: true
  },
  {
    id: "CAT-002",
    code: "DOC-VETTING-STD",
    name: "Commercial Agreement Drafting / Vetting",
    description: "Comprehensive statutory review and mark-up of standard commercial contracts, NDAs, or employment covenants.",
    sacCode: "998211",
    amountPaise: 850000,
    gstRatePercent: 18,
    isActive: true
  },
  {
    id: "CAT-003",
    code: "POSH-RETAINER-T1",
    name: "POSH Advisory & External IC Retainer (Tier 1)",
    description: "Quarterly retainer: Section 4(2)(c) External Member nomination, annual policy review, and email legal helpline.",
    sacCode: "998211",
    amountPaise: 1800000,
    gstRatePercent: 18,
    isActive: true
  },
  {
    id: "CAT-004",
    code: "POSH-RETAINER-T2",
    name: "POSH Comprehensive Retainer & Case Handling (Tier 2)",
    description: "Quarterly retainer: Includes External Member attendance in all IC hearings, digital portal access, and Sec 21 filing.",
    sacCode: "998211",
    amountPaise: 4500000,
    gstRatePercent: 18,
    isActive: true
  },
  {
    id: "CAT-005",
    code: "TRAIN-IC-HALFDAY",
    name: "Internal Committee Intensive Workshop (Half-Day)",
    description: "Statutory capacity building for IC members: natural justice, Section 11 powers, deposition techniques and report writing.",
    sacCode: "998211",
    amountPaise: 2500000,
    gstRatePercent: 18,
    isActive: true
  }
];

export default function AdminPaymentCataloguePage() {
  const [catalogue, setCatalogue] = useState<CatalogueItem[]>(INITIAL_CATALOGUE);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    code: "",
    description: "",
    sacCode: "998211",
    amount: 5000,
    gstRatePercent: 18
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const created: CatalogueItem = {
      id: `CAT-00${catalogue.length + 1}`,
      code: newItem.code.toUpperCase(),
      name: newItem.name,
      description: newItem.description,
      sacCode: newItem.sacCode,
      amountPaise: newItem.amount * 100,
      gstRatePercent: Number(newItem.gstRatePercent),
      isActive: true
    };
    setCatalogue([...catalogue, created]);
    setShowModal(false);
    setNewItem({
      name: "",
      code: "",
      description: "",
      sacCode: "998211",
      amount: 5000,
      gstRatePercent: 18
    });
  };

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
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Fee Schedule Item</span>
          </button>
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
                {catalogue.map((item) => {
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
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setCatalogue(catalogue.filter((c) => c.id !== item.id))}
                          className="text-slate-400 hover:text-red-600 p-1 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-card max-w-md w-full p-6 shadow-xl border border-border space-y-4 text-xs">
              <h3 className="font-serif text-lg font-bold text-ink">New Catalogue Fee Item</h3>

              <form onSubmit={handleAdd} className="space-y-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Service / Package Name *</label>
                  <input
                    type="text"
                    required
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
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
                      value={newItem.code}
                      onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
                      placeholder="e.g. TM-FILING"
                      className="w-full p-2 border border-border rounded uppercase"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">SAC Code</label>
                    <input
                      type="text"
                      required
                      value={newItem.sacCode}
                      onChange={(e) => setNewItem({ ...newItem, sacCode: e.target.value })}
                      className="w-full p-2 border border-border rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Base Amount (INR excluding GST) *</label>
                  <input
                    type="number"
                    required
                    value={newItem.amount}
                    onChange={(e) => setNewItem({ ...newItem, amount: Number(e.target.value) })}
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    placeholder="Scope of work covered..."
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
                    className="px-4 py-2 bg-primary text-white rounded font-bold hover:bg-primary-light"
                  >
                    Save to Catalogue
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

