"use client";

import React, { useState } from "react";
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
  FileText
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";

export default function AdminSiteSettingsPage() {
  const [siteData, setSiteData] = useState({
    firmName: BRAND_CONFIG.name,
    tagline: BRAND_CONFIG.tagline,
    address: `${BRAND_CONFIG.address.line1}, ${BRAND_CONFIG.address.line2}, ${BRAND_CONFIG.address.city} ${BRAND_CONFIG.address.postalCode}, ${BRAND_CONFIG.address.state}`,
    primaryEmail: BRAND_CONFIG.email,
    poshEmail: BRAND_CONFIG.poshEmail,
    receptionPhone: BRAND_CONFIG.phone,
    emergencyHotline: BRAND_CONFIG.emergencyPhone,
    operatingHours: BRAND_CONFIG.hours,
    courtVacationNotice: "Chambers open throughout High Court long vacation for urgent mentions & POSH inquiries."
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            PRD Screen Ref: A-09
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
              <Settings className="w-4 h-4 text-primary" />
              <span>Chamber Configuration &bull; Global Information</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink mt-1">
              Chambers Address, Contacts &amp; Notices
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Update firm official physical location, court hours, verified contact emails, and statutory footer disclosures.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saved ? "Saved!" : "Save Changes"}</span>
          </button>
        </div>

        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Chamber details and footer metadata updated across all portal pages.</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-card border border-border shadow-sm space-y-5 text-xs">
          
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-ink border-b pb-2 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-primary" />
              <span>Firm Identity &amp; Positioning</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Firm Name</label>
                <input
                  type="text"
                  value={siteData.firmName}
                  onChange={(e) => setSiteData({ ...siteData, firmName: e.target.value })}
                  className="w-full p-2.5 border border-border rounded"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Official Brand Tagline</label>
                <input
                  type="text"
                  value={siteData.tagline}
                  onChange={(e) => setSiteData({ ...siteData, tagline: e.target.value })}
                  className="w-full p-2.5 border border-border rounded"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Kolkata Chambers Address</label>
              <textarea
                rows={2}
                value={siteData.address}
                onChange={(e) => setSiteData({ ...siteData, address: e.target.value })}
                className="w-full p-2.5 border border-border rounded"
              />
            </div>
          </div>

          <div className="space-y-4 pt-3">
            <h3 className="font-bold text-sm text-ink border-b pb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>Contact Inboxes &amp; Helplines</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">General Firm Reception Email</label>
                <input
                  type="email"
                  value={siteData.primaryEmail}
                  onChange={(e) => setSiteData({ ...siteData, primaryEmail: e.target.value })}
                  className="w-full p-2.5 border border-border rounded"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">POSH Dedicated Desk Email</label>
                <input
                  type="email"
                  value={siteData.poshEmail}
                  onChange={(e) => setSiteData({ ...siteData, poshEmail: e.target.value })}
                  className="w-full p-2.5 border border-border rounded"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Chambers Switchboard Phone</label>
                <input
                  type="text"
                  value={siteData.receptionPhone}
                  onChange={(e) => setSiteData({ ...siteData, receptionPhone: e.target.value })}
                  className="w-full p-2.5 border border-border rounded"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Emergency POSH Helpline (24/7)</label>
                <input
                  type="text"
                  value={siteData.emergencyHotline}
                  onChange={(e) => setSiteData({ ...siteData, emergencyHotline: e.target.value })}
                  className="w-full p-2.5 border border-border rounded"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Working &amp; Consultation Hours</label>
              <input
                type="text"
                value={siteData.operatingHours}
                onChange={(e) => setSiteData({ ...siteData, operatingHours: e.target.value })}
                className="w-full p-2.5 border border-border rounded"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-border">
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary hover:bg-primary-light text-white font-bold rounded flex items-center gap-1.5 shadow"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Firm Settings</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
