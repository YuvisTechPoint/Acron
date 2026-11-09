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

  const dynamicPractices = customServices.length > 0
    ? customServices.map((s) => ({
        slug: s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: s.name,
        shortDesc: s.shortDesc,
        icon: "Briefcase",
        services: s.features,
      }))
    : PRACTICE_AREAS;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPracticeSlug, setHoveredPracticeSlug] = useState<string>(
    dynamicPractices[0]?.slug || "advisory"
  );
  const megaMenuRef = useRef<HTMLDivElement>(null);

  const isAdminOrConsole =
    safePath.startsWith("/admin") ||
    safePath.startsWith("/posh/admin") ||
    safePath.startsWith("/posh/ic") ||
    safePath.startsWith("/posh/org");

  const isDarkHeroPage = safePath === "/";
  const isTransparent = isDarkHeroPage && !scrolled;

  const activePractice =
    dynamicPractices.find((p) => p.slug === hoveredPracticeSlug) || dynamicPractices[0] || PRACTICE_AREAS[0];

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

            {/* Mega Menu Trigger */}
            <div
              className="relative"
              ref={megaMenuRef}
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                aria-expanded={megaMenuOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1 px-3 py-2 rounded-btn transition ${
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

              {/* Mega Menu Dropdown */}
              {megaMenuOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[780px] bg-white rounded-card shadow-modal border border-border p-6 z-50 text-ink animate-fade-up grid grid-cols-12 gap-6"
                  role="region"
                  aria-label="Services Mega Menu"
                >
                  {/* Left 2 Columns: Practice Areas List (8 cols) */}
                  <div className="col-span-8">
                    <div className="text-[11px] font-semibold text-brass-700 uppercase tracking-widest pb-3 border-b border-border">
                      Practice Areas &amp; Advisory Capabilities
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-3">
                      {dynamicPractices.slice(0, 6).map((pa) => (
                        <Link
                          key={pa.slug}
                          href={`/services/${pa.slug}`}
                          onMouseEnter={() => setHoveredPracticeSlug(pa.slug)}
                          className={`p-3 rounded-btn border transition flex items-start gap-2.5 ${
                            hoveredPracticeSlug === pa.slug
                              ? "bg-ivory-50 border-brass-500/40 shadow-sm"
                              : "border-transparent hover:bg-surface"
                          }`}
                        >
                          <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                            {iconMap[pa.icon] || <Briefcase className="w-3.5 h-3.5 text-brass-500" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-ink leading-snug">
                              {pa.title}
                            </div>
                            <div className="text-[11px] text-ink-muted line-clamp-1 mt-0.5">
                              {pa.shortDesc}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Hovered Service Summary Preview (4 cols) */}
                  <div className="col-span-4 bg-surface rounded-card p-4 border border-border flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-semibold text-brass-700 tracking-wider">
                        Practice Focus
                      </div>
                      <h4 className="font-serif font-bold text-base text-ink mt-1">
                        {activePractice.title}
                      </h4>
                      <p className="font-sans text-xs text-ink-secondary mt-2 leading-relaxed">
                        {activePractice.shortDesc}
                      </p>
                      <ul className="mt-3 space-y-1 text-[11px] text-ink">
                        {activePractice.services?.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-brass-500" />
                            <span className="line-clamp-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 mt-3 border-t border-border">
                      <Link
                        href={`/services/${activePractice.slug}`}
                        className="text-xs font-semibold text-navy-700 hover:text-blue-600 flex items-center gap-1.5 group"
                      >
                        <span>View Practice Scope</span>
                        <ArrowRight className="w-3.5 h-3.5 text-brass-500 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
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
