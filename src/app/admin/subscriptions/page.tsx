"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Package, ArrowLeft, CheckCircle2, Clock, Building, Plus, Edit2, Search, X } from "lucide-react";
import { platformStore } from "@/lib/store";
import { Organization } from "@/lib/types";

export default function AdminSubscriptionsPage() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    city: "Kolkata",
    employeeCount: 100,
    planTier: "retainer_standard",
    icPresidingOfficer: "Senior Internal Member (Designated)",
    icExternalMember: "Adv. Debjani Sen (Acorn Legal Consultants)",
    registeredAddress: "",
  });

  const loadData = () => {
    setOrgs(platformStore.getOrganizations());
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const openAddModal = () => {
    setEditingOrg(null);
    setFormData({
      name: "",
      code: "",
      city: "Kolkata",
      employeeCount: 100,
      planTier: "retainer_standard",
      icPresidingOfficer: "Senior Internal Member (Designated)",
      icExternalMember: "Adv. Debjani Sen (Acorn Legal Consultants)",
      registeredAddress: "",
    });
    setShowModal(true);
  };

  const openEditModal = (org: Organization) => {
    setEditingOrg(org);
    setFormData({
      name: org.name,
      code: org.code,
      city: org.city,
      employeeCount: org.employeeCount,
      planTier: org.planTier,
      icPresidingOfficer: org.icPresidingOfficer || "Senior Internal Member (Designated)",
      icExternalMember: org.icExternalMember || "Adv. Debjani Sen (Acorn Legal Consultants)",
      registeredAddress: org.registeredAddress,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;

    if (editingOrg) {
      platformStore.updateOrganization(editingOrg.id, {
        name: formData.name,
        code: formData.code.toUpperCase(),
        city: formData.city,
        employeeCount: Number(formData.employeeCount),
        planTier: formData.planTier,
        icPresidingOfficer: formData.icPresidingOfficer,
        icExternalMember: formData.icExternalMember,
        registeredAddress: formData.registeredAddress,
      });
      triggerToast(`Updated subscription for ${formData.code.toUpperCase()}`);
    } else {
      platformStore.addOrganization({
        name: formData.name,
        code: formData.code.toUpperCase(),
        city: formData.city,
        employeeCount: Number(formData.employeeCount),
        hasIC: true,
        complianceScore: 85,
        planTier: formData.planTier,
        icPresidingOfficer: formData.icPresidingOfficer,
        icExternalMember: formData.icExternalMember,
        registeredAddress: formData.registeredAddress,
        policyAcknowledgedPct: 80,
        lastAnnualReportYear: 2025,
        annualReportStatus: "draft",
      });
      triggerToast(`Registered new retainer for ${formData.code.toUpperCase()}`);
    }

    setShowModal(false);
    loadData();
  };

  const filtered = orgs.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.city.toLowerCase().includes(searchTerm.toLowerCase())
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
            PRD Screen Ref: A-13
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
                Retainer Orders &bull; Finance &bull; Section 8.12
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Corporate POSH Subscriptions &amp; Retainer Orders
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Manage statutory client retainer tiers, external member nominations, and annual coverage.
              </p>
            </div>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Enrol Client Retainer</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-card border border-border shadow-card flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by client name, code, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-border rounded text-xs focus:outline-none focus:border-primary"
            />
          </div>
          <div className="text-slate-500 text-[11px]">
            Showing <strong className="text-ink">{filtered.length}</strong> of {orgs.length} client retainers
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
                <tr>
                  <th className="p-3.5">Organisation</th>
                  <th className="p-3.5">Active Plan Tier</th>
                  <th className="p-3.5">Employees Covered</th>
                  <th className="p-3.5">Acorn External Member</th>
                  <th className="p-3.5">Compliance Score</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filtered.map((org) => (
                  <tr key={org.id} className="hover:bg-surface/50 transition">
                    <td className="p-3.5">
                      <div className="font-semibold text-ink">{org.name}</div>
                      <div className="text-[10px] text-ink-secondary font-mono">{org.code} &bull; {org.city}</div>
                    </td>
                    <td className="p-3.5 capitalize font-medium text-primary">
                      {org.planTier.replace(/_/g, " ")}
                    </td>
                    <td className="p-3.5 text-ink font-semibold">{org.employeeCount} Staff</td>
                    <td className="p-3.5 text-ink-secondary">{org.icExternalMember}</td>
                    <td className="p-3.5 font-bold text-emerald-700">
                      {org.complianceScore}%
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                        ACTIVE RETAINER
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => openEditModal(org)}
                        className="text-slate-500 hover:text-primary p-1 rounded hover:bg-slate-100 transition"
                        title="Edit Retainer Details"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      No client retainers found matching &quot;{searchTerm}&quot;.
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
                  {editingOrg ? "Update Retainer Subscription" : "Enrol New Corporate Client Retainer"}
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
                  <label className="font-bold text-slate-700 block mb-1">Company / Entity Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Apex Industrial Solutions Ltd"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Org Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="e.g. APEXIND"
                      className="w-full p-2 border border-border rounded font-mono uppercase"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">City / Region *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-2 border border-border rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Employee Count *</label>
                    <input
                      type="number"
                      required
                      min={10}
                      value={formData.employeeCount}
                      onChange={(e) => setFormData({ ...formData, employeeCount: Number(e.target.value) })}
                      className="w-full p-2 border border-border rounded font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Plan Tier</label>
                    <select
                      value={formData.planTier}
                      onChange={(e) => setFormData({ ...formData, planTier: e.target.value })}
                      className="w-full p-2 border border-border rounded bg-white capitalize"
                    >
                      <option value="retainer_standard">Retainer Standard</option>
                      <option value="retainer_enterprise">Retainer Enterprise</option>
                      <option value="basic">Basic Advisory</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nominated Acorn External Member</label>
                  <input
                    type="text"
                    required
                    value={formData.icExternalMember}
                    onChange={(e) => setFormData({ ...formData, icExternalMember: e.target.value })}
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Registered Office Address</label>
                  <textarea
                    rows={2}
                    value={formData.registeredAddress}
                    onChange={(e) => setFormData({ ...formData, registeredAddress: e.target.value })}
                    placeholder="Full statutory registered office address..."
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
                    {editingOrg ? "Update Retainer" : "Save Retainer"}
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
