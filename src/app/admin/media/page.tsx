"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Image as ImageIcon,
  Upload,
  Search,
  Filter,
  Copy,
  Trash2,
  Check,
  ArrowLeft,
  FileText,
  Eye
} from "lucide-react";

interface MediaItem {
  id: string;
  name: string;
  category: "PROFILE" | "BADGE" | "INSIGHT" | "DOCUMENT";
  size: string;
  dimensions: string;
  url: string;
  uploadedAt: string;
}

const INITIAL_MEDIA: MediaItem[] = [
  {
    id: "MED-001",
    name: "adv-subhasish-mukherjee.jpg",
    category: "PROFILE",
    size: "240 KB",
    dimensions: "800x1000",
    url: "/media/profiles/adv-subhasish-mukherjee.jpg",
    uploadedAt: "2026-10-15"
  },
  {
    id: "MED-002",
    name: "adv-debjani-sen.jpg",
    category: "PROFILE",
    size: "215 KB",
    dimensions: "800x1000",
    url: "/media/profiles/adv-debjani-sen.jpg",
    uploadedAt: "2026-10-15"
  },
  {
    id: "MED-003",
    name: "acorn-legal-crest-gold.svg",
    category: "BADGE",
    size: "45 KB",
    dimensions: "Vector",
    url: "/media/branding/acorn-legal-crest-gold.svg",
    uploadedAt: "2026-10-12"
  },
  {
    id: "MED-004",
    name: "posh-annual-report-statutory-spec.pdf",
    category: "DOCUMENT",
    size: "1.2 MB",
    dimensions: "PDF 14 Pages",
    url: "/media/docs/posh-annual-report-statutory-spec.pdf",
    uploadedAt: "2026-10-20"
  },
  {
    id: "MED-005",
    name: "kolkata-high-court-heritage-facade.jpg",
    category: "INSIGHT",
    size: "480 KB",
    dimensions: "1920x1080",
    url: "/media/insights/kolkata-high-court-facade.jpg",
    uploadedAt: "2026-10-25"
  }
];

export default function AdminMediaLibraryPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filtered = mediaList.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === "all" || m.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
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
            PRD Screen Ref: A-07
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
              <ImageIcon className="w-4 h-4 text-primary" />
              <span>Digital Asset Management</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink mt-1">
              Firm Media Library &amp; CDN Assets
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Store partner photographs, chamber heritage assets, policy documents, and article banners.
            </p>
          </div>

          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload New Asset</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const newMedia: MediaItem = {
                    id: `MED-00${mediaList.length + 1}`,
                    name: file.name,
                    category: "INSIGHT",
                    size: `${(file.size / 1024).toFixed(0)} KB`,
                    dimensions: "Auto-detected",
                    url: `/media/uploads/${file.name}`,
                    uploadedAt: new Date().toISOString().split("T")[0]
                  };
                  setMediaList([newMedia, ...mediaList]);
                }
              }}
            />
          </label>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-card border border-border shadow-sm flex flex-col sm:flex-row justify-between gap-3 items-center">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search filename..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs border border-border rounded w-full focus:outline-none focus:border-primary"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs border border-border rounded px-3 py-1.5 bg-white text-slate-700 w-full sm:w-auto"
          >
            <option value="all">All Asset Categories</option>
            <option value="PROFILE">Partner Profiles</option>
            <option value="BADGE">Branding &amp; Badges</option>
            <option value="INSIGHT">Article Covers</option>
            <option value="DOCUMENT">PDF Documents</option>
          </select>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-card border border-border shadow-sm space-y-3">
              <div className="h-32 bg-slate-100 rounded flex items-center justify-center border border-slate-200">
                {item.category === "DOCUMENT" ? (
                  <FileText className="w-12 h-12 text-slate-400" />
                ) : (
                  <ImageIcon className="w-12 h-12 text-slate-400" />
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink truncate max-w-[200px]" title={item.name}>
                    {item.name}
                  </span>
                  <span className="text-[10px] font-semibold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                    {item.category}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex justify-between">
                  <span>{item.dimensions}</span>
                  <span>{item.size}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => handleCopy(item.id, item.url)}
                  className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-border rounded text-[11px] font-medium text-slate-700 flex items-center gap-1"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setMediaList(mediaList.filter((m) => m.id !== item.id))}
                  className="p-1 text-slate-400 hover:text-red-600 transition"
                  title="Delete file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

