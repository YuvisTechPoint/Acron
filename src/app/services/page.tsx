"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  FileText,
  Compass,
  Landmark,
  ShieldCheck,
  Building,
  HelpCircle,
  CheckCircle2,
  Clock,
  Search,
  Phone,
  Mail,
  MessageSquare,
  Sparkles,
  Filter,
  Check,
} from "lucide-react";
import {
  PRACTICE_AREAS,
  BRAND_CONFIG,
  ALL_OFFERED_SERVICES,
  OfferedServiceItem,
} from "@/lib/constants";
import { Eyebrow, SectionHeading, Button, Rule, usePrefersReducedMotion } from "@/components/ui";
import { platformStore } from "@/lib/store";
import { useRealtimeServices } from "@/lib/realtime";
import { CustomService } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import {
  trackPhoneClick,
  trackWhatsAppClick,
  trackServiceInquiryClick,
  trackCatalogSearch,
} from "@/lib/analytics";

type CategoryFilter = "all" | "legal_court" | "finance_business" | "careers_attestation" | "education_admissions";

const CATEGORY_TABS: { id: CategoryFilter; label: string; count: number }[] = [
  { id: "all", label: "All Services", count: ALL_OFFERED_SERVICES.length },
  {
    id: "legal_court",
    label: "Legal & Court Matters",
    count: ALL_OFFERED_SERVICES.filter((s) => s.category === "legal_court").length,
  },
  {
    id: "finance_business",
    label: "Finance & Business",
    count: ALL_OFFERED_SERVICES.filter((s) => s.category === "finance_business").length,
  },
  {
    id: "careers_attestation",
    label: "Careers & Attestation",
    count: ALL_OFFERED_SERVICES.filter((s) => s.category === "careers_attestation").length,
  },
  {
    id: "education_admissions",
    label: "Education & Admissions",
    count: ALL_OFFERED_SERVICES.filter((s) => s.category === "education_admissions").length,
  },
];

export default function ServicesIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const services = useRealtimeServices();
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    setCursorPos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const filteredServices = useMemo(() => {
    return ALL_OFFERED_SERVICES.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.highlight && item.highlight.toLowerCase().includes(q)) ||
        item.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Telemetry & Ads tracking for user search intent
  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const timer = setTimeout(() => {
        trackCatalogSearch(searchQuery.trim(), selectedCategory, filteredServices.length);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, selectedCategory, filteredServices.length]);

  const servicesCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Acorn Consultants - Products & Services Directory",
    description:
      "Comprehensive catalog of 37 specialized educational, taxation, and legal services offered by Acorn Consultants under Advocate on Panel Adv. Rajesh Telge.",
    itemListElement: ALL_OFFERED_SERVICES.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.description,
        serviceType: s.categoryLabel,
        provider: {
          "@type": "LegalService",
          name: "Acorn Consultants",
          url: "https://acornconsultants.in",
        },
        areaServed: ["Kolkata", "West Bengal", "Maharashtra", "India"],
      },
    })),
  };

  return (
    <div className="bg-ivory-50 text-ink min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesCatalogSchema) }}
      />
      {/* Editorial Header */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 border-b border-border bg-ivory-50">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6">
          <nav className="text-xs font-sans text-ink-muted flex items-center gap-2">
            <Link href="/" className="hover:text-navy-700 transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-brass-700 font-semibold">Services</span>
          </nav>

          <Eyebrow>WELCOME TO ACORN CONSULTANTS</Eyebrow>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink-950 leading-[1.05] max-w-4xl">
            Educational, Tax &amp;{" "}
            <span className="font-serif italic font-normal text-brass-700">Legal</span> Services.
          </h1>

          <p className="font-sans text-lg sm:text-xl text-ink-secondary max-w-3xl leading-relaxed">
            Over 15 years of expertise in Educational, Tax &amp; Legal Services. Work done well,
            with a personal touch. If you have a legal problem, our experts can help you find a
            SOLUTION.
          </p>

          {/* Authentic Help Box Banner */}
          <div className="mt-8 p-6 sm:p-8 rounded-card bg-navy-950 text-white border border-brass-500/30 shadow-card space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-brass-400 block">
                  Not sure what you need, or what it costs? We’re here to help.
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Get in touch with our advisory desk today.
                </h2>
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We’re always happy to talk about how we can best serve you. Direct assistance for
                  doorstep registration, court marriages, title searches, university admissions, and
                  advocacy.
                </p>
                <div className="text-xs text-brass-300 font-medium pt-1">
                  Advocate on Panel:{" "}
                  <span className="font-bold text-white">Mr. Rajesh Telge</span> (
                  <a href="tel:+918369171822" className="hover:underline text-brass-400">
                    +91 8369171822
                  </a>
                  )
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
                <a
                  href="tel:+918286936899"
                  onClick={() => trackPhoneClick("+91 8286936899", "Main Desk")}
                  className="py-3 px-5 rounded-btn bg-brass-500 hover:bg-brass-400 text-ink-950 font-sans text-xs font-bold flex items-center gap-2 shadow-sm transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>+91 8286936899</span>
                </a>
                <a
                  href="https://wa.me/918286936899"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("services_top_banner")}
                  className="py-3 px-5 rounded-btn bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-bold flex items-center gap-2 shadow-sm transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="mailto:acornconsultant2014@gmail.com"
                  className="py-3 px-5 rounded-btn bg-navy-800 hover:bg-navy-700 text-white font-sans text-xs font-bold flex items-center gap-2 border border-navy-700 transition"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Catalog Section (All 37 Services) */}
      <section className="py-16 sm:py-24 border-b border-border bg-stone-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="space-y-4">
            <SectionHeading
              eyebrow="COMPLETE PRACTICE CATALOGUE"
              title="All Products &amp; Specialized Services"
              accentWord="Specialized"
              description="Browse our complete 37-service registry covering matrimonial solemnization, property due diligence, society management, attestations, and academic guidance."
            />

            {/* Filter Tabs & Search Bar */}
            <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {CATEGORY_TABS.map((tab) => {
                  const isActive = selectedCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedCategory(tab.id)}
                      className={`py-2 px-3.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isActive
                          ? "bg-navy-900 text-white shadow-sm"
                          : "bg-white text-ink-secondary hover:text-ink-950 border border-border hover:border-border-dark"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isActive
                            ? "bg-brass-500 text-ink-950 font-bold"
                            : "bg-stone-100 text-ink-muted"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services (e.g., Will, 7x12, MBBS)..."
                  className="w-full pl-9 pr-8 py-2 text-xs bg-white rounded-btn border border-border focus:border-brass-500 focus:outline-none transition shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-ink-muted hover:text-ink"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Result Count */}
          <div className="text-xs text-ink-muted">
            Showing <span className="font-semibold text-ink-950">{filteredServices.length}</span> of{" "}
            {ALL_OFFERED_SERVICES.length} services
            {searchQuery && (
              <span>
                {" "}
                matching &ldquo;<span className="text-ink-950">{searchQuery}</span>&rdquo;
              </span>
            )}
          </div>

          {/* Cards Grid */}
          {filteredServices.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-card border border-border space-y-3">
              <HelpCircle className="w-8 h-8 text-brass-600 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-ink-950">No service found</h3>
              <p className="text-xs text-ink-secondary max-w-md mx-auto">
                We couldn&rsquo;t find any service matching your query. Please clear the search or
                contact our desk directly at +91 8286936899.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="text-xs font-semibold text-navy-700 underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-card border border-border bg-white hover:border-brass-500/60 transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow-card group"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-navy-800 bg-navy-50 border border-navy-200 px-2 py-0.5 rounded">
                        {item.categoryLabel}
                      </span>
                      {item.highlight && (
                        <span className="text-[10px] uppercase font-bold tracking-wider text-brass-800 bg-brass-100/80 border border-brass-300 px-2 py-0.5 rounded">
                          {item.highlight}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl font-bold text-ink-950 group-hover:text-brass-700 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="font-sans text-xs text-ink-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <Link
                      href={`/request-service?service=${encodeURIComponent(item.title)}`}
                      onClick={() => trackServiceInquiryClick(item.title, item.categoryLabel)}
                      className="text-xs font-bold text-navy-700 group-hover:text-brass-700 flex items-center gap-1.5 transition-colors"
                    >
                      <span>Inquire / Book</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <a
                      href="https://wa.me/918286936899"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick(`service_card_${item.id}`)}
                      className="text-[11px] text-ink-muted hover:text-emerald-700 flex items-center gap-1 transition"
                      title="Quick WhatsApp Inquiry"
                    >
                      <MessageSquare className="w-3 h-3 text-emerald-600" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Practice Disciplines / High-Level Capabilities Index */}
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIdx(null)}
        className="py-16 sm:py-24 max-w-[1240px] mx-auto px-4 sm:px-6 relative"
      >
        <div className="space-y-4 mb-10">
          <Eyebrow>CORE LEGAL DISCIPLINES</Eyebrow>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ink-950">
            Institutional &amp; Commercial Practice Areas
          </h2>
          <p className="font-sans text-sm sm:text-base text-ink-secondary max-w-2xl leading-relaxed">
            Specialized legal disciplines led by experienced advocates before High Courts,
            tribunals, and regulatory authorities.
          </p>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {PRACTICE_AREAS.map((pa, idx) => {
            const stepNum = String(idx + 1).padStart(2, "0");

            return (
              <Link
                key={pa.slug}
                href={`/services/${pa.slug}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                className="group block py-8 sm:py-10 transition-all duration-300 relative focus:outline-none focus:bg-stone-100/50"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Number (2 cols) */}
                  <div className="md:col-span-2">
                    <span className="font-serif text-3xl sm:text-5xl font-bold text-navy-700/30 group-hover:text-brass-700 transition-colors">
                      {stepNum}
                    </span>
                  </div>

                  {/* Title & Desc (8 cols) */}
                  <div className="md:col-span-8 space-y-2">
                    <h3 className="font-serif text-2xl sm:text-4xl font-bold text-ink-950 group-hover:text-brass-700 transition-colors">
                      {pa.title}
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed max-w-2xl">
                      {pa.shortDesc}
                    </p>
                  </div>

                  {/* Arrow Action (2 cols) */}
                  <div className="md:col-span-2 flex justify-start md:justify-end items-center">
                    <div className="w-12 h-12 rounded-full border border-border group-hover:border-brass-500/50 bg-white group-hover:bg-brass-500 flex items-center justify-center transition-all duration-200 shadow-sm">
                      <ArrowRight className="w-5 h-5 text-brass-500 group-hover:text-ink-950 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Floating Cursor-Following Arch Image Preview (Desktop Only) */}
        {!reducedMotion && hoveredIdx !== null && (
          <div
            className="hidden lg:block pointer-events-none fixed z-50 w-72 h-88 arch-mask bg-ink-950 border border-brass-500/40 shadow-raised p-4 transition-transform duration-100 ease-out"
            style={{
              left: `${cursorPos.x + 40}px`,
              top: `${cursorPos.y - 120}px`,
              transform: "translate3d(0, 0, 0)",
            }}
          >
            <div className="w-full h-full arch-mask bg-gradient-to-b from-navy-900 to-ink-950 border border-brass-500/20 p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase font-semibold text-brass-300 tracking-wider">
                Practice Focus 0{hoveredIdx + 1}
              </span>
              <h4 className="font-serif text-lg font-bold mt-1 text-white leading-tight">
                {PRACTICE_AREAS[hoveredIdx]?.title}
              </h4>
              <p className="text-[11px] text-slate-300 mt-2 line-clamp-2">
                {PRACTICE_AREAS[hoveredIdx]?.shortDesc}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Dynamic Retainer & Advisory Catalogue (Configurable from Admin) */}
      {services.length > 0 && (
        <section className="py-16 sm:py-20 border-t border-border bg-white">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-10">
            <div className="text-left space-y-2">
              <Eyebrow>STRUCTURED ENGAGEMENTS</Eyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-950">
                Advisory Retainers &amp; Transparent Packages
              </h2>
              <p className="font-sans text-sm text-ink-secondary max-w-xl">
                Standardized statutory mandates, corporate retainer agreements, and rapid consultation
                packages.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="p-6 rounded-card border border-border bg-ivory-50/40 hover:bg-white hover:border-brass-500/60 transition flex flex-col justify-between space-y-6 shadow-sm group"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-brass-700 bg-brass-50 border border-brass-200 px-2 py-0.5 rounded">
                        {s.category}
                      </span>
                      <span className="text-[11px] text-ink-muted flex items-center gap-1">
                        <Clock className="w-3 h-3 text-brass-500" />
                        <span>{s.turnaroundDays}</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-ink-950 group-hover:text-brass-700 transition">
                      {s.name}
                    </h3>

                    <p className="font-sans text-xs text-ink-secondary leading-relaxed">
                      {s.shortDesc}
                    </p>

                    <div className="pt-2 border-t border-border flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-bold text-ink-950">
                        {formatINR(s.pricePaise)}
                      </span>
                      <span className="text-[11px] text-ink-secondary">(+ 18% GST)</span>
                    </div>

                    <ul className="space-y-2 pt-2 border-t border-border-subtle">
                      {s.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-ink">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Link
                      href="/request-service"
                      className="w-full py-2.5 px-4 bg-navy-900 hover:bg-navy-800 text-ivory-50 font-sans text-xs font-bold rounded-btn flex items-center justify-center gap-2 shadow-sm transition"
                    >
                      <span>Inquire / Engage Counsel</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brass-400" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing Guidance */}
      <section className="bg-stone-100 py-20 sm:py-24 border-t border-border">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950">
              Need counsel on a customized statutory or educational matter?
            </h3>
            <p className="font-sans text-sm text-ink-secondary leading-relaxed">
              We review complex documentation, title briefs, and academic applications promptly.
              Contact our advisory desk directly.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="primary" href="/request-service" arrow>
              Request a Consultation
            </Button>
            <Button variant="secondary" href="/contact">
              Contact Chambers
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
