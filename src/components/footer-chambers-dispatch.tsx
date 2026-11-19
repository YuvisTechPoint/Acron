"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Mail,
  Lock,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Scale,
  FileText,
} from "lucide-react";

export function FooterChambersDispatch() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("acorn_chambers_dispatch_subscribed");
      if (stored === "true") {
        setIsSubmitted(true);
      }
    } catch {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !email.includes("@") || !email.includes(".")) {
      setErrorMessage("Please enter a valid corporate or professional email address.");
      return;
    }

    if (!agreed) {
      setErrorMessage("Please acknowledge the privileged statutory communication terms.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        localStorage.setItem("acorn_chambers_dispatch_subscribed", "true");
        localStorage.setItem(
          "acorn_chambers_dispatch_subscriber",
          JSON.stringify({ firstName, lastName, email, date: new Date().toISOString() })
        );
      } catch {}
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    try {
      localStorage.removeItem("acorn_chambers_dispatch_subscribed");
    } catch {}
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-brass-500/25 bg-navy-950/90 p-6 sm:p-8 lg:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-sm">
      {/* Ambient Brass Hairline & Radial Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-brass-500/60 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-brass-500/8 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-navy-700/20 rounded-full blur-[90px] pointer-events-none" />

      {/* 3 Chambers Institutional Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-8 pb-8 border-b border-navy-800/80">
        <div className="flex items-start gap-3 p-3.5 rounded-lg bg-navy-900/60 border border-navy-800/80">
          <BookOpen className="w-4 h-4 text-brass-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-white tracking-wide">Quarterly Legal Gazette</div>
            <div className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
              Statutory digests, High Court precedents &amp; compliance revisions.
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-lg bg-navy-900/60 border border-navy-800/80">
          <Scale className="w-4 h-4 text-brass-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-white tracking-wide">Institutional Discretion</div>
            <div className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
              Privileged counsel distribution roster. Zero commercial tracking.
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-lg bg-navy-900/60 border border-navy-800/80">
          <FileText className="w-4 h-4 text-brass-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-white tracking-wide">Regulatory Precision</div>
            <div className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
              Companies Act, POSH IC mandates &amp; WBRERA governance commentary.
            </div>
          </div>
        </div>
      </div>

      {isSubmitted ? (
        <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-400">
          <div className="w-14 h-14 rounded-full bg-navy-900 border border-brass-400/50 flex items-center justify-center mx-auto text-brass-300 shadow-inner">
            <CheckCircle2 className="w-7 h-7 text-brass-400" />
          </div>

          <div className="space-y-1.5 max-w-lg mx-auto">
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
              Chambers Dispatch Enrollment Confirmed
            </h3>
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              Your official address has been enrolled in our privileged statutory bulletin roster. You will receive our next quarterly governance digest and High Court advisory.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-md bg-navy-900 hover:bg-navy-800 border border-brass-500/30 text-brass-300 hover:text-white text-xs font-medium transition cursor-pointer"
            >
              <span>Register Another Address</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-navy-900/80 border border-brass-500/30 text-[10px] font-mono uppercase tracking-[0.2em] text-brass-300 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-brass-400" />
              <span>Chambers Dispatch &bull; Statutory Intelligence</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
              Stay informed on statutory compliance &amp; judicial precedents.
            </h3>

            <p className="font-sans text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Receive concise legal intelligence, regulatory updates, and corporate governance briefings curated by senior counsel for corporate boards, compliance officers, and institutional leadership.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {/* First Name */}
              <div className="sm:col-span-3">
                <label htmlFor="dispatch-first-name" className="sr-only">
                  First Name
                </label>
                <input
                  id="dispatch-first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="w-full h-12 px-4 rounded-md bg-navy-900/90 border border-navy-700/80 hover:border-navy-600 focus:border-brass-400 focus:ring-1 focus:ring-brass-400 text-white placeholder-slate-400 text-base sm:text-xs font-sans transition outline-none"
                />
              </div>

              {/* Last Name */}
              <div className="sm:col-span-3">
                <label htmlFor="dispatch-last-name" className="sr-only">
                  Last Name
                </label>
                <input
                  id="dispatch-last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="w-full h-12 px-4 rounded-md bg-navy-900/90 border border-navy-700/80 hover:border-navy-600 focus:border-brass-400 focus:ring-1 focus:ring-brass-400 text-white placeholder-slate-400 text-base sm:text-xs font-sans transition outline-none"
                />
              </div>

              {/* Email Address */}
              <div className="sm:col-span-4">
                <label htmlFor="dispatch-email" className="sr-only">
                  Corporate / Professional Email Address
                </label>
                <div className="relative">
                  <input
                    id="dispatch-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Corporate / Professional Email"
                    className="w-full h-12 pl-4 pr-10 rounded-md bg-navy-900/90 border border-navy-700/80 hover:border-navy-600 focus:border-brass-400 focus:ring-1 focus:ring-brass-400 text-white placeholder-slate-400 text-base sm:text-xs font-sans transition outline-none"
                  />
                  <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 px-4 rounded-md bg-brass-500 hover:bg-brass-400 active:bg-brass-600 text-ink-950 font-sans text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-brass-500/20 flex items-center justify-center gap-1.5 group cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-ink-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-xs text-amber-300 font-sans flex items-center gap-1.5 pt-1">
                <span>&bull;</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Consent & Bar Council Privilege Note */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs font-sans">
              <label className="flex items-start gap-2.5 cursor-pointer select-none text-slate-300 hover:text-white transition">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-navy-700 bg-navy-900 text-brass-500 focus:ring-brass-400 w-4 h-4 accent-brass-500 cursor-pointer"
                />
                <span className="text-[11px] leading-relaxed">
                  I wish to receive quarterly statutory bulletins and chambers advisories. Privileged communication under Bar Council standards. Zero commercial spam.
                </span>
              </label>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 shrink-0">
                <Lock className="w-3.5 h-3.5 text-brass-400" />
                <span>Strict Confidentiality &bull; Encrypted</span>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
