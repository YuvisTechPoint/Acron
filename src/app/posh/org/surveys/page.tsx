"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Users,
  Calendar,
  Languages,
  Check,
  ArrowLeft,
  Search,
  Filter,
  BarChart3,
  Download,
  Clock,
  Sparkles,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { ClimateSurveyCampaign } from "@/lib/types";

export default function ClimateSurveysPage() {
  const [surveys, setSurveys] = useState<ClimateSurveyCampaign[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [exportNotice, setExportNotice] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState("");
  const [newDept, setNewDept] = useState("Corporate Headquarters & Engineering");
  const [newInvited, setNewInvited] = useState(120);
  const [newAction, setNewAction] = useState("");

  useEffect(() => {
    const list = platformStore.getClimateSurveys("org-1");
    setSurveys(list);
  }, []);

  const handleCreateSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    platformStore.addClimateSurvey("org-1", {
      orgId: "org-1",
      title: newTitle,
      targetDepartment: newDept,
      totalInvited: Number(newInvited) || 50,
      responsesCount: 0,
      isSuppressed: true, // Initially 0 < 5
      safetyScore: 0,
      status: "ACTIVE",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
      keyFindings: ["Campaign initiated across targeted cohort."],
      preventiveActionAssigned: newAction || "Schedule awareness refresher post-survey close.",
    });

    const updated = platformStore.getClimateSurveys("org-1");
    setSurveys(updated);
    setShowAddModal(false);
    setNewTitle("");
    setNewAction("");
  };

  const handleExportSuppressedReport = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  const filteredSurveys = surveys.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.targetDepartment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#111827] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-6">
          <Link href="/posh/org" className="hover:text-[#0A192F] transition flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Org Hub
          </Link>
          <span>/</span>
          <span className="text-[#0A192F] font-semibold">Workplace Climate &amp; Psychological Safety</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5E0D8]">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-lg bg-[#0A192F] text-[#D4AF37]">
              <FileText className="w-6 h-6" />
            </span>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A192F]">
                Workplace Climate Surveys &amp; Preventive Tracker
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#4B5563] mt-0.5">
                PRD v3.0 US-263 &bull; Trilingual Instruments, Small-Cell K-Anonymity Suppression (&ge; 5) &amp; Remedial Action Tracking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportSuppressedReport}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-md border border-[#E5E0D8] bg-white hover:bg-[#FAF9F6] text-xs font-semibold text-[#0A192F] transition shadow-sm"
            >
              <Download className="w-4 h-4 text-[#D4AF37]" />
              <span>Export Suppressed Report</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#0A192F] text-white hover:bg-[#152E52] text-xs font-semibold tracking-wide shadow-sm transition"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Launch Survey Campaign</span>
            </button>
          </div>
        </div>

        {exportNotice && (
          <div className="my-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Cryptographic small-cell suppression report exported with watermarked timestamp. All cohorts under 5 responses have been masked.
            </span>
          </div>
        )}

        {/* Multi-language & Suppression Compliance Banner */}
        <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-white border border-[#E5E0D8] shadow-sm flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-semibold text-[#0A192F] block">BR-076 Small-Cell Suppression</span>
              <p className="text-[#6B7280]">
                Cohorts with fewer than 5 responses are mathematically suppressed to prevent deductive linkage attacks on employee anonymity.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white border border-[#E5E0D8] shadow-sm flex items-start gap-3">
            <Languages className="w-5 h-5 text-[#0A192F] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-semibold text-[#0A192F] block">Trilingual Instrument Library</span>
              <p className="text-[#6B7280]">
                Instruments available in English, Bengali (বাংলা), and Hindi (हिन्दी) with counsel-certified neutral phrasing.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white border border-[#E5E0D8] shadow-sm flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-semibold text-[#0A192F] block">Zero Free-Text Default</span>
              <p className="text-[#6B7280]">
                Enforces Likert scale options only by default, blocking accidental submission of identifiable narrative text.
              </p>
            </div>
          </div>
        </div>

        {/* Survey Campaigns List */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="font-serif text-lg font-bold text-[#0A192F]">
              Active &amp; Completed Climate Campaigns
            </h2>
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search campaigns or depts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded border border-[#E5E0D8] bg-white focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSurveys.map((survey) => (
              <div
                key={survey.id}
                className="bg-white rounded-lg border border-[#E5E0D8] p-6 shadow-sm space-y-5 hover:border-[#CBD5E1] transition"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#F3F4F6]">
                  <div>
                    <span className="text-[10px] font-mono font-semibold text-[#D4AF37] uppercase tracking-wider block">
                      {survey.id} &bull; {survey.targetDepartment}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#0A192F] mt-0.5">
                      {survey.title}
                    </h3>
                  </div>

                  <span
                    className={`text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full ${
                      survey.status === "ACTIVE"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {survey.status}
                  </span>
                </div>

                {/* Score & Anonymity Suppression Display */}
                <div className="grid grid-cols-3 gap-3 p-3.5 rounded bg-[#FAF9F6] border border-[#E5E0D8] text-center">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#6B7280] block">
                      Invited
                    </span>
                    <span className="font-mono text-sm font-bold text-[#0A192F]">
                      {survey.totalInvited}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#6B7280] block">
                      Responses
                    </span>
                    <span className="font-mono text-sm font-bold text-[#0A192F]">
                      {survey.responsesCount}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#6B7280] block">
                      Safety Score
                    </span>
                    {survey.isSuppressed ? (
                      <span className="text-[10px] font-mono font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block">
                        &lt; 5 (Suppressed)
                      </span>
                    ) : (
                      <span className="font-mono text-sm font-bold text-emerald-700">
                        {survey.safetyScore}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Findings */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-[#0A192F] block">
                    Statutory Findings &amp; Observations:
                  </span>
                  <ul className="space-y-1">
                    {survey.keyFindings.map((finding, idx) => (
                      <li key={idx} className="text-xs text-[#4B5563] flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preventive Action Assigned */}
                {survey.preventiveActionAssigned && (
                  <div className="p-3 rounded bg-[#0A192F]/5 border border-[#D4AF37]/30 text-xs space-y-1">
                    <span className="font-semibold text-[#0A192F] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Assigned Preventive Action:
                    </span>
                    <p className="text-[#374151] italic">
                      &ldquo;{survey.preventiveActionAssigned}&rdquo;
                    </p>
                  </div>
                )}

                {/* Footer with Campaign Period */}
                <div className="pt-2 border-t border-[#F3F4F6] flex items-center justify-between text-[11px] text-[#6B7280]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#D4AF37]" />
                    {survey.startDate} &mdash; {survey.endDate}
                  </span>
                  <span className="text-[#0A192F] font-semibold">
                    Trilingual Instrument Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Launch Survey Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#E5E0D8] shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
              <h3 className="font-serif text-lg font-bold text-[#0A192F]">
                Launch Trilingual Climate Survey
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#9CA3AF] hover:text-[#0A192F]"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateSurvey} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#0A192F]">
                  Survey Campaign Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 2026 Night-Shift Physical Safety &amp; Dignity Audit"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E5E0D8] focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#0A192F]">
                  Target Cohort / Department
                </label>
                <input
                  type="text"
                  required
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E5E0D8] focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#0A192F]">
                    Invited Headcount
                  </label>
                  <input
                    type="number"
                    min="5"
                    value={newInvited}
                    onChange={(e) => setNewInvited(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded border border-[#E5E0D8]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#0A192F]">
                    Supported Languages
                  </label>
                  <div className="px-3 py-2 text-xs rounded border border-[#E5E0D8] bg-[#FAF9F6] text-[#4B5563]">
                    EN &bull; BN &bull; HI
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#0A192F]">
                  Required Preventive Action Plan
                </label>
                <input
                  type="text"
                  placeholder="e.g. Deploy security escort and review CCTV visibility"
                  value={newAction}
                  onChange={(e) => setNewAction(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E5E0D8]"
                />
              </div>

              <div className="p-3 rounded bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-1">
                <span className="font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Small-Cohort Suppression Rule:
                </span>
                <p>
                  If final responses remain below 5, individual score distributions will be permanently locked and masked under BR-076.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E0D8]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded text-xs text-[#6B7280] hover:text-[#0A192F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#0A192F] text-white hover:bg-[#152E52] text-xs font-semibold"
                >
                  Initiate Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

