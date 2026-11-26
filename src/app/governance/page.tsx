"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  Compass,
  Building2,
  ShieldCheck,
  Scale,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Landmark,
  Layers,
  GraduationCap,
  Stethoscope,
  Laptop,
  Factory,
} from "lucide-react";

export default function GovernanceHubPage() {
  const pillars = [
    {
      title: "Statutory Rights & Fair Trial Charters",
      href: "/governance/charters",
      icon: FileText,
      badge: "PRD Section 8.35",
      description:
        "Balanced natural justice frameworks establishing statutory protections for complainants, fair trial and defence rights for respondents, quasi-judicial duties for Internal Committees, and mandatory compliance obligations for employers under POSH Act 2013.",
      highlights: [
        "Complainant trauma-informed protections & interim relief",
        "Respondent natural justice, cross-examination & notice safeguards",
        "Internal Committee statutory powers under Code of Civil Procedure",
        "Section 19 employer duties & Section 21 Annual Report filing",
      ],
      action: "Explore Stakeholder Charters",
    },
    {
      title: "Multi-Forum Legal Redress Pathways",
      href: "/governance/pathways",
      icon: Compass,
      badge: "PRD Section 8.36",
      description:
        "Comprehensive comparative matrix detailing 6 legal forums: Internal Committee inquiries, Local Committee redressal, Police FIRs under BNS/IPC, Civil Damages, Labour Court remedies, and High Court Writ Petitions under Article 226.",
      highlights: [
        "Inquiry timelines, standard of proof & statutory evidence bars",
        "Section 16 strict non-disclosure statutory confidentiality bar",
        "High Court supervisory jurisdiction & judicial review remedies",
        "Independent External Member support & counsel representation",
      ],
      action: "Review Justice Pathways",
    },
    {
      title: "Sector-Specific Compliance Overlays",
      href: "/governance/sectors",
      icon: Building2,
      badge: "PRD Section 8.37",
      description:
        "Specialized governance matrices tailored for regulated industries: Higher Education (UGC Regulations 2015), Healthcare (NMC / WBCEA), IT & Tech (SEZ / 24x7 Cab Escorts), Manufacturing & Heavy Industry (Factories Act 1948), and Banking & NBFCs (RBI Directives).",
      highlights: [
        "UGC mandatory student representation on ICC for universities",
        "Healthcare doctor/patient/intern duty doctor night protocols",
        "IT/ITeS remote work jurisdiction, cab telemetry & offsite audits",
        "Factory shop-floor shift rotations & contract worker IC coverage",
      ],
      action: "View Sector Overlays",
    },
  ];

  const sectorIcons = [
    { name: "Higher Education (UGC)", icon: GraduationCap },
    { name: "Healthcare (NMC / WBCEA)", icon: Stethoscope },
    { name: "IT / Tech / SEZ", icon: Laptop },
    { name: "Manufacturing (Factories Act)", icon: Factory },
    { name: "Banking & NBFC (RBI)", icon: Landmark },
  ];

  return (
    <div className="bg-surface min-h-screen pt-32 pb-16 sm:pt-36 sm:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/posh"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition"
          >
            <span>&larr; Back to POSH Practice Group</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/services" className="text-slate-600 hover:text-primary">
              All 37 Services
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/contact" className="text-slate-600 hover:text-primary">
              Chambers Advisory
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white p-8 sm:p-12 rounded-card border border-border shadow-card space-y-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
            <Scale className="w-4 h-4 text-primary" />
            <span>Corporate Governance &bull; Statutory Charters &bull; Regulatory Directives</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink leading-tight">
            Governance Frameworks &amp; Statutory Regulatory Directives
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
            Acorn Legal Consultants provides end-to-end statutory governance, trauma-informed stakeholder charters, multi-forum dispute pathways, and sector overlays under the Sexual Harassment of Women at Workplace Act 2013 and allied Indian enterprise statutes.
          </p>

          {/* Quick Sector Tags */}
          <div className="pt-4 border-t border-border flex flex-wrap items-center gap-3 text-xs text-slate-600">
            <span className="font-semibold text-ink">Regulated Sectors Covered:</span>
            {sectorIcons.map((sec) => {
              const Icon = sec.icon;
              return (
                <span
                  key={sec.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface rounded-full border border-border font-medium"
                >
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  <span>{sec.name}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* 3 Main Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white rounded-card p-6 sm:p-8 border border-border shadow-card flex flex-col justify-between hover:border-brass-500/50 hover:shadow-lg transition group"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-lg bg-navy-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-brass-700 bg-brass-50 px-2.5 py-1 rounded border border-brass-200">
                      {pillar.badge}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-serif text-xl font-bold text-ink group-hover:text-navy-900 transition">
                      {pillar.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border/60">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Key Capabilities:
                    </div>
                    {pillar.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border">
                  <Link
                    href={pillar.href}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 bg-navy-900 text-white text-xs font-semibold rounded-btn hover:bg-navy-800 transition group-hover:shadow"
                  >
                    <span>{pillar.action}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Regulatory Compliance Guarantee Banner */}
        <div className="bg-navy-950 text-white rounded-card p-8 border border-navy-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass-500/20 text-brass-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-brass-400" />
                <span>Statutory Chambers Certification &bull; High Court at Calcutta</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-ivory-50">
                Institutional Legal Assurance &amp; External Member Appointments
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                All charters, templates, and sector protocols are formulated under the supervision of Advocates enrolled with the Bar Council of West Bengal, adhering strictly to Supreme Court of India precedents including <em>Aureliano Fernandes v. State of Goa (2023)</em>.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
              <Link
                href="/posh/org"
                className="px-5 py-3 bg-brass-500 hover:bg-brass-400 text-navy-950 font-bold text-xs uppercase tracking-wider rounded text-center transition shadow"
              >
                Enterprise POSH Portal
              </Link>
              <Link
                href="/request-service?category=posh_compliance"
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded text-center transition border border-white/20"
              >
                Appoint External Member
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
