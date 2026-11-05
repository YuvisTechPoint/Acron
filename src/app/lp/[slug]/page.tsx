"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ShieldCheck, CheckCircle2, ArrowRight, Phone, Scale } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";
import { platformStore } from "@/lib/store";

export default function CampaignLandingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = (params?.slug as string) || "kolkata-posh-compliance";

  const utmSource = searchParams?.get("utm_source") || "direct";
  const utmCampaign = searchParams?.get("utm_campaign") || "legal-advisory-2026";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orgName, setOrgName] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const req = platformStore.addServiceRequest({
      fullName: `${fullName} (${orgName || "Enterprise"}) [Campaign: ${slug} / ${utmSource}]`,
      email,
      phone,
      serviceCategory: "posh_compliance",
      subject: `Campaign Lead: ${slug.toUpperCase()} via ${utmSource}`,
      description: `Inquiry captured from campaign landing page: /lp/${slug}. Campaign: ${utmCampaign}, Source: ${utmSource}.`,
      urgency: "urgent",
      preferredChannel: "phone",
    });
    setSubmittedRef(req.refNumber);
  };

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Campaign Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-accent" />
            <span>Exclusive Corporate Advisory &bull; Kolkata</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ink leading-tight capitalize">
            {slug.replace(/-/g, " ")}
          </h1>

          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
            Statutory compliance, independent External Member representation, and High Court advocacy for forward-looking corporations in Kolkata and West Bengal.
          </p>
        </div>

        {/* Lead Capture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-surface p-6 rounded-card border border-border space-y-3">
              <h3 className="font-serif font-bold text-lg text-primary">
                Why Industry Leaders Partner with Acorn Legal
              </h3>
              <ul className="space-y-2.5 text-xs text-ink">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>100% Statutory Adherence:</strong> Zero non-compliance risk under Section 4 and 19.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Senior External Legal Members:</strong> Appointed directly from our Calcutta High Court practice.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Automated District Officer Reports:</strong> Hassle-free Section 21 filing each calendar year.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Form */}
          <div className="lg:col-span-6 bg-surface rounded-card p-6 sm:p-8 border border-border shadow-card">
            {submittedRef ? (
              <div className="text-center py-6 space-y-3 text-xs">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-lg text-ink">Inquiry Received</h4>
                <div className="font-mono font-bold text-primary">{submittedRef}</div>
                <p className="text-ink-secondary">Our corporate desk will call you within 2 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="font-serif font-bold text-base text-ink border-b border-border pb-2">
                  Request Priority Consultation
                </h3>

                <div>
                  <label className="block font-semibold text-ink mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Joydeep Ghosh"
                    className="w-full px-3 py-2 bg-white border border-border rounded"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink mb-1">Company / Workplace *</label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Bengal FinTech Ltd"
                    className="w-full px-3 py-2 bg-white border border-border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-ink mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="corporate email"
                      className="w-full px-3 py-2 bg-white border border-border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-ink mb-1">Mobile *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98300 00000"
                      className="w-full px-3 py-2 bg-white border border-border rounded"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white font-bold uppercase tracking-wider rounded shadow transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Request Priority Callback</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

