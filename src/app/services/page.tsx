"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, FileText, Compass, Landmark, ShieldCheck, Building, HelpCircle } from "lucide-react";
import { PRACTICE_AREAS, BRAND_CONFIG } from "@/lib/constants";
import { Eyebrow, SectionHeading, Button, Rule, usePrefersReducedMotion } from "@/components/ui";

export default function ServicesIndexPage() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    setCursorPos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div className="bg-ivory-50 text-ink min-h-screen">
      
      {/* Editorial Header */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 border-b border-border bg-ivory-50">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6">
          <nav className="text-xs font-sans text-ink-muted flex items-center gap-2">
            <Link href="/" className="hover:text-navy-700 transition">Home</Link>
            <span>/</span>
            <span className="text-brass-700 font-semibold">Services</span>
          </nav>

          <Eyebrow>CAPABILITIES &amp; ADVISORY</Eyebrow>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink-950 leading-[1.05] max-w-4xl">
            Our Practice Areas &amp; <span className="font-serif italic font-normal text-brass-700">Legal</span> Counsel.
          </h1>

          <p className="font-sans text-lg sm:text-xl text-ink-secondary max-w-2xl leading-relaxed">
            A comprehensive index of corporate structuring, dispute mitigation, statutory documentation, and institutional compliance services delivered with discretion and precision.
          </p>
        </div>
      </section>

      {/* Services Premium Index List */}
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIdx(null)}
        className="py-16 sm:py-24 max-w-[1240px] mx-auto px-4 sm:px-6 relative"
      >
        <div className="divide-y divide-border border-y border-border">
          {PRACTICE_AREAS.slice(0, 6).map((pa, idx) => {
            const isHovered = hoveredIdx === idx;
            const stepNum = `0${idx + 1}`;

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
                    <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ink-950 group-hover:text-navy-700 transition-colors">
                      {pa.title}
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed max-w-2xl">
                      {pa.shortDesc}
                    </p>
                  </div>

                  {/* Arrow Action (2 cols) */}
                  <div className="md:col-span-2 flex justify-start md:justify-end items-center">
                    <div className="w-12 h-12 rounded-full border border-border group-hover:border-brass-500/50 bg-white group-hover:bg-navy-700 flex items-center justify-center transition-all duration-200 shadow-sm">
                      <ArrowRight className="w-5 h-5 text-brass-500 group-hover:text-ivory-50 group-hover:translate-x-0.5 transition-all" />
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

      {/* Closing Guidance */}
      <section className="bg-stone-100 py-20 sm:py-24 border-t border-border">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950">
              Need counsel on a customized statutory or cross-border matter?
            </h3>
            <p className="font-sans text-sm text-ink-secondary leading-relaxed">
              We review complex regulatory briefs and furnish formal engagement scopes within 24 hours.
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
