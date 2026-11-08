"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  Share2,
  ArrowRight,
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  CheckCircle2,
  Code
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { SeoSettings, SeoRedirectItem } from "@/lib/types";

export default function AdminSeoPage() {
  const [seo, setSeo] = useState<SeoSettings>({
    defaultTitle: "Acorn Legal Consultants | Premier Kolkata Law Firm & POSH Advisory",
    titleTemplate: "%s | Acorn Legal Consultants",
    defaultDescription: "Premier legal consultancy in Kolkata specialising in corporate law, commercial litigation, employment law, and POSH Act statutory compliance.",
    canonicalBase: "https://acornlegal.in",
    ogImageUrl: "/images/hero.jpg",
    twitterHandle: "@AcornLegalKolkata",
    robotsIndex: true,
    robotsFollow: true,
    updatedAt: new Date().toISOString(),
  });
  const [redirects, setRedirects] = useState<SeoRedirectItem[]>([]);
  const [newSource, setNewSource] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const loadData = () => {
    setSeo(platformStore.getSeoSettings());
    setRedirects(platformStore.getSeoRedirects());
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    platformStore.updateSeoSettings(seo);
    triggerToast("Saved global SEO defaults to edge distribution!");
  };

  const handleAddRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSource || !newTarget) return;

    const sourcePath = newSource.startsWith("/") ? newSource : `/${newSource}`;
    const targetPath = newTarget.startsWith("/") ? newTarget : `/${newTarget}`;

    platformStore.addSeoRedirect({
      sourcePath,
      targetPath,
      statusCode: 301,
      hits: 0,
    });

    triggerToast(`Added 301 redirect: ${sourcePath} -> ${targetPath}`);
    setNewSource("");
    setNewTarget("");
    loadData();
  };

  const handleDeleteRedirect = (id: string, source: string) => {
    if (confirm(`Delete redirect rule for ${source}?`)) {
      platformStore.deleteSeoRedirect(id);
      triggerToast(`Removed redirect rule ${id}`);
      loadData();
    }
  };

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
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
            PRD Screen Ref: A-11
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
              <Globe className="w-4 h-4 text-primary" />
              <span>Search Engine Optimization &bull; HTTP Rules</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink mt-1">
              Global SEO Defaults &amp; 301 Redirect Rules
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Configure OpenGraph tags, canonical domains, sitemap generation, and edge 301 URL redirects.
            </p>
          </div>

          <button
            onClick={handleSaveSeo}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save SEO Defaults</span>
          </button>
        </div>

        {/* SEO Metadata Form */}
        <form onSubmit={handleSaveSeo} className="bg-white p-6 rounded-card border border-border shadow-sm space-y-4 text-xs">
          <h2 className="font-bold text-sm text-ink border-b pb-2 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-primary" />
            <span>Default Meta Tags &amp; OpenGraph Social Share</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Site Title Template</label>
              <input
                type="text"
                value={seo.titleTemplate}
                onChange={(e) => setSeo({ ...seo, titleTemplate: e.target.value })}
                className="w-full p-2.5 border border-border rounded font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Canonical Base URL</label>
              <input
                type="text"
                value={seo.canonicalBase}
                onChange={(e) => setSeo({ ...seo, canonicalBase: e.target.value })}
                className="w-full p-2.5 border border-border rounded font-mono"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Default Meta Description</label>
            <textarea
              rows={2}
              value={seo.defaultDescription}
              onChange={(e) => setSeo({ ...seo, defaultDescription: e.target.value })}
              className="w-full p-2.5 border border-border rounded"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Default OG Image URL</label>
              <input
                type="text"
                value={seo.ogImageUrl}
                onChange={(e) => setSeo({ ...seo, ogImageUrl: e.target.value })}
                className="w-full p-2.5 border border-border rounded font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Twitter / X Handle</label>
              <input
                type="text"
                value={seo.twitterHandle}
                onChange={(e) => setSeo({ ...seo, twitterHandle: e.target.value })}
                className="w-full p-2.5 border border-border rounded font-mono"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-slate-600 text-[11px] leading-relaxed">
            <strong>POSH Page Safeguard (PRD Rule SEC-09):</strong> All <code>/posh/*</code> case intake and inquiry portals automatically inject <code>&lt;meta name=&quot;robots&quot; content=&quot;noindex, nofollow, noarchive&quot;&gt;</code> to protect citizen confidentiality under Section 16 of the POSH Act.
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded font-bold hover:bg-primary-light transition text-xs shadow"
            >
              Update SEO Parameters
            </button>
          </div>
        </form>

        {/* 301 Redirect Table */}
        <div className="bg-white p-6 rounded-card border border-border shadow-sm space-y-4 text-xs">
          <h2 className="font-bold text-sm text-ink border-b pb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-primary" />
              <span>Edge 301 Permanent Redirects</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">{redirects.length} rules active</span>
          </h2>

          <form onSubmit={handleAddRedirect} className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-slate-50 p-3 rounded border border-border">
            <input
              type="text"
              required
              value={newSource}
              onChange={(e) => setNewSource(e.target.value)}
              placeholder="Source path (e.g. /old-page)"
              className="sm:col-span-5 p-2 border border-border rounded bg-white font-mono"
            />
            <input
              type="text"
              required
              value={newTarget}
              onChange={(e) => setNewTarget(e.target.value)}
              placeholder="Destination (e.g. /new-page)"
              className="sm:col-span-5 p-2 border border-border rounded bg-white font-mono"
            />
            <button
              type="submit"
              className="sm:col-span-2 px-3 py-2 bg-primary hover:bg-primary-light text-white font-bold rounded flex items-center justify-center gap-1 shadow transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </form>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-100/75 text-slate-600 font-semibold border-b border-border uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">From Path</th>
                  <th className="py-2.5 px-3">Destination</th>
                  <th className="py-2.5 px-3">Status Code</th>
                  <th className="py-2.5 px-3">Traffic Hits</th>
                  <th className="py-2.5 px-3 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {redirects.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-2.5 px-3 font-mono text-primary font-medium">{r.sourcePath}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-700">{r.targetPath}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {r.statusCode} Permanent
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">
                      {r.hits || 0} hits
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => handleDeleteRedirect(r.id, r.sourcePath)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-slate-100 transition"
                        title="Delete rule"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {redirects.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-500">
                      No custom 301 redirect rules configured.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
