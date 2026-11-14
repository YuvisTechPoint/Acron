"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Layout,
  MoveUp,
  MoveDown,
  Eye,
  EyeOff,
  Save,
  ArrowLeft,
  CheckCircle2,
  Sliders,
  FileText,
  Edit3,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { useRealtimePageSections, useRealtimePages } from "@/lib/realtime";
import { PageContentItem, PageSectionItem } from "@/lib/types";

export default function AdminPageLayoutManager() {
  const [activeTab, setActiveTab] = useState<"layout" | "content">("content");
  const realtimeSections = useRealtimePageSections();
  const [sections, setSections] = useState<PageSectionItem[]>([]);
  const pages = useRealtimePages();
  const [selectedSlug, setSelectedSlug] = useState<string>("about");
  const [currentPage, setCurrentPage] = useState<PageContentItem | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSections(realtimeSections);
  }, [realtimeSections]);

  useEffect(() => {
    const curr = pages.find((p) => p.slug === selectedSlug) || platformStore.getPageContent(selectedSlug);
    setCurrentPage(curr);
  }, [selectedSlug, pages]);

  const moveSection = (index: number, direction: "UP" | "DOWN") => {
    const targetIndex = direction === "UP" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    const reordered = [...sections];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;
    setSections(reordered);
    platformStore.updatePageSections(reordered);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleVisibility = (id: string) => {
    const updated = sections.map((s) => (s.id === id ? { ...s, isEnabled: !s.isEnabled } : s));
    setSections(updated);
    platformStore.updatePageSections(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSavePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPage) return;
    platformStore.updatePageContent(currentPage.slug, currentPage);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-8 text-ink">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-navy-700 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-brass-500" />
            <span>Back to Firm Dashboard</span>
          </Link>
          <span className="text-[11px] font-mono bg-navy-50 text-navy-800 border border-navy-200 px-2 py-0.5 rounded">
            PRD Ref: A-08
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-card">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-navy-700 font-bold">
              <Layout className="w-4 h-4 text-brass-500" />
              <span>Static Pages &amp; Homepage Structure CMS</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink-950 mt-1">
              Page Content &amp; Architecture Manager
            </h1>
            <p className="text-xs text-ink-secondary mt-1">
              Edit the copy, headings, and legal texts across static pages (/about, /privacy, /terms, /disclaimer).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("content")}
              className={`px-3.5 py-1.5 rounded-btn text-xs font-semibold transition ${
                activeTab === "content"
                  ? "bg-navy-700 text-white shadow-sm"
                  : "bg-white border border-border text-ink-secondary hover:text-ink"
              }`}
            >
              Page Content Editor
            </button>
            <button
              onClick={() => setActiveTab("layout")}
              className={`px-3.5 py-1.5 rounded-btn text-xs font-semibold transition ${
                activeTab === "layout"
                  ? "bg-navy-700 text-white shadow-sm"
                  : "bg-white border border-border text-ink-secondary hover:text-ink"
              }`}
            >
              Homepage Sections
            </button>
          </div>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-btn text-xs flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">Page content updated and published live across the platform.</span>
          </div>
        )}

        {/* TAB 1: STATIC PAGE CONTENT EDITOR */}
        {activeTab === "content" && currentPage && (
          <div className="bg-white rounded-card border border-border shadow-card p-6 sm:p-8 space-y-6 text-xs">
            {/* Page Selector Tabs */}
            <div className="flex flex-wrap gap-2 pb-4 border-b border-border">
              {["about", "disclaimer", "privacy", "terms"].map((slug) => (
                <button
                  key={slug}
                  onClick={() => setSelectedSlug(slug)}
                  className={`px-3 py-1.5 rounded-btn uppercase font-bold text-[11px] transition ${
                    selectedSlug === slug
                      ? "bg-navy-800 text-white"
                      : "bg-ivory-50 border border-border text-ink-secondary hover:bg-slate-100"
                  }`}
                >
                  /{slug}
                </button>
              ))}
            </div>

            <form onSubmit={handleSavePage} className="space-y-4">
              <div>
                <label className="font-bold text-ink-950 block mb-1">Page Main Title</label>
                <input
                  type="text"
                  required
                  value={currentPage.title}
                  onChange={(e) => setCurrentPage({ ...currentPage, title: e.target.value })}
                  className="w-full p-2.5 border border-border rounded font-serif font-bold text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-ink-950 block mb-1">Subtitle / Statutory Ref</label>
                <input
                  type="text"
                  value={currentPage.subtitle || ""}
                  onChange={(e) => setCurrentPage({ ...currentPage, subtitle: e.target.value })}
                  className="w-full p-2.5 border border-border rounded"
                />
              </div>

              <div>
                <label className="font-bold text-ink-950 block mb-1">Primary Body Content</label>
                <textarea
                  rows={6}
                  required
                  value={currentPage.content}
                  onChange={(e) => setCurrentPage({ ...currentPage, content: e.target.value })}
                  className="w-full p-2.5 border border-border rounded leading-relaxed font-sans text-xs"
                />
              </div>

              {currentPage.sections && currentPage.sections.length > 0 && (
                <div className="space-y-4 pt-3 border-t border-border">
                  <h4 className="font-bold text-sm text-ink-950">Sub-Sections &amp; Paragraphs</h4>
                  {currentPage.sections.map((sec, idx) => (
                    <div key={idx} className="p-3 bg-ivory-50 rounded border border-border space-y-2">
                      <input
                        type="text"
                        value={sec.heading}
                        onChange={(e) => {
                          const updated = [...currentPage.sections!];
                          updated[idx].heading = e.target.value;
                          setCurrentPage({ ...currentPage, sections: updated });
                        }}
                        className="w-full p-2 border border-border rounded font-bold"
                      />
                      <textarea
                        rows={3}
                        value={sec.body}
                        onChange={(e) => {
                          const updated = [...currentPage.sections!];
                          updated[idx].body = e.target.value;
                          setCurrentPage({ ...currentPage, sections: updated });
                        }}
                        className="w-full p-2 border border-border rounded leading-relaxed text-xs"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-border">
                <span className="text-[11px] text-ink-secondary">
                  Updated: {new Date(currentPage.updatedAt).toLocaleString()}
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-navy-700 hover:bg-blue-600 text-white font-bold rounded-btn flex items-center gap-1.5 shadow-sm transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Page Copy</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: HOMEPAGE SECTIONS ORDER */}
        {activeTab === "layout" && (
          <div className="bg-white rounded-card border border-border shadow-card divide-y divide-border text-xs">
            <div className="p-4 bg-ivory-50 flex justify-between items-center">
              <span className="font-bold text-ink-950 uppercase tracking-wider text-[11px]">
                Homepage Section Rendering Sequence
              </span>
              <span className="text-[11px] text-ink-secondary">7 Defined Layout Zones</span>
            </div>

            {sections.map((sec, index) => (
              <div
                key={sec.id}
                className="p-4 flex items-center justify-between hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="font-mono text-slate-400 font-bold w-6">{index + 1}</div>
                  <div>
                    <div className="font-bold text-ink-950">{sec.name}</div>
                    <div className="text-[11px] text-ink-secondary italic">&ldquo;{sec.heading}&rdquo;</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleVisibility(sec.id)}
                    aria-label={sec.isEnabled ? `Hide section ${sec.name}` : `Show section ${sec.name}`}
                    className={`min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 ${
                      sec.isEnabled
                        ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                        : "text-slate-400 bg-slate-100"
                    }`}
                    title={sec.isEnabled ? "Visible on site" : "Hidden from site"}
                  >
                    {sec.isEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => moveSection(index, "UP")}
                    disabled={index === 0}
                    aria-label={`Move ${sec.name} up`}
                    className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700"
                    title="Move Up"
                  >
                    <MoveUp className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => moveSection(index, "DOWN")}
                    disabled={index === sections.length - 1}
                    aria-label={`Move ${sec.name} down`}
                    className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700"
                    title="Move Down"
                  >
                    <MoveDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
