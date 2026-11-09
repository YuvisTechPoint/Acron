"use client";

import React, { useState, useEffect } from "react";
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

export default function SingleBlogPostPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("statutory-background");

  const blogs = useRealtimePosts();
  const post = blogs.find((b) => b.slug === slug) || blogs[0];
  const relatedPosts = blogs.filter((b) => b.slug !== post.slug).slice(0, 3);

  const authorName =
    typeof post.author === "object" && post.author !== null
      ? (post.author as any).name
      : (post.authorName || "Advocate & Practice Lead, Acorn Legal");

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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

  const TOC_ITEMS = [
    { id: "statutory-background", label: "1. Statutory Background" },
    { id: "judicial-doctrine", label: "2. Judicial Doctrine & Precedents" },
    { id: "key-observations", label: "3. Key Analytical Observations" },
    { id: "practical-implications", label: "4. Practical Governance Implications" },
    { id: "conclusion", label: "5. Concluding Recommendations" },
  ];

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
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brass-700 hover:text-navy-700 transition uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Insights</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="brass">{post.category}</Badge>
            <span className="text-xs text-ink-muted flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTimeMinutes || post.readingTimeMinutes || 6} min read</span>
            </span>
            <span className="text-xs text-ink-muted">&bull;</span>
            <span className="text-xs text-ink-muted">
              {formatDate(post.publishedAt)}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink-950 leading-[1.12]">
            {post.title}
          </h1>

          <p className="font-sans text-lg sm:text-xl text-ink-secondary leading-relaxed max-w-3xl">
            {post.excerpt || post.summary}
          </p>

          <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-ink-secondary">
            <div>
              Published by <span className="font-semibold text-ink">{authorName}</span> &bull; Kolkata Chambers
            </div>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn border border-border bg-white hover:bg-surface text-ink transition shadow-sm"
              aria-label="Share article link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-status-success" />
                  <span className="text-status-success font-semibold">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-brass-500" />
                  <span>Share</span>
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
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-brass-700 pb-2 border-b border-border">
              Table of Contents
            </div>
            <nav className="space-y-1 text-xs font-sans">
              {TOC_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block py-1.5 px-2.5 rounded-btn text-ink-secondary hover:text-navy-700 hover:bg-stone-100 transition"
                >
                  {item.label}
                </a>
              ))}
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
            
            {/* First Paragraph with Drop Cap */}
            <p
              id="statutory-background"
              className="first-letter:float-left first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:text-brass-700 first-letter:leading-none scroll-mt-28"
            >
              The regulatory architecture governing commercial corporate entities in India has entered a phase of intensified statutory scrutiny. Recent appellate determinations underscore that procedural precision is no longer secondary to substantive merits, but stands co-equal in maintaining institutional defensibility.
            </p>

            <p>
              Under recent jurisprudence from the Hon&apos;ble High Court at Calcutta and the Supreme Court of India, tribunals have repeatedly emphasized the strict necessity of observing statutory time limits, constitution requirements, and uncorrupted due process.
            </p>

            {/* Pull Quote Device */}
            <div className="my-10 p-8 sm:p-10 bg-white rounded-card border-l-4 border-brass-500 border-y border-r border-border shadow-card relative">
              <span className="font-serif text-5xl text-brass-300 absolute top-2 left-4 select-none pointer-events-none opacity-40">
                &ldquo;
              </span>
              <p className="font-serif italic text-2xl sm:text-3xl text-ink-950 leading-snug relative z-10">
                Procedural regularity and documentary integrity are the indispensable ramparts against regulatory penalties and protracted commercial litigation.
              </p>
            </div>

            <section id="judicial-doctrine" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950">
                2. Judicial Doctrine &amp; Precedents
              </h2>
              <p>
                In several recent matters concerning statutory notices and commercial documentation, courts have firmly rejected claims of inadvertent oversight. When parties execute structured agreements or constitute statutory panels, compliance with the primary statute must be demonstrated with clear contemporaneously prepared records.
              </p>
              <p>
                This standard is especially pronounced in the administration of the POSH Act 2013 and Companies Act 2013, where institutional non-compliance attracts personal accountability for directors and designated officers.
              </p>
            </section>

            <section id="key-observations" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950">
                3. Key Analytical Observations
              </h2>
              <ul className="space-y-3 list-disc pl-5 text-ink-secondary">
                <li>
                  <strong className="text-ink">Independence of Appointed Members:</strong> External members and statutory monitors must have no personal or operational entanglements with the entities under review.
                </li>
                <li>
                  <strong className="text-ink">Defensible Documentation:</strong> Memoranda, minutes, and notices must be served with verified proof of dispatch and receipt.
                </li>
                <li>
                  <strong className="text-ink">Adherence to Timelines:</strong> Statutory windows—such as Section 9 filing periods or notice reply terms—must be scrupulously recorded.
                </li>
              </ul>
            </section>

            <section id="practical-implications" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950">
                4. Practical Governance Implications
              </h2>
              <p>
                For corporate leadership and legal managers, the key takeaway is the urgency of periodic internal compliance audits. Reliance upon standard templates without contextual adaptation leaves substantial statutory vulnerabilities exposed.
              </p>
            </section>

            <section id="conclusion" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950">
                5. Concluding Recommendations
              </h2>
              <p>
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
                  Practice Lead at Acorn Legal Consultants, Kolkata. Specializing in corporate governance, statutory compliance frameworks, and appellate commercial advocacy.
                </p>
              </div>
            </div>

            {/* Mandatory Disclaimer */}
            <div className="p-4 bg-stone-100 rounded-card border border-border text-xs text-ink-muted leading-relaxed">
              <strong>Professional Disclaimer:</strong> The information in this article is provided solely for general educational and informational purposes. It does not constitute legal advice and does not create an advocate-client relationship. Under Bar Council of India regulations, solicitation or advertisement is prohibited.
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="pt-8 space-y-6">
                <h3 className="font-serif text-2xl font-bold text-ink">
                  Related Commentary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPosts.slice(0, 2).map((rel) => (
                    <Link key={rel.slug} href={`/blog/${rel.slug}`} className="block group">
                      <div className="p-5 bg-white rounded-card border border-border h-full flex flex-col justify-between shadow-sm card-hover">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-semibold text-brass-700">
                            {rel.category}
                          </span>
                          <h4 className="font-serif text-lg font-bold text-ink group-hover:text-navy-700 transition">
                            {rel.title}
                          </h4>
                        </div>
                        <div className="pt-3 flex items-center gap-1 text-xs text-navy-700 font-semibold mt-2">
                          <span>Read</span>
                          <ArrowRight className="w-3 h-3 text-brass-500" />
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
                Our Kolkata chambers advise corporate boards and institutions on regulatory strategy and risk containment.
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
