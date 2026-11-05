"use client";

import React from "react";
import Link from "next/link";
import {
  Briefcase,
  FileText,
  Scale,
  Gavel,
  ShieldCheck,
  Lock,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Phone,
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";
import {
  Button,
  Eyebrow,
  SectionHeading,
  EditorialLink,
  Rule,
  ArchImage,
} from "@/components/ui";

const APPROACH_ROWS = [
  {
    num: "01",
    title: "Advisory & Regulatory Guidance",
    desc: "Strategic legal counsel on corporate structuring, statutory compliance, board governance, and risk mitigation tailored to organizational commercial objectives.",
    focus: "Statutory audits &bull; Director fiduciary duties &bull; FEMA &bull; Corporate governance",
  },
  {
    num: "02",
    title: "Legal Documentation & Contracts",
    desc: "Meticulous drafting and vetting of commercial agreements, joint ventures, shareholder pacts, IP covenants, and statutory policies with defensive rigor.",
    focus: "Master Service Agreements &bull; Shareholder pacts &bull; Commercial leases &bull; NDAs",
  },
  {
    num: "03",
    title: "Dispute Resolution & Conciliation",
    desc: "Pre-litigation strategy, structured mediation, and commercial arbitration representation designed to preserve capital and achieve commercial finality.",
    focus: "Commercial arbitration &bull; Pre-litigation mediation &bull; Statutory notices &bull; Settlements",
  },
  {
    num: "04",
    title: "Tribunal & Statutory Representation",
    desc: "Disciplined advocacy before quasi-judicial bodies, High Courts, the NCLT, and statutory inquiry committees with uncompromised independence.",
    focus: "Tribunal representation &bull; NCLT filings &bull; High Court appeals &bull; POSH inquiries",
  },
];

const VALUES_GRID = [
  {
    title: "Integrity",
    desc: "Upholding the highest ethical standards of the Bar with uncompromised independence and statutory honesty.",
  },
  {
    title: "Strategic Insight",
    desc: "Anticipating legal hurdles and engineering structured solutions grounded in statutory precision.",
  },
  {
    title: "Commercial Understanding",
    desc: "Balancing strict compliance requirements with commercial efficiency and pragmatic operational execution.",
  },
  {
    title: "Discretion",
    desc: "Absolute confidentiality in safeguarding proprietary commercial affairs, leadership disputes, and sensitive matters.",
  },
  {
    title: "Diligence",
    desc: "Meticulous scrutiny of facts, exhaustive precedent research, and strict adherence to statutory timelines.",
  },
  {
    title: "Transparency",
    desc: "Open communication, transparent fee schedules, and candid appraisal of matter merits without ambiguous contingencies.",
  },
];

const TEAM_MEMBERS = [
  {
    role: "Senior Partner & Practice Lead",
    title: "Advocate & Legal Consultant",
    note: "[Profile photo to be supplied]",
    focus: "Commercial Litigation &bull; Arbitration &bull; Corporate Structuring",
  },
  {
    role: "Partner & POSH Practice Head",
    title: "External Member & Corporate Counsel",
    note: "[Profile photo to be supplied]",
    focus: "POSH Act 2013 Inquiries &bull; Employment Law &bull; Policy Governance",
  },
  {
    role: "Senior Associate & Documentation Lead",
    title: "Commercial Contracts Specialist",
    note: "[Profile photo to be supplied]",
    focus: "Contract Drafting &bull; Regulatory Compliance &bull; Due Diligence",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-ivory-50 text-ink">
      
      {/* Page Header */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 border-b border-border bg-ivory-50 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6">
          <Eyebrow>ABOUT ACORN LEGAL CONSULTANTS</Eyebrow>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink-950 leading-[1.05] max-w-4xl">
            Where legal expertise meets <span className="font-serif italic font-normal text-brass-700">strategic</span> excellence.
          </h1>
          <p className="font-sans text-lg sm:text-xl text-ink-secondary max-w-2xl leading-relaxed">
            Founded on the principles of discretion, statutory rigor, and unyielding professional integrity, Acorn Legal Consultants delivers principled counsel to corporate boards, institutions, and individuals across Kolkata and India.
          </p>
        </div>
      </section>

      {/* Section 1: Our Story (5/7 Split with Offset Arch Image) */}
      <section className="py-20 sm:py-28 border-b border-border">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left 5 Cols: Offset Arch Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md lg:-mt-12">
                <ArchImage
                  aspect="portrait"
                  label="Chambers Archive & Library"
                  sublabel="Camac Court, Kolkata"
                  glow
                />
              </div>
            </div>

            {/* Right 7 Cols: Long-Form Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <Eyebrow>OUR STORY</Eyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ink-950 leading-[1.12]">
                A legacy of thoughtful, <span className="font-serif italic font-normal text-brass-700">restrained</span> counsel.
              </h2>
              <div className="space-y-4 font-sans text-base text-ink-secondary leading-relaxed">
                <p>
                  Acorn Legal Consultants was established with a singular conviction: that modern corporate and institutional affairs require counsel who combine exhaustive statutory command with an unhurried, principled standard of care.
                </p>
                <p>
                  From our chambers situated at Camac Street in the Park Street District of Kolkata, our advocates and corporate consultants advise across diverse commercial sectors—including infrastructure, real estate, education, technology, and manufacturing.
                </p>
                <p>
                  We deliberately remain a focused practice rather than a volume firm. By doing so, we ensure that every client matter receives the personal attention of seasoned counsel, free from procedural bloat or divided loyalties.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Button variant="primary" href="/services" arrow>
                  Explore Practice Capabilities
                </Button>
                <EditorialLink href="/contact">
                  Visit Chambers
                </EditorialLink>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 2: Full-Bleed Navy Pull-Quote */}
      <section className="bg-ink-950 text-white py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brass-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1040px] mx-auto px-4 sm:px-6 text-center relative z-10 space-y-8">
          <div className="font-serif text-6xl text-brass-300 leading-none select-none">
            &ldquo;
          </div>

          <p className="font-serif text-2xl sm:text-4xl md:text-5xl font-medium text-ivory-50 leading-[1.25] tracking-tight">
            We measure our success not by the volume of dispute filings, but by the disputes prevented, the statutory risks neutralized, and the enduring institutional confidence built.
          </p>

          <div className="pt-4 flex flex-col items-center">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brass-300">
              The Acorn Chambers Philosophy
            </span>
            <div className="w-12 h-[1px] bg-brass-500 mt-3" />
          </div>
        </div>
      </section>

      {/* Section 3: Our Approach (4 Numbered Rows) */}
      <section className="py-24 sm:py-32 border-b border-border bg-ivory-50">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-16">
          <SectionHeading
            eyebrow="METHODOLOGY"
            title="Our Four Pillars of Engagement"
            accentWord="Pillars"
            description="A disciplined execution framework structured across advisory, drafting, dispute resolution, and regulatory advocacy."
          />

          <div className="divide-y divide-border border-y border-border">
            {APPROACH_ROWS.map((row) => (
              <div
                key={row.num}
                className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-stone-100/50 transition-colors p-4 rounded-card"
              >
                <div className="lg:col-span-2">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-brass-700">
                    {row.num}
                  </span>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950">
                    {row.title}
                  </h3>
                </div>
                <div className="lg:col-span-6 space-y-3">
                  <p className="font-sans text-base text-ink-secondary leading-relaxed">
                    {row.desc}
                  </p>
                  <div
                    className="font-sans text-xs font-semibold uppercase tracking-wider text-navy-700"
                    dangerouslySetInnerHTML={{ __html: row.focus }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Our Values (6-Item Grid with Thin Dividers, No Cards) */}
      <section className="py-24 sm:py-32 border-b border-border bg-stone-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-16">
          <SectionHeading
            align="center"
            eyebrow="FOUNDATIONAL ETHOS"
            title="Guiding Values of the Chambers"
            accentWord="Values"
            description="Our non-negotiable professional principles that dictate client engagement, confidentiality, and statutory candor."
          />

          {/* 6-item grid with thin dividers, no cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border-y border-border">
            {VALUES_GRID.map((val, idx) => (
              <div key={val.title} className="p-8 sm:p-10 space-y-3">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-brass-700">
                  Value 0{idx + 1}
                </span>
                <h3 className="font-serif text-2xl font-bold text-ink-950">
                  {val.title}
                </h3>
                <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Our Team (Arch-Shaped Portrait Placeholders marked [to be supplied]) */}
      <section className="py-24 sm:py-32 border-b border-border bg-ivory-50">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-16">
          <SectionHeading
            eyebrow="LEADERSHIP &amp; COUNSEL"
            title="Senior Counsel &amp; Practice Leaders"
            accentWord="Practice"
            description="Seasoned advocates and corporate legal consultants practicing with discretion and Bar Council compliance."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <div key={index} className="space-y-5">
                {/* Arch-shaped portrait placeholder */}
                <div className="w-full h-[380px] arch-mask bg-gradient-to-b from-navy-900 via-navy-800 to-ink-950 border border-brass-500/25 flex flex-col items-center justify-center p-6 text-center shadow-card relative group">
                  <div className="w-14 h-14 rounded-full bg-navy-800 border border-brass-500/40 flex items-center justify-center mb-3 text-brass-300">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <span className="font-serif text-xl font-bold text-white">
                    {member.role}
                  </span>
                  <span className="font-sans text-xs text-brass-300 uppercase tracking-widest mt-1">
                    {member.note}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl font-bold text-ink-950">
                    {member.title}
                  </h3>
                  <div
                    className="font-sans text-xs text-ink-secondary leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: member.focus }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-btn bg-stone-100 border border-border text-xs text-ink-muted text-center">
            Profiles presented strictly in compliance with Bar Council of India guidelines. Consultations scheduled post conflict check.
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-ink-950 text-white py-20 sm:py-28 relative overflow-hidden">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
          <Eyebrow dark className="justify-center">CONNECT WITH COUNSEL</Eyebrow>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            Consult our chambers on your <span className="font-serif italic font-normal text-brass-300">matter</span>.
          </h2>
          <p className="font-sans text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            All consultations are handled under strict advocate-client confidentiality and statutory discretion.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button variant="dark-primary" size="lg" href="/request-service" arrow>
              Request a Consultation
            </Button>
            <Button variant="dark-secondary" size="lg" href="/contact">
              Chambers Address &amp; Map
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
