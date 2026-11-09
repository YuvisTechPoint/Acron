"use client";

import React, { useState, useEffect } from "react";
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
  Lock,
  Search,
} from "lucide-react";
import { BRAND_CONFIG, PRACTICE_AREAS } from "@/lib/constants";
import { platformStore } from "@/lib/store";
import {
  useRealtimeSiteConfig,
  useRealtimeFaqs,
  useRealtimeServices,
  useRealtimePosts,
} from "@/lib/realtime";
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
  ScrollTextReveal,
} from "@/components/ui";

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
    title: "How does Acorn assist organisations with POSH Act 2013 compliance?",
    content:
      "We serve as independent External Members under Section 4(2)(c) of the POSH Act, draft legally defensible workplace anti-harassment policies, conduct Internal Committee capacity-building workshops, guide confidential inquiries, and prepare mandatory Section 21 Annual Compliance Filings for the District Officer.",
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
    slug: "posh-act-external-member-statutory-duties",
    category: "POSH Compliance",
    date: "November 2026",
    title: "The Statutory Role of the External Member in POSH Act Inquiries",
    excerpt:
      "A judicial review of Section 4(2)(c) jurisprudence and the imperative of third-party neutrality in workplace inquiry proceedings.",
  },
  {
    slug: "commercial-contract-boilerplate-dispute-mitigation",
    category: "Commercial Law",
    date: "October 2026",
    title: "Drafting Dispute Escalation Clauses in High-Value Joint Ventures",
    excerpt:
      "Structuring multi-tier dispute resolution clauses under Indian arbitration jurisprudence to prevent preliminary procedural friction.",
  },
  {
    slug: "directors-fiduciary-governance-fema-compliance",
    category: "Corporate Advisory",
    date: "October 2026",
    title: "Directors' Personal Liability Under Recent Regulatory Amendments",
    excerpt:
      "Statutory duties under the Companies Act 2013 and recent enforcement trends across corporate oversight tribunals.",
  },
];

export default function HomePage() {
  const [activeStep, setActiveStep] = useState(0);
  const siteConfig = useRealtimeSiteConfig();
  const rawFaqs = useRealtimeFaqs();
  const customServices = useRealtimeServices();
  const rawPosts = useRealtimePosts();

  const dynamicPractices = customServices.length > 0
    ? customServices.map((s) => ({
        slug: s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: s.name,
        shortDesc: s.shortDesc,
        icon: "Briefcase",
        services: s.features,
      }))
    : PRACTICE_AREAS;

  const steps = siteConfig?.pathwaySteps && siteConfig.pathwaySteps.length > 0
    ? siteConfig.pathwaySteps
    : HOW_WE_WORK_STEPS;

  const principles = siteConfig?.principles && siteConfig.principles.length > 0
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

  const homepageFaqs = rawFaqs.filter((f) => f.showOnHomepage);
  const formattedFaqs = homepageFaqs.length > 0
    ? homepageFaqs.map((f) => ({
        id: f.id,
        title: f.question,
        content: f.answer,
      }))
    : HOMEPAGE_FAQS;

  return (
    <div className="bg-ivory-50 text-ink selection:bg-brass-300/30">

      {/* 1. HERO SECTION: Full-bleed Heritage Law Library with Architectural Double Arch */}
      <section className="relative min-h-[92vh] lg:min-h-[96vh] bg-[#07101F] text-white flex flex-col justify-between pt-28 pb-14 sm:pt-32 sm:pb-16 border-b border-navy-800/80 overflow-hidden">
        {/* Full-bleed Hero Background Image - Exactly matches user's uploaded master background */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src={siteConfig.heroBgImage || "/images/hero.jpg"}
            alt="Chambers of Acorn Legal Consultants, Kolkata"
            fill
            priority
            quality={100}
            className="object-cover object-right lg:object-center"
          />
          {/* Subtle top & bottom edge transition blends */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#07101F]/70 via-[#07101F]/20 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#07101F]/60 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Left Column (7 cols): Editorial Headline, Sub-headline, CTAs, Metadata */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left max-w-2xl">

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5">
                <span className="w-5 h-[1.5px] bg-brass-400" />
                <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-brass-400 drop-shadow-sm">
                  {siteConfig.firmName || "ACORN LEGAL CONSULTANTS"}
                </span>
              </div>

              {/* Display Headline - Bold & Authoritative */}
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-[72px] font-bold tracking-tight text-white leading-[1.08] drop-shadow-lg">
                {siteConfig.heroHeadline || "Excellence in Law."}<br />
                <span className="font-serif italic font-normal text-brass-400">{siteConfig.heroSubheadline || "Integrity in Practice."}</span>
              </h1>

              {/* Subtitle Paragraph */}
              <p className="font-sans text-base sm:text-[18px] text-slate-200 leading-[1.65] max-w-xl font-normal drop-shadow">
                {siteConfig.heroDescription}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={siteConfig.heroPrimaryCtaLink || "/request-service"}
                  className="h-[48px] px-6 rounded-btn bg-brass-500 hover:bg-brass-400 text-ink-950 font-sans font-bold text-sm flex items-center gap-2.5 shadow-raised transition-all duration-200 hover:translate-x-0.5"
                >
                  <span>{siteConfig.heroPrimaryCtaText || "Request a Consultation"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={siteConfig.heroSecondaryCtaLink || "/services"}
                  className="h-[48px] px-6 rounded-btn bg-[#07101F]/40 hover:bg-[#07101F]/70 border border-brass-500/50 hover:border-brass-400 text-brass-200 hover:text-white font-sans font-medium text-sm flex items-center gap-2.5 backdrop-blur-sm transition-all duration-200"
                >
                  <span>{siteConfig.heroSecondaryCtaText || "Explore our services"}</span>
                  <ArrowRight className="w-4 h-4 text-brass-400" />
                </Link>
              </div>

              {/* Metadata Badges Line */}
              <div className="pt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-[13px] font-sans text-slate-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="text-brass-400 font-bold">•</span>
                  <span>{siteConfig.city || "Kolkata"} Chambers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-brass-400 font-bold">•</span>
                  <span>{siteConfig.addressLine2 || "Park Street District"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-brass-400 font-bold">•</span>
                  <span>Confidential Privileged Intake</span>
                </div>
              </div>

            </div>

            {/* Right Column (5 cols): Architectural Double Arch Window Frame & 3 Floating Principle Cards */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[540px]">

                {/* Double Golden Arch Outer Frame */}
                <div className="relative w-full min-h-[540px] sm:min-h-[580px] lg:min-h-[620px] rounded-t-full border-[1.5px] border-brass-500/50 p-2 sm:p-2.5 flex flex-col justify-between shadow-2xl">

                  {/* Inner Arch Stroke (Double line effect from reference image) */}
                  <div className="absolute inset-2 sm:inset-2.5 rounded-t-full border border-brass-500/35 pointer-events-none" />

                  {/* Top Dome with Crest & Typography */}
                  <div className="relative z-10 pt-7 pb-8 px-4 rounded-t-full bg-gradient-to-b from-[#07101F]/85 via-[#07101F]/50 to-transparent flex flex-col items-center text-center">

                    {/* Oak Leaf Crest Motif */}
                    <div className="w-11 h-11 flex items-center justify-center text-brass-400 mb-1 drop-shadow">
                      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
                        {/* Right Leaf */}
                        <path d="M25 24 C24 21 26 18 28 17 C27 15 26 13 28 11 C29 9 32 8 34 6 C36 7 37 8 37 10 C39 11 40 13 39 15 C41 17 41 19 39 21 C40 23 39 25 36 26 C34 27 32 26 30 28 C28 29 26 27 25 24 Z" fill="currentColor" />
                        {/* Left Leaf */}
                        <path d="M23 24 C24 21 22 18 20 17 C21 15 22 13 20 11 C19 9 16 8 14 6 C12 7 11 8 11 10 C9 11 8 13 9 15 C7 17 7 19 9 21 C8 23 9 25 12 26 C14 27 16 26 18 28 C20 29 22 27 23 24 Z" fill="currentColor" />
                        {/* Center Leaf */}
                        <path d="M24 6 C26 7 27 9 27 11 C29 12 30 14 29 16 C30 18 29 20 27 21 C26 23 25 24 24 26 C23 24 22 23 21 21 C19 20 18 18 19 16 C18 14 19 12 21 11 C21 9 22 7 24 6 Z" fill="currentColor" />
                        {/* Acorn 1 (Right) */}
                        <path d="M26 27 C27 25 31 26 31 28 C30 29 29 30 27 30 C26 30 25 29 26 27 Z" fill="currentColor" />
                        <path d="M26.5 29 C27 33 30 35 30.8 34 C31.5 33 31.2 30 30.5 29 Z" fill="currentColor" opacity="0.9" />
                        {/* Acorn 2 (Left) */}
                        <path d="M22 27 C21 25 17 26 17 28 C18 29 19 30 21 30 C22 30 23 29 22 27 Z" fill="currentColor" />
                        <path d="M21.5 29 C21 33 18 35 17.2 34 C16.5 33 16.8 30 17.5 29 Z" fill="currentColor" opacity="0.9" />
                        {/* Center Stem */}
                        <path d="M24 26 L24 36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </div>

                    <span className="font-serif text-2xl sm:text-[28px] font-bold text-[#F3E5D3] tracking-wide drop-shadow-md leading-tight mt-1">
                      {siteConfig.heroArchTitle || "Chambers of Acorn"}
                    </span>
                    <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-brass-400 mt-1 drop-shadow">
                      {siteConfig.heroArchSubtitle || "CAMAC STREET • KOLKATA"}
                    </span>
                  </div>

                  {/* Open Middle Area: Transparently frames the senior advocate at desk in heritage library */}
                  <div className="flex-1 min-h-[160px] sm:min-h-[190px]" />

                  {/* Bottom: 3 Horizontal Glassmorphic Cards (Matching Attached Image) */}
                  <div className="relative z-10 grid grid-cols-3 gap-2 sm:gap-2.5 pb-2 px-1">

                    {/* Card 1: Discretion */}
                    <div className="bg-[#07101F]/75 border border-brass-500/35 rounded-lg p-3 sm:p-3.5 flex flex-col justify-between shadow-2xl backdrop-blur-md transition-all duration-200 hover:border-brass-400 hover:bg-[#07101F]/90">
                      <div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/5 border border-brass-500/30 flex items-center justify-center text-brass-400 mb-2">
                          <Lock className="w-3.5 h-3.5 text-brass-400 shrink-0" />
                        </div>
                        <h3 className="text-xs sm:text-[13px] font-bold text-white tracking-tight mb-1">
                          {siteConfig.heroBadge1Title || "Discretion"}
                        </h3>
                        <p className="text-[10px] sm:text-[11px] text-slate-300 leading-snug">
                          {siteConfig.heroBadge1Desc || "Absolute privilege & confidentiality"}
                        </p>
                      </div>
                    </div>

                    {/* Card 2: Diligence */}
                    <div className="bg-[#07101F]/75 border border-brass-500/35 rounded-lg p-3 sm:p-3.5 flex flex-col justify-between shadow-2xl backdrop-blur-md transition-all duration-200 hover:border-brass-400 hover:bg-[#07101F]/90">
                      <div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/5 border border-brass-500/30 flex items-center justify-center text-brass-400 mb-2">
                          <Search className="w-3.5 h-3.5 text-brass-400 shrink-0" />
                        </div>
                        <h3 className="text-xs sm:text-[13px] font-bold text-white tracking-tight mb-1">
                          {siteConfig.heroBadge2Title || "Diligence"}
                        </h3>
                        <p className="text-[10px] sm:text-[11px] text-slate-300 leading-snug">
                          {siteConfig.heroBadge2Desc || "Exhaustive statutory research"}
                        </p>
                      </div>
                    </div>

                    {/* Card 3: Transparency */}
                    <div className="bg-[#07101F]/75 border border-brass-500/35 rounded-lg p-3 sm:p-3.5 flex flex-col justify-between shadow-2xl backdrop-blur-md transition-all duration-200 hover:border-brass-400 hover:bg-[#07101F]/90">
                      <div>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/5 border border-brass-500/30 flex items-center justify-center text-brass-400 mb-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-brass-400 shrink-0" />
                        </div>
                        <h3 className="text-xs sm:text-[13px] font-bold text-white tracking-tight mb-1">
                          {siteConfig.heroBadge3Title || "Transparency"}
                        </h3>
                        <p className="text-[10px] sm:text-[11px] text-slate-300 leading-snug">
                          {siteConfig.heroBadge3Desc || "Clear scope & accountable advisory"}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Corner Brass Sparkle Accent (Bottom Right of Arch as in Reference) */}
                  <div className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 text-brass-400 drop-shadow pointer-events-none">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
                    </svg>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHY STRIP: ivory background, one large centred serif statement with scroll-driven text reveal */}
      <section className="bg-ivory-50 py-28 sm:py-36 md:py-44 border-b border-border relative overflow-hidden">
        {/* Low contrast section numeral watermark */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(6rem,20vw,16rem)] font-bold text-navy-700/[0.03] select-none pointer-events-none leading-none"
          aria-hidden="true"
        >
          01
        </div>

        <div className="max-w-[1040px] mx-auto px-4 sm:px-6 text-center relative z-10 space-y-7">
          <Eyebrow className="justify-center">OUR GOVERNING PRINCIPLE</Eyebrow>

          <ScrollTextReveal
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium text-ink-950 leading-[1.18] tracking-tight justify-center"
            words={[
              { text: "“To" },
              { text: "protect" },
              { text: "what" },
              { text: "matters," },
              { text: "navigate" },
              { text: "complexity" },
              { text: "with" },
              { text: "confidence," },
              { text: "and" },
              { text: "uphold" },
              { text: "the" },
              { text: "highest", isAccent: true },
              { text: "standards", isAccent: true },
              { text: "of" },
              { text: "professional" },
              { text: "integrity.”" },
            ]}
          />

          <div className="pt-4 flex justify-center">
            <div className="w-16 h-[2px] bg-brass-500" />
          </div>
        </div>
      </section>

      {/* 3. PRACTICE AREAS BENTO: 12-column bento grid, 1 large feature + 5 smaller cards */}
      <section className="bg-stone-100 py-24 sm:py-32 border-b border-border">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-16">

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
                href={`/services/${dynamicPractices[0]?.slug || "advisory"}`}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-border">
                    <span className="font-serif text-3xl font-bold text-navy-700/25">01</span>
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-navy-700">
                      {ICON_MAP[dynamicPractices[0]?.icon || "Briefcase"]}
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-brass-700">
                      Flagship Practice
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ink-950">
                      {dynamicPractices[0]?.title}
                    </h3>
                    <p className="font-sans text-base text-ink-secondary leading-relaxed">
                      {dynamicPractices[0]?.shortDesc}
                    </p>

                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink font-medium">
                      {dynamicPractices[0]?.services?.slice(0, 4).map((s, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brass-500 shrink-0" />
                          <span className="truncate">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-border flex items-center justify-between text-xs font-semibold text-navy-700">
                  <span>Explore advisory engagements</span>
                  <ArrowRight className="w-4 h-4 text-brass-500" />
                </div>
              </Card>
            </div>

            {/* Smaller Card 2 (Spans 5 cols) */}
            <div className="md:col-span-5">
              <Card
                variant="white"
                arrowOnHover
                href={`/services/${dynamicPractices[1]?.slug || "legal-documentation"}`}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <span className="font-serif text-3xl font-bold text-navy-700/25">02</span>
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-navy-700">
                      {ICON_MAP[dynamicPractices[1]?.icon || "FileText"]}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <h3 className="font-serif text-2xl font-bold text-ink-950">
                      {dynamicPractices[1]?.title}
                    </h3>
                    <p className="font-sans text-sm text-ink-secondary leading-relaxed line-clamp-3">
                      {dynamicPractices[1]?.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-navy-700">
                  <span>View drafting frameworks</span>
                  <ArrowRight className="w-4 h-4 text-brass-500" />
                </div>
              </Card>
            </div>

            {/* Smaller Cards 3, 4, 5, 6 (Spans 3 cols each on lg, 6 cols on md) */}
            {dynamicPractices.slice(2).map((pa, i) => (
              <div key={pa.slug} className="md:col-span-6 lg:col-span-3">
                <Card
                  variant="white"
                  arrowOnHover
                  href={`/services/${pa.slug}`}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-border">
                      <span className="font-serif text-2xl font-bold text-navy-700/25">
                        0{i + 3}
                      </span>
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-navy-700">
                        {ICON_MAP[pa.icon] || <Compass className="w-4 h-4 text-brass-500" />}
                      </div>
                    </div>

                    <div className="mt-5 space-y-2">
                      <h3 className="font-serif text-xl font-bold text-ink-950">
                        {pa.title}
                      </h3>
                      <p className="font-sans text-xs text-ink-secondary leading-relaxed line-clamp-3">
                        {pa.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-navy-700">
                    <span>Consult counsel</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brass-500" />
                  </div>
                </Card>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 4. HOW WE WORK: Sticky-left, scrolling-right layout with 5 steps */}
      <section className="bg-ivory-50 py-24 sm:py-32 border-b border-border">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Sticky Left Column (Spans 5 cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
              <Eyebrow>ENGAGEMENT PROTOCOL</Eyebrow>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ink-950 leading-[1.12]">
                How We Work: A <span className="font-serif italic font-normal text-brass-700">Disciplined</span> Pathway.
              </h2>
              <p className="font-sans text-base text-ink-secondary leading-relaxed">
                From privileged intake to final resolution, every step follows a structured methodology to safeguard legal interests and maintain strict fiduciary accountability.
              </p>

              <div className="pt-2">
                <Button variant="primary" href="/request-service" arrow>
                  Initiate an Engagement
                </Button>
              </div>

              {/* Progress Indicator */}
              <div className="pt-8 border-t border-border hidden lg:block">
                <div className="text-xs uppercase tracking-wider text-ink-muted mb-2">
                  Progressive Stage
                </div>
                <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brass-500 transition-all duration-300"
                    style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Scrolling Right Column (Spans 7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {steps.map((step, idx) => (
                <div
                  key={step.num || idx}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`p-6 sm:p-8 rounded-card border transition-all duration-200 ${activeStep === idx
                    ? "bg-white border-brass-500/50 shadow-card"
                    : "bg-surface/60 border-border hover:bg-white"
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-brass-700 shrink-0">
                      {step.num}
                    </span>
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-bold text-ink-950">
                        {step.title}
                      </h3>
                      <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. WHY ACORN: Stone background, 3 columns, principle sentences, NO statistics */}
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
              <div key={prin.num || idx} className="bg-white p-8 rounded-card border border-border shadow-card space-y-4">
                <span className="text-xs uppercase font-semibold tracking-widest text-brass-700">
                  {prin.num}
                </span>
                <h3 className="font-serif text-2xl font-bold text-ink-950">{prin.title}</h3>
                <p className="font-serif italic text-lg text-ink leading-relaxed">
                  &ldquo;{prin.quote}&rdquo;
                </p>
                <p className="font-sans text-xs text-ink-secondary leading-relaxed pt-2 border-t border-border">
                  {prin.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. POSH FEATURE: Dark navy panel with arch placeholder, calm tone */}
      <section className="bg-ivory-50 py-24 sm:py-32 border-b border-border">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="bg-navy-900 rounded-card border border-navy-800 p-8 sm:p-14 text-white shadow-raised relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brass-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">

              <div className="lg:col-span-7 space-y-6">
                <Eyebrow dark>INSTITUTIONAL GOVERNANCE</Eyebrow>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-[1.12]">
                  Safe, <span className="font-serif italic font-normal text-brass-300">compliant</span> workplaces.
                </h2>
                <p className="font-sans text-base text-slate-300 leading-relaxed max-w-xl">
                  Acorn Legal Consultants assists organisations, universities, and corporate boards with end-to-end POSH Act 2013 compliance, independent External Member appointment under Section 4(2)(c), fair inquiry facilitation, and mandatory annual reporting.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Button variant="dark-primary" href="/posh" arrow>
                    Explore POSH Compliance
                  </Button>
                  <Button variant="dark-secondary" href="/posh/start" arrow>
                    Report a Concern
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[1856/2304] rounded-2xl overflow-hidden shadow-2xl border border-brass-500/30 bg-navy-950 group">
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
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. INSIGHTS: 1 large featured article + 2 smaller ones */}
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
              <Link href={`/blog/${FEATURED_INSIGHTS[0].slug}`} className="block h-full group focus:outline-none">
                <div className="bg-white rounded-card border border-border p-8 h-full flex flex-col justify-between shadow-card card-hover">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold uppercase tracking-wider text-brass-700">
                        {FEATURED_INSIGHTS[0].category}
                      </span>
                      <span className="text-ink-muted">{FEATURED_INSIGHTS[0].date}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-4xl font-bold text-ink-950 group-hover:text-navy-700 transition-colors leading-[1.2]">
                      {FEATURED_INSIGHTS[0].title}
                    </h3>

                    <p className="font-sans text-base text-ink-secondary leading-relaxed">
                      {FEATURED_INSIGHTS[0].excerpt}
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
              {FEATURED_INSIGHTS.slice(1, 3).map((art) => (
                <Link key={art.slug} href={`/blog/${art.slug}`} className="block group focus:outline-none flex-1">
                  <div className="bg-white rounded-card border border-border p-6 h-full flex flex-col justify-between shadow-card card-hover">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold uppercase tracking-wider text-brass-700">
                          {art.category}
                        </span>
                        <span className="text-ink-muted">{art.date}</span>
                      </div>
                      <h4 className="font-serif text-xl font-bold text-ink-950 group-hover:text-navy-700 transition-colors">
                        {art.title}
                      </h4>
                      <p className="font-sans text-xs text-ink-secondary line-clamp-2 leading-relaxed">
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
            <div className="lg:col-span-7 space-y-8">
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

        <div className="max-w-[960px] mx-auto px-4 sm:px-6 text-center relative z-10 space-y-8">
          {/* Subtle Arch Icon Accent */}
          <div className="w-12 h-12 rounded-t-full border-t-2 border-x-2 border-brass-500/50 mx-auto flex items-end justify-center pb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brass-500" />
          </div>

          <Eyebrow dark className="justify-center">CONFIDENTIAL INTAKE</Eyebrow>

          <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.08]">
            Let us understand your <span className="font-serif italic font-normal text-brass-300">matter</span>.
          </h2>

          <p className="font-sans text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Reach out to our chambers in Kolkata. We respond to every formal inquiry with absolute discretion, precision, and commercial clarity.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-5">
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

          <div className="pt-8 text-xs text-slate-400">
            Suite 4B, Camac Court, 25 Camac Street, Kolkata 700016 &bull; Strict Bar Council Compliance
          </div>
        </div>
      </section>

    </div>
  );
}
