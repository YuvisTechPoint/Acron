"use client";

import React, { useState, useEffect } from "react";
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
  Eye,
  CheckCircle2,
  X,
  ExternalLink
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { MediaVaultItem } from "@/lib/types";

export default function AdminMediaLibraryPage() {
  const [mediaList, setMediaList] = useState<MediaVaultItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "INSIGHT" as MediaVaultItem["category"],
    size: "450 KB",
    dimensions: "1920x1080",
    url: "/images/hero.jpg",
  });

  const loadData = () => {
    setMediaList(platformStore.getMediaVault());
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    triggerToast("Asset URL copied to clipboard!");
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.url) return;

    platformStore.addMediaVaultItem({
      name: formData.name,
      category: formData.category,
      size: formData.size,
      dimensions: formData.dimensions,
      url: formData.url,
    });

    triggerToast(`Added media asset: ${formData.name}`);
    setShowModal(false);
    setFormData({
      name: "",
      category: "INSIGHT",
      size: "450 KB",
      dimensions: "1920x1080",
      url: "/images/hero.jpg",
    });
    loadData();
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete asset "${name}"?`)) {
      platformStore.deleteMediaVaultItem(id);
      triggerToast(`Removed asset ${name}`);
      loadData();
    }
  };

  const filtered = mediaList.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.url.toLowerCase().includes(searchTerm.toLowerCase());
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

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Register New Asset</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-card border border-border shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search assets by file name or path..."
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
              <option value="all">All Media</option>
              <option value="PROFILE">Partner Profiles</option>
              <option value="INSIGHT">Article &amp; Hero Banners</option>
              <option value="BADGE">Logos &amp; Crests</option>
              <option value="DOCUMENT">Statutory PDFs</option>
            </select>
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-card border border-border shadow-sm p-3.5 space-y-3 flex flex-col justify-between hover:shadow transition"
            >
              <div className="space-y-2">
                <div className="h-32 bg-slate-100 rounded flex items-center justify-center overflow-hidden border border-border relative">
                  {item.category === "DOCUMENT" ? (
                    <FileText className="w-10 h-10 text-slate-400" />
                  ) : item.category === "BADGE" ? (
                    <ImageIcon className="w-10 h-10 text-gold" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as any).style.display = "none";
                      }}
                    />
                  )}
                  <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider bg-black/60 text-white px-1.5 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>

                <div>
                  <div className="font-bold text-xs text-ink truncate" title={item.name}>
                    {item.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                    {item.size} &bull; {item.dimensions}
                  </div>
                  <div className="text-[10px] text-primary font-mono truncate mt-0.5">
                    {item.url}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border text-xs">
                <button
                  onClick={() => handleCopy(item.id, item.url)}
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-primary transition font-semibold"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-600 text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span className="text-[11px]">Copy URL</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  className="text-slate-400 hover:text-red-600 p-1 transition rounded"
                  title="Delete asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded border border-border text-xs">
              No media assets match your query.
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-card max-w-md w-full p-6 shadow-xl border border-border space-y-4 text-xs animate-fadeIn">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <h3 className="font-serif text-lg font-bold text-ink">Register Media Asset</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded text-slate-400 hover:text-ink"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Asset Name / Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. kolkata-chambers-library.jpg"
                    className="w-full p-2 border border-border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Asset Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full p-2 border border-border rounded bg-white"
                    >
                      <option value="INSIGHT">Insight / Hero Banner</option>
                      <option value="PROFILE">Partner Profile</option>
                      <option value="BADGE">Branding Crest / Logo</option>
                      <option value="DOCUMENT">Statutory Document</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Approx Size</label>
                    <input
                      type="text"
                      required
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      placeholder="e.g. 520 KB"
                      className="w-full p-2 border border-border rounded font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Asset URL / Public Path *</label>
                  <input
                    type="text"
                    required
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="e.g. /images/hero.jpg or https://cdn..."
                    className="w-full p-2 border border-border rounded font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Dimensions</label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    placeholder="e.g. 1920x1080 or Vector"
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
                    Register Asset
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
