"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  UserCheck,
  Scale,
  ShieldCheck,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen
} from "lucide-react";

export default function RightsChartersPage() {
  const [activeCharter, setActiveCharter] = useState<"COMPLAINANT" | "RESPONDENT" | "IC" | "EMPLOYER">("COMPLAINANT");

  return (
    <div className="bg-surface min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/posh"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition"
          >
            <span>&larr; Back to POSH Practice Group</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/governance/sectors" className="text-slate-600 hover:text-primary">
              Sector Overlays
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/governance/pathways" className="text-slate-600 hover:text-primary">
              Justice Pathways
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white p-8 rounded-card border border-border shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
            <FileText className="w-4 h-4 text-primary" />
            <span>PRD Section 8.35 &bull; Stakeholder Charters</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-ink mt-2">
            Statutory Rights, Duties &amp; Fair Trial Charters
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            The POSH Act 2013 balances trauma-informed protection of aggrieved women with robust natural justice and fair trial safeguards for respondents, enforceable through civil court powers (Section 11(3)).
          </p>

          {/* Charter Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6 pt-4 border-t border-border">
            <button
              onClick={() => setActiveCharter("COMPLAINANT")}
              className={`p-3 rounded-lg border text-left transition ${
                activeCharter === "COMPLAINANT"
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-slate-50 text-slate-700 border-border hover:bg-slate-100"
              }`}
            >
              <div className="text-xs font-bold">1. Complainant Charter</div>
              <div className={`text-[10px] mt-0.5 ${activeCharter === "COMPLAINANT" ? "text-slate-200" : "text-slate-500"}`}>
                Protections &amp; Interim Relief
              </div>
            </button>

            <button
              onClick={() => setActiveCharter("RESPONDENT")}
              className={`p-3 rounded-lg border text-left transition ${
                activeCharter === "RESPONDENT"
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-slate-50 text-slate-700 border-border hover:bg-slate-100"
              }`}
            >
              <div className="text-xs font-bold">2. Respondent Charter</div>
              <div className={`text-[10px] mt-0.5 ${activeCharter === "RESPONDENT" ? "text-slate-200" : "text-slate-500"}`}>
                Natural Justice &amp; Fair Trial
              </div>
            </button>

            <button
              onClick={() => setActiveCharter("IC")}
              className={`p-3 rounded-lg border text-left transition ${
                activeCharter === "IC"
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-slate-50 text-slate-700 border-border hover:bg-slate-100"
              }`}
            >
              <div className="text-xs font-bold">3. IC Code of Conduct</div>
              <div className={`text-[10px] mt-0.5 ${activeCharter === "IC" ? "text-slate-200" : "text-slate-500"}`}>
                Neutrality &amp; Sec 16 Secrecy
              </div>
            </button>

            <button
              onClick={() => setActiveCharter("EMPLOYER")}
              className={`p-3 rounded-lg border text-left transition ${
                activeCharter === "EMPLOYER"
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-slate-50 text-slate-700 border-border hover:bg-slate-100"
              }`}
            >
              <div className="text-xs font-bold">4. Employer Mandates</div>
              <div className={`text-[10px] mt-0.5 ${activeCharter === "EMPLOYER" ? "text-slate-200" : "text-slate-500"}`}>
                Sec 19 &amp; Sec 26 Penalties
              </div>
            </button>
          </div>
        </div>

        {/* Selected Charter Body */}
        {activeCharter === "COMPLAINANT" && (
          <div className="bg-white rounded-card border border-border shadow-sm p-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-ink flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-primary" />
              <span>Aggrieved Woman / Complainant Rights Charter</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 leading-relaxed">
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-primary uppercase tracking-wider">Statutory Rights</h3>
                
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <strong>Right to Confidentiality (Section 16):</strong> Complete identity protection. Your name, address, contact details and workplace department cannot be revealed to colleagues, public, or media.
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <strong>Right to Interim Protection (Section 12):</strong> Right to petition the IC for immediate transfer of self or respondent, grant of up to 3 months paid leave, and freezing of performance appraisals.
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <strong>Right to All Pleadings (Rule 7):</strong> Right to inspect all written statements, witness lists, and evidentiary exhibits submitted by the respondent.
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <strong>Support Person &amp; Safe Deposition:</strong> Right to be accompanied by a non-advocate support person and request barriers / VC during testimony to avoid direct face-to-face contact.
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-primary uppercase tracking-wider">Duties &amp; Safeguards</h3>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <strong>Statutory Limitation (Section 9(1)):</strong> Complaint must be filed within 3 months of the incident (extendable by another 3 months by the IC with reasons recorded in writing).
                </div>

                <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-red-950">
                  <strong>Section 14 Malicious Complaint Warning:</strong>
                  While mere inability to substantiate a complaint is NOT punishable, intentionally filing a false or fabricated complaint with forged documents is an offence punishable under service rules.
                </div>

                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-950">
                  <strong>Section 10 Conciliation Proviso:</strong>
                  You may choose amicable conciliation prior to inquiry; however, no monetary payment may form the basis of settlement.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeCharter === "RESPONDENT" && (
          <div className="bg-white rounded-card border border-border shadow-sm p-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-ink flex items-center gap-2">
              <Scale className="w-6 h-6 text-primary" />
              <span>Respondent Rights &amp; Fair Trial Charter</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 leading-relaxed">
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-primary uppercase tracking-wider">Natural Justice Rights</h3>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <strong>Rule 7(2) Right to Immediate Notice:</strong>
                  Within 7 working days of receiving the complaint, the IC must serve an exact, complete copy of the complaint along with all supporting documents upon the respondent.
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <strong>Rule 7(3) 10 Working Days to Reply:</strong>
                  The respondent has a statutory right to 10 working days to submit a formal written statement of defense, along with a list of documents and witnesses.
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <strong>Presumption of Innocence:</strong>
                  The respondent is presumed innocent until the IC establishes misconduct based on a preponderance of probabilities after evaluating all testimony and exhibits.
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <strong>Section 18 Right of Appeal:</strong>
                  Right to appeal the IC findings before the Appellate Authority / High Court within 90 days.
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-primary uppercase tracking-wider">Prohibitions &amp; Obligations</h3>

                <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-red-950">
                  <strong>Strict Prohibition on Retaliation:</strong>
                  Any threat, intimidation, professional ostracism, or harassment of the complainant or witnesses constitutes aggravated misconduct and separate disciplinary proceedings.
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <strong>Section 11(4) Bar on Legal Practitioners:</strong>
                  Respondents cannot be represented by practicing advocates or legal counsel before the IC.
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <strong>Written Cross-Examination:</strong>
                  All cross-examination questions must be submitted in writing to the IC to maintain dignity and prevent hostile harassment.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeCharter === "IC" && (
          <div className="bg-white rounded-card border border-border shadow-sm p-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-ink flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <span>Internal Committee Member Judicial Code of Conduct</span>
            </h2>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <h3 className="font-bold text-primary text-sm mb-1">1. Absolute Impartiality &amp; Rule Against Bias</h3>
                <p>
                  Every member must disclose any conflict of interest immediately. No member with a direct reporting relationship, personal friendship, or involvement in the underlying dispute may sit on the inquiry bench.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <h3 className="font-bold text-primary text-sm mb-1">2. Strict Section 16 Confidentiality Oath</h3>
                <p>
                  Members must execute non-disclosure undertakings. Disclosing case documents, witness names, or findings to other employees or third parties will result in immediate disqualification and statutory penalties under Section 17.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <h3 className="font-bold text-primary text-sm mb-1">3. Strict Adherence to the 90-Day Statutory Limitation</h3>
                <p>
                  Under Section 11(4), the inquiry must terminate within 90 calendar days. The committee must issue its reasoned Section 13 report within 10 days of completing the inquiry.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeCharter === "EMPLOYER" && (
          <div className="bg-white rounded-card border border-border shadow-sm p-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-ink flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              <span>Employer Statutory Mandates &amp; Section 26 Penalties</span>
            </h2>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <h3 className="font-bold text-primary text-sm mb-1">1. Section 4 Mandatory Constitution of IC</h3>
                <p>
                  Every employer with 10 or more employees must constitute an Internal Committee at all administrative units and offices. Failure to constitute an IC attracts a fine of up to ₹50,000 under Section 26(1).
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <h3 className="font-bold text-primary text-sm mb-1">2. Section 19 Prevention &amp; Awareness Duties</h3>
                <p>
                  The employer must provide a safe working environment, display order constituting IC and consequences of harassment prominently in vernacular languages, organize regular employee sensitization workshops, and facilitate the committee&apos;s inquiries.
                </p>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-950">
                <h3 className="font-bold text-red-900 text-sm mb-1">3. Section 26(2) Severe Repeat Offence Penalty</h3>
                <p>
                  If an employer convicted of an offence under the Act commits the same offence again, they are liable to twice the penalty and cancellation of their business license, government registration, or corporate incorporation.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

