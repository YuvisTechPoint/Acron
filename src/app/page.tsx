"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  FileText,
  Compass,
  Landmark,
  ShieldCheck,
  Building,
  HelpCircle,
  ArrowRight,
  Phone,
  Shield,
  Eye,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Lock,
  Search,
  Scale,
  Play,
  Pause,
} from "lucide-react";
import { BRAND_CONFIG, PRACTICE_AREAS } from "@/lib/constants";
import { platformStore } from "@/lib/store";
import { useRealtimeSiteConfig, useRealtimeFaqs, useRealtimePosts } from "@/lib/realtime";
import { formatDate } from "@/lib/utils";
import {
  Button,
  Eyebrow,
  SectionHeading,
  EditorialLink,
  Rule,
  Card,
  ArchImage,
  Accordion,
  Reveal,
  LineReveal,
  GoverningPrincipleScrollReveal,
} from "@/components/ui";
import { FooterChambersDispatch } from "@/components/footer-chambers-dispatch";
import { EngagementProtocol } from "@/components/home/engagement-protocol";
import { ChambersLeadership } from "@/components/home/chambers-leadership";

const ICON_MAP: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase className="w-5 h-5 text-brass-500" />,
  FileText: <FileText className="w-5 h-5 text-brass-500" />,
  Compass: <Compass className="w-5 h-5 text-brass-500" />,
  Landmark: <Landmark className="w-5 h-5 text-brass-500" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-brass-500" />,
  Building: <Building className="w-5 h-5 text-brass-500" />,
  HelpCircle: <HelpCircle className="w-5 h-5 text-brass-500" />,
};

const HOW_WE_WORK_STEPS = [
  {
    num: "01",
    title: "Enquire",
    desc: "Submit your matter securely via our structured consultation form or direct chambers contact. Initial conflict checks are initiated immediately.",
  },
  {
    num: "02",
    title: "Understand",
    desc: "Our counsel conducts an exhaustive preliminary statutory review, identifying underlying regulatory risk and commercial implications.",
  },
  {
    num: "03",
    title: "Advise",
    desc: "You receive tailored legal opinions, practical pathways, and transparent fee frameworks without ambiguous contingencies.",
  },
  {
    num: "04",
    title: "Act",
    desc: "We draft precision documentation, constitute and train committees, or represent your position before regulatory bodies.",
  },
  {
    num: "05",
    title: "Review",
    desc: "Continuous post-matter monitoring, statutory compliance audit trails, and long-term governance support.",
  },
];

const HOMEPAGE_FAQS = [
  {
    id: "faq-1",
    title: "What legal advisory areas does Acorn Legal Consultants cover?",
    content:
      "We provide specialized counsel in Corporate Advisory & Commercial Governance, Legal Documentation & Contracts, Commercial Dispute Resolution & Arbitration, and comprehensive POSH Act 2013 institutional compliance for enterprises, startups, and educational institutions in Kolkata and across India.",
  },
  {
    id: "faq-2",
    title: "How does Acorn assist individuals and organisations with workplace harassment (POSH)?",
    content:
      "We provide compassionate, complete support for everyone. For individuals—whether female or male—we offer confidential listening, immediate workplace protection, and legal guidance if you are facing harassment, distress, or wrongful accusations. For organisations, we help set up unbiased grievance committees, provide independent external members, conduct respectful workplace training, and ensure fair, dignified resolutions for all parties.",
  },
  {
    id: "faq-3",
    title: "How quickly does counsel respond to consultation requests?",
    content:
      "All formal consultation submissions and privileged intake enquiries receive written or telephonic response within one business day following routine conflict-of-interest verification.",
  },
  {
    id: "faq-4",
    title: "Where are your chambers located in Kolkata?",
    content:
      "Our chambers are situated at Suite 4B, Camac Court, 25 Camac Street, in the Park Street District of Kolkata, West Bengal 700016. In-person consultations are available by prior appointment.",
  },
];

const FEATURED_INSIGHTS = [
  {
    slug: "posh-annual-report-district-officer-west-bengal-guide",
    category: "POSH Compliance",
    date: "15 Oct 2026",
    title: "Statutory Filing of POSH Annual Reports to the District Officer in West Bengal",
    excerpt:
      "A comprehensive practical guide on Section 21 statutory reporting obligations for corporate employers in Kolkata.",
  },
  {
    slug: "remote-work-hybrid-workplace-posh-jurisdiction",
    category: "POSH Compliance",
    date: "28 Oct 2026",
    title: "Extending POSH Act Jurisdiction to Hybrid Work & Virtual Communications",
    excerpt:
      "Navigating Slack, Zoom, and WhatsApp misconduct under the 'notional extension of workplace' doctrine.",
  },
  {
    slug: "real-estate-title-due-diligence-kolkata-rajarhat-wbrera",
    category: "Real Estate & RERA",
    date: "02 Nov 2026",
    title: "Commercial Title Due Diligence & WBRERA Compliance in Rajarhat-New Town",
    excerpt:
      "Mitigating title defects, land ceiling sanctions, and municipal approvals in Bengal commercial transactions.",
  },
];

function formatCategory(cat?: string): string {
  if (!cat) return "Statutory Commentary";
  const mapped: Record<string, string> = {
    posh_compliance: "POSH Compliance",
    posh: "POSH Compliance",
    real_estate: "Real Estate & RERA",
    corporate_advisory: "Corporate Advisory",
    dispute_resolution: "Dispute Resolution",
    commercial_contracts: "Commercial Law",
    corporate_law: "Corporate Law",
  };
  if (mapped[cat.toLowerCase()]) return mapped[cat.toLowerCase()];
  return cat.replace(/[_-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const PRACTICE_DISCIPLINES_VIBE_LIST = [
  {
    num: "03",
    badge: "REAL ESTATE & RERA",
    title: "Real Estate, Title Due Diligence & RERA",
    desc: "Comprehensive 30-year property title search reports, MahaRERA & RERA complaint registration, Property Card, 7/12 extracts, and Index-2 verification.",
    slug: "real-estate-property",
  },
  {
    num: "04",
    badge: "TAX & ADVISORY",
    title: "Educational, Tax & Legal Advisory",
    desc: "Over 15 years of multifaceted expertise delivering customized solutions across educational, tax, statutory governance, and personal client advisory.",
    slug: "advisory",
  },
  {
    num: "05",
    badge: "LEGAL DRAFTING",
    title: "Legal Documentation & Contracts",
    desc: "Precision drafting and registration of Leave & License, Sale Agreements, Powers of Attorney, Registered Wills, Gift Deeds, and Commercial Bonds.",
    slug: "legal-documentation",
  },
  {
    num: "06",
    badge: "DISPUTE RESOLUTION",
    title: "Dispute Resolution & In-House Mediation",
    desc: "Pre-litigation strategy, structured in-house mediation, commercial arbitration, and motor accident compensation under the Motor Vehicles Act.",
    slug: "dispute-resolution",
  },
  {
    num: "07",
    badge: "JUDICIAL ADVOCACY",
    title: "Judicial & Matrimonial Representation",
    desc: "Disciplined advocacy in Civil, Criminal, and Property litigation, Court Marriage solemnization for all castes & religions, Divorce, and High Court advocacy.",
    slug: "representation",
  },
  {
    num: "08",
    badge: "SOCIETY GOVERNANCE",
    title: "Society Governance & Commercial Support",
    desc: "Co-operative society formation by approved GDCA auditors, society bye-laws management, member transfer papers, and corporate transactional support.",
    slug: "corporate-commercial",
  },
  {
    num: "09",
    badge: "LABOUR & EMPLOYMENT",
    title: "Labour & Employment Law",
    desc: "Advising employers on Industrial Disputes Act, Code on Wages, Shops and Establishments regulations, executive severance, and non-compete covenants.",
    slug: "employment-labour",
  },
  {
    num: "01",
    badge: "FINANCIAL RECOVERY",
    title: "Check Bounce & Financial Recovery",
    desc: "Expert 30-day statutory notice drafting, Section 138 Negotiable Instruments Act criminal complaints, Summary Suits for debt recovery, and trial defense.",
    slug: "check-bounce",
  },
  {
    num: "02",
    badge: "STATUTORY POSH",
    title: "POSH Compliance & IC Services",
    desc: "Compassionate, unbiased support for anyone facing workplace harassment along with grievance committee setup, external members, and training.",
    slug: "posh-compliance",
  },
];

const ROLLING_PRACTICE_ITEMS = [
  ...PRACTICE_DISCIPLINES_VIBE_LIST,
  ...PRACTICE_DISCIPLINES_VIBE_LIST,
];

const VIBE_STYLE_TRUST_ITEMS = [
  {
    tag: "ORDERS & INTAKE",
    title: "Track your intake",
    desc: "Shipment updates once your intake case dossier is evaluated and conflict verified.",
    href: "/posh/portal",
  },
  {
    tag: "PAYMENTS",
    title: "Secure checkout",
    desc: "Pay with UPI, cards, and net banking at checkout with transparent fee schedules.",
    href: "/pay",
  },
  {
    tag: "FULFILLMENT",
    title: "In-stock dispatch",
    desc: "Certified 30-year property searches and legal drafts dispatch within 1–2 business days.",
    href: "/services/real-estate-property",
  },
  {
    tag: "SUPPORT",
    title: "Chambers advisors",
    desc: "Talk to practicing advocates before you retain — direct consultation Mon–Sat.",
    href: "/contact",
  },
  {
    tag: "DELIVERY",
    title: "Fast delivery",
    desc: "Pan-Maharashtra legal representation across High Court, MahaRERA & tribunals.",
    href: "/services",
  },
];

const ROLLING_TRUST_ITEMS = [
  ...VIBE_STYLE_TRUST_ITEMS,
  ...VIBE_STYLE_TRUST_ITEMS,
];

export default function HomePage() {
  const [currentMobileSlide, setCurrentMobileSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isRollingPaused, setIsRollingPaused] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) {
      setCurrentMobileSlide((prev) => (prev === 2 ? 0 : prev + 1));
    } else if (diff < -50) {
      setCurrentMobileSlide((prev) => (prev === 0 ? 2 : prev - 1));
    }
    setTouchStartX(null);
  };

  const siteConfig = useRealtimeSiteConfig();
  const rawFaqs = useRealtimeFaqs();
  const rawPosts = useRealtimePosts();
  const homepageFaqs = rawFaqs.filter((f) => f.showOnHomepage).sort((a, b) => a.order - b.order);

  const effectiveInsights = rawPosts.length > 0
    ? rawPosts.slice(0, 3).map((p) => ({
      slug: p.slug,
      category: formatCategory(p.category),
      date: formatDate(p.publishedAt),
      title: p.title,
      excerpt: p.excerpt || p.summary,
    }))
    : FEATURED_INSIGHTS;

  const steps = siteConfig.pathwaySteps && siteConfig.pathwaySteps.length > 0
    ? siteConfig.pathwaySteps
    : HOW_WE_WORK_STEPS;

  const principles = siteConfig.principles && siteConfig.principles.length > 0
    ? siteConfig.principles
    : [
      {
        num: "Principle I",
        title: "Integrity",
        quote: "Upholding the ethical independence and statutory duty of the Bar above all short-term commercial expedience.",
        desc: "Every opinion rendered is unvarnished, independent, and anchored in statutory authority.",
      },
      {
        num: "Principle II",
        title: "Strategic Insight",
        quote: "Anticipating statutory risk and procedural traps before commercial conflict becomes irreparable.",
        desc: "We formulate proactive dispute-containment strategies that preserve capital and reputational equity.",
      },
      {
        num: "Principle III",
        title: "Commercial Understanding",
        quote: "Harmonising strict statutory compliance with the operational realities of modern enterprise.",
        desc: "Legal solutions designed for real-world execution, cross-border velocity, and institutional scale.",
      },
    ];

  const formattedFaqs = homepageFaqs.length > 0
    ? homepageFaqs.map((f) => ({
      id: f.id,
      title: f.question,
      content: f.answer,
    }))
    : HOMEPAGE_FAQS;

  const bannerSlides = [
    {
      id: "slide-hero",
      tag: "Advocacy & Chambers Counsel",
      title: siteConfig.heroArchTitle || "Chambers of Acorn",
      subtitle: "Excellence in Law. Integrity in Practice.",
      image: siteConfig.heroBgImage || "/images/hero.jpg",
      alt: "Chambers of Acorn consultation desk",
    },
    {
      id: "slide-posh",
      tag: "Workplace Harassment Protection",
      title: "POSH Statutory Compliance Hub",
      subtitle: "Confidential Grievance Redressal & IC Advisory",
      image: "/images/posh.png",
      alt: "POSH Statutory Compliance Desk",
    },
    {
      id: "slide-property",
      tag: "Real Estate & Commercial Diligence",
      title: "30-Year Property Verification",
      subtitle: "Title Due Diligence & RERA Advisory",
      image: "/images/hero-custom-bg.jpg",
      alt: "Property Title Verification & Due Diligence",
    },
  ];

  return (
    <div className="bg-ivory-50 text-ink selection:bg-brass-300/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "LegalService",
                "@id": "https://acornconsultants.in/#legalservice",
                name: "Acorn Consultants - Educational, Tax & Legal Services",
                description:
                  "Over 15 years of trusted expertise providing dedicated legal advocacy, 30-year property title search, statutory document attestation, society management, and educational consulting under Advocate on Panel Adv. Rajesh Telge.",
                url: "https://acornconsultants.in",
                telephone: "+91-8286936899",
                priceRange: "₹₹",
                image: "https://acornconsultants.in/brand/hero.png",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Suite 4B, Camac Court, 25 Camac Street",
                  addressLocality: "Kolkata",
                  addressRegion: "West Bengal",
                  postalCode: "700016",
                  addressCountry: "IN",
                },
                founder: {
                  "@type": "Person",
                  name: "Adv. Rajesh Telge",
                  jobTitle: "Advocate on Panel & Principal Legal Consultant",
                  telephone: "+91-8369171822",
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://acornconsultants.in",
                  },
                ],
              },
            ],
          }),
        }}
      />

      {/* 1A. MOBILE PHONE HERO: Integrated High-End Editorial Experience (< lg screens) */}
      <section className="block lg:hidden relative bg-navy-950 text-white pt-[76px] pb-12 border-b border-navy-800/80 overflow-hidden">
        {/* Full atmospheric background image with smooth slide cross-fade */}
        <div
          className="relative min-h-[520px] sm:min-h-[580px] w-full flex flex-col justify-between overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Background image layer */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            {bannerSlides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  currentMobileSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  priority={idx === 0}
                  className="object-cover"
                  style={{ objectPosition: "68% 22%" }}
                />
              </div>
            ))}
            {/* Cinematic multi-stop gradient overlay for pristine contrast and depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/92 via-45% to-navy-950 z-15 pointer-events-none" />
          </div>

          {/* Interactive Segmented Slide Selector Tabs */}
          <div className="relative z-20 px-4 pt-3">
            <div className="flex items-center justify-between gap-1.5 p-1 rounded-full bg-navy-900/90 border border-white/15 backdrop-blur-md shadow-lg">
              {bannerSlides.map((slide, idx) => {
                const isActive = currentMobileSlide === idx;
                const shortLabels = ["⚖️ Chambers", "🛡️ POSH Hub", "📜 Property"];
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentMobileSlide(idx)}
                    className={`flex-1 py-1.5 px-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-300 text-center truncate cursor-pointer ${
                      isActive
                        ? "bg-brass-500 text-ink-950 font-bold shadow-xs scale-[1.02]"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {shortLabels[idx] || slide.tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Content Container */}
          <div className="relative z-20 px-5 pt-6 pb-4 space-y-4 text-left my-auto">
            {/* Chambers Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900/90 border border-brass-500/40 text-brass-300 text-[10.5px] font-semibold tracking-widest uppercase shadow-md backdrop-blur-md">
              <Scale className="w-3.5 h-3.5 text-brass-400 shrink-0" />
              <span>Advocates &amp; Chambers Counsel • Est. 2014</span>
            </div>

            {/* High-Contrast Bold 3-Tier Headline */}
            <h1 suppressHydrationWarning className="font-serif text-[29px] sm:text-[36px] font-bold tracking-tight text-white leading-[1.12] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {siteConfig.heroHeadline || "Excellence in Law & Advisory."}<br />
              <span className="font-serif italic font-normal text-brass-300 text-[24px] sm:text-[30px] block mt-1">
                {siteConfig.heroSubheadline || "Educational, Tax & Legal Solutions."}
              </span>
            </h1>

            {/* Editorial Paragraph */}
            <p suppressHydrationWarning className="font-sans text-[13.5px] sm:text-sm text-slate-200 leading-relaxed font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              {siteConfig.heroDescription || "Over 15 years of trusted expertise providing dedicated legal advocacy, 30-year property title search, statutory document attestation, society management, and educational consulting with personal client care."}
            </p>

            {/* Stacked Full-Width Action Buttons */}
            <div className="pt-2 space-y-2.5">
              <Link
                href={siteConfig.heroPrimaryCtaLink || "/request-service"}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-brass-500 via-brass-400 to-brass-500 hover:from-brass-400 hover:to-brass-300 text-ink-950 font-sans font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(176,141,87,0.35)] active:scale-[0.98] transition-all"
              >
                <span suppressHydrationWarning>{siteConfig.heroPrimaryCtaText || "Request a Consultation"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={siteConfig.heroSecondaryCtaLink || "/services"}
                className="w-full h-12 rounded-xl border border-white/20 hover:border-brass-400/60 bg-white/10 hover:bg-white/15 text-white font-sans font-semibold text-sm flex items-center justify-center gap-2 backdrop-blur-md active:scale-[0.98] transition-all"
              >
                <span suppressHydrationWarning>{siteConfig.heroSecondaryCtaText || "Explore our services"}</span>
                <ArrowRight className="w-4 h-4 text-brass-400" />
              </Link>
            </div>

            {/* 1-Tap Direct Chambers Telephone Card */}
            <a
              href={`tel:${BRAND_CONFIG.phone}`}
              className="flex items-center justify-between p-3.5 rounded-xl bg-navy-900/95 border border-brass-500/35 text-white backdrop-blur-md active:bg-navy-800 transition shadow-sm mt-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brass-500/20 border border-brass-500/40 flex items-center justify-center text-brass-300 shrink-0">
                  <Phone className="w-4 h-4 text-brass-400" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-brass-300/90 font-semibold">Chambers Desk</div>
                  <div className="text-sm font-bold text-white tracking-wide">{BRAND_CONFIG.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10.5px] font-medium text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Mon–Sat 9AM–8PM</span>
              </div>
            </a>

            {/* 3 Trust Pillar Micro-Cards */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center">
              <div className="p-2.5 rounded-xl bg-navy-900/85 border border-white/15 backdrop-blur-sm">
                <span className="text-[11px] font-bold text-brass-400 uppercase tracking-wider block">15+ Yrs</span>
                <span className="text-[10px] text-slate-300 leading-tight block mt-0.5">Bar Practice</span>
              </div>
              <div className="p-2.5 rounded-xl bg-navy-900/85 border border-white/15 backdrop-blur-sm">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">100%</span>
                <span className="text-[10px] text-slate-300 leading-tight block mt-0.5">Confidential</span>
              </div>
              <div className="p-2.5 rounded-xl bg-navy-900/85 border border-white/15 backdrop-blur-sm">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block">30-Year</span>
                <span className="text-[10px] text-slate-300 leading-tight block mt-0.5">Title Search</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 1B. DESKTOP HERO SECTION: Full-bleed Heritage Law Library (preserved on >= lg screens) */}
      <section className="hidden lg:flex relative min-h-[88vh] xl:min-h-[92vh] bg-ink-950 text-white flex-col justify-between pt-24 pb-6 xl:pt-28 xl:pb-8 border-b border-navy-800/80 overflow-hidden">
        {/* Full-bleed Hero Background Image - Exactly matches user's uploaded master background */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src={siteConfig.heroBgImage || "/images/hero.jpg"}
            alt="Chambers of Acorn - Educational, Tax & Legal Consultants"
            fill
            priority
            quality={100}
            className="object-cover"
            style={{ objectPosition: "85% 30%" }}
          />
          {/* Studio Vignette: Deep rich gradient on left for typographic contrast, fading gently across the advocate and client */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/98 via-ink-950/75 via-48% to-ink-950/20 lg:to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-950/80 via-ink-950/20 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950/90 via-ink-950/40 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-4 sm:py-6 flex flex-col justify-between min-h-[80vh] lg:min-h-[82vh]">
          
          {/* Main Hero Story Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">

            {/* Left Column (7-8 cols): Display Headline, Editorial Body, CTAs */}
            <div className="lg:col-span-8 xl:col-span-7 space-y-6 sm:space-y-7 text-left max-w-2xl">

              {/* Chambers Eyebrow Emblem */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-navy-900/80 border border-brass-500/40 backdrop-blur-md text-brass-300 text-xs font-semibold tracking-[0.16em] uppercase shadow-lg">
                <Scale className="w-4 h-4 text-brass-400" />
                <span>Advocates &amp; Chambers Counsel • Est. 2014</span>
              </div>

              {/* Display Headline - Bold, Authoritative & Balanced */}
              <h1 suppressHydrationWarning className="font-serif text-4xl sm:text-6xl lg:text-[68px] font-bold tracking-tight text-white leading-[1.08] drop-shadow-xl">
                {siteConfig.heroHeadline || "Excellence in Law & Advisory."}<br />
                <span className="font-serif italic font-normal text-brass-300">
                  {siteConfig.heroSubheadline || "Educational, Tax & Legal Solutions."}
                </span>
              </h1>

              {/* Subtitle Paragraph */}
              <p suppressHydrationWarning className="font-sans text-base sm:text-lg text-slate-200/95 leading-[1.68] max-w-xl font-normal drop-shadow">
                {siteConfig.heroDescription || "Over 15 years of trusted expertise providing dedicated legal advocacy, 30-year property title search, statutory document attestation, society management, and educational consulting with personal client care."}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={siteConfig.heroPrimaryCtaLink || "/request-service"}
                  className="h-[52px] px-8 rounded-xl bg-gradient-to-r from-brass-500 via-brass-400 to-brass-500 hover:from-brass-400 hover:to-brass-300 text-ink-950 font-sans font-bold text-sm flex items-center gap-2.5 shadow-[0_4px_24px_rgba(176,141,87,0.38)] hover:shadow-[0_6px_30px_rgba(176,141,87,0.55)] transition-all duration-200 hover:translate-x-0.5 active:scale-[0.98]"
                >
                  <span suppressHydrationWarning>{siteConfig.heroPrimaryCtaText || "Request a Consultation"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={siteConfig.heroSecondaryCtaLink || "/services"}
                  className="h-[52px] px-7 rounded-xl bg-navy-950/70 hover:bg-navy-900/90 border border-white/20 hover:border-brass-400/80 text-white hover:text-brass-200 font-sans font-semibold text-sm flex items-center gap-2.5 backdrop-blur-md shadow-lg transition-all duration-200 active:scale-[0.98]"
                >
                  <span suppressHydrationWarning>{siteConfig.heroSecondaryCtaText || "Explore our services"}</span>
                  <ArrowRight className="w-4 h-4 text-brass-400" />
                </Link>
              </div>

              {/* Rapid Telephone Hot-link */}
              <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <a
                  href={`tel:${BRAND_CONFIG.phone}`}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/80 border border-brass-500/30 text-white hover:border-brass-400 hover:text-brass-300 transition-all backdrop-blur-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-brass-400" />
                  <span className="text-slate-300 font-medium">Chambers Desk:</span>
                  <span className="font-bold">{BRAND_CONFIG.phone}</span>
                </a>
                <span className="text-emerald-400 inline-flex items-center gap-1.5 font-medium px-3 py-1.5 rounded-full bg-navy-900/60 border border-emerald-500/30 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available Mon–Sat 9AM–8PM IST
                </span>
                <span className="text-slate-400/80 hidden xl:inline text-[11px] font-sans">
                  • Bar Council of India Compliant
                </span>
              </div>

            </div>

            {/* Right Column: Clean breathing room showcasing the authentic consultation photography */}
            <div className="lg:col-span-4 xl:col-span-5 hidden lg:block" />

          </div>

          {/* Bottom Row: 3 Floating Principle Cards in a wide, balanced glassmorphic dock */}
          <div className="pt-8 sm:pt-10 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 w-full">

              {/* Card 1: Discretion */}
              <Link
                href="/about"
                className="bg-navy-950/75 border border-white/10 hover:border-brass-400/70 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 sm:gap-4 backdrop-blur-xl shadow-2xl transition-all duration-200 hover:bg-navy-900/80 group"
              >
                <div className="w-10 h-10 rounded-lg bg-brass-500/10 border border-brass-500/30 flex items-center justify-center text-brass-400 shrink-0 group-hover:border-brass-400 group-hover:scale-105 transition-all">
                  <Lock className="w-5 h-5 text-brass-400" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-brass-400 font-bold mb-0.5">
                    Ethical Governance
                  </div>
                  <h3 suppressHydrationWarning className="text-sm sm:text-base font-bold text-white group-hover:text-brass-300 transition-colors">
                    {siteConfig.heroBadge1Title || "Discretion"}
                  </h3>
                  <p suppressHydrationWarning className="text-xs text-slate-300 leading-snug mt-1">
                    {siteConfig.heroBadge1Desc || "Absolute privilege & confidentiality across every client matter."}
                  </p>
                </div>
              </Link>

              {/* Card 2: Diligence */}
              <Link
                href="/services"
                className="bg-navy-950/75 border border-white/10 hover:border-brass-400/70 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 sm:gap-4 backdrop-blur-xl shadow-2xl transition-all duration-200 hover:bg-navy-900/80 group"
              >
                <div className="w-10 h-10 rounded-lg bg-brass-500/10 border border-brass-500/30 flex items-center justify-center text-brass-400 shrink-0 group-hover:border-brass-400 group-hover:scale-105 transition-all">
                  <Search className="w-5 h-5 text-brass-400" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-brass-400 font-bold mb-0.5">
                    Exhaustive Review
                  </div>
                  <h3 suppressHydrationWarning className="text-sm sm:text-base font-bold text-white group-hover:text-brass-300 transition-colors">
                    {siteConfig.heroBadge2Title || "Diligence"}
                  </h3>
                  <p suppressHydrationWarning className="text-xs text-slate-300 leading-snug mt-1">
                    {siteConfig.heroBadge2Desc || "Exhaustive statutory research & 30-year property title verification."}
                  </p>
                </div>
              </Link>

              {/* Card 3: Transparency */}
              <Link
                href="/request-service"
                className="bg-navy-950/75 border border-white/10 hover:border-brass-400/70 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 sm:gap-4 backdrop-blur-xl shadow-2xl transition-all duration-200 hover:bg-navy-900/80 group"
              >
                <div className="w-10 h-10 rounded-lg bg-brass-500/10 border border-brass-500/30 flex items-center justify-center text-brass-400 shrink-0 group-hover:border-brass-400 group-hover:scale-105 transition-all">
                  <ShieldCheck className="w-5 h-5 text-brass-400" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-brass-400 font-bold mb-0.5">
                    Accountable Counsel
                  </div>
                  <h3 suppressHydrationWarning className="text-sm sm:text-base font-bold text-white group-hover:text-brass-300 transition-colors">
                    {siteConfig.heroBadge3Title || "Transparency"}
                  </h3>
                  <p suppressHydrationWarning className="text-xs text-slate-300 leading-snug mt-1">
                    {siteConfig.heroBadge3Desc || "Clear fee schedule, documented scope & direct advocate communication."}
                  </p>
                </div>
              </Link>

            </div>
          </div>

        </div>
      </section>

      {/* 2. PHILOSOPHY STRIP: ivory background, grand commanding serif statement */}
      <section className="bg-ivory-50 py-24 sm:py-36 lg:py-44 border-b border-border relative overflow-hidden">
        {/* Low contrast section numeral watermark */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(8rem,30vw,28rem)] font-bold text-navy-700/[0.03] select-none pointer-events-none leading-none"
          aria-hidden="true"
        >
          01
        </div>

        <div className="max-w-[1440px] xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 text-center relative z-10 space-y-8 sm:space-y-10">
          <Eyebrow className="justify-center">OUR GOVERNING PRINCIPLE</Eyebrow>

          <GoverningPrincipleScrollReveal />

          <div className="pt-4 flex justify-center">
            <div className="w-24 sm:w-32 h-[2.5px] bg-brass-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* 3. PRACTICE AREAS BENTO: Edge-to-edge practice disciplines layout */}
      <section className="bg-stone-100 py-16 sm:py-24 border-b border-border w-full overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12 sm:space-y-14">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Core Competencies"
              title="Specialized Practice Areas"
              accentWord="Specialized"
              description="Rigorous legal counsel spanning corporate structuring, commercial documentation, dispute resolution, and statutory compliance."
            />
            <Button variant="secondary" href="/services" arrow>
              View Full Directory
            </Button>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

            {/* Large Feature Card: Advisory (Spans 7 cols) */}
            <div className="md:col-span-7">
              <Card
                variant="white"
                arrowOnHover
                href={`/services/${PRACTICE_AREAS[0]?.slug || "advisory"}`}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-border">
                    <span className="font-serif text-3xl font-bold text-navy-700/25">01</span>
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-navy-700">
                      {ICON_MAP[PRACTICE_AREAS[0]?.icon || "Briefcase"]}
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-brass-700">
                      Flagship Practice
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ink-950">
                      {PRACTICE_AREAS[0]?.title}
                    </h3>
                    <p className="font-sans text-base text-ink-secondary leading-relaxed">
                      {PRACTICE_AREAS[0]?.shortDesc}
                    </p>

                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink font-medium">
                      {PRACTICE_AREAS[0]?.services?.slice(0, 4).map((s, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brass-500 shrink-0" />
                          <span className="truncate">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-border flex items-center justify-between text-xs font-semibold text-navy-700">
                  <span>Explore practice scope</span>
                  <ArrowRight className="w-4 h-4 text-brass-500" />
                </div>
              </Card>
            </div>

            {/* Smaller Card 2 (Spans 5 cols) */}
            <div className="md:col-span-5">
              <Card
                variant="white"
                arrowOnHover
                href={`/services/${PRACTICE_AREAS[1]?.slug || "posh-compliance"}`}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <span className="font-serif text-3xl font-bold text-navy-700/25">02</span>
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-navy-700">
                      {ICON_MAP[PRACTICE_AREAS[1]?.icon || "ShieldCheck"]}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <h3 className="font-serif text-2xl font-bold text-ink-950">
                      {PRACTICE_AREAS[1]?.title}
                    </h3>
                    <p className="font-sans text-sm text-ink-secondary leading-relaxed line-clamp-3">
                      {PRACTICE_AREAS[1]?.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-navy-700">
                  <span>Explore practice scope</span>
                  <ArrowRight className="w-4 h-4 text-brass-500" />
                </div>
              </Card>
            </div>

          </div>

          {/* Why Acorn / Auto-Rolling Practice Disciplines (Why Vibe Music Pattern) */}
          <div className="pt-10 sm:pt-14 border-t border-border space-y-10 sm:space-y-12">
            {/* Top Row: Split Left Editorial + Right Auto-Rolling Infinite Track */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column (Spans 4 cols on lg) */}
              <div className="lg:col-span-4 space-y-5">
                <div className="flex items-center gap-2">
                  <span className="text-brass-600 text-xs">✦</span>
                  <span className="font-sans text-xs font-bold uppercase tracking-widest text-ink-muted">
                    Why Acorn Consultants
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-ink-950 leading-[1.14] tracking-tight">
                  Legal counsel,<br />
                  <span className="font-serif italic font-normal text-brass-700">without the</span><br />
                  guesswork.
                </h3>

                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  Orders, payments, dispatch, and support — transparent at every step so you can focus on resolution with absolute legal certainty.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-navy-700 hover:text-brass-600 transition-colors group"
                  >
                    <span>Explore all practice areas</span>
                    <ArrowRight className="w-4 h-4 text-brass-500 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsRollingPaused((p) => !p)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-ink-secondary bg-stone-100 hover:bg-stone-200 rounded-full transition-colors border border-border"
                    aria-label={isRollingPaused ? "Resume auto rolling cards" : "Pause auto rolling cards"}
                  >
                    {isRollingPaused ? (
                      <>
                        <Play className="w-3 h-3 text-amber-600 fill-amber-600" />
                        <span className="text-amber-800 font-semibold">Paused • Click to roll</span>
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Auto-rolling (Hover to pause)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Auto-Rolling Infinite Track (Spans 8 cols on lg) */}
              <div className="lg:col-span-8 overflow-hidden relative auto-rolling-cards-container py-3">
                {/* Left & Right subtle edge fade gradient masks */}
                <div className="hidden sm:block pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                <div className="hidden sm:block pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

                <div
                  className="auto-rolling-cards-track flex gap-4 sm:gap-5"
                  style={{ animationPlayState: isRollingPaused ? "paused" : undefined }}
                >
                  {ROLLING_PRACTICE_ITEMS.map((item, idx) => (
                    <Link
                      key={`${item.slug}-${idx}`}
                      href={`/services/${item.slug}`}
                      className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 bg-white rounded-2xl border border-border/80 shadow-xs hover:shadow-md hover:border-brass-300 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between group cursor-pointer focus:outline-none focus:ring-2 focus:ring-brass-400"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3.5 border-b border-border">
                          <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-navy-800 bg-navy-50/80 px-2.5 py-1 rounded-md border border-navy-100/60 group-hover:bg-brass-50 group-hover:border-brass-200 group-hover:text-brass-800 transition-colors">
                            {item.badge}
                          </span>
                          <span className="font-serif text-3xl sm:text-4xl font-bold text-slate-300/80 group-hover:text-brass-400/80 transition-colors">
                            {item.num}
                          </span>
                        </div>

                        <div className="mt-4 space-y-2">
                          <h4 className="font-serif text-lg font-bold text-ink-950 group-hover:text-navy-700 transition-colors leading-snug line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed line-clamp-3">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-navy-700 group-hover:text-brass-600 transition-colors">
                        <span>Consult counsel</span>
                        <ArrowRight className="w-3.5 h-3.5 text-brass-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row: 5-Card Trust & Fulfillment Matrix (Static on Desktop, Auto-Scrolling on Mobile) */}
            <div className="pt-8 border-t border-border">
              {/* Desktop View: Static 5-Column Grid */}
              <div className="hidden lg:grid lg:grid-cols-5 gap-3.5 sm:gap-4">
                {VIBE_STYLE_TRUST_ITEMS.map((item, idx) => (
                  <Link
                    key={`desktop-${idx}`}
                    href={item.href}
                    className="group p-4 sm:p-5 rounded-xl bg-stone-50/70 hover:bg-white border border-border hover:border-brass-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-navy-700/80 group-hover:text-brass-600 transition-colors">
                        {item.tag}
                      </span>
                      <h4 className="font-sans text-sm font-bold text-ink-950 mt-1.5 group-hover:text-navy-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="font-sans text-xs text-ink-secondary mt-1.5 leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-navy-700 group-hover:text-brass-600 group-hover:translate-x-0.5 transition-all">
                      <span>Learn more</span>
                      <ArrowRight className="w-3 h-3 text-brass-500" />
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile Phone View: Auto-Scrolling Horizontal Track */}
              <div className="lg:hidden overflow-hidden relative py-1 -mx-4 sm:-mx-6 px-4 sm:px-6">
                {/* Left & Right subtle edge fade gradient masks */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-stone-100 via-stone-100/80 to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-stone-100 via-stone-100/80 to-transparent z-10" />

                <div className="trust-matrix-mobile-track flex gap-3.5">
                  {ROLLING_TRUST_ITEMS.map((item, idx) => (
                    <Link
                      key={`mobile-trust-${idx}`}
                      href={item.href}
                      className="w-[260px] sm:w-[280px] shrink-0 p-4 sm:p-5 rounded-xl bg-white border border-border/90 hover:border-brass-300 shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between group active:scale-[0.99]"
                    >
                      <div>
                        <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-navy-700/80 group-hover:text-brass-600 transition-colors">
                          {item.tag}
                        </span>
                        <h4 className="font-sans text-sm font-bold text-ink-950 mt-1.5 group-hover:text-navy-700 transition-colors">
                          {item.title}
                        </h4>
                        <p className="font-sans text-xs text-ink-secondary mt-1.5 leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-navy-700 group-hover:text-brass-600 group-hover:translate-x-0.5 transition-all">
                        <span>Learn more</span>
                        <ArrowRight className="w-3 h-3 text-brass-500" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW WE WORK: Sticky-left, scrolling-right layout with 5 steps & Scroll-Driven Progressive Stage */}
      <EngagementProtocol steps={steps} />

      {/* 5. WHY ACORN: Stone background, 3 columns, principle sentences, NO statistics - Fully Clickable */}
      <section className="bg-stone-100 py-24 sm:py-32 border-b border-border">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-16">
          <SectionHeading
            align="center"
            eyebrow="CHAMBERS PHILOSOPHY"
            title="The Principles That Govern Our Practice"
            accentWord="Govern"
            description="Confidence comes from restraint. We measure our practice by ethical rigor, strategic clarity, and thorough preparation."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((prin, idx) => (
              <Link
                key={prin.num || idx}
                href="/about"
                className="bg-white p-8 rounded-card border border-border shadow-card space-y-4 block group focus:outline-none card-hover cursor-pointer hover:border-brass-400/80 transition-all"
              >
                <span className="text-xs uppercase font-semibold tracking-widest text-brass-700">
                  {prin.num}
                </span>
                <h3 className="font-serif text-2xl font-bold text-ink-950 group-hover:text-navy-700 transition-colors">{prin.title}</h3>
                <p className="font-serif italic text-lg text-ink leading-relaxed">
                  &ldquo;{prin.quote}&rdquo;
                </p>
                <p className="font-sans text-xs text-ink-secondary leading-relaxed pt-2 border-t border-border">
                  {prin.desc}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs text-navy-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Read chambers charter</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brass-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CHAMBERS LEADERSHIP & SENIOR ADVOCATES: Humanized, Professional Counsel Focus */}
      <ChambersLeadership />

      {/* 7. POSH FEATURE: Dark navy panel with arch placeholder, calm tone */}
      <section className="bg-ivory-50 py-24 sm:py-32 border-b border-border">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="bg-navy-900 rounded-card border border-navy-800 p-8 sm:p-14 text-white shadow-raised relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brass-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">

              <div className="lg:col-span-7 space-y-6">
                <Eyebrow dark>WORKPLACE HARASSMENT &amp; GRIEVANCE SUPPORT</Eyebrow>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-[1.12]">
                  Safe, respectful workplaces <span className="font-serif italic font-normal text-brass-300">for everyone.</span>
                </h2>
                <p className="font-sans text-base text-slate-300 leading-relaxed max-w-xl">
                  Facing harassment or unfair accusations at work can be deeply stressful. Whether you are a female or male employee seeking guidance, protection, or a fair hearing, or an employer building a culture of mutual respect—our team will stand by you and help you through every aspect with complete privacy.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Button variant="dark-primary" href="/posh" arrow>
                    Get Confidential Support
                  </Button>
                  <Button variant="dark-secondary" href="/posh/start" arrow>
                    Report a Workplace Concern
                  </Button>
                </div>
              </div>

              <Link href="/posh" className="lg:col-span-5 flex justify-center cursor-pointer group focus:outline-none">
                <div className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[1856/2304] rounded-2xl overflow-hidden shadow-2xl border border-brass-500/30 bg-navy-950 group-hover:border-brass-400 transition-colors">
                  <Image
                    src="/images/posh.png"
                    alt="POSH Compliance Desk - External Member Consultation at Chambers"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-contain group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  {/* Subtle inner gold border overlay */}
                  <div className="absolute inset-0 rounded-2xl border border-brass-500/20 pointer-events-none" />
                </div>
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* 7. INSIGHTS: 1 large featured article + 2 smaller ones - Fully Wired & Clickable */}
      <section className="bg-stone-100 py-24 sm:py-32 border-b border-border">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-16">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Knowledge &amp; Commentary"
              title="Statutory Commentary &amp; Publications"
              accentWord="Commentary"
              description="Thoughtful legal analysis on corporate governance amendments, arbitration jurisprudence, and workplace compliance."
            />
            <Button variant="secondary" href="/blog" arrow>
              View All Insights
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Large Featured Article (7 cols) */}
            <div className="lg:col-span-7">
              <Link href={`/blog/${effectiveInsights[0].slug}`} className="block h-full group focus:outline-none">
                <div className="bg-white rounded-card border border-border p-8 h-full flex flex-col justify-between shadow-card card-hover cursor-pointer group-hover:border-brass-400/80 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold uppercase tracking-wider text-brass-700" suppressHydrationWarning>
                        {effectiveInsights[0].category}
                      </span>
                      <span className="text-ink-muted" suppressHydrationWarning>{effectiveInsights[0].date}</span>
                    </div>

                    <h3
                      className="font-serif text-2xl sm:text-4xl font-bold text-ink-950 group-hover:text-navy-700 transition-colors leading-[1.2]"
                      suppressHydrationWarning
                    >
                      {effectiveInsights[0].title}
                    </h3>

                    <p
                      className="font-sans text-base text-ink-secondary leading-relaxed"
                      suppressHydrationWarning
                    >
                      {effectiveInsights[0].excerpt}
                    </p>
                  </div>

                  <div className="pt-8 mt-6 border-t border-border flex items-center justify-between text-xs font-semibold text-navy-700">
                    <span>Read statutory analysis</span>
                    <ArrowRight className="w-4 h-4 text-brass-500 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </div>

            {/* 2 Smaller Articles (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              {effectiveInsights.slice(1, 3).map((art) => (
                <Link key={art.slug} href={`/blog/${art.slug}`} className="block group focus:outline-none flex-1">
                  <div className="bg-white rounded-card border border-border p-6 h-full flex flex-col justify-between shadow-card card-hover cursor-pointer group-hover:border-brass-400/80 transition-all">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold uppercase tracking-wider text-brass-700" suppressHydrationWarning>
                          {art.category}
                        </span>
                        <span className="text-ink-muted" suppressHydrationWarning>{art.date}</span>
                      </div>
                      <h4
                        className="font-serif text-xl font-bold text-ink-950 group-hover:text-navy-700 transition-colors"
                        suppressHydrationWarning
                      >
                        {art.title}
                      </h4>
                      <p
                        className="font-sans text-xs text-ink-secondary line-clamp-2 leading-relaxed"
                        suppressHydrationWarning
                      >
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-navy-700">
                      <span>Read article</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brass-500 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 8. FAQ PREVIEW: 4 questions in accordion on left, "Still have a question?" card on right */}
      <section className="bg-ivory-50 py-24 sm:py-32 border-b border-border">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Accordion on Left (7 cols) */}
            <div className="lg:col-span-7 space-y-8" suppressHydrationWarning>
              <SectionHeading
                eyebrow="CLARITY &amp; PROCEDURE"
                title="Frequently Asked Questions"
                accentWord="Questions"
                description="Straightforward answers regarding our practice scope, statutory responsibilities, and consultation intake protocols."
              />

              <Accordion items={formattedFaqs} defaultOpenId={formattedFaqs[0]?.id || "faq-1"} />
            </div>

            {/* Card on Right (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-stone-100 rounded-card border border-border p-8 shadow-card space-y-6">
                <span className="text-xs uppercase font-semibold tracking-widest text-brass-700">
                  Direct Chambers Support
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950">
                  Still have a question regarding your matter?
                </h3>

                <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                  Our chambers desk provides preliminary orientation on engagement models, fee structures, and dispute representation frameworks.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-4 bg-white rounded-btn border border-border flex items-center gap-3">
                    <Phone className="w-4 h-4 text-brass-500 shrink-0" />
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-ink-muted">Chambers Telephone</div>
                      <a href={`tel:${BRAND_CONFIG.phone}`} className="text-sm font-bold text-navy-700 hover:underline">
                        {BRAND_CONFIG.phone}
                      </a>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-btn border border-border flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-ink-muted">Turnaround Commitment</div>
                      <div className="text-xs font-bold text-ink">Responses within 1 business day</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button variant="primary" href="/contact" arrow className="w-full">
                    Contact Chambers Desk
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. CLOSING CTA: ink-950 band with an arch, headline, primary brass button, phone link */}
      <section className="bg-ink-950 text-white py-24 sm:py-32 relative overflow-hidden">
        {/* Soft radial brass glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brass-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1080px] mx-auto px-4 sm:px-6 relative z-10 space-y-12">
          {/* Top Block: Intake Invitation */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            {/* Official Acorn Logo Emblem */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden mx-auto border border-brass-500/40 shadow-[0_4px_24px_rgba(0,0,0,0.6)] bg-navy-950 p-1 flex items-center justify-center transition-transform hover:scale-105 duration-300">
              <Image
                src="/brand/logo.png"
                alt="Acorn Legal Consultants Crest"
                width={80}
                height={80}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            <Eyebrow dark className="justify-center">CONFIDENTIAL INTAKE</Eyebrow>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              Let us understand your <span className="font-serif italic font-normal text-brass-300">matter</span>.
            </h2>

            <p className="font-sans text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
              Reach out to our chambers in Kolkata. We respond to every formal inquiry with absolute discretion, precision, and commercial clarity.
            </p>
          </div>

          {/* Newsletter / Chambers Dispatch Embedded Between Headline and Contact */}
          <div className="max-w-4xl mx-auto">
            <FooterChambersDispatch />
          </div>

          {/* Bottom Block: Call & Consultation Actions + Bar Council Address */}
          <div className="text-center pt-2 space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-5">
              <Button variant="dark-primary" size="lg" href="/request-service" arrow>
                Request a Consultation
              </Button>

              <a
                href={`tel:${BRAND_CONFIG.phone}`}
                className="inline-flex items-center gap-2 px-6 h-[52px] rounded-btn border border-brass-500/40 text-ivory-50 text-sm font-semibold tracking-wide hover:bg-white/10 transition"
              >
                <Phone className="w-4 h-4 text-brass-300" />
                <span>Call: {BRAND_CONFIG.phone}</span>
              </a>
            </div>

            <div className="text-xs text-slate-400 tracking-wide">
              Suite 4B, Camac Court, 25 Camac Street, Kolkata 700016 &bull; Strict Bar Council Compliance
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
