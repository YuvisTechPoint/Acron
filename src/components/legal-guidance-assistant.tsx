"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scale,
  X,
  Send,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  MessageSquare,
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
      {/* Floating Trigger Pill */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0A192F] text-white border border-[#D4AF37]/50 shadow-xl hover:bg-[#152E52] transition-all transform hover:scale-105 group"
          aria-label="Open Statutory Guidance Desk"
        >
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <Scale className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-sans text-xs font-semibold tracking-wide">
            Statutory Guidance
          </span>
        </button>
      )}

      {/* Slide-Up Guidance Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] sm:w-[420px] max-h-[580px] bg-white rounded-2xl border border-[#CBD5E1] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="bg-[#0A192F] text-white px-5 py-4 flex items-center justify-between border-b border-[#D4AF37]/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-[#D4AF37]/40">
                <Scale className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                  Statutory Guidance Desk
                  <span className="text-[10px] font-sans font-normal text-[#D4AF37] border border-[#D4AF37]/40 px-1 rounded">
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
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition"
              aria-label="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Bar Council Regulatory Disclaimer */}
          <div className="bg-[#FAF9F6] px-4 py-2 border-b border-[#E5E0D8] text-[10px] text-[#6B7280] flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-[#D4AF37] shrink-0" />
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
                      ? "bg-[#0A192F] text-white rounded-br-none"
                      : msg.isAlert
                      ? "bg-amber-50 border border-amber-300 text-amber-900 rounded-bl-none shadow-sm"
                      : "bg-[#FAF9F6] border border-[#E5E0D8] text-[#374151] rounded-bl-none"
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
                        className="inline-flex items-center gap-1.5 font-bold text-[#0A192F] bg-white px-3 py-1.5 rounded border border-amber-300 hover:bg-amber-100 transition shadow-xs text-[11px]"
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
          <div className="px-3.5 py-2 bg-[#FAF9F6] border-t border-[#E5E0D8] flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            {quickTopics.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(item.question)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-[#CBD5E1] hover:border-[#0A192F] text-[#475569] hover:text-[#0A192F] transition text-[10px] font-medium"
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-[#E5E0D8]">
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
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-[#CBD5E1] focus:outline-none focus:ring-1 focus:ring-[#0A192F] bg-[#FAF9F6]"
              />
              <button
                type="submit"
                disabled={!query.trim()}
                className="p-2 rounded-lg bg-[#0A192F] text-white hover:bg-[#152E52] disabled:opacity-40 transition"
                aria-label="Send query"
              >
                <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}
