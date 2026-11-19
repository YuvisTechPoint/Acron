"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  ArrowUp,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { BRAND_CONFIG, PRACTICE_AREAS } from "@/lib/constants";
import { FooterRollText, FooterClock } from "@/components/footer-roll-text";
import { ChambersMap } from "@/components/chambers-map";
import { useRealtimeSiteConfig } from "@/lib/realtime";

export function Footer() {
  const pathname = usePathname();
  const safePath = typeof pathname === "string" ? pathname : "";
  const siteConfig = useRealtimeSiteConfig();
  const [showMapModal, setShowMapModal] = useState(false);

  // Master rolling collapsible state for upper footer body
  const [isBodyOpen, setIsBodyOpen] = useState(true);

  // Foldable accordion state for mobile/tablet screens within the directory
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    "01": true,
    "02": false,
    "03": false,
  });

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("acorn_footer_collapsed");
      if (saved === "true") {
        setIsBodyOpen(false);
      }
    } catch {}
  }, []);

  const toggleFooterBody = () => {
    setIsBodyOpen((prev) => {
      const next = !prev;
      try {
        sessionStorage.setItem("acorn_footer_collapsed", next ? "false" : "true");
      } catch {}
      return next;
    });
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Suppress footer on administrative and console workspaces
  const isAdminOrConsole =
    safePath.startsWith("/admin") ||
    safePath.startsWith("/posh/admin") ||
    safePath.startsWith("/posh/ic") ||
    safePath.startsWith("/posh/org");

  if (isAdminOrConsole) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-ink-950 text-white border-t border-navy-800">

      {/* ─────────────────────────────────────────────────────────────
          1. ROLLING FOLDABLE DIRECTORY BODY (COLLAPSIBLE UPPER FOOTER)
         ───────────────────────────────────────────────────────────── */}
      <div
        id="footer-directory-body"
        aria-hidden={!isBodyOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isBodyOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          {/* Main 4-Column Directory Grid */}
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">

              {/* Column 1: Firm Identity & Chambers Ethos (4 cols) */}
              <div className="lg:col-span-4 space-y-4">
                <Link href="/" className="inline-flex items-center gap-3 group focus:outline-none">
                  <div className="w-10 h-10 rounded-md bg-navy-950 border border-brass-500/40 overflow-hidden flex items-center justify-center group-hover:border-brass-400 group-hover:ring-1 group-hover:ring-brass-400/40 transition-all shadow-inner shrink-0">
                    <Image
                      src="/brand/logo.png"
                      alt="Acorn Legal Consultants Crest"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                      {siteConfig?.firmName || "ACORN CONSULTANTS"}
                    </span>
                    <span className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-brass-300 mt-1">
                      {siteConfig?.tagline || "Educational, Tax & Legal Consultants"}
                    </span>
                  </div>
                </Link>

                <p className="font-sans text-xs text-slate-300 leading-relaxed max-w-sm">
                  Over 15 years of dedicated expertise delivering comprehensive legal advocacy, 30-year property title investigation, society governance, document attestation, and educational consulting.
                </p>

                <div className="pt-1 text-xs text-brass-300 font-serif italic">
                  &ldquo;Work done well, with a personal touch.&rdquo;
                </div>

                <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-brass-400" />
                  <span>Calcutta High Court Bar Association Jurisdiction</span>
                </div>
              </div>

              {/* Column 2: 01 / Practice Areas (3 cols) */}
              <div className="lg:col-span-3 border-t border-navy-800/60 lg:border-t-0 pt-4 lg:pt-0">
                <button
                  type="button"
                  onClick={() => toggleAccordion("01")}
                  className="w-full min-h-[44px] flex items-center justify-between text-left group lg:pointer-events-none mb-2 lg:mb-4 focus:outline-none py-1 cursor-pointer"
                  aria-expanded={openAccordions["01"]}
                >
                  <h4 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-400 flex items-center gap-1.5">
                    <span className="font-mono text-[10px] text-brass-500/80">01 /</span>
                    <span>Practice Areas</span>
                  </h4>
                  <ChevronDown
                    className={`w-4 h-4 text-brass-400 lg:hidden transition-transform duration-300 ${
                      openAccordions["01"] ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openAccordions["01"] ? "max-h-[500px] opacity-100" : "max-h-0 lg:max-h-none opacity-0 lg:opacity-100"
                  }`}
                >
                  <ul className="space-y-2.5 font-sans text-xs text-slate-300 pt-1 lg:pt-0">
                    {PRACTICE_AREAS.slice(0, 6).map((pa) => (
                      <li key={pa.slug}>
                        <Link
                          href={`/services/${pa.slug}`}
                          className="hover:text-brass-300 transition-colors inline-flex items-center gap-1.5 group"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brass-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                          <FooterRollText>{pa.title}</FooterRollText>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Column 3: 02 / Portals & Resources (2 cols) */}
              <div className="lg:col-span-2 border-t border-navy-800/60 lg:border-t-0 pt-4 lg:pt-0">
                <button
                  type="button"
                  onClick={() => toggleAccordion("02")}
                  className="w-full min-h-[44px] flex items-center justify-between text-left group lg:pointer-events-none mb-2 lg:mb-4 focus:outline-none py-1 cursor-pointer"
                  aria-expanded={openAccordions["02"]}
                >
                  <h4 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-400 flex items-center gap-1.5">
                    <span className="font-mono text-[10px] text-brass-500/80">02 /</span>
                    <span>Portals</span>
                  </h4>
                  <ChevronDown
                    className={`w-4 h-4 text-brass-400 lg:hidden transition-transform duration-300 ${
                      openAccordions["02"] ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openAccordions["02"] ? "max-h-[500px] opacity-100" : "max-h-0 lg:max-h-none opacity-0 lg:opacity-100"
                  }`}
                >
                  <ul className="space-y-2.5 font-sans text-xs text-slate-300 pt-1 lg:pt-0">
                    <li>
                      <Link href="/about" className="hover:text-brass-300 transition-colors inline-flex items-center gap-1.5 group">
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brass-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                        <FooterRollText>About Our Firm</FooterRollText>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services" className="hover:text-brass-300 transition-colors inline-flex items-center gap-1.5 group">
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brass-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                        <FooterRollText>Services Directory</FooterRollText>
                      </Link>
                    </li>
                    <li>
                      <Link href="/posh" className="hover:text-brass-300 transition-colors inline-flex items-center gap-1.5 group">
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brass-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                        <FooterRollText>POSH Act Hub</FooterRollText>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="hover:text-brass-300 transition-colors inline-flex items-center gap-1.5 group">
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brass-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                        <FooterRollText>Insights &amp; Articles</FooterRollText>
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq" className="hover:text-brass-300 transition-colors inline-flex items-center gap-1.5 group">
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brass-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                        <FooterRollText>Statutory Guidance FAQ</FooterRollText>
                      </Link>
                    </li>
                    <li>
                      <Link href="/request-service" className="hover:text-brass-300 transition-colors inline-flex items-center gap-1.5 group">
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brass-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                        <FooterRollText>Consultation Intake</FooterRollText>
                      </Link>
                    </li>
                    <li>
                      <Link href="/pay" className="hover:text-brass-300 transition-colors inline-flex items-center gap-1.5 group">
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brass-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                        <FooterRollText>Online Settlement</FooterRollText>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Column 4: 03 / Chambers Location (3 cols) */}
              <div className="lg:col-span-3 border-t border-navy-800/60 lg:border-t-0 pt-4 lg:pt-0">
                <button
                  type="button"
                  onClick={() => toggleAccordion("03")}
                  className="w-full min-h-[44px] flex items-center justify-between text-left group lg:pointer-events-none mb-2 lg:mb-4 focus:outline-none py-1 cursor-pointer"
                  aria-expanded={openAccordions["03"]}
                >
                  <h4 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-400 flex items-center gap-1.5">
                    <span className="font-mono text-[10px] text-brass-500/80">03 /</span>
                    <span>Chambers Location</span>
                  </h4>
                  <ChevronDown
                    className={`w-4 h-4 text-brass-400 lg:hidden transition-transform duration-300 ${
                      openAccordions["03"] ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openAccordions["03"] ? "max-h-[500px] opacity-100" : "max-h-0 lg:max-h-none opacity-0 lg:opacity-100"
                  }`}
                >
                  <div className="space-y-3 font-sans text-xs text-slate-300 pt-1 lg:pt-0">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-brass-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        {siteConfig?.addressLine1 || BRAND_CONFIG.address.line1}
                        {siteConfig?.addressLine2 || BRAND_CONFIG.address.line2 ? `, ${siteConfig?.addressLine2 || BRAND_CONFIG.address.line2}` : ""}, {siteConfig?.city || BRAND_CONFIG.address.city} {siteConfig?.postalCode || BRAND_CONFIG.address.postalCode}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-brass-400 shrink-0" />
                      <a href={`tel:${siteConfig?.receptionPhone || BRAND_CONFIG.phone}`} className="hover:text-brass-300 transition-colors">
                        {siteConfig?.receptionPhone || BRAND_CONFIG.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-brass-400 shrink-0" />
                      <a href={`mailto:${siteConfig?.primaryEmail || BRAND_CONFIG.email}`} className="hover:text-brass-300 transition-colors">
                        {siteConfig?.primaryEmail || BRAND_CONFIG.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-brass-400 shrink-0" />
                      <span>{siteConfig?.operatingHours || "Mon – Sat: 9:30 AM – 7:30 PM IST"}</span>
                    </div>

                    {/* Real-time Map Sync Trigger */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setShowMapModal(true)}
                        className="w-full inline-flex items-center justify-between gap-2 px-3 py-2.5 min-h-[44px] rounded-md bg-navy-900 hover:bg-navy-800 border border-brass-500/30 text-brass-300 text-xs font-semibold tracking-wide transition group shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-brass-400 animate-pulse" />
                          <span className="text-[11px] font-sans">Chambers Map</span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-brass-400 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Fold Strip (at the boundary where the user drew the red line) */}
          <div className="border-t border-navy-800/80 bg-navy-950/70 py-2.5 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
              <span className="text-[11px] font-mono tracking-wider text-slate-400 uppercase">
                Acorn Legal Consultants &bull; Practice &amp; Advisory Directory
              </span>
              <button
                type="button"
                id="footer-directory-fold-btn"
                onClick={toggleFooterBody}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-navy-900 hover:bg-navy-800 border border-brass-500/30 hover:border-brass-400 text-brass-300 hover:text-white text-[11px] font-sans font-medium transition group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass-500"
                title="Roll fold directory"
              >
                <span>Fold Directory</span>
                <ChevronDown className="w-3.5 h-3.5 text-brass-400 rotate-180 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Aesthetic Brand Watermark */}
          <div className="border-t border-navy-800/50 bg-ink-950/90 overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center pointer-events-none select-none" aria-hidden="true">
              <span className="font-serif text-[clamp(3.5rem,10vw,7.5rem)] font-black tracking-[0.16em] text-slate-400/20 sm:text-slate-300/25 leading-none block select-none uppercase drop-shadow-[0_4px_24px_rgba(255,255,255,0.02)]">
                ACORN
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. STATIC LOWER FOOTER SECTION (ALWAYS ANCHORED)
         ───────────────────────────────────────────────────────────── */}
      <div className="border-t border-navy-800 bg-ink-950 relative z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.35)]">

        {/* Upper Tier: Clock, Scope Ticker & Rolling Directory Toggle Controller */}
        <div className="border-b border-navy-800/80 bg-navy-950/80 py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">

            {/* Live IST Chambers Clock */}
            <div className="flex items-center gap-3">
              <FooterClock />
              <span className="hidden md:inline text-navy-700 select-none">&bull;</span>
              <span className="hidden md:inline text-[11px] font-mono text-slate-400 tracking-wider">
                CALCUTTA HIGH COURT JURISDICTION
              </span>
            </div>

            {/* Scope Category Badges */}
            <div className="hidden lg:flex items-center gap-2 text-[10px] font-sans font-semibold tracking-[0.18em] uppercase text-brass-400/90">
              <span>DISPUTES</span>
              <span className="text-navy-700 select-none">&bull;</span>
              <span>CORPORATE GOVERNANCE</span>
              <span className="text-navy-700 select-none">&bull;</span>
              <span>POSH REDRESSAL</span>
              <span className="text-navy-700 select-none">&bull;</span>
              <span>CONVEYANCING</span>
            </div>

            {/* Rolling Collapsible Toggle Button */}
            <button
              type="button"
              id="footer-directory-toggle-btn"
              onClick={toggleFooterBody}
              aria-expanded={isBodyOpen}
              aria-controls="footer-directory-body"
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full bg-navy-900 hover:bg-navy-800 border border-brass-500/40 hover:border-brass-400 text-brass-300 hover:text-white text-[11px] font-semibold tracking-wider uppercase transition-all shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 cursor-pointer"
            >
              <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isBodyOpen ? "bg-brass-400" : "bg-emerald-400 animate-pulse"}`} />
              <span>{isBodyOpen ? "Collapse Directory" : "Expand Directory"}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-brass-400 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isBodyOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

          </div>
        </div>

        {/* Lower Tier: Copyright, Legal Navigation Links & Back-To-Top */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-400">

          {/* Copyright */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span className="text-slate-300 font-semibold tracking-wide text-[11px] sm:text-xs">
              &copy; {new Date().getFullYear()} ACORN LEGAL CONSULTANTS
            </span>
            <span className="hidden sm:inline text-navy-700 select-none">&bull;</span>
            <span className="hidden sm:inline text-[11px] text-slate-400">
              Kolkata Chambers
            </span>
          </div>

          {/* Legal Navigation Links with Rollable Text */}
          <div className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 text-[11px] text-slate-400">
            <Link href="/privacy" className="hover:text-brass-300 transition group inline-flex items-center min-h-[36px] sm:min-h-0 py-1 px-1">
              <FooterRollText>Privacy Policy</FooterRollText>
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/terms" className="hover:text-brass-300 transition group inline-flex items-center min-h-[36px] sm:min-h-0 py-1 px-1">
              <FooterRollText>Terms</FooterRollText>
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/cookies" className="hover:text-brass-300 transition group inline-flex items-center min-h-[36px] sm:min-h-0 py-1 px-1">
              <FooterRollText>Cookie Policy</FooterRollText>
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/refund-policy" className="hover:text-brass-300 transition group inline-flex items-center min-h-[36px] sm:min-h-0 py-1 px-1">
              <FooterRollText>Refund Policy</FooterRollText>
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/disclaimer" className="hover:text-brass-300 transition group inline-flex items-center min-h-[36px] sm:min-h-0 py-1 px-1">
              <FooterRollText>Disclaimer</FooterRollText>
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/verify" className="hover:text-brass-300 transition group inline-flex items-center min-h-[36px] sm:min-h-0 py-1 px-1">
              <FooterRollText>Verification</FooterRollText>
            </Link>
          </div>

          {/* Back-To-Top Button */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={scrollToTop}
              title="Return to top of page"
              aria-label="Scroll back to top of page"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-navy-900 border border-brass-500/35 hover:border-brass-400 text-brass-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm group hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 cursor-pointer"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. REALTIME SYNCHRONIZED CHAMBERS MAP MODAL
         ───────────────────────────────────────────────────────────── */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-card overflow-hidden shadow-2xl border border-navy-800 animate-in fade-in zoom-in-95 duration-200">
            <div className="absolute top-3 right-3 z-30">
              <button
                type="button"
                onClick={() => setShowMapModal(false)}
                className="w-8 h-8 rounded-full bg-navy-950/90 hover:bg-navy-900 text-white flex items-center justify-center border border-brass-500/40 shadow-lg text-sm font-bold transition"
                aria-label="Close Map Modal"
              >
                &times;
              </button>
            </div>
            <ChambersMap />
          </div>
        </div>
      )}

    </footer>
  );
}
