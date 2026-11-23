"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  ChevronDown,
  ArrowUp,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  Scale,
  FileText,
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

  // Foldable accordion state for mobile/tablet screens within the directory
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-ink-950 text-white border-t border-navy-800 overflow-x-hidden">

      {/* ─────────────────────────────────────────────────────────────
          1. DIRECTORY BODY & CHAMBERS DISPATCH
         ───────────────────────────────────────────────────────────── */}
      <div id="footer-directory-body">
        <div className="overflow-hidden">
          {/* Main Directory Container */}
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12">

              {/* Column 1: Firm Identity & Chambers Ethos (4 cols on desktop) */}
              <div className="lg:col-span-4 space-y-4 sm:space-y-5">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 sm:gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 rounded-lg p-1 -m-1"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-navy-950 border border-brass-500/40 overflow-hidden flex items-center justify-center group-hover:border-brass-400 group-hover:ring-1 group-hover:ring-brass-400/40 transition-all shadow-inner shrink-0">
                    <Image
                      src="/brand/logo.png"
                      alt="Acorn Legal Consultants Crest"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight truncate">
                      {siteConfig?.firmName || "ACORN CONSULTANTS"}
                    </span>
                    <span className="font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] sm:tracking-[0.2em] uppercase text-brass-300 mt-1 leading-snug">
                      {siteConfig?.tagline || "Educational, Tax & Legal Consultants"}
                    </span>
                  </div>
                </Link>

                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm sm:max-w-md">
                  Over 15 years of dedicated expertise delivering comprehensive legal advocacy, 30-year property title investigation, society governance, document attestation, and educational consulting.
                </p>

                <div className="pt-0.5 text-xs sm:text-sm text-brass-300 font-serif italic">
                  &ldquo;Work done well, with a personal touch.&rdquo;
                </div>

                <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-brass-400 shrink-0" />
                  <span>Calcutta High Court Bar Association Jurisdiction</span>
                </div>

                {/* Mobile Quick Chambers Action Bar (Generous Touch Targets for Mobile) */}
                <div className="pt-2 sm:pt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 lg:hidden">
                  <a
                    href={`tel:${siteConfig?.receptionPhone || BRAND_CONFIG.phone}`}
                    className="min-h-[44px] px-3 py-2.5 rounded-md bg-navy-900/90 hover:bg-navy-800 border border-brass-500/30 text-brass-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition active:scale-[0.98]"
                    aria-label="Call Chambers Reception"
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0 text-brass-400" />
                    <span className="truncate">Call Chambers</span>
                  </a>

                  <a
                    href={`mailto:${siteConfig?.primaryEmail || BRAND_CONFIG.email}`}
                    className="min-h-[44px] px-3 py-2.5 rounded-md bg-navy-900/90 hover:bg-navy-800 border border-brass-500/30 text-brass-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition active:scale-[0.98]"
                    aria-label="Email Registry"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0 text-brass-400" />
                    <span className="truncate">Email Us</span>
                  </a>

                  <Link
                    href="/request-service"
                    className="col-span-2 sm:col-span-1 min-h-[44px] px-3 py-2.5 rounded-md bg-navy-800/90 hover:bg-navy-700 border border-brass-400/50 text-brass-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition active:scale-[0.98]"
                  >
                    <FileText className="w-3.5 h-3.5 shrink-0 text-brass-300" />
                    <span>Intake Request</span>
                  </Link>
                </div>
              </div>

              {/* Column 2: 01 / Practice Areas (3 cols on desktop) */}
              <div className="lg:col-span-3 border-t border-navy-800/80 lg:border-t-0 pt-3 sm:pt-4 lg:pt-0">
                <button
                  type="button"
                  id="accordion-header-01"
                  aria-controls="accordion-panel-01"
                  aria-expanded={openAccordions["01"]}
                  onClick={() => toggleAccordion("01")}
                  className="w-full min-h-[48px] flex items-center justify-between text-left group lg:pointer-events-none mb-1 lg:mb-4 px-2 sm:px-3 -mx-2 sm:-mx-3 rounded-lg hover:bg-navy-900/50 active:bg-navy-900/70 lg:hover:bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 cursor-pointer"
                >
                  <h4 className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-brass-400 flex items-center gap-1.5">
                    <span className="font-mono text-[10px] text-brass-500/80">01 /</span>
                    <span>Practice Areas</span>
                  </h4>
                  <div className="flex items-center gap-2 lg:hidden">
                    <span className="text-[10px] font-mono font-medium text-slate-400 bg-navy-900 px-2 py-0.5 rounded-full border border-navy-800">
                      6 Areas
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-brass-400 transition-transform duration-300 ${
                        openAccordions["01"] ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                <div
                  id="accordion-panel-01"
                  role="region"
                  aria-labelledby="accordion-header-01"
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openAccordions["01"] ? "max-h-[500px] opacity-100" : "max-h-0 lg:max-h-none opacity-0 lg:opacity-100"
                  }`}
                >
                  <ul className="space-y-1 sm:space-y-1.5 lg:space-y-2.5 font-sans text-xs sm:text-[13px] text-slate-300 pt-1 lg:pt-0">
                    {PRACTICE_AREAS.slice(0, 6).map((pa) => (
                      <li key={pa.slug}>
                        <Link
                          href={`/services/${pa.slug}`}
                          className="w-full min-h-[44px] lg:min-h-0 py-2 sm:py-2.5 lg:py-0 px-2 sm:px-2.5 lg:px-0 -mx-2 sm:-mx-2.5 lg:mx-0 rounded-md hover:bg-navy-900/40 lg:hover:bg-transparent hover:text-brass-300 transition-colors flex items-center gap-2 group active:text-brass-200"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brass-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                          <span className="truncate">
                            <FooterRollText>{pa.title}</FooterRollText>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Column 3: 02 / Portals & Resources (2 cols on desktop) */}
              <div className="lg:col-span-2 border-t border-navy-800/80 lg:border-t-0 pt-3 sm:pt-4 lg:pt-0">
                <button
                  type="button"
                  id="accordion-header-02"
                  aria-controls="accordion-panel-02"
                  aria-expanded={openAccordions["02"]}
                  onClick={() => toggleAccordion("02")}
                  className="w-full min-h-[48px] flex items-center justify-between text-left group lg:pointer-events-none mb-1 lg:mb-4 px-2 sm:px-3 -mx-2 sm:-mx-3 rounded-lg hover:bg-navy-900/50 active:bg-navy-900/70 lg:hover:bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 cursor-pointer"
                >
                  <h4 className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-brass-400 flex items-center gap-1.5">
                    <span className="font-mono text-[10px] text-brass-500/80">02 /</span>
                    <span>Portals</span>
                  </h4>
                  <div className="flex items-center gap-2 lg:hidden">
                    <span className="text-[10px] font-mono font-medium text-slate-400 bg-navy-900 px-2 py-0.5 rounded-full border border-navy-800">
                      7 Hubs
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-brass-400 transition-transform duration-300 ${
                        openAccordions["02"] ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                <div
                  id="accordion-panel-02"
                  role="region"
                  aria-labelledby="accordion-header-02"
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openAccordions["02"] ? "max-h-[500px] opacity-100" : "max-h-0 lg:max-h-none opacity-0 lg:opacity-100"
                  }`}
                >
                  <ul className="space-y-1 sm:space-y-1.5 lg:space-y-2.5 font-sans text-xs sm:text-[13px] text-slate-300 pt-1 lg:pt-0">
                    <li>
                      <Link
                        href="/about"
                        className="w-full min-h-[44px] lg:min-h-0 py-2 sm:py-2.5 lg:py-0 px-2 sm:px-2.5 lg:px-0 -mx-2 sm:-mx-2.5 lg:mx-0 rounded-md hover:bg-navy-900/40 lg:hover:bg-transparent hover:text-brass-300 transition-colors flex items-center gap-2 group active:text-brass-200"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brass-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                        <span className="truncate">
                          <FooterRollText>About Our Firm</FooterRollText>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services"
                        className="w-full min-h-[44px] lg:min-h-0 py-2 sm:py-2.5 lg:py-0 px-2 sm:px-2.5 lg:px-0 -mx-2 sm:-mx-2.5 lg:mx-0 rounded-md hover:bg-navy-900/40 lg:hover:bg-transparent hover:text-brass-300 transition-colors flex items-center gap-2 group active:text-brass-200"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brass-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                        <span className="truncate">
                          <FooterRollText>Services Directory</FooterRollText>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/posh"
                        className="w-full min-h-[44px] lg:min-h-0 py-2 sm:py-2.5 lg:py-0 px-2 sm:px-2.5 lg:px-0 -mx-2 sm:-mx-2.5 lg:mx-0 rounded-md hover:bg-navy-900/40 lg:hover:bg-transparent hover:text-brass-300 transition-colors flex items-center gap-2 group active:text-brass-200"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brass-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                        <span className="truncate">
                          <FooterRollText>POSH Act Hub</FooterRollText>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/blog"
                        className="w-full min-h-[44px] lg:min-h-0 py-2 sm:py-2.5 lg:py-0 px-2 sm:px-2.5 lg:px-0 -mx-2 sm:-mx-2.5 lg:mx-0 rounded-md hover:bg-navy-900/40 lg:hover:bg-transparent hover:text-brass-300 transition-colors flex items-center gap-2 group active:text-brass-200"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brass-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                        <span className="truncate">
                          <FooterRollText>Insights &amp; Articles</FooterRollText>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/faq"
                        className="w-full min-h-[44px] lg:min-h-0 py-2 sm:py-2.5 lg:py-0 px-2 sm:px-2.5 lg:px-0 -mx-2 sm:-mx-2.5 lg:mx-0 rounded-md hover:bg-navy-900/40 lg:hover:bg-transparent hover:text-brass-300 transition-colors flex items-center gap-2 group active:text-brass-200"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brass-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                        <span className="truncate">
                          <FooterRollText>Statutory Guidance FAQ</FooterRollText>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/request-service"
                        className="w-full min-h-[44px] lg:min-h-0 py-2 sm:py-2.5 lg:py-0 px-2 sm:px-2.5 lg:px-0 -mx-2 sm:-mx-2.5 lg:mx-0 rounded-md hover:bg-navy-900/40 lg:hover:bg-transparent hover:text-brass-300 transition-colors flex items-center gap-2 group active:text-brass-200"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brass-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                        <span className="truncate">
                          <FooterRollText>Consultation Intake</FooterRollText>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/pay"
                        className="w-full min-h-[44px] lg:min-h-0 py-2 sm:py-2.5 lg:py-0 px-2 sm:px-2.5 lg:px-0 -mx-2 sm:-mx-2.5 lg:mx-0 rounded-md hover:bg-navy-900/40 lg:hover:bg-transparent hover:text-brass-300 transition-colors flex items-center gap-2 group active:text-brass-200"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brass-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                        <span className="truncate">
                          <FooterRollText>Online Settlement</FooterRollText>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Column 4: 03 / Chambers Location (3 cols on desktop) */}
              <div className="lg:col-span-3 border-t border-navy-800/80 lg:border-t-0 pt-3 sm:pt-4 lg:pt-0">
                <button
                  type="button"
                  id="accordion-header-03"
                  aria-controls="accordion-panel-03"
                  aria-expanded={openAccordions["03"]}
                  onClick={() => toggleAccordion("03")}
                  className="w-full min-h-[48px] flex items-center justify-between text-left group lg:pointer-events-none mb-1 lg:mb-4 px-2 sm:px-3 -mx-2 sm:-mx-3 rounded-lg hover:bg-navy-900/50 active:bg-navy-900/70 lg:hover:bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 cursor-pointer"
                >
                  <h4 className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-brass-400 flex items-center gap-1.5">
                    <span className="font-mono text-[10px] text-brass-500/80">03 /</span>
                    <span>Chambers Location</span>
                  </h4>
                  <div className="flex items-center gap-2 lg:hidden">
                    <span className="text-[10px] font-mono font-medium text-brass-300 bg-navy-900 px-2 py-0.5 rounded-full border border-navy-800">
                      Kolkata
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-brass-400 transition-transform duration-300 ${
                        openAccordions["03"] ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                <div
                  id="accordion-panel-03"
                  role="region"
                  aria-labelledby="accordion-header-03"
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openAccordions["03"] ? "max-h-[500px] opacity-100" : "max-h-0 lg:max-h-none opacity-0 lg:opacity-100"
                  }`}
                >
                  <div className="space-y-2 sm:space-y-3 font-sans text-xs sm:text-[13px] text-slate-300 pt-1 lg:pt-0">
                    <div className="flex items-start gap-2.5 py-1 sm:py-0">
                      <MapPin className="w-4 h-4 text-brass-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        {siteConfig?.addressLine1 || BRAND_CONFIG.address.line1}
                        {siteConfig?.addressLine2 || BRAND_CONFIG.address.line2 ? `, ${siteConfig?.addressLine2 || BRAND_CONFIG.address.line2}` : ""}, {siteConfig?.city || BRAND_CONFIG.address.city} {siteConfig?.postalCode || BRAND_CONFIG.address.postalCode}
                      </span>
                    </div>

                    <a
                      href={`tel:${siteConfig?.receptionPhone || BRAND_CONFIG.phone}`}
                      className="min-h-[44px] lg:min-h-0 py-1.5 sm:py-1 lg:py-0 px-2 lg:px-0 -mx-2 lg:mx-0 rounded-md hover:bg-navy-900/40 lg:hover:bg-transparent flex items-center gap-2.5 text-slate-300 hover:text-brass-300 transition-colors"
                    >
                      <span className="text-[10px] font-mono font-bold text-brass-400 shrink-0 tracking-wider">TEL &bull;</span>
                      <span className="font-mono text-xs">{siteConfig?.receptionPhone || BRAND_CONFIG.phone}</span>
                    </a>

                    <a
                      href={`mailto:${siteConfig?.primaryEmail || BRAND_CONFIG.email}`}
                      className="min-h-[44px] lg:min-h-0 py-1.5 sm:py-1 lg:py-0 px-2 lg:px-0 -mx-2 lg:mx-0 rounded-md hover:bg-navy-900/40 lg:hover:bg-transparent flex items-center gap-2.5 text-slate-300 hover:text-brass-300 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-brass-400 shrink-0" />
                      <span className="truncate">{siteConfig?.primaryEmail || BRAND_CONFIG.email}</span>
                    </a>

                    <div className="flex items-center gap-2.5 py-1 sm:py-0">
                      <Clock className="w-4 h-4 text-brass-400 shrink-0" />
                      <span className="text-xs">{siteConfig?.operatingHours || "Mon – Sat: 9:30 AM – 7:30 PM IST"}</span>
                    </div>

                    {/* Real-time Map Sync Trigger */}
                    <div className="pt-2 sm:pt-3">
                      <button
                        type="button"
                        onClick={() => setShowMapModal(true)}
                        className="w-full inline-flex items-center justify-between gap-2 px-3.5 py-3 min-h-[48px] rounded-lg bg-navy-900 hover:bg-navy-800 border border-brass-500/30 text-brass-300 hover:text-white text-xs font-semibold tracking-wide transition group shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 active:scale-[0.99] cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-brass-400 animate-pulse" />
                          <span className="text-xs font-sans">Open Chambers Map</span>
                        </span>
                        <ExternalLink className="w-4 h-4 text-brass-400 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              2. MANDATORY BAR COUNCIL OF INDIA STATUTORY DISCLAIMER BOX
             ───────────────────────────────────────────────────────────── */}
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="rounded-lg sm:rounded-xl bg-navy-950/80 border border-navy-800/80 p-4 sm:p-5 lg:p-6 text-slate-400 text-[11px] sm:text-xs leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-brass-300 font-semibold tracking-wide uppercase text-[10px] sm:text-[11px]">
                <Scale className="w-3.5 h-3.5 text-brass-400 shrink-0" />
                <span>Bar Council of India Rule 36 Statutory Notice</span>
              </div>
              <p suppressHydrationWarning className="text-slate-300/90">
                {siteConfig?.disclaimer || BRAND_CONFIG.barCouncilNotice} All information on this website is provided solely for educational and statutory guidance purposes and should not be construed as legal advice or commercial solicitation.
              </p>
            </div>
          </div>

          {/* Aesthetic Brand Watermark (Responsive Clamped Font Size & Safe Margins) */}
          <div className="border-t border-navy-800/50 bg-ink-950/90 overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 text-center pointer-events-none select-none" aria-hidden="true">
              <span className="font-serif text-[clamp(2.75rem,14vw,7.5rem)] font-black tracking-[0.12em] sm:tracking-[0.16em] text-slate-400/20 sm:text-slate-300/25 leading-none block select-none uppercase drop-shadow-[0_4px_24px_rgba(255,255,255,0.02)]">
                ACORN
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. ANCHORED LOWER FOOTER BASE
         ───────────────────────────────────────────────────────────── */}
      <div className="border-t border-navy-800 bg-ink-950 relative z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.35)]">

        {/* Lower Tier: Copyright, Realtime Kolkata Clock, Legal Navigation & Desktop Back-To-Top */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-28 sm:pb-6 flex flex-col md:flex-row items-center justify-between gap-5 text-xs font-sans text-slate-400">

          {/* Copyright & Live Chambers Clock */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 sm:gap-3 text-center sm:text-left">
            <span className="text-slate-300 font-semibold tracking-wide text-xs">
              &copy; {new Date().getFullYear()} ACORN LEGAL CONSULTANTS
            </span>
            <span className="hidden sm:inline text-navy-700 select-none">&bull;</span>
            <span className="text-[11px] text-slate-400">
              Kolkata Chambers
            </span>
            <span className="hidden sm:inline text-navy-700 select-none">&bull;</span>
            <div className="pt-0.5 sm:pt-0">
              <FooterClock />
            </div>
          </div>

          {/* Legal Navigation Links (Generous Touch-Friendly Grid on Mobile, Inline on Desktop) */}
          <div className="w-full md:w-auto grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap items-center justify-center gap-2 sm:gap-1.5 md:gap-2 text-[11px] sm:text-xs text-slate-400">
            <Link
              href="/privacy"
              className="min-h-[44px] px-3 py-2 rounded-lg bg-navy-900/60 md:bg-transparent border border-navy-800/80 md:border-0 hover:border-brass-500/40 hover:bg-navy-900 md:hover:bg-transparent hover:text-brass-300 transition flex items-center justify-center text-center group active:text-brass-200"
            >
              <FooterRollText>Privacy Policy</FooterRollText>
            </Link>
            <span className="hidden md:inline text-navy-700 select-none">&bull;</span>
            <Link
              href="/terms"
              className="min-h-[44px] px-3 py-2 rounded-lg bg-navy-900/60 md:bg-transparent border border-navy-800/80 md:border-0 hover:border-brass-500/40 hover:bg-navy-900 md:hover:bg-transparent hover:text-brass-300 transition flex items-center justify-center text-center group active:text-brass-200"
            >
              <FooterRollText>Terms</FooterRollText>
            </Link>
            <span className="hidden md:inline text-navy-700 select-none">&bull;</span>
            <Link
              href="/cookies"
              className="min-h-[44px] px-3 py-2 rounded-lg bg-navy-900/60 md:bg-transparent border border-navy-800/80 md:border-0 hover:border-brass-500/40 hover:bg-navy-900 md:hover:bg-transparent hover:text-brass-300 transition flex items-center justify-center text-center group active:text-brass-200"
            >
              <FooterRollText>Cookie Policy</FooterRollText>
            </Link>
            <span className="hidden md:inline text-navy-700 select-none">&bull;</span>
            <Link
              href="/refund-policy"
              className="min-h-[44px] px-3 py-2 rounded-lg bg-navy-900/60 md:bg-transparent border border-navy-800/80 md:border-0 hover:border-brass-500/40 hover:bg-navy-900 md:hover:bg-transparent hover:text-brass-300 transition flex items-center justify-center text-center group active:text-brass-200"
            >
              <FooterRollText>Refund Policy</FooterRollText>
            </Link>
            <span className="hidden md:inline text-navy-700 select-none">&bull;</span>
            <Link
              href="/disclaimer"
              className="min-h-[44px] px-3 py-2 rounded-lg bg-navy-900/60 md:bg-transparent border border-navy-800/80 md:border-0 hover:border-brass-500/40 hover:bg-navy-900 md:hover:bg-transparent hover:text-brass-300 transition flex items-center justify-center text-center group active:text-brass-200"
            >
              <FooterRollText>Disclaimer</FooterRollText>
            </Link>
            <span className="hidden md:inline text-navy-700 select-none">&bull;</span>
            <Link
              href="/verify"
              className="min-h-[44px] px-3 py-2 rounded-lg bg-navy-900/60 md:bg-transparent border border-navy-800/80 md:border-0 hover:border-brass-500/40 hover:bg-navy-900 md:hover:bg-transparent hover:text-brass-300 transition flex items-center justify-center text-center group active:text-brass-200"
            >
              <FooterRollText>Verification</FooterRollText>
            </Link>
          </div>

          {/* Desktop Back-To-Top Button (Mobile already has fixed floating button) */}
          <div className="hidden md:flex items-center justify-center">
            <button
              type="button"
              onClick={scrollToTop}
              title="Return to top of page"
              aria-label="Scroll back to top of page"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-navy-900 border border-brass-500/35 hover:border-brass-400 text-brass-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm group hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 active:scale-95 cursor-pointer"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. REALTIME SYNCHRONIZED CHAMBERS MAP MODAL
         ───────────────────────────────────────────────────────────── */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-card overflow-hidden shadow-2xl border border-navy-800 animate-in fade-in zoom-in-95 duration-200 my-auto">
            <div className="absolute top-3 right-3 z-30">
              <button
                type="button"
                onClick={() => setShowMapModal(false)}
                className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-full bg-navy-950/90 hover:bg-navy-900 text-white flex items-center justify-center border border-brass-500/40 shadow-lg text-lg font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 active:scale-95 cursor-pointer"
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
