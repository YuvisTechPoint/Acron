"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  FileText,
  Lock,
  HeartHandshake,
  HelpCircle,
  ExternalLink,
  Phone,
  Globe,
  Clock,
  ArrowRight,
} from "lucide-react";
import { BRAND_CONFIG, POSH_HELPLINES } from "@/lib/constants";

export default function PoshPortalPage() {
  const [lang, setLang] = useState<"en" | "bn" | "hi">("en");

  const translations = {
    en: {
      tag: "Confidential Redressal Desk",
      title: "Workplace Safety & Redressal Portal",
      sub: "You have the statutory right to a safe workplace free from sexual harassment. We ensure complete confidentiality, trauma-informed guidance, and statutory protection under the POSH Act 2013.",
      fileBtn: "File a Confidential Complaint",
      checkBtn: "Check Applicability & Routing (2 Min)",
      concernBtn: "Submit Informal Concern / Bystander Report",
      trackBtn: "Track My Existing Case",
      confidentialityTitle: "Your Privacy & Protection (Section 16)",
      confidentialityDesc:
        "Under Section 16 of the POSH Act 2013, the identity of the complainant, respondent, witnesses, and all inquiry proceedings are strictly confidential. Revealing details to the public, press, or colleagues is punishable by law.",
      quickExitNotice: "Safety Alert: Press ESC or click the red Quick Exit button at any moment to immediately close this screen and replace browser history.",
    },
    bn: {
      tag: "গোপনীয় সহায়তা কেন্দ্র",
      title: "কর্মক্ষেত্রে নিরাপত্তা ও প্রতিকার পোর্টাল",
      sub: "যৌন হয়রানি মুক্ত নিরাপদ কর্মপরিবেশ আপনার আইনি অধিকার। আমরা ২০১৩ সালের POSH আইনের অধীনে পূর্ণ গোপনীয়তা ও আইনি সুরক্ষা নিশ্চিত করি।",
      fileBtn: "একটি গোপনীয় অভিযোগ জমা দিন",
      checkBtn: "আইনগত প্রযোজ্যতা যাচাই করুন (২ মিনিট)",
      concernBtn: "অনানুষ্ঠানিক উদ্বেগ বা প্রত্যক্ষদর্শী রিপোর্ট",
      trackBtn: "আমার দায়ের করা মামলা ট্র্যাক করুন",
      confidentialityTitle: "আপনার গোপনীয়তা ও সুরক্ষা (ধারা ১৬)",
      confidentialityDesc:
        "POSH আইনের ১৬ ধারা অনুযায়ী অভিযোগকারী, সাক্ষী এবং সমস্ত শুনানির বিবরণ সম্পূর্ণ গোপনীয়। এই তথ্য কাউকে প্রকাশ করা আইনত দণ্ডনীয় অপরাধ।",
      quickExitNotice: "জরুরী নিরাপত্তা: ব্রাউজার দ্রুত বন্ধ করতে যে কোনো সময় ESC চাপুন বা Quick Exit বোতামে ক্লিক করুন।",
    },
    hi: {
      tag: "गोपनीय शिकायत एवं निवारण पोर्टल",
      title: "कार्यस्थल सुरक्षा एवं शिकायत निवारण",
      sub: "यौन उत्पीड़न मुक्त सुरक्षित कार्यस्थल आपका कानूनी अधिकार है। हम POSH अधिनियम 2013 के तहत पूर्ण गोपनीयता और कानूनी सुरक्षा सुनिश्चित करते हैं।",
      fileBtn: "गोपनीय शिकायत दर्ज करें",
      checkBtn: "पात्रता एवं समिति की जांच करें (2 मिनट)",
      concernBtn: "अनौपचारिक सूचना / प्रत्यक्षदर्शी रिपोर्ट दर्ज करें",
      trackBtn: "अपने दर्ज मामले की स्थिति देखें",
      confidentialityTitle: "आपकी गोपनीयता एवं सुरक्षा (धारा 16)",
      confidentialityDesc:
        "POSH अधिनियम की धारा 16 के अनुसार शिकायतकर्ता, गवाहों और जांच कार्यवाही की पहचान पूरी तरह से गोपनीय रखी जाती है।",
      quickExitNotice: "सुरक्षा चेतावनी: तुरंत इस पेज से बाहर निकलने के लिए किसी भी समय ESC दबाएं या Quick Exit बटन पर क्लिक करें।",
    },
  };

  const t = translations[lang];

  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16 text-ink">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Language & Discretion Notice Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-card border border-border shadow-sm">
          <div className="flex items-center gap-2 text-xs text-ink-secondary">
            <Globe className="w-4 h-4 text-navy-700" />
            <span className="font-semibold text-ink">Language / ভাষা / भाषा:</span>
            <div className="flex gap-1 ml-2">
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  lang === "en" ? "bg-navy-700 text-ivory-50" : "bg-white border border-border text-ink"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang("bn")}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  lang === "bn" ? "bg-navy-700 text-ivory-50" : "bg-white border border-border text-ink"
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLang("hi")}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  lang === "hi" ? "bg-navy-700 text-ivory-50" : "bg-white border border-border text-ink"
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          <div className="text-[11px] text-ink-secondary font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brass-700 shrink-0" />
            <span>{t.quickExitNotice}</span>
          </div>
        </div>

        {/* Calm Hero Card (Soft Blue Surface) */}
        <div className="bg-blue-100/50 text-ink rounded-card p-8 sm:p-12 border border-blue-100 shadow-card relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brass-500/30 text-brass-700 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-brass-700" />
              <span>{t.tag}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ink-950">
              {t.title}
            </h1>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/posh/file"
                className="px-6 py-3.5 bg-navy-700 hover:bg-blue-600 text-ivory-50 text-xs font-bold uppercase tracking-wider rounded-btn shadow-sm transition-all flex items-center gap-2"
              >
                <span>{t.fileBtn}</span>
                <ArrowRight className="w-4 h-4 text-brass-300" />
              </Link>
              <Link
                href="/posh/start"
                className="px-6 py-3.5 bg-white border border-border hover:bg-ivory-50 text-navy-700 text-xs font-bold uppercase tracking-wider rounded-btn transition-all"
              >
                <span>{t.checkBtn}</span>
              </Link>
              <Link
                href="/posh/my-case"
                className="px-4 py-3.5 border border-border bg-white hover:bg-ivory-50 text-ink-secondary hover:text-ink text-xs font-semibold rounded-btn transition-colors"
              >
                {t.trackBtn}
              </Link>
            </div>
          </div>
        </div>

        {/* Alternative Action Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/posh/concern"
            className="p-6 bg-surface hover:bg-surface-muted rounded-card border border-border shadow-card transition-all group"
          >
            <div className="w-10 h-10 rounded bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-ink text-base group-hover:text-primary transition-colors">
              Informal Concern / Bystander Report
            </h3>
            <p className="text-xs text-ink-secondary mt-1.5 leading-relaxed">
              Report an incident without initiating a formal inquiry. Ideal for witnesses or early HR intervention.
            </p>
          </Link>

          <Link
            href="/posh/retaliation"
            className="p-6 bg-surface hover:bg-surface-muted rounded-card border border-border shadow-card transition-all group"
          >
            <div className="w-10 h-10 rounded bg-red-100 text-red-800 flex items-center justify-center mb-3">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-ink text-base group-hover:text-primary transition-colors">
              Report Retaliation
            </h3>
            <p className="text-xs text-ink-secondary mt-1.5 leading-relaxed">
              Experiencing adverse actions, threats, or hostility after lodging a complaint? Retaliation reports receive immediate priority.
            </p>
          </Link>

          <Link
            href="/help/directory"
            className="p-6 bg-surface hover:bg-surface-muted rounded-card border border-border shadow-card transition-all group"
          >
            <div className="w-10 h-10 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-ink text-base group-hover:text-primary transition-colors">
              Emergency &amp; Legal Aid Helplines
            </h3>
            <p className="text-xs text-ink-secondary mt-1.5 leading-relaxed">
              National Commission for Women, West Bengal Women&apos;s Helpline (181), and free state legal services.
            </p>
          </Link>
        </div>

        {/* Confidentiality Notice Box (Section 16) */}
        <div className="bg-slate-50 border border-slate-300 rounded-card p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-ink text-sm">
              {t.confidentialityTitle}
            </h4>
            <p className="text-xs text-ink-secondary leading-relaxed">
              {t.confidentialityDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

