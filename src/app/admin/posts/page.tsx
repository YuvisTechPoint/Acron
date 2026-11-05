"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Eye,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { BlogPost } from "@/lib/types";

export default function AdminBlogCMSPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(platformStore.getBlogs());
  const [isCreating, setIsCreating] = useState(false);

  // New post form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("POSH Compliance");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("Adv. Debjani Sen");
  const [tags, setTags] = useState("POSH, Compliance, West Bengal");

  const handleCreatePost = (e: React.FormEvent) => {
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

    setBlogs(platformStore.getBlogs());
    setIsCreating(false);
    setTitle("");
    setSummary("");
    setContent("");
    alert("Article published to public Insights library.");
  };

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-card">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-1.5 rounded hover:bg-surface text-ink-secondary hover:text-ink transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-bold">
                Editorial CMS
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Legal Insights &amp; Articles Manager
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="text-xs text-primary font-semibold hover:underline"
            >
              View Public Blog &rarr;
            </Link>
            <button
              onClick={() => setIsCreating(!isCreating)}
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded shadow transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{isCreating ? "Close Editor" : "New Article"}</span>
            </button>
          </div>
        </div>

        {isCreating && (
          <form onSubmit={handleCreatePost} className="bg-white rounded-card p-6 border border-border shadow-card space-y-4 text-xs">
            <h3 className="font-serif font-bold text-base text-ink border-b border-border pb-2">
              Publish New Legal Article
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-ink mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Recent Calcutta High Court Rulings on Notional Extension of Workplace"
                  className="w-full px-3 py-2 border border-border rounded"
                />
              </div>

              <div>
                <label className="block font-semibold text-ink mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded"
                >
                  <option value="POSH Compliance">POSH Compliance</option>
                  <option value="Corporate Law">Corporate Law</option>
                  <option value="Dispute Resolution">Dispute Resolution</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Employment Law">Employment Law</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-ink mb-1">Summary (1-2 Sentences) *</label>
              <input
                type="text"
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief summary for listings and SEO metadata"
                className="w-full px-3 py-2 border border-border rounded"
              />
            </div>

            <div>
              <label className="block font-semibold text-ink mb-1">Full Article Content (Markdown supported) *</label>
              <textarea
                required
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write the full legal commentary, statutory references, and judicial citations..."
                className="w-full px-3 py-2 border border-border rounded"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-ink mb-1">Author *</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-border rounded"
                />
              </div>

              <div>
                <label className="block font-semibold text-ink mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3 py-1.5 border border-border rounded"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold uppercase tracking-wider rounded transition-colors"
              >
                Publish Article
              </button>
            </div>
          </form>
        )}

        {/* Existing Articles Table */}
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <div className="p-4 bg-surface border-b border-border font-bold text-ink text-xs uppercase tracking-wider">
            Published Articles ({blogs.length})
          </div>

          <div className="divide-y divide-border-subtle">
            {blogs.map((b) => (
              <div key={b.id} className="p-4 hover:bg-surface/50 flex justify-between items-center gap-4">
                <div>
                  <h4 className="font-serif font-bold text-ink text-sm">
                    {b.title}
                  </h4>
                  <div className="text-[11px] text-ink-secondary mt-0.5">
                    Category: <strong>{b.category}</strong> &bull; Author: {b.author.name} &bull; Published {formatDate(b.publishedAt)}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-ink-secondary flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{b.views} reads</span>
                  </span>
                  <Link
                    href={`/blog/${b.slug}`}
                    className="px-3 py-1.5 border border-border text-primary font-semibold rounded hover:bg-surface"
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

