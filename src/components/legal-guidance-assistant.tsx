"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Lock,
  Sparkles,
  RotateCcw,
  Phone,
  FileText,
  Building,
  GraduationCap,
  Globe,
} from "lucide-react";

interface ChatMessage {
  role: "assistant" | "user";
  content: string;
  isAlert?: boolean;
  link?: string;
  linkText?: string;
  phone?: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Welcome to the Acorn Statutory Guidance Desk. I provide verified factual guidance on 30-Year Property Title Searches, Doorstep Leave & License, Registered Wills, Housing Society Management, Court Marriage, MEA Apostille Attestation, and POSH Act 2013 Statutory Compliance. How may our chambers assist you today?",
};

const QUICK_TOPICS = [
  {
    title: "30-Yr Title Search",
    question: "What is included in a 30-year property title search report?",
  },
  {
    title: "Doorstep License",
    question: "How does doorstep Leave & License biometric registration work?",
  },
  {
    title: "Registered Will",
    question: "What are the legal requirements for drafting and registering a Will?",
  },
  {
    title: "POSH IC (Sec 4)",
    question: "What is the mandatory constitution of an Internal Committee under Section 4?",
  },
  {
    title: "POSH Privacy (Sec 16)",
    question: "What are the strict confidentiality mandates under Section 16 of the POSH Act?",
  },
  {
    title: "POSH Limitation (Sec 9)",
    question: "What is the limitation period for filing under Section 9 of the POSH Act?",
  },
  {
    title: "Court Marriage",
    question: "What is the procedure for Court Marriage under the Special Marriage Act?",
  },
  {
    title: "Society Formation (GDCA)",
    question: "How is a Co-operative Housing Society formed by an approved GDCA Auditor?",
  },
  {
    title: "MEA Apostille",
    question: "How do I get MEA Apostille or Embassy Attestation for foreign documents?",
  },
  {
    title: "Talk to Counsel",
    question: "How can I book a direct consultation with Advocate on Panel Adv. Rajesh Telge?",
  },
];

export function LegalGuidanceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setQuery("");
  };

  const generateReply = (rawText: string): { reply: string; link?: string; linkText?: string; phone?: string } => {
    const text = rawText.toLowerCase();

    // 1. Property Title Search & Land Records
    if (
      text.includes("title search") ||
      text.includes("30 year") ||
      text.includes("30-year") ||
      text.includes("7/12") ||
      text.includes("7x12") ||
      text.includes("6/12") ||
      text.includes("property card") ||
      text.includes("index-2") ||
      text.includes("index 2") ||
      text.includes("encumbrance") ||
      text.includes("mutation")
    ) {
      return {
        reply:
          "Acorn conducts exhaustive 30-year property title investigations directly across Sub-Registrar records, certified Index-2 registries, revenue 7/12 & 6/12 extracts, and City Survey Property Cards. We inspect the unbroken chain of registered deeds, identify mortgaged or lis pendens encumbrances, and issue an authoritative Title Search Certificate.",
        link: "/request-service?service=land-plot-title-search-reports-of-30-years",
        linkText: "Request 30-Year Title Search",
      };
    }

    // 2. Leave & License Agreement
    if (
      text.includes("leave and license") ||
      text.includes("leave & license") ||
      text.includes("rent agreement") ||
      text.includes("tenant") ||
      text.includes("landlord") ||
      text.includes("doorstep") ||
      text.includes("biometric")
    ) {
      return {
        reply:
          "Our Doorstep Leave & License service brings government-approved biometric verification to your home or office at your preferred day and time. Our executive executes the agreement with biometric thumb scanners and webcams, filing directly with the Sub-Registrar's online portal for prompt government registration without court queues.",
        link: "/request-service?service=leave-license-agreement-registration-done-at-your-door-step",
        linkText: "Schedule Doorstep Registration",
      };
    }

    // 3. Registered Will, Probate & Estate Planning
    if (
      text.includes("will") ||
      text.includes("probate") ||
      text.includes("succession") ||
      text.includes("testament") ||
      text.includes("inheritance") ||
      text.includes("gift deed") ||
      text.includes("release deed")
    ) {
      return {
        reply:
          "Under Section 63 of the Indian Succession Act 1925, a valid Will requires execution by the testator in the physical presence of at least two competent attesting witnesses. Acorn assists in precision drafting, medical fitness certification coordination, and formal Sub-Registrar registration, as well as High Court Probate and Succession Petitions.",
        link: "/request-service?service=registered-will",
        linkText: "Consult on Will & Probate",
      };
    }

    // 4. Co-operative Housing Society (GDCA Auditor)
    if (
      text.includes("society") ||
      text.includes("co-operative") ||
      text.includes("cooperative") ||
      text.includes("gdca") ||
      text.includes("bye-law") ||
      text.includes("bye law") ||
      text.includes("flat transfer") ||
      text.includes("associate member")
    ) {
      return {
        reply:
          "Co-operative Housing Society formation is executed by our approved GDCA (Government Diploma in Co-operation and Accountancy) auditors. We handle Chief Promoter election, proposal submission to the Registrar, opening society bank accounts, bye-laws compliance, associate memberships, and statutory transfer papers.",
        link: "/request-service?service=co-operative-society-formation-by-approved-gdca-auditor",
        linkText: "Society Governance Services",
      };
    }

    // 5. Court Marriage & Matrimonial Law
    if (
      text.includes("court marriage") ||
      text.includes("marriage registration") ||
      text.includes("special marriage") ||
      text.includes("divorce") ||
      text.includes("domestic violence") ||
      text.includes("maintenance")
    ) {
      return {
        reply:
          "Under the Special Marriage Act 1954, Court Marriage is open to couples of all castes, religions, and nationalities without religious conversion. It requires 30 days statutory notice at the Marriage Officer's jurisdiction, followed by formal solemnization before 3 witnesses. We also handle mutual consent divorce under Section 13B and maintenance proceedings.",
        link: "/request-service?service=court-marriage-for-all-caste-religions",
        linkText: "Court Marriage Assistance",
      };
    }

    // 6. MEA Apostille, Embassy Attestation & PCC
    if (
      text.includes("apostille") ||
      text.includes("attestation") ||
      text.includes("mea") ||
      text.includes("embassy") ||
      text.includes("pcc") ||
      text.includes("police clearance")
    ) {
      return {
        reply:
          "We provide complete consular legalization: (1) State HRD/Home Department attestation, (2) Ministry of External Affairs (MEA) Apostille stamp for Hague Convention countries, (3) Foreign Embassy attestation for Gulf/non-Hague nations, and (4) Police Clearance Certificate (PCC) assistance for work/residency visas.",
        link: "/request-service?service=mea-attestation-or-apostille",
        linkText: "MEA Apostille & Attestation",
      };
    }

    // 7. POSH Section 4 - IC Constitution
    if (text.includes("section 4") || text.includes("constitution") || text.includes("internal committee") || text.includes("external member")) {
      return {
        reply:
          "Under Section 4(2) of the POSH Act 2013, an employer with 10 or more workers must constitute an Internal Committee comprising: (a) Presiding Officer: a senior woman employee; (b) Minimum two employee members committed to women's causes or legal knowledge; (c) One independent External Member from an NGO or familiar with sexual harassment issues; with at least 50% total women members.",
        link: "/posh",
        linkText: "Explore POSH Governance",
      };
    }

    // 8. POSH Section 9 - Limitation Period
    if (text.includes("section 9") || text.includes("limitation") || text.includes("timeline") || text.includes("time limit") || text.includes("90 day")) {
      return {
        reply:
          "Section 9(1) of the POSH Act mandates that a written complaint must be lodged within 90 days from the incident date (or last incident in a series). Under the proviso, the IC may condone a delay of up to an additional 90 days (180 days total) for recorded written reasons if satisfied circumstances prevented earlier filing. Complaints beyond 180 days are statutorily barred.",
        link: "/posh",
        linkText: "View POSH Statutory Rules",
      };
    }

    // 9. POSH Section 12 - Interim Measures
    if (text.includes("section 12") || text.includes("interim") || text.includes("relief") || text.includes("transfer") || text.includes("leave")) {
      return {
        reply:
          "Under Section 12, at the written request of the aggrieved woman during a pending inquiry, the IC may recommend to the employer: (a) Transfer of the complainant or respondent to another department/branch; (b) Grant of paid leave up to 3 months (over and above normal statutory leave); or (c) Restraining the respondent from reporting on complainant's appraisal.",
        link: "/posh",
        linkText: "POSH Interim Protocols",
      };
    }

    // 10. POSH Section 16 - Confidentiality Mandate
    if (text.includes("section 16") || text.includes("confidential") || text.includes("privacy") || text.includes("disclosure") || text.includes("leak") || text.includes("secrecy")) {
      return {
        reply:
          "Section 16 of the POSH Act strictly prohibits publishing, broadcasting, or making known to the public, press, or media the contents of the complaint, identities of complainant, respondent, or witnesses, and inquiry proceedings. This overrides the Right to Information (RTI) Act. Breach attracts statutory penalties under Section 17.",
        link: "/posh",
        linkText: "Read Confidentiality Guidelines",
      };
    }

    // 11. POSH Section 21 - Annual Report Filing
    if (text.includes("section 21") || text.includes("annual report") || text.includes("district officer") || text.includes("annual filing")) {
      return {
        reply:
          "Under Section 21 of the POSH Act, every Internal Committee is statutorily mandated to prepare and submit an Annual Compliance Report to the Employer and the designated District Officer (DO) / District Magistrate in each calendar year. Failure to file or constitute an IC attracts penalties up to ₹50,000 under Section 26.",
        link: "/posh/org/reports",
        linkText: "Annual Reporting Portal",
      };
    }

    // 12. Educational Guidance & Admissions
    if (
      text.includes("education") ||
      text.includes("admission") ||
      text.includes("ssc") ||
      text.includes("hsc") ||
      text.includes("mbbs") ||
      text.includes("pharmacy") ||
      text.includes("mumbai university") ||
      text.includes("rte")
    ) {
      return {
        reply:
          "Acorn provides structured guidance for: (1) Private 10th SSC & 12th Arts/Commerce/Science pass guaranteed coaching with qualified lecturers and counselors; (2) Merit & NRI college admissions for MBBS, MD, and Pharmacy in India & abroad; (3) Mumbai University FY/SY/TY form filling (June–Sept); and (4) School RTE lottery pre-admissions (Oct–Dec).",
        link: "/services",
        linkText: "View Educational Services",
      };
    }

    // 13. Direct Counsel Contact & Fees
    if (
      text.includes("contact") ||
      text.includes("phone") ||
      text.includes("call") ||
      text.includes("rajesh telge") ||
      text.includes("fee") ||
      text.includes("cost") ||
      text.includes("appointment") ||
      text.includes("address")
    ) {
      return {
        reply:
          "Acorn Consultants operates under Advocate on Panel Adv. Rajesh Telge (Direct: +91 8369171822) with chambers at Suite 4B, Camac Court, 25 Camac Street, Kolkata. Our central helpline & WhatsApp desk is +91 8286936899. Consultation intake operates Mon–Sat 9:30 AM – 7:30 PM IST with transparent, accountable fee structures.",
        link: "/contact",
        linkText: "Book Chambers Appointment",
        phone: "+918286936899",
      };
    }

    // Default Multi-Disciplinary Practice Reply
    return {
      reply:
        "Acorn Consultants has over 15 years of multifaceted practice in Kolkata, Mumbai, and pan-India. We deliver services across: (1) Property 30-Year Title Searches & 7/12 extracts, (2) Doorstep Biometric Leave & License, (3) Registered Wills & Probate, (4) Co-operative Housing Society Management (GDCA), (5) Court Marriage, (6) MEA Consular Apostille, and (7) Corporate POSH Act 2013 Compliance.",
      link: "/services",
      linkText: "Explore All 37 Services",
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || query;
    if (!text.trim() || isTyping) return;

    const userText = text.trim();
    setQuery("");

    // Append user query immediately
    setMessages((prev) => [...prev, { role: "user", content: userText }]);

    // Red-team safety check: Detect if user is describing an active complaint / personal narrative
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
      "yesterday night",
      "last night",
    ];

    const hasNarrative = personalNarrativeKeywords.some((kw) =>
      userText.toLowerCase().includes(kw)
    );

    if (hasNarrative) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            isAlert: true,
            content:
              "CRITICAL STATUTORY NOTICE: You appear to be describing an active personal incident. For your legal protection and strict confidentiality under Section 16 of the POSH Act 2013, please DO NOT enter factual allegations or personal details into an automated assistant. Your input has NOT been saved. Please proceed directly to our secure, counsel-monitored filing portal or contact our confidential helpline.",
            link: "/posh/file",
            linkText: "Open Confidential Filing Portal",
          },
        ]);
      }, 350);
      return;
    }

    // Normal query response with realistic typing delay
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const result = generateReply(userText);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: result.reply,
          link: result.link,
          linkText: result.linkText,
          phone: result.phone,
        },
      ]);
    }, 400);
  };

  return (
    <>
      {/* Floating Trigger - Statutory Guidance Desk Icon with Green Pulse */}
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
        <div className="fixed bottom-6 right-6 z-50 w-[360px] sm:w-[430px] h-[550px] max-h-[86vh] bg-white rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="bg-navy-950 text-white px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between border-b border-brass-500/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-brass-400/40 shrink-0 bg-navy-900 flex items-center justify-center shadow-xs">
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
                  <span className="text-[9px] font-sans font-semibold text-brass-300 border border-brass-400/50 px-1 py-0.2 rounded bg-brass-500/10">
                    Verified
                  </span>
                </h3>
                <p className="font-sans text-[10px] text-slate-300 font-normal">
                  Educational &amp; Legal Statutory Information
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Reset / Fresh Chat Button */}
              <button
                type="button"
                onClick={handleResetChat}
                className="w-8 h-8 rounded-full text-slate-400 hover:text-brass-300 hover:bg-white/10 transition flex items-center justify-center text-xs"
                title="Start Fresh Conversation"
                aria-label="Start Fresh Conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bar Council Regulatory Disclaimer */}
          <div className="bg-stone-50 px-3.5 py-1.5 border-b border-border text-[10px] text-ink-muted flex items-center gap-1.5 select-none">
            <Lock className="w-3 h-3 text-brass-600 shrink-0" />
            <span>
              Rule 36 Notice: Informational statutory reference only. No advocate-client privilege created.
            </span>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-stone-50/40">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed text-xs ${
                    msg.role === "user"
                      ? "bg-navy-900 text-white rounded-br-sm shadow-xs font-sans"
                      : msg.isAlert
                      ? "bg-amber-50 border border-amber-300 text-amber-950 rounded-bl-sm shadow-sm"
                      : "bg-white border border-border text-ink rounded-bl-sm shadow-2xs font-sans"
                  }`}
                >
                  {msg.isAlert && (
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-800 mb-1.5 pb-1 border-b border-amber-200">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      Confidentiality Alert
                    </div>
                  )}

                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {/* Contextual Action Button */}
                  {msg.link && (
                    <div className="mt-2.5 pt-2 border-t border-border/70 flex flex-wrap items-center gap-2">
                      <Link
                        href={msg.link}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1.5 font-bold text-navy-900 bg-brass-500/15 hover:bg-brass-500/25 px-2.5 py-1.5 rounded-lg border border-brass-500/40 transition text-[11px]"
                      >
                        <span>{msg.linkText || "View Full Details"}</span>
                        <ChevronRight className="w-3 h-3 text-brass-700" />
                      </Link>

                      {msg.phone && (
                        <a
                          href={`tel:${msg.phone}`}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-brass-700 hover:underline"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call Helpline</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start">
                <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-3.5 py-2 text-xs text-ink-muted flex items-center gap-2 shadow-2xs">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brass-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brass-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brass-500 animate-bounce" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">
                    Checking statutory database...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Statutory Topics Chips */}
          <div className="px-3 py-2 bg-stone-100/70 border-t border-border flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            <span className="text-[10px] uppercase font-bold text-brass-700 shrink-0 pl-1 select-none">
              Topics:
            </span>
            {QUICK_TOPICS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(item.question)}
                disabled={isTyping}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-border hover:border-brass-500 hover:text-navy-900 text-ink-secondary text-[10px] font-medium transition shadow-2xs hover:shadow-xs shrink-0 disabled:opacity-50"
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
                placeholder="Ask about property search, Leave &amp; License, Will, POSH..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isTyping}
                className="flex-1 px-3.5 h-[42px] text-xs rounded-xl border border-border focus:border-brass-500 focus:outline-none focus:ring-1 focus:ring-brass-500 bg-stone-50/70 text-ink placeholder:text-ink-muted transition"
              />
              <button
                type="submit"
                disabled={!query.trim() || isTyping}
                className={`w-10 h-10 shrink-0 rounded-xl transition flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 ${
                  query.trim() && !isTyping
                    ? "bg-brass-500 hover:bg-brass-400 text-ink-950 shadow-md cursor-pointer scale-100"
                    : "bg-stone-200 text-stone-400 cursor-not-allowed"
                }`}
                aria-label="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}

