"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Users,
  Eye,
  Languages,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Send,
  Sparkles,
  Accessibility
} from "lucide-react";

export default function ComplainantSupportAccommodationsPage() {
  const [supportPersonName, setSupportPersonName] = useState("");
  const [supportPersonRelation, setSupportPersonRelation] = useState("");
  const [needInterpreter, setNeedInterpreter] = useState(false);
  const [interpreterLang, setInterpreterLang] = useState("Bengali");
  const [needScreenBarrier, setNeedScreenBarrier] = useState(true);
  const [needRemoteHearing, setNeedRemoteHearing] = useState(true);
  const [medicalAccommodation, setMedicalAccommodation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/posh/my-case"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Case Status</span>
          </Link>
          <span className="text-[11px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
            PRD Screen Ref: C-10
          </span>
        </div>

        {/* Header */}
        <div className="bg-white p-6 rounded-card border border-border shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
            <Heart className="w-4 h-4 text-primary" />
            <span>Trauma-Informed Design &bull; Accommodations (C-10)</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink mt-1">
            Support Person &amp; Hearing Accommodations
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Ensure your comfort, dignity, and psychological safety throughout committee proceedings. You may request support persons, language interpretation, or visual barriers.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <Link
              href="/posh/my-case"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
            >
              Overview &amp; Timers
            </Link>
            <Link
              href="/posh/my-case/docs"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
            >
              Documents &amp; Evidence (C-07)
            </Link>
            <Link
              href="/posh/my-case/interim"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
            >
              Interim Relief (C-08)
            </Link>
            <Link
              href="/posh/my-case/request"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
            >
              Conciliation / Motions (C-09)
            </Link>
            <span className="px-3 py-1.5 bg-primary text-white rounded font-bold">
              Support Accommodations (C-10)
            </span>
          </div>
        </div>

        {/* Form */}
        {submitted ? (
          <div className="bg-white p-8 rounded-card border border-emerald-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-ink">Accommodation Preferences Recorded</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              The Presiding Officer has updated your hearing protocol. All scheduled committee depositions will implement your barrier, language, and support person preferences.
            </p>
            <Link
              href="/posh/my-case"
              className="inline-block mt-3 px-4 py-2 bg-primary text-white text-xs font-semibold rounded"
            >
              Return to Case Progress Tracker
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-card border border-border shadow-sm space-y-6">
            
            {/* Support Person */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-2 border-b pb-2">
                <Users className="w-4 h-4 text-primary" />
                <span>1. Accompanying Support Person</span>
              </h3>
              <p className="text-xs text-slate-500">
                You may be accompanied by a trusted colleague, friend, or family member for emotional reassurance during hearings. (Note: Advocates / legal counsel are barred from appearing under Section 11 of the POSH Act).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Support Person Full Name</label>
                  <input
                    type="text"
                    value={supportPersonName}
                    onChange={(e) => setSupportPersonName(e.target.value)}
                    placeholder="e.g. Smt. Moumita Banerjee"
                    className="w-full text-xs p-2.5 border border-border rounded"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Relationship to Complainant</label>
                  <input
                    type="text"
                    value={supportPersonRelation}
                    onChange={(e) => setSupportPersonRelation(e.target.value)}
                    placeholder="e.g. Senior Colleague / Sister / Trusted Friend"
                    className="w-full text-xs p-2.5 border border-border rounded"
                  />
                </div>
              </div>
            </div>

            {/* Language & Interpretation */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-2 border-b pb-2">
                <Languages className="w-4 h-4 text-primary" />
                <span>2. Language &amp; Translation Support</span>
              </h3>
              
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needInterpreter}
                  onChange={(e) => setNeedInterpreter(e.target.checked)}
                  className="rounded text-primary border-border"
                />
                <span>I require an official certified translator/interpreter present during hearings</span>
              </label>

              {needInterpreter && (
                <div className="pl-6 w-full sm:w-72">
                  <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Language</label>
                  <select
                    value={interpreterLang}
                    onChange={(e) => setInterpreterLang(e.target.value)}
                    className="w-full text-xs p-2 border border-border rounded bg-white"
                  >
                    <option value="Bengali">Bengali (বাংলা)</option>
                    <option value="Hindi">Hindi (हिंदी)</option>
                    <option value="Santhali">Santhali / Tribal Dialect</option>
                    <option value="SignLanguage">Indian Sign Language (ISL)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Hearing Shield & Digital Separation */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-2 border-b pb-2">
                <Accessibility className="w-4 h-4 text-primary" />
                <span>3. Protective Hearing Setup</span>
              </h3>

              <div className="space-y-2 text-xs text-slate-700">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needScreenBarrier}
                    onChange={(e) => setNeedScreenBarrier(e.target.checked)}
                    className="mt-0.5 rounded text-primary border-border"
                  />
                  <span>
                    <strong>Visual Barrier / Separate Room:</strong> I request not to have direct eye-contact with the respondent during in-person depositions (use physical partition or separate deliberation chamber).
                  </span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needRemoteHearing}
                    onChange={(e) => setNeedRemoteHearing(e.target.checked)}
                    className="mt-0.5 rounded text-primary border-border"
                  />
                  <span>
                    <strong>Remote Video Conference:</strong> I request virtual examination via encrypted video call from a secure private room.
                  </span>
                </label>
              </div>
            </div>

            {/* Medical / Psychological Need */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-700 block">
                Additional Physical or Psychological Accommodations
              </label>
              <textarea
                rows={2}
                value={medicalAccommodation}
                onChange={(e) => setMedicalAccommodation(e.target.value)}
                placeholder="Mention any health conditions, panic triggers, need for frequent breaks, or wheelchair accessibility requirements..."
                className="w-full text-xs p-2.5 border border-border rounded"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded flex items-center gap-1.5 transition shadow"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Save Accommodation Preferences</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

