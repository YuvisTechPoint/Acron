"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PhoneCall,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Send,
  Printer,
  Copy,
  Radio,
  Lock,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { AssistedIntakeRecord } from "@/lib/types";

export default function PoshAssistedIntakePage() {
  const [counsellorName, setCounsellorName] = useState("Pooja Banerjee, MSW (Senior Intake Counsellor)");
  const [callerPhone, setCallerPhone] = useState("+91 98314 55219");
  const [callerChannel, setCallerChannel] = useState<"PHONE" | "WALK_IN" | "VIDEO_BRIDGE">("PHONE");
  const [preferredDelivery, setPreferredDelivery] = useState<"WHATSAPP" | "EMAIL" | "SEALED_COVER">("WHATSAPP");
  const [incidentSummary, setIncidentSummary] = useState(
    "Caller reported repeated unwelcome verbal comments and sexually suggestive remarks made by Senior Project Delivery Manager during late shift client reviews."
  );
  const [readBackConfirmed, setReadBackConfirmed] = useState(false);
  const [safeContactAffirmed, setSafeContactAffirmed] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const [records, setRecords] = useState<AssistedIntakeRecord[]>(platformStore.getAssistedIntakes());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!readBackConfirmed || !safeContactAffirmed) {
      alert("Statutory Requirement: Both the Read-Back protocol and Safe Contact Affirmation must be checked by the counsellor.");
      return;
    }

    const newRecord = platformStore.addAssistedIntake({
      counsellorName,
      callerChannel,
      callerPhoneMasked: callerPhone.replace(/(\+91 \d{4})\d{4}(\d{2})/, "$1••••$2"),
      callerPreferredChannel: preferredDelivery,
      incidentSummary,
      readBackConfirmed,
      docketGenerated: `POSH-INAKE-${Date.now().toString().slice(-4)}`,
      status: "COMPLAINANT_CONFIRMED",
    });

    setSubmittedRef(newRecord.id);
    setRecords(platformStore.getAssistedIntakes());
  };

  return (
    <div className="bg-ivory-50 min-h-screen pt-32 pb-20 sm:pt-40 sm:pb-24 text-ink">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link
            href="/posh"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-navy-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to POSH Redressal Hub</span>
          </Link>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-emerald-800 font-semibold">Trained Counsellor Desk Active</span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-card border border-border shadow-card space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brass-700">
            <PhoneCall className="w-4 h-4 text-brass-600" />
            <span>PRD v3.0 &bull; US-269 Assisted Phone &amp; Walk-In Intake Desk</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink-950">
            Assisted Intake &amp; Read-Back Verification Desk
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary max-w-3xl leading-relaxed">
            For individuals who cannot or prefer not to use a digital device. A trained Intake Counsellor takes down the complaint statement, executes the mandatory verbatim read-back, verifies a safe delivery channel, and initiates docket registration.
          </p>
        </div>

        {submittedRef && (
          <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-card shadow-sm space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Assisted Intake Successfully Logged: Reference {submittedRef}</span>
            </div>
            <p className="text-xs text-emerald-800">
              A content-free confirmation receipt has been dispatched to the caller via their requested channel ({preferredDelivery}). An urgent preliminary notice has been placed on the Internal Committee queue.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Counsellor Entry (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-card border border-border shadow-card space-y-6">
            <h2 className="font-serif font-bold text-lg text-ink-950 border-b border-border pb-3 flex items-center justify-between">
              <span>1. Counsellor Intake Form</span>
              <span className="text-[11px] font-mono text-slate-500 font-normal">Section 9(1) Proviso &bull; Rule 7</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-ink-900 block">Intake Counsellor</label>
                  <input
                    type="text"
                    required
                    value={counsellorName}
                    onChange={(e) => setCounsellorName(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded bg-surface font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-ink-900 block">Intake Channel</label>
                  <select
                    value={callerChannel}
                    onChange={(e) => setCallerChannel(e.target.value as any)}
                    className="w-full px-3 py-2 border border-border rounded bg-white font-sans"
                  >
                    <option value="PHONE">Inbound Phone Line</option>
                    <option value="WALK_IN">In-Person Chambers Walk-In</option>
                    <option value="VIDEO_BRIDGE">Confidential Video Bridge</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-ink-900 block">Caller Contact Number</label>
                  <input
                    type="text"
                    required
                    value={callerPhone}
                    onChange={(e) => setCallerPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded bg-white font-mono"
                  />
                  <span className="text-[10px] text-ink-muted">Masked in all public logs per Section 16.</span>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-ink-900 block">Preferred Copy Delivery Channel</label>
                  <select
                    value={preferredDelivery}
                    onChange={(e) => setPreferredDelivery(e.target.value as any)}
                    className="w-full px-3 py-2 border border-border rounded bg-white font-sans"
                  >
                    <option value="WHATSAPP">Encrypted WhatsApp Notification</option>
                    <option value="EMAIL">Confidential Email Receipt</option>
                    <option value="SEALED_COVER">Physical Sealed Cover to Safe Address</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-ink-900 block">
                  Verbatim Statement of Misconduct (Taken as dictated)
                </label>
                <textarea
                  rows={4}
                  required
                  value={incidentSummary}
                  onChange={(e) => setIncidentSummary(e.target.value)}
                  className="w-full p-3 border border-border rounded bg-white font-sans leading-relaxed"
                />
              </div>

              {/* Mandatory Verbatim Read-Back Script Card */}
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded text-amber-950 space-y-3">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-900">
                  <Radio className="w-4 h-4 text-amber-700 animate-pulse" />
                  <span>Mandatory Read-Back Script (US-269 Protocol)</span>
                </div>
                <p className="italic text-[11px] leading-relaxed bg-white/70 p-2.5 rounded border border-amber-100">
                  &ldquo;I have recorded your statement as follows: [{incidentSummary}]. Do you confirm this is an accurate and complete representation of what transpired? Do you authorize Acorn Legal Consultants to submit this record to your employer&apos;s Internal Committee?&rdquo;
                </p>
                <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={readBackConfirmed}
                    onChange={(e) => setReadBackConfirmed(e.target.checked)}
                    className="mt-0.5 text-navy-800 rounded"
                  />
                  <span className="font-semibold text-xs">
                    I confirm that I read back this full statement verbatim and the caller gave explicit affirmative consent.
                  </span>
                </label>
              </div>

              {/* Safe Contact Check (US-267) */}
              <div className="p-3 bg-surface border border-border rounded space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safeContactAffirmed}
                    onChange={(e) => setSafeContactAffirmed(e.target.checked)}
                    className="mt-0.5 text-navy-800 rounded"
                  />
                  <div>
                    <span className="font-semibold text-xs text-ink-950">Safe Contact Check Affirmed (US-267)</span>
                    <p className="text-[10px] text-ink-secondary mt-0.5">
                      Counsellor verified that the requested delivery channel does not risk exposing the complainant to workplace surveillance or shared device compromise.
                    </p>
                  </div>
                </label>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-navy-800 hover:bg-navy-900 text-ivory-50 font-semibold rounded text-xs shadow transition flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-brass-400" />
                  <span>Register &amp; Issue Receipt</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right: Desk Telemetry & Recent Intakes (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 rounded-card border border-border shadow-card space-y-4">
              <h3 className="font-serif font-bold text-base text-ink-950 border-b border-border pb-2 flex items-center justify-between">
                <span>Recent Assisted Intakes</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold">Encrypted Ledger</span>
              </h3>

              <div className="space-y-3 text-xs">
                {records.map((r) => (
                  <div key={r.id} className="p-3 bg-surface rounded border border-border space-y-1.5">
                    <div className="flex items-center justify-between font-mono">
                      <span className="font-bold text-navy-800">{r.id}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-sans font-bold">
                        {r.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-ink-secondary line-clamp-2">
                      {r.incidentSummary}
                    </div>
                    <div className="text-[10px] text-ink-muted flex items-center justify-between pt-1 border-t border-border-subtle">
                      <span>Delivery: <strong className="text-ink">{r.callerPreferredChannel}</strong></span>
                      <span>Caller: {r.callerPhoneMasked}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Helpline Guidelines Box */}
            <div className="bg-stone-100 p-5 rounded-card border border-border space-y-3 text-xs">
              <div className="font-serif font-bold text-sm text-ink-950 flex items-center gap-2">
                <Lock className="w-4 h-4 text-brass-600" />
                <span>Statutory Confidentiality Guarantee</span>
              </div>
              <p className="text-ink-secondary leading-relaxed">
                Under Section 16 and Section 17 of the POSH Act, no counsellor, advocate, or administrative staff member may publish or communicate any identifying details regarding this intake. Violation results in statutory monetary penalties and professional disciplinary action.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

