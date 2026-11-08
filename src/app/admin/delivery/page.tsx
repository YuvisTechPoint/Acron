"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowLeft,
  Plus,
  Trash2,
  Search,
  Filter,
  X,
  UserCheck
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { DeliveryTask } from "@/lib/types";

export default function AdminDeliveryBoardPage() {
  const [tasks, setTasks] = useState<DeliveryTask[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    code: "",
    task: "",
    client: "TECHKOL",
    due: "",
    owner: "Adv. Debjani Sen",
    priority: "Normal" as "High" | "Normal" | "Urgent",
  });

  const loadData = () => {
    setTasks(platformStore.getDeliveryTasks());
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
    if (!form.task || !form.code) return;

    platformStore.addDeliveryTask({
      code: form.code.toUpperCase(),
      task: form.task,
      client: form.client,
      due: form.due || "Immediate",
      status: "In Progress",
      owner: form.owner,
      priority: form.priority,
    });

    triggerToast(`Added deliverable ${form.code.toUpperCase()}`);
    setShowModal(false);
    setForm({
      code: "",
      task: "",
      client: "TECHKOL",
      due: "",
      owner: "Adv. Debjani Sen",
      priority: "Normal",
    });
    loadData();
  };

  const handleStatusChange = (code: string, status: DeliveryTask["status"]) => {
    platformStore.updateDeliveryTaskStatus(code, status);
    triggerToast(`Updated ${code} status to ${status}`);
    loadData();
  };

  const handleDelete = (code: string) => {
    if (confirm(`Are you sure you want to delete deliverable ${code}?`)) {
      platformStore.deleteDeliveryTask(code);
      triggerToast(`Removed task ${code}`);
      loadData();
    }
  };

  const filtered = tasks.filter((t) => {
    const matchesSearch =
      t.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.owner.toLowerCase().includes(searchTerm.toLowerCase());
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
            PRD Screen Ref: A-15
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
                Service Fulfilment &bull; SLA Board
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Service Deliverables &amp; Fulfillment Tasks
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Track client opinions, contract turnarounds, training deliveries, and IC annual reports.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setForm({
                code: `DEL-${tasks.length + 104}`,
                task: "",
                client: "TECHKOL",
                due: "30 Nov 2026",
                owner: "Adv. Debjani Sen",
                priority: "Normal",
              });
              setShowModal(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Fulfillment Task</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-card border border-border shadow-card flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by task, code, client, or counsel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-border rounded text-xs focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-slate-500 text-[11px]">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-1.5 border border-border rounded text-xs bg-white text-slate-700"
            >
              <option value="all">All Statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Pending Inspection">Pending Inspection</option>
              <option value="Review Required">Review Required</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
                <tr>
                  <th className="p-3.5">Task ID</th>
                  <th className="p-3.5">Service Deliverable</th>
                  <th className="p-3.5">Client Org</th>
                  <th className="p-3.5">Due Date</th>
                  <th className="p-3.5">Assigned Counsel</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filtered.map((t) => (
                  <tr key={t.code} className="hover:bg-surface/50 transition">
                    <td className="p-3.5 font-mono font-bold text-primary">{t.code}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-ink">{t.task}</div>
                      {t.priority && (
                        <span className={`inline-block mt-0.5 text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          t.priority === "Urgent" ? "bg-red-100 text-red-800" : t.priority === "High" ? "bg-amber-100 text-amber-800" : "text-slate-500"
                        }`}>
                          {t.priority} Priority
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-ink-secondary font-bold font-mono">{t.client}</td>
                    <td className="p-3.5 text-primary font-medium">{t.due}</td>
                    <td className="p-3.5 text-ink">{t.owner}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.status === "Completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : t.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-primary-light text-primary"
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-1">
                      {t.status !== "Completed" ? (
                        <button
                          onClick={() => handleStatusChange(t.code, "Completed")}
                          className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold transition"
                          title="Mark Delivered & Complete"
                        >
                          Complete
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(t.code, "In Progress")}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px] font-medium transition"
                          title="Reopen Task"
                        >
                          Reopen
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(t.code)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-slate-100 transition"
                        title="Delete Task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      No fulfillment deliverables found.
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
                <h3 className="font-serif text-lg font-bold text-ink">New Service Fulfillment Task</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded text-slate-400 hover:text-ink"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Task Code *</label>
                    <input
                      type="text"
                      required
                      value={form.code}
                      onChange={(e) => setForm({ ...form, code: e.target.value })}
                      placeholder="e.g. DEL-104"
                      className="w-full p-2 border border-border rounded font-mono uppercase"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Client Code *</label>
                    <input
                      type="text"
                      required
                      value={form.client}
                      onChange={(e) => setForm({ ...form, client: e.target.value.toUpperCase() })}
                      placeholder="e.g. TECHKOL"
                      className="w-full p-2 border border-border rounded font-mono uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Deliverable Task Title *</label>
                  <textarea
                    rows={2}
                    required
                    value={form.task}
                    onChange={(e) => setForm({ ...form, task: e.target.value })}
                    placeholder="e.g. Review and submit Sec 21 Annual Report to District Officer"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Target Due Date *</label>
                    <input
                      type="text"
                      required
                      value={form.due}
                      onChange={(e) => setForm({ ...form, due: e.target.value })}
                      placeholder="e.g. 15 Dec 2026"
                      className="w-full p-2 border border-border rounded"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Priority</label>
                    <select
                      value={form.priority}
                      onChange={(e) => setForm({ ...form, priority: e.target.value as any })}
                      className="w-full p-2 border border-border rounded bg-white"
                    >
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assigned Counsel</label>
                  <input
                    type="text"
                    required
                    value={form.owner}
                    onChange={(e) => setForm({ ...form, owner: e.target.value })}
                    placeholder="e.g. Adv. Debjani Sen"
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
                    Add Task
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
