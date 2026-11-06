"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Shield,
  Clock,
  Briefcase,
  FileText,
  Compass,
  Sparkles,
} from "lucide-react";
import { PRACTICE_AREAS, BRAND_CONFIG } from "@/lib/constants";
import {
  Button,
  Eyebrow,
  SectionHeading,
  Accordion,
  Rule,
  Card,
  EditorialLink,
} from "@/components/ui";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "advisory";
  const [activeSection, setActiveSection] = useState("overview");

  const pa =
    PRACTICE_AREAS.find((p) => p.slug === slug) ||
    PRACTICE_AREAS[0] || {
      slug: "advisory",
      title: "Advisory & Regulatory Guidance",
      shortDesc: "Strategic corporate structuring, board governance, and compliance guidance.",
      services: [],
    };

  const TOC_ITEMS = [
    { id: "overview", label: "Overview & Scope" },
    { id: "who-it-is-for", label: "Who This Is For" },
    { id: "engagements", label: "Typical Engagements" },
    { id: "process", label: "Our Engagement Process" },
    { id: "faq", label: "Frequently Asked Questions" },
    { id: "related-insights", label: "Related Insights" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = TOC_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(TOC_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const serviceFaqs = [
    {
      id: "sfaq-1",
      title: `What statutory acts govern ${pa.title} matters?`,
      content:
        "Engagements are anchored in the relevant Central and West Bengal statutes, standard commercial conventions, and judicial precedents established by High Courts and the Supreme Court of India.",
    },
    {
      id: "sfaq-2",
      title: "How are consultation fees and engagement scopes structured?",
      content:
        "We operate under transparent, fixed-scope or milestone-based fee structures detailed in a formal Engagement Letter after conflict verification. There are no hidden administrative contingencies.",
    },
    {
      id: "sfaq-3",
      title: "How does counsel maintain confidentiality for sensitive corporate matters?",
      content:
        "All communications, draft disclosures, and commercial instruments are protected under statutory advocate-client privilege under Section 126 of the Indian Evidence Act.",
    },
  ];

  return (
    <div className="bg-ivory-50 text-ink min-h-screen">
      
      {/* Service Hero */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 border-b border-border bg-ivory-50">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6">
          <nav className="text-xs font-sans text-ink-muted flex items-center gap-2">
            <Link href="/" className="hover:text-navy-700 transition">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-navy-700 transition">Services</Link>
            <span>/</span>
            <span className="text-brass-700 font-semibold">{pa.title}</span>
          </nav>

          <Eyebrow>PRACTICE AREA</Eyebrow>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink-950 leading-[1.08] max-w-4xl">
            {pa.title}
          </h1>

          <p className="font-sans text-lg sm:text-xl text-ink-secondary max-w-3xl leading-relaxed">
            {pa.shortDesc}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              size="md"
              href={`/request-service?service=${encodeURIComponent(pa.title)}`}
              arrow
            >
              Request this service
            </Button>
            <Button variant="secondary" size="md" href="/contact">
              Consult with Counsel
            </Button>
          </div>
        </div>
      </section>

      {/* Main 3-Column Editorial Layout */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Column 1: Sticky Left Table of Contents (lg:col-span-3) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-brass-700 pb-2 border-b border-border">
              Matter Overview
            </div>
            <nav className="space-y-1 font-sans text-xs">
              {TOC_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block py-2 px-3 rounded-btn transition-colors ${
                      isActive
                        ? "bg-stone-100 text-navy-700 font-bold border-l-2 border-brass-500"
                        : "text-ink-secondary hover:text-ink hover:bg-stone-100/50"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="pt-6 border-t border-border space-y-3">
              <div className="text-[11px] uppercase tracking-wider text-ink-muted">
                Quick Chambers Desk
              </div>
              <a
                href={`tel:${BRAND_CONFIG.phone}`}
                className="text-xs font-bold text-navy-700 hover:text-brass-700 flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-brass-500" />
                <span>{BRAND_CONFIG.phone}</span>
              </a>
            </div>
          </aside>

          {/* Column 2: Central Deep Content (lg:col-span-6) */}
          <main className="lg:col-span-6 space-y-16">
            
            {/* 1. Overview */}
            <section id="overview" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-3xl font-bold text-ink-950">
                Scope of Legal Advisory
              </h2>
              <div className="space-y-4 font-sans text-base text-ink leading-relaxed">
                <p>
                  Acorn Legal Consultants provides thorough, defensible counsel under {pa.title}. Our approach is built on unyielding attention to statutory text, commercial context, and risk mitigation.
                </p>
                <p>
                  Whether navigating regulatory scrutiny, drafting high-value covenants, or representing institutional positions, we structure advisory pathways that protect client interests without generating unnecessary procedural friction.
                </p>
              </div>
            </section>

            <Rule />

            {/* 2. Who It Is For */}
            <section id="who-it-is-for" className="space-y-6 scroll-mt-28">
              <h2 className="font-serif text-3xl font-bold text-ink-950">
                Who This Counsel Is For
              </h2>
              <div className="space-y-3 font-sans text-sm text-ink-secondary">
                {[
                  "Corporate leadership, boards of directors, and managing trustees.",
                  "Enterprises and emerging ventures requiring formal statutory risk auditing.",
                  "In-house legal teams seeking external specialist opinions and tribunal advocacy.",
                  "Institutions needing independent statutory committee representation.",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-card border border-border">
                    <CheckCircle2 className="w-4 h-4 text-brass-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <Rule />

            {/* 3. Typical Engagements Checklist */}
            <section id="engagements" className="space-y-6 scroll-mt-28">
              <h2 className="font-serif text-3xl font-bold text-ink-950">
                Typical Engagements Checklist
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(pa.services?.length ? pa.services : [
                  "Statutory regulatory compliance reviews",
                  "Defensive contract drafting and vetting",
                  "Pre-dispute mitigation and negotiation strategy",
                  "Board advisory and executive fiduciary reviews",
                  "Tribunal representation and formal pleadings",
                  "Annual institutional compliance reporting",
                ]).map((srv, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-stone-100 rounded-btn border border-border flex items-start gap-2.5 text-xs text-ink font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0 mt-0.5" />
                    <span>{srv}</span>
                  </div>
                ))}
              </div>
            </section>

            <Rule />

            {/* 4. Our Process */}
            <section id="process" className="space-y-6 scroll-mt-28">
              <h2 className="font-serif text-3xl font-bold text-ink-950">
                Our Engagement Protocol
              </h2>
              <div className="space-y-4">
                {[
                  {
                    step: "01",
                    title: "Confidential Intake & Conflict Check",
                    desc: "Receipt of matter brief followed by mandatory chambers conflict verification.",
                  },
                  {
                    step: "02",
                    title: "Statutory Examination & Risk Audit",
                    desc: "In-depth review of applicable regulatory frameworks, contractual terms, or case records.",
                  },
                  {
                    step: "03",
                    title: "Advisory Formulation & Execution",
                    desc: "Delivery of actionable legal opinions, precision drafting, or active representation.",
                  },
                  {
                    step: "04",
                    title: "Ongoing Monitoring & Compliance",
                    desc: "Post-resolution tracking to ensure enduring statutory defensibility.",
                  },
                ].map((item) => (
                  <div key={item.step} className="p-5 bg-white rounded-card border border-border flex items-start gap-4 shadow-sm">
                    <span className="font-serif text-2xl font-bold text-brass-700 shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-lg text-ink">{item.title}</h4>
                      <p className="font-sans text-xs text-ink-secondary mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Rule />

            {/* 5. FAQ Accordion */}
            <section id="faq" className="space-y-6 scroll-mt-28">
              <h2 className="font-serif text-3xl font-bold text-ink-950">
                Practice Area FAQ
              </h2>
              <Accordion items={serviceFaqs} defaultOpenId="sfaq-1" />
            </section>

            <Rule />

            {/* 6. Related Insights */}
            <section id="related-insights" className="space-y-6 scroll-mt-28">
              <h2 className="font-serif text-3xl font-bold text-ink-950">
                Related Legal Insights
              </h2>
              <div className="p-6 bg-white rounded-card border border-border space-y-3">
                <span className="text-[11px] uppercase font-semibold text-brass-700">Publication</span>
                <h3 className="font-serif text-xl font-bold text-ink">
                  Statutory Duty &amp; Risk Mitigation in Modern Practice
                </h3>
                <p className="font-sans text-xs text-ink-secondary leading-relaxed">
                  An editorial review of recent regulatory amendments and high court jurisprudence governing corporate documentation and statutory committees.
                </p>
                <div className="pt-2">
                  <EditorialLink href="/blog">Read full commentary</EditorialLink>
                </div>
              </div>
            </section>

          </main>

          {/* Column 3: Sticky Enquiry Card (lg:col-span-3) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28">
            <div className="bg-white rounded-card border border-border p-6 shadow-card space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-brass-500" />
                <span className="text-xs uppercase font-semibold text-brass-700 tracking-wider">
                  Privileged Intake
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-ink-950">
                Engage Counsel on this Matter
              </h3>

              <p className="font-sans text-xs text-ink-secondary leading-relaxed">
                Submit an inquiry regarding {pa.title}. Our Kolkata chambers review all briefs under strict confidentiality.
              </p>

              <div className="pt-2 space-y-2">
                <Button
                  variant="primary"
                  href={`/request-service?service=${encodeURIComponent(pa.title)}`}
                  arrow
                  className="w-full text-xs"
                >
                  Request Consultation
                </Button>
                <Button
                  variant="secondary"
                  href={`tel:${BRAND_CONFIG.phone}`}
                  className="w-full text-xs"
                >
                  Call: {BRAND_CONFIG.phone}
                </Button>
              </div>

              <div className="pt-3 border-t border-border text-[11px] text-ink-muted text-center">
                Responses within 1 business day
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Mobile Fixed Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-border shadow-modal z-40 flex items-center justify-between gap-3">
        <div className="truncate">
          <div className="text-xs font-bold text-ink truncate">{pa.title}</div>
          <div className="text-[10px] text-brass-700">Chambers Intake</div>
        </div>
        <Button
          variant="primary"
          size="sm"
          href={`/request-service?service=${encodeURIComponent(pa.title)}`}
          arrow
          className="shrink-0 text-xs"
        >
          Request Service
        </Button>
      </div>

      {/* Closing CTA */}
      <section className="bg-ink-950 text-white py-20 sm:py-28 relative overflow-hidden">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
          <Eyebrow dark className="justify-center">CHAMBERS OF ACORN</Eyebrow>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            Protect what matters with <span className="font-serif italic font-normal text-brass-300">principled</span> counsel.
          </h2>
          <p className="font-sans text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Direct your enquiry to our chambers in Kolkata. We handle all matters with absolute discretion and statutory diligence.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button variant="dark-primary" size="lg" href="/request-service" arrow>
              Request a Consultation
            </Button>
            <Button variant="dark-secondary" size="lg" href="/services">
              All Practice Areas
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
