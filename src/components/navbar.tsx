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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPracticeSlug, setHoveredPracticeSlug] = useState<string>(
    PRACTICE_AREAS[0]?.slug || "advisory"
  );
  const megaMenuRef = useRef<HTMLDivElement>(null);

  const isDarkHeroPage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  }, [pathname]);

  // Handle escape key to close mega menu and mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isHeaderTransparent = isDarkHeroPage && !scrolled;
  const activePractice =
    PRACTICE_AREAS.find((p) => p.slug === hoveredPracticeSlug) || PRACTICE_AREAS[0];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "h-[72px]" : "h-[88px]"
        } ${
          isHeaderTransparent
            ? "bg-transparent text-white border-b border-white/10"
            : "bg-ivory-50/95 backdrop-blur-md text-ink-950 border-b border-border shadow-card"
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          
          {/* Logo Lockup: A Monogram with oak leaf line + ACORN + LEGAL CONSULTANTS */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Acorn Legal Consultants Home"
          >
            {/* Monogram A with subtle oak leaf line */}
            <div
              className={`w-10 h-10 rounded-btn flex items-center justify-center transition duration-200 border ${
                isHeaderTransparent
                  ? "bg-navy-800/80 border-brass-500/40 text-brass-300"
                  : "bg-navy-700 border-navy-800 text-brass-300"
              }`}
            >
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                {/* Refined Serif A with oak leaf stem line */}
                <path
                  d="M16 6 L7 26 H11 L13.5 20 H18.5 L21 26 H25 L16 6 Z M14.5 17 L16 11.5 L17.5 17 H14.5 Z"
                  fill="currentColor"
                />
                {/* Subtle oak leaf stem tick */}
                <path
                  d="M16 11.5 C17 10 19 11 18.5 12.5 C18 14 16.5 15 16 17"
                  stroke="#D9C29A"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="flex flex-col">
              <span
                className={`font-serif text-2xl font-bold tracking-tight leading-none ${
                  isHeaderTransparent ? "text-white" : "text-ink-950"
                }`}
              >
                ACORN
              </span>
              <span
                className={`font-sans text-[10px] font-semibold tracking-[0.2em] uppercase mt-1 ${
                  isHeaderTransparent ? "text-brass-300" : "text-brass-700"
                }`}
              >
                Legal Consultants
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
                  ? isHeaderTransparent
                    ? "text-white font-semibold"
                    : "text-navy-700 font-semibold bg-stone-100"
                  : isHeaderTransparent
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
                  ? isHeaderTransparent
                    ? "text-white font-semibold"
                    : "text-navy-700 font-semibold bg-stone-100"
                  : isHeaderTransparent
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
                    ? isHeaderTransparent
                      ? "text-white font-semibold"
                      : "text-navy-700 font-semibold bg-stone-100"
                    : isHeaderTransparent
                    ? "text-white/80 hover:text-white"
                    : "text-ink hover:text-navy-700 hover:bg-stone-100"
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    megaMenuOpen ? "rotate-180" : ""
                  } ${isHeaderTransparent ? "text-brass-300" : "text-brass-700"}`}
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
                      {PRACTICE_AREAS.slice(0, 6).map((pa) => (
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
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-border mt-3">
                      <Link
                        href={`/services/${activePractice.slug}`}
                        className="text-xs font-semibold text-navy-700 hover:text-blue-600 flex items-center gap-1"
                      >
                        <span>View service details</span>
                        <ArrowRight className="w-3 h-3 text-brass-500" />
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
                  ? isHeaderTransparent
                    ? "text-white font-semibold"
                    : "text-navy-700 font-semibold bg-stone-100"
                  : isHeaderTransparent
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
                  ? isHeaderTransparent
                    ? "text-white font-semibold"
                    : "text-navy-700 font-semibold bg-stone-100"
                  : isHeaderTransparent
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
                  ? isHeaderTransparent
                    ? "text-white font-semibold"
                    : "text-navy-700 font-semibold bg-stone-100"
                  : isHeaderTransparent
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
                  ? isHeaderTransparent
                    ? "text-white font-semibold"
                    : "text-navy-700 font-semibold bg-stone-100"
                  : isHeaderTransparent
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
              href={`tel:${BRAND_CONFIG.phone}`}
              title={`Call Chambers: ${BRAND_CONFIG.phone}`}
              className={`p-2.5 rounded-full transition border ${
                isHeaderTransparent
                  ? "text-brass-300 hover:text-white border-white/20 hover:bg-white/10"
                  : "text-navy-700 hover:text-brass-700 border-border hover:bg-surface"
              }`}
              aria-label="Call Acorn Legal Consultants"
            >
              <Phone className="w-4 h-4 text-brass-500" />
            </a>

            <Link
              href="/request-service"
              className={`h-[44px] px-5 rounded-btn flex items-center justify-center text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm ${
                isHeaderTransparent
                  ? "bg-brass-500 hover:bg-brass-300 text-ink-950 font-bold border border-brass-300"
                  : "bg-navy-700 hover:bg-blue-600 text-ivory-50 border border-navy-800"
              }`}
            >
              Request a Consultation
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href={`tel:${BRAND_CONFIG.phone}`}
              className={`p-2 rounded-btn border ${
                isHeaderTransparent
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
                isHeaderTransparent ? "text-white" : "text-ink-950"
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
                <div className="w-9 h-9 rounded-btn bg-navy-800 border border-brass-500/30 flex items-center justify-center text-brass-300">
                  <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
                    <path
                      d="M16 6 L7 26 H11 L13.5 20 H18.5 L21 26 H25 L16 6 Z M14.5 17 L16 11.5 L17.5 17 H14.5 Z"
                      fill="currentColor"
                    />
                  </svg>
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
