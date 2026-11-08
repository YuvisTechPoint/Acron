"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LifeBuoy,
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  Search,
  Filter,
  X
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { HelpdeskTicket } from "@/lib/types";

export default function AdminHelpdeskPage() {
  const [tickets, setTickets] = useState<HelpdeskTicket[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    subject: "",
    client: "Kolkata Cloud Technologies Pvt Ltd",
    priority: "P3 - Normal" as HelpdeskTicket["priority"],
    sla: "Within SLA (24h remaining)",
    assignedTo: "Operations Support",
  });

  const loadData = () => {
    setTickets(platformStore.getHelpdeskTickets());
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
    if (!formData.subject || !formData.client) return;

    const created = platformStore.addHelpdeskTicket({
      subject: formData.subject,
      client: formData.client,
      priority: formData.priority,
      status: "Open",
      sla: formData.sla,
      assignedTo: formData.assignedTo,
    });

    triggerToast(`Logged support ticket ${created.id}`);
    setShowModal(false);
    setFormData({
      subject: "",
      client: "Kolkata Cloud Technologies Pvt Ltd",
      priority: "P3 - Normal",
      sla: "Within SLA (24h remaining)",
      assignedTo: "Operations Support",
    });
    loadData();
  };

  const handleStatusChange = (id: string, status: HelpdeskTicket["status"]) => {
    platformStore.updateHelpdeskTicketStatus(id, status);
    triggerToast(`Ticket ${id} marked as ${status}`);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (confirm(`Are you sure you want to delete ticket ${id}?`)) {
      platformStore.deleteHelpdeskTicket(id);
      triggerToast(`Removed ticket ${id}`);
      loadData();
    }
  };

  const filtered = tickets.filter((t) => {
    const matchesSearch =
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
            PRD Screen Ref: A-29
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
                Client Support &bull; Section 8.29
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                POSH Operations Helpdesk &amp; Service Desk
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Manage corporate client inquiries, external member requests, and SHe-Box portal assistance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/delivery"
              className="px-3.5 py-2 border border-border rounded text-xs font-semibold hover:bg-surface text-ink transition"
            >
              Delivery SLA Board &rarr;
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Support Ticket</span>
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-card border border-border shadow-card flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by ticket ID, subject, or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-border rounded text-xs focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-slate-500 text-[11px]">Filter Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-1.5 border border-border rounded text-xs bg-white text-slate-700"
            >
              <option value="all">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
                <tr>
                  <th className="p-3.5">Ticket ID</th>
                  <th className="p-3.5">Subject &amp; Assignee</th>
                  <th className="p-3.5">Client Organisation</th>
                  <th className="p-3.5">Priority</th>
                  <th className="p-3.5">SLA Target</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-surface/50 transition">
                    <td className="p-3.5 font-mono font-bold text-primary">{t.id}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-ink">{t.subject}</div>
                      {t.assignedTo && (
                        <div className="text-[10px] text-slate-500 mt-0.5">Assigned: {t.assignedTo}</div>
                      )}
                    </td>
                    <td className="p-3.5 text-ink-secondary font-medium">{t.client}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.priority.startsWith("P1")
                          ? "bg-red-100 text-red-800"
                          : t.priority.startsWith("P2")
                          ? "bg-amber-100 text-amber-800"
                          : "bg-surface border border-border text-ink"
                      }`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="p-3.5 text-emerald-700 font-medium">{t.sla}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.status === "Resolved"
                          ? "bg-emerald-100 text-emerald-800"
                          : t.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-primary-light text-primary"
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-1">
                      {t.status !== "Resolved" ? (
                        <button
                          onClick={() => handleStatusChange(t.id, "Resolved")}
                          className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold transition"
                          title="Mark Resolved"
                        >
                          Resolve
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(t.id, "Open")}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px] font-medium transition"
                          title="Reopen Ticket"
                        >
                          Reopen
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(t.id)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-slate-100 transition"
                        title="Delete Ticket"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      No support tickets found matching &quot;{searchTerm}&quot;.
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
                <h3 className="font-serif text-lg font-bold text-ink">Log Support Helpdesk Ticket</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded text-slate-400 hover:text-ink"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject / Issue Summary *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Schedule special IC hearing session with External Member"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Client Entity *</label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Kolkata Cloud Technologies Pvt Ltd"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Priority SLA</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                      className="w-full p-2 border border-border rounded bg-white"
                    >
                      <option value="P1 - Critical">P1 - Critical (4h)</option>
                      <option value="P2 - High">P2 - High (8h)</option>
                      <option value="P3 - Normal">P3 - Normal (24h)</option>
                      <option value="P4 - Low">P4 - Low (72h)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Assignee</label>
                    <input
                      type="text"
                      required
                      value={formData.assignedTo}
                      onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                      placeholder="e.g. Adv. Debjani Sen"
                      className="w-full p-2 border border-border rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">SLA Target Note</label>
                  <input
                    type="text"
                    required
                    value={formData.sla}
                    onChange={(e) => setFormData({ ...formData, sla: e.target.value })}
                    placeholder="e.g. Within SLA (4h remaining)"
                    className="w-full p-2 border border-border rounded font-mono"
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
                    Submit Ticket
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
