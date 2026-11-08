"use client";

import React, { useState } from "react";
import {
  Button,
  Eyebrow,
  SectionHeading,
  EditorialLink,
  Rule,
  ArchImage,
  Card,
  Input,
  Textarea,
  Select,
  Checkbox,
  Accordion,
  Badge,
  Stepper,
  Reveal,
  CountUp,
  Toast,
} from "@/components/ui";
import {
  Shield,
  CheckCircle,
  FileText,
  ShieldCheck,
  ArrowRight,
  Info,
  Compass,
} from "lucide-react";

// Contrast calculation based on WCAG 2.1 relative luminance
function getLuminance(hex: string): number {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

const COLOR_TOKENS = [
  { name: "--ink-950", hex: "#07101F", desc: "Deepest navy (hero, footer background)" },
  { name: "--navy-900", hex: "#0E1F3D", desc: "Dark panel surface, elevated navy" },
  { name: "--navy-800", hex: "#14264A", desc: "Brand deep navy, secondary dark" },
  { name: "--navy-700", hex: "#1F3864", desc: "Brand primary navy (buttons, headings)" },
  { name: "--blue-600", hex: "#2F5496", desc: "Interactive hover and text links" },
  { name: "--blue-100", hex: "#E4ECF8", desc: "Soft blue surface for POSH & notices" },
  { name: "--ivory-50", hex: "#FBF9F4", desc: "Default page background (warm ivory)" },
  { name: "--stone-100", hex: "#F1EEE7", desc: "Alternate section rhythm background" },
  { name: "--white", hex: "#FFFFFF", desc: "Card surfaces and modal containers" },
  { name: "--brass-300", hex: "#D9C29A", desc: "Light brass accent on dark surfaces" },
  { name: "--brass-500", hex: "#B08D57", desc: "Brand gold, rules, icons, accents" },
  { name: "--brass-700", hex: "#8A6B3A", desc: "High-contrast brass text on ivory" },
  { name: "--text", hex: "#1B1F27", desc: "Primary high-legibility body text" },
  { name: "--text-muted", hex: "#5B6573", desc: "Secondary guidance and metadata text" },
  { name: "--border", hex: "#D5DAE3", desc: "Refined 1px architectural divider" },
];

const CONTRAST_PAIRS = [
  { fg: "#07101F", fgName: "ink-950", bg: "#FBF9F4", bgName: "ivory-50", context: "Main body text on page" },
  { fg: "#1F3864", fgName: "navy-700", bg: "#FBF9F4", bgName: "ivory-50", context: "Headings on ivory background" },
  { fg: "#8A6B3A", fgName: "brass-700", bg: "#FBF9F4", bgName: "ivory-50", context: "Eyebrow & accent text on ivory" },
  { fg: "#FBF9F4", fgName: "ivory-50", bg: "#1F3864", bgName: "navy-700", context: "Primary button text" },
  { fg: "#07101F", fgName: "ink-950", bg: "#B08D57", bgName: "brass-500", context: "Dark section primary button" },
  { fg: "#D9C29A", fgName: "brass-300", bg: "#07101F", bgName: "ink-950", context: "Brass accent text on dark hero" },
  { fg: "#FFFFFF", fgName: "white", bg: "#07101F", bgName: "ink-950", context: "Headings on dark hero & footer" },
  { fg: "#1F3864", fgName: "navy-700", bg: "#E4ECF8", bgName: "blue-100", context: "POSH chip & banner text" },
  { fg: "#1B1F27", fgName: "text (ink)", bg: "#FFFFFF", bgName: "white", context: "Card body text" },
  { fg: "#5B6573", fgName: "text-muted", bg: "#FFFFFF", bgName: "white", context: "Card secondary text" },
];

export default function DesignSystemPage() {
  const [activeStep, setActiveStep] = useState(2);
  const [formInput, setFormInput] = useState("");

  const sampleAccordionItems = [
    {
      id: "item-1",
      title: "What defines the 'Quiet Authority' concept?",
      content:
        "Quiet Authority combines Victorian courthouse arch geometry with warm ivory tones, deep architectural navy, brass accents, and Cormorant Garamond typography. It reflects 15 years of luxury brand and senior legal practice restraint.",
    },
    {
      id: "item-2",
      title: "How do motion rules ensure an unhurried, calm experience?",
      content:
        "All animations execute only once (no repeating loops, no infinite marquees, no pop-ups). Animations are short (200-450ms) using only opacity and transform, respecting prefers-reduced-motion instantly.",
    },
    {
      id: "item-3",
      title: "What are the Bar Council advertising compliance constraints?",
      content:
        "As mandated by Bar Council of India regulations, the site strictly bans testimonials, client results, rankings, 'best lawyer' claims, guarantees, and invented numbers. Principle statements and plain facts replace promotional bravado.",
    },
  ];

  return (
    <div className="bg-ivory-50 min-h-screen py-16 sm:py-24">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-20">
        
        {/* Page Header */}
        <div className="space-y-4">
          <Eyebrow>ACORN LEGAL CONSULTANTS</Eyebrow>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-ink-950 leading-[1.08]">
            Quiet Authority <span className="font-serif italic font-normal text-brass-700">Design System</span>
          </h1>
          <p className="font-sans text-lg text-ink-secondary max-w-3xl leading-relaxed">
            The comprehensive visual token architecture, typographic scale, and UI primitive inventory
            for Acorn Legal Consultants. Every component is crafted for restraint, luxury, and statutory compliance.
          </p>
          <Rule />
        </div>

        {/* 1. Color Tokens */}
        <section className="space-y-8">
          <SectionHeading
            eyebrow="Tokens"
            title="Colour Palette & Semantic Variables"
            accentWord="Variables"
            description="Warm ivory surfaces, deep architectural navies, and hand-rubbed brass accents. Never neon, never generic template blue."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {COLOR_TOKENS.map((token) => (
              <div
                key={token.name}
                className="bg-white rounded-card border border-border p-4 shadow-card space-y-3"
              >
                <div
                  className="h-16 w-full rounded-btn border border-black/5 shadow-inner"
                  style={{ backgroundColor: token.hex }}
                />
                <div>
                  <div className="font-sans font-semibold text-xs text-ink">{token.name}</div>
                  <div className="font-mono text-xs text-brass-700 uppercase">{token.hex}</div>
                  <div className="font-sans text-[11px] text-ink-muted mt-1 leading-snug">{token.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Automated Contrast Verification Report */}
        <section className="space-y-8">
          <SectionHeading
            eyebrow="Accessibility"
            title="WCAG 2.1 AA Contrast Verification Table"
            accentWord="Verification"
            description="Calculated live with standard relative luminance formulas. All core token pairings must exceed the 4.5:1 ratio for regular text and 3.0:1 for large display."
          />

          <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-sm">
                <thead className="bg-surface border-b border-border text-xs uppercase tracking-wider text-ink-secondary">
                  <tr>
                    <th className="py-3 px-4">Foreground Token</th>
                    <th className="py-3 px-4">Background Token</th>
                    <th className="py-3 px-4">Visual Preview</th>
                    <th className="py-3 px-4">Calculated Ratio</th>
                    <th className="py-3 px-4">WCAG 2.1 AA Result</th>
                    <th className="py-3 px-4">Usage Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-xs">
                  {CONTRAST_PAIRS.map((pair, index) => {
                    const ratio = getContrastRatio(pair.fg, pair.bg);
                    const passesNormal = ratio >= 4.5;
                    const passesLarge = ratio >= 3.0;

                    return (
                      <tr key={index} className="hover:bg-ivory-50/50 transition">
                        <td className="py-3 px-4 font-mono font-medium text-ink">
                          {pair.fgName} <span className="text-ink-muted">({pair.fg})</span>
                        </td>
                        <td className="py-3 px-4 font-mono font-medium text-ink">
                          {pair.bgName} <span className="text-ink-muted">({pair.bg})</span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className="inline-block px-3 py-1.5 rounded-btn text-xs font-medium border"
                            style={{
                              color: pair.fg,
                              backgroundColor: pair.bg,
                              borderColor: pair.bg === "#FFFFFF" ? "#D5DAE3" : "transparent",
                            }}
                          >
                            Sample Text
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-ink">
                          {ratio.toFixed(2)} : 1
                        </td>
                        <td className="py-3 px-4">
                          {passesNormal ? (
                            <Badge variant="success" size="sm">
                              PASS (AA Normal)
                            </Badge>
                          ) : passesLarge ? (
                            <Badge variant="brass" size="sm">
                              PASS (AA Large / UI)
                            </Badge>
                          ) : (
                            <Badge variant="danger" size="sm">
                              FAIL
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-ink-secondary">{pair.context}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 3. Typography Scale */}
        <section className="space-y-8">
          <SectionHeading
            eyebrow="Typography"
            title="Editorial Typographic Scale"
            accentWord="Typographic"
            description="Self-hosted Cormorant Garamond and Inter with fluid clamp() scalers."
          />

          <div className="bg-white rounded-card border border-border p-6 sm:p-10 shadow-card space-y-8">
            <div className="border-b border-border pb-6 space-y-2">
              <span className="text-xs uppercase tracking-wider text-ink-muted">Display-XL (56px – 104px clamp)</span>
              <p className="font-serif text-5xl sm:text-7xl font-bold text-ink-950 leading-[1.02] tracking-tight">
                Excellence in Law. <span className="font-serif italic font-normal text-brass-700">Integrity</span> in Practice.
              </p>
            </div>

            <div className="border-b border-border pb-6 space-y-2">
              <span className="text-xs uppercase tracking-wider text-ink-muted">Display-L (44px – 72px clamp)</span>
              <p className="font-serif text-3xl sm:text-5xl font-bold text-ink-950 leading-[1.08]">
                Where Legal Expertise Meets <span className="font-serif italic font-normal text-brass-700">Strategic</span> Excellence.
              </p>
            </div>

            <div className="border-b border-border pb-6 space-y-2">
              <span className="text-xs uppercase tracking-wider text-ink-muted">Heading 2 (34px – 52px clamp)</span>
              <p className="font-serif text-2xl sm:text-4xl font-bold text-ink-950">
                A Principled Foundation for <span className="font-serif italic font-normal text-brass-700">Institutional</span> Trust.
              </p>
            </div>

            <div className="border-b border-border pb-6 space-y-2">
              <span className="text-xs uppercase tracking-wider text-ink-muted">Eyebrow Label (Inter 600, 12px, 0.16em tracking)</span>
              <Eyebrow>ACORN LEGAL CONSULTANTS</Eyebrow>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-ink-muted">Body Text (Inter 17px, 1.65 line-height, 62-70ch measure)</span>
              <p className="font-sans text-[17px] text-ink leading-[1.65] max-w-[68ch]">
                Acorn Legal Consultants provides specialized counsel in corporate governance, commercial agreements, dispute resolution, and workplace POSH Act compliance. Our chambers in Kolkata advise with absolute discretion, rigorous diligence, and uncompromised professional integrity.
              </p>
            </div>
          </div>
        </section>

        {/* 4. UI Primitives */}
        <section className="space-y-8">
          <SectionHeading
            eyebrow="Components"
            title="Interactive Component Inventory"
            accentWord="Component"
            description="Button variants, cards with cursor spotlight, input controls, brass stepper, and architectural arch masks."
          />

          {/* Buttons */}
          <div className="bg-white rounded-card border border-border p-6 sm:p-8 shadow-card space-y-6">
            <h3 className="font-serif text-xl font-bold text-ink">Button Primitives (52px Height, 6px Radius, Sliding Arrow)</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" arrow>
                Request a Consultation
              </Button>
              <Button variant="secondary" arrow>
                Explore Practice Areas
              </Button>
              <Button variant="ghost">
                Download Charter (PDF)
              </Button>
              <Button variant="primary" loading>
                Submitting Matter
              </Button>
            </div>

            <div className="p-6 rounded-card bg-ink-950 text-white space-y-4">
              <span className="text-xs uppercase tracking-wider text-brass-300">Dark Section Button Variants</span>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="dark-primary" arrow>
                  Request Consultation
                </Button>
                <Button variant="dark-secondary" arrow>
                  Contact Chambers
                </Button>
              </div>
            </div>
          </div>

          {/* Cards & Arch Mask Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-ink">Spotlight Hover Card</h3>
              <Card arrowOnHover>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-navy-700">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-ink">Corporate Advisory</h4>
                  <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                    Strategic corporate structuring, board governance, statutory risk mitigation, and commercial compliance guidance.
                  </p>
                  <EditorialLink href="#practice-areas">View Service Details</EditorialLink>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-ink">Architectural Arch Image Frame</h3>
              <ArchImage
                src="/images/hero.jpg"
                aspect="standard"
                label="Chambers at Camac Street"
                sublabel="Park Street District, Kolkata"
                glow
              />
            </div>
          </div>

          {/* Form Controls */}
          <div className="bg-white rounded-card border border-border p-6 sm:p-8 shadow-card space-y-6">
            <h3 className="font-serif text-xl font-bold text-ink">Form Controls (52px Inputs, Calm Validation)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Full Name of Authorized Representative"
                placeholder="e.g. Ananya Sengupta"
                value={formInput}
                onChange={(e) => setFormInput(e.target.value)}
                required
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="counsel@organisation.com"
                helperText="We send official correspondence and conflict verification here."
                required
              />
              <Select
                label="Nature of Enquiry"
                options={[
                  { value: "corporate", label: "Corporate Advisory & Contracts" },
                  { value: "posh", label: "POSH Act 2013 Compliance & IC Appointment" },
                  { value: "dispute", label: "Commercial Dispute & Arbitration" },
                  { value: "general", label: "General Legal Advisory" },
                ]}
              />
              <Input
                label="Contact Number"
                placeholder="+91 98300 00000"
                error="Please provide a valid 10-digit mobile or telephone number"
              />
            </div>
            <Textarea
              label="Brief Description of Matter (Privileged)"
              placeholder="Outline the statutory provisions, key dates, or corporate scope involved..."
              charCount={{ current: 142, max: 1000 }}
            />
            <Checkbox
              label="I acknowledge that submitting this form does not establish an advocate-client relationship until formal engagement is executed."
              required
            />
          </div>

          {/* Stepper */}
          <div className="bg-white rounded-card border border-border p-6 sm:p-8 shadow-card space-y-6">
            <h3 className="font-serif text-xl font-bold text-ink">Multi-Step Progress Stepper</h3>
            <Stepper
              steps={[
                { number: 1, title: "About You", subtitle: "Identity & Role" },
                { number: 2, title: "Your Matter", subtitle: "Nature of Counsel" },
                { number: 3, title: "Review & Send", subtitle: "Privileged Intake" },
              ]}
              currentStep={activeStep}
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setActiveStep((s) => Math.max(1, s - 1))}
                disabled={activeStep === 1}
              >
                Previous Step
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setActiveStep((s) => Math.min(3, s + 1))}
                disabled={activeStep === 3}
              >
                Next Step
              </Button>
            </div>
          </div>

          {/* Accordion */}
          <div className="bg-white rounded-card border border-border p-6 sm:p-8 shadow-card space-y-6">
            <h3 className="font-serif text-xl font-bold text-ink">Accessible Animated Accordion</h3>
            <Accordion items={sampleAccordionItems} defaultOpenId="item-1" />
          </div>

          {/* Toast Notification Primitive */}
          <div className="bg-white rounded-card border border-border p-6 sm:p-8 shadow-card space-y-6">
            <h3 className="font-serif text-xl font-bold text-ink">Editorial Toast Notifications</h3>
            <p className="text-sm text-ink-secondary">
              Quiet Authority non-intrusive feedback toasts with 1px hairline brass border and status-aware icons.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Toast
                variant="success"
                title="Service Request Registered"
                description="Your matter intake has been logged under privileged reference ACN-SR-2026-00412."
              />
              <Toast
                variant="info"
                title="IC Committee Notice Dispatched"
                description="Statutory notice served to the Respondent pursuant to Section 9 of the POSH Act."
              />
            </div>
          </div>

          {/* Motion Helpers */}
          <div className="bg-stone-100 rounded-card border border-border p-6 sm:p-8 shadow-card space-y-6">
            <h3 className="font-serif text-xl font-bold text-ink">Motion Helpers (Degrades to Static on Reduced Motion)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="bg-white p-6 rounded-card border border-border">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-navy-700 block">
                  <CountUp end={100} suffix="%" />
                </span>
                <span className="text-xs uppercase tracking-wider text-ink-secondary mt-1 block">
                  Confidentiality Maintained
                </span>
              </div>
              <div className="bg-white p-6 rounded-card border border-border">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-brass-700 block">
                  <CountUp end={24} suffix="h" />
                </span>
                <span className="text-xs uppercase tracking-wider text-ink-secondary mt-1 block">
                  Response SLA
                </span>
              </div>
              <div className="bg-white p-6 rounded-card border border-border">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-navy-700 block">
                  <CountUp end={6} suffix=" Areas" />
                </span>
                <span className="text-xs uppercase tracking-wider text-ink-secondary mt-1 block">
                  Core Practice Focus
                </span>
              </div>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}
