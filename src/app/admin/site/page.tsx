"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Settings,
  MapPin,
  Phone,
  Mail,
  Landmark,
  Save,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Sparkles,
  Image as ImageIcon,
  Layout,
  ExternalLink,
  Shield,
  Eye,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { SiteConfig } from "@/lib/types";

export default function AdminSiteSettingsPage() {
  const [activeTab, setActiveTab] = useState<"hero" | "chambers" | "footer" | "preview">("hero");
  const [siteData, setSiteData] = useState<SiteConfig>(platformStore.getSiteConfig());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSiteData(platformStore.getSiteConfig());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    platformStore.updateSiteConfig(siteData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleFieldChange = (field: keyof SiteConfig, val: string) => {
    setSiteData((prev) => ({
      ...prev,
      [field]: val,
    }));
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
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono bg-navy-50 text-navy-800 border border-navy-200 px-2 py-0.5 rounded">
              CMS Engine &bull; Section 8.32
            </span>
          </div>
        </div>

        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-card">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-navy-700 font-bold">
              <Settings className="w-4 h-4 text-brass-500" />
              <span>Full Site Customization Studio</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink-950 mt-1">
              Homepage, Hero, Chambers &amp; Footer CMS
            </h1>
            <p className="text-xs text-ink-secondary mt-1">
              Customize any title, copy, hero background photo, contact channels, and footer roll text across the entire public platform.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-border rounded-btn text-xs font-semibold hover:bg-ivory-50 text-navy-700 transition"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-brass-500" />
            </Link>
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-5 py-2 bg-navy-700 hover:bg-blue-600 text-white text-xs font-bold rounded-btn transition shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saved ? "Saved & Live!" : "Save All Changes"}</span>
            </button>
          </div>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-btn text-xs flex items-center gap-2 shadow-sm animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">
              Changes successfully saved! The homepage, hero section, contact addresses, and footer have been updated live.
            </span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-border bg-white rounded-t-card px-4 pt-2 gap-2 text-xs font-medium">
          <button
            onClick={() => setActiveTab("hero")}
            className={`pb-3 px-3 border-b-2 transition flex items-center gap-2 ${
              activeTab === "hero"
                ? "border-navy-700 text-navy-700 font-bold"
                : "border-transparent text-ink-secondary hover:text-ink"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-brass-500" />
            <span>Hero &amp; Homepage Branding</span>
          </button>

          <button
            onClick={() => setActiveTab("chambers")}
            className={`pb-3 px-3 border-b-2 transition flex items-center gap-2 ${
              activeTab === "chambers"
                ? "border-navy-700 text-navy-700 font-bold"
                : "border-transparent text-ink-secondary hover:text-ink"
            }`}
          >
            <Landmark className="w-3.5 h-3.5 text-navy-700" />
            <span>Chambers &amp; Contact Desk</span>
          </button>

          <button
            onClick={() => setActiveTab("footer")}
            className={`pb-3 px-3 border-b-2 transition flex items-center gap-2 ${
              activeTab === "footer"
                ? "border-navy-700 text-navy-700 font-bold"
                : "border-transparent text-ink-secondary hover:text-ink"
            }`}
          >
            <Layout className="w-3.5 h-3.5 text-navy-700" />
            <span>Footer &amp; Disclaimers</span>
          </button>

          <button
            onClick={() => setActiveTab("preview")}
            className={`pb-3 px-3 border-b-2 transition flex items-center gap-2 ${
              activeTab === "preview"
                ? "border-navy-700 text-navy-700 font-bold"
                : "border-transparent text-ink-secondary hover:text-ink"
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-brass-500" />
            <span>Live Hero Preview</span>
          </button>
        </div>

        {/* Tab Contents */}
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-b-card border-x border-b border-border shadow-card space-y-6 text-xs">
          
          {/* TAB 1: HERO & HOMEPAGE BRANDING */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-base font-bold text-ink-950 pb-2 border-b border-border flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brass-500" />
                  <span>Hero Section Copy &amp; Imagery</span>
                </h3>
                <p className="text-[11px] text-ink-secondary mt-1">
                  Adjust the primary hero headline, sub-headline, descriptive copy, and background scene.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-ink-950 block mb-1">Hero Primary Headline (Line 1)</label>
                  <input
                    type="text"
                    value={siteData.heroHeadline}
                    onChange={(e) => handleFieldChange("heroHeadline", e.target.value)}
                    className="w-full p-2.5 border border-border rounded-btn focus:outline-none focus:border-navy-700 font-serif font-bold text-sm"
                  />
                  <span className="text-[10px] text-ink-muted">Default: &quot;Excellence in Law.&quot;</span>
                </div>

                <div>
                  <label className="font-bold text-ink-950 block mb-1">Hero Sub-Headline (Line 2 - Italic)</label>
                  <input
                    type="text"
                    value={siteData.heroSubheadline}
                    onChange={(e) => handleFieldChange("heroSubheadline", e.target.value)}
                    className="w-full p-2.5 border border-border rounded-btn focus:outline-none focus:border-navy-700 font-serif italic text-sm text-brass-600"
                  />
                  <span className="text-[10px] text-ink-muted">Default: &quot;Integrity in Practice.&quot;</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-ink-950 block mb-1">Hero Paragraph Description</label>
                <textarea
                  rows={3}
                  value={siteData.heroDescription}
                  onChange={(e) => handleFieldChange("heroDescription", e.target.value)}
                  className="w-full p-2.5 border border-border rounded-btn focus:outline-none focus:border-navy-700 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-ink-950 block mb-1">Hero Background Image Path</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={siteData.heroBgImage}
                      onChange={(e) => handleFieldChange("heroBgImage", e.target.value)}
                      className="flex-1 p-2.5 border border-border rounded-btn font-mono text-[11px]"
                    />
                    <select
                      onChange={(e) => handleFieldChange("heroBgImage", e.target.value)}
                      className="p-2 border border-border rounded-btn bg-ivory-50 text-[11px]"
                    >
                      <option value="">Presets</option>
                      <option value="/images/hero.jpg">Chambers Hero (hero.jpg)</option>
                      <option value="/images/posh.png">POSH Session (posh.png)</option>
                    </select>
                  </div>
                  <span className="text-[10px] text-ink-muted">Path in public folder or media vault.</span>
                </div>

                <div>
                  <label className="font-bold text-ink-950 block mb-1">Arch Monogram Title &amp; Location</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Title"
                      value={siteData.heroArchTitle}
                      onChange={(e) => handleFieldChange("heroArchTitle", e.target.value)}
                      className="p-2.5 border border-border rounded-btn"
                    />
                    <input
                      type="text"
                      placeholder="Subtitle"
                      value={siteData.heroArchSubtitle}
                      onChange={(e) => handleFieldChange("heroArchSubtitle", e.target.value)}
                      className="p-2.5 border border-border rounded-btn text-[11px]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="font-bold text-ink-950 block mb-1">Primary CTA Button</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Label"
                      value={siteData.heroPrimaryCtaText}
                      onChange={(e) => handleFieldChange("heroPrimaryCtaText", e.target.value)}
                      className="p-2.5 border border-border rounded-btn"
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      value={siteData.heroPrimaryCtaLink}
                      onChange={(e) => handleFieldChange("heroPrimaryCtaLink", e.target.value)}
                      className="p-2.5 border border-border rounded-btn font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-ink-950 block mb-1">Secondary CTA Button</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Label"
                      value={siteData.heroSecondaryCtaText}
                      onChange={(e) => handleFieldChange("heroSecondaryCtaText", e.target.value)}
                      className="p-2.5 border border-border rounded-btn"
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      value={siteData.heroSecondaryCtaLink}
                      onChange={(e) => handleFieldChange("heroSecondaryCtaLink", e.target.value)}
                      className="p-2.5 border border-border rounded-btn font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>

              {/* Principle Badges */}
              <div className="space-y-3 pt-3 border-t border-border">
                <h4 className="font-bold text-ink-950 text-xs">Three Core Chambers Principles (Arch Bottom Badges)</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-ivory-50 rounded-card border border-border space-y-2">
                    <input
                      type="text"
                      placeholder="Badge 1 Title"
                      value={siteData.heroBadge1Title}
                      onChange={(e) => handleFieldChange("heroBadge1Title", e.target.value)}
                      className="w-full p-1.5 border border-border rounded font-bold"
                    />
                    <textarea
                      rows={2}
                      placeholder="Description"
                      value={siteData.heroBadge1Desc}
                      onChange={(e) => handleFieldChange("heroBadge1Desc", e.target.value)}
                      className="w-full p-1.5 border border-border rounded text-[11px]"
                    />
                  </div>

                  <div className="p-3 bg-ivory-50 rounded-card border border-border space-y-2">
                    <input
                      type="text"
                      placeholder="Badge 2 Title"
                      value={siteData.heroBadge2Title}
                      onChange={(e) => handleFieldChange("heroBadge2Title", e.target.value)}
                      className="w-full p-1.5 border border-border rounded font-bold"
                    />
                    <textarea
                      rows={2}
                      placeholder="Description"
                      value={siteData.heroBadge2Desc}
                      onChange={(e) => handleFieldChange("heroBadge2Desc", e.target.value)}
                      className="w-full p-1.5 border border-border rounded text-[11px]"
                    />
                  </div>

                  <div className="p-3 bg-ivory-50 rounded-card border border-border space-y-2">
                    <input
                      type="text"
                      placeholder="Badge 3 Title"
                      value={siteData.heroBadge3Title}
                      onChange={(e) => handleFieldChange("heroBadge3Title", e.target.value)}
                      className="w-full p-1.5 border border-border rounded font-bold"
                    />
                    <textarea
                      rows={2}
                      placeholder="Description"
                      value={siteData.heroBadge3Desc}
                      onChange={(e) => handleFieldChange("heroBadge3Desc", e.target.value)}
                      className="w-full p-1.5 border border-border rounded text-[11px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CHAMBERS & CONTACT DESK */}
          {activeTab === "chambers" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-base font-bold text-ink-950 pb-2 border-b border-border flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-navy-700" />
                  <span>Physical Chambers Address &amp; Communication Desks</span>
                </h3>
                <p className="text-[11px] text-ink-secondary mt-1">
                  Manage the official chambers physical location, verified emails, phone lines, and operating schedule.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-ink-950 block mb-1">Chambers Address Line 1</label>
                  <input
                    type="text"
                    value={siteData.addressLine1}
                    onChange={(e) => handleFieldChange("addressLine1", e.target.value)}
                    className="w-full p-2.5 border border-border rounded-btn"
                  />
                </div>

                <div>
                  <label className="font-bold text-ink-950 block mb-1">Address Line 2 (District)</label>
                  <input
                    type="text"
                    value={siteData.addressLine2}
                    onChange={(e) => handleFieldChange("addressLine2", e.target.value)}
                    className="w-full p-2.5 border border-border rounded-btn"
                  />
                </div>

                <div>
                  <label className="font-bold text-ink-950 block mb-1">City &amp; State</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={siteData.city}
                      onChange={(e) => handleFieldChange("city", e.target.value)}
                      className="p-2.5 border border-border rounded-btn"
                    />
                    <input
                      type="text"
                      value={siteData.state}
                      onChange={(e) => handleFieldChange("state", e.target.value)}
                      className="p-2.5 border border-border rounded-btn"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-ink-950 block mb-1">Postal Code (PIN)</label>
                  <input
                    type="text"
                    value={siteData.postalCode}
                    onChange={(e) => handleFieldChange("postalCode", e.target.value)}
                    className="w-full p-2.5 border border-border rounded-btn font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="font-bold text-ink-950 block mb-1">Primary Inquiries Email</label>
                  <input
                    type="email"
                    value={siteData.primaryEmail}
                    onChange={(e) => handleFieldChange("primaryEmail", e.target.value)}
                    className="w-full p-2.5 border border-border rounded-btn"
                  />
                </div>

                <div>
                  <label className="font-bold text-ink-950 block mb-1">POSH Redressal Desk Email</label>
                  <input
                    type="email"
                    value={siteData.poshEmail}
                    onChange={(e) => handleFieldChange("poshEmail", e.target.value)}
                    className="w-full p-2.5 border border-border rounded-btn"
                  />
                </div>

                <div>
                  <label className="font-bold text-ink-950 block mb-1">Reception Switchboard Phone</label>
                  <input
                    type="text"
                    value={siteData.receptionPhone}
                    onChange={(e) => handleFieldChange("receptionPhone", e.target.value)}
                    className="w-full p-2.5 border border-border rounded-btn font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-ink-950 block mb-1">Emergency POSH Helpline (24/7)</label>
                  <input
                    type="text"
                    value={siteData.emergencyPhone}
                    onChange={(e) => handleFieldChange("emergencyPhone", e.target.value)}
                    className="w-full p-2.5 border border-border rounded-btn font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="font-bold text-ink-950 block mb-1">Working &amp; Consultation Hours</label>
                  <input
                    type="text"
                    value={siteData.operatingHours}
                    onChange={(e) => handleFieldChange("operatingHours", e.target.value)}
                    className="w-full p-2.5 border border-border rounded-btn"
                  />
                </div>

                <div>
                  <label className="font-bold text-ink-950 block mb-1">Google Maps Query Parameter</label>
                  <input
                    type="text"
                    value={siteData.googleMapsQuery}
                    onChange={(e) => handleFieldChange("googleMapsQuery", e.target.value)}
                    className="w-full p-2.5 border border-border rounded-btn font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-ink-950 block mb-1">Court Vacation / Emergency Notice</label>
                <textarea
                  rows={2}
                  value={siteData.courtVacationNotice}
                  onChange={(e) => handleFieldChange("courtVacationNotice", e.target.value)}
                  className="w-full p-2.5 border border-border rounded-btn leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 3: FOOTER & DISCLAIMERS */}
          {activeTab === "footer" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-base font-bold text-ink-950 pb-2 border-b border-border flex items-center gap-2">
                  <Layout className="w-4 h-4 text-navy-700" />
                  <span>Footer Kinetic Roll Text &amp; Statutory Disclaimer</span>
                </h3>
                <p className="text-[11px] text-ink-secondary mt-1">
                  Configure the scrolling roll-text ticker and the mandatory Bar Council of India disclaimer.
                </p>
              </div>

              <div>
                <label className="font-bold text-ink-950 block mb-1">Footer Kinetic Roll Text Ticker</label>
                <input
                  type="text"
                  value={siteData.footerRollText}
                  onChange={(e) => handleFieldChange("footerRollText", e.target.value)}
                  className="w-full p-2.5 border border-border rounded-btn font-mono text-xs"
                />
                <span className="text-[10px] text-ink-muted">
                  Displays in kinetic continuous roll across the bottom drawer footer.
                </span>
              </div>

              <div>
                <label className="font-bold text-ink-950 block mb-1">
                  Bar Council of India Rule 36 Mandatory Disclaimer
                </label>
                <textarea
                  rows={4}
                  value={siteData.disclaimer}
                  onChange={(e) => handleFieldChange("disclaimer", e.target.value)}
                  className="w-full p-2.5 border border-border rounded-btn leading-relaxed font-sans text-xs"
                />
                <span className="text-[10px] text-status-warning font-semibold">
                  Required by Bar Council regulations on every page footer.
                </span>
              </div>
            </div>
          )}

          {/* TAB 4: LIVE PREVIEW */}
          {activeTab === "preview" && (
            <div className="space-y-4">
              <div className="p-4 bg-navy-900 text-white rounded-card border border-navy-800 space-y-4">
                <div className="text-[10px] uppercase font-bold tracking-widest text-brass-400">
                  Real-Time Hero Preview
                </div>
                <div className="space-y-2">
                  <h2 className="font-serif text-2xl font-bold text-white">
                    {siteData.heroHeadline}{" "}
                    <span className="italic font-normal text-brass-300 block">
                      {siteData.heroSubheadline}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                    {siteData.heroDescription}
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <span className="px-3 py-1.5 bg-brass-500 text-ink-950 text-xs font-semibold rounded">
                    {siteData.heroPrimaryCtaText} &rarr;
                  </span>
                  <span className="px-3 py-1.5 border border-brass-500/50 text-brass-300 text-xs rounded">
                    {siteData.heroSecondaryCtaText} &rarr;
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-navy-800 text-[10px]">
                  <div className="p-2 rounded bg-navy-950/60 border border-brass-500/20">
                    <div className="font-bold text-white">{siteData.heroBadge1Title}</div>
                    <div className="text-slate-400 line-clamp-1">{siteData.heroBadge1Desc}</div>
                  </div>
                  <div className="p-2 rounded bg-navy-950/60 border border-brass-500/20">
                    <div className="font-bold text-white">{siteData.heroBadge2Title}</div>
                    <div className="text-slate-400 line-clamp-1">{siteData.heroBadge2Desc}</div>
                  </div>
                  <div className="p-2 rounded bg-navy-950/60 border border-brass-500/20">
                    <div className="font-bold text-white">{siteData.heroBadge3Title}</div>
                    <div className="text-slate-400 line-clamp-1">{siteData.heroBadge3Desc}</div>
                  </div>
                </div>
              </div>

              <div className="text-center text-[11px] text-ink-secondary">
                Click &quot;Save All Changes&quot; to publish these changes immediately to the live site.
              </div>
            </div>
          )}

          {/* Form Action Footer */}
          <div className="flex justify-between items-center pt-5 border-t border-border">
            <span className="text-[11px] text-ink-secondary">
              Last saved: {new Date(siteData.updatedAt || Date.now()).toLocaleString()}
            </span>
            <button
              type="submit"
              className="px-6 py-2.5 bg-navy-700 hover:bg-blue-600 text-white font-bold rounded-btn flex items-center gap-2 shadow-sm transition"
            >
              <Save className="w-4 h-4" />
              <span>{saved ? "Saved & Live!" : "Save All Changes"}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
