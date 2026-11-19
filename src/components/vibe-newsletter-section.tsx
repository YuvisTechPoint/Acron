"use client";

import React, { useState } from "react";
import { Mail, Check, Star, ShieldCheck, Truck, Headphones, Sparkles } from "lucide-react";

export function VibeNewsletterSection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [consentChecked, setConsentChecked] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Optional copy mode: "vibe" (verbatim user prompt) vs "legal" (tailored for Acorn Chambers)
  const [isLegalMode, setIsLegalMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      try {
        localStorage.setItem(
          "acorn_vibe_newsletter_subscriber",
          JSON.stringify({ firstName, lastName, email, date: new Date().toISOString() })
        );
      } catch {}
    }, 600);
  };

  return (
    <section className="relative bg-[#1546e8] text-white overflow-hidden pt-10 pb-16 sm:pb-20 border-t border-blue-600/40">

      {/* Floating 4-Pill Trust Matrix (matching Vibe Music top card) */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 relative z-20 -mt-16 mb-12 sm:mb-14">
        <div className="bg-white text-ink-950 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-200/90 py-4 px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">

            {/* Pill 1 */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3 first:pt-0 first:px-0">
              <div className="flex items-center text-amber-500 shrink-0">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm tracking-tight text-slate-900 flex items-baseline gap-1">
                  <span>4.8</span>
                  <span className="text-[11px] font-normal text-slate-500">/5</span>
                </div>
                <div className="text-[11px] text-slate-600 leading-tight">
                  {isLegalMode ? "Client satisfaction across chambers" : "customer reviews on product pages"}
                </div>
              </div>
            </div>

            {/* Pill 2 */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  {isLegalMode ? "Pan-Bengal" : "India-wide"}
                </div>
                <div className="text-[11px] text-slate-600 leading-tight">
                  {isLegalMode ? "Appellate & District reach" : "Delivery reach"}
                </div>
              </div>
            </div>

            {/* Pill 3 */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-4">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  {isLegalMode ? "High Court Bar" : "Pan-India"}
                </div>
                <div className="text-[11px] text-slate-600 leading-tight">
                  {isLegalMode ? "Enrolled Advocates Standing" : "Shipping coverage"}
                </div>
              </div>
            </div>

            {/* Pill 4 */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-4">
              <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  {isLegalMode ? "Counsel Retainers" : "Authorized"}
                </div>
                <div className="text-[11px] text-slate-600 leading-tight">
                  {isLegalMode ? "Dedicated Advisory Panel" : "Brand partners"}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Blue Subscription Content */}
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 text-center relative z-10">

        {/* Headline */}
        <h2 className="font-sans text-3xl sm:text-5xl font-medium tracking-tight text-white mb-3">
          {isLegalMode ? "Inside Acorn" : "Inside Vibe Music"}
        </h2>

        {/* Subtitle */}
        <p className="font-sans text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed mb-8">
          {isLegalMode
            ? "Subscribe for the latest statutory briefings, regulatory alerts, and legal insights from Kolkata's trusted counsel destination."
            : "Subscribe for the latest product drops, restock alerts, and exclusive deals from India's trusted gear destination."}
        </p>

        {/* Form Container */}
        {isSubscribed ? (
          <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl p-8 max-w-md mx-auto text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-12 h-12 rounded-full bg-white text-[#1546e8] flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="font-sans text-lg font-bold text-white mb-1">
              You are subscribed!
            </h3>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              Thank you for subscribing{firstName ? `, ${firstName}` : ""}. We have recorded your preferences for{" "}
              <span className="font-mono text-white underline">{email}</span>.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSubscribed(false);
                setEmail("");
              }}
              className="text-[11px] text-white/80 hover:text-white underline tracking-wide"
            >
              Subscribe with another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 max-w-[620px] mx-auto text-left">

            {/* Row 1: FIRST NAME & LAST NAME */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="vibe-first-name" className="sr-only">
                  FIRST NAME
                </label>
                <input
                  id="vibe-first-name"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="FIRST NAME"
                  className="w-full bg-white/10 hover:bg-white/[0.14] focus:bg-white/[0.18] border border-white/30 focus:border-white rounded-md px-4 py-3 text-white text-xs sm:text-sm font-semibold tracking-wider placeholder:text-white/70 placeholder:text-xs placeholder:font-semibold placeholder:tracking-wider placeholder:uppercase transition-all duration-200 outline-none focus:ring-2 focus:ring-white/40"
                />
              </div>

              <div>
                <label htmlFor="vibe-last-name" className="sr-only">
                  LAST NAME
                </label>
                <input
                  id="vibe-last-name"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="LAST NAME"
                  className="w-full bg-white/10 hover:bg-white/[0.14] focus:bg-white/[0.18] border border-white/30 focus:border-white rounded-md px-4 py-3 text-white text-xs sm:text-sm font-semibold tracking-wider placeholder:text-white/70 placeholder:text-xs placeholder:font-semibold placeholder:tracking-wider placeholder:uppercase transition-all duration-200 outline-none focus:ring-2 focus:ring-white/40"
                />
              </div>
            </div>

            {/* Row 2: EMAIL ADDRESS + SIGN UP BUTTON */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <label htmlFor="vibe-email-address" className="sr-only">
                  EMAIL ADDRESS
                </label>
                <input
                  id="vibe-email-address"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-white/10 hover:bg-white/[0.14] focus:bg-white/[0.18] border border-white/30 focus:border-white rounded-md pl-4 pr-11 py-3 text-white text-xs sm:text-sm font-semibold tracking-wider placeholder:text-white/70 placeholder:text-xs placeholder:font-semibold placeholder:tracking-wider placeholder:uppercase transition-all duration-200 outline-none focus:ring-2 focus:ring-white/40"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/70">
                  <Mail className="w-4 h-4" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="sm:w-auto px-7 py-3 min-h-[46px] rounded-md bg-white hover:bg-white/90 active:scale-[0.98] text-[#1546e8] font-sans font-bold text-xs uppercase tracking-wider shadow-sm transition-all duration-200 flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
              >
                {isSubmitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-[#1546e8] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Sign up</span>
                )}
              </button>
            </div>

            {/* Row 3: Consent Checkbox */}
            <div className="pt-1.5 flex items-start gap-2.5">
              <input
                id="vibe-consent-checkbox"
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-white/40 text-blue-800 focus:ring-white accent-white cursor-pointer"
              />
              <label
                htmlFor="vibe-consent-checkbox"
                className="font-sans text-xs text-white/90 select-none cursor-pointer leading-tight"
              >
                {isLegalMode
                  ? "Email me about statutory alerts, legal briefings, and Acorn updates."
                  : "Email me about new gear, restocks, and Vibe Music updates."}
              </label>
            </div>

          </form>
        )}

        {/* Discreet Context Switcher Pill (allows 1-click preview between Vibe Music verbatim & Acorn Chambers wording) */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setIsLegalMode((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-[10px] font-sans text-white/80 transition-all cursor-pointer"
            title="Toggle between verbatim Vibe Music wording and Acorn Chambers wording"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Mode: {isLegalMode ? "Acorn Chambers (Legal)" : "Vibe Music (Verbatim)"}</span>
            <span className="text-white/40 font-mono">• click to toggle</span>
          </button>
        </div>

      </div>

    </section>
  );
}
