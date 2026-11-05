"use client";

import React from "react";
import Link from "next/link";
import { Scale, ShieldCheck, Briefcase, Users, Building2, Landmark, CheckCircle, ArrowRight } from "lucide-react";
import { PRACTICE_AREAS } from "@/lib/constants";

export default function PracticeAreasPage() {
  return (
    <div className="bg-white">
      {/* Banner */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-accent-gold font-bold">
              Practice Capabilities
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              Our Practice Areas
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Providing strategic legal advisory, commercial contract drafting, High Court dispute advocacy, and statutory workplace compliance across Eastern India and nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {PRACTICE_AREAS.map((pa, idx) => (
            <div
              key={pa.slug}
              id={pa.slug}
              className="bg-surface rounded-card p-8 border border-border grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-5 space-y-4">
                <div className="w-12 h-12 rounded bg-primary text-white flex items-center justify-center shadow-card">
                  {pa.slug === "posh-compliance" && <ShieldCheck className="w-6 h-6 text-accent-gold" />}
                  {pa.slug === "corporate-commercial" && <Briefcase className="w-6 h-6 text-accent-gold" />}
                  {pa.slug === "dispute-resolution" && <Scale className="w-6 h-6 text-accent-gold" />}
                  {pa.slug === "employment-labour" && <Users className="w-6 h-6 text-accent-gold" />}
                  {pa.slug === "real-estate-property" && <Building2 className="w-6 h-6 text-accent-gold" />}
                  {pa.slug === "banking-finance" && <Landmark className="w-6 h-6 text-accent-gold" />}
                </div>

                <h3 className="font-serif text-2xl font-bold text-ink">
                  {pa.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {pa.shortDesc}
                </p>

                <div className="pt-2 flex gap-3">
                  <Link
                    href={`/contact?category=${pa.slug}`}
                    className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover transition-colors"
                  >
                    Consult on this Matter
                  </Link>
                  {pa.slug === "posh-compliance" && (
                    <Link
                      href="/posh"
                      className="px-4 py-2 border border-primary text-primary text-xs font-semibold rounded hover:bg-surface-muted transition-colors"
                    >
                      View Dedicated POSH Desk
                    </Link>
                  )}
                </div>
              </div>

              <div className="lg:col-span-7 bg-white p-6 rounded border border-border-subtle">
                <div className="text-xs font-bold uppercase tracking-wider text-accent mb-3">
                  Key Legal Services &amp; Statutory Coverage
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pa.services.map((s, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-xs text-ink">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

