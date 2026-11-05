"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Clock,
  Calendar,
  BookOpen,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import {
  Button,
  Eyebrow,
  SectionHeading,
  EditorialLink,
  ArchImage,
  Card,
  Badge,
} from "@/components/ui";

const CATEGORIES = [
  "All Insights",
  "Corporate Law",
  "POSH Compliance",
  "Dispute Resolution",
  "Commercial Contracts",
];

export default function BlogIndexPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Insights");

  const rawBlogs = platformStore.getBlogs();

  const filtered = rawBlogs.filter((b) => {
    const matchesCat =
      selectedCategory === "All Insights" ||
      b.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = filtered[0];
  const gridArticles = filtered.slice(1);

  return (
    <div className="bg-ivory-50 text-ink min-h-screen">
      
      {/* Magazine Page Header */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 border-b border-border bg-ivory-50">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6">
          <nav className="text-xs font-sans text-ink-muted flex items-center gap-2">
            <Link href="/" className="hover:text-navy-700 transition">Home</Link>
            <span>/</span>
            <span className="text-brass-700 font-semibold">Insights</span>
          </nav>

          <Eyebrow>LEGAL COMMENTARY &amp; PRECEDENTS</Eyebrow>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink-950 leading-[1.05] max-w-4xl">
            Insights, Precedents &amp; <span className="font-serif italic font-normal text-brass-700">Statutory</span> Analysis.
          </h1>

          <p className="font-sans text-lg sm:text-xl text-ink-secondary max-w-2xl leading-relaxed">
            Scholarly analysis of corporate regulatory amendments, High Court and Supreme Court rulings, and institutional compliance standards.
          </p>
        </div>
      </section>

      {/* Category Chips with Animated Underlines & Search */}
      <section className="py-8 border-b border-border bg-stone-100/60 sticky top-20 z-30 backdrop-blur-md">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          {/* Category Chips with Animated Underlines */}
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`link-editorial py-1 text-xs sm:text-sm transition-colors ${
                    isSelected
                      ? "text-navy-700 font-bold border-b-2 border-brass-500"
                      : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search legal topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-btn bg-white border border-border text-xs text-ink placeholder:text-ink-muted focus:outline-none focus:border-navy-700"
            />
          </div>

        </div>
      </section>

      {/* Main Magazine Layout */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-16">
        
        {/* Full-Width Featured Article with Arch Mask Image */}
        {featured && (
          <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left 7 cols: Article Summary */}
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="brass">{featured.category}</Badge>
                    <span className="text-xs text-ink-muted flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{featured.readTimeMinutes || 6} min read</span>
                    </span>
                    <span className="text-xs text-ink-muted">&bull;</span>
                    <span className="text-xs text-ink-muted">
                      {formatDate(featured.publishedAt)}
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ink-950 leading-[1.12]">
                    <Link
                      href={`/blog/${featured.slug}`}
                      className="hover:text-navy-700 transition"
                    >
                      {featured.title}
                    </Link>
                  </h2>

                  <p className="font-sans text-base text-ink-secondary leading-relaxed">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-border flex items-center justify-between">
                  <div className="text-xs font-medium text-ink">
                    By <span className="font-semibold text-navy-700">{featured.authorName}</span>
                  </div>
                  <EditorialLink href={`/blog/${featured.slug}`}>
                    Read Full Analysis
                  </EditorialLink>
                </div>
              </div>

              {/* Right 5 cols: Arch Mask Placeholder */}
              <div className="lg:col-span-5 p-6 lg:p-8 flex items-center justify-center bg-stone-100/50">
                <div className="w-full max-w-sm">
                  <ArchImage
                    aspect="standard"
                    label={featured.category}
                    sublabel="Acorn Legal Commentary"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Asymmetric Masonry-Style Grid for Remaining Articles */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {gridArticles.map((art, idx) => {
            // Asymmetric rhythm: alternating 7/5 or 4/4/4 cols
            const spanClass =
              idx % 5 === 0
                ? "md:col-span-7"
                : idx % 5 === 1
                ? "md:col-span-5"
                : "md:col-span-4";

            return (
              <div key={art.slug} className={spanClass}>
                <Link href={`/blog/${art.slug}`} className="block h-full group focus:outline-none">
                  <Card
                    arrowOnHover
                    className="h-full flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <Badge variant="stone">{art.category}</Badge>
                        <span className="text-ink-muted">
                          {formatDate(art.publishedAt)}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-ink-950 group-hover:text-navy-700 transition leading-snug">
                        {art.title}
                      </h3>

                      <p className="font-sans text-xs sm:text-sm text-ink-secondary line-clamp-3 leading-relaxed">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                      <span className="text-ink-muted">
                        {art.readTimeMinutes || 5} min read
                      </span>
                      <span className="font-semibold text-navy-700 flex items-center gap-1">
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5 text-brass-500" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-card border border-border space-y-3">
            <h3 className="font-serif text-2xl font-bold text-ink">No commentary found</h3>
            <p className="font-sans text-sm text-ink-secondary">
              Try adjusting your search terms or selecting another category filter.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
