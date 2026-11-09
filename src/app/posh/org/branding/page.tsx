"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Palette,
  Globe,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowLeft,
  Save,
  Eye,
  RefreshCw,
  Sparkles,
  Phone,
  Mail,
  Lock,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { BrandingConfig } from "@/lib/types";

export default function EnterpriseBrandingPage() {
  const [config, setConfig] = useState<BrandingConfig>({
    orgId: "org-1",
    companyName: "TechKolkata Solutions Private Limited",
    customDomain: "posh.techkolkata.io",
    customDomainVerified: true,
    primaryColor: "#0A192F",
    accentColor: "#D4AF37",
    logoUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=80",
    supportEmail: "posh.support@techkolkata.io",
    confidentialHotline: "+91 33 2289 4400 (Ext 14)",
    sslStatus: "PROVISIONED",
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedDns, setCopiedDns] = useState(false);
  const [verifyingDns, setVerifyingDns] = useState(false);

  useEffect(() => {
    const existing = platformStore.getBrandingConfig("org-1");
    if (existing) {
      setConfig(existing);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    platformStore.saveBrandingConfig("org-1", config);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleVerifyDns = () => {
    setVerifyingDns(true);
    setTimeout(() => {
      setConfig((prev) => ({
        ...prev,
        customDomainVerified: true,
        sslStatus: "PROVISIONED",
      }));
      setVerifyingDns(false);
    }, 1000);
  };

  const handleCopyDns = () => {
    navigator.clipboard.writeText("cname.acornlegal.in");
    setCopiedDns(true);
    setTimeout(() => setCopiedDns(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#111827] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-6">
          <Link href="/posh/org" className="hover:text-[#0A192F] transition flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Org Hub
          </Link>
          <span>/</span>
          <span className="text-[#0A192F] font-semibold">White-Label Branding &amp; Custom Domain</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5E0D8]">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-lg bg-[#0A192F] text-[#D4AF37]">
              <Palette className="w-6 h-6" />
            </span>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A192F]">
                Enterprise Branding &amp; Custom Domain
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#4B5563] mt-0.5">
                PRD v3.0 US-243 &bull; White-Label Portal Customization, Managed TLS &amp; Domain Verification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {savedSuccess && (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-200">
                <Check className="w-4 h-4 text-emerald-600" />
                Settings Saved Successfully
              </span>
            )}
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#0A192F] text-white hover:bg-[#152E52] text-xs font-semibold tracking-wide shadow-sm transition"
            >
              <Save className="w-4 h-4 text-[#D4AF37]" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Form & Live Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          
          {/* Left 6 Cols: Branding & Domain Form */}
          <form onSubmit={handleSave} className="lg:col-span-6 space-y-6">
            
            {/* Custom Domain & Managed TLS */}
            <div className="bg-white rounded-lg border border-[#E5E0D8] p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
                <h2 className="font-serif text-base font-bold text-[#0A192F] flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#D4AF37]" />
                  Custom Dedicated Domain
                </h2>
                <span
                  className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                    config.customDomainVerified
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {config.customDomainVerified ? "Verified" : "Pending DNS"}
                </span>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#0A192F]">
                  Custom FQDN Domain
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={config.customDomain}
                    onChange={(e) =>
                      setConfig({ ...config, customDomain: e.target.value, customDomainVerified: false })
                    }
                    placeholder="e.g. posh.yourcompany.com"
                    className="flex-1 px-3 py-2 text-xs rounded border border-[#E5E0D8] font-mono focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyDns}
                    disabled={verifyingDns}
                    className="px-3 py-2 rounded bg-[#0A192F]/5 hover:bg-[#0A192F]/10 text-[#0A192F] text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
                  >
                    {verifyingDns ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <RefreshCw className="w-3.5 h-3.5" />
                    )}
                    <span>Verify DNS</span>
                  </button>
                </div>
              </div>

              {/* DNS Instructions Card */}
              <div className="p-3.5 rounded bg-[#FAF9F6] border border-[#E5E0D8] space-y-2 text-xs">
                <span className="font-semibold text-[#0A192F] block">
                  DNS Configuration Target:
                </span>
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded border border-[#E5E0D8] font-mono text-[11px]">
                  <span>CNAME &rarr; cname.acornlegal.in</span>
                  <button
                    type="button"
                    onClick={handleCopyDns}
                    className="text-[#0A192F] hover:underline flex items-center gap-1"
                  >
                    {copiedDns ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{copiedDns ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                  <span>Managed TLS: Let&apos;s Encrypt Auto-Renewal</span>
                  <span className="text-emerald-700 font-semibold">SSL Active</span>
                </div>
              </div>
            </div>

            {/* Corporate Identity & Colors */}
            <div className="bg-white rounded-lg border border-[#E5E0D8] p-6 shadow-sm space-y-5">
              <h2 className="font-serif text-base font-bold text-[#0A192F] flex items-center gap-2 pb-3 border-b border-[#F3F4F6]">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                Brand Identity &amp; Palette
              </h2>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#0A192F]">
                  Enterprise Legal Entity Name
                </label>
                <input
                  type="text"
                  value={config.companyName}
                  onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E5E0D8] focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#0A192F]">
                    Primary Brand Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.primaryColor}
                      onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      className="w-8 h-8 rounded border border-[#E5E0D8] cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.primaryColor}
                      onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      className="flex-1 px-3 py-1.5 text-xs font-mono rounded border border-[#E5E0D8]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#0A192F]">
                    Accent / Gold Tone
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.accentColor}
                      onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                      className="w-8 h-8 rounded border border-[#E5E0D8] cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.accentColor}
                      onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                      className="flex-1 px-3 py-1.5 text-xs font-mono rounded border border-[#E5E0D8]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#0A192F]">
                  Enterprise Logo URL
                </label>
                <input
                  type="url"
                  value={config.logoUrl}
                  onChange={(e) => setConfig({ ...config, logoUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E5E0D8] font-mono focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#0A192F]">
                    Employee Helpdesk Email
                  </label>
                  <input
                    type="email"
                    value={config.supportEmail}
                    onChange={(e) => setConfig({ ...config, supportEmail: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-[#E5E0D8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#0A192F]">
                    Confidential 24/7 Helpline
                  </label>
                  <input
                    type="text"
                    value={config.confidentialHotline}
                    onChange={(e) => setConfig({ ...config, confidentialHotline: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-[#E5E0D8]"
                  />
                </div>
              </div>

            </div>

          </form>

          {/* Right 6 Cols: Live Preview Canvas */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                Live Employee Portal Preview
              </h2>
              <span className="text-[11px] font-mono text-[#D4AF37]">
                {config.customDomain}
              </span>
            </div>

            {/* Mock Browser Container */}
            <div className="rounded-xl border border-[#CBD5E1] bg-white shadow-xl overflow-hidden">
              {/* Browser chrome toolbar */}
              <div className="bg-[#F1F5F9] px-4 py-2.5 border-b border-[#E2E8F0] flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                </div>
                <div className="flex-1 bg-white px-3 py-1 rounded text-[11px] font-mono text-[#475569] border border-[#CBD5E1] flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    https://{config.customDomain}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-sans font-semibold">256-bit TLS</span>
                </div>
              </div>

              {/* Portal Canvas */}
              <div className="p-6 bg-[#FAF9F6] space-y-6">
                
                {/* Header with Enterprise Logo & Color */}
                <div
                  className="p-4 rounded-lg text-white shadow-md flex items-center justify-between"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded bg-white/10 flex items-center justify-center font-bold font-serif text-lg text-white border border-white/20">
                      TK
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-white">
                        {config.companyName}
                      </h4>
                      <p className="text-[10px] text-white/80 font-mono">
                        Internal Committee Statutory Hub
                      </p>
                    </div>
                  </div>

                  <span
                    className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded"
                    style={{ backgroundColor: config.accentColor, color: config.primaryColor }}
                  >
                    Active IC
                  </span>
                </div>

                {/* Hero Card */}
                <div className="bg-white rounded-lg border border-[#E5E0D8] p-5 shadow-sm space-y-3">
                  <h3 className="font-serif text-base font-bold text-[#0A192F]">
                    Confidential Workplace Grievance &amp; POSH Safety Portal
                  </h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    Empowering employees of {config.companyName} with statutory protection under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="px-3.5 py-1.5 rounded text-xs font-semibold text-white shadow-sm"
                      style={{ backgroundColor: config.primaryColor }}
                    >
                      File Confidential Concern
                    </button>
                    <button
                      type="button"
                      className="px-3.5 py-1.5 rounded text-xs font-semibold border border-[#E5E0D8] text-[#374151] bg-[#FAF9F6]"
                    >
                      View Statutory IC Roster
                    </button>
                  </div>
                </div>

                {/* Helpline & Support Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded bg-white border border-[#E5E0D8] flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                    <div className="overflow-hidden">
                      <span className="text-[10px] text-[#6B7280] block">Employee Support</span>
                      <span className="font-mono text-[11px] truncate block text-[#0A192F]">
                        {config.supportEmail}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-white border border-[#E5E0D8] flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    <div>
                      <span className="text-[10px] text-[#6B7280] block">24/7 IC Helpline</span>
                      <span className="font-mono text-[11px] font-semibold text-[#0A192F]">
                        {config.confidentialHotline}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer with Powered by Acorn tag */}
                <div className="pt-2 text-center text-[10px] text-[#9CA3AF]">
                  Protected by Acorn Legal Consultants Statutory Compliance Infrastructure &bull; Kolkata
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
