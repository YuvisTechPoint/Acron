"use client";

import React, { useState } from "react";
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
  FileText
} from "lucide-react";

interface KbArticle {
  id: string;
  slug: string;
  title: string;
  category: "STATUTORY_RIGHTS" | "IC_PROCESS" | "EMPLOYER_DUTIES" | "EVIDENCE";
  readingTimeMinutes: number;
  isPublished: boolean;
  views: number;
}

const INITIAL_ARTICLES: KbArticle[] = [
  {
    id: "KB-01",
    slug: "what-constitutes-sexual-harassment",
    title: "What Constitutes Sexual Harassment under Section 2(n) of POSH Act 2013",
    category: "STATUTORY_RIGHTS",
    readingTimeMinutes: 5,
    isPublished: true,
    views: 1420
  },
  {
    id: "KB-02",
    slug: "conciliation-vs-inquiry-differences",
    title: "Section 10 Conciliation vs Section 11 Inquiry: Rights & Key Differences",
    category: "IC_PROCESS",
    readingTimeMinutes: 6,
    isPublished: true,
    views: 890
  },
  {
    id: "KB-03",
    slug: "when-to-approach-local-committee",
    title: "When to Approach the District Local Committee (LC) instead of an Internal Committee",
    category: "STATUTORY_RIGHTS",
    readingTimeMinutes: 4,
    isPublished: true,
    views: 740
  },
  {
    id: "KB-04",
    slug: "employer-mandates-under-section-19",
    title: "Employer Statutory Duties: Section 19 Policy Display, Workshops & Annual Reporting",
    category: "EMPLOYER_DUTIES",
    readingTimeMinutes: 7,
    isPublished: true,
    views: 610
  }
];

export default function AdminKbPage() {
  const [articles, setArticles] = useState<KbArticle[]>(INITIAL_ARTICLES);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<KbArticle["category"]>("STATUTORY_RIGHTS");
  const [newContent, setNewContent] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const created: KbArticle = {
      id: `KB-0${articles.length + 1}`,
      slug,
      title: newTitle,
      category: newCategory,
      readingTimeMinutes: 4,
      isPublished: true,
      views: 0
    };
    setArticles([...articles, created]);
    setShowModal(false);
    setNewTitle("");
    setNewContent("");
  };

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.slug.toLowerCase().includes(searchTerm.toLowerCase())
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
            PRD Screen Ref: A-24
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>Public Knowledge Hub CMS</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink mt-1">
              POSH Knowledge Base &amp; Legal Guides
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Curate citizen guides, statutory interpretations, employee rights brochures, and procedural FAQs published at /help.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Publish New Guide</span>
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-card border border-border shadow-sm flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search knowledge articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs border border-border rounded w-full focus:outline-none focus:border-primary"
            />
          </div>
          <span className="text-xs text-slate-500 font-mono">{filtered.length} guides active</span>
        </div>

        {/* Articles Table */}
        <div className="bg-white rounded-card border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-border uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Article Title &amp; Slug</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Read Time</th>
                  <th className="py-3 px-4">Readership</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-ink hover:text-primary transition">{item.title}</div>
                      <div className="font-mono text-[10px] text-slate-400">/help/{item.slug}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-medium rounded text-[10px]">
                        {item.category.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {item.readingTimeMinutes} min read
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      {item.views.toLocaleString()} views
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Live
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/help`}
                          className="p-1 text-slate-400 hover:text-primary transition"
                          title="Preview guide"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setArticles(articles.filter((a) => a.id !== item.id))}
                          className="p-1 text-slate-400 hover:text-red-600 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
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
            <div className="bg-white rounded-card max-w-lg w-full p-6 shadow-xl border border-border space-y-4 text-xs">
              <h3 className="font-serif text-lg font-bold text-ink">Compose Knowledge Guide</h3>

              <form onSubmit={handleAdd} className="space-y-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Rights of Contractual Workers and Interns under POSH"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Topic Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2 border border-border rounded bg-white"
                  >
                    <option value="STATUTORY_RIGHTS">Statutory Rights &amp; Protections</option>
                    <option value="IC_PROCESS">Internal Committee Inquiry Protocols</option>
                    <option value="EMPLOYER_DUTIES">Employer Compliance &amp; Penalties</option>
                    <option value="EVIDENCE">Evidence &amp; Forensic Standard of Proof</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Markdown Content Body</label>
                  <textarea
                    rows={6}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="## Introduction&#10;&#10;Write comprehensive guidance here..."
                    className="w-full p-2 border border-border rounded font-mono text-[11px]"
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
                    Publish to /help
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

