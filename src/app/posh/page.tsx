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
    name: "File",
    desc: "Confidential digital submission with optional pseudonymization and encrypted document deposit under Section 9.",
  },
  {
    step: "02",
    name: "Acknowledge",
    desc: "Formal statutory notice generated and served to respondent within 7 working days with clear opportunity to reply.",
  },
  {
    step: "03",
    name: "Inquire",
    desc: "Trauma-informed proceedings conducted adhering strictly to principles of natural justice and Section 12 interim relief review.",
  },
  {
    step: "04",
    name: "Report",
    desc: "Comprehensive reasoned findings and recommendations delivered to the employer within 10 days of inquiry conclusion.",
  },
  {
    step: "05",
    name: "Act",
    desc: "Employer implementation of Internal Committee directives and corrective measures within statutory 60-day window.",
  },
  {
    step: "06",
    name: "Close",
    desc: "Confidential archival in compliance with Section 16 non-disclosure mandates and Section 21 Annual Report recording.",
  },
];

const ACORN_OFFERINGS = [
  {
    title: "Statutory Policy Drafting",
    desc: "Bilingual workplace prevention policies aligned with POSH Act 2013 and specific employer service regulations.",
  },
  {
    title: "Internal Committee Constitution",
    desc: "Structuring compliant IC orders ensuring proper gender parity, presiding officer criteria, and external expertise.",
  },
  {
    title: "External Member Appointment",
    desc: "Acorn senior advocates serving as independent External Members under Section 4(2)(c) to guarantee inquiry neutrality.",
  },
  {
    title: "IC Member Capacity Building",
    desc: "Practical workshops covering natural justice principles, evidentiary standards, cross-examination rules, and report drafting.",
  },
  {
    title: "Workplace Sensitization",
    desc: "Structured employee and management orientation sessions to cultivate a climate of dignity, respect, and compliance.",
  },
  {
    title: "Section 21 Annual Filings",
    desc: "Compilation and submission of statutory Annual Compliance Reports to the District Officer / District Magistrate.",
  },
];

const POSH_FAQS = [
  {
    id: "pfaq-1",
    title: "Which organisations are mandated to constitute an Internal Committee?",
    content:
      "Every workplace employing 10 or more employees—across branches, offices, factories, or educational establishments—must constitute an Internal Committee (IC) under Section 4 of the POSH Act 2013. Failure to do so invites statutory fines and license cancellation.",
  },
  {
    id: "pfaq-2",
    title: "What is the statutory role of the External Member under Section 4(2)(c)?",
    content:
      "The Act mandates the appointment of at least one member from an NGO or association committed to women's causes, or a person familiar with sexual harassment issues (such as a legal practitioner). The External Member ensures independence, procedural fairness, and adherence to natural justice.",
  },
  {
    id: "pfaq-3",
    title: "What is the penalty for non-compliance with the POSH Act?",
    content:
      "Under Section 26, failure to constitute an IC or contravention of provisions attracts a fine of up to INR 50,000 for the first offense. Repeated violations can result in double penalties and cancellation or non-renewal of business licenses.",
  },
  {
    id: "pfaq-4",
    title: "How does Section 16 protect confidentiality during inquiries?",
    content:
      "Section 16 strictly prohibits the publication or disclosure of the identity of the complainant, respondent, witnesses, or inquiry proceedings to the public or press, subject to statutory penalties under Section 17.",
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
              <Eyebrow>POSH ACT 2013 COMPLIANCE &amp; ADVISORY</Eyebrow>

              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink-950 leading-[1.05] max-w-4xl">
                Safe, <span className="font-serif italic font-normal text-brass-700">compliant</span> workplaces.
              </h1>

              <p className="font-sans text-lg sm:text-xl text-ink-secondary max-w-2xl leading-relaxed">
                Thoughtful, legally sound guidance for organisations and institutions navigating the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act 2013.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button
                  variant="primary"
                  size="md"
                  href="/request-service?service=POSH%20Compliance"
                  arrow
                >
                  Book a POSH consultation
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  href="/posh/start"
                  arrow
                >
                  Report a concern
                </Button>
              </div>

              <div className="pt-6 border-t border-border/80 flex items-center gap-2 text-xs text-ink-secondary">
                <Shield className="w-4 h-4 text-brass-500" />
                <span>Strict Section 16 statutory confidentiality &bull; Independent External Member practice</span>
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

      {/* 1. Why Compliance Matters */}
      <section className="py-20 sm:py-28 border-b border-border bg-ivory-50">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-12">
          <SectionHeading
            eyebrow="STATUTORY MANDATE"
            title="Why Institutional Compliance Matters"
            accentWord="Compliance"
            description="POSH Act adherence is not merely an administrative exercise. It represents a strict fiduciary responsibility for boards, trustees, and management."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-card border border-border shadow-card space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-navy-700">
                <Landmark className="w-5 h-5 text-navy-700" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-ink">Statutory Liability</h3>
              <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                Section 26 prescribes stringent monetary fines and potential business license revocation for employers failing to constitute an Internal Committee.
              </p>
            </div>

            <div className="p-8 bg-white rounded-card border border-border shadow-card space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-navy-700">
                <ShieldCheck className="w-5 h-5 text-navy-700" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-ink">Natural Justice Defense</h3>
              <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                Appellate tribunals routinely strike down flawed inquiries that bypass cross-examination rules or lack independent external supervision.
              </p>
            </div>

            <div className="p-8 bg-white rounded-card border border-border shadow-card space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-navy-700">
                <Users className="w-5 h-5 text-navy-700" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-ink">Workplace Dignity</h3>
              <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                A culture of statutory compliance fosters talent retention, psychological safety, and clear boundaries of professional conduct.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What Acorn Offers (Icon List) */}
      <section className="py-20 sm:py-28 border-b border-border bg-stone-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-12">
          <SectionHeading
            eyebrow="OUR CAPABILITIES"
            title="Comprehensive POSH Advisory Solutions"
            accentWord="Advisory"
            description="End-to-end statutory support tailored for corporate offices, educational campuses, hospitals, and multinational entities."
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
            eyebrow="INQUIRY WORKFLOW"
            title="The Six-Step Statutory Resolution Lifecycle"
            accentWord="Resolution"
            description="Every matter advances through structured milestones mandated by the POSH Act 2013 and judicial benchmarks."
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
            eyebrow="INSTITUTIONAL SCOPE"
            title="Who We Advise"
            accentWord="Advise"
            description="We serve as independent statutory counsel across varied workplace environments in Kolkata and nationwide."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Corporate Enterprises", desc: "Multi-locational offices, IT/ITES firms, and manufacturing facilities with 50+ staff." },
              { title: "Educational Institutions", desc: "Universities, colleges, and schools requiring child and staff protection mechanisms." },
              { title: "Healthcare Systems", desc: "Hospitals, diagnostic clinics, and medical trusts operating continuous shift work." },
              { title: "Startups & Emerging Firms", desc: "Growth-stage companies crossing the statutory 10-employee threshold." },
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
              <Eyebrow>STATUTORY CONFIDENTIALITY ASSURANCE</Eyebrow>
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-ink-950">
              Strict Non-Disclosure Under Section 16
            </h3>

            <p className="font-sans text-base text-ink leading-relaxed">
              Section 16 of the POSH Act strictly prohibits the publication, dissemination, or public disclosure of the contents of complaints, the identity and address of aggrieved women, respondents, or witnesses, and any inquiry findings. Acorn maintains an encrypted case environment with strict role-based access.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-navy-700">
              <CheckCircle2 className="w-4 h-4 text-status-success" />
              <span>Full compliance with Section 16 &amp; Section 17 penalty protections</span>
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
