"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Printer, Landmark, ShieldAlert, ArrowLeft } from "lucide-react";
import { GoldEyebrow } from "@/components/gold-eyebrow";

export interface TocItem {
  id: string;
  title: string;
}

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  eyebrow?: string;
  effectiveDate?: string;
  version?: string;
  toc: TocItem[];
  showTopBarCouncilNotice?: boolean;
  children: React.ReactNode;
}

export function LegalPageLayout({
  title,
  subtitle,
  eyebrow = "REGULATORY &amp; LEGAL NOTICE",
  effectiveDate = "1 January 2026",
  version = "2.0",
  toc,
  showTopBarCouncilNotice = false,
  children,
}: LegalPageLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>(toc[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of toc) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-surface py-12 md:py-16 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <GoldEyebrow label={eyebrow} />
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy mt-2">
                {title}
              </h1>
              <p className="mt-3 text-slate text-sm sm:text-base max-w-2xl leading-relaxed">
                {subtitle}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate">
                <span className="font-medium text-navy">Effective Date: {effectiveDate}</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>Version {version}</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>Acorn Legal Consultants &bull; Kolkata</span>
              </div>
            </div>

            {/* Print Button */}
            <div className="shrink-0">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-border text-navy text-xs font-semibold rounded-btn transition-colors shadow-soft"
              >
                <Printer className="w-4 h-4 text-gold" />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          {/* Top Bar Council Notice if flagged (e.g. on /disclaimer) */}
          {showTopBarCouncilNotice && (
            <div className="mb-10 p-6 bg-surface rounded-card border-l-4 border-l-gold border border-border shadow-soft space-y-3">
              <div className="flex items-center gap-2 text-navy font-serif font-bold text-base">
                <Landmark className="w-5 h-5 text-gold" />
                <span>Bar Council of India Rule 36 Statutory Declaration</span>
              </div>
              <p className="text-xs sm:text-sm text-slate leading-relaxed">
                As per the rules of the Bar Council of India, advocates are strictly prohibited from soliciting work or advertising in any form or manner. By accessing this website (<strong>www.acornlegal.in</strong>), the user confirms that they are seeking information relating to Acorn Legal Consultants of their own accord and that there has been no advertisement, personal communication, solicitation, invitation, or inducement of any sort whatsoever by Acorn Legal Consultants or any of its members to solicit any work through this website.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Desktop Sticky Table of Contents (4 cols) */}
            <aside className="lg:col-span-4 hidden lg:block sticky top-28 space-y-4">
              <div className="bg-surface p-5 rounded-card border border-border space-y-3">
                <h2 className="font-serif font-bold text-sm text-navy uppercase tracking-wider">
                  Table of Contents
                </h2>
                <nav className="space-y-1">
                  {toc.map((item, index) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-xs py-1.5 px-2.5 rounded transition-colors leading-relaxed ${
                          isActive
                            ? "bg-navy text-white font-semibold"
                            : "text-slate hover:text-navy hover:bg-slate-100"
                        }`}
                      >
                        <span className="opacity-70 mr-1.5">{index + 1}.</span>
                        {item.title}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Chambers Reference */}
              <div className="p-4 bg-white rounded-card border border-border text-xs text-slate space-y-1">
                <span className="font-semibold text-navy block">Chambers Registry</span>
                <p>12/1 Park Street, Kolkata 700016</p>
                <p>chambers@acornlegal.in</p>
              </div>
            </aside>

            {/* Document Body (8 cols) - 70ch readable line length */}
            <main className="lg:col-span-8 max-w-[70ch] text-sm text-ink leading-relaxed space-y-10">
              {children}

              {/* Standard Footer Bar Council Disclaimer on all legal pages */}
              {!showTopBarCouncilNotice && (
                <div className="pt-8 border-t border-border mt-12">
                  <div className="p-5 bg-surface rounded-card border border-border text-xs text-slate space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-navy">
                      <Landmark className="w-4 h-4 text-gold" />
                      <span>Bar Council of India Disclaimer</span>
                    </div>
                    <p className="leading-relaxed">
                      The information provided on this website is for general informational purposes only and does not constitute legal advice or create a lawyer-client relationship. Visitors must consult qualified legal counsel for advice tailored to their specific circumstances.
                    </p>
                  </div>
                </div>
              )}
            </main>

          </div>
        </div>
      </section>
    </div>
  );
}

