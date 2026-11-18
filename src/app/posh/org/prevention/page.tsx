"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  BarChart3,
  Users,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Building,
  Lock,
  Download,
  Plus,
  X,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import { downloadFile } from "@/lib/utils";

interface RiskFactor {
  area: string;
  level: "Low Risk" | "Medium Risk" | "Controlled Risk" | "High Risk";
  finding: string;
  action: string;
}

export default function PoshOrgPreventionPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedOrgId, setSelectedOrgId] = useState("org-1");
  const orgs = platformStore.getOrganizations();
  const activeOrg = orgs.find((o) => o.id === selectedOrgId) || orgs[0];

  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>(() =>
    platformStore.getOrgRiskFactors(selectedOrgId)
  );

  const handleOrgChange = (orgId: string) => {
    setSelectedOrgId(orgId);
    setRiskFactors(platformStore.getOrgRiskFactors(orgId));
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [newArea, setNewArea] = useState("");
  const [newLevel, setNewLevel] = useState<RiskFactor["level"]>("Medium Risk");
  const [newFinding, setNewFinding] = useState("");
  const [newAction, setNewAction] = useState("");

  const handleAddRiskFactor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArea.trim() || !newFinding.trim() || !newAction.trim()) {
      toast({
        title: "Validation Incomplete",
        description: "Please specify the audit area, assessment finding, and remedial action.",
        variant: "warning",
      });
      return;
    }

    const newFactor: RiskFactor = {
      area: newArea.trim(),
      level: newLevel,
      finding: newFinding.trim(),
      action: newAction.trim(),
    };

    platformStore.addOrgRiskFactor(selectedOrgId, newFactor);
    setRiskFactors(platformStore.getOrgRiskFactors(selectedOrgId));
    setNewArea("");
    setNewFinding("");
    setNewAction("");
    setShowAddModal(false);

    toast({
      title: "Prevention Safeguard Added",
      description: `New preventive directive registered for ${activeOrg.name}.`,
      variant: "success",
    });
  };

  const handleExportMatrix = () => {
    const reportContent = [
      "===========================================================",
      `  SECTION 19 HARASSMENT PREVENTION & RISK AUDIT MATRIX`,
      "===========================================================",
      `Employer / Entity: ${activeOrg.name} (${activeOrg.code})`,
      `Audit Date: ${new Date().toLocaleDateString("en-IN")}`,
      `Auditing Legal Counsel: Acorn Legal Consultants (Chambers Registry)`,
      `Privacy Standard: k-Anonymity (Threshold >= 5 respondents)`,
      "-----------------------------------------------------------",
      "SUMMARY FINDINGS & REMEDIAL DIRECTIVES:",
      ...riskFactors.map(
        (rf, idx) =>
          `\n[${idx + 1}] Area: ${rf.area}\n    Risk Level: ${rf.level}\n    Finding: ${rf.finding}\n    Mandated Remedial Action: ${rf.action}`
      ),
      "\n-----------------------------------------------------------",
      "Statutory Mandate: Section 19(a)-(h) Sexual Harassment of Women at",
      "Workplace (Prevention, Prohibition and Redressal) Act, 2013.",
      "Strictly Confidential & Legally Privileged Document.",
      "===========================================================",
    ].join("\n");

    downloadFile(
      `POSH-Section-19-Risk-Matrix-${activeOrg.code}.txt`,
      reportContent
    );

    toast({
      title: "Risk Assessment Matrix Exported",
      description: "Section 19 prevention assessment report downloaded successfully.",
      variant: "success",
    });
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-10 text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link
            href="/posh/org"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-primary transition-colors min-h-[44px] px-2 -ml-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to Organisation Console ({activeOrg.name})</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/posh/org/plan"
              className="text-primary font-semibold hover:underline min-h-[44px] flex items-center px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              Retainer Subscription (O-09) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                <ShieldAlert className="w-4 h-4 text-primary" />
                <span>PRD Screen O-08 &bull; Section 19 Prevention &amp; Safety Risk Audits</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
                Workplace Climate Surveys &amp; Harassment Prevention Analytics
              </h1>
              <p className="text-xs text-ink-secondary mt-1">
                Employer: <span className="font-semibold text-ink">{activeOrg.name}</span> &bull; k-Anonymity privacy protected (minimum 5 respondents per cohort).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor="org-select" className="sr-only">Select Organisation</label>
              <select
                id="org-select"
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

              <button
                type="button"
                onClick={handleExportMatrix}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] border border-border bg-white rounded text-xs font-semibold hover:bg-surface text-ink transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Download className="w-3.5 h-3.5 text-primary" />
                <span>Export Matrix</span>
              </button>
            </div>
          </div>
        </div>

        {/* k-Anonymity Privacy Guarantee Banner */}
        <div className="p-4 bg-white rounded-card border border-border shadow-card text-xs flex items-start gap-3">
          <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-serif font-bold text-ink">
              Cryptographic k-Anonymity &amp; Zero-Knowledge Safeguards (PRD Section 8.24)
            </div>
            <p className="text-ink-secondary leading-relaxed">
              Survey responses are completely dissociated from employee identity. Aggregate scores are rendered only if a department or cohort contains 5 or more respondents, preventing any retaliatory de-anonymization.
            </p>
          </div>
        </div>

        {/* Climate Survey Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">Psychological Safety Index</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif font-bold text-3xl text-emerald-700">88%</span>
              <span className="text-xs text-emerald-600 font-semibold">&uarr; +4% YoY</span>
            </div>
            <p className="text-[11px] text-ink-secondary mt-1">
              Employees feel confident reporting grievances without reprisal.
            </p>
          </div>

          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">IC Awareness Index</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif font-bold text-3xl text-primary">96%</span>
              <span className="text-xs text-primary font-semibold">High Visibility</span>
            </div>
            <p className="text-[11px] text-ink-secondary mt-1">
              Workforce knows IC members and contact email coordinates.
            </p>
          </div>

          <div className="bg-surface p-5 rounded-card border border-border shadow-card">
            <div className="text-xs text-ink-secondary">Survey Participation Rate</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif font-bold text-3xl text-ink">82%</span>
              <span className="text-xs text-ink-secondary font-medium">344 Responses</span>
            </div>
            <p className="text-[11px] text-ink-secondary mt-1">
              Statistically valid sample size across all 4 departments.
            </p>
          </div>
        </div>

        {/* Harassment Risk Zones & Preventive Action Plans */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-border-subtle pb-3">
            <h2 className="font-serif font-bold text-base text-ink">
              Workplace Risk Factor Matrix &amp; Remedial Roadmap
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="px-3.5 py-2 min-h-[44px] bg-white border border-border text-ink text-xs font-semibold rounded hover:bg-surface flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Plus className="w-3.5 h-3.5 text-primary" />
                <span>Add Preventive Directive</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  toast({
                    title: "Survey Campaign Initiated",
                    description: "Proceeding to anonymous workplace climate survey control console.",
                    variant: "info",
                  });
                  router.push("/posh/org/surveys");
                }}
                className="px-4 py-2 min-h-[44px] bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 focus-visible:ring-offset-2"
              >
                Launch Climate Survey
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {riskFactors.map((r, i) => (
              <div key={i} className="bg-white p-4 rounded border border-border space-y-2 text-xs">
                <div className="flex justify-between items-center border-b border-border-subtle pb-2">
                  <span className="font-serif font-bold text-ink text-sm">{r.area}</span>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                    r.level === "Low Risk"
                      ? "bg-emerald-100 text-emerald-800"
                      : r.level === "Controlled Risk"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-amber-100 text-amber-900"
                  }`}>
                    {r.level}
                  </span>
                </div>
                <div className="text-ink-secondary leading-relaxed">
                  <strong>Assessment Finding:</strong> {r.finding}
                </div>
                <div className="text-primary font-medium leading-relaxed">
                  <strong>Recommended Preventive Measure:</strong> {r.action}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for adding preventive directive */}
        {showAddModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="prevent-modal-title"
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in"
          >
            <div className="bg-white rounded-card border border-border shadow-raised max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 id="prevent-modal-title" className="font-serif font-bold text-base text-ink">
                  Register Preventive Safeguard / Audit Action
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  aria-label="Close dialog"
                  className="p-2 min-h-[44px] min-w-[44px] hover:bg-border rounded text-ink-secondary flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddRiskFactor} className="space-y-4 text-xs">
                <div>
                  <label htmlFor="audit-area" className="block font-bold text-ink mb-1">
                    Workplace Area / Operational Touchpoint <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="audit-area"
                    type="text"
                    required
                    placeholder="e.g. Off-site client conferences or late cab routing"
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    className="w-full px-3 py-2.5 min-h-[44px] border border-border rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="risk-level" className="block font-bold text-ink mb-1">Risk Severity Level</label>
                  <select
                    id="risk-level"
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as any)}
                    className="w-full px-3 py-2.5 min-h-[44px] border border-border rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-white"
                  >
                    <option value="Low Risk">Low Risk</option>
                    <option value="Controlled Risk">Controlled Risk</option>
                    <option value="Medium Risk">Medium Risk</option>
                    <option value="High Risk">High Risk</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="audit-finding" className="block font-bold text-ink mb-1">
                    Assessment Finding / Audit Observation <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="audit-finding"
                    rows={3}
                    required
                    placeholder="Describe specific climate feedback or operational vulnerability observed..."
                    value={newFinding}
                    onChange={(e) => setNewFinding(e.target.value)}
                    className="w-full p-2.5 border border-border rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary leading-relaxed"
                  />
                </div>

                <div>
                  <label htmlFor="remedial-action" className="block font-bold text-ink mb-1">
                    Mandated Preventive Measure / Directive <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="remedial-action"
                    rows={3}
                    required
                    placeholder="Actionable remedial step mandated per Section 19 duties..."
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value)}
                    className="w-full p-2.5 border border-border rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary leading-relaxed"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 min-h-[44px] border border-border rounded text-ink-secondary hover:bg-surface font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 min-h-[44px] bg-primary text-white rounded font-bold hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-500 focus-visible:ring-offset-2"
                  >
                    Save Directive
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
