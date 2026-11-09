"use client";

import React, { useState } from "react";
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
  ArrowUpRight,
} from "lucide-react";
import { BRAND_CONFIG, PRACTICE_AREAS } from "@/lib/constants";
import { FooterClock } from "@/components/footer-roll-text";
import { useRealtimeSiteConfig, useRealtimeServices } from "@/lib/realtime";

export function Footer() {
  const pathname = usePathname();
  const safePath = typeof pathname === "string" ? pathname : "";
  const siteConfig = useRealtimeSiteConfig();
  const customServices = useRealtimeServices();

  // Accordion state for mobile/tablet collapsible sections
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

  // Suppress footer on administrative and console workspaces
  const isAdminOrConsole =
    safePath.startsWith("/admin") ||
    safePath.startsWith("/posh/admin") ||
    safePath.startsWith("/posh/ic") ||
    safePath.startsWith("/posh/org");

  if (isAdminOrConsole) {
    return null;
  }

  const dynamicPractices =
    customServices && customServices.length > 0
      ? customServices.map((s) => ({
          slug: s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          title: s.name,
        }))
      : PRACTICE_AREAS;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#040914] text-white border-t border-navy-800/80 overflow-hidden font-sans">
      
      {/* ─────────────────────────────────────────────────────────────
          1. UPPER SECTION: LUXURY CHAMBERS DIRECTORY
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 lg:pb-16">
        
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

          {/* Column 2: 01 / Practice Areas (3 cols) */}
          <div className="lg:col-span-3 border-t border-navy-800/60 lg:border-t-0 pt-4 lg:pt-0">
            <button
              type="button"
              onClick={() => toggleAccordion("01")}
              className="w-full flex items-center justify-between text-left group lg:pointer-events-none mb-3 lg:mb-4 focus:outline-none bg-transparent border-0 p-0 cursor-pointer lg:cursor-default"
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
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openAccordions["01"] ? "max-h-[500px] opacity-100" : "max-h-0 lg:max-h-none opacity-0 lg:opacity-100"
              }`}
            >
              <ul className="space-y-2.5 font-sans text-xs text-slate-300 pt-1 lg:pt-0 list-none p-0 m-0">
                {dynamicPractices.slice(0, 6).map((pa) => (
                  <li key={pa.slug}>
                    <Link
                      href={`/services/${pa.slug}`}
                      className="hover:text-brass-300 transition-colors inline-flex items-center gap-2 group text-slate-300 no-underline"
                    >
                      <span className="w-1 h-1 rounded-full bg-navy-600 group-hover:bg-brass-400 transition-colors shrink-0" />
                      <span>{pa.title}</span>
                      <ArrowUpRight className="w-3 h-3 text-brass-500/40 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 -ml-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: 02 / Chambers Portals (2 cols) */}
          <div className="lg:col-span-2 border-t border-navy-800/60 lg:border-t-0 pt-4 lg:pt-0">
            <button
              type="button"
              onClick={() => toggleAccordion("02")}
              className="w-full flex items-center justify-between text-left group lg:pointer-events-none mb-3 lg:mb-4 focus:outline-none bg-transparent border-0 p-0 cursor-pointer lg:cursor-default"
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
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openAccordions["02"] ? "max-h-[500px] opacity-100" : "max-h-0 lg:max-h-none opacity-0 lg:opacity-100"
              }`}
            >
              <ul className="space-y-2.5 font-sans text-xs text-slate-300 pt-1 lg:pt-0 list-none p-0 m-0">
                <li>
                  <Link href="/about" className="hover:text-brass-300 transition-colors inline-flex items-center gap-1.5 group text-slate-300 no-underline">
                    <span className="w-1 h-1 rounded-full bg-navy-600 group-hover:bg-brass-400 transition-colors shrink-0" />
                    <span>About Our Firm</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-brass-300 transition-colors inline-flex items-center gap-1.5 group text-slate-300 no-underline">
                    <span className="w-1 h-1 rounded-full bg-navy-600 group-hover:bg-brass-400 transition-colors shrink-0" />
                    <span>Services Directory</span>
                  </Link>
                </li>
                <li>
                  <Link href="/posh" className="hover:text-brass-300 transition-colors inline-flex items-center gap-1.5 group text-slate-300 no-underline">
                    <span className="w-1 h-1 rounded-full bg-navy-600 group-hover:bg-brass-400 transition-colors shrink-0" />
                    <span>POSH Act Hub</span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-brass-300 transition-colors inline-flex items-center gap-1.5 group text-slate-300 no-underline">
                    <span className="w-1 h-1 rounded-full bg-navy-600 group-hover:bg-brass-400 transition-colors shrink-0" />
                    <span>Insights &amp; Articles</span>
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-brass-300 transition-colors inline-flex items-center gap-1.5 group text-slate-300 no-underline">
                    <span className="w-1 h-1 rounded-full bg-navy-600 group-hover:bg-brass-400 transition-colors shrink-0" />
                    <span>Statutory FAQ</span>
                  </Link>
                </li>
                <li>
                  <Link href="/request-service" className="hover:text-brass-300 transition-colors inline-flex items-center gap-1.5 group text-slate-300 no-underline">
                    <span className="w-1 h-1 rounded-full bg-brass-500/70 shrink-0" />
                    <span>Consultation Intake</span>
                  </Link>
                </li>
                <li>
                  <Link href="/pay" className="hover:text-brass-300 transition-colors inline-flex items-center gap-1.5 group text-slate-300 no-underline">
                    <span className="w-1 h-1 rounded-full bg-brass-500/70 shrink-0" />
                    <span>Online Settlement</span>
                  </Link>
                </li>
                <li>
                  <Link href="/verify" className="hover:text-brass-300 transition-colors inline-flex items-center gap-1.5 group text-slate-300 no-underline">
                    <span className="w-1 h-1 rounded-full bg-brass-500/70 shrink-0" />
                    <span>Certificate Registry</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: 03 / Location & Contact (3 cols) */}
          <div className="lg:col-span-3 border-t border-navy-800/60 lg:border-t-0 pt-4 lg:pt-0">
            <button
              type="button"
              onClick={() => toggleAccordion("03")}
              className="w-full flex items-center justify-between text-left group lg:pointer-events-none mb-3 lg:mb-4 focus:outline-none bg-transparent border-0 p-0 cursor-pointer lg:cursor-default"
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
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
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
                  <a href={`tel:${siteConfig?.receptionPhone || BRAND_CONFIG.phone}`} className="hover:text-brass-300 transition-colors text-slate-300 no-underline">
                    {siteConfig?.receptionPhone || BRAND_CONFIG.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-brass-400 shrink-0" />
                  <a href={`mailto:${siteConfig?.primaryEmail || BRAND_CONFIG.email}`} className="hover:text-brass-300 transition-colors text-slate-300 no-underline">
                    {siteConfig?.primaryEmail || BRAND_CONFIG.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-brass-400 shrink-0" />
                  <span>{siteConfig?.operatingHours || "Mon – Sat: 9:30 AM – 7:30 PM IST"}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. ACCENT DIVIDER LINE WITH BRASS DIAMOND CREST
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full border-t border-navy-800/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute left-1/2 -top-[5px] -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[#040914] border border-brass-500/50 flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-brass-400" />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. STATUTORY DISCLOSURES & REGULATORY GOVERNANCE TRAY
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 bg-[#050C17]/95 border-t border-brass-500/15">
        
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 space-y-5">
          
          {/* Header Row & Compliance Badges */}
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

          {/* Legal Navigation Links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-300 font-sans">
            <Link href="/privacy" className="hover:text-brass-300 transition-colors text-slate-300 no-underline">
              Privacy Policy
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/terms" className="hover:text-brass-300 transition-colors text-slate-300 no-underline">
              Terms of Engagement
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/cookies" className="hover:text-brass-300 transition-colors text-slate-300 no-underline">
              Cookie Policy
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/refund-policy" className="hover:text-brass-300 transition-colors text-slate-300 no-underline">
              Refund Policy
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/disclaimer" className="hover:text-brass-300 transition-colors text-slate-300 no-underline">
              Bar Council Disclaimer
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/design-system" className="hover:text-brass-300 transition-colors text-slate-300 no-underline">
              Design System
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/verify" className="hover:text-brass-300 transition-colors text-slate-300 no-underline">
              Verification Portal
            </Link>
          </div>

          {/* Bar Council Professional Disclaimer Box */}
          <div className="bg-[#071120] p-3.5 sm:p-4 rounded-card border border-navy-800 text-[11px] text-slate-300 leading-relaxed shadow-inner">
            <p>
              <strong className="text-brass-300 font-semibold">Regulatory Notice:</strong>{" "}
              {siteConfig?.disclaimer || "The information on this website is for general information only and does not constitute legal advice or create a lawyer-client relationship. Under the rules of the Bar Council of India, law firms and legal practitioners are not permitted to solicit work or advertise."}
            </p>
          </div>

          {/* High-Contrast Naked-Eye Visible ACORN Watermark */}
          <div
            className="w-full text-center pointer-events-none select-none overflow-hidden pt-4 -mb-2"
            aria-hidden="true"
          >
            <span className="font-serif text-[clamp(3.5rem,10vw,7.5rem)] font-black tracking-[0.16em] text-brass-400/25 sm:text-brass-400/30 leading-none block select-none uppercase drop-shadow-[0_4px_24px_rgba(197,160,89,0.2)]">
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
            5. LOWER BASE BAR
           ───────────────────────────────────────────────────────────── */}
        <div className="relative z-30 bg-[#03070F] border-t border-navy-900/90">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-sans">
            
            {/* Copyright & Live Chamber Clock */}
            <div className="flex flex-wrap items-center gap-3 text-slate-400">
              <span className="text-slate-300 font-semibold tracking-wide text-[11px] sm:text-xs">
                &copy; {currentYear} ACORN LEGAL CONSULTANTS
              </span>
              <span className="text-navy-700 select-none">&bull;</span>
              <FooterClock />
              <span className="hidden sm:inline text-navy-700 select-none">&bull;</span>
              <span className="hidden sm:inline text-[11px] text-slate-400">
                Calcutta High Court Jurisdiction
              </span>
            </div>

            {/* Center Quick Legal Links */}
            <div className="hidden lg:flex items-center gap-4 text-[11px] text-slate-400">
              <Link href="/privacy" className="hover:text-brass-300 transition-colors text-slate-400 no-underline">
                Privacy
              </Link>
              <span className="text-navy-700">&bull;</span>
              <Link href="/terms" className="hover:text-brass-300 transition-colors text-slate-400 no-underline">
                Terms
              </Link>
              <span className="text-navy-700">&bull;</span>
              <Link href="/disclaimer" className="hover:text-brass-300 transition-colors text-slate-400 no-underline">
                Bar Notice
              </Link>
              <span className="text-navy-700">&bull;</span>
              <Link href="/verify" className="hover:text-brass-300 transition-colors text-slate-400 no-underline">
                Verification
              </Link>
            </div>

            {/* Right Action Control: Back-To-Top */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={scrollToTop}
                title="Return to top of page"
                aria-label="Scroll back to top of page"
                className="w-8 h-8 rounded-full bg-[#101F38] border border-brass-500/35 hover:border-brass-400 text-brass-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm group hover:scale-105 cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </footer>
  );
}
