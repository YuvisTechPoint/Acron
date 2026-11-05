"use client";

import React, { useState } from "react";
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

interface RedirectItem {
  id: string;
  sourcePath: string;
  targetPath: string;
  statusCode: 301 | 302;
  hits: number;
}

const INITIAL_REDIRECTS: RedirectItem[] = [
  { id: "RED-1", sourcePath: "/posh-kolkata", targetPath: "/posh", statusCode: 301, hits: 342 },
  { id: "RED-2", sourcePath: "/legal-faq", targetPath: "/qa", statusCode: 301, hits: 189 },
  { id: "RED-3", sourcePath: "/attorneys", targetPath: "/about", statusCode: 301, hits: 94 },
  { id: "RED-4", sourcePath: "/posh-annual-report", targetPath: "/posh/org", statusCode: 301, hits: 275 }
];

export default function AdminSeoPage() {
  const [redirects, setRedirects] = useState<RedirectItem[]>(INITIAL_REDIRECTS);
  const [newSource, setNewSource] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [saved, setSaved] = useState(false);

  const handleAddRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSource || !newTarget) return;
    const item: RedirectItem = {
      id: `RED-${redirects.length + 1}`,
      sourcePath: newSource.startsWith("/") ? newSource : `/${newSource}`,
      targetPath: newTarget.startsWith("/") ? newTarget : `/${newTarget}`,
      statusCode: 301,
      hits: 0
    };
    setRedirects([...redirects, item]);
    setNewSource("");
    setNewTarget("");
  };

  const handleDelete = (id: string) => {
    setRedirects(redirects.filter((r) => r.id !== id));
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
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saved ? "Saved to Edge!" : "Save Defaults"}</span>
          </button>
        </div>

        {/* SEO Metadata Form */}
        <div className="bg-white p-6 rounded-card border border-border shadow-sm space-y-4 text-xs">
          <h2 className="font-bold text-sm text-ink border-b pb-2 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-primary" />
            <span>Default Meta Tags &amp; OpenGraph Social Share</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Site Title Template</label>
              <input
                type="text"
                defaultValue="%s | Acorn Legal Consultants - Kolkata"
                className="w-full p-2.5 border border-border rounded"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Canonical Base URL</label>
              <input
                type="text"
                defaultValue="https://acornlegal.in"
                className="w-full p-2.5 border border-border rounded"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Default Meta Description</label>
            <textarea
              rows={2}
              defaultValue="Acorn Legal Consultants is a premier legal consultancy in Kolkata specializing in corporate law, dispute resolution, and POSH Act 2013 statutory compliance."
              className="w-full p-2.5 border border-border rounded"
            />
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-slate-600 text-[11px] leading-relaxed">
            <strong>POSH Page Safeguard:</strong> All <code>/posh/*</code> case intake and inquiry portals automatically inject <code>&lt;meta name=&quot;robots&quot; content=&quot;noindex, nofollow, noarchive&quot;&gt;</code> to protect user privacy.
          </div>
        </div>

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
              className="sm:col-span-5 p-2 border border-border rounded bg-white"
            />
            <input
              type="text"
              required
              value={newTarget}
              onChange={(e) => setNewTarget(e.target.value)}
              placeholder="Destination (e.g. /new-page)"
              className="sm:col-span-5 p-2 border border-border rounded bg-white"
            />
            <button
              type="submit"
              className="sm:col-span-2 px-3 py-2 bg-primary hover:bg-primary-light text-white font-bold rounded flex items-center justify-center gap-1 shadow"
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
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Traffic Hits</th>
                  <th className="py-2.5 px-3 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {redirects.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-3 font-mono text-primary font-medium">{r.sourcePath}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-700">{r.targetPath}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 font-mono text-[10px] rounded font-bold">
                        301 Permanent
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 font-mono">{r.hits} requests</td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="text-slate-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

