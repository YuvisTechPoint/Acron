"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Users,
  Download,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Plus,
  X,
  Calendar,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { downloadFile } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";
import type { OrgCourseItem } from "@/lib/types";

export default function PoshOrgTrainingPage() {
  const { toast } = useToast();
  const [selectedOrgId, setSelectedOrgId] = useState("org-1");
  const orgs = platformStore.getOrganizations();
  const activeOrg = orgs.find((o) => o.id === selectedOrgId) || orgs[0];

  const [courses, setCourses] = useState<OrgCourseItem[]>(() =>
    platformStore.getOrgCourses("org-1")
  );

  const handleOrgChange = (newOrgId: string) => {
    setSelectedOrgId(newOrgId);
    setCourses(platformStore.getOrgCourses(newOrgId));
  };

  const [showEnrolModal, setShowEnrolModal] = useState(false);
  const [batchTitle, setBatchTitle] = useState("");
  const [batchTarget, setBatchTarget] = useState("");
  const [batchHeadcount, setBatchHeadcount] = useState(25);

  const handleEnrolBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchTitle.trim() || !batchTarget.trim()) {
      toast({
        title: "Validation Incomplete",
        description: "Please enter workshop curriculum title and target employee group.",
        variant: "warning",
      });
      return;
    }

    const newCode = `LMS-MOD-${Math.floor(100 + Math.random() * 900)}-2026`;
    const newCourse: OrgCourseItem = {
      code: newCode,
      title: batchTitle.trim(),
      target: batchTarget.trim(),
      completionRate: 0,
      totalAssigned: batchHeadcount,
      completedCount: 0,
      status: "Enrolment Dispatched",
    };

    platformStore.addOrgCourse(selectedOrgId, newCourse);
    setCourses(platformStore.getOrgCourses(selectedOrgId));
    setShowEnrolModal(false);
    setBatchTitle("");
    setBatchTarget("");

    toast({
      title: "Sensitisation Workshop Scheduled",
      description: `Training batch ${newCode} dispatched to ${batchHeadcount} employees of ${activeOrg.name}.`,
      variant: "success",
    });
  };

  const totalAssignedAll = courses.reduce((acc, c) => acc + c.totalAssigned, 0);
  const totalCompletedAll = courses.reduce((acc, c) => acc + c.completedCount, 0);
  const overallRate = totalAssignedAll > 0 ? Math.round((totalCompletedAll / totalAssignedAll) * 1000) / 10 : 0;

  return (
    <div className="bg-ivory-50 min-h-screen py-10 text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
          <Link
            href="/posh/org"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-primary transition-colors min-h-[44px] px-2 -ml-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to Organisation Console ({activeOrg.name})</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/posh/org/actions"
              className="text-primary font-semibold hover:underline min-h-[44px] flex items-center px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              Employer Actions (O-06) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                <Award className="w-4 h-4 text-primary" />
                <span>PRD Screen O-05 &bull; Section 19(c) Employee Sensitisation LMS</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
                LMS Training Dashboard &amp; Statutory Sensitisation Ledger
              </h1>
              <p className="text-xs text-ink-secondary mt-1">
                Employer: <span className="font-semibold text-ink">{activeOrg.name}</span> &bull; Mandatory employee compliance training and IC member competence certification.
              </p>
            </div>

            <label htmlFor="org-select-training" className="sr-only">Select Employer Organisation</label>
            <select
              id="org-select-training"
              value={selectedOrgId}
              onChange={(e) => handleOrgChange(e.target.value)}
              className="px-3 py-2 min-h-[44px] bg-white border border-border rounded text-xs font-semibold text-ink shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {orgs.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Overall Completion Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">Overall Workforce Trained</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif font-bold text-3xl text-emerald-700">{overallRate}%</span>
              <span className="text-xs text-emerald-600 font-semibold">&uarr; Compliant</span>
            </div>
            <p className="text-[11px] text-ink-secondary mt-1">
              {totalCompletedAll} of {totalAssignedAll} active learners certified.
            </p>
          </div>

          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">IC Committee Master Training</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif font-bold text-3xl text-primary">100%</span>
              <span className="text-xs text-primary font-semibold">Certified</span>
            </div>
            <p className="text-[11px] text-ink-secondary mt-1">
              All 5 IC members certified by Acorn Legal.
            </p>
          </div>

          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">Annual Recertification Window</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif font-bold text-3xl text-ink">31 Dec</span>
              <span className="text-xs text-ink-secondary font-medium">2026 Cycle</span>
            </div>
            <p className="text-[11px] text-ink-secondary mt-1">
              Automatic re-enrolment 30 days before expiration.
            </p>
          </div>
        </div>

        {/* Assigned Courses List */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-border-subtle pb-3">
            <h2 className="font-serif font-bold text-base text-ink">
              Mandatory Curriculum &amp; Training Tracks ({courses.length})
            </h2>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowEnrolModal(true)}
                className="px-3.5 py-2 min-h-[44px] bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 focus-visible:ring-offset-2"
              >
                <Plus className="w-3.5 h-3.5 text-accent" />
                <span>Schedule Sensitisation Workshop</span>
              </button>
              <Link
                href="/lp/posh-training"
                className="text-xs text-primary font-semibold hover:underline min-h-[44px] flex items-center px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                Browse Enterprise Modules &rarr;
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {courses.map((c) => (
              <div key={c.code} className="bg-white p-5 rounded border border-border space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-primary">{c.code}</span>
                    <h3 className="font-serif font-bold text-base text-ink mt-0.5">{c.title}</h3>
                    <div className="text-ink-secondary mt-0.5">Audience: {c.target}</div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                    c.completionRate >= 90
                      ? "bg-emerald-100 text-emerald-800"
                      : c.completionRate > 0
                      ? "bg-amber-100 text-amber-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {c.status}
                  </span>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-ink-secondary">Progress:</span>
                    <span className="font-bold text-ink">
                      {c.completedCount} / {c.totalAssigned} ({c.completionRate}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-surface rounded-full overflow-hidden border border-border-subtle">
                    <div
                      className={`h-full ${c.completionRate >= 90 ? "bg-emerald-600" : c.completionRate > 0 ? "bg-amber-600" : "bg-blue-600"}`}
                      style={{ width: `${Math.max(4, c.completionRate)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t border-border-subtle">
                  <span className="text-[11px] text-ink-secondary">
                    Standard Assessment Passmark: 80% &bull; Interactive Scenarios Included
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const csvContent = [
                        "course_code,course_title,target_audience,total_assigned,completed_count,completion_rate_pct,statutory_mandate",
                        `"${c.code}","${c.title}","${c.target}",${c.totalAssigned},${c.completedCount},${c.completionRate}%,"Section 19(c) POSH Act 2013"`,
                      ].join("\n");
                      downloadFile(`LMS-Completion-Ledger-${c.code}.csv`, csvContent, "text/csv;charset=utf-8");
                      toast({
                        title: "Audit Ledger Exported",
                        description: `Audit completion ledger for ${c.code} exported in CSV format.`,
                        variant: "success",
                      });
                    }}
                    className="px-3 py-2 min-h-[44px] border border-border rounded hover:bg-surface text-ink flex items-center gap-1.5 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Download className="w-3.5 h-3.5 text-primary" />
                    <span>Export Completion Ledger</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Workshop / Enrol Modal */}
        {showEnrolModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="enrol-modal-title"
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in"
          >
            <div className="bg-white rounded-card border border-border shadow-raised max-w-lg w-full p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 id="enrol-modal-title" className="font-serif font-bold text-base text-ink">
                  Schedule Section 19(c) Sensitisation Workshop
                </h3>
                <button
                  type="button"
                  onClick={() => setShowEnrolModal(false)}
                  aria-label="Close dialog"
                  className="p-2 min-h-[44px] min-w-[44px] hover:bg-border rounded text-ink-secondary flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleEnrolBatch} className="space-y-4 text-xs">
                <div>
                  <label htmlFor="batch-title" className="block font-bold text-ink mb-1">
                    Workshop Module / Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="batch-title"
                    type="text"
                    required
                    placeholder="e.g. Q1 2026 Lateral Hires Sensitisation Intensive"
                    value={batchTitle}
                    onChange={(e) => setBatchTitle(e.target.value)}
                    className="w-full px-3 py-2.5 min-h-[44px] border border-border rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="batch-target" className="block font-bold text-ink mb-1">
                    Target Cohort / Department <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="batch-target"
                    type="text"
                    required
                    placeholder="e.g. Engineering & Product New Joiners (Kolkata & Remote)"
                    value={batchTarget}
                    onChange={(e) => setBatchTarget(e.target.value)}
                    className="w-full px-3 py-2.5 min-h-[44px] border border-border rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="batch-count" className="block font-bold text-ink mb-1">
                    Number of Learners / Seats <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="batch-count"
                    type="number"
                    min={1}
                    required
                    value={batchHeadcount}
                    onChange={(e) => setBatchHeadcount(Number(e.target.value) || 1)}
                    className="w-full px-3 py-2.5 min-h-[44px] border border-border rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowEnrolModal(false)}
                    className="px-4 py-2 min-h-[44px] border border-border rounded text-ink-secondary hover:bg-surface font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 min-h-[44px] bg-primary text-white rounded font-bold hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 focus-visible:ring-offset-2"
                  >
                    Dispatch Enrolment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

