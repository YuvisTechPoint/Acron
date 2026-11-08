"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { BRAND_CONFIG, PRACTICE_AREAS } from "@/lib/constants";
import { FooterClock, FooterRollText } from "@/components/footer-roll-text";
import { useRealtimeSiteConfig, useRealtimeServices } from "@/lib/realtime";

export function Footer() {
  const pathname = usePathname();
  const siteConfig = useRealtimeSiteConfig();
  const customServices = useRealtimeServices();

  const dynamicPractices =
    customServices.length > 0
      ? customServices.map((s) => ({
          slug: s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          title: s.name,
        }))
      : PRACTICE_AREAS;

  // Suppress footer on administrative and console workspaces
  const isAdminOrConsole =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/posh/admin") ||
    pathname.startsWith("/posh/ic");

  if (isAdminOrConsole) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#070E1A] text-white border-t border-navy-800/80">
      
      {/* ─────────────────────────────────────────────────────────────
          1. UPPER SECTION: CHAMBERS DIRECTORY
          Clean, expansive, and fully scrollable all the way down.
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 bg-[#070E1A] border-b border-brass-500/20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-14 sm:pb-16">
          
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

              <div className="pt-1 text-xs text-brass-300/90 font-serif italic">
                &ldquo;Excellence in Law. Integrity in Practice.&rdquo;
              </div>

              <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-brass-400" />
                <span>Calcutta High Court Bar Association Jurisdiction</span>
              </div>
            </div>

            {/* Column 2: Practice Areas with Rollable Text (3 cols) */}
            <div className="lg:col-span-3">
              <h4 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-400 mb-4 flex items-center gap-2">
                <span className="w-3 h-[1px] bg-brass-500" />
                <span>Practice Areas</span>
              </h4>
              <ul className="space-y-2.5 font-sans text-xs text-slate-300">
                {dynamicPractices.slice(0, 6).map((pa) => (
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

            {/* Column 3: Chambers Portals with Rollable Text (2 cols) */}
            <div className="lg:col-span-2">
              <h4 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-400 mb-4 flex items-center gap-2">
                <span className="w-3 h-[1px] bg-brass-500" />
                <span>Portals</span>
              </h4>
              <ul className="space-y-2.5 font-sans text-xs text-slate-300">
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
                    <FooterRollText>Statutory Guidance</FooterRollText>
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

            {/* Column 4: Location & Contact (3 cols) */}
            <div className="lg:col-span-3">
              <h4 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-400 mb-4 flex items-center gap-2">
                <span className="w-3 h-[1px] bg-brass-500" />
                <span>Chambers Location</span>
              </h4>
              <div className="space-y-3 font-sans text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brass-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    {siteConfig.addressLine1}, {siteConfig.addressLine2}, {siteConfig.city} {siteConfig.postalCode}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brass-400 shrink-0" />
                  <a href={`tel:${siteConfig.receptionPhone || BRAND_CONFIG.phone}`} className="hover:text-brass-300 transition-colors">
                    {siteConfig.receptionPhone || BRAND_CONFIG.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-brass-400 shrink-0" />
                  <a href={`mailto:${siteConfig.primaryEmail || BRAND_CONFIG.email}`} className="hover:text-brass-300 transition-colors">
                    {siteConfig.primaryEmail || BRAND_CONFIG.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-brass-400 shrink-0" />
                  <span>{siteConfig.operatingHours || "Mon – Sat: 9:30 AM – 7:30 PM IST"}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MINIMALIST POLISHED BRAND & STATUTORY SECTION
          Naturally visible high-intensity ACORN watermark with
          clean, unobtrusive statutory regulatory disclosure.
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 bg-[#050C17] pt-8 pb-6 px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Radiant High-Intensity ACORN Watermark (Naturally visible to naked eyes) */}
        <div className="w-full text-center pointer-events-none select-none overflow-hidden pb-4" aria-hidden="true">
          <span className="font-serif text-[clamp(4.5rem,13vw,10.5rem)] font-extrabold tracking-[0.14em] bg-gradient-to-b from-[#FFFDF9] via-[#EBD5AC] to-[#B08D4C] bg-clip-text text-transparent leading-none block select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] [text-shadow:_0_2px_16px_rgba(201,160,89,0.35)]">
            ACORN
          </span>
        </div>

        {/* Quiet, Clean Bar Council Regulatory Notice */}
        <p className="text-[11px] font-sans text-slate-400 max-w-3xl mx-auto leading-relaxed">
          <span className="text-brass-300 font-medium">Regulatory Notice:</span>{" "}
          {siteConfig.disclaimer || "As per the rules of the Bar Council of India, law firms and legal practitioners are not permitted to solicit work or advertise. The information provided on this website is solely for informational purposes and does not constitute legal advice or create an advocate-client relationship."}
        </p>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. KINETIC CONTINUOUS ROLL-TEXT TICKER RIBBON
         ───────────────────────────────────────────────────────────── */}
      <div
        className="footer-ticker-container relative z-10 border-t border-b border-navy-800/80 bg-[#040812] overflow-hidden py-2.5 select-none"
        aria-label="Chambers Statutory Continuous Roll"
      >
        <div className="footer-ticker-track flex items-center">
          <div className="flex shrink-0 items-center gap-8 px-4 text-xs font-serif italic text-brass-300/90 tracking-wider">
            <span>{siteConfig.footerRollText || "Acorn Legal Consultants • Excellence in Law • Integrity in Practice • Calcutta High Court • POSH Act Advisory • Corporate Governance • Commercial Contracts • Arbitration & Mediation"}</span>
            <span className="text-brass-500/60 not-italic">✦</span>
            <span>{siteConfig.footerRollText || "Acorn Legal Consultants • Excellence in Law • Integrity in Practice • Calcutta High Court • POSH Act Advisory • Corporate Governance • Commercial Contracts • Arbitration & Mediation"}</span>
            <span className="text-brass-500/60 not-italic">✦</span>
          </div>
          <div className="flex shrink-0 items-center gap-8 px-4 text-xs font-serif italic text-brass-300/90 tracking-wider" aria-hidden="true">
            <span>{siteConfig.footerRollText || "Acorn Legal Consultants • Excellence in Law • Integrity in Practice • Calcutta High Court • POSH Act Advisory • Corporate Governance • Commercial Contracts • Arbitration & Mediation"}</span>
            <span className="text-brass-500/60 not-italic">✦</span>
            <span>{siteConfig.footerRollText || "Acorn Legal Consultants • Excellence in Law • Integrity in Practice • Calcutta High Court • POSH Act Advisory • Corporate Governance • Commercial Contracts • Arbitration & Mediation"}</span>
            <span className="text-brass-500/60 not-italic">✦</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. MINIMALIST POLISHED LOWER BASE BAR
          Copyright, Live Chamber Clock, Consolidated Legal Links, and Back to Top.
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 bg-[#03060E] py-4 px-4 sm:px-6 lg:px-8 border-t border-navy-800/80">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 text-xs font-sans">
          
          {/* Left: Copyright */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-slate-400">
            <span className="text-slate-300 font-semibold tracking-wide text-[11px] sm:text-xs">
              &copy; {new Date().getFullYear()} ACORN LEGAL CONSULTANTS
            </span>
          </div>

          {/* Center: Consolidated Clean Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-slate-400">
            <Link href="/privacy" className="hover:text-brass-300 transition group inline-flex items-center">
              <FooterRollText>Privacy</FooterRollText>
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/terms" className="hover:text-brass-300 transition group inline-flex items-center">
              <FooterRollText>Terms</FooterRollText>
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/cookies" className="hover:text-brass-300 transition group inline-flex items-center">
              <FooterRollText>Cookies</FooterRollText>
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/refund-policy" className="hover:text-brass-300 transition group inline-flex items-center">
              <FooterRollText>Refunds</FooterRollText>
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/disclaimer" className="hover:text-brass-300 transition group inline-flex items-center">
              <FooterRollText>Bar Notice</FooterRollText>
            </Link>
            <span className="text-navy-700 select-none">&bull;</span>
            <Link href="/verify" className="hover:text-brass-300 transition group inline-flex items-center">
              <FooterRollText>Verification</FooterRollText>
            </Link>
          </div>

          {/* Right: Regulatory Badges & Back to Top */}
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-500">
              <Scale className="w-3.5 h-3.5 text-brass-500/70" />
              <span>Advocates Act, 1961</span>
            </span>
            <span className="hidden md:inline text-navy-800 select-none">&bull;</span>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-brass-500/70" />
              <span>WB Bar Council</span>
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              title="Return to top of page"
              aria-label="Scroll back to top of page"
              className="w-8 h-8 rounded-full bg-[#101F38] border border-brass-500/35 hover:border-brass-400 text-brass-300 hover:text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm group ml-1"
            >
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
}
