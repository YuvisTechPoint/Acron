"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, ArrowLeft, CheckCircle2, Eye, Edit2, Save, X } from "lucide-react";

interface TemplateItem {
  code: string;
  name: string;
  stage: string;
  lang: string;
  version: string;
  body: string;
}

const INITIAL_TEMPLATES: TemplateItem[] = [
  { code: "DOC-01", name: "Written Complaint Record", stage: "Intake", lang: "EN, BN, HI", version: "v2.0", body: "IN THE MATTER OF COMPLAINT UNDER SECTION 9 OF POSH ACT 2013\n\nTo: The Internal Committee\nComplainant: [Full Name of Aggrieved Woman]\nRespondent: [Full Name & Designation]\nDate of Occurrence: [Date]\n\n1. Statement of Incidents and Allegations...\n2. List of Exhibits and Supporting Documents..." },
  { code: "DOC-02", name: "Acknowledgement of Complaint", stage: "Intake", lang: "EN, BN, HI", version: "v2.0", body: "ACKNOWLEDGEMENT OF FORMAL INTAKE\nRef: ACN-POSH-INTAKE\n\nThis is to acknowledge receipt of the written complaint dated [Date] submitted before the Internal Committee. In accordance with Rule 7 of the POSH Rules 2013, a copy will be forwarded to the Respondent within 7 working days." },
  { code: "DOC-05", name: "IC Constitution Order (Sec 4)", stage: "Setup", lang: "EN", version: "v2.0", body: "OFFICE ORDER: CONSTITUTION OF INTERNAL COMMITTEE UNDER SECTION 4\n\nPursuant to the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, the following Internal Committee is hereby constituted:\n1. Presiding Officer: [Name] (Senior Woman Employee)\n2. External Member: Adv. Debjani Sen (Acorn Legal Consultants)" },
  { code: "DOC-06", name: "IC Confidentiality Undertaking (Sec 16)", stage: "Case", lang: "EN", version: "v2.0", body: "CONFIDENTIALITY UNDERTAKING UNDER SECTION 16 OF POSH ACT\n\nI hereby solemnly declare that I shall maintain absolute confidentiality concerning all contents of the complaint, evidence, witness testimonies, and findings. I understand that any disclosure attracts penal action under Section 17." },
  { code: "DOC-11", name: "Conciliation Terms & Outcome Record (Sec 10)", stage: "Conciliation", lang: "EN", version: "v2.0", body: "RECORD OF CONCILIATION UNDER SECTION 10\n\nNote: In strict accordance with the Proviso to Section 10(1), no monetary settlement has been made or accepted as the basis of conciliation." },
  { code: "DOC-12", name: "Notice of Inquiry to Respondent (Rule 7)", stage: "Notice", lang: "EN, BN, HI", version: "v2.0", body: "FORMAL NOTICE OF INQUIRY TO RESPONDENT\n\nYou are hereby provided with a copy of the complaint filed under Section 9. You are required to submit your written statement with list of documents and witnesses within 10 working days from receipt hereof." },
  { code: "DOC-14", name: "Interim Relief Recommendation (Sec 12)", stage: "Interim", lang: "EN", version: "v2.0", body: "INTERIM MEASURES RECOMMENDATION UNDER SECTION 12\n\nThe IC hereby recommends to the Employer that pending the inquiry:\n- Transfer the aggrieved woman or respondent to another workplace; or\n- Grant leave to the aggrieved woman up to 3 months." },
  { code: "DOC-16", name: "Hearing Notice & Summons", stage: "Inquiry", lang: "EN, BN", version: "v2.0", body: "SUMMONS AND NOTICE OF FORMAL HEARING\n\nYou are required to appear in person before the Internal Committee on [Date] at [Time] at [Venue/Virtual Link]. Failure to appear without prior written leave may result in ex-parte proceedings." },
  { code: "DOC-19", name: "Hearing Minutes of Meeting", stage: "Inquiry", lang: "EN", version: "v2.0", body: "MINUTES OF PROCEEDINGS OF INTERNAL COMMITTEE\nHearing No: [Number]\nPresent: Presiding Officer, External Member, Members, Stenographer.\nSummary of depositions taken under oath..." },
  { code: "DOC-22", name: "Final Statutory Inquiry Report (Sec 13)", stage: "Report", lang: "EN", version: "v2.0", body: "INQUIRY REPORT UNDER SECTION 13 OF POSH ACT 2013\n\n1. Brief Facts & Background\n2. Findings on each Allegation\n3. Determination & Statutory Recommendations\n4. Directions to Employer" },
  { code: "DOC-31", name: "Section 21 Annual Report for District Officer", stage: "Reporting", lang: "EN", version: "v2.0", body: "ANNUAL REPORT TO DISTRICT OFFICER (SECTION 21)\nReporting Year: [Calendar Year]\n1. Number of complaints received: [N]\n2. Number disposed of within 90 days: [N]\n3. Number of workshops conducted: [N]" },
  { code: "DOC-34", name: "Notice of Penal Consequences for Display (Sec 19)", stage: "Display", lang: "EN, BN, HI", version: "v2.0", body: "STATUTORY DISPLAY NOTICE UNDER SECTION 19(b)\nSexual Harassment at Workplace is strictly prohibited. Aggrieved persons may approach the Internal Committee at [Email/Phone]. Retaliation of any form is an independent disciplinary offence." },
];

export default function LegalTemplatesConsolePage() {
  const [templates, setTemplates] = useState<TemplateItem[]>(INITIAL_TEMPLATES);
  const [editingTemplate, setEditingTemplate] = useState<TemplateItem | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTemplate) return;
    setTemplates((prev) =>
      prev.map((t) => (t.code === editingTemplate.code ? editingTemplate : t))
    );
    setEditingTemplate(null);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-8 text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-navy-700 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-brass-500" />
            <span>Back to Firm Dashboard</span>
          </Link>
          <span className="text-[11px] font-mono bg-navy-50 text-navy-800 border border-navy-200 px-2 py-0.5 rounded">
            Legal Console &bull; Section 8.26
          </span>
        </div>

        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-card">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-navy-700 font-bold">
              <FileText className="w-4 h-4 text-brass-500" />
              <span>Statutory Templates Library</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink-950 mt-1">
              Legal Notices, Summons &amp; Reports CMS
            </h1>
            <p className="text-xs text-ink-secondary mt-1">
              Customize standard wording, statutory clauses, and notice frameworks for all 12 procedural stages.
            </p>
          </div>

          <Link
            href="/admin/legal/rules"
            className="px-3.5 py-2 border border-border rounded-btn text-xs font-semibold hover:bg-slate-50 text-navy-700 transition"
          >
            &larr; View Rules Engine
          </Link>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-btn text-xs flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">Template text updated and applied to document generator.</span>
          </div>
        )}

        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-border text-[11px] uppercase tracking-wider text-ink-secondary font-semibold">
              <tr>
                <th className="p-3.5">Code</th>
                <th className="p-3.5">Template Name</th>
                <th className="p-3.5">Workflow Stage</th>
                <th className="p-3.5">Languages</th>
                <th className="p-3.5">Version</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {templates.map((t) => (
                <tr key={t.code} className="hover:bg-slate-50/60 transition">
                  <td className="p-3.5 font-mono font-bold text-navy-700">{t.code}</td>
                  <td className="p-3.5 font-semibold text-ink-950">{t.name}</td>
                  <td className="p-3.5 text-ink-secondary">{t.stage}</td>
                  <td className="p-3.5 text-ink-secondary font-semibold">{t.lang}</td>
                  <td className="p-3.5 font-mono text-[11px] text-brass-600 font-bold">{t.version}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setEditingTemplate({ ...t })}
                      className="px-3 py-1 bg-ivory-50 border border-border rounded text-[11px] font-semibold text-navy-700 hover:bg-navy-50 flex items-center gap-1.5 ml-auto transition"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-brass-500" />
                      <span>Edit &amp; Preview</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal: Edit Template */}
        {editingTemplate && (
          <div className="fixed inset-0 bg-ink-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-card max-w-2xl w-full p-6 space-y-4 shadow-xl border border-border text-xs max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <div>
                  <span className="font-mono font-bold text-navy-700 text-xs">{editingTemplate.code}</span>
                  <h3 className="font-serif text-lg font-bold text-ink-950">{editingTemplate.name}</h3>
                </div>
                <button onClick={() => setEditingTemplate(null)} className="p-1 text-slate-400 hover:text-ink">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Stage</label>
                    <input
                      type="text"
                      value={editingTemplate.stage}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, stage: e.target.value })}
                      className="w-full p-2 border border-border rounded bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Languages</label>
                    <input
                      type="text"
                      value={editingTemplate.lang}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, lang: e.target.value })}
                      className="w-full p-2 border border-border rounded bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold block mb-1">Template Legal Drafting Text</label>
                  <textarea
                    rows={12}
                    value={editingTemplate.body}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, body: e.target.value })}
                    className="w-full p-3 border border-border rounded font-mono text-xs leading-relaxed"
                  />
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span className="text-[10px] text-ink-muted">
                    Reviewed against Bar Council &amp; POSH Act statutory standards.
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingTemplate(null)}
                      className="px-4 py-2 border border-border rounded text-slate-600 hover:bg-slate-50 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-navy-700 hover:bg-blue-600 text-white rounded font-bold flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Template</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
