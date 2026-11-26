"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  Users,
  Scale,
  FileCheck2,
  Lock,
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";
import { Button, Eyebrow, SectionHeading } from "@/components/ui";

const COUNSEL_MEMBERS = [
  {
    name: "Adv. Rajesh Telge",
    role: "Advocate on Panel & Practice Head",
    enrollment: "Bar Council of Maharashtra & Goa • High Court Bar Association",
    experience: "Over 15 Years of Bar Practice",
    focus: "Civil & Commercial Litigation • Section 138 NI Act • 30-Year Property Title Search • MahaRERA & Succession",
    creed:
      "We practice law with the conviction that behind every brief, contract, or inquiry is a person whose security and livelihood depend on our diligence. That fiduciary responsibility cannot be delegated to algorithms or junior intermediaries.",
    image: "/images/hero-1.jpg",
    directPhone: "+91 8369171822",
    badge: "Principal Legal Consultant",
  },
  {
    name: "Independent Grievance & POSH External Counsel",
    role: "Neutral External IC Member & Arbitrator",
    enrollment: "Statutory Panel under Sexual Harassment of Women at Workplace Act, 2013",
    experience: "Presiding over 100+ Institutional Inquiries",
    focus: "Neutral Grievance Committees • Section 10 Conciliation • Fair Hearings for Women & Men • Workplace Culture",
    creed:
      "A truly dignified workplace requires impartial, patient listening. We ensure that complainants are protected from reprisal, respondents receive rigorous natural justice, and organizations build genuine psychological safety.",
    image: "/images/posh-compliance-desk.jpg",
    directPhone: "+91 828 69 36 899",
    badge: "Workplace Dignity Lead",
  },
  {
    name: "Property Due Diligence & Conveyancing Counsel",
    role: "Title Search & Society Governance Lead",
    enrollment: "Approved Panel Conveyancer & GDCA Auditor Liaison",
    experience: "1,500+ Verified Title Searches",
    focus: "30-Year Title Due Diligence • Registered Leave & License • Co-operative Society Formations • MEA Apostille",
    creed:
      "Real estate and family assets represent generational sweat and capital. Our exhaustive 30-year archival examinations uncover hidden municipal encumbrances, lis pendens, and inheritance defects before money changes hands.",
    image: "/brand/statutory-guidance-full.jpg",
    directPhone: "+91 828 69 36 899",
    badge: "Real Estate & Trusts Lead",
  },
];

const HUMAN_COMMITMENTS = [
  {
    icon: <Users className="w-5 h-5 text-brass-600" />,
    title: "Direct Advocate Privilege",
    desc: "You consult directly with practicing advocates before retaining. No voicebots, call centers, or screening intermediaries.",
  },
  {
    icon: <Scale className="w-5 h-5 text-brass-600" />,
    title: "Empathetic, Unbiased Listening",
    desc: "Whether dealing with a toxic workplace matter, unfair accusations, or a disputed agreement, we stand by you with empathy and zero judgment.",
  },
  {
    icon: <FileCheck2 className="w-5 h-5 text-brass-600" />,
    title: "Plain-Language Advisory",
    desc: "No confusing Latin jargon. Transparent written roadmaps, clear statutory timelines, and predictable fixed fee schedules.",
  },
  {
    icon: <Lock className="w-5 h-5 text-brass-600" />,
    title: "Absolute Statutory Discretion",
    desc: "Every word, email, and document shared is protected under Section 126 of the Indian Evidence Act (advocate-client privilege).",
  },
];

export function ChambersLeadership() {
  return (
    <section className="bg-ivory-50 py-24 sm:py-32 border-b border-border relative overflow-hidden">
      {/* Ambient background watermark */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-16 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="CHAMBERS COUNSEL & LEADERSHIP"
            title="Practicing Advocates with a Personal, Accountable Touch"
            accentWord="Accountable"
            description="Confidence comes from knowing the exact human counsel standing beside you. Every brief is guided personally by enrolled advocates."
          />
          <Button variant="secondary" href="/about" arrow>
            About Chambers &amp; Bar Standing
          </Button>
        </div>

        {/* 1. Principal Counsel Spotlight Card (Adv. Rajesh Telge) */}
        <div className="bg-white rounded-2xl border border-brass-500/30 p-8 sm:p-10 lg:p-12 shadow-card hover:border-brass-400 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left: Framed High-Res Counsel Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-brass-500/40 shadow-raised bg-navy-950 group">
                <Image
                  src={COUNSEL_MEMBERS[0].image}
                  alt={COUNSEL_MEMBERS[0].name}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />

                {/* Floating Bottom Counsel Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-ink-950/95 border border-brass-500/35 text-white space-y-1 shadow-lg">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-brass-300 font-semibold tracking-wider uppercase text-[10px]">
                      {COUNSEL_MEMBERS[0].badge}
                    </span>
                    <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Active Bar Practice
                    </span>
                  </div>
                  <div className="font-serif font-bold text-lg text-white">
                    {COUNSEL_MEMBERS[0].name}
                  </div>
                  <div className="text-[11px] text-slate-300 truncate">
                    {COUNSEL_MEMBERS[0].experience}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Bio, Fiduciary Creed & Direct Contact */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass-500/15 border border-brass-500/30 text-brass-700 text-xs font-semibold">
                  <Award className="w-3.5 h-3.5 text-brass-600" />
                  <span>{COUNSEL_MEMBERS[0].enrollment}</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ink-950 leading-tight">
                  {COUNSEL_MEMBERS[0].name}
                </h3>

                <p className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-brass-700">
                  {COUNSEL_MEMBERS[0].role}
                </p>
              </div>

              {/* Personal Creed Quote */}
              <div className="relative pl-5 border-l-2 border-brass-500/60 py-1 space-y-2">
                <p className="font-serif italic text-base sm:text-lg text-ink-950 leading-relaxed">
                  &ldquo;{COUNSEL_MEMBERS[0].creed}&rdquo;
                </p>
                <div className="text-xs font-semibold text-brass-700">
                  — Chambers Fiduciary Standard
                </div>
              </div>

              {/* Practice Discipline Tags */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                  Primary Judicial &amp; Advisory Scope
                </div>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed bg-stone-100 p-3.5 rounded-lg border border-border">
                  {COUNSEL_MEMBERS[0].focus}
                </p>
              </div>

              {/* Direct Actions: Call Counsel & Book Intake */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${COUNSEL_MEMBERS[0].directPhone}`}
                  className="inline-flex items-center gap-2 px-5 h-12 rounded-btn bg-navy-900 hover:bg-navy-800 text-white font-sans text-xs font-bold tracking-wider uppercase transition shadow-sm"
                >
                  <Phone className="w-4 h-4 text-brass-300" />
                  <span>Call Direct Desk: {COUNSEL_MEMBERS[0].directPhone}</span>
                </a>

                <Button variant="secondary" href="/request-service" arrow>
                  Book Case Intake
                </Button>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Collaborative Practice Leads: POSH & Real Estate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COUNSEL_MEMBERS.slice(1).map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-border p-6 sm:p-8 space-y-6 hover:border-brass-400/80 transition-all duration-200 shadow-card flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-brass-500/40 shadow-sm shrink-0 bg-navy-950">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brass-700 bg-brass-500/10 px-2 py-0.5 rounded border border-brass-500/20">
                      {member.badge}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-ink-950">
                      {member.name}
                    </h4>
                    <p className="text-xs text-ink-secondary">
                      {member.role}
                    </p>
                  </div>
                </div>

                <p className="font-serif italic text-sm text-ink leading-relaxed pl-3 border-l-2 border-brass-500/40">
                  &ldquo;{member.creed}&rdquo;
                </p>

                <div className="text-xs text-ink-secondary bg-surface p-3 rounded border border-border space-y-1">
                  <span className="font-semibold text-ink block text-[11px] uppercase tracking-wider">
                    Core Mandate:
                  </span>
                  <span>{member.focus}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-semibold">
                <span className="text-navy-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {member.experience}
                </span>
                <Link
                  href="/request-service"
                  className="text-brass-700 hover:text-navy-900 inline-flex items-center gap-1 group"
                >
                  <span>Consult practice lead</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 3. The 4 Fiduciary Human Commitments */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white border border-brass-500/30 shadow-raised space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brass-300">
              The Acorn Fiduciary Promise
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Law As It Should Be: Personal, Transparent &amp; Human
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every client engagement is anchored in four non-negotiable professional principles that protect your rights and respect your dignity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HUMAN_COMMITMENTS.map((com, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-navy-900/80 border border-navy-700/80 space-y-3 hover:border-brass-400/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-brass-500/15 border border-brass-500/30 flex items-center justify-center">
                  {com.icon}
                </div>
                <h4 className="font-serif font-bold text-base text-white">
                  {com.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {com.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center text-[11px] text-slate-400 border-t border-navy-800">
            Strict compliance with Bar Council of India professional standards &bull; Zero solicited guarantees &bull; Privilege under Section 126 Evidence Act
          </div>
        </div>

      </div>
    </section>
  );
}
