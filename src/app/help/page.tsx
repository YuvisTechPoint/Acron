"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, Phone, FileText, ShieldCheck, ArrowRight, Search, BookOpen } from "lucide-react";
import { POSH_HELPLINES } from "@/lib/constants";

export default function PoshHelpCentrePage() {
  const [search, setSearch] = useState("");

  const articles = [
    {
      title: "What constitutes sexual harassment under Section 2(n)?",
      category: "Complainant Guide",
      summary: "Understand the five statutory categories of unwelcome sexual conduct, including physical advances, demands for sexual favours, and sexually coloured remarks.",
      link: "/qa",
    },
    {
      title: "How does the statutory 90-day inquiry timeline work?",
      category: "IC Procedure",
      summary: "Inquiry must be completed within 90 days from the anchor date under Section 11(4), followed by 10 days to submit the report to the employer.",
      link: "/qa",
    },
    {
      title: "Employer duties under Section 19: Annual Report & Display Notices",
      category: "Employer Compliance",
      summary: "Every employer must conspicuously display notices with penal consequences and submit the Section 21 Annual Report to the District Officer.",
      link: "/posh/org",
    },
    {
      title: "Protection from Retaliation & Hostile Environment",
      category: "Survivor Rights",
      summary: "Retaliation, adverse performance appraisal ratings, or intimidation against complainants or witnesses is punishable by law.",
      link: "/posh/retaliation",
    },
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-border pb-6 space-y-2">
          <div className="text-xs uppercase tracking-widest text-accent font-bold">
            Public Knowledge &bull; Support Centre
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
            POSH Help Centre &amp; Resource Hub
          </h1>
          <p className="text-sm text-ink-secondary max-w-2xl leading-relaxed">
            Guidance for employees, managers, and Internal Committees under the Sexual Harassment of Women at Workplace Act 2013.
          </p>
        </div>

        {/* Quick Links Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            href="/help/directory"
            className="p-5 bg-surface rounded-card border border-border shadow-card hover:bg-surface-muted transition-colors space-y-2 group"
          >
            <Phone className="w-6 h-6 text-accent" />
            <h3 className="font-serif font-bold text-base text-ink group-hover:text-primary">
              Helpline Directory &rarr;
            </h3>
            <p className="text-xs text-ink-secondary">
              Emergency contacts for NCW (7827170170), West Bengal Women&apos;s Helpline (181), and free legal aid.
            </p>
          </Link>

          <Link
            href="/posh/start"
            className="p-5 bg-surface rounded-card border border-border shadow-card hover:bg-surface-muted transition-colors space-y-2 group"
          >
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h3 className="font-serif font-bold text-base text-ink group-hover:text-primary">
              Applicability Wizard &rarr;
            </h3>
            <p className="text-xs text-ink-secondary">
              Check whether your complaint lies before an Internal Committee or the District Local Committee.
            </p>
          </Link>

          <Link
            href="/posh/portal"
            className="p-5 bg-surface rounded-card border border-border shadow-card hover:bg-surface-muted transition-colors space-y-2 group"
          >
            <FileText className="w-6 h-6 text-primary" />
            <h3 className="font-serif font-bold text-base text-ink group-hover:text-primary">
              Confidential Intake Desk &rarr;
            </h3>
            <p className="text-xs text-ink-secondary">
              File a confidential complaint with Quick Exit safety features and trauma-informed guidance.
            </p>
          </Link>
        </div>

        {/* Knowledge Articles */}
        <div className="space-y-4">
          <h2 className="font-serif font-bold text-xl text-ink">
            Frequently Consulted Articles &amp; Statutory Guidance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {articles.map((art, idx) => (
              <div key={idx} className="bg-surface p-5 rounded border border-border space-y-2 text-xs">
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                  {art.category}
                </span>
                <h3 className="font-serif font-bold text-base text-ink">
                  {art.title}
                </h3>
                <p className="text-ink-secondary leading-relaxed">
                  {art.summary}
                </p>
                <div className="pt-2">
                  <Link href={art.link} className="text-primary font-semibold hover:underline">
                    Read Statutory Guidance &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

