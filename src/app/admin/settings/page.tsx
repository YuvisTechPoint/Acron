"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Settings, Shield, CreditCard, Mail, Clock, ArrowLeft, Save, AlertTriangle, CheckCircle2 } from "lucide-react";
import { platformStore } from "@/lib/store";
import { SystemSettings } from "@/lib/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>({
    razorpayMode: "test",
    razorpayKeyId: "rzp_test_AcornLegalKolkata2026",
    razorpayKeySecretMasked: "••••••••••••••••••••",
    maintenanceMode: false,
    smtpHost: "email-smtp.ap-south-1.amazonaws.com",
    smtpFrom: "contact@acornlegal.in",
    retentionYears: "3",
    updatedAt: new Date().toISOString(),
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setSettings(platformStore.getSystemSettings());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    platformStore.updateSystemSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-card">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-1.5 rounded hover:bg-surface text-ink-secondary hover:text-ink transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-bold">
                Platform Infrastructure &bull; Section 28
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                System Settings &amp; Gateway Configuration
              </h1>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded transition shadow"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Configuration</span>
          </button>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-900 font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>&check; Settings saved and active across production environment!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white rounded-card p-6 sm:p-8 border border-border shadow-card space-y-6 text-xs">
          {/* Section 1: Razorpay Gateway Mode */}
          <div className="space-y-3 border-b border-border pb-6">
            <div className="flex items-center gap-2 font-serif font-bold text-base text-ink">
              <CreditCard className="w-5 h-5 text-accent" />
              <span>Razorpay Payment Gateway Mode</span>
            </div>
            <p className="text-ink-secondary">
              Toggle between Razorpay Sandbox Test Mode and Production Live Mode per PRD Section 6.9.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div
                onClick={() => setSettings({ ...settings, razorpayMode: "test" })}
                className={`p-3.5 rounded border cursor-pointer transition-colors ${
                  settings.razorpayMode === "test" ? "bg-primary-light/50 border-primary" : "bg-surface border-border hover:bg-slate-100"
                }`}
              >
                <div className="font-bold text-primary">Test / Sandbox Mode</div>
                <div className="text-[11px] text-ink-secondary mt-0.5">Mock transactions for development &amp; staging</div>
              </div>

              <div
                onClick={() => setSettings({ ...settings, razorpayMode: "live" })}
                className={`p-3.5 rounded border cursor-pointer transition-colors ${
                  settings.razorpayMode === "live" ? "bg-primary-light/50 border-primary" : "bg-surface border-border hover:bg-slate-100"
                }`}
              >
                <div className="font-bold text-emerald-800">Production Live Mode</div>
                <div className="text-[11px] text-ink-secondary mt-0.5">Settles live payments into Acorn Bank account</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block font-semibold text-ink mb-1">Razorpay Key ID</label>
                <input
                  type="text"
                  value={settings.razorpayKeyId}
                  onChange={(e) => setSettings({ ...settings, razorpayKeyId: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-ink mb-1">Razorpay Key Secret</label>
                <input
                  type="password"
                  value={settings.razorpayKeySecretMasked}
                  onChange={(e) => setSettings({ ...settings, razorpayKeySecretMasked: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Email SMTP Configuration */}
          <div className="space-y-3 border-b border-border pb-6">
            <div className="flex items-center gap-2 font-serif font-bold text-base text-ink">
              <Mail className="w-5 h-5 text-accent" />
              <span>Transactional Email (Amazon SES / SMTP)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-ink mb-1">SMTP Host</label>
                <input
                  type="text"
                  value={settings.smtpHost}
                  onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-ink mb-1">From Sender Address</label>
                <input
                  type="email"
                  value={settings.smtpFrom}
                  onChange={(e) => setSettings({ ...settings, smtpFrom: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Maintenance & Retention */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-surface rounded border border-border">
              <div>
                <div className="font-bold text-ink">Platform Maintenance Mode</div>
                <div className="text-[11px] text-ink-secondary">Shows branded maintenance notice to public visitors while admin stays accessible.</div>
              </div>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="w-5 h-5 text-primary rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block font-semibold text-ink mb-1">Default POSH Closed Case Retention Period (Years)</label>
              <input
                type="number"
                min="1"
                max="10"
                value={settings.retentionYears}
                onChange={(e) => setSettings({ ...settings, retentionYears: e.target.value })}
                className="w-32 px-3 py-2 border border-border rounded font-mono"
              />
              <span className="text-[11px] text-ink-secondary ml-2">Statutory guideline: Minimum 3 years after closure</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary hover:bg-primary-light text-white font-bold rounded shadow transition text-xs"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
