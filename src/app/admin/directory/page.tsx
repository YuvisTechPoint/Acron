"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PhoneCall,
  Plus,
  Trash2,
  Edit2,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Search,
  MapPin
} from "lucide-react";
import { HELPLINE_DIRECTORY } from "@/lib/constants";

interface DirectoryItem {
  id: string;
  name: string;
  category: "STATUTORY_AUTHORITY" | "STATE_HELPLINE" | "LEGAL_AID" | "CYBER_POLICE";
  number: string;
  hours: string;
  description: string;
  isVerified: boolean;
}

const INITIAL_DIRECTORY: DirectoryItem[] = [
  {
    id: "DIR-01",
    name: "National Commission for Women (NCW) 24/7 Helpline",
    category: "STATUTORY_AUTHORITY",
    number: "7827170170",
    hours: "24 Hours / 7 Days",
    description: "National emergency helpline for women facing sexual harassment, domestic violence or distress.",
    isVerified: true
  },
  {
    id: "DIR-02",
    name: "West Bengal State Women Helpline",
    category: "STATE_HELPLINE",
    number: "181 / 1091",
    hours: "Toll-Free 24 Hours",
    description: "Department of Women & Child Development and Social Welfare, Government of West Bengal.",
    isVerified: true
  },
  {
    id: "DIR-03",
    name: "Kolkata Police Cyber Crime Division",
    category: "CYBER_POLICE",
    number: "033 2214 3000 / 1930",
    hours: "24/7 Emergency Cyber Desk",
    description: "Lalbazar Cyber Police Station for cyber stalking, revenge pornography, and non-consensual imagery.",
    isVerified: true
  },
  {
    id: "DIR-04",
    name: "West Bengal State Legal Services Authority (WBSLSA)",
    category: "LEGAL_AID",
    number: "15100 / 033 2248 3892",
    hours: "10:00 AM - 5:00 PM (Court Working Days)",
    description: "Free legal representation and counsel for women and economically disadvantaged citizens under Legal Services Authorities Act.",
    isVerified: true
  },
  {
    id: "DIR-05",
    name: "District Officer (Collector & DM Kolkata) - POSH Cell",
    category: "STATUTORY_AUTHORITY",
    number: "033 2214 5555",
    hours: "10:00 AM - 5:00 PM",
    description: "Office of the District Magistrate Kolkata for filing Section 21 Annual POSH compliance reports and LC referrals.",
    isVerified: true
  }
];

export default function AdminDirectoryPage() {
  const [items, setItems] = useState<DirectoryItem[]>(INITIAL_DIRECTORY);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "STATUTORY_AUTHORITY" as DirectoryItem["category"],
    number: "",
    hours: "24 Hours / 7 Days",
    description: ""
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const created: DirectoryItem = {
      id: `DIR-0${items.length + 1}`,
      name: newItem.name,
      category: newItem.category,
      number: newItem.number,
      hours: newItem.hours,
      description: newItem.description,
      isVerified: true
    };
    setItems([...items, created]);
    setShowModal(false);
    setNewItem({
      name: "",
      category: "STATUTORY_AUTHORITY",
      number: "",
      hours: "24 Hours / 7 Days",
      description: ""
    });
  };

  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.number.includes(searchTerm)
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
            PRD Screen Ref: A-25
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
              <PhoneCall className="w-4 h-4 text-primary" />
              <span>Public Directory Management</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink mt-1">
              Verified Helpline &amp; Referral Directory CMS
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Curate government helplines, police cyber crime desks, District Officer registries, and legal aid authorities published at /help/directory.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Helpline Listing</span>
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-card border border-border shadow-sm flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search helpline or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs border border-border rounded w-full focus:outline-none focus:border-primary"
            />
          </div>
          <span className="text-xs text-slate-500 font-mono">{filtered.length} listings</span>
        </div>

        {/* Directory Table */}
        <div className="bg-white rounded-card border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-border uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Authority &amp; Service</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Helpline Number</th>
                  <th className="py-3 px-4">Hours</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-ink">{item.name}</div>
                      <div className="text-[11px] text-slate-500 max-w-sm truncate">{item.description}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-medium rounded text-[10px]">
                        {item.category.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-primary">
                      {item.number}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {item.hours}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setItems(items.filter((i) => i.id !== item.id))}
                        className="text-slate-400 hover:text-red-600 p-1 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-card max-w-md w-full p-6 shadow-xl border border-border space-y-4 text-xs">
              <h3 className="font-serif text-lg font-bold text-ink">Add Verified Helpline</h3>

              <form onSubmit={handleAdd} className="space-y-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Helpline / Authority Name *</label>
                  <input
                    type="text"
                    required
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="e.g. Kolkata Police Women Cyber Helpdesk"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category *</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
                    className="w-full p-2 border border-border rounded bg-white"
                  >
                    <option value="STATUTORY_AUTHORITY">Statutory Authority / District Officer</option>
                    <option value="STATE_HELPLINE">State Women Helpline</option>
                    <option value="CYBER_POLICE">Cyber Crime Police Cell</option>
                    <option value="LEGAL_AID">Legal Aid Authority (SLSA/DLSA)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                    <input
                      type="text"
                      required
                      value={newItem.number}
                      onChange={(e) => setNewItem({ ...newItem, number: e.target.value })}
                      placeholder="e.g. 181 / 033 2214..."
                      className="w-full p-2 border border-border rounded"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Operating Hours</label>
                    <input
                      type="text"
                      value={newItem.hours}
                      onChange={(e) => setNewItem({ ...newItem, hours: e.target.value })}
                      placeholder="e.g. 24/7 or 10am - 5pm"
                      className="w-full p-2 border border-border rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jurisdiction &amp; Mandate</label>
                  <textarea
                    rows={2}
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    placeholder="Brief description of service area..."
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
                    Save to Directory
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

