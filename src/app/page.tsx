"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  FileText,
  Scale,
  ShieldCheck,
  Building,
  HelpCircle,
  ArrowRight,
  Phone,
  Lock,
  Eye,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { BRAND_CONFIG, PRACTICE_AREAS } from "@/lib/constants";
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
} from "@/components/ui";

const ICON_MAP: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase className="w-5 h-5 text-brass-500" />,
  FileText: <FileText className="w-5 h-5 text-brass-500" />,
  Scale: <Scale className="w-5 h-5 text-brass-500" />,
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

  return (
    <div className="bg-ivory-50 text-ink selection:bg-brass-300/30">
      
      {/* 1. HERO SECTION: min-height 92vh, ink-950 to navy-800 gradient, soft brass glow, paper grain */}
      <section className="relative min-h-[92vh] bg-hero-gradient text-white flex flex-col justify-between pt-32 pb-16 sm:pt-40 sm:pb-24 border-b border-navy-800/80 overflow-hidden">
        {/* Subtle Paper Grain & Ambient Radial Glows */}
        <div className="absolute inset-0 bg-paper-grain opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[480px] h-[480px] bg-brass-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left 7 Columns: Editorial Headline, Sub-headline, CTAs */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <Eyebrow dark>ACORN LEGAL CONSULTANTS</Eyebrow>

              <h1 className="font-serif text-display-xl font-bold tracking-tight text-white leading-[1.02]">
                Excellence in Law.<br />
                <span className="font-serif italic font-normal text-brass-300">Integrity</span> in Practice.
              </h1>

              <p className="font-sans text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                A professional legal consultancy delivering thoughtful, precise, and result-oriented solutions for individuals, businesses, and institutions in Kolkata and across India.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-5">
                <Button
                  variant="dark-primary"
                  size="md"
                  href="/request-service"
                  arrow
                >
                  Request a Consultation
                </Button>

                <EditorialLink href="/services" dark>
                  Explore our services
                </EditorialLink>
              </div>

              {/* Chambers Badge */}
              <div className="pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-brass-500 animate-pulse" />
                <span>Kolkata Chambers &bull; Park Street District &bull; Confidential Privileged Intake</span>
              </div>
            </div>

            {/* Right 5 Columns: Arch Glass Panel with Oak Motif & 3 Floating Principle Chips */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                {/* Arch-shaped glass panel */}
                <div className="arch-mask bg-navy-900/60 border border-brass-500/30 p-8 pt-16 pb-12 backdrop-blur-md shadow-raised flex flex-col items-center text-center relative overflow-hidden group">
                  
                  {/* Subtle Inner Arch Linework */}
                  <div className="absolute inset-4 rounded-t-full border border-brass-500/20 pointer-events-none" />

                  {/* Oak Leaf & Acorn Line-Art Emblem */}
                  <div className="w-20 h-20 rounded-full bg-navy-800/80 border border-brass-500/40 flex items-center justify-center mb-6 shadow-inner text-brass-300">
                    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
                      <path
                        d="M24 8 C28 14 36 18 36 26 C36 34 30 38 24 38 C18 38 12 34 12 26 C12 18 20 14 24 8 Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path d="M24 14 L24 34" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M24 22 L30 18" stroke="currentColor" strokeWidth="1" />
                      <path d="M24 28 L18 24" stroke="currentColor" strokeWidth="1" />
                      <circle cx="24" cy="42" r="2" fill="currentColor" />
                    </svg>
                  </div>

                  <span className="font-serif text-2xl font-bold text-white tracking-wide">
                    Chambers of Acorn
                  </span>
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-300 mt-1">
                    Camac Street &bull; Kolkata
                  </span>

                  {/* 3 Floating Principle Chips */}
                  <div className="w-full mt-8 space-y-3">
                    {[
                      {
                        title: "Discretion",
                        desc: "Absolute privilege & confidentiality",
                        icon: Lock,
                        delay: 0,
                      },
                      {
                        title: "Diligence",
                        desc: "Exhaustive statutory research",
                        icon: ShieldCheck,
                        delay: 80,
                      },
                      {
                        title: "Transparency",
                        desc: "Clear scope & accountable advisory",
                        icon: Eye,
                        delay: 160,
                      },
                    ].map((chip) => {
                      const Icon = chip.icon;
                      return (
                        <div
                          key={chip.title}
                          className="bg-navy-950/70 border border-brass-500/25 rounded-card p-3 flex items-center gap-3 text-left shadow-sm backdrop-blur-sm transition-transform duration-200 hover:translate-x-1"
                        >
                          <div className="w-8 h-8 rounded-full bg-navy-800 border border-brass-500/30 flex items-center justify-center shrink-0 text-brass-300">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white tracking-wide">
                              {chip.title}
                            </div>
                            <div className="text-[11px] text-slate-300">{chip.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Thin Scroll Cue at Bottom */}
        <div className="relative text-center pt-8 pointer-events-none select-none">
          <div className="inline-flex flex-col items-center gap-2 text-[10px] uppercase font-semibold tracking-[0.2em] text-brass-300/80">
            <span>Scroll to explore</span>
            <div className="w-[1px] h-6 bg-gradient-to-b from-brass-300 to-transparent" />
          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHY STRIP: ivory background, one large centred serif statement */}
      <section className="bg-ivory-50 py-24 sm:py-32 border-b border-border relative overflow-hidden">
        {/* Low contrast section numeral watermark */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(6rem,20vw,16rem)] font-bold text-navy-700/[0.03] select-none pointer-events-none leading-none"
          aria-hidden="true"
        >
          01
        </div>

        <div className="max-w-[1040px] mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
          <Eyebrow className="justify-center">OUR GOVERNING PRINCIPLE</Eyebrow>

          <LineReveal>
            <p className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium text-ink-950 leading-[1.18] tracking-tight">
              &ldquo;To protect what matters, navigate complexity with confidence, and uphold the{" "}
              <span className="font-serif italic text-brass-700">highest standards</span> of professional integrity.&rdquo;
            </p>
          </LineReveal>

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
                href={`/services/${PRACTICE_AREAS[1]?.slug || "legal-documentation"}`}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <span className="font-serif text-3xl font-bold text-navy-700/25">02</span>
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-navy-700">
                      {ICON_MAP[PRACTICE_AREAS[1]?.icon || "FileText"]}
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
                  <span>View drafting frameworks</span>
                  <ArrowRight className="w-4 h-4 text-brass-500" />
                </div>
              </Card>
            </div>

            {/* Smaller Card 3, 4, 5, 6 (Spans 4 cols each) */}
            {PRACTICE_AREAS.slice(2, 5).map((pa, i) => (
              <div key={pa.slug} className="md:col-span-4">
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
                        {ICON_MAP[pa.icon] || <Scale className="w-4 h-4 text-brass-500" />}
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
                    style={{ width: `${((activeStep + 1) / HOW_WE_WORK_STEPS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Scrolling Right Column (Spans 7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {HOW_WE_WORK_STEPS.map((step, idx) => (
                <div
                  key={step.num}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`p-6 sm:p-8 rounded-card border transition-all duration-200 ${
                    activeStep === idx
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
            <div className="bg-white p-8 rounded-card border border-border shadow-card space-y-4">
              <span className="text-xs uppercase font-semibold tracking-widest text-brass-700">
                Principle I
              </span>
              <h3 className="font-serif text-2xl font-bold text-ink-950">Integrity</h3>
              <p className="font-serif italic text-lg text-ink leading-relaxed">
                &ldquo;Upholding the ethical independence and statutory duty of the Bar above all short-term commercial expedience.&rdquo;
              </p>
              <p className="font-sans text-xs text-ink-secondary leading-relaxed pt-2 border-t border-border">
                Every opinion rendered is unvarnished, independent, and anchored in statutory authority.
              </p>
            </div>

            <div className="bg-white p-8 rounded-card border border-border shadow-card space-y-4">
              <span className="text-xs uppercase font-semibold tracking-widest text-brass-700">
                Principle II
              </span>
              <h3 className="font-serif text-2xl font-bold text-ink-950">Strategic Insight</h3>
              <p className="font-serif italic text-lg text-ink leading-relaxed">
                &ldquo;Anticipating statutory risk and procedural traps before commercial conflict becomes irreparable.&rdquo;
              </p>
              <p className="font-sans text-xs text-ink-secondary leading-relaxed pt-2 border-t border-border">
                We formulate proactive dispute-containment strategies that preserve capital and reputational equity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-card border border-border shadow-card space-y-4">
              <span className="text-xs uppercase font-semibold tracking-widest text-brass-700">
                Principle III
              </span>
              <h3 className="font-serif text-2xl font-bold text-ink-950">Commercial Understanding</h3>
              <p className="font-serif italic text-lg text-ink leading-relaxed">
                &ldquo;Harmonising strict statutory compliance with the operational realities of modern enterprise.&rdquo;
              </p>
              <p className="font-sans text-xs text-ink-secondary leading-relaxed pt-2 border-t border-border">
                Legal solutions designed for real-world execution, cross-border velocity, and institutional scale.
              </p>
            </div>
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
                <div className="w-full max-w-sm">
                  <ArchImage
                    aspect="standard"
                    label="POSH Compliance Desk"
                    sublabel="Section 4(2)(c) Neutrality"
                  />
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

              <Accordion items={HOMEPAGE_FAQS} defaultOpenId="faq-1" />
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
              className="inline-flex items-center gap-2 px-6 h-[58px] rounded-btn border border-brass-500/40 text-ivory-50 text-sm font-semibold tracking-wide hover:bg-white/10 transition"
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
