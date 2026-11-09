"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
    corePractices[0]?.slug || "advisory"
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
        className={`fixed top-0 left-0 right-0 z-50 border-b border-navy-800/80 bg-[#040812] overflow-hidden select-none transition-all duration-300 ${
          scrolled ? "h-7 opacity-100 translate-y-0" : "h-0 opacity-0 -translate-y-full pointer-events-none"
        }`}
        aria-label="Chambers Scrolled Header Ribbon"
      >
        <div className="footer-ticker-track flex items-center h-full">
          <div className="flex shrink-0 items-center gap-8 px-4 text-[11px] font-serif italic text-brass-300 tracking-wider">
            <span>{siteConfig?.footerRollText || "Acorn Legal Consultants • Excellence in Law • Integrity in Practice • Camac Street Chambers • Kolkata • High Court Practice • POSH Redressal • Corporate Advisory"}</span>
            <span className="text-brass-500/60 not-italic">✦</span>
            <span>{siteConfig?.footerRollText || "Acorn Legal Consultants • Excellence in Law • Integrity in Practice • Camac Street Chambers • Kolkata • High Court Practice • POSH Redressal • Corporate Advisory"}</span>
            <span className="text-brass-500/60 not-italic">✦</span>
          </div>
          <div className="flex shrink-0 items-center gap-8 px-4 text-[11px] font-serif italic text-brass-300 tracking-wider" aria-hidden="true">
            <span>{siteConfig?.footerRollText || "Acorn Legal Consultants • Excellence in Law • Integrity in Practice • Camac Street Chambers • Kolkata • High Court Practice • POSH Redressal • Corporate Advisory"}</span>
            <span className="text-brass-500/60 not-italic">✦</span>
            <span>{siteConfig?.footerRollText || "Acorn Legal Consultants • Excellence in Law • Integrity in Practice • Camac Street Chambers • Kolkata • High Court Practice • POSH Redressal • Corporate Advisory"}</span>
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
          
          {/* Logo Lockup: Monogram Box with A + ACORN + LEGAL CONSULTANTS */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Acorn Legal Consultants Home"
          >
            {/* Monogram A square box */}
            <div
              className={`w-10 h-10 rounded-md flex items-center justify-center transition duration-200 border ${
                isTransparent
                  ? "bg-[#101F38] border-brass-500/40 text-brass-300 shadow-inner group-hover:border-brass-400"
                  : "bg-navy-800 border-brass-500/40 text-brass-300 shadow-sm group-hover:border-brass-400"
              }`}
            >
              <span className="font-serif text-2xl font-bold leading-none select-none text-brass-300">A</span>
            </div>

            <div className="flex flex-col">
              <span
                className={`font-serif text-2xl font-bold tracking-tight leading-none transition-colors duration-200 ${
                  isTransparent ? "text-white drop-shadow-sm" : "text-ink-950"
                }`}
              >
                Acorn Legal Consultants
              </span>
              {siteConfig?.tagline ? (
                <span
                  className={`font-sans text-[10px] font-semibold tracking-[0.2em] uppercase mt-1 transition-colors duration-200 ${
                    isTransparent ? "text-brass-300 drop-shadow-sm" : "text-brass-700"
                  }`}
                >
                  {siteConfig.tagline}
                </span>
              ) : null}
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

              {/* Mega Menu Dropdown with Contiguous Hover Bridge */}
              <div
                className={`absolute top-full left-1/2 -translate-x-[36%] pt-2.5 z-50 transition-all duration-200 ${
                  megaMenuOpen
                    ? "opacity-100 visible translate-y-0 pointer-events-auto"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
                role="region"
                aria-label="Services Mega Menu"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="w-[960px] xl:w-[1000px] max-w-[calc(100vw-32px)] bg-white rounded-card shadow-modal border border-border p-6 sm:p-7 text-ink space-y-5">
                  
                  {/* Top Bar: Eyebrow & Directory Navigation Link */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-border">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brass-500 animate-pulse" />
                      <span className="text-[11px] font-bold text-brass-700 uppercase tracking-[0.18em]">
                        Practice Areas &amp; Advisory Capabilities
                      </span>
                    </div>
                    <Link
                      href="/services"
                      onClick={() => setMegaMenuOpen(false)}
                      className="text-xs font-semibold text-navy-800 hover:text-brass-700 flex items-center gap-1.5 group transition-colors"
                    >
                      <span>Explore Complete Practice Directory</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brass-500 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                  {/* Main Grid: 6 Practice Cards (7 cols) + Focused Scope Card (5 cols) */}
                  <div className="grid grid-cols-12 gap-6 items-stretch">
                    
                    {/* Left: 6 Core Practice Cards in 2 columns of 3 */}
                    <div className="col-span-7 grid grid-cols-2 gap-3">
                      {corePractices.map((pa) => {
                        const isHovered = hoveredPracticeSlug === pa.slug;
                        return (
                          <Link
                            key={pa.slug}
                            href={`/services/${pa.slug}`}
                            onMouseEnter={() => setHoveredPracticeSlug(pa.slug)}
                            onClick={() => setMegaMenuOpen(false)}
                            className={`p-3.5 rounded-card border transition-all duration-200 flex items-start gap-3 text-left group ${
                              isHovered
                                ? "bg-[#FAF7F2] border-brass-400 shadow-sm"
                                : "bg-white border-border/80 hover:bg-stone-50/80 hover:border-border"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                isHovered
                                  ? "bg-navy-800 text-brass-300 shadow-sm"
                                  : "bg-brass-50 border border-brass-200/60 text-brass-700"
                              }`}
                            >
                              {iconMap[pa.icon] || <Briefcase className="w-4 h-4 text-brass-500" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className={`text-[13px] font-bold leading-snug transition-colors ${
                                  isHovered ? "text-navy-900" : "text-ink-950"
                                }`}>
                                  {pa.title}
                                </span>
                                <ArrowRight
                                  className={`w-3 h-3 text-brass-500 shrink-0 transition-transform ${
                                    isHovered ? "translate-x-0.5 opacity-100" : "opacity-0"
                                  }`}
                                />
                              </div>
                              <p className="text-[11px] text-ink-secondary leading-relaxed line-clamp-2 mt-1">
                                {pa.shortDesc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Right: Focused Scope Card (5 cols) */}
                    <div className="col-span-5 bg-gradient-to-b from-[#FAF7F2] via-[#F6F2EB] to-[#EFEAE2] rounded-card p-5 border border-brass-500/25 flex flex-col justify-between shadow-sm relative overflow-hidden">
                      <div className="space-y-3 relative z-10">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-brass-800 bg-brass-100/80 px-2 py-0.5 rounded">
                            Chambers Scope Focus
                          </span>
                          <span className="text-[11px] font-mono text-ink-muted">
                            Camac Street Chambers
                          </span>
                        </div>

                        <div>
                          <h4 className="font-serif font-bold text-lg text-ink-950 leading-snug">
                            {activePractice.title}
                          </h4>
                          <p className="font-sans text-xs text-ink-secondary mt-1.5 leading-relaxed">
                            {activePractice.shortDesc}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-brass-300/40">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted block mb-2">
                            Key Deliverables &amp; Representation Scope:
                          </span>
                          <ul className="space-y-1.5 text-xs text-ink-950">
                            {activePractice.services?.slice(0, 4).map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-brass-600 shrink-0 mt-0.5" />
                                <span className="leading-tight text-[11px] text-ink-900">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-4 mt-3 border-t border-brass-300/40 flex items-center justify-between relative z-10">
                        <Link
                          href={`/services/${activePractice.slug}`}
                          onClick={() => setMegaMenuOpen(false)}
                          className="px-4 py-2 bg-navy-800 hover:bg-navy-900 text-ivory-50 text-xs font-bold rounded-btn transition-colors shadow-sm inline-flex items-center gap-2 group"
                        >
                          <span>Explore Full Practice Scope</span>
                          <ArrowRight className="w-3.5 h-3.5 text-brass-400 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link
                          href="/request-service"
                          onClick={() => setMegaMenuOpen(false)}
                          className="text-[11px] font-semibold text-brass-800 hover:text-navy-900 underline underline-offset-2 transition"
                        >
                          Book Intake
                        </Link>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Sub-Bar: Quick Consultation Intake Shortcuts */}
                  <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-ink-secondary">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-ink-950 text-[11px]">Advisory Retainers:</span>
                      <span className="text-[11px]">Corporate Governance &bull; POSH IC Member Appointment &bull; Contract Vetting</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px]">
                      <Link
                        href="/posh"
                        onClick={() => setMegaMenuOpen(false)}
                        className="font-semibold text-navy-800 hover:text-brass-700 hover:underline"
                      >
                        POSH Redressal Hub &rarr;
                      </Link>
                      <span className="text-border select-none">&bull;</span>
                      <Link
                        href="/request-service"
                        onClick={() => setMegaMenuOpen(false)}
                        className="font-bold text-brass-700 hover:text-navy-900 hover:underline"
                      >
                        Schedule Confidential Consultation &rarr;
                      </Link>
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
              className={`w-10 h-10 rounded-full transition border flex items-center justify-center ${
                isTransparent
                  ? "bg-[#101F38]/60 border-white/20 text-brass-300 hover:text-white hover:border-brass-400 backdrop-blur-sm"
                  : "border-border text-navy-700 hover:text-brass-700 hover:bg-surface"
              }`}
              aria-label="Call Acorn Legal Consultants"
            >
              <Phone className={`w-4 h-4 ${isTransparent ? "text-brass-400" : "text-brass-600"}`} />
            </a>

            <Link
              href="/request-service"
              className={`h-[42px] px-5 rounded-btn flex items-center justify-center text-xs font-bold uppercase tracking-[0.14em] transition-all duration-200 shadow-sm ${
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
