"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
  Plus,
  Trash2,
  Edit2,
  Search,
  X,
  BookOpen,
  Award
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { LmsCourse } from "@/lib/types";

export default function AdminLMSCourseBuilderPage() {
  const [courses, setCourses] = useState<LmsCourse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<LmsCourse | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    code: "",
    title: "",
    audience: "All employees",
    duration: "30 mins",
    passMark: "80%",
    modulesCount: 4,
    description: "",
    status: "PUBLISHED" as LmsCourse["status"],
  });

  const loadData = () => {
    setCourses(platformStore.getLmsCourses());
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const openAddModal = () => {
    setEditingCourse(null);
    setFormData({
      code: `TRN-${(courses.length + 1) * 100 + 1}`,
      title: "",
      audience: "All employees",
      duration: "30 mins",
      passMark: "80%",
      modulesCount: 4,
      description: "",
      status: "PUBLISHED",
    });
    setShowModal(true);
  };

  const openEditModal = (c: LmsCourse) => {
    setEditingCourse(c);
    setFormData({
      code: c.code,
      title: c.title,
      audience: c.audience,
      duration: c.duration,
      passMark: c.passMark,
      modulesCount: c.modulesCount || 4,
      description: c.description || "",
      status: c.status,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.code) return;

    if (editingCourse) {
      platformStore.updateLmsCourse(editingCourse.code, {
        title: formData.title,
        audience: formData.audience,
        duration: formData.duration,
        passMark: formData.passMark,
        modulesCount: Number(formData.modulesCount),
        description: formData.description,
        status: formData.status,
      });
      triggerToast(`Updated course: ${formData.code}`);
    } else {
      platformStore.addLmsCourse({
        code: formData.code.toUpperCase(),
        title: formData.title,
        audience: formData.audience,
        duration: formData.duration,
        passMark: formData.passMark,
        modulesCount: Number(formData.modulesCount),
        description: formData.description,
        status: formData.status,
      });
      triggerToast(`Added training course: ${formData.code.toUpperCase()}`);
    }

    setShowModal(false);
    loadData();
  };

  const handleToggleStatus = (c: LmsCourse) => {
    const nextStatus: LmsCourse["status"] = c.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    platformStore.updateLmsCourse(c.code, { status: nextStatus });
    triggerToast(`Course ${c.code} status set to ${nextStatus}`);
    loadData();
  };

  const handleDelete = (code: string) => {
    if (confirm(`Are you sure you want to delete course ${code}?`)) {
      platformStore.deleteLmsCourse(code);
      triggerToast(`Deleted course ${code}`);
      loadData();
    }
  };

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.audience.toLowerCase().includes(searchTerm.toLowerCase())
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
            PRD Screen Ref: A-23
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
                E-Learning &bull; Section 8.23
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Statutory POSH Course &amp; Quiz Builder
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Configure employee sensitization modules, management protocols, and IC mock assessments.
              </p>
            </div>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Training Course</span>
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-card border border-border shadow-card flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by course title, code, or audience..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-border rounded text-xs focus:outline-none focus:border-primary"
            />
          </div>
          <div className="text-slate-500 text-[11px]">
            Showing <strong className="text-ink">{filtered.length}</strong> of {courses.length} active courses
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
                <tr>
                  <th className="p-3.5">Code</th>
                  <th className="p-3.5">Course Title &amp; Description</th>
                  <th className="p-3.5">Target Audience</th>
                  <th className="p-3.5">Duration</th>
                  <th className="p-3.5">Assessment Standard</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filtered.map((c) => (
                  <tr key={c.code} className="hover:bg-surface/50 transition">
                    <td className="p-3.5 font-mono font-bold text-primary">{c.code}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-ink">{c.title}</div>
                      {c.description && (
                        <div className="text-[11px] text-slate-500 max-w-sm truncate mt-0.5">{c.description}</div>
                      )}
                    </td>
                    <td className="p-3.5 text-ink-secondary">{c.audience}</td>
                    <td className="p-3.5 text-ink-secondary">{c.duration}</td>
                    <td className="p-3.5 text-ink-secondary font-medium">{c.passMark}</td>
                    <td className="p-3.5">
                      <button
                        onClick={() => handleToggleStatus(c)}
                        title="Click to toggle status"
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border transition ${
                          c.status === "PUBLISHED"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200"
                            : "bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200"
                        }`}
                      >
                        {c.status}
                      </button>
                    </td>
                    <td className="p-3.5 text-right space-x-1">
                      <button
                        onClick={() => openEditModal(c)}
                        className="text-slate-500 hover:text-primary p-1 rounded hover:bg-slate-100 transition"
                        title="Edit Course"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(c.code)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-slate-100 transition"
                        title="Delete Course"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      No training courses found.
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
                  {editingCourse ? "Edit Training Module" : "New POSH E-Learning Course"}
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
                    <label className="font-bold text-slate-700 block mb-1">Course Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="e.g. TRN-105"
                      className="w-full p-2 border border-border rounded font-mono uppercase"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Target Audience</label>
                    <select
                      value={formData.audience}
                      onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                      className="w-full p-2 border border-border rounded bg-white"
                    >
                      <option value="All employees">All employees</option>
                      <option value="People managers">People managers</option>
                      <option value="IC members">IC members</option>
                      <option value="HR & Legal">HR &amp; Legal</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Course Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Recognizing Retaliation and Bystander Intervention"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Duration</label>
                    <input
                      type="text"
                      required
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g. 35 mins"
                      className="w-full p-2 border border-border rounded"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Pass Mark / Standard</label>
                    <input
                      type="text"
                      required
                      value={formData.passMark}
                      onChange={(e) => setFormData({ ...formData, passMark: e.target.value })}
                      placeholder="e.g. 80% or Mock Test"
                      className="w-full p-2 border border-border rounded font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Course Syllabus &amp; Overview</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Key concepts, scenario tests, and statutory citations..."
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
                    {editingCourse ? "Update Course" : "Save Course"}
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
