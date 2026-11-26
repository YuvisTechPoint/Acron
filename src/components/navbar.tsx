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
  Search,
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

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
      {/* Chambers Rolling Ticker Ribbon (Blue background with crisp white rolling text on both mobile and desktop) */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 border-b border-navy-600/50 bg-navy-700 overflow-hidden select-none shadow-xs transition-all duration-300 ${
          scrolled
            ? "h-7 opacity-100 translate-y-0"
            : "h-7 opacity-100 translate-y-0 lg:h-0 lg:opacity-0 lg:-translate-y-full lg:pointer-events-none"
        }`}
        aria-label="Chambers Rolling Ticker Ribbon"
      >
        <div className="footer-ticker-track flex items-center h-full">
          <div className="flex shrink-0 items-center gap-6 sm:gap-8 px-3 sm:px-4 text-[10.5px] sm:text-[11px] font-serif italic text-white tracking-wider">
            <span suppressHydrationWarning>{siteConfig?.footerRollText || "Over 15 Years of Practice • Educational, Tax & Legal Consultants • Civil, Criminal & Property Matters • MahaRERA & Title Search • Document Attestation & Apostille • Marriage Registration & Succession"}</span>
            <span className="text-white/60 not-italic">✦</span>
            <span suppressHydrationWarning>{siteConfig?.footerRollText || "Over 15 Years of Practice • Educational, Tax & Legal Consultants • Civil, Criminal & Property Matters • MahaRERA & Title Search • Document Attestation & Apostille • Marriage Registration & Succession"}</span>
            <span className="text-white/60 not-italic">✦</span>
          </div>
          <div className="flex shrink-0 items-center gap-6 sm:gap-8 px-3 sm:px-4 text-[10.5px] sm:text-[11px] font-serif italic text-white tracking-wider" aria-hidden="true">
            <span suppressHydrationWarning>{siteConfig?.footerRollText || "Over 15 Years of Practice • Educational, Tax & Legal Consultants • Civil, Criminal & Property Matters • MahaRERA & Title Search • Document Attestation & Apostille • Marriage Registration & Succession"}</span>
            <span className="text-white/60 not-italic">✦</span>
            <span suppressHydrationWarning>{siteConfig?.footerRollText || "Over 15 Years of Practice • Educational, Tax & Legal Consultants • Civil, Criminal & Property Matters • MahaRERA & Title Search • Document Attestation & Apostille • Marriage Registration & Succession"}</span>
            <span className="text-white/60 not-italic">✦</span>
          </div>
        </div>
      </div>

      {/* Soft Dimming Backdrop Overlay behind Mega Menu */}
      <div
        className={`fixed inset-0 ${
          scrolled ? "top-[100px]" : "top-[90px] lg:top-[84px]"
        } bg-ink-950/55 z-30 transition-opacity duration-200 pointer-events-none ${
          megaMenuOpen ? "opacity-100" : "opacity-0 invisible pointer-events-none"
        }`}
        aria-hidden="true"
      />

      <header
        className={`fixed left-0 right-0 z-40 transition-colors duration-200 ${
          scrolled
            ? "top-7 h-[62px] lg:top-7 lg:h-[72px]"
            : "top-7 h-[62px] lg:top-0 lg:h-[84px]"
        } ${
          isTransparent
            ? "bg-ink-950 text-white border-b border-navy-800/80 shadow-sm"
            : "bg-ivory-50 text-ink-950 border-b border-border shadow-card"
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-3 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-2">
          
          {/* Logo Lockup: Official Acorn Crest + ACORN LEGAL CONSULTANTS */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none min-w-0 shrink"
            aria-label="Acorn Legal Consultants Home"
          >
            {/* Authentic Brand Crest Emblem */}
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-md overflow-hidden flex items-center justify-center transition duration-200 border shrink-0 ${
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

            <div className="flex flex-col min-w-0">
              <span
                suppressHydrationWarning
                className={`font-serif text-lg sm:text-xl lg:text-2xl font-bold tracking-tight leading-none truncate transition-colors duration-200 ${
                  isTransparent ? "text-white" : "text-ink-950"
                }`}
              >
                {siteConfig?.firmName || "Acorn Consultants"}
              </span>
              <span
                suppressHydrationWarning
                className={`font-sans text-[8px] sm:text-[10px] font-semibold tracking-[0.12em] sm:tracking-[0.2em] uppercase mt-1 truncate transition-colors duration-200 ${
                  isTransparent ? "text-brass-300" : "text-brass-700"
                }`}
              >
                {siteConfig?.tagline || "Educational, Tax & Legal Consultants"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-[13.5px] xl:text-[14px] font-medium shrink-0"
            aria-label="Main Navigation"
          >
            <Link
              href="/"
              className={`px-2.5 xl:px-3 py-2 rounded-btn whitespace-nowrap transition ${
                pathname === "/"
                  ? isTransparent
                    ? "text-brass-300 font-semibold bg-navy-900/90"
                    : "text-navy-700 font-semibold bg-stone-100"
                  : isTransparent
                  ? "text-ivory-50/90 hover:text-brass-300 hover:bg-navy-900/60"
                  : "text-ink hover:text-navy-700 hover:bg-stone-100"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`px-2.5 xl:px-3 py-2 rounded-btn whitespace-nowrap transition ${
                pathname === "/about"
                  ? isTransparent
                    ? "text-brass-300 font-semibold bg-navy-900/90"
                    : "text-navy-700 font-semibold bg-stone-100"
                  : isTransparent
                  ? "text-ivory-50/90 hover:text-brass-300 hover:bg-navy-900/60"
                  : "text-ink hover:text-navy-700 hover:bg-stone-100"
              }`}
            >
              About
            </Link>

            {/* Mega Menu Trigger with Smooth Hover & Click Control */}
            <div
              ref={megaMenuRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setMegaMenuOpen((prev) => !prev)}
                aria-expanded={megaMenuOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-btn whitespace-nowrap transition ${
                  pathname.startsWith("/services")
                    ? isTransparent
                      ? "text-brass-300 font-semibold bg-navy-900/90"
                      : "text-navy-700 font-semibold bg-stone-100"
                    : isTransparent
                    ? "text-ivory-50/90 hover:text-brass-300 hover:bg-navy-900/60"
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

              {/* Full-Width Edge-to-Edge Classical Editorial Mega Menu (Seamlessly Docked to Header Bottom) */}
              <div
                className={`absolute top-full left-0 right-0 w-full z-50 transition-all duration-300 ease-out ${
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
                      ? "bg-ink-950 border-b-2 border-brass-500/40 border-t border-navy-800 text-white shadow-[0_35px_80px_rgba(0,0,0,0.85)]"
                      : "bg-ivory-50 border-b-2 border-brass-500/35 border-t border-border text-ink-950 shadow-[0_35px_80px_rgba(15,23,42,0.22)]"
                  }`}
                >
                  <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 py-8 sm:py-9">
                    
                    {/* Top Bar: Editorial Eyebrow & Directory Navigation Link */}
                    <div
                      className={`flex items-center justify-between pb-4 mb-6 border-b ${
                        isTransparent ? "border-white/15" : "border-brass-500/20"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`text-xs select-none ${isTransparent ? "text-brass-400" : "text-brass-600"}`}>✦</span>
                        <span
                          className={`font-sans text-[11px] font-bold uppercase tracking-[0.24em] ${
                            isTransparent ? "text-brass-300" : "text-brass-800"
                          }`}
                        >
                          Chambers Practice Directory &amp; Advisory Capabilities
                        </span>
                      </div>
                      <Link
                        href="/services"
                        onClick={() => setMegaMenuOpen(false)}
                        className={`text-[12.5px] font-semibold flex items-center gap-1.5 group transition-colors ${
                          isTransparent
                            ? "text-slate-200 hover:text-brass-300"
                            : "text-navy-900 hover:text-brass-700"
                        }`}
                      >
                        <span>View All 37 Specialized Services</span>
                        <ArrowRight
                          className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-brass-500"
                        />
                      </Link>
                    </div>

                    {/* Main Grid: 8 Practice Disciplines (7 cols) + Focused Chambers Dossier (5 cols) */}
                    <div className="grid grid-cols-12 gap-8 lg:gap-12 items-stretch">
                      
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
                              className={`group p-3.5 sm:p-4 rounded-xl transition-all duration-200 flex items-start gap-3.5 text-left border ${
                                isHovered
                                  ? isTransparent
                                    ? "bg-white/10 border-brass-400 shadow-md ring-1 ring-brass-400/30"
                                    : "bg-white border-brass-500 shadow-md ring-1 ring-brass-500/25"
                                  : isTransparent
                                  ? "bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-brass-400/40"
                                  : "bg-white/90 border-stone-200/90 shadow-2xs hover:bg-white hover:border-brass-500/50 hover:shadow-sm"
                              }`}
                            >
                              <span
                                className={`w-7 h-7 rounded-lg font-mono text-[11px] font-bold tracking-wider select-none transition-all duration-200 shrink-0 mt-0.5 flex items-center justify-center ${
                                  isHovered
                                    ? isTransparent
                                      ? "bg-brass-500 text-ink-950 font-extrabold shadow-xs scale-105"
                                      : "bg-navy-950 text-brass-300 font-extrabold shadow-xs scale-105"
                                    : isTransparent
                                    ? "bg-brass-500/20 text-brass-300 border border-brass-500/30"
                                    : "bg-stone-100 text-ink-muted border border-stone-200"
                                }`}
                              >
                                {numStr}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1.5">
                                  <span
                                    className={`font-serif text-[15.5px] sm:text-[16px] font-bold leading-tight transition-colors ${
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
                                    className={`w-3.5 h-3.5 shrink-0 transition-all duration-200 ${
                                      isTransparent ? "text-brass-400" : "text-brass-600"
                                    } ${
                                      isHovered ? "opacity-100 translate-x-0.5" : "opacity-0 -translate-x-1"
                                    }`}
                                  />
                                </div>
                                <p
                                  className={`font-sans text-[12px] line-clamp-1 leading-relaxed mt-1.5 transition-colors ${
                                    isTransparent ? "text-slate-300 group-hover:text-slate-100" : "text-ink-secondary group-hover:text-ink-900"
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
                        className={`col-span-12 lg:col-span-5 border-l pl-8 lg:pl-10 flex flex-col justify-between space-y-5 ${
                          isTransparent ? "border-white/15" : "border-brass-500/25"
                        }`}
                      >
                        <div className="space-y-4">
                          <div
                            className={`flex items-center justify-between pb-3 border-b ${
                              isTransparent ? "border-white/15" : "border-border/60"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-brass-500 animate-pulse" />
                              <span
                                className={`font-sans text-[11px] uppercase font-bold tracking-[0.2em] ${
                                  isTransparent ? "text-brass-300" : "text-brass-800"
                                }`}
                              >
                                Chambers Briefing Note
                              </span>
                            </div>
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
                              className={`font-serif font-bold italic text-[24px] sm:text-[26px] leading-tight ${
                                isTransparent ? "text-white" : "text-navy-950"
                              }`}
                            >
                              {activePractice.title}
                            </h4>
                            <p
                              className={`font-sans text-[12.5px] sm:text-[13px] mt-2.5 leading-relaxed ${
                                isTransparent ? "text-slate-300" : "text-ink-secondary"
                              }`}
                            >
                              {activePractice.shortDesc}
                            </p>
                          </div>

                          <div
                            className={`pt-3.5 border-t ${
                              isTransparent ? "border-white/15" : "border-border/60"
                            }`}
                          >
                            <span
                              className={`text-[10.5px] font-bold uppercase tracking-[0.18em] block mb-2.5 ${
                                isTransparent ? "text-brass-300/90" : "text-brass-800"
                              }`}
                            >
                              Counsel Deliverables &amp; Practice Scope:
                            </span>
                            <ul className="space-y-2.5">
                              {activePractice.services?.slice(0, 4).map((item, i) => (
                                <li
                                  key={i}
                                  className={`flex items-start gap-2.5 text-[12.5px] leading-snug ${
                                    isTransparent ? "text-slate-200" : "text-ink-900"
                                  }`}
                                >
                                  <span className="w-4 h-4 rounded-full bg-brass-500/15 text-brass-700 dark:text-brass-300 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold select-none">
                                    ✓
                                  </span>
                                  <span className="font-sans font-medium">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div
                          className={`pt-5 mt-4 border-t flex items-center justify-between gap-4 ${
                            isTransparent ? "border-white/15" : "border-border/60"
                          }`}
                        >
                          <Link
                            href={`/services/${activePractice.slug}`}
                            onClick={() => setMegaMenuOpen(false)}
                            className="px-6 py-2.5 text-[11.5px] font-bold tracking-wider uppercase transition-all shadow-sm inline-flex items-center gap-2 group rounded-lg bg-brass-500 hover:bg-brass-400 text-ink-950 hover:shadow-md"
                          >
                            <span>Explore Practice Scope</span>
                            <ArrowRight
                              className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-ink-950"
                            />
                          </Link>
                          <Link
                            href="/request-service"
                            onClick={() => setMegaMenuOpen(false)}
                            className={`text-[12.5px] font-semibold underline underline-offset-4 transition ${
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
                      className={`pt-4 mt-6 border-t flex flex-wrap items-center justify-between gap-3 text-[12px] ${
                        isTransparent
                          ? "border-white/15 text-slate-300"
                          : "border-brass-500/20 text-ink-secondary"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${isTransparent ? "text-white" : "text-ink-950"}`}>
                          Chambers Retainers:
                        </span>
                        <span className={isTransparent ? "text-slate-300" : "text-ink-secondary"}>
                          Corporate Governance Advisory &bull; POSH IC External Representation &bull; Commercial Title &amp; Contracts
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Link
                          href="/posh"
                          onClick={() => setMegaMenuOpen(false)}
                          className={`font-semibold hover:underline flex items-center gap-1 ${
                            isTransparent
                              ? "text-brass-300 hover:text-white"
                              : "text-navy-800 hover:text-brass-700"
                          }`}
                        >
                          <span>POSH Statutory Portal</span>
                          <span>&rarr;</span>
                        </Link>
                        <span className={`select-none ${isTransparent ? "text-white/20" : "text-border"}`}>&bull;</span>
                        <Link
                          href="/request-service"
                          onClick={() => setMegaMenuOpen(false)}
                          className={`font-bold hover:underline flex items-center gap-1 ${
                            isTransparent
                              ? "text-brass-300 hover:text-white"
                              : "text-brass-800 hover:text-navy-900"
                          }`}
                        >
                          <span>Schedule Chambers Consultation</span>
                          <span>&rarr;</span>
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/posh"
              className={`px-2.5 xl:px-3 py-2 rounded-btn whitespace-nowrap transition ${
                pathname.startsWith("/posh")
                  ? isTransparent
                    ? "text-brass-300 font-semibold bg-navy-900/90"
                    : "text-navy-700 font-semibold bg-stone-100"
                  : isTransparent
                  ? "text-ivory-50/90 hover:text-brass-300 hover:bg-navy-900/60"
                  : "text-ink hover:text-navy-700 hover:bg-stone-100"
              }`}
            >
              POSH Compliance
            </Link>

            <Link
              href="/blog"
              className={`px-2.5 xl:px-3 py-2 rounded-btn whitespace-nowrap transition ${
                pathname.startsWith("/blog")
                  ? isTransparent
                    ? "text-brass-300 font-semibold bg-navy-900/90"
                    : "text-navy-700 font-semibold bg-stone-100"
                  : isTransparent
                  ? "text-ivory-50/90 hover:text-brass-300 hover:bg-navy-900/60"
                  : "text-ink hover:text-navy-700 hover:bg-stone-100"
              }`}
            >
              Insights
            </Link>

            <Link
              href="/faq"
              className={`px-2.5 xl:px-3 py-2 rounded-btn whitespace-nowrap transition ${
                pathname === "/faq"
                  ? isTransparent
                    ? "text-brass-300 font-semibold bg-navy-900/90"
                    : "text-navy-700 font-semibold bg-stone-100"
                  : isTransparent
                  ? "text-ivory-50/90 hover:text-brass-300 hover:bg-navy-900/60"
                  : "text-ink hover:text-navy-700 hover:bg-stone-100"
              }`}
            >
              FAQ
            </Link>

            <Link
              href="/contact"
              className={`px-2.5 xl:px-3 py-2 rounded-btn whitespace-nowrap transition ${
                pathname === "/contact"
                  ? isTransparent
                    ? "text-brass-300 font-semibold bg-navy-900/90"
                    : "text-navy-700 font-semibold bg-stone-100"
                  : isTransparent
                  ? "text-ivory-50/90 hover:text-brass-300 hover:bg-navy-900/60"
                  : "text-ink hover:text-navy-700 hover:bg-stone-100"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action: Chambers Telephone & Primary Consultation Button */}
          <div className="hidden sm:flex items-center gap-2.5 xl:gap-3 shrink-0">
            <a
              href={`tel:${siteConfig?.receptionPhone || BRAND_CONFIG.phone}`}
              title={`Call Chambers: ${siteConfig?.receptionPhone || BRAND_CONFIG.phone}`}
              className={`w-10 h-10 xl:w-11 xl:h-11 rounded-full transition border flex items-center justify-center shrink-0 ${
                isTransparent
                  ? "bg-navy-900 border-brass-500/40 text-brass-300 hover:bg-navy-800 hover:text-white hover:border-brass-400"
                  : "bg-white border-border text-navy-700 hover:text-brass-700 hover:bg-stone-100"
              }`}
              aria-label="Call Acorn Legal Consultants"
            >
              <Phone className={`w-4 h-4 ${isTransparent ? "text-brass-400" : "text-brass-600"}`} />
            </a>

            <Link
              href="/request-service"
              className={`min-h-[44px] px-4 xl:px-5 rounded-btn flex items-center justify-center text-[11px] xl:text-xs font-bold uppercase tracking-[0.12em] xl:tracking-[0.14em] whitespace-nowrap transition-all duration-200 shadow-sm ${
                isTransparent
                  ? "bg-brass-500 hover:bg-brass-400 text-ink-950 border border-brass-400"
                  : "bg-navy-700 hover:bg-blue-600 text-ivory-50 border border-navy-800"
              }`}
            >
              REQUEST A CONSULTATION
            </Link>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="lg:hidden flex items-center gap-1 sm:gap-1.5 shrink-0">
            <Link
              href="/services"
              className={`w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-btn transition-colors ${
                isTransparent ? "text-white/90 hover:text-white hover:bg-navy-900" : "text-ink hover:bg-stone-100"
              }`}
              aria-label="Search practice disciplines"
            >
              <Search className={`w-5 h-5 ${isTransparent ? "text-brass-300" : "text-ink-secondary"}`} />
            </Link>
            <a
              href={`tel:${siteConfig?.receptionPhone || BRAND_CONFIG.phone}`}
              className={`sm:hidden w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-btn border transition-colors ${
                isTransparent
                  ? "bg-navy-900 text-brass-300 border-brass-500/40 hover:bg-navy-800"
                  : "bg-white text-navy-700 border-border hover:bg-stone-100"
              }`}
              aria-label="Call chambers"
            >
              <Phone className={`w-4 h-4 ${isTransparent ? "text-brass-300" : "text-brass-600"}`} />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              className={`w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-btn transition-colors ${
                isTransparent ? "text-white hover:bg-navy-900" : "text-ink-950 hover:bg-stone-100"
              }`}
              aria-label="Open mobile navigation"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </header>

      {/* Full-Screen Opaque Ink-950 Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-0 z-[60] bg-ink-950 text-white lg:hidden flex flex-col justify-between p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-navy-800">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-md bg-navy-950 border border-brass-500/40 overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
                  <Image
                    src="/brand/logo.png"
                    alt="Acorn Legal Consultants Crest"
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-serif font-bold text-lg text-white leading-tight truncate">
                    {siteConfig?.firmName || "ACORN"}
                  </div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-brass-300 truncate">
                    {siteConfig?.tagline || "Legal Consultants"}
                  </div>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center bg-navy-900 border border-navy-800 text-ivory-50 hover:text-white hover:border-brass-400 rounded-btn transition-colors shrink-0"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Clean Contrast Navigation Links */}
            <nav className="flex flex-col divide-y divide-navy-800/80 py-2 sm:py-3" aria-label="Mobile Navigation Links">
              {[
                { name: "Home", href: "/" },
                { name: "About Chambers", href: "/about" },
                { name: "Practice Areas & Services", href: "/services" },
                { name: "POSH Compliance Hub", href: "/posh" },
                { name: "17 Statutory Remedies", href: "/posh/options" },
                { name: "Insights & Articles", href: "/blog" },
                { name: "Frequently Asked Questions", href: "/faq" },
                { name: "Contact Chambers", href: "/contact" },
                { name: "Fee Settlement", href: "/pay" },
              ].map((item) => {
                const isActive =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-serif text-[16px] sm:text-lg font-medium transition min-h-[44px] flex items-center justify-between py-2.5 px-3 rounded-md ${
                      isActive
                        ? "text-brass-300 bg-navy-800 border-l-2 border-brass-400 font-semibold"
                        : "text-ivory-50 hover:text-brass-300 hover:bg-navy-900"
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="text-sm font-sans text-brass-400 select-none" aria-hidden="true">&rsaquo;</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Drawer Bottom Actions: Phone and Consultation */}
          <div className="pt-4 border-t border-navy-800 space-y-2.5 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3">
            <a
              href={`tel:${siteConfig?.receptionPhone || BRAND_CONFIG.phone}`}
              className="w-full min-h-[44px] px-3 py-2.5 rounded-btn bg-navy-900 border border-brass-500/50 text-ivory-50 flex items-center justify-center gap-2 font-semibold text-xs tracking-wider uppercase hover:bg-navy-800 hover:border-brass-400 transition"
            >
              <Phone className="w-3.5 h-3.5 text-brass-300 shrink-0" />
              <span className="truncate">Chambers: {siteConfig?.receptionPhone || BRAND_CONFIG.phone}</span>
            </a>

            <Link
              href="/request-service"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full min-h-[44px] px-3 py-2.5 rounded-btn bg-brass-500 text-ink-950 flex items-center justify-center font-bold text-xs tracking-wider uppercase hover:bg-brass-400 transition shadow-sm"
            >
              Request a Consultation
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
