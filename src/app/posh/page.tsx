"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Landmark,
  Users,
  FileText,
  KeyRound,
  CheckCircle2,
  Building,
  ArrowRight,
  Download,
  Eye,
  HelpCircle,
  Clock,
  Shield,
  Phone,
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";
import {
  Button,
  Eyebrow,
  SectionHeading,
  Accordion,
  Rule,
  Card,
  Input,
  Select,
  Checkbox,
} from "@/components/ui";

const TIMELINE_STEPS = [
  {
    step: "01",
    name: "Confidential First Step",
    desc: "Reach out and share what happened in complete privacy. You can talk to us informally first—no pressure, no judgment, and no premature paperwork.",
  },
  {
    step: "02",
    name: "Immediate Safety & Comfort",
    desc: "We ensure you feel safe right away. Whether it is a temporary desk shift, team reassignment, or supportive leave without loss of pay, your well-being comes first.",
  },
  {
    step: "03",
    name: "Respectful, Neutral Dialogue",
    desc: "Both sides are heard with patience and fairness. We ensure honest communication, unbiased questions, and strict adherence to natural justice for everyone involved.",
  },
  {
    step: "04",
    name: "Constructive Findings & Remedies",
    desc: "Clear, transparent recommendations to resolve the issue, address misconduct, and restore mutual dignity and psychological safety across the workplace.",
  },
  {
    step: "05",
    name: "Action with Accountability",
    desc: "We guide leadership to implement real changes—preventing retaliation, restoring a healthy atmosphere, and supporting everyone's career progression.",
  },
  {
    step: "06",
    name: "Ongoing Well-Being & Peace",
    desc: "Matters are confidentially archived with ongoing check-ins so everyone feels secure, respected, and empowered moving forward.",
  },
];

const ACORN_OFFERINGS = [
  {
    title: "Support for Women in the Workplace",
    desc: "Compassionate, confidential listening, immediate workplace safeguards, and firm guidance to stop harassment and protect your career.",
  },
  {
    title: "Support for Men & Unfair Accusations",
    desc: "Fair, objective legal counsel for male employees facing workplace distress, harassment, or wrongful allegations, protecting your reputation and career.",
  },
  {
    title: "Independent External Grievance Members",
    desc: "Experienced senior advocates serving as neutral external members to ensure every inquiry is transparent, empathetic, and free from office politics.",
  },
  {
    title: "Human-Centered Workplace Policies",
    desc: "Clear, understandable anti-harassment policies and codes of conduct written in plain English so all employees know their rights and responsibilities.",
  },
  {
    title: "Interactive Respect & Dignity Workshops",
    desc: "Engaging, practical sessions for employees and leadership to build mutual respect, healthy boundaries, and a culture of psychological safety.",
  },
  {
    title: "Smooth Annual Compliance & Governance",
    desc: "Stress-free management of annual filings and documentation so employers stay compliant while focusing on their people.",
  },
];

const POSH_FAQS = [
  {
    id: "pfaq-1",
    title: "Do you help both male and female employees facing workplace issues?",
    content:
      "Yes, absolutely. While the statutory POSH Act has specific legal frameworks, at Acorn we believe dignity belongs to every person. We help female employees seeking protection from harassment, and we also actively support male employees facing toxic workplace behavior, distress, or wrongful or false allegations. Whatever your gender, our team will stand by you and guide you in every aspect.",
  },
  {
    id: "pfaq-2",
    title: "What if I am facing false or exaggerated allegations at work?",
    content:
      "Facing an unfair or false complaint can be devastating to your career and peace of mind. We provide objective, calm legal guidance to help you articulate the true facts, gather relevant correspondence and evidence, submit a measured response, and ensure that the committee adheres strictly to fairness and natural justice without presumption of guilt.",
  },
  {
    id: "pfaq-3",
    title: "Will my employer or colleagues find out if I reach out to you?",
    content:
      "Never. Any consultation with Acorn is held in the strictest confidence under advocate-client privilege. Your employer, colleagues, and management will never know you reached out unless you explicitly authorize us to represent you in formal correspondence.",
  },
  {
    id: "pfaq-4",
    title: "What makes Acorn's External Committee Members different?",
    content:
      "Our advocates bring deep legal expertise combined with genuine human empathy. We do not act like cold judges or rubber-stamp management decisions. We ensure that every complainant is treated with sensitivity, every respondent receives a fair chance to be heard, and every inquiry reaches an honest, balanced resolution.",
  },
  {
    id: "pfaq-5",
    title: "Can we resolve a misunderstanding without an aggressive formal inquiry?",
    content:
      "Yes. If the concerned person prefers, we can facilitate structured, respectful conciliation or mediation to address the grievance, establish clear professional boundaries, and restore harmony without drawn-out adversarial hearings.",
  },
];

export default function PoshPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [empCount, setEmpCount] = useState("25-100");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-ivory-50 text-ink min-h-screen">
      
      {/* Calm Hero: Ivory & Soft Blue-100 surfaces with High-Res External Member Arch Image */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 border-b border-border bg-gradient-to-b from-blue-100/40 via-ivory-50 to-ivory-50">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <Eyebrow>COMPASSIONATE &amp; CONFIDENTIAL WORKPLACE SUPPORT</Eyebrow>

              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink-950 leading-[1.05] max-w-4xl">
                Safe, respectful workplaces <span className="font-serif italic font-normal text-brass-700">for everyone.</span>
              </h1>

              <p className="font-sans text-lg sm:text-xl text-ink-secondary max-w-2xl leading-relaxed">
                Facing workplace harassment or unfair accusations can feel overwhelming and isolating. Whether you are a female or male employee seeking guidance, protection, or a fair hearing, or an employer building a culture of mutual respect—our team will stand by you and help you through every aspect with complete privacy.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button
                  variant="primary"
                  size="md"
                  href="/request-service?service=POSH%20Compliance"
                  arrow
                >
                  Get confidential support
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  href="/posh/start"
                  arrow
                >
                  Report a concern privately
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  href="/posh/options"
                  arrow
                >
                  17 Statutory Remedies
                </Button>
              </div>

              <div className="pt-6 border-t border-border/80 flex items-center gap-2 text-xs text-ink-secondary">
                <Shield className="w-4 h-4 text-brass-500" />
                <span>100% Confidential Support &bull; Inclusive Care for Women &amp; Men &bull; Experienced Counsel</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[1856/2304] rounded-2xl overflow-hidden shadow-2xl border border-brass-500/30 bg-navy-950 group">
                <Image
                  src="/images/posh.png"
                  alt="POSH Compliance Desk - External Member Consultation at Chambers"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-0 rounded-2xl border border-brass-500/20 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 1. Why Support Matters (Human Care for Everyone) */}
      <section className="py-20 sm:py-28 border-b border-border bg-ivory-50">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-12">
          <SectionHeading
            eyebrow="SUPPORT FOR EVERYONE"
            title="Standing by You in Every Aspect"
            accentWord="Aspect"
            description="Workplace dignity belongs to every person. We provide balanced, empathetic guidance tailored to your specific situation."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-card border border-border shadow-card space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-navy-700">
                <ShieldCheck className="w-5 h-5 text-navy-700" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-ink">Support for Women</h3>
              <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                A safe, compassionate space where you are heard and believed. We ensure immediate workplace protections, confidential advice, and firm legal advocacy so you never face harassment alone.
              </p>
            </div>

            <div className="p-8 bg-white rounded-card border border-border shadow-card space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-navy-700">
                <Users className="w-5 h-5 text-navy-700" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-ink">Support for Men &amp; Accused Staff</h3>
              <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                Objective, fair legal protection against wrongful allegations or hostile work environments. We ensure your side of the story is articulated clearly and natural justice is strictly respected.
              </p>
            </div>

            <div className="p-8 bg-white rounded-card border border-border shadow-card space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-navy-700">
                <Landmark className="w-5 h-5 text-navy-700" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-ink">Healthy Workplace Culture</h3>
              <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                Helping organizations build genuine trust, respectful everyday behavior, and neutral grievance committees so all employees feel valued, safe, and productive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What Acorn Offers (Icon List) */}
      <section className="py-20 sm:py-28 border-b border-border bg-stone-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-12">
          <SectionHeading
            eyebrow="OUR SUPPORT &amp; SERVICES"
            title="How We Help You Resolve Issues"
            accentWord="Issues"
            description="Practical, compassionate assistance tailored for individuals, leadership teams, colleges, and workplaces across India."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACORN_OFFERINGS.map((item, idx) => (
              <div key={idx} className="p-6 bg-white rounded-card border border-border shadow-sm space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-brass-700">
                  Service 0{idx + 1}
                </span>
                <h4 className="font-serif text-xl font-bold text-ink">{item.title}</h4>
                <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How the Platform Works (Six Steps Vertical Timeline) */}
      <section className="py-20 sm:py-28 border-b border-border bg-ivory-50">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6 space-y-12">
          <SectionHeading
            align="center"
            eyebrow="A CALM, RESPECTFUL PATHWAY"
            title="Six Steps to Fair &amp; Lasting Resolution"
            accentWord="Resolution"
            description="We guide you through a calm, transparent process where everyone is treated with dignity, fairness, and care."
          />

          <div className="space-y-6">
            {TIMELINE_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-6 sm:p-8 bg-white rounded-card border border-border flex items-start gap-6 shadow-sm hover:border-brass-500/40 transition"
              >
                <span className="font-serif text-3xl sm:text-4xl font-bold text-brass-700 shrink-0">
                  {step.step}
                </span>
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl font-bold text-ink">{step.name}</h4>
                  <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Who It Is For */}
      <section className="py-20 sm:py-28 border-b border-border bg-stone-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-12">
          <SectionHeading
            eyebrow="WHO WE HELP"
            title="Trusted Guidance for Individuals &amp; Teams"
            accentWord="Teams"
            description="We support working professionals, managers, educational campuses, and corporate teams across Kolkata and pan-India."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Individual Professionals", desc: "Confidential guidance for women and men facing harassment, discrimination, or false complaints." },
              { title: "Corporate Enterprises", desc: "Independent grievance committees, fair inquiry handling, and respectful team training." },
              { title: "Educational Campuses", desc: "Protecting students, faculty, and research scholars with supportive, trauma-informed care." },
              { title: "Growing Startups", desc: "Building a foundation of trust, clear boundaries, and healthy team culture from day one." },
            ].map((box, i) => (
              <div key={i} className="p-6 bg-white rounded-card border border-border space-y-2">
                <CheckCircle2 className="w-5 h-5 text-brass-500" />
                <h4 className="font-serif text-xl font-bold text-ink">{box.title}</h4>
                <p className="font-sans text-xs text-ink-secondary leading-relaxed">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Confidentiality & Trust */}
      <section className="py-20 sm:py-28 border-b border-border bg-ivory-50">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-12 bg-blue-100/50 rounded-card border border-blue-100 space-y-6">
            <div className="flex items-center gap-3">
              <KeyRound className="w-6 h-6 text-navy-700" />
              <Eyebrow>YOUR PRIVACY IS SACRED</Eyebrow>
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-ink-950">
              Complete Discretion &amp; Confidential Protection
            </h3>

            <p className="font-sans text-base text-ink leading-relaxed">
              We treat every conversation and concern with the highest standard of privacy. Whether you are reaching out to report a painful incident or seeking advice against an allegation, your identity, documents, and discussions are kept strictly confidential. Nothing is ever made public or discussed with unauthorized peers. You can speak freely knowing you are fully protected.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-navy-700">
              <CheckCircle2 className="w-4 h-4 text-status-success" />
              <span>Full confidentiality protection &bull; Safe, encrypted case management</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-20 sm:py-28 border-b border-border bg-stone-100">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6 space-y-8">
          <SectionHeading
            eyebrow="CLARIFICATIONS"
            title="Frequently Asked Questions on POSH"
            accentWord="Questions"
            description="Procedural clarity on committee constitution, external member appointments, and statutory timelines."
          />

          <Accordion items={POSH_FAQS} defaultOpenId="pfaq-1" />
        </div>
      </section>

      {/* 7. Short Consultation Form */}
      <section className="py-20 sm:py-28 border-b border-border bg-ivory-50">
        <div className="max-w-[780px] mx-auto px-4 sm:px-6 space-y-8">
          <SectionHeading
            align="center"
            eyebrow="COMMENCE COMPLIANCE"
            title="Book a POSH Advisory Consultation"
            accentWord="Advisory"
            description="Discuss committee constitution, policy review, or External Member appointment with our senior counsel."
          />

          {formSubmitted ? (
            <div className="p-8 bg-white rounded-card border border-border shadow-card text-center space-y-4 animate-fade-up">
              <div className="w-12 h-12 rounded-full bg-status-success-bg border border-status-success/30 flex items-center justify-center text-status-success mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-ink">
                Consultation Brief Received
              </h3>
              <p className="font-sans text-sm text-ink-secondary max-w-md mx-auto">
                Thank you, {contactName || "Counsel"}. Our POSH practice desk has received your request on behalf of {orgName || "your organisation"}. We will contact you within one business day.
              </p>
              <div className="text-xs font-mono text-brass-700">
                Reference ID: POSH-{Math.floor(100000 + Math.random() * 900000)}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-10 rounded-card border border-border shadow-card space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Name of Organisation / Institution"
                  placeholder="e.g. Apex Engineering Ltd."
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  required
                />
                <Input
                  label="Contact Person &amp; Designation"
                  placeholder="e.g. Priyadarshini Sen, Head HR"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Official Email Address"
                  type="email"
                  placeholder="hr@organisation.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Select
                  label="Total Employee Count"
                  value={empCount}
                  onChange={(e) => setEmpCount(e.target.value)}
                  options={[
                    { value: "under-10", label: "Fewer than 10 (Local Committee advisory)" },
                    { value: "10-50", label: "10 – 50 Employees" },
                    { value: "50-250", label: "50 – 250 Employees" },
                    { value: "250+", label: "250+ Employees (Multi-unit)" },
                  ]}
                />
              </div>

              <Checkbox
                label="I acknowledge that this enquiry is for informational purposes and that counsel will verify conflict prior to formal IC appointment."
                required
              />

              <Button variant="primary" type="submit" arrow className="w-full">
                Submit Consultation Request
              </Button>
            </form>
          )}

          {/* Mandatory General Information Note */}
          <div className="text-center font-sans text-xs text-ink-muted leading-relaxed">
            Note: This page is general information, not legal advice. Formal advocate-client representation begins only upon execution of an Engagement Letter.
          </div>
        </div>
      </section>

    </div>
  );
}
