"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  FileText,
  Clock,
  HelpCircle,
  Users
} from "lucide-react";

export default function PoshIcGuidePage() {
  const [activeSection, setActiveSection] = useState<"NATURAL_JUSTICE" | "CROSS_EXAM" | "QUORUM" | "CHECKLIST">("NATURAL_JUSTICE");

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/posh/ic"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Internal Committee Roster</span>
          </Link>
          <span className="text-[11px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
            PRD Screen Ref: I-12
          </span>
        </div>

        {/* Header */}
        <div className="bg-white p-6 rounded-card border border-border shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
            <BookOpen className="w-4 h-4 text-primary" />
            <span>IC Bench Book &bull; Judicial Conduct</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink mt-1">
            Internal Committee Bench Guide &amp; Natural Justice Rules
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Standard operating procedures, statutory powers under the Code of Civil Procedure 1908 (Section 11(3)), examination protocols, and procedural checklists.
          </p>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border">
            <button
              onClick={() => setActiveSection("NATURAL_JUSTICE")}
              className={`px-3 py-1.5 text-xs font-bold rounded transition ${activeSection === "NATURAL_JUSTICE" ? "bg-primary text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
            >
              Principles of Natural Justice
            </button>
            <button
              onClick={() => setActiveSection("CROSS_EXAM")}
              className={`px-3 py-1.5 text-xs font-bold rounded transition ${activeSection === "CROSS_EXAM" ? "bg-primary text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
            >
              Cross-Examination &amp; Advocates
            </button>
            <button
              onClick={() => setActiveSection("QUORUM")}
              className={`px-3 py-1.5 text-xs font-bold rounded transition ${activeSection === "QUORUM" ? "bg-primary text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
            >
              Quorum &amp; Powers (Sec 11)
            </button>
            <button
              onClick={() => setActiveSection("CHECKLIST")}
              className={`px-3 py-1.5 text-xs font-bold rounded transition ${activeSection === "CHECKLIST" ? "bg-primary text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
            >
              Hearing Day Checklist
            </button>
          </div>
        </div>

        {/* Content Panels */}
        {activeSection === "NATURAL_JUSTICE" && (
          <div className="bg-white p-6 rounded-card border border-border shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              <span>Core Principles of Natural Justice</span>
            </h2>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <h3 className="font-bold text-primary text-sm mb-1">1. Audi Alteram Partem (Listen to Both Sides)</h3>
                <p>
                  Neither party shall be condemned unheard. The respondent is entitled to receive an exact copy of the complaint within 7 working days (Rule 7(2)), along with all supporting documents, and must be granted 10 working days to submit a written reply.
                  Both parties must be afforded equal opportunity to introduce evidence, present witnesses, and review any document relied upon by the committee.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <h3 className="font-bold text-primary text-sm mb-1">2. Nemo Judex in Causa Sua (Rule Against Bias)</h3>
                <p>
                  No IC member who possesses any direct or indirect interest in the dispute, has a reporting relationship with either party, or has pre-judged the matter shall participate in the proceedings. Any recusal must be recorded immediately in the minutes and an alternate member summoned.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <h3 className="font-bold text-primary text-sm mb-1">3. Reasoned &amp; Speaking Orders</h3>
                <p>
                  The final inquiry report under Section 13 must be a &ldquo;speaking order&rdquo;&mdash;stating clear factual findings, credibility assessments, evaluation of testimonies, and reasons for every conclusion drawn. Vague or summary dismissals will be quashed on Section 18 appeal.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSection === "CROSS_EXAM" && (
          <div className="bg-white p-6 rounded-card border border-border shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span>Cross-Examination &amp; Prohibition of Advocates</span>
            </h2>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-950">
                <h3 className="font-bold text-red-900 text-sm mb-1">Section 11(4) Bar on Legal Practitioners</h3>
                <p>
                  &ldquo;The parties shall not be allowed to bring any legal practitioner to represent them in their case at any stage of the proceedings before the Internal Committee.&rdquo;
                  Neither the complainant nor the respondent may be accompanied by a practicing advocate or lawyer.
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-950">
                <h3 className="font-bold text-blue-900 text-sm mb-1">Dignified Cross-Examination Protocol</h3>
                <p>
                  To prevent re-traumatization and aggressive intimidation, direct hostile face-to-face badgering of the complainant is strictly prohibited.
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>The respondent submits proposed questions in writing to the Presiding Officer.</li>
                  <li>The IC evaluates each question for relevance, decency, and non-harassment.</li>
                  <li>Questions regarding past sexual history or character are strictly disallowed.</li>
                  <li>Approved questions are read out to the witness or complainant by the Presiding Officer or External Member, and responses recorded verbatim.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeSection === "QUORUM" && (
          <div className="bg-white p-6 rounded-card border border-border shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Statutory Quorum &amp; Civil Court Powers</span>
            </h2>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <h3 className="font-bold text-primary text-sm mb-1">Section 4(3) Minimum Quorum</h3>
                <p>
                  A minimum of <strong>3 members</strong> of the Internal Committee, including the Presiding Officer, shall be present for any hearing or inquiry meeting.
                  Furthermore, at least <strong>50% of the attending members must be women</strong>, and the External Member (from Acorn Legal or affiliated NGO) should actively participate in all evidentiary hearings.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <h3 className="font-bold text-primary text-sm mb-1">Section 11(3) Powers Vested under Code of Civil Procedure, 1908</h3>
                <p>
                  The Internal Committee enjoys the same powers as are vested in a civil court under CPC 1908 when trying a suit in respect of:
                </p>
                <ol className="list-decimal pl-5 space-y-1 mt-2">
                  <li>Summoning and enforcing the attendance of any person and examining him/her on oath.</li>
                  <li>Requiring the discovery and production of documents (emails, access logs, CCTV, visitor registers).</li>
                  <li>Any other matter which may be prescribed.</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {activeSection === "CHECKLIST" && (
          <div className="bg-white p-6 rounded-card border border-border shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Step-by-Step Hearing Checklist</span>
            </h2>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded flex items-start gap-2">
                <input type="checkbox" defaultChecked className="mt-1 rounded text-primary" />
                <div>
                  <strong>Pre-Hearing Verification:</strong> Confirm notice served at least 3 working days in advance; confirm minimum 3-member quorum including Presiding Officer and External Member.
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded flex items-start gap-2">
                <input type="checkbox" defaultChecked className="mt-1 rounded text-primary" />
                <div>
                  <strong>Section 16 Warning:</strong> Remind all attendees (including witnesses) of the statutory non-disclosure prohibition under Section 16 before recording commences.
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded flex items-start gap-2">
                <input type="checkbox" defaultChecked className="mt-1 rounded text-primary" />
                <div>
                  <strong>Minutes of Proceeding:</strong> Record verbatim notes. Read back the statement to the deponent in their vernacular language.
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded flex items-start gap-2">
                <input type="checkbox" defaultChecked className="mt-1 rounded text-primary" />
                <div>
                  <strong>Signature on Deposition:</strong> Ensure the witness and all attending IC members countersign every page of the deposition record before dismissing the session.
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

