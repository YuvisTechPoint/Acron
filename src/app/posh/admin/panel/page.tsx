"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Award,
  Building2,
  Plus,
  ArrowLeft,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  FileText
} from "lucide-react";

interface PanelMember {
  id: string;
  name: string;
  role: string;
  organization: string;
  barNumberOrAffiliation: string;
  experienceYears: number;
  assignedOrgs: string[];
  status: "ACTIVE" | "ON_LEAVE" | "CONFLICT_HOLD";
  email: string;
  phone: string;
}

const INITIAL_PANEL: PanelMember[] = [
  {
    id: "PANEL-01",
    name: "Adv. Debjani Sen",
    role: "Partner & POSH Practice Head",
    organization: "Acorn Legal Consultants",
    barNumberOrAffiliation: "Bar Council of WB: WB/1998/412",
    experienceYears: 18,
    assignedOrgs: ["Kolkata Cloud Technologies Pvt Ltd", "Bengal Precision Engineering Ltd"],
    status: "ACTIVE",
    email: "debjani.sen@acornlegal.in",
    phone: "+91 98300 24567"
  },
  {
    id: "PANEL-02",
    name: "Adv. Subhasish Mukherjee",
    role: "Managing Partner",
    organization: "Acorn Legal Consultants",
    barNumberOrAffiliation: "Bar Council of WB: WB/1994/281",
    experienceYears: 22,
    assignedOrgs: ["Hooghly River Shipping Logistics"],
    status: "ACTIVE",
    email: "subhasish@acornlegal.in",
    phone: "+91 98300 12345"
  },
  {
    id: "PANEL-03",
    name: "Smt. Anuradha Roy",
    role: "Director of Advocacy",
    organization: "Kolkata Women's Legal Aid Trust (NGO)",
    barNumberOrAffiliation: "NGO Darpan Reg: WB/2012/004921",
    experienceYears: 14,
    assignedOrgs: ["Bengal Precision Engineering Ltd (Backup)"],
    status: "ACTIVE",
    email: "anuradha.roy@kwlat.org",
    phone: "+91 98311 99882"
  },
  {
    id: "PANEL-04",
    name: "Adv. Priya Ghosh",
    role: "Senior Associate (Labour & Employment)",
    organization: "Acorn Legal Consultants",
    barNumberOrAffiliation: "Bar Council of WB: WB/2015/892",
    experienceYears: 9,
    assignedOrgs: ["Kolkata Cloud Technologies Pvt Ltd (Alternate)"],
    status: "ACTIVE",
    email: "priya.ghosh@acornlegal.in",
    phone: "+91 98309 88123"
  }
];

export default function PoshPanelManagementPage() {
  const [panel, setPanel] = useState<PanelMember[]>(INITIAL_PANEL);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    organization: "Acorn Legal Consultants",
    barNumberOrAffiliation: "",
    experienceYears: 5,
    email: "",
    phone: ""
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const created: PanelMember = {
      id: `PANEL-0${panel.length + 1}`,
      name: newMember.name,
      role: newMember.role,
      organization: newMember.organization,
      barNumberOrAffiliation: newMember.barNumberOrAffiliation,
      experienceYears: Number(newMember.experienceYears),
      assignedOrgs: [],
      status: "ACTIVE",
      email: newMember.email,
      phone: newMember.phone
    };
    setPanel([...panel, created]);
    setShowAddModal(false);
    setNewMember({
      name: "",
      role: "",
      organization: "Acorn Legal Consultants",
      barNumberOrAffiliation: "",
      experienceYears: 5,
      email: "",
      phone: ""
    });
  };

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/posh/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Central POSH Command</span>
          </Link>
          <span className="text-[11px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
            PRD Screen Ref: X-04
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
              <Users className="w-4 h-4 text-primary" />
              <span>Section 4(2)(c) Statutory Panel</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink mt-1">
              External IC Member Roster &amp; Appointments
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Management of Acorn legal advocates and NGO specialists appointed as independent external members on client Internal Committees.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Enroll External Member</span>
          </button>
        </div>

        {/* Panel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {panel.map((m) => (
            <div key={m.id} className="bg-white p-5 rounded-card border border-border shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-ink">{m.name}</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                      {m.status}
                    </span>
                  </div>
                  <div className="text-xs text-primary font-medium">{m.role} &bull; {m.organization}</div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">{m.barNumberOrAffiliation}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gold">{m.experienceYears} yrs</span>
                  <span className="block text-[10px] text-slate-400">POSH Experience</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{m.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{m.phone}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-xs">
                <span className="font-bold text-slate-700 block mb-1">Active Client IC Appointments:</span>
                {m.assignedOrgs.length > 0 ? (
                  <ul className="space-y-1">
                    {m.assignedOrgs.map((org, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-slate-600">
                        <Building2 className="w-3 h-3 text-primary" />
                        <span>{org}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-slate-400 italic">Available for new client IC constitutions</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for adding external member */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-card max-w-lg w-full p-6 shadow-xl border border-border">
              <h3 className="font-serif text-lg font-bold text-ink mb-1">Enroll External IC Member</h3>
              <p className="text-xs text-slate-500 mb-4">Validate credentials under Section 4(2)(c) of POSH Act 2013.</p>

              <form onSubmit={handleAdd} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold block text-slate-700 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="e.g. Adv. Rashmi Chatterjee"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold block text-slate-700 mb-1">Role / Designation *</label>
                  <input
                    type="text"
                    required
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    placeholder="e.g. Senior Associate"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold block text-slate-700 mb-1">Bar Council Reg. # or NGO Darpan Reg. *</label>
                  <input
                    type="text"
                    required
                    value={newMember.barNumberOrAffiliation}
                    onChange={(e) => setNewMember({ ...newMember, barNumberOrAffiliation: e.target.value })}
                    placeholder="e.g. WB/2018/1092"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold block text-slate-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                      placeholder="email@acornlegal.in"
                      className="w-full p-2 border border-border rounded"
                    />
                  </div>
                  <div>
                    <label className="font-bold block text-slate-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={newMember.phone}
                      onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                      placeholder="+91 98..."
                      className="w-full p-2 border border-border rounded"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-border rounded text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded font-bold hover:bg-primary-light"
                  >
                    Save &amp; Enroll
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

