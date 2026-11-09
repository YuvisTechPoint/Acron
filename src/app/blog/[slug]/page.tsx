"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Check,
  BookOpen,
  ArrowRight,
  Shield,
  Phone,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { useRealtimePosts } from "@/lib/realtime";
import { formatDate } from "@/lib/utils";
import { BRAND_CONFIG } from "@/lib/constants";
import {
  Button,
  Eyebrow,
  Rule,
  Card,
  Badge,
  EditorialLink,
  ReadingProgress,
} from "@/components/ui";

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

export default function SingleBlogPostPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const blogs = useRealtimePosts();

  // Robust multi-tier resolution: realtime hook -> store -> seed fallback
  const post = useMemo(() => {
    const list = blogs && blogs.length > 0 ? blogs : platformStore.getBlogs();
    const found = list.find((b) => b.slug === slug);
    if (found) return found;
    if (list.length > 0) return list[0];
    return {
      id: "fallback-post",
      slug: slug || "statutory-commentary",
      title: "Statutory Filing & Regulatory Compliance Guidance",
      summary: "A practical analysis of contemporary regulatory mandates and judicial enforcement frameworks.",
      excerpt: "A practical analysis of contemporary regulatory mandates and judicial enforcement frameworks.",
      content: "Indian regulatory jurisprudence requires institutions to maintain verifiable contemporaneously prepared records and strictly observe statutory timelines.",
      author: {
        name: "Adv. Debjani Sen",
        role: "Senior Partner, Regulatory Compliance Practice",
      },
      category: "POSH Compliance",
      tags: ["Statutory Compliance", "Kolkata Jurisprudence"],
      readingTimeMinutes: 6,
      publishedAt: new Date().toISOString(),
      views: 120,
      status: "published" as const,
    };
  }, [blogs, slug]);

  const relatedPosts = useMemo(() => {
    const list = blogs && blogs.length > 0 ? blogs : platformStore.getBlogs();
    return list.filter((b) => b.slug !== post.slug).slice(0, 3);
  }, [blogs, post.slug]);

  const authorName =
    typeof post.author === "object" && post.author !== null
      ? (post.author as any).name
      : (post.authorName || "Senior Counsel & Practice Lead, Acorn Legal");

  const authorRole =
    typeof post.author === "object" && post.author !== null && (post.author as any).role
      ? (post.author as any).role
      : "Partner & Practice Lead at Acorn Legal Consultants, Kolkata.";

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Parse structured markdown sections or generate clean paragraphs from content
  const contentSections = useMemo(() => {
    if (!post.content) return [];
    const lines = post.content.split("\n\n");
    const sections: { id: string; title?: string; paragraphs: string[]; isList?: boolean }[] = [];
    let currentSection: { id: string; title?: string; paragraphs: string[]; isList?: boolean } = {
      id: "intro",
      paragraphs: [],
    };

    lines.forEach((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return;

      if (trimmed.startsWith("### ") || trimmed.startsWith("## ")) {
        if (currentSection.paragraphs.length > 0 || currentSection.title) {
          sections.push(currentSection);
        }
        const headingTitle = trimmed.replace(/^#{2,3}\s+/, "");
        const headingId = `section-${idx}-${headingTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        currentSection = {
          id: headingId,
          title: headingTitle,
          paragraphs: [],
        };
      } else {
        currentSection.paragraphs.push(trimmed);
      }
    });

    if (currentSection.paragraphs.length > 0 || currentSection.title) {
      sections.push(currentSection);
    }

    return sections;
  }, [post.content]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.summary,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Acorn Legal Consultants",
      logo: {
        "@type": "ImageObject",
        url: "https://acornlegal.in/logo.png",
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://acornlegal.in/blog/${post.slug}`,
    },
  };

  return (
    <div className="bg-ivory-50 text-ink min-h-screen">
      {/* Article Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Thin Brass Reading Progress Bar */}
      <ReadingProgress />

      {/* Article Header */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 border-b border-border bg-ivory-50">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6 space-y-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brass-700 hover:text-navy-700 transition uppercase tracking-wider group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Insights & Commentary</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="brass">{formatCategory(post.category)}</Badge>
            <span className="text-xs text-ink-muted flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTimeMinutes || post.readingTimeMinutes || 6} min read</span>
            </span>
            <span className="text-xs text-ink-muted">&bull;</span>
            <span className="text-xs text-ink-muted">
              {formatDate(post.publishedAt)}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink-950 leading-[1.14]">
            {post.title}
          </h1>

          <p className="font-sans text-lg sm:text-xl text-ink-secondary leading-relaxed max-w-3xl">
            {post.excerpt || post.summary}
          </p>

          <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-ink-secondary">
            <div>
              Published by <span className="font-semibold text-ink">{authorName}</span> &bull; Kolkata Chambers
            </div>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-btn border border-border bg-white hover:bg-surface text-ink transition shadow-sm self-start sm:self-auto cursor-pointer"
              aria-label="Share article link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-status-success" />
                  <span className="text-status-success font-semibold">Link Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-brass-500" />
                  <span>Share Article</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Reading Section */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Sticky Table of Contents (Desktop lg:col-span-3) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-brass-700 pb-2 border-b border-border">
              Table of Contents
            </div>
            <nav className="space-y-1.5 text-xs font-sans">
              <a
                href="#statutory-overview"
                className="block py-1.5 px-2.5 rounded-btn text-ink-secondary hover:text-navy-700 hover:bg-stone-100 transition"
              >
                1. Statutory Overview
              </a>
              {contentSections
                .filter((s) => s.title)
                .map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block py-1.5 px-2.5 rounded-btn text-ink-secondary hover:text-navy-700 hover:bg-stone-100 transition truncate"
                  >
                    {i + 2}. {s.title}
                  </a>
                ))}
              <a
                href="#practical-implications"
                className="block py-1.5 px-2.5 rounded-btn text-ink-secondary hover:text-navy-700 hover:bg-stone-100 transition"
              >
                Practical Governance Implications
              </a>
              <a
                href="#chambers-summary"
                className="block py-1.5 px-2.5 rounded-btn text-ink-secondary hover:text-navy-700 hover:bg-stone-100 transition"
              >
                Concluding Counsel Note
              </a>
            </nav>

            <div className="pt-6 border-t border-border space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-ink-muted block">
                Practice Inquiry
              </span>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Require specialized advice on this statutory subject?
              </p>
              <Button variant="primary" size="sm" href="/request-service" arrow className="w-full text-xs">
                Consult Counsel
              </Button>
            </div>
          </aside>

          {/* Right: 68ch Reading Column (lg:col-span-9) */}
          <main className="lg:col-span-9 max-w-[68ch] mx-auto lg:mx-0 space-y-10 font-sans text-ink leading-[1.68] text-[17px]">
            
            {/* First Section with Drop Cap */}
            <div id="statutory-overview" className="space-y-6 scroll-mt-28">
              <p className="first-letter:float-left first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:text-brass-700 first-letter:leading-none">
                {post.summary || post.excerpt || "Statutory compliance frameworks under contemporary Indian jurisprudence place paramount importance on verified contemporaneous documentation and prompt adherence to mandatory timelines."}
              </p>
            </div>

            {/* Dynamic Content Sections from Database */}
            {contentSections.map((sec) => (
              <section key={sec.id} id={sec.id} className="space-y-5 scroll-mt-28">
                {sec.title && (
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950 pt-4">
                    {sec.title}
                  </h2>
                )}
                {sec.paragraphs.map((para, pIdx) => {
                  // Render numbered list items or bullet points if formatted
                  if (/^\d+\.\s+\*\*/.test(para) || /^\*\s+\*\*/.test(para)) {
                    const lines = para.split("\n");
                    return (
                      <ul key={pIdx} className="space-y-3.5 list-none pl-0 my-4">
                        {lines.map((l, lIdx) => {
                          const clean = l.replace(/^\d+\.\s+/, "").replace(/^\*\s+/, "");
                          const parts = clean.split("**");
                          if (parts.length >= 3) {
                            return (
                              <li key={lIdx} className="flex items-start gap-3 bg-white p-4 rounded-btn border border-border">
                                <CheckCircle2 className="w-4 h-4 text-brass-600 mt-1 shrink-0" />
                                <div>
                                  <strong className="text-ink font-semibold">{parts[1]}</strong>
                                  <span className="text-ink-secondary">{parts.slice(2).join("")}</span>
                                </div>
                              </li>
                            );
                          }
                          return (
                            <li key={lIdx} className="flex items-start gap-2.5 text-ink-secondary">
                              <span className="w-1.5 h-1.5 rounded-full bg-brass-500 mt-2.5 shrink-0" />
                              <span>{clean}</span>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }
                  return (
                    <p key={pIdx} className="text-ink-secondary leading-relaxed">
                      {para}
                    </p>
                  );
                })}
              </section>
            ))}

            {/* Editorial Pull Quote */}
            <div className="my-10 p-8 sm:p-10 bg-white rounded-card border-l-4 border-brass-500 border-y border-r border-border shadow-card relative">
              <span className="font-serif text-5xl text-brass-300 absolute top-2 left-4 select-none pointer-events-none opacity-40">
                &ldquo;
              </span>
              <p className="font-serif italic text-2xl sm:text-3xl text-ink-950 leading-snug relative z-10">
                Procedural regularity and documentary integrity are the indispensable ramparts against statutory penalties and regulatory enforcement actions.
              </p>
            </div>

            {/* Practical Governance Implications */}
            <section id="practical-implications" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950">
                Practical Governance Implications
              </h2>
              <p className="text-ink-secondary leading-relaxed">
                For corporate leadership and legal managers, the key takeaway is the urgency of periodic internal compliance audits. Reliance upon generic templates without jurisdiction-specific adaptation leaves substantial statutory vulnerabilities exposed across both the High Court at Calcutta and administrative tribunal scrutiny.
              </p>
            </section>

            {/* Concluding Recommendations */}
            <section id="chambers-summary" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950">
                Concluding Counsel Recommendations
              </h2>
              <p className="text-ink-secondary leading-relaxed">
                We counsel organisations to undertake a structured annual review of all statutory policies, committee appointment instruments, and dispute escalation frameworks. Preemptive legal diligence remains significantly more cost-effective than post-dispute litigation.
              </p>
            </section>

            <Rule />

            {/* Author Box */}
            <div className="p-6 bg-white rounded-card border border-border shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-navy-800 border border-brass-500/30 flex items-center justify-center shrink-0 text-brass-300 font-serif font-bold text-lg">
                AL
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-lg text-ink">{authorName}</h4>
                <p className="font-sans text-xs text-ink-secondary leading-relaxed">
                  {authorRole} Specializing in corporate governance, statutory compliance frameworks, and appellate advocacy in Kolkata.
                </p>
              </div>
            </div>

            {/* Mandatory Disclaimer */}
            <div className="p-4 bg-stone-100 rounded-card border border-border text-xs text-ink-muted leading-relaxed">
              <strong>Professional Disclaimer:</strong> The information in this publication is provided solely for general educational and informational purposes. It does not constitute legal advice and does not create an advocate-client relationship. Under Bar Council of India regulations, solicitation or advertisement is strictly prohibited.
            </div>

            {/* Related Articles - Fully Clickable */}
            {relatedPosts.length > 0 && (
              <div className="pt-8 space-y-6">
                <h3 className="font-serif text-2xl font-bold text-ink">
                  Related Legal Publications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPosts.slice(0, 2).map((rel) => (
                    <Link key={rel.slug} href={`/blog/${rel.slug}`} className="block group focus:outline-none">
                      <div className="p-5 bg-white rounded-card border border-border h-full flex flex-col justify-between shadow-sm card-hover cursor-pointer group-hover:border-brass-400 transition-all">
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-semibold text-brass-700 tracking-wider">
                            {formatCategory(rel.category)}
                          </span>
                          <h4 className="font-serif text-base font-bold text-ink group-hover:text-navy-700 transition leading-snug line-clamp-2">
                            {rel.title}
                          </h4>
                        </div>
                        <div className="pt-3 flex items-center gap-1.5 text-xs text-navy-700 font-semibold mt-2">
                          <span>Read analysis</span>
                          <ArrowRight className="w-3 h-3 text-brass-500 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Consultation CTA */}
            <div className="p-8 bg-navy-900 rounded-card text-white space-y-4 shadow-raised">
              <span className="text-xs uppercase font-semibold tracking-wider text-brass-300">
                Chambers Inquiry
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Discuss this statutory topic with counsel.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Our Kolkata chambers advise corporate boards, internal committees, and enterprises on regulatory compliance, risk mitigation, and institutional governance.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button variant="dark-primary" href="/request-service" arrow>
                  Request Consultation
                </Button>
                <Button variant="dark-secondary" href="/contact">
                  Chambers Address
                </Button>
              </div>
            </div>

          </main>

        </div>
      </div>

    </div>
  );
}
