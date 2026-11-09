"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Eye,
  Trash2,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { useRealtimePosts } from "@/lib/realtime";
import { formatDate } from "@/lib/utils";
import { BlogPost } from "@/lib/types";

export default function AdminBlogCMSPage() {
  const blogs = useRealtimePosts();
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("POSH Compliance");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("Adv. Debjani Sen");
  const [tags, setTags] = useState("POSH, Compliance, West Bengal");

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = platformStore.addBlogPost({
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      summary,
      content,
      category,
      tags: tags.split(",").map((t) => t.trim()),
      readingTimeMinutes: 5,
      status: "published",
      publishedAt: new Date().toISOString(),
      author: {
        name: authorName,
        role: "Partner, Acorn Legal Consultants",
      },
    });

    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
    } catch {}

    setIsCreating(false);
    setTitle("");
    setSummary("");
    setContent("");
  };

  const handleStartEdit = (b: BlogPost) => {
    setEditingPost({ ...b });
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    platformStore.updateBlogPost(editingPost.id, editingPost);

    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPost),
      });
    } catch {}

    setEditingPost(null);
  };

  const handleDelete = async (id: string, postTitle: string) => {
    if (confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      platformStore.deleteBlogPost(id);
      try {
        await fetch(`/api/posts?id=${id}`, { method: "DELETE" });
      } catch {}
    }
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-8 text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-navy-700 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-brass-500" />
            <span>Back to Firm Dashboard</span>
          </Link>
          <Link
            href="/blog"
            target="_blank"
            className="text-xs text-navy-700 font-semibold hover:text-blue-600"
          >
            View Public Insights &rarr;
          </Link>
        </div>

        {/* Header Card */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-card">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-navy-700 font-bold">
              <FileText className="w-4 h-4 text-brass-500" />
              <span>Editorial CMS &bull; Section 8.24</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink-950 mt-1">
              Legal Insights &amp; Articles Manager
            </h1>
            <p className="text-xs text-ink-secondary mt-1">
              Publish, edit, or remove analytical legal articles and statutory updates on the firm blog.
            </p>
          </div>

          <button
            onClick={() => {
              setIsCreating(!isCreating);
              setEditingPost(null);
            }}
            className="px-4 py-2 bg-navy-700 hover:bg-blue-600 text-white text-xs font-bold rounded-btn shadow-sm transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{isCreating ? "Close Editor" : "New Article"}</span>
          </button>
        </div>

        {/* Modal / Form: Create Post */}
        {isCreating && (
          <form onSubmit={handleCreatePost} className="bg-white rounded-card p-6 border border-border shadow-card space-y-4 text-xs animate-fade-in">
            <h3 className="font-serif font-bold text-base text-ink-950 border-b border-border pb-2">
              Publish New Legal Article
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-ink-950 mb-1">Article Headline *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. West Bengal POSH Annual Reporting Compliance Guide"
                  className="w-full px-3 py-2 border border-border rounded"
                />
              </div>

              <div>
                <label className="block font-semibold text-ink-950 mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded bg-white"
                >
                  <option value="POSH Compliance">POSH Compliance</option>
                  <option value="Corporate Governance">Corporate Governance</option>
                  <option value="Commercial Dispute">Commercial Dispute</option>
                  <option value="Real Estate & Title">Real Estate &amp; Title</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-ink-950 mb-1">Article Summary *</label>
              <textarea
                rows={2}
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="2-3 sentence executive summary..."
                className="w-full px-3 py-2 border border-border rounded"
              />
            </div>

            <div>
              <label className="block font-semibold text-ink-950 mb-1">Full Legal Analysis Content *</label>
              <textarea
                rows={8}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Exhaustive legal commentary, citations, and practical guidance..."
                className="w-full px-3 py-2 border border-border rounded font-serif text-xs leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-ink-950 mb-1">Author Name *</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded"
                />
              </div>

              <div>
                <label className="block font-semibold text-ink-950 mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-border">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 border border-border rounded text-slate-600 hover:bg-slate-50 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-navy-700 hover:bg-blue-600 text-white font-bold rounded-btn transition"
              >
                Publish Article Live
              </button>
            </div>
          </form>
        )}

        {/* Modal: Edit Post */}
        {editingPost && (
          <div className="fixed inset-0 bg-ink-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-card max-w-2xl w-full p-6 space-y-4 shadow-xl border border-border text-xs max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <h3 className="font-serif text-lg font-bold text-ink-950">Edit Article</h3>
                <button onClick={() => setEditingPost(null)} className="p-1 text-slate-400 hover:text-ink">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="font-bold block mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="w-full p-2 border border-border rounded font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Category</label>
                    <input
                      type="text"
                      value={editingPost.category}
                      onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                      className="w-full p-2 border border-border rounded"
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Author</label>
                    <input
                      type="text"
                      value={editingPost.author.name}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          author: { ...editingPost.author, name: e.target.value },
                        })
                      }
                      className="w-full p-2 border border-border rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold block mb-1">Summary</label>
                  <textarea
                    rows={2}
                    value={editingPost.summary}
                    onChange={(e) => setEditingPost({ ...editingPost, summary: e.target.value })}
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Full Content</label>
                  <textarea
                    rows={8}
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    className="w-full p-2 border border-border rounded font-serif leading-relaxed"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setEditingPost(null)}
                    className="px-4 py-2 border border-border rounded text-slate-600 hover:bg-slate-50 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-navy-700 hover:bg-blue-600 text-white rounded font-bold flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Existing Articles Table */}
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <div className="p-4 bg-ivory-50 border-b border-border font-bold text-ink-950 text-xs uppercase tracking-wider flex justify-between items-center">
            <span>Published Insights ({blogs.length})</span>
            <span className="text-[11px] text-ink-secondary font-normal">Real-Time Sync</span>
          </div>

          <div className="divide-y divide-border-subtle">
            {blogs.map((b) => (
              <div key={b.id} className="p-4 hover:bg-slate-50/60 flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition">
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-ink-950 text-sm">
                    {b.title}
                  </h4>
                  <div className="text-[11px] text-ink-secondary">
                    Category: <strong className="text-navy-700">{b.category}</strong> &bull; Author: {b.author.name} &bull; Published {formatDate(b.publishedAt)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-ink-secondary flex items-center gap-1 mr-2">
                    <Eye className="w-3.5 h-3.5 text-brass-500" />
                    <span>{b.views} reads</span>
                  </span>
                  <button
                    onClick={() => handleStartEdit(b)}
                    className="p-1.5 border border-border rounded text-slate-600 hover:text-navy-700 hover:bg-white"
                    title="Edit Post"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(b.id, b.title)}
                    className="p-1.5 border border-border rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    title="Delete Post"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href={`/blog/${b.slug}`}
                    target="_blank"
                    className="px-3 py-1.5 bg-navy-50 text-navy-800 font-semibold rounded hover:bg-navy-100 transition"
                  >
                    View &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
