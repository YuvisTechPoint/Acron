"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  ShieldCheck,
  Scale,
  FileCheck,
  ArrowUp,
  ExternalLink,
} from "lucide-react";
import { BRAND_CONFIG, PRACTICE_AREAS } from "@/lib/constants";
import { FooterClock, FooterRollText } from "@/components/footer-roll-text";
import { ChambersMap } from "@/components/chambers-map";
import { platformStore } from "@/lib/store";

export function Footer() {
  const pathname = usePathname();
  const safePath = typeof pathname === "string" ? pathname : "";
  const [siteConfig, setSiteConfig] = useState(() => platformStore.getSiteConfig());
  const [showMapModal, setShowMapModal] = useState(false);

  // Accordion state for mobile/tablet Vibe-style foldable sections
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    "01": true,
    "02": false,
    "03": false,
  });

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    setSiteConfig(platformStore.getSiteConfig());
  }, []);

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
    <footer className="relative bg-[#040914] text-white border-t border-navy-800/80">
      
      {/* ─────────────────────────────────────────────────────────────
          1. UPPER SECTION: LUXURY CHAMBERS DIRECTORY
          - On desktop (lg+): Full 4-column editorial directory with
            kinetic vertical rolling text (Vibe Music style).
          - On mobile/tablet (<lg): Foldable numbered accordion tiers
            (01 / Practice Areas, 02 / Portals, 03 / Location).
          - Rolls smoothly down and collides flush directly above the
            static lower governance tray as the user reaches the footer.
         ───────────────────────────────────────────────────────────── */}
      <div className="footer-upper-directory relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12">
        
        {/* 4-COLUMN CHAMBERS DIRECTORY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Identity & Chambers Ethos (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group focus:outline-none">
              <div className="w-10 h-10 rounded-md bg-[#101F38] border border-brass-500/40 flex items-center justify-center text-brass-300 group-hover:border-brass-400 transition-colors shadow-inner">
                <span className="font-serif text-2xl font-bold leading-none select-none text-brass-300">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                  ACORN
                </span>
                <span className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-brass-300 mt-1">
                  Legal Consultants
                </span>
              </div>
            </Link>

            <p className="font-sans text-xs text-slate-300 leading-relaxed max-w-sm">
              A specialized legal consultancy in Kolkata delivering thoughtful, precise, and result-oriented solutions for corporate governance, commercial contracts, regulatory affairs, and institutional integrity.
            </p>

            <div className="pt-2 text-xs text-brass-300 font-serif italic">
              &ldquo;Excellence in Law. Integrity in Practice.&rdquo;
            </div>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-brass-500" />
              <span>Calcutta High Court Bar Association Jurisdiction</span>
            </div>
          </div>

          {/* Column 2: 01 / Practice Areas with Foldable Mobile Accordion (3 cols) */}
          <div className="lg:col-span-3 border-t border-navy-800/60 lg:border-t-0 pt-4 lg:pt-0">
            <button
              type="button"
              onClick={() => toggleAccordion("01")}
              className="w-full flex items-center justify-between text-left group lg:pointer-events-none mb-3 lg:mb-4 focus:outline-none"
              aria-expanded={openAccordions["01"]}
            >
              <h4 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-400 flex items-center gap-2">
                <span className="w-3 h-[1px] bg-brass-500" />
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
              className={`footer-accordion-panel transition-all duration-300 ease-in-out overflow-hidden ${
                openAccordions["01"] ? "max-h-[500px] opacity-100" : "max-h-0 lg:max-h-none opacity-0 lg:opacity-100"
              }`}
            >
              <ul className="space-y-2.5 font-sans text-xs text-slate-300 pt-1 lg:pt-0">
                {PRACTICE_AREAS.slice(0, 6).map((pa) => (
                  <li key={pa.slug}>
                    <Link
                      href={`/services/${pa.slug}`}
                      className="hover:text-brass-300 transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-navy-600 group-hover:bg-brass-400 transition-colors shrink-0" />
                      <FooterRollText>{pa.title}</FooterRollText>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: 02 / Chambers Portals with Foldable Mobile Accordion (2 cols) */}
          <div className="lg:col-span-2 border-t border-navy-800/60 lg:border-t-0 pt-4 lg:pt-0">
            <button
              type="button"
              onClick={() => toggleAccordion("02")}
              className="w-full flex items-center justify-between text-left group lg:pointer-events-none mb-3 lg:mb-4 focus:outline-none"
              aria-expanded={openAccordions["02"]}
            >
              <h4 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-400 flex items-center gap-2">
                <span className="w-3 h-[1px] bg-brass-500" />
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
              className={`footer-accordion-panel transition-all duration-300 ease-in-out overflow-hidden ${
                openAccordions["02"] ? "max-h-[500px] opacity-100" : "max-h-0 lg:max-h-none opacity-0 lg:opacity-100"
              }`}
            >
              <ul className="space-y-2.5 font-sans text-xs text-slate-300 pt-1 lg:pt-0">
                <li>
                  <Link href="/about" className="hover:text-brass-300 transition-colors inline-flex items-center group">
                    <FooterRollText>About Our Firm</FooterRollText>
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-brass-300 transition-colors inline-flex items-center group">
                    <FooterRollText>Services Directory</FooterRollText>
                  </Link>
                </li>
                <li>
                  <Link href="/posh" className="hover:text-brass-300 transition-colors inline-flex items-center group">
                    <FooterRollText>POSH Act Hub</FooterRollText>
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-brass-300 transition-colors inline-flex items-center group">
                    <FooterRollText>Insights &amp; Articles</FooterRollText>
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-brass-300 transition-colors inline-flex items-center group">
                    <FooterRollText>Statutory Guidance FAQ</FooterRollText>
                  </Link>
                </li>
                <li>
                  <Link href="/request-service" className="hover:text-brass-300 transition-colors inline-flex items-center group">
                    <FooterRollText>Consultation Intake</FooterRollText>
                  </Link>
                </li>
                <li>
                  <Link href="/pay" className="hover:text-brass-300 transition-colors inline-flex items-center group">
                    <FooterRollText>Online Settlement</FooterRollText>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: 03 / Location & Contact with Foldable Mobile Accordion (3 cols) */}
          <div className="lg:col-span-3 border-t border-navy-800/60 lg:border-t-0 pt-4 lg:pt-0">
            <button
              type="button"
              onClick={() => toggleAccordion("03")}
              className="w-full flex items-center justify-between text-left group lg:pointer-events-none mb-3 lg:mb-4 focus:outline-none"
              aria-expanded={openAccordions["03"]}
            >
              <h4 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-400 flex items-center gap-2">
                <span className="w-3 h-[1px] bg-brass-500" />
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
              className={`footer-accordion-panel transition-all duration-300 ease-in-out overflow-hidden ${
                openAccordions["03"] ? "max-h-[500px] opacity-100" : "max-h-0 lg:max-h-none opacity-0 lg:opacity-100"
              }`}
            >
              <div className="space-y-3 font-sans text-xs text-slate-300 pt-1 lg:pt-0">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brass-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    {siteConfig?.addressLine1 || BRAND_CONFIG.address.line1}{siteConfig?.addressLine2 || BRAND_CONFIG.address.line2 ? `, ${siteConfig?.addressLine2 || BRAND_CONFIG.address.line2}` : ""}, {siteConfig?.city || BRAND_CONFIG.address.city} {siteConfig?.postalCode || BRAND_CONFIG.address.postalCode}
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
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowMapModal(true)}
                    className="w-full inline-flex items-center justify-between gap-2.5 px-3 py-2 rounded-md bg-[#101F38] hover:bg-[#162A4D] border border-brass-500/40 text-brass-300 text-xs font-semibold tracking-wide transition group shadow-inner"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brass-400 animate-pulse" />
                      <span className="text-[11px] font-sans">Live Chambers Map Sync</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-brass-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CIRCLED DIVIDER LINE & TRANSITION BOUNDARY
          This is the exact section circled by the user separating the
          upper chambers directory from the static lower disclosures dock.
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full border-t border-navy-800/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute left-1/2 -top-[5px] -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[#040914] border border-brass-500/50 flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-brass-400" />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. LOWER SECTION: STATICALLY DOCKED GOVERNANCE & TICKER TRAY
          "the lower section would be static and the above would be
           collidable above the static lower one."
          - Sticky docked at the bottom of the viewport (sticky bottom-0 z-20).
          - As the user scrolls, the upper directory collides flush above it.
          - High-contrast natural naked-eye visible "ACORN" watermark.
          - Continuous kinetic ticker ribbon.
          - Clean base bar with Chamber clock, Calcutta jurisdiction,
            quick links, and circular return-to-top (no collapse button).
         ───────────────────────────────────────────────────────────── */}
      <div className="footer-static-dock sticky bottom-0 z-20 bg-[#050C17]/95 backdrop-blur-md border-t border-brass-500/20 shadow-[0_-12px_36px_rgba(0,0,0,0.6)]">
        
        {/* STATUTORY DISCLOSURES & REGULATORY POLICIES */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-brass-400">
                STATUTORY DISCLOSURES &amp; REGULATORY COMPLIANCE
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                Chambers Governance &amp; Legal Policies
              </h3>
            </div>

            {/* Regulatory Badges */}
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-btn bg-[#101F38] border border-brass-500/25 text-brass-300">
                <Scale className="w-3.5 h-3.5 text-brass-400" />
                <span>Advocates Act, 1961</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-btn bg-[#101F38] border border-brass-500/25 text-brass-300">
                <ShieldCheck className="w-3.5 h-3.5 text-brass-400" />
                <span>Bar Council of West Bengal</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-btn bg-[#101F38] border border-brass-500/25 text-brass-300">
                <FileCheck className="w-3.5 h-3.5 text-brass-400" />
                <span>Client Trust Escrow</span>
              </span>
            </div>
          </div>

          {/* Legal Navigation Links with Rollable Text */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-300 font-sans">
            <Link href="/privacy" className="hover:text-brass-300 transition group inline-flex items-center">
              <FooterRollText>Privacy Policy</FooterRollText>
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/terms" className="hover:text-brass-300 transition group inline-flex items-center">
              <FooterRollText>Terms of Engagement</FooterRollText>
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/cookies" className="hover:text-brass-300 transition group inline-flex items-center">
              <FooterRollText>Cookie Policy</FooterRollText>
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/refund-policy" className="hover:text-brass-300 transition group inline-flex items-center">
              <FooterRollText>Refund Policy</FooterRollText>
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/disclaimer" className="hover:text-brass-300 transition group inline-flex items-center">
              <FooterRollText>Bar Council Disclaimer</FooterRollText>
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/design-system" className="hover:text-brass-300 transition group inline-flex items-center">
              <FooterRollText>Design System</FooterRollText>
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/verify" className="hover:text-brass-300 transition group inline-flex items-center">
              <FooterRollText>Verification Portal</FooterRollText>
            </Link>
          </div>

          {/* Bar Council Professional Disclaimer Box */}
          <div className="bg-[#091528] p-3 sm:p-3.5 rounded-card border border-navy-800 text-[11px] text-slate-300 leading-relaxed">
            <p>
              <strong className="text-brass-300 font-semibold">Regulatory Notice:</strong>{" "}
              {siteConfig?.disclaimer || "The information on this website is for general information only and does not constitute legal advice or create a lawyer-client relationship. Under the rules of the Bar Council of India, law firms and legal practitioners are not permitted to solicit work or advertise."}
            </p>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              HIGH-INTENSITY NAKED-EYE VISIBLE "ACORN" WORDMARK WATERMARK
              "The intensity of the text 'ACORN' should be high and
               naturally visible in naked eyes."
             ───────────────────────────────────────────────────────────── */}
          <div
            className="w-full text-center pointer-events-none select-none overflow-hidden pt-3 -mb-2"
            aria-hidden="true"
          >
            <span className="font-serif text-[clamp(4.5rem,13vw,9.5rem)] font-black tracking-[0.14em] text-brass-400/35 sm:text-brass-400/40 leading-none block select-none uppercase drop-shadow-[0_4px_30px_rgba(197,160,89,0.32)]">
              ACORN
            </span>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. KINETIC CONTINUOUS ROLL-TEXT TICKER RIBBON
           ───────────────────────────────────────────────────────────── */}
        <div
          className="footer-ticker-container relative z-20 border-t border-b border-navy-800/80 bg-[#060E1B] overflow-hidden py-2 select-none"
          aria-label="Chambers Statutory Continuous Roll"
        >
          <div className="footer-ticker-track flex items-center">
            <div className="flex shrink-0 items-center gap-8 px-4 text-xs font-serif italic text-brass-300/90 tracking-wider">
              <span>{siteConfig?.footerRollText || "Acorn Legal Consultants • Excellence in Law • Integrity in Practice • Calcutta High Court • POSH Act Advisory • Corporate Governance • Commercial Contracts • Arbitration & Mediation"}</span>
              <span className="text-brass-500/60 not-italic">✦</span>
              <span>{siteConfig?.footerRollText || "Acorn Legal Consultants • Excellence in Law • Integrity in Practice • Calcutta High Court • POSH Act Advisory • Corporate Governance • Commercial Contracts • Arbitration & Mediation"}</span>
              <span className="text-brass-500/60 not-italic">✦</span>
            </div>
            <div className="flex shrink-0 items-center gap-8 px-4 text-xs font-serif italic text-brass-300/90 tracking-wider" aria-hidden="true">
              <span>{siteConfig?.footerRollText || "Acorn Legal Consultants • Excellence in Law • Integrity in Practice • Calcutta High Court • POSH Act Advisory • Corporate Governance • Commercial Contracts • Arbitration & Mediation"}</span>
              <span className="text-brass-500/60 not-italic">✦</span>
              <span>{siteConfig?.footerRollText || "Acorn Legal Consultants • Excellence in Law • Integrity in Practice • Calcutta High Court • POSH Act Advisory • Corporate Governance • Commercial Contracts • Arbitration & Mediation"}</span>
              <span className="text-brass-500/60 not-italic">✦</span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            5. LOWER BASE BAR: NO "COLLAPSE DIRECTORY" BUTTON
            Includes Live Chamber Clock, Copyright, Calcutta Jurisdiction,
            Quick Links, and Smooth Back-To-Top button.
           ───────────────────────────────────────────────────────────── */}
        <div className="relative z-30 bg-[#050C17] border-t border-navy-800/90">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-sans">
            
            {/* Copyright & Live Chamber Clock */}
            <div className="flex flex-wrap items-center gap-3 text-slate-400">
              <span className="text-slate-300 font-semibold tracking-wide text-[11px] sm:text-xs">
                &copy; {new Date().getFullYear()} ACORN LEGAL CONSULTANTS
              </span>
              <span className="text-navy-700 select-none">&bull;</span>
              <FooterClock />
              <span className="hidden sm:inline text-navy-700 select-none">&bull;</span>
              <span className="hidden sm:inline text-[11px] text-slate-400">
                Calcutta High Court Jurisdiction
              </span>
            </div>

            {/* Center Quick Legal Links with Rollable Text */}
            <div className="hidden lg:flex items-center gap-4 text-[11px] text-slate-400">
              <Link href="/privacy" className="hover:text-brass-300 transition group inline-flex items-center">
                <FooterRollText>Privacy</FooterRollText>
              </Link>
              <span className="text-navy-700">&bull;</span>
              <Link href="/terms" className="hover:text-brass-300 transition group inline-flex items-center">
                <FooterRollText>Terms</FooterRollText>
              </Link>
              <span className="text-navy-700">&bull;</span>
              <Link href="/disclaimer" className="hover:text-brass-300 transition group inline-flex items-center">
                <FooterRollText>Bar Notice</FooterRollText>
              </Link>
              <span className="text-navy-700">&bull;</span>
              <Link href="/verify" className="hover:text-brass-300 transition group inline-flex items-center">
                <FooterRollText>Verification</FooterRollText>
              </Link>
            </div>

            {/* Right Action Control: Streamlined Back-To-Top Action ONLY */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={scrollToTop}
                title="Return to top of page"
                aria-label="Scroll back to top of page"
                className="w-8 h-8 rounded-full bg-[#101F38] border border-brass-500/35 hover:border-brass-400 text-brass-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm group hover:scale-105"
              >
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Realtime Synced Chambers Map Modal (Full Mobile Responsive) */}
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
