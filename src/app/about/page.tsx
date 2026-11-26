"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  FileText,
  Compass,
  ShieldCheck,
  Shield,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Phone,
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";
import { platformStore } from "@/lib/store";
import { useRealtimeSiteConfig, useRealtimeTeam } from "@/lib/realtime";
import { PageContentItem } from "@/lib/types";
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
    title: "Educational Guidance & Admissions Counseling",
    desc: "Comprehensive coaching for Private 10-SSC / 12- Arts, Commerce, Science and Graduation from government approved boards and universities with guaranteed 100% results coaching. Expert guidance for College Admissions in India & Abroad (MBBS, MD, Pharmacy) and form filling for Mumbai University (June–Sept) and Schools RTE (Oct–Dec).",
    focus: "Private 10th & 12th Coaching &bull; MBBS &amp; MD Admissions &bull; Mumbai University Forms &bull; RTE Pre-Admissions",
  },
  {
    num: "02",
    title: "Taxation, Licensing & Doorstep Registration",
    desc: "Leave & License Agreement registration completed at your doorstep at convenient timings. Full-service Co-operative Housing Society formation by approved GDCA auditors and society management. Drafting of Sale & Purchase agreements with stamp duty, Power of Attorney, Commercial loan contracts, and State Excise individual liquor licenses.",
    focus: "Doorstep Leave &amp; License &bull; GDCA Society Formation &bull; Sale Agreements &amp; POA &bull; State Excise Licenses",
  },
  {
    num: "03",
    title: "Legal Documentation, Deeds & Attestations",
    desc: "Exhaustive 30-year Land & Plot Title Search Reports, Property Cards (7×12 / 6×12 extract), Index-2 verification, Registered Wills, Gift & Release Deeds, Probate / Succession Certificates, Live-in Relationship Agreements, Senior Citizen Cards, and Official Gazette notifications for Name, Religion, or DOB changes.",
    focus: "30-Year Title Search &bull; Registered WILL &bull; 7×12 Property Card &bull; MEA Apostille &amp; Embassy Attestation",
  },
  {
    num: "04",
    title: "Judicial Advocacy, Matrimonial & Mediation",
    desc: "Court marriage solemnization for all castes & religions, statutory marriage registration, divorce & domestic violence counsel, Motor & Road Accident hit-and-run compensation (MV Act) for death or disability, MahaRERA complaints against builders, and confidential in-house mediation and counseling.",
    focus: "Court Marriage (All Castes) &bull; Divorce &amp; Domestic Violence &bull; Motor Accident Claims &bull; In-House Mediation",
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
    role: "Advocate on Panel & Practice Head",
    title: "Advocate & Legal Consultant",
    note: "[Advocate on Panel: Adv. Rajesh Telge]",
    focus: "Civil & Criminal Matters &bull; 30-Year Title Search &bull; MahaRERA &bull; Succession & Wills",
  },
  {
    role: "Educational Advisory & Academic Lead",
    title: "Educational & Tax Consultant",
    note: "[Over 15 Years of Expertise]",
    focus: "Professional Degree Admissions &bull; University Form Guidance &bull; Tax Advisory",
  },
  {
    role: "Society Governance & Documentation Lead",
    title: "Property & Societies Specialist",
    note: "[Chambers Advisory]",
    focus: "Co-operative Society Bye-Laws &bull; GDCA Formations &bull; Doorstep Leave & License",
  },
];

const getTeamPortrait = (name: string, role: string) => {
  if (name.includes("Rajesh") || role.includes("Practice Head")) {
    return "/images/hero-1.png";
  }
  if (name.includes("Academic") || role.includes("Educational")) {
    return "/brand/statutory-guidance-full.jpg";
  }
  return "/images/posh-compliance-desk.jpg";
};

export default function AboutPage() {
  const [pageData, setPageData] = useState(platformStore.getPageContent("about"));
  const teamMembers = useRealtimeTeam();
  const siteConfig = useRealtimeSiteConfig();

  useEffect(() => {
    setPageData(platformStore.getPageContent("about"));
  }, []);

  const valuesToDisplay = VALUES_GRID.map((val) => {
    const matchedPrin = (siteConfig.principles || []).find(
      (p) => p.title.toLowerCase() === val.title.toLowerCase()
    );
    if (matchedPrin) {
      return {
        title: matchedPrin.title,
        desc: matchedPrin.desc || matchedPrin.quote,
      };
    }
    return val;
  });

  return (
    <div className="bg-ivory-50 text-ink">
      
      {/* Page Header */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 border-b border-border bg-ivory-50 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6">
          <Eyebrow>WELCOME TO ACORN CONSULTANTS</Eyebrow>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink-950 leading-[1.05] max-w-4xl">
            Over 15 years of expertise in Educational, Tax &amp; Legal Services.
          </h1>
          <p className="font-sans text-lg sm:text-xl text-ink-secondary max-w-3xl leading-relaxed">
            Our job starts with you: understanding what you need, so we can offer you options that suits you the best. Making sure you get the representation you deserve.
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
                  src="/images/hero.jpg"
                  aspect="portrait"
                  label="Chambers Archive & Library"
                  sublabel="Acorn Consultants"
                  glow
                />
              </div>
            </div>

            {/* Right 7 Cols: Long-Form Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <Eyebrow>ABOUT US</Eyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ink-950 leading-[1.12]">
                Work done well, with a <span className="font-serif italic font-normal text-brass-700">personal</span> touch.
              </h2>
              <div className="space-y-4 font-sans text-base text-ink-secondary leading-relaxed">
                <p>
                  We’re dedicated to ensuring that we take care of all of our clients, and that their needs are met and exceeded. We offer high-quality work and personal client service. We’re committed to providing you with top notch Educational, Tax &amp; legal support.
                </p>
                <p>
                  We serve a wide range of clients, and value every client relationship greatly. Each engagement benefits from the depth and breadth of our expertise. We approach every client with a focus on integrity, advocacy, and understanding. Let us make a law system workable for us..!
                </p>
                <p className="font-semibold text-ink-950">
                  Work done well, with a personal touch. That’s our commitment! No issue is too big or too small. If you have a legal problem, our experts can help you find a SOLUTION.
                </p>
              </div>

              {/* Assistance Box */}
              <div className="p-5 rounded-card bg-stone-100 border border-border space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brass-700 block">
                  Not sure what you need, or what it costs? We’re here to help.
                </span>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  Get in touch with us at{" "}
                  <a href="tel:+918286936899" className="font-semibold text-navy-700 hover:text-brass-700 hover:underline">
                    +91 8286936899
                  </a>{" "}
                  or email us:{" "}
                  <a href="mailto:acornconsultant2014@gmail.com" className="font-semibold text-navy-700 hover:text-brass-700 hover:underline">
                    acornconsultant2014@gmail.com
                  </a>
                </p>
                <p className="text-xs text-ink-muted pt-1 border-t border-border/60">
                  Advocate on Panel: <span className="font-semibold text-ink-950">Mr. Rajesh Telge</span> (
                  <a href="tel:+918369171822" className="text-navy-700 hover:underline">
                    +91 8369171822
                  </a>
                  )
                </p>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Button variant="primary" href="/services" arrow>
                  Explore All 37 Services
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
            Let us make a law system workable for us..! Work done well, with a personal touch. That’s our commitment! No issue is too big or too small. If you have a legal problem, our experts can help you find a SOLUTION.
          </p>

          <div className="pt-4 flex flex-col items-center">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brass-300">
              The Acorn Consultants Commitment
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
            {valuesToDisplay.map((val, idx) => (
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
            {teamMembers.map((member, index) => (
              <div key={member.id || index} className="space-y-5 bg-white p-5 rounded-2xl border border-border shadow-card flex flex-col justify-between hover:border-brass-400 transition-all">
                <div className="space-y-5">
                  {/* Arch-shaped portrait with real counsel photography */}
                  <div className="w-full h-[360px] arch-mask relative overflow-hidden border border-brass-500/30 shadow-sm bg-navy-950 group">
                    <Image
                      src={getTeamPortrait(member.name, member.role)}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/25 to-transparent" />

                    {/* Floating Bottom Card */}
                    <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-ink-950/95 border border-brass-500/35 text-white space-y-1 shadow-lg">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-brass-300 font-semibold tracking-wider uppercase text-[10px]">
                          Practice Lead
                        </span>
                        <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified Counsel
                        </span>
                      </div>
                      <div className="font-serif font-bold text-lg text-white">
                        {member.name}
                      </div>
                      <div className="text-[11px] text-slate-300 truncate">
                        {member.role}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-ink-950">
                      {member.title}
                    </h3>
                    {member.bio && (
                      <p className="font-sans text-xs text-ink-secondary leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                    <div
                      className="font-sans text-xs text-brass-700 font-medium leading-relaxed pt-1"
                      dangerouslySetInnerHTML={{ __html: member.focus }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                  {member.name.includes("Rajesh") ? (
                    <a
                      href="tel:+918369171822"
                      className="inline-flex items-center gap-1.5 font-bold text-navy-800 hover:text-brass-700 transition"
                    >
                      <Phone className="w-3.5 h-3.5 text-brass-600" />
                      <span>Call: +91 8369171822</span>
                    </a>
                  ) : (
                    <span className="text-ink-muted text-[11px]">Direct Chambers Review</span>
                  )}
                  <Link
                    href="/request-service"
                    className="font-semibold text-brass-700 hover:text-navy-900 inline-flex items-center gap-1 group"
                  >
                    <span>Consult Counsel</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
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
