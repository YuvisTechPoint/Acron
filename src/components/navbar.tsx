"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Phone,
  Menu,
  X,
  Briefcase,
  FileText,
  Compass,
  Landmark,
  ShieldCheck,
  Building,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { BRAND_CONFIG, PRACTICE_AREAS } from "@/lib/constants";
import { useRealtimeSiteConfig, useRealtimeServices } from "@/lib/realtime";

// Icon mapping helper
const iconMap: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase className="w-4 h-4 text-brass-500" />,
  FileText: <FileText className="w-4 h-4 text-brass-500" />,
  Compass: <Compass className="w-4 h-4 text-brass-500" />,
  Landmark: <Landmark className="w-4 h-4 text-brass-500" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-brass-500" />,
  Building: <Building className="w-4 h-4 text-brass-500" />,
  HelpCircle: <HelpCircle className="w-4 h-4 text-brass-500" />,
};

export function Navbar() {
  const pathname = usePathname();
  const safePath = typeof pathname === "string" ? pathname : "";
  const siteConfig = useRealtimeSiteConfig();
  const customServices = useRealtimeServices();

  // 6 Foundational Practice Areas of Acorn Legal Consultants
  const corePractices = PRACTICE_AREAS;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPracticeSlug, setHoveredPracticeSlug] = useState<string>(
    corePractices[0]?.slug || "check-bounce"
  );
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  };

  const isAdminOrConsole =
    safePath.startsWith("/admin") ||
    safePath.startsWith("/posh/admin") ||
    safePath.startsWith("/posh/ic") ||
    safePath.startsWith("/posh/org");

  const isDarkHeroPage = safePath === "/";
  const isTransparent = isDarkHeroPage && !scrolled;

  const activePractice =
    corePractices.find((p) => p.slug === hoveredPracticeSlug) || corePractices[0];

  useEffect(() => {
    if (isAdminOrConsole) return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAdminOrConsole]);

  // Close menus on route change
  useEffect(() => {
    if (isAdminOrConsole) return;
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  }, [pathname, isAdminOrConsole]);

  // Handle escape key to close mega menu and mobile menu
  useEffect(() => {
    if (isAdminOrConsole) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAdminOrConsole]);

  // Handle click outside to dismiss mega menu
  useEffect(() => {
    if (isAdminOrConsole) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAdminOrConsole]);

  if (isAdminOrConsole) {
    return null;
  }

  return (
    <>
      {/* Sticky / Scrolled Top Chambers Ticker Ribbon (Positioned Above the Header when Scrolled) */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 border-b border-navy-800/80 bg-ink-950 overflow-hidden select-none transition-all duration-300 ${
          scrolled ? "h-7 opacity-100 translate-y-0" : "h-0 opacity-0 -translate-y-full pointer-events-none"
        }`}
        aria-label="Chambers Scrolled Header Ribbon"
      >
        <div className="footer-ticker-track flex items-center h-full">
          <div className="flex shrink-0 items-center gap-8 px-4 text-[11px] font-serif italic text-brass-300 tracking-wider">
            <span suppressHydrationWarning>{siteConfig?.footerRollText || "Excellence in Law • Integrity in Practice • Calcutta High Court • POSH Act Advisory • Corporate Governance • Commercial Contracts • Arbitration & Mediation"}</span>
            <span className="text-brass-500/60 not-italic">✦</span>
            <span suppressHydrationWarning>{siteConfig?.footerRollText || "Excellence in Law • Integrity in Practice • Calcutta High Court • POSH Act Advisory • Corporate Governance • Commercial Contracts • Arbitration & Mediation"}</span>
            <span className="text-brass-500/60 not-italic">✦</span>
          </div>
          <div className="flex shrink-0 items-center gap-8 px-4 text-[11px] font-serif italic text-brass-300 tracking-wider" aria-hidden="true">
            <span suppressHydrationWarning>{siteConfig?.footerRollText || "Excellence in Law • Integrity in Practice • Calcutta High Court • POSH Act Advisory • Corporate Governance • Commercial Contracts • Arbitration & Mediation"}</span>
            <span className="text-brass-500/60 not-italic">✦</span>
            <span suppressHydrationWarning>{siteConfig?.footerRollText || "Excellence in Law • Integrity in Practice • Calcutta High Court • POSH Act Advisory • Corporate Governance • Commercial Contracts • Arbitration & Mediation"}</span>
            <span className="text-brass-500/60 not-italic">✦</span>
          </div>
        </div>
      </div>

      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "top-7 h-[72px]" : "top-0 h-[84px]"
        } ${
          isTransparent
            ? "bg-transparent text-white border-b border-white/10"
            : "bg-white/95 backdrop-blur-md text-ink-950 border-b border-border shadow-card"
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* Logo Lockup: Official Acorn Crest + ACORN LEGAL CONSULTANTS */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Acorn Legal Consultants Home"
          >
            {/* Authentic Brand Crest Emblem */}
            <div
              className={`w-10 h-10 rounded-md overflow-hidden flex items-center justify-center transition duration-200 border shrink-0 ${
                isTransparent
                  ? "bg-navy-950 border-brass-500/50 shadow-inner group-hover:border-brass-400 group-hover:ring-1 group-hover:ring-brass-400/40"
                  : "bg-navy-950 border-brass-500/40 shadow-sm group-hover:border-brass-400 group-hover:ring-1 group-hover:ring-brass-400/40"
              }`}
            >
              <Image
                src="/brand/logo.png"
                alt="Acorn Legal Consultants Crest"
                width={40}
                height={40}
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                priority
              />
            </div>

            <div className="flex flex-col">
              <span
                className={`font-serif text-2xl font-bold tracking-tight leading-none transition-colors duration-200 ${
                  isTransparent ? "text-white drop-shadow-sm" : "text-ink-950"
                }`}
              >
                {siteConfig?.firmName || "Acorn Consultants"}
              </span>
              <span
                className={`font-sans text-[10px] font-semibold tracking-[0.2em] uppercase mt-1 transition-colors duration-200 ${
                  isTransparent ? "text-brass-300 drop-shadow-sm" : "text-brass-700"
                }`}
              >
                {siteConfig?.tagline || "Educational, Tax & Legal Consultants"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1 text-[14px] font-medium"
            aria-label="Main Navigation"
          >
            <Link
              href="/"
              className={`px-3 py-2 rounded-btn transition ${
                pathname === "/"
                  ? isTransparent
                    ? "text-white font-semibold"
                    : "text-navy-700 font-semibold bg-stone-100"
                  : isTransparent
                  ? "text-white/80 hover:text-white"
                  : "text-ink hover:text-navy-700 hover:bg-stone-100"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 rounded-btn transition ${
                pathname === "/about"
                  ? isTransparent
                    ? "text-white font-semibold"
                    : "text-navy-700 font-semibold bg-stone-100"
                  : isTransparent
                  ? "text-white/80 hover:text-white"
                  : "text-ink hover:text-navy-700 hover:bg-stone-100"
              }`}
            >
              About
            </Link>

            {/* Mega Menu Trigger with Smooth Hover & Click Control */}
            <div
              className="relative"
              ref={megaMenuRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setMegaMenuOpen((prev) => !prev)}
                aria-expanded={megaMenuOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-btn transition ${
                  pathname.startsWith("/services")
                    ? isTransparent
                      ? "text-white font-semibold"
                      : "text-navy-700 font-semibold bg-stone-100"
                    : isTransparent
                    ? "text-white/80 hover:text-white"
                    : "text-ink hover:text-navy-700 hover:bg-stone-100"
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    megaMenuOpen ? "rotate-180" : ""
                  } ${isTransparent ? "text-brass-300" : "text-brass-700"}`}
                />
              </button>

              {/* Full-Width Edge-to-Edge Classical Editorial Mega Menu */}
              <div
                className={`fixed left-0 right-0 w-full z-50 transition-all duration-300 ease-out ${
                  scrolled ? "top-[99px]" : "top-[84px]"
                } ${
                  megaMenuOpen
                    ? "opacity-100 visible translate-y-0 pointer-events-auto"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
                role="region"
                aria-label="Services Mega Menu"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className={`w-full transition-colors duration-200 ${
                    isTransparent
                      ? "bg-navy-950/98 backdrop-blur-2xl border-b border-brass-500/40 border-t border-white/10 text-white shadow-[0_30px_70px_rgba(0,0,0,0.75)]"
                      : "bg-[#FCFAF7] border-b border-brass-500/30 border-t border-border/60 text-ink-950 shadow-[0_30px_70px_rgba(15,23,42,0.16)]"
                  }`}
                >
                  <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 py-7 sm:py-8">
                    
                    {/* Top Bar: Editorial Eyebrow & Directory Navigation Link */}
                    <div
                      className={`flex items-center justify-between pb-3.5 mb-5 border-b ${
                        isTransparent ? "border-white/15" : "border-border/70"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`text-xs select-none ${isTransparent ? "text-brass-400" : "text-brass-600"}`}>✦</span>
                        <span
                          className={`font-sans text-[11px] font-bold uppercase tracking-[0.22em] ${
                            isTransparent ? "text-brass-300" : "text-brass-800"
                          }`}
                        >
                          Chambers Practice Directory &amp; Advisory Capabilities
                        </span>
                      </div>
                      <Link
                        href="/services"
                        onClick={() => setMegaMenuOpen(false)}
                        className={`text-[12px] font-semibold flex items-center gap-1.5 group transition-colors ${
                          isTransparent
                            ? "text-white/90 hover:text-brass-300"
                            : "text-navy-900 hover:text-brass-700"
                        }`}
                      >
                        <span>All Practice Disciplines</span>
                        <ArrowRight
                          className={`w-3.5 h-3.5 group-hover:translate-x-1 transition-transform ${
                            isTransparent ? "text-brass-400" : "text-brass-600"
                          }`}
                        />
                      </Link>
                    </div>

                    {/* Main Grid: 8 Practice Disciplines (7 cols) + Focused Chambers Dossier (5 cols) */}
                    <div className="grid grid-cols-12 gap-8 lg:gap-10 items-stretch">
                      
                      {/* Left: 8 Disciplines in 2 columns of 4 - Classical Editorial Rows */}
                      <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-3.5 sm:gap-y-4">
                        {corePractices.slice(0, 8).map((pa, idx) => {
                          const isHovered = hoveredPracticeSlug === pa.slug;
                          const numStr = String(idx + 1).padStart(2, "0");
                          return (
                            <Link
                              key={pa.slug}
                              href={`/services/${pa.slug}`}
                              onMouseEnter={() => setHoveredPracticeSlug(pa.slug)}
                              onClick={() => setMegaMenuOpen(false)}
                              className={`group p-3 sm:p-3.5 rounded-xl transition-all duration-200 flex items-start gap-3 text-left border ${
                                isHovered
                                  ? isTransparent
                                    ? "bg-white/10 border-brass-400 shadow-sm ring-1 ring-brass-400/30"
                                    : "bg-white border-brass-500/60 shadow-sm ring-1 ring-brass-500/20"
                                  : isTransparent
                                  ? "bg-white/[0.03] border-white/10 hover:bg-white/[0.08] hover:border-brass-400/40"
                                  : "bg-stone-50/70 border-border/40 hover:bg-white hover:border-brass-500/40 hover:shadow-2xs"
                              }`}
                            >
                              <span
                                className={`w-6 h-6 rounded-md font-mono text-[10.5px] font-bold tracking-wider select-none transition-colors shrink-0 mt-0.5 flex items-center justify-center ${
                                  isHovered
                                    ? isTransparent
                                      ? "bg-brass-500 text-ink-950 font-extrabold"
                                      : "bg-navy-950 text-brass-300 font-extrabold"
                                    : isTransparent
                                    ? "bg-brass-500/20 text-brass-300"
                                    : "bg-stone-200/70 text-ink-muted"
                                }`}
                              >
                                {numStr}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1.5">
                                  <span
                                    className={`font-serif text-[15px] sm:text-[15.5px] font-bold leading-tight transition-colors ${
                                      isHovered
                                        ? isTransparent
                                          ? "text-brass-200"
                                          : "text-brass-900"
                                        : isTransparent
                                        ? "text-white group-hover:text-brass-200"
                                        : "text-ink-950 group-hover:text-brass-800"
                                    }`}
                                  >
                                    {pa.title}
                                  </span>
                                  <ArrowRight
                                    className={`w-3.5 h-3.5 shrink-0 transition-all ${
                                      isTransparent ? "text-brass-400" : "text-brass-600"
                                    } ${
                                      isHovered ? "opacity-100 translate-x-0.5" : "opacity-0 -translate-x-1"
                                    }`}
                                  />
                                </div>
                                <p
                                  className={`font-sans text-[11.5px] line-clamp-1 leading-snug mt-1 ${
                                    isTransparent ? "text-slate-300" : "text-ink-secondary"
                                  }`}
                                >
                                  {pa.shortDesc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Right: Refined Chambers Dossier Briefing (5 cols) */}
                      <div
                        className={`col-span-12 lg:col-span-5 border-l pl-8 lg:pl-10 flex flex-col justify-between ${
                          isTransparent ? "border-white/15" : "border-brass-500/25"
                        }`}
                      >
                        <div className="space-y-4">
                          <div
                            className={`flex items-center justify-between pb-2 border-b ${
                              isTransparent ? "border-white/15" : "border-border/60"
                            }`}
                          >
                            <span
                              className={`font-sans text-[10.5px] uppercase font-bold tracking-[0.2em] ${
                                isTransparent ? "text-brass-300" : "text-brass-800"
                              }`}
                            >
                              Chambers Briefing Note
                            </span>
                            <span
                              className={`font-mono text-[11px] ${
                                isTransparent ? "text-slate-400" : "text-ink-muted"
                              }`}
                            >
                              Camac Street &bull; High Court Bar
                            </span>
                          </div>

                          <div>
                            <h4
                              className={`font-serif font-normal italic text-[23px] sm:text-[25px] leading-tight ${
                                isTransparent ? "text-white" : "text-navy-950"
                              }`}
                            >
                              {activePractice.title}
                            </h4>
                            <p
                              className={`font-sans text-[12px] sm:text-[12.5px] mt-2 leading-relaxed ${
                                isTransparent ? "text-slate-300" : "text-ink-secondary"
                              }`}
                            >
                              {activePractice.shortDesc}
                            </p>
                          </div>

                          <div
                            className={`pt-3 border-t ${
                              isTransparent ? "border-white/15" : "border-border/60"
                            }`}
                          >
                            <span
                              className={`text-[10px] font-bold uppercase tracking-[0.16em] block mb-2 ${
                                isTransparent ? "text-brass-300/90" : "text-brass-800"
                              }`}
                            >
                              Counsel Deliverables &amp; Practice Scope:
                            </span>
                            <ul className="space-y-2">
                              {activePractice.services?.slice(0, 4).map((item, i) => (
                                <li
                                  key={i}
                                  className={`flex items-start gap-2.5 text-[12px] leading-snug ${
                                    isTransparent ? "text-slate-200" : "text-ink-900"
                                  }`}
                                >
                                  <span
                                    className={`font-serif text-[14px] leading-none mt-0.5 select-none ${
                                      isTransparent ? "text-brass-400" : "text-brass-600"
                                    }`}
                                  >
                                    &bull;
                                  </span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div
                          className={`pt-4 mt-4 border-t flex items-center justify-between ${
                            isTransparent ? "border-white/15" : "border-border/60"
                          }`}
                        >
                          <Link
                            href={`/services/${activePractice.slug}`}
                            onClick={() => setMegaMenuOpen(false)}
                            className="px-5 py-2.5 text-[11px] font-bold tracking-wider uppercase transition-all shadow-sm inline-flex items-center gap-1.5 group rounded-lg bg-brass-500 hover:bg-brass-400 text-ink-950 hover:shadow-md"
                          >
                            <span>Explore Practice Scope</span>
                            <ArrowRight
                              className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-ink-950"
                            />
                          </Link>
                          <Link
                            href="/request-service"
                            onClick={() => setMegaMenuOpen(false)}
                            className={`text-[12px] font-semibold underline underline-offset-4 transition ${
                              isTransparent
                                ? "text-brass-300 hover:text-white"
                                : "text-brass-800 hover:text-navy-900"
                            }`}
                          >
                            Book Confidential Intake &rarr;
                          </Link>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Sub-Bar: Clean Editorial Metadata */}
                    <div
                      className={`pt-3.5 mt-5 border-t flex flex-wrap items-center justify-between gap-3 text-[11.5px] ${
                        isTransparent
                          ? "border-white/15 text-slate-300"
                          : "border-border/70 text-ink-secondary"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${isTransparent ? "text-white" : "text-ink-950"}`}>
                          Chambers Retainers:
                        </span>
                        <span className={isTransparent ? "text-slate-300" : "text-ink-secondary"}>
                          Corporate Governance Advisory &bull; POSH IC Member Appointment &bull; Commercial Title &amp; Contracts
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Link
                          href="/posh"
                          onClick={() => setMegaMenuOpen(false)}
                          className={`font-semibold hover:underline ${
                            isTransparent
                              ? "text-brass-300 hover:text-white"
                              : "text-navy-800 hover:text-brass-700"
                          }`}
                        >
                          POSH Statutory Portal &rarr;
                        </Link>
                        <span className={`select-none ${isTransparent ? "text-white/20" : "text-border"}`}>&bull;</span>
                        <Link
                          href="/request-service"
                          onClick={() => setMegaMenuOpen(false)}
                          className={`font-bold hover:underline ${
                            isTransparent
                              ? "text-brass-300 hover:text-white"
                              : "text-brass-800 hover:text-navy-900"
                          }`}
                        >
                          Schedule Chambers Consultation &rarr;
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/posh"
              className={`px-3 py-2 rounded-btn transition ${
                pathname.startsWith("/posh")
                  ? isTransparent
                    ? "text-white font-semibold"
                    : "text-navy-700 font-semibold bg-stone-100"
                  : isTransparent
                  ? "text-white/80 hover:text-white"
                  : "text-ink hover:text-navy-700 hover:bg-stone-100"
              }`}
            >
              POSH Compliance
            </Link>

            <Link
              href="/blog"
              className={`px-3 py-2 rounded-btn transition ${
                pathname.startsWith("/blog")
                  ? isTransparent
                    ? "text-white font-semibold"
                    : "text-navy-700 font-semibold bg-stone-100"
                  : isTransparent
                  ? "text-white/80 hover:text-white"
                  : "text-ink hover:text-navy-700 hover:bg-stone-100"
              }`}
            >
              Insights
            </Link>

            <Link
              href="/faq"
              className={`px-3 py-2 rounded-btn transition ${
                pathname === "/faq"
                  ? isTransparent
                    ? "text-white font-semibold"
                    : "text-navy-700 font-semibold bg-stone-100"
                  : isTransparent
                  ? "text-white/80 hover:text-white"
                  : "text-ink hover:text-navy-700 hover:bg-stone-100"
              }`}
            >
              FAQ
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 rounded-btn transition ${
                pathname === "/contact"
                  ? isTransparent
                    ? "text-white font-semibold"
                    : "text-navy-700 font-semibold bg-stone-100"
                  : isTransparent
                  ? "text-white/80 hover:text-white"
                  : "text-ink hover:text-navy-700 hover:bg-stone-100"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action: Chambers Telephone & Primary Consultation Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${siteConfig?.receptionPhone || BRAND_CONFIG.phone}`}
              title={`Call Chambers: ${siteConfig?.receptionPhone || BRAND_CONFIG.phone}`}
              className={`w-11 h-11 rounded-full transition border flex items-center justify-center ${
                isTransparent
                  ? "bg-navy-900/60 border-white/20 text-brass-300 hover:text-white hover:border-brass-400 backdrop-blur-sm"
                  : "border-border text-navy-700 hover:text-brass-700 hover:bg-surface"
              }`}
              aria-label="Call Acorn Legal Consultants"
            >
              <Phone className={`w-4 h-4 ${isTransparent ? "text-brass-400" : "text-brass-600"}`} />
            </a>

            <Link
              href="/request-service"
              className={`min-h-[44px] px-5 rounded-btn flex items-center justify-center text-xs font-bold uppercase tracking-[0.14em] transition-all duration-200 shadow-sm ${
                isTransparent
                  ? "bg-brass-500 hover:bg-brass-400 text-ink-950 border border-brass-400"
                  : "bg-navy-700 hover:bg-blue-600 text-ivory-50 border border-navy-800"
              }`}
            >
              REQUEST A CONSULTATION
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href={`tel:${BRAND_CONFIG.phone}`}
              className={`p-2 rounded-btn border ${
                isTransparent
                  ? "text-brass-300 border-white/20"
                  : "text-navy-700 border-border"
              }`}
              aria-label="Call chambers"
            >
              <Phone className="w-4 h-4 text-brass-500" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`p-2 rounded-btn ${
                isTransparent ? "text-white" : "text-ink-950"
              }`}
              aria-label="Open mobile navigation"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </header>

      {/* Full-Screen Ink-950 Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink-950 text-white lg:hidden flex flex-col justify-between p-6 animate-fade-up overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-navy-800">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-md bg-navy-800 border border-brass-500/30 flex items-center justify-center text-brass-300">
                  <span className="font-serif text-xl font-bold">A</span>
                </div>
                <div>
                  <div className="font-serif font-bold text-xl text-white">ACORN</div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brass-300">
                    Legal Consultants
                  </div>
                </div>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-btn"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Staggered Large Serif Links */}
            <nav className="flex flex-col gap-4 py-8">
              {[
                { name: "Home", href: "/" },
                { name: "About Chambers", href: "/about" },
                { name: "Practice Areas & Services", href: "/services" },
                { name: "POSH Compliance Hub", href: "/posh" },
                { name: "Insights & Articles", href: "/blog" },
                { name: "Frequently Asked Questions", href: "/faq" },
                { name: "Contact Chambers", href: "/contact" },
                { name: "Fee Settlement", href: "/pay" },
              ].map((item, idx) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-serif text-2xl sm:text-3xl font-medium text-white/90 hover:text-brass-300 transition py-1"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Drawer Bottom Actions: Phone and Consultation */}
          <div className="pt-6 border-t border-navy-800 space-y-3">
            <a
              href={`tel:${BRAND_CONFIG.phone}`}
              className="w-full h-[52px] px-4 rounded-btn border border-brass-500/40 text-ivory-50 flex items-center justify-center gap-2 font-semibold text-xs tracking-wider uppercase hover:bg-navy-800 transition"
            >
              <Phone className="w-4 h-4 text-brass-300" />
              <span>Chambers: {BRAND_CONFIG.phone}</span>
            </a>

            <Link
              href="/request-service"
              className="w-full h-[52px] px-4 rounded-btn bg-brass-500 text-ink-950 flex items-center justify-center font-bold text-xs tracking-wider uppercase hover:bg-brass-300 transition"
            >
              Request a Consultation
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
