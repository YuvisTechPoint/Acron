"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Plus,
  Search,
  Trash2,
  Edit2,
  ArrowLeft,
  CheckCircle2,
  Tag,
  Eye,
  FileText,
  X,
  ExternalLink
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { KbArticle } from "@/lib/types";

export default function AdminKbPage() {
  const [articles, setArticles] = useState<KbArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<KbArticle | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "STATUTORY_RIGHTS" as KbArticle["category"],
    readingTimeMinutes: 5,
    summary: "",
    content: "",
    isPublished: true,
  });

  const loadData = () => {
    setArticles(platformStore.getKbArticles());
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const openAddModal = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      category: "STATUTORY_RIGHTS",
      readingTimeMinutes: 5,
      summary: "",
      content: "",
      isPublished: true,
    });
    setShowModal(true);
  };

  const openEditModal = (article: KbArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      category: article.category,
      readingTimeMinutes: article.readingTimeMinutes,
      summary: article.summary,
      content: article.content || "",
      isPublished: article.isPublished,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (editingArticle) {
      platformStore.updateKbArticle(editingArticle.id, {
        title: formData.title,
        slug,
        category: formData.category,
        readingTimeMinutes: Number(formData.readingTimeMinutes),
        summary: formData.summary,
        content: formData.content,
        isPublished: formData.isPublished,
      });
      triggerToast(`Updated guide: ${formData.title}`);
    } else {
      platformStore.addKbArticle({
        title: formData.title,
        slug,
        category: formData.category,
        readingTimeMinutes: Number(formData.readingTimeMinutes),
        summary: formData.summary,
        content: formData.content,
        isPublished: formData.isPublished,
        views: 0,
      });
      triggerToast(`Published guide: ${formData.title}`);
    }

    setShowModal(false);
    loadData();
  };

  const handleTogglePublish = (article: KbArticle) => {
    platformStore.updateKbArticle(article.id, { isPublished: !article.isPublished });
    triggerToast(`Article status set to ${!article.isPublished ? "Published" : "Draft"}`);
    loadData();
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove "${title}"?`)) {
      platformStore.deleteKbArticle(id);
      triggerToast(`Deleted article ${id}`);
      loadData();
    }
  };

  const filtered = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === "all" || a.category === categoryFilter;
    return matchesSearch && matchesCat;
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
            PRD Screen Ref: A-24
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
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>Public Knowledge Hub CMS &bull; Section 8.24</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink mt-1">
              POSH Knowledge Base &amp; Legal Guides
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Curate citizen guides, statutory interpretations, employee rights brochures, and procedural FAQs.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Publish New Guide</span>
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-card border border-border shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search guides by title, slug, or summary..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-border rounded text-xs focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-slate-500 text-[11px]">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="p-1.5 border border-border rounded text-xs bg-white text-slate-700"
            >
              <option value="all">All Categories</option>
              <option value="STATUTORY_RIGHTS">Statutory Rights</option>
              <option value="IC_PROCESS">IC Process</option>
              <option value="EMPLOYER_DUTIES">Employer Duties</option>
              <option value="EVIDENCE">Evidence &amp; Digital Preservations</option>
            </select>
          </div>
        </div>

        {/* Articles Table */}
        <div className="bg-white rounded-card border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-border uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Article Title &amp; Slug</th>
                  <th className="py-3 px-4">Statutory Category</th>
                  <th className="py-3 px-4">Reading Time</th>
                  <th className="py-3 px-4">Citizen Views</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-ink">{a.title}</div>
                      <div className="text-[11px] text-slate-500 max-w-md truncate">{a.summary}</div>
                      <div className="font-mono text-[10px] text-primary mt-0.5">/help/{a.slug}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {a.category.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {a.readingTimeMinutes} mins
                    </td>
                    <td className="py-3.5 px-4 font-bold text-primary">
                      {a.views.toLocaleString()} reads
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleTogglePublish(a)}
                        title="Click to toggle publish"
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border transition ${
                          a.isPublished
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${a.isPublished ? "bg-emerald-500" : "bg-slate-400"}`}></span>
                        <span>{a.isPublished ? "Published" : "Draft"}</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button
                        onClick={() => openEditModal(a)}
                        className="text-slate-500 hover:text-primary p-1 rounded hover:bg-slate-100 transition"
                        title="Edit Article"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(a.id, a.title)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-slate-100 transition"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      No knowledge base articles found.
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
            <div className="bg-white rounded-card max-w-lg w-full p-6 shadow-xl border border-border space-y-4 text-xs animate-fadeIn">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <h3 className="font-serif text-lg font-bold text-ink">
                  {editingArticle ? "Edit Knowledge Base Guide" : "Publish New POSH Guide"}
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
                  <label className="font-bold text-slate-700 block mb-1">Guide Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Rights of the Complainant During Section 10 Conciliation"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Statutory Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full p-2 border border-border rounded bg-white"
                    >
                      <option value="STATUTORY_RIGHTS">Statutory Rights</option>
                      <option value="IC_PROCESS">IC Process</option>
                      <option value="EMPLOYER_DUTIES">Employer Duties</option>
                      <option value="EVIDENCE">Evidence &amp; Digital Preservations</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Estimated Reading Time</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={60}
                      value={formData.readingTimeMinutes}
                      onChange={(e) => setFormData({ ...formData, readingTimeMinutes: Number(e.target.value) })}
                      className="w-full p-2 border border-border rounded font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Summary / Excerpt *</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="Concise overview displayed in public search results..."
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Detailed Content (Markdown Supported)</label>
                  <textarea
                    rows={4}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Provide full statutory sections, compliance tips, and procedural advice..."
                    className="w-full p-2 border border-border rounded font-mono text-[11px]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isPublishedCheck"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <label htmlFor="isPublishedCheck" className="text-slate-700 font-semibold cursor-pointer">
                    Publish immediately to citizen help directory (/help)
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
                    {editingArticle ? "Update Guide" : "Save Guide"}
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
