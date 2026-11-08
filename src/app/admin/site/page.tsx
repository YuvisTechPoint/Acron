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
  GitBranch,
  Award,
  Users,
  Plus,
  Trash2,
  Edit2,
  X,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { SiteConfig, EngagementStep, ChambersPrinciple, TeamMemberItem } from "@/lib/types";

export default function AdminSiteSettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "hero" | "pathway" | "principles" | "team" | "chambers" | "footer" | "preview"
  >("hero");
  const [siteData, setSiteData] = useState<SiteConfig>(platformStore.getSiteConfig());
  const [teamMembers, setTeamMembers] = useState<TeamMemberItem[]>([]);
  const [saved, setSaved] = useState(false);

  // Team member modal state
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMemberItem | null>(null);
  const [memberFormData, setMemberFormData] = useState({
    name: "",
    role: "",
    title: "",
    focus: "",
    bio: "",
    avatarUrl: "",
    email: "",
    order: 1,
  });

  const loadData = () => {
    setSiteData(platformStore.getSiteConfig());
    setTeamMembers(platformStore.getTeamMembers());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    platformStore.updateSiteConfig(siteData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleFieldChange = (field: keyof SiteConfig, val: any) => {
    setSiteData((prev) => ({
      ...prev,
      [field]: val,
    }));
  };

  const handlePathwayStepChange = (index: number, field: keyof EngagementStep, val: string) => {
    const updated = [...(siteData.pathwaySteps || [])];
    if (updated[index]) {
      updated[index] = { ...updated[index], [field]: val };
      setSiteData((prev) => ({ ...prev, pathwaySteps: updated }));
    }
  };

  const handleAddPathwayStep = () => {
    const updated = [...(siteData.pathwaySteps || [])];
    const nextNum = (updated.length + 1).toString().padStart(2, "0");
    updated.push({
      num: nextNum,
      title: "New Protocol Step",
      desc: "Detailed description of the procedural action undertaken by chambers.",
    });
    setSiteData((prev) => ({ ...prev, pathwaySteps: updated }));
  };

  const handleDeletePathwayStep = (index: number) => {
    const updated = [...(siteData.pathwaySteps || [])];
    updated.splice(index, 1);
    setSiteData((prev) => ({ ...prev, pathwaySteps: updated }));
  };

  const handlePrincipleChange = (index: number, field: keyof ChambersPrinciple, val: string) => {
    const updated = [...(siteData.principles || [])];
    if (updated[index]) {
      updated[index] = { ...updated[index], [field]: val };
      setSiteData((prev) => ({ ...prev, principles: updated }));
    }
  };

  const handleAddPrinciple = () => {
    const updated = [...(siteData.principles || [])];
    updated.push({
      num: `Principle ${updated.length + 1}`,
      title: "New Core Principle",
      quote: "Authoritative quotation or canon of professional practice.",
      desc: "Practical operational standard followed in all client advisory.",
    });
    setSiteData((prev) => ({ ...prev, principles: updated }));
  };

  const handleDeletePrinciple = (index: number) => {
    const updated = [...(siteData.principles || [])];
    updated.splice(index, 1);
    setSiteData((prev) => ({ ...prev, principles: updated }));
  };

  // Team CRUD
  const openAddTeamModal = () => {
    setEditingMember(null);
    setMemberFormData({
      name: "",
      role: "",
      title: "Advocate & Legal Consultant",
      focus: "",
      bio: "",
      avatarUrl: "/brand/subhasish-profile.png",
      email: "",
      order: teamMembers.length + 1,
    });
    setShowTeamModal(true);
  };

  const openEditTeamModal = (m: TeamMemberItem) => {
    setEditingMember(m);
    setMemberFormData({
      name: m.name,
      role: m.role,
      title: m.title,
      focus: m.focus,
      bio: m.bio,
      avatarUrl: m.avatarUrl || "",
      email: m.email || "",
      order: m.order,
    });
    setShowTeamModal(true);
  };

  const handleSaveTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberFormData.name || !memberFormData.role) {
      alert("Name and Role are required.");
      return;
    }

    if (editingMember) {
      platformStore.updateTeamMember(editingMember.id, {
        name: memberFormData.name,
        role: memberFormData.role,
        title: memberFormData.title,
        focus: memberFormData.focus,
        bio: memberFormData.bio,
        avatarUrl: memberFormData.avatarUrl,
        email: memberFormData.email,
        order: Number(memberFormData.order) || 1,
      });
    } else {
      platformStore.addTeamMember({
        name: memberFormData.name,
        role: memberFormData.role,
        title: memberFormData.title,
        focus: memberFormData.focus,
        bio: memberFormData.bio,
        avatarUrl: memberFormData.avatarUrl,
        email: memberFormData.email,
        order: Number(memberFormData.order) || 1,
      });
    }

    setShowTeamModal(false);
    loadData();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDeleteTeamMember = (id: string, name: string) => {
    if (confirm(`Remove counsel profile for ${name}?`)) {
      platformStore.deleteTeamMember(id);
      loadData();
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
              Live Homepage &amp; Chambers Content CMS
            </h1>
            <p className="text-xs text-ink-secondary mt-1">
              End-to-end management for Hero imagery &amp; copy, Engagement Pathway, Chambers Philosophy, Counsel Directory, Contact Desk, and Kinetic Footer.
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
              Changes successfully saved! The homepage, pathway, principles, team profiles, and footer have been updated live.
            </span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-border bg-white rounded-t-card px-4 pt-2 gap-1 text-xs font-medium">
          <button
            onClick={() => setActiveTab("hero")}
            className={`pb-3 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === "hero"
                ? "border-navy-700 text-navy-700 font-bold"
                : "border-transparent text-ink-secondary hover:text-ink"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-brass-500" />
            <span>Hero &amp; Branding</span>
          </button>

          <button
            onClick={() => setActiveTab("pathway")}
            className={`pb-3 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === "pathway"
                ? "border-navy-700 text-navy-700 font-bold"
                : "border-transparent text-ink-secondary hover:text-ink"
            }`}
          >
            <GitBranch className="w-3.5 h-3.5 text-navy-700" />
            <span>Engagement Pathway</span>
          </button>

          <button
            onClick={() => setActiveTab("principles")}
            className={`pb-3 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === "principles"
                ? "border-navy-700 text-navy-700 font-bold"
                : "border-transparent text-ink-secondary hover:text-ink"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-navy-700" />
            <span>Chambers Principles</span>
          </button>

          <button
            onClick={() => setActiveTab("team")}
            className={`pb-3 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === "team"
                ? "border-navy-700 text-navy-700 font-bold"
                : "border-transparent text-ink-secondary hover:text-ink"
            }`}
          >
            <Users className="w-3.5 h-3.5 text-navy-700" />
            <span>Team &amp; Counsel</span>
          </button>

          <button
            onClick={() => setActiveTab("chambers")}
            className={`pb-3 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === "chambers"
                ? "border-navy-700 text-navy-700 font-bold"
                : "border-transparent text-ink-secondary hover:text-ink"
            }`}
          >
            <Landmark className="w-3.5 h-3.5 text-navy-700" />
            <span>Chambers &amp; Desk</span>
          </button>

          <button
            onClick={() => setActiveTab("footer")}
            className={`pb-3 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === "footer"
                ? "border-navy-700 text-navy-700 font-bold"
                : "border-transparent text-ink-secondary hover:text-ink"
            }`}
          >
            <Layout className="w-3.5 h-3.5 text-navy-700" />
            <span>Footer &amp; Disclaimer</span>
          </button>

          <button
            onClick={() => setActiveTab("preview")}
            className={`pb-3 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === "preview"
                ? "border-navy-700 text-navy-700 font-bold"
                : "border-transparent text-ink-secondary hover:text-ink"
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-brass-500" />
            <span>Live Preview</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="bg-white p-6 sm:p-8 rounded-b-card border-x border-b border-border shadow-card space-y-6 text-xs">
          
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
                <label className="font-bold text-ink-950 block mb-1">Hero Comprehensive Description</label>
                <textarea
                  rows={3}
                  value={siteData.heroDescription}
                  onChange={(e) => handleFieldChange("heroDescription", e.target.value)}
                  className="w-full p-2.5 border border-border rounded-btn focus:outline-none focus:border-navy-700 leading-relaxed font-sans"
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
                      className="w-full p-2.5 border border-border rounded-btn focus:outline-none focus:border-navy-700 font-mono text-[11px]"
                    />
                  </div>
                  <span className="text-[10px] text-ink-muted">
                    Active High-Res Hero: <code className="bg-ivory-200 px-1 rounded">/images/hero.jpg</code>
                  </span>
                </div>

                <div>
                  <label className="font-bold text-ink-950 block mb-1">Arch Insignia Title &amp; Subtitle</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Chambers of Acorn"
                      value={siteData.heroArchTitle}
                      onChange={(e) => handleFieldChange("heroArchTitle", e.target.value)}
                      className="p-2 border border-border rounded-btn font-serif font-bold text-xs"
                    />
                    <input
                      type="text"
                      placeholder="CAMAC STREET • KOLKATA"
                      value={siteData.heroArchSubtitle}
                      onChange={(e) => handleFieldChange("heroArchSubtitle", e.target.value)}
                      className="p-2 border border-border rounded-btn font-sans text-xs tracking-wider uppercase text-brass-600"
                    />
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-ivory-50 rounded border border-border space-y-2">
                  <span className="font-bold text-ink-950 block">Primary Action Button (Gold Brass)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-ink-secondary block">Label</label>
                      <input
                        type="text"
                        value={siteData.heroPrimaryCtaText}
                        onChange={(e) => handleFieldChange("heroPrimaryCtaText", e.target.value)}
                        className="w-full p-2 border border-border rounded-btn text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-ink-secondary block">Destination Route</label>
                      <input
                        type="text"
                        value={siteData.heroPrimaryCtaLink}
                        onChange={(e) => handleFieldChange("heroPrimaryCtaLink", e.target.value)}
                        className="w-full p-2 border border-border rounded-btn font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-ivory-50 rounded border border-border space-y-2">
                  <span className="font-bold text-ink-950 block">Secondary Action Button (Outline)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-ink-secondary block">Label</label>
                      <input
                        type="text"
                        value={siteData.heroSecondaryCtaText}
                        onChange={(e) => handleFieldChange("heroSecondaryCtaText", e.target.value)}
                        className="w-full p-2 border border-border rounded-btn text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-ink-secondary block">Destination Route</label>
                      <input
                        type="text"
                        value={siteData.heroSecondaryCtaLink}
                        onChange={(e) => handleFieldChange("heroSecondaryCtaLink", e.target.value)}
                        className="w-full p-2 border border-border rounded-btn font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Glass Badges */}
              <div className="space-y-3 pt-2">
                <span className="font-bold text-ink-950 block">Three Editorial Hero Badges</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 border border-border rounded bg-ivory-50 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-brass-700">Badge 1</span>
                    <input
                      type="text"
                      placeholder="Title"
                      value={siteData.heroBadge1Title}
                      onChange={(e) => handleFieldChange("heroBadge1Title", e.target.value)}
                      className="w-full p-2 border border-border rounded text-xs font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Subtitle"
                      value={siteData.heroBadge1Desc}
                      onChange={(e) => handleFieldChange("heroBadge1Desc", e.target.value)}
                      className="w-full p-2 border border-border rounded text-[11px] text-ink-secondary"
                    />
                  </div>

                  <div className="p-3 border border-border rounded bg-ivory-50 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-brass-700">Badge 2</span>
                    <input
                      type="text"
                      placeholder="Title"
                      value={siteData.heroBadge2Title}
                      onChange={(e) => handleFieldChange("heroBadge2Title", e.target.value)}
                      className="w-full p-2 border border-border rounded text-xs font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Subtitle"
                      value={siteData.heroBadge2Desc}
                      onChange={(e) => handleFieldChange("heroBadge2Desc", e.target.value)}
                      className="w-full p-2 border border-border rounded text-[11px] text-ink-secondary"
                    />
                  </div>

                  <div className="p-3 border border-border rounded bg-ivory-50 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-brass-700">Badge 3</span>
                    <input
                      type="text"
                      placeholder="Title"
                      value={siteData.heroBadge3Title}
                      onChange={(e) => handleFieldChange("heroBadge3Title", e.target.value)}
                      className="w-full p-2 border border-border rounded text-xs font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Subtitle"
                      value={siteData.heroBadge3Desc}
                      onChange={(e) => handleFieldChange("heroBadge3Desc", e.target.value)}
                      className="w-full p-2 border border-border rounded text-[11px] text-ink-secondary"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ENGAGEMENT PATHWAY ("HOW WE WORK") */}
          {activeTab === "pathway" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <div>
                  <h3 className="font-serif text-base font-bold text-ink-950 flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-brass-500" />
                    <span>Engagement Protocol &amp; Pathway (How We Work)</span>
                  </h3>
                  <p className="text-[11px] text-ink-secondary mt-1">
                    Manage the 5-step client onboarding and advisory pathway displayed on the homepage.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddPathwayStep}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy-700 text-white rounded-btn text-xs font-bold hover:bg-blue-600 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Step</span>
                </button>
              </div>

              <div className="space-y-4">
                {(siteData.pathwaySteps || []).map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-ivory-50 border border-border rounded-card flex flex-col md:flex-row gap-4 items-start"
                  >
                    <div className="w-20 shrink-0">
                      <label className="text-[10px] font-bold text-ink-muted block uppercase">Step Num</label>
                      <input
                        type="text"
                        value={step.num}
                        onChange={(e) => handlePathwayStepChange(idx, "num", e.target.value)}
                        className="w-full p-2 border border-border rounded font-serif font-bold text-center text-sm bg-white"
                      />
                    </div>

                    <div className="flex-1 space-y-2 w-full">
                      <div>
                        <label className="text-[10px] font-bold text-ink-muted block uppercase">Phase Title</label>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => handlePathwayStepChange(idx, "title", e.target.value)}
                          className="w-full p-2 border border-border rounded font-bold text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-ink-muted block uppercase">Procedural Description</label>
                        <textarea
                          rows={2}
                          value={step.desc}
                          onChange={(e) => handlePathwayStepChange(idx, "desc", e.target.value)}
                          className="w-full p-2 border border-border rounded text-xs leading-relaxed bg-white"
                        />
                      </div>
                    </div>

                    <div className="self-end md:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => handleDeletePathwayStep(idx)}
                        className="p-2 border border-border rounded text-red-600 hover:bg-red-50 transition"
                        title="Delete Step"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CHAMBERS PRINCIPLES */}
          {activeTab === "principles" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <div>
                  <h3 className="font-serif text-base font-bold text-ink-950 flex items-center gap-2">
                    <Award className="w-4 h-4 text-brass-500" />
                    <span>Chambers Philosophy &amp; Core Principles</span>
                  </h3>
                  <p className="text-[11px] text-ink-secondary mt-1">
                    Manage the foundational ethical principles of Chambers presented on the homepage and about page.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddPrinciple}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy-700 text-white rounded-btn text-xs font-bold hover:bg-blue-600 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Principle</span>
                </button>
              </div>

              <div className="space-y-4">
                {(siteData.principles || []).map((prin, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-ivory-50 border border-border rounded-card space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={prin.num}
                          onChange={(e) => handlePrincipleChange(idx, "num", e.target.value)}
                          className="p-1.5 border border-border rounded text-xs font-semibold uppercase text-brass-700 w-32 bg-white"
                        />
                        <input
                          type="text"
                          value={prin.title}
                          placeholder="Principle Name (e.g. Integrity)"
                          onChange={(e) => handlePrincipleChange(idx, "title", e.target.value)}
                          className="p-1.5 border border-border rounded font-serif font-bold text-sm bg-white"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeletePrinciple(idx)}
                        className="p-1.5 border border-border rounded text-red-600 hover:bg-red-50 transition"
                        title="Delete Principle"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-ink-muted block uppercase mb-1">
                        Authoritative Guiding Quote
                      </label>
                      <input
                        type="text"
                        value={prin.quote}
                        onChange={(e) => handlePrincipleChange(idx, "quote", e.target.value)}
                        className="w-full p-2 border border-border rounded font-serif italic text-xs bg-white text-ink"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-ink-muted block uppercase mb-1">
                        Application &amp; Operational Reality
                      </label>
                      <textarea
                        rows={2}
                        value={prin.desc}
                        onChange={(e) => handlePrincipleChange(idx, "desc", e.target.value)}
                        className="w-full p-2 border border-border rounded text-xs leading-relaxed bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TEAM & COUNSEL PROFILES */}
          {activeTab === "team" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <div>
                  <h3 className="font-serif text-base font-bold text-ink-950 flex items-center gap-2">
                    <Users className="w-4 h-4 text-brass-500" />
                    <span>Counsel Directory &amp; Chambers Leadership</span>
                  </h3>
                  <p className="text-[11px] text-ink-secondary mt-1">
                    Manage partner profiles, external members, and practice leaders shown across the chambers about page.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openAddTeamModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy-700 text-white rounded-btn text-xs font-bold hover:bg-blue-600 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Counsel Profile</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="p-5 bg-white border border-border rounded-card shadow-sm hover:border-navy-300 transition flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono bg-navy-50 text-navy-800 border border-navy-200 px-2 py-0.5 rounded font-bold">
                          Order #{member.order} &bull; {member.role}
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditTeamModal(member)}
                            className="p-1.5 border border-border rounded hover:bg-navy-50 text-navy-700"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteTeamMember(member.id, member.name)}
                            className="p-1.5 border border-border rounded hover:bg-red-50 text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="font-serif text-lg font-bold text-ink-950">{member.name}</h4>
                      <p className="text-xs text-brass-700 font-medium">{member.title}</p>
                      <p className="text-[11px] text-ink-secondary leading-relaxed">{member.bio}</p>
                      
                      <div className="pt-2 border-t border-border text-[10px] text-ink-muted">
                        <span className="font-bold text-ink-secondary block">Statutory Focus:</span>
                        <span>{member.focus}</span>
                      </div>
                    </div>

                    <div className="text-[10px] text-ink-muted flex justify-between items-center pt-2 border-t border-border">
                      <span>{member.email || "chambers@acornlegal.in"}</span>
                      <span>Photo: {member.avatarUrl ? "Supplied" : "Placeholder"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CHAMBERS & CONTACT DESK */}
          {activeTab === "chambers" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-base font-bold text-ink-950 pb-2 border-b border-border flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-navy-700" />
                  <span>Physical Chambers, Reception &amp; Statutory Desks</span>
                </h3>
                <p className="text-[11px] text-ink-secondary mt-1">
                  Configure office physical address, verified reception channels, and emergency POSH contact.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-ink-950 block mb-1">Address Line 1</label>
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-ink-950 block mb-1">City</label>
                  <input
                    type="text"
                    value={siteData.city}
                    onChange={(e) => handleFieldChange("city", e.target.value)}
                    className="w-full p-2.5 border border-border rounded-btn"
                  />
                </div>

                <div>
                  <label className="font-bold text-ink-950 block mb-1">State</label>
                  <input
                    type="text"
                    value={siteData.state}
                    onChange={(e) => handleFieldChange("state", e.target.value)}
                    className="w-full p-2.5 border border-border rounded-btn"
                  />
                </div>

                <div>
                  <label className="font-bold text-ink-950 block mb-1">Postal Code</label>
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
                  <label className="font-bold text-ink-950 block mb-1">General Chambers Email</label>
                  <input
                    type="email"
                    value={siteData.primaryEmail}
                    onChange={(e) => handleFieldChange("primaryEmail", e.target.value)}
                    className="w-full p-2.5 border border-border rounded-btn font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-ink-950 block mb-1">Confidential POSH Redressal Desk Email</label>
                  <input
                    type="email"
                    value={siteData.poshEmail}
                    onChange={(e) => handleFieldChange("poshEmail", e.target.value)}
                    className="w-full p-2.5 border border-border rounded-btn font-mono text-navy-700 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-ink-950 block mb-1">Reception Landline Phone</label>
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

          {/* TAB 6: FOOTER & DISCLAIMERS */}
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

          {/* TAB 7: LIVE PREVIEW */}
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
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-navy-700 hover:bg-blue-600 text-white font-bold rounded-btn flex items-center gap-2 shadow-sm transition"
            >
              <Save className="w-4 h-4" />
              <span>{saved ? "Saved & Live!" : "Save All Changes"}</span>
            </button>
          </div>

        </div>

        {/* Modal for Team Member Add / Edit */}
        {showTeamModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-card border border-border shadow-raised max-w-xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-5 border-b border-border flex items-center justify-between bg-ivory-50 sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-navy-700" />
                  <h3 className="font-serif font-bold text-base text-ink-950">
                    {editingMember ? "Edit Counsel Profile" : "Add Counsel Profile"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTeamModal(false)}
                  className="p-1 hover:bg-border rounded text-ink-secondary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveTeamMember} className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-ink-950 block mb-1">
                      Full Legal Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adv. Subhasish Mukherjee"
                      value={memberFormData.name}
                      onChange={(e) => setMemberFormData({ ...memberFormData, name: e.target.value })}
                      className="w-full p-2.5 border border-border rounded-btn focus:outline-none focus:border-navy-700 font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-ink-950 block mb-1">
                      Chambers Role <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senior Partner & Practice Lead"
                      value={memberFormData.role}
                      onChange={(e) => setMemberFormData({ ...memberFormData, role: e.target.value })}
                      className="w-full p-2.5 border border-border rounded-btn focus:outline-none focus:border-navy-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-ink-950 block mb-1">Professional Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Advocate & Legal Consultant"
                      value={memberFormData.title}
                      onChange={(e) => setMemberFormData({ ...memberFormData, title: e.target.value })}
                      className="w-full p-2.5 border border-border rounded-btn"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-ink-950 block mb-1">Display Order</label>
                    <input
                      type="number"
                      min={1}
                      value={memberFormData.order}
                      onChange={(e) => setMemberFormData({ ...memberFormData, order: parseInt(e.target.value) || 1 })}
                      className="w-full p-2.5 border border-border rounded-btn"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-ink-950 block mb-1">Practice &amp; Statutory Focus</label>
                  <input
                    type="text"
                    placeholder="e.g. Commercial Litigation • Arbitration • Corporate Structuring"
                    value={memberFormData.focus}
                    onChange={(e) => setMemberFormData({ ...memberFormData, focus: e.target.value })}
                    className="w-full p-2.5 border border-border rounded-btn"
                  />
                </div>

                <div>
                  <label className="font-bold text-ink-950 block mb-1">Professional Bio &amp; Bar Standing</label>
                  <textarea
                    rows={3}
                    placeholder="Brief professional profile describing years of practice, High Court appearance credentials..."
                    value={memberFormData.bio}
                    onChange={(e) => setMemberFormData({ ...memberFormData, bio: e.target.value })}
                    className="w-full p-2.5 border border-border rounded-btn leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-ink-950 block mb-1">Direct Chambers Email</label>
                    <input
                      type="email"
                      placeholder="counsel@acornlegal.in"
                      value={memberFormData.email}
                      onChange={(e) => setMemberFormData({ ...memberFormData, email: e.target.value })}
                      className="w-full p-2.5 border border-border rounded-btn font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-ink-950 block mb-1">Profile Photo Path</label>
                    <input
                      type="text"
                      placeholder="/brand/subhasish-profile.png"
                      value={memberFormData.avatarUrl}
                      onChange={(e) => setMemberFormData({ ...memberFormData, avatarUrl: e.target.value })}
                      className="w-full p-2.5 border border-border rounded-btn font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowTeamModal(false)}
                    className="px-4 py-2 border border-border rounded-btn text-ink-secondary hover:bg-ivory-100 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-navy-700 hover:bg-blue-600 text-white rounded-btn font-bold transition shadow-sm"
                  >
                    {editingMember ? "Save Changes" : "Add Profile"}
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
