"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Scale,
  X,
  Send,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  MessageSquare,
  MessageSquareText,
  Lock,
  Sparkles,
} from "lucide-react";

export function LegalGuidanceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<
    Array<{ role: "assistant" | "user"; content: string; isAlert?: boolean; link?: string }>
  >([
    {
      role: "assistant",
      content:
        "Welcome to the Acorn Statutory Guidance Desk. I provide verified factual information regarding the POSH Act, 2013 and workplace compliance requirements. Please note: I cannot provide personalized legal advice or assess individual liability.",
    },
  ]);

  const quickTopics = [
    {
      title: "90-Day Limitation (Sec 9)",
      question: "What is the statutory limitation period for filing under Section 9?",
    },
    {
      title: "IC Constitution (Sec 4)",
      question: "What is the mandatory constitution of an Internal Committee under Section 4?",
    },
    {
      title: "Interim Reliefs (Sec 12)",
      question: "What interim measures can an IC recommend under Section 12?",
    },
    {
      title: "Confidentiality (Sec 16)",
      question: "What are the strict non-disclosure mandates under Section 16?",
    },
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || query;
    if (!text.trim()) return;

    const userText = text.trim();
    setQuery("");

    // Detect if user is describing an active complaint / personal narrative (Red-team safety check per PRD US-247)
    const personalNarrativeKeywords = [
      "i was",
      "my boss",
      "my colleague",
      "manager touched",
      "harassed me",
      "abused",
      "happened to me",
      "he said to me",
      "she touched",
      "forced me",
      "yesterday",
      "last night",
    ];

    const hasNarrative = personalNarrativeKeywords.some((kw) =>
      userText.toLowerCase().includes(kw)
    );

    if (hasNarrative) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: "[Confidential Narrative Query Received]" },
        {
          role: "assistant",
          isAlert: true,
          content:
            "CRITICAL STATUTORY NOTICE: You appear to be describing an active personal incident. For your legal protection and strict confidentiality under Section 16 of the POSH Act, 2013, please DO NOT enter factual allegations or personal details into an automated assistant. Your input has NOT been saved. Please proceed directly to our secure, counsel-monitored filing portal or reach our 24/7 confidential helpline.",
          link: "/posh/file",
        },
      ]);
      return;
    }

    // Normal statutory information response matching Acorn Knowledge Base
    let reply =
      "Under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, employers with 10 or more employees are statutorily required to constitute an Internal Committee at every workplace branch. All inquiries must adhere strictly to natural justice.";

    if (userText.includes("Section 9") || userText.toLowerCase().includes("limitation")) {
      reply =
        "Section 9(1) of the Act mandates that a complaint must be made in writing within three months (90 days) from the date of the incident (or from the date of the last incident in a series). The IC may extend this by up to another three months for reasons recorded in writing if satisfied that circumstances prevented earlier filing.";
    } else if (userText.includes("Section 4") || userText.toLowerCase().includes("constitution")) {
      reply =
        "Section 4(2) mandates: (a) Presiding Officer: a woman employed at a senior level; (b) At least two members committed to the cause of women or experienced in social work or legal knowledge; (c) One external member from an NGO or familiar with sexual harassment issues; with at least 50% of total members being women.";
    } else if (userText.includes("Section 12") || userText.toLowerCase().includes("interim")) {
      reply =
        "Under Section 12, at the written request of the aggrieved woman, the IC may recommend: (a) Transfer of the complainant or respondent; (b) Grant of leave up to three months (in addition to normal leave); or (c) Restraint orders preventing appraisal or contact.";
    } else if (userText.includes("Section 16") || userText.toLowerCase().includes("confidential")) {
      reply =
        "Section 16 strictly prohibits publishing or communicating the identity of the complainant, respondent, witnesses, or any inquiry proceedings to the public, press, or media. Violation attracts statutory penalties under Section 17.";
    }

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userText },
      { role: "assistant", content: reply },
    ]);
  };

  return (
    <>
      {/* Floating Trigger - PRD US-247 Statutory Guidance Desk Icon */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 bg-navy-950/95 backdrop-blur-md shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 hover:shadow-[0_0_24px_rgba(196,158,95,0.45)] border border-brass-500/40 hover:border-brass-400 overflow-visible"
          aria-label="Open Statutory Guidance Support Desk"
        >
          {/* Custom Statutory Guidance Badge Icon */}
          <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-navy-950">
            <Image
              src="/brand/statutory-guidance-icon.png"
              alt="Statutory Guidance"
              width={64}
              height={64}
              priority
              className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-200"
            />
          </div>

          {/* Hover Tooltip Label */}
          <span className="pointer-events-none absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md bg-navy-950/95 backdrop-blur-sm text-ivory-50 text-xs font-semibold tracking-wide border border-brass-500/40 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap translate-x-2 group-hover:translate-x-0">
            Statutory Guidance
          </span>
        </button>
      )}

      {/* Slide-Up Guidance Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] sm:w-[420px] max-h-[580px] bg-white rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="bg-navy-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-brass-500/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-brass-400/40 shrink-0 bg-navy-950">
                <Image
                  src="/brand/statutory-guidance-icon.png"
                  alt="Statutory Guidance"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                  Statutory Guidance Desk
                  <span className="text-[10px] font-sans font-normal text-brass-400 border border-brass-400/40 px-1 rounded">
                    Info Only
                  </span>
                </h3>
                <p className="font-sans text-[10px] text-slate-300">
                  Verified Legal Provisions &bull; PRD v3.0 US-247
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-11 h-11 rounded-btn text-slate-300 hover:text-white hover:bg-white/10 transition flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500"
              aria-label="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Bar Council Regulatory Disclaimer */}
          <div className="bg-surface px-4 py-2 border-b border-border text-[10px] text-ink-secondary flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-brass-600 shrink-0" />
            <span>
              Rule 36 Notice: Informational statutory reference only. No advocate-client privilege.
            </span>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-xl px-3.5 py-2.5 leading-relaxed ${
                    msg.role === "user"
                      ? "bg-navy-900 text-white rounded-br-none"
                      : msg.isAlert
                      ? "bg-amber-50 border border-amber-300 text-amber-900 rounded-bl-none shadow-sm"
                      : "bg-surface border border-border text-ink rounded-bl-none"
                  }`}
                >
                  {msg.isAlert && (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      Confidentiality Alert
                    </div>
                  )}
                  <p>{msg.content}</p>

                  {msg.link && (
                    <div className="mt-2.5 pt-2 border-t border-amber-200">
                      <Link
                        href={msg.link}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1.5 font-bold text-navy-900 bg-white px-3 py-2 min-h-[44px] rounded border border-amber-300 hover:bg-amber-100 transition shadow-xs text-[11px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700"
                      >
                        <span>Open Confidential Filing Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Statutory Topics Chips */}
          <div className="px-3.5 py-2 bg-surface border-t border-border flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            {quickTopics.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(item.question)}
                className="whitespace-nowrap px-3 py-2 min-h-[44px] rounded-full bg-white border border-border hover:border-navy-900 text-ink-secondary hover:text-navy-900 transition text-[10px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700"
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about POSH provisions or duties..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-3.5 h-[44px] text-xs rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-navy-700 bg-surface text-ink"
              />
              <button
                type="submit"
                disabled={!query.trim()}
                className="w-11 h-11 shrink-0 rounded-lg bg-navy-900 text-white hover:bg-navy-800 disabled:opacity-40 transition flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500"
                aria-label="Send query"
              >
                <Send className="w-3.5 h-3.5 text-brass-400" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}

