"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  ArrowLeft,
  ShieldCheck,
  UserCheck,
  Plus,
  CheckCircle2,
  Trash2,
  Edit2,
  Search,
  X,
  Lock
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { AdminUserItem } from "@/lib/types";

export default function AdminUsersRBACPage() {
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUserItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Super Admin / Managing Partner",
    status: "Active" as "Active" | "Suspended" | "Invited",
    mfa: true,
  });

  const loadData = () => {
    setUsers(platformStore.getAdminUsers());
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      role: "Partner & External Member",
      status: "Active",
      mfa: true,
    });
    setShowModal(true);
  };

  const openEditModal = (u: AdminUserItem) => {
    setEditingUser(u);
    setFormData({
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.status,
      mfa: u.mfa,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    if (editingUser) {
      platformStore.updateAdminUser(editingUser.id, {
        name: formData.name,
        email: formData.email.toLowerCase(),
        role: formData.role,
        status: formData.status,
        mfa: formData.mfa,
      });
      triggerToast(`Updated account for ${formData.email}`);
    } else {
      platformStore.addAdminUser({
        name: formData.name,
        email: formData.email.toLowerCase(),
        role: formData.role,
        status: formData.status,
        mfa: formData.mfa,
        lastActive: "Invited",
      });
      triggerToast(`Created user account for ${formData.email}`);
    }

    setShowModal(false);
    loadData();
  };

  const handleToggleStatus = (u: AdminUserItem) => {
    const nextStatus: AdminUserItem["status"] = u.status === "Active" ? "Suspended" : "Active";
    platformStore.updateAdminUser(u.id, { status: nextStatus });
    triggerToast(`Account ${u.email} is now ${nextStatus}`);
    loadData();
  };

  const handleDelete = (id: string, email: string) => {
    if (confirm(`Revoke credentials and delete account ${email}?`)) {
      platformStore.deleteAdminUser(id);
      triggerToast(`Deleted user ${email}`);
      loadData();
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
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
            PRD Screen Ref: A-08
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
                Access Control &bull; RBAC &bull; Section 24
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Staff &amp; Portal Account Management
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Configure role-based access for Managing Partners, IC Members, Support Staff, and Finance Auditors.
              </p>
            </div>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add User Account</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-card border border-border shadow-card flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-border rounded text-xs focus:outline-none focus:border-primary"
            />
          </div>
          <div className="text-slate-500 text-[11px]">
            Showing <strong className="text-ink">{filtered.length}</strong> of {users.length} authenticated users
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <div className="p-4 bg-surface border-b border-border flex justify-between items-center">
            <span className="font-bold text-ink uppercase tracking-wider text-[11px]">
              Active User Accounts &amp; Multi-Factor Enrolment
            </span>
            <span className="text-[11px] text-emerald-700 font-bold">&check; Mandatory TOTP MFA Enabled Across All Tiers</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface/50 border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
                <tr>
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Email (Login ID)</th>
                  <th className="p-3.5">Assigned Roles</th>
                  <th className="p-3.5">MFA Status</th>
                  <th className="p-3.5">Account Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-surface/50 transition">
                    <td className="p-3.5 font-semibold text-ink">{u.name}</td>
                    <td className="p-3.5 text-ink-secondary font-mono">{u.email}</td>
                    <td className="p-3.5 font-medium text-primary">{u.role}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {u.mfa ? "TOTP VERIFIED" : "PENDING SETUP"}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <button
                        onClick={() => handleToggleStatus(u)}
                        title="Click to toggle account state"
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border transition ${
                          u.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                        }`}
                      >
                        {u.status}
                      </button>
                    </td>
                    <td className="p-3.5 text-right space-x-1">
                      <button
                        onClick={() => openEditModal(u)}
                        className="text-slate-500 hover:text-primary p-1 rounded hover:bg-slate-100 transition"
                        title="Edit User"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(u.id, u.email)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-slate-100 transition"
                        title="Revoke User"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      No user accounts found.
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
                  {editingUser ? "Edit User Account & RBAC" : "Create New Staff Account"}
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
                  <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Adv. Subhasish Mukherjee"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email (Official Acorn Login) *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. name@acornlegal.in"
                    className="w-full p-2 border border-border rounded font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assigned RBAC Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full p-2 border border-border rounded bg-white"
                  >
                    <option value="Super Admin / Managing Partner">Super Admin / Managing Partner</option>
                    <option value="Partner & External Member">Partner &amp; External Member</option>
                    <option value="IC Presiding Officer (TechKol)">IC Presiding Officer</option>
                    <option value="Legal Consultant">Legal Consultant</option>
                    <option value="Support Executive">Support Executive</option>
                    <option value="Finance Administrator">Finance Administrator</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Account State</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full p-2 border border-border rounded bg-white"
                    >
                      <option value="Active">Active</option>
                      <option value="Suspended">Suspended</option>
                      <option value="Invited">Invited</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Enforce MFA</label>
                    <select
                      value={formData.mfa ? "true" : "false"}
                      onChange={(e) => setFormData({ ...formData, mfa: e.target.value === "true" })}
                      className="w-full p-2 border border-border rounded bg-white"
                    >
                      <option value="true">Mandatory TOTP</option>
                      <option value="false">Grace Period (7 Days)</option>
                    </select>
                  </div>
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
                    {editingUser ? "Update Account" : "Create Account"}
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
