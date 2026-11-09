"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Link as LinkIcon,
  Check,
  Send,
  HelpCircle,
} from "lucide-react";
import {
  Button,
  Eyebrow,
  SectionHeading,
  Accordion,
  Rule,
  Card,
  Input,
  Textarea,
  Select,
  Checkbox,
} from "@/components/ui";
import { platformStore } from "@/lib/store";
import { useRealtimeFaqs } from "@/lib/realtime";
import { FaqItem } from "@/lib/types";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "posh-ic-mandate",
    category: "POSH Compliance",
    question: "When is an employer legally required to constitute an Internal Committee (IC)?",
    answer:
      "Under Section 4(1) of the POSH Act 2013, every employer employing 10 or more employees (including permanent, contractual, ad-hoc, and interns) across any branch or administrative unit is statutorily required to constitute an Internal Committee. Failure to constitute an IC attracts penalties up to ₹50,000 under Section 26(1), with repeated non-compliance risking cancellation of corporate registration or operating licenses.",
  },
  {
    id: "posh-external-member",
    category: "POSH Compliance",
    question: "What are the legal qualifications for the External Member on the Internal Committee?",
    answer:
      "Section 4(2)(c) of the POSH Act requires the appointment of at least one member from an NGO or association committed to the cause of women, or a person familiar with issues relating to sexual harassment, such as an experienced advocate. The External Member ensures institutional neutrality, adheres strictly to principles of natural justice, and prevents management bias.",
  },
  {
    id: "commercial-contracts-arbitration",
    category: "Commercial Contracts",
    question: "How should cross-border or interstate dispute resolution clauses be drafted in commercial agreements?",
    answer:
      "Commercial agreements should explicitly specify: (1) Governing law (e.g., Laws of India), (2) Mode of resolution (e.g., Arbitration under the Arbitration and Conciliation Act 1996), (3) Seat and venue (e.g., Kolkata, West Bengal), and (4) Institutional administration rules. Clear seat designation avoids conflicting jurisdictional challenges before state High Courts.",
  },
  {
    id: "high-court-representation",
    category: "Dispute Resolution",
    question: "What is the procedure for seeking urgent interim relief before the Calcutta High Court?",
    answer:
      "Urgent interim relief (such as ad-interim injunctions or stay orders) is sought by filing a petition before the appropriate bench (Original or Appellate Side). Matters involving acute commercial urgency can be listed via urgent mentioning before the Hon'ble Court with advance notice served upon the caveator or opposing parties as per Calcutta High Court Rules.",
  },
  {
    id: "posh-90-days-timeline",
    category: "POSH Compliance",
    question: "What is the statutory limitation period for conducting an inquiry under the POSH Act?",
    answer:
      "Under Section 11(4) of the Act, an inquiry into a complaint must be completed within 90 days. Within 10 days of completing the inquiry, the committee must provide its findings report to the employer. The employer is then obligated under Section 13(4) to implement the recommendations within 60 days.",
  },
  {
    id: "corporate-fema-compliance",
    category: "Corporate Advisory",
    question: "What due diligence is required for FDI reporting and RBI compliances?",
    answer:
      "Foreign direct investment transactions require adherence to FEMA 1999 regulations, sectoral caps under the Consolidated FDI Policy, and timely reporting through the RBI Foreign Investment Reporting and Management System (FIRMS) portal, including FC-GPR and FC-TRS filings within strict statutory windows.",
  },
  {
    id: "chambers-conflict-protocol",
    category: "Chambers Practice",
    question: "How does Acorn Legal Consultants conduct conflict of interest verification?",
    answer:
      "Prior to accepting any formal brief or executing an engagement letter, chambers personnel conduct an exhaustive conflict check across active advisory clients, respondent parties, and affiliated corporate groups to preserve independence and advocate-client privilege.",
  },
  {
    id: "chambers-fee-structures",
    category: "Chambers Practice",
    question: "How are consultation fees and advisory scopes billed?",
    answer:
      "We provide clear, written Engagement Letters detailing professional scope and milestone-based or retainer billing. In strict compliance with Bar Council of India guidelines, we do not solicit contingent or outcome-based fee arrangements.",
  },
];

const CATEGORIES = [
  "All Categories",
  "POSH Compliance",
  "Commercial Contracts",
  "Dispute Resolution",
  "Corporate Advisory",
  "Chambers Practice",
];

export default function FAQPage() {
  const faqs = useRealtimeFaqs();
  const [selectedCat, setSelectedCat] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Ask Question Form State
  const [askName, setAskName] = useState("");
  const [askEmail, setAskEmail] = useState("");
  const [askQuestion, setAskQuestion] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  const effectiveFaqs = faqs.length > 0 ? faqs : FAQ_DATA;

  const dynamicCategories = [
    "All Categories",
    ...Array.from(new Set(effectiveFaqs.map((f) => f.category))),
  ];

  const filteredFaqs = effectiveFaqs.filter((item) => {
    const matchesCat =
      selectedCat === "All Categories" || item.category === selectedCat;
    const matchesQuery =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleCopyLink = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/faq#${id}`;
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleAskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = platformStore.addQuestion(
      askName,
      askEmail,
      "posh_law",
      askQuestion
    );
    try {
      await fetch("/api/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: askName,
          email: askEmail,
          category: "posh_law",
          question: askQuestion,
          id: created.id,
        }),
      });
    } catch {}
    setRefId(created.refNumber || `QA-${Math.floor(100000 + Math.random() * 900000)}`);
    setFormSubmitted(true);
  };

  const accordionItems = filteredFaqs.map((f) => ({
    id: f.id,
    title: f.question,
    content: (
      <div className="space-y-3">
        <p>{f.answer}</p>
        <div className="pt-2 flex items-center justify-between text-xs text-ink-muted">
          <span className="font-semibold text-brass-700 uppercase tracking-wider">
            {f.category}
          </span>
          <button
            onClick={(e) => handleCopyLink(f.id, e)}
            className="inline-flex items-center gap-1 hover:text-navy-700 transition"
            aria-label="Copy direct question link"
          >
            {copiedId === f.id ? (
              <>
                <Check className="w-3.5 h-3.5 text-status-success" />
                <span className="text-status-success font-medium">Link Copied</span>
              </>
            ) : (
              <>
                <LinkIcon className="w-3.5 h-3.5 text-brass-500" />
                <span>Direct Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    ),
  }));

  return (
    <div className="bg-ivory-50 text-ink min-h-screen">
      
      {/* Header */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 border-b border-border bg-ivory-50">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6">
          <nav className="text-xs font-sans text-ink-muted flex items-center gap-2">
            <Link href="/" className="hover:text-navy-700 transition">Home</Link>
            <span>/</span>
            <span className="text-brass-700 font-semibold">FAQ</span>
          </nav>

          <Eyebrow>PROCEDURAL &amp; STATUTORY GUIDANCE</Eyebrow>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink-950 leading-[1.05] max-w-4xl">
            Frequently Asked <span className="font-serif italic font-normal text-brass-700">Questions</span>.
          </h1>

          <p className="font-sans text-lg sm:text-xl text-ink-secondary max-w-2xl leading-relaxed">
            Direct statutory clarifications regarding POSH Act compliance, commercial agreements, dispute mechanisms, and chambers intake protocols.
          </p>

          {/* Search at Top */}
          <div className="pt-4 max-w-xl">
            <div className="relative">
              <Search className="w-4 h-4 text-ink-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search across questions, statutes, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-btn bg-white border border-border text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-navy-700 shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main FAQ Layout */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Category Rail (Sticky lg:col-span-3) */}
          <aside className="lg:col-span-3 lg:sticky lg:top-28 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-brass-700 pb-2 border-b border-border">
              Categories
            </div>
            <nav className="space-y-1 font-sans text-xs">
              {dynamicCategories.map((cat) => {
                const isActive = selectedCat === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCat(cat)}
                    className={`w-full text-left py-2 px-3 rounded-btn transition-colors ${
                      isActive
                        ? "bg-stone-100 text-navy-700 font-bold border-l-2 border-brass-500"
                        : "text-ink-secondary hover:text-ink hover:bg-stone-100/50"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </nav>

            <div className="pt-6 border-t border-border space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-ink-muted block">
                Direct Intake
              </span>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Do not see your specific statutory question answered?
              </p>
              <a
                href="#ask-question"
                className="text-xs font-bold text-navy-700 hover:text-brass-700 underline block"
              >
                Submit a Question Below &darr;
              </a>
            </div>
          </aside>

          {/* Right: Smooth Accordion & Questions List (lg:col-span-9) */}
          <main className="lg:col-span-9 space-y-16">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-ink-muted pb-2 border-b border-border">
                <span>Showing {filteredFaqs.length} questions</span>
                <span className="font-semibold text-brass-700">{selectedCat}</span>
              </div>

              {accordionItems.length > 0 ? (
                <Accordion
                  items={accordionItems}
                  allowMultiple
                  defaultOpenId={accordionItems[0]?.id}
                />
              ) : (
                <div className="p-12 bg-white rounded-card border border-border text-center space-y-3">
                  <h3 className="font-serif text-2xl font-bold text-ink">No matching questions</h3>
                  <p className="font-sans text-sm text-ink-secondary">
                    Try refining your search keyword or selecting &quot;All Categories&quot;.
                  </p>
                </div>
              )}
            </div>

            {/* "Ask a Question" Panel with Refined Form & Reference-ID Confirmation */}
            <section id="ask-question" className="pt-8 scroll-mt-28">
              <div className="bg-white rounded-card border border-border p-8 sm:p-12 shadow-card space-y-6">
                <div>
                  <Eyebrow>INQUIRY DESK</Eyebrow>
                  <h3 className="font-serif text-2xl sm:text-4xl font-bold text-ink-950 mt-2">
                    Ask Counsel a Statutory Question
                  </h3>
                  <p className="font-sans text-sm text-ink-secondary mt-1 leading-relaxed">
                    Submit your query regarding our advisory scope or statutory procedures. Our chambers desk responds within one business day.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="p-8 bg-ivory-50 rounded-card border border-border text-center space-y-3 animate-fade-up">
                    <div className="w-12 h-12 rounded-full bg-status-success-bg border border-status-success/30 flex items-center justify-center text-status-success mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-2xl font-bold text-ink">
                      Question Received by Chambers Desk
                    </h4>
                    <p className="font-sans text-sm text-ink-secondary max-w-md mx-auto">
                      Thank you. Your query has been logged under confidential review. We will reply to {askEmail} within 24 hours.
                    </p>
                    <div className="pt-2 font-mono text-xs font-bold text-brass-700">
                      Confirmation Reference: {refId}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleAskSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Your Name or Designation"
                        placeholder="e.g. S. Sen, Legal Counsel"
                        value={askName}
                        onChange={(e) => setAskName(e.target.value)}
                        required
                      />
                      <Input
                        label="Email Address for Reply"
                        type="email"
                        placeholder="counsel@institution.com"
                        value={askEmail}
                        onChange={(e) => setAskEmail(e.target.value)}
                        required
                      />
                    </div>

                    <Textarea
                      label="Your Question or Matter Scope"
                      placeholder="Specify the statute, organizational context, or procedural clarification required..."
                      value={askQuestion}
                      onChange={(e) => setAskQuestion(e.target.value)}
                      required
                    />

                    <Checkbox
                      label="I acknowledge that this inquiry is for informational orientation and does not establish formal legal representation."
                      required
                    />

                    <div className="pt-2">
                      <Button variant="primary" type="submit" arrow>
                        Submit Question
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </section>

          </main>

        </div>
      </div>

    </div>
  );
}
