"use client";

import React, { useState } from "react";
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
  Sliders
} from "lucide-react";

interface PageSection {
  id: string;
  name: string;
  internalRef: string;
  heading: string;
  isEnabled: boolean;
  order: number;
}

const INITIAL_SECTIONS: PageSection[] = [
  { id: "SEC-1", name: "Chamber Hero & Heritage Banner", internalRef: "hero", heading: "Excellence in Law. Integrity in Practice.", isEnabled: true, order: 1 },
  { id: "SEC-2", name: "Core Practice Areas", internalRef: "practice_areas", heading: "Authoritative Legal Practice in Kolkata & Eastern India", isEnabled: true, order: 2 },
  { id: "SEC-3", name: "POSH Practice Group Spotlight", internalRef: "posh_spotlight", heading: "Statutory POSH Compliance & External IC Representation", isEnabled: true, order: 3 },
  { id: "SEC-4", name: "Partner Profiles & Leadership", internalRef: "leadership", heading: "Chamber Leadership & Counsel", isEnabled: true, order: 4 },
  { id: "SEC-5", name: "Interactive Legal Concierge & Q&A", internalRef: "qa_preview", heading: "Recent Clarifications & Statutory Knowledge Base", isEnabled: true, order: 5 },
  { id: "SEC-6", name: "Structured Consultation Intake", internalRef: "intake_form", heading: "Request Formal Legal Consultation", isEnabled: true, order: 6 },
  { id: "SEC-7", name: "Statutory Disclaimers & Bar Council Notice", internalRef: "disclaimer", heading: "Bar Council of India Rule 36 Mandatory Notice", isEnabled: true, order: 7 }
];

export default function AdminPageLayoutManager() {
  const [sections, setSections] = useState<PageSection[]>(INITIAL_SECTIONS);
  const [saved, setSaved] = useState(false);

  const moveSection = (index: number, direction: "UP" | "DOWN") => {
    const targetIndex = direction === "UP" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    const reordered = [...sections];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;
    setSections(reordered);
    setSaved(false);
  };

  const toggleVisibility = (id: string) => {
    setSections(
      sections.map((s) => (s.id === id ? { ...s, isEnabled: !s.isEnabled } : s))
    );
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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
            PRD Screen Ref: A-08
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
              <Layout className="w-4 h-4 text-primary" />
              <span>CMS &bull; Homepage Section Composer</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink mt-1">
              Homepage Layout &amp; Block Hierarchy
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Reorder homepage sections, toggle display states, and manage section headline text without code redeployment.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saved ? "Changes Published!" : "Save Layout"}</span>
          </button>
        </div>

        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Homepage visual section order updated successfully across all edge CDN nodes.</span>
          </div>
        )}

        {/* Section List */}
        <div className="space-y-3">
          {sections.map((sec, idx) => (
            <div
              key={sec.id}
              className={`bg-white p-4 rounded-card border transition flex items-center justify-between gap-4 shadow-sm ${
                !sec.isEnabled ? "opacity-60 bg-slate-50 border-dashed" : "border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-mono font-bold text-slate-600">
                  {idx + 1}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-ink">{sec.name}</span>
                    <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded">
                      #{sec.internalRef}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 italic mt-0.5">&ldquo;{sec.heading}&rdquo;</div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleVisibility(sec.id)}
                  className={`p-1.5 rounded text-xs font-medium border flex items-center gap-1 ${
                    sec.isEnabled
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-slate-100 text-slate-500 border-slate-200"
                  }`}
                  title={sec.isEnabled ? "Section visible on live site" : "Section hidden"}
                >
                  {sec.isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span className="text-[10px] hidden sm:inline">{sec.isEnabled ? "Visible" : "Hidden"}</span>
                </button>

                <div className="flex items-center border border-border rounded overflow-hidden">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveSection(idx, "UP")}
                    className="p-1.5 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    title="Move up"
                  >
                    <MoveUp className="w-3.5 h-3.5 text-slate-600" />
                  </button>
                  <button
                    disabled={idx === sections.length - 1}
                    onClick={() => moveSection(idx, "DOWN")}
                    className="p-1.5 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition border-l border-border"
                    title="Move down"
                  >
                    <MoveDown className="w-3.5 h-3.5 text-slate-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

