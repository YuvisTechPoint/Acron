"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FileText,
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  Printer,
  Download,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Calculator,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate, formatINR } from "@/lib/utils";
import { POSHCase } from "@/lib/types";

export default function ICReportPage() {
  const params = useParams();
  const caseId = (params?.id as string) || "case-01";
  const [poshCase, setPoshCase] = useState<POSHCase | undefined>(() => platformStore.getCaseById(caseId));

  const [findingsDecision, setFindingsDecision] = useState<"charges_substantiated" | "charges_not_substantiated" | "settlement_concluded">("charges_substantiated");
  const [findingsSummary, setFindingsSummary] = useState(
    "Upon comprehensive examination of the documentary exhibits, electronic records, and verbal depositions of the parties and witnesses, the Internal Committee unanimously concludes that the allegations of unwelcome sexually coloured remarks and non-consensual conduct stand substantiated on a preponderance of probabilities."
  );

  // Section 15 Compensation Assessment Worksheet (Paise converted to Rupees for input)
  const [mentalTraumaRupees, setMentalTraumaRupees] = useState(150000);
  const [careerLossRupees, setCareerLossRupees] = useState(100000);
  const [medicalExpensesRupees, setMedicalExpensesRupees] = useState(25000);
  const [respondentCapacityRupees, setRespondentCapacityRupees] = useState(500000);
  const [recommendedEmployerAction, setRecommendedEmployerAction] = useState(
    "1. Written reprimand placed in employment dossier.\n2. Withholding of annual bonus and promotion for 18 months.\n3. Direct deduction of assessed compensation from respondent's salary.\n4. Permanent transfer to ensure zero supervisory contact."
  );

  useEffect(() => {
    const c = platformStore.getCaseById(caseId);
    if (c) setPoshCase(c);
  }, [caseId]);

  const totalCompensationRupees = mentalTraumaRupees + careerLossRupees + medicalExpensesRupees;

  const handleIssueReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!poshCase) return;

    poshCase.findingsSummary = findingsSummary;
    poshCase.icRecommendation = findingsDecision;
    if (findingsDecision === "charges_substantiated") {
      poshCase.compensationDetails = {
        mentalTraumaPaise: mentalTraumaRupees * 100,
        careerLossPaise: careerLossRupees * 100,
        medicalExpensesPaise: medicalExpensesRupees * 100,
        respondentCapacityPaise: respondentCapacityRupees * 100,
        totalAmountRupees: totalCompensationRupees,
      };
    } else {
      poshCase.compensationDetails = undefined;
    }
    poshCase.state = "REPORT_ISSUED";
    poshCase.reportSubmittedAt = new Date().toISOString();

    platformStore.updateCaseState(
      poshCase.id,
      "REPORT_ISSUED",
      `Section 13 Inquiry Report issued to Employer and Parties. Recommendation: ${findingsDecision}. Compensation assessed: ${findingsDecision === "charges_substantiated" ? formatINR(totalCompensationRupees * 100) : "None (Section 13(2))"}`
    );

    alert("Statutory Section 13 Inquiry Report submitted to Employer and Parties.");
  };

  if (!poshCase) {
    return (
      <div className="p-12 text-center text-xs text-ink-secondary">
        Case not found. <Link href="/posh/ic" className="text-primary underline">Return to IC Workspace</Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory-50 min-h-screen py-10 text-ink">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link
            href={`/posh/ic/cases/${poshCase.id}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to Case Overview ({poshCase.caseNumber})</span>
          </Link>
          <div className="flex items-center gap-2 text-xs">
            <Link
              href={`/posh/ic/cases/${poshCase.id}/interim`}
              className="text-primary font-semibold hover:underline"
            >
              Interim Relief (Sec 12) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <FileText className="w-4 h-4 text-primary" />
            <span>PRD Screen I-08 &bull; Sections 13, 14 &amp; 15 of POSH Act 2013</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            Final Inquiry Report &amp; Compensation Worksheet
          </h1>
          <p className="text-xs text-ink-secondary leading-relaxed">
            Docket <span className="font-mono font-bold text-primary">{poshCase.caseNumber}</span> &bull; On completion of the inquiry, the IC must submit its findings and recommendations to the employer within 10 days (Section 13(1)) and assess compensation in accordance with statutory factors under Section 15.
          </p>
        </div>

        <form onSubmit={handleIssueReport} className="space-y-6">
          {/* Finding Decision Selection */}
          <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
            <h2 className="font-serif font-bold text-base text-ink border-b border-border-subtle pb-3">
              1. Determination of Findings (Section 13)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setFindingsDecision("charges_substantiated")}
                className={`p-4 rounded border text-left transition-colors ${
                  findingsDecision === "charges_substantiated"
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-ink border-border hover:bg-surface"
                }`}
              >
                <div className="font-bold text-sm">Charges Substantiated</div>
                <div className="text-[11px] opacity-80 mt-1">
                  Harassment established; recommend disciplinary action and Sec 15 compensation.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFindingsDecision("charges_not_substantiated")}
                className={`p-4 rounded border text-left transition-colors ${
                  findingsDecision === "charges_not_substantiated"
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-ink border-border hover:bg-surface"
                }`}
              >
                <div className="font-bold text-sm">Not Substantiated</div>
                <div className="text-[11px] opacity-80 mt-1">
                  Insufficient evidence; recommend that no action be taken against respondent.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFindingsDecision("settlement_concluded")}
                className={`p-4 rounded border text-left transition-colors ${
                  findingsDecision === "settlement_concluded"
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-ink border-border hover:bg-surface"
                }`}
              >
                <div className="font-bold text-sm">Conciliation Settlement</div>
                <div className="text-[11px] opacity-80 mt-1">
                  Matter disposed under Section 10 terms with employer recording.
                </div>
              </button>
            </div>

            <div className="text-xs space-y-1 pt-2">
              <label className="block text-ink-secondary font-medium">Judicial Reasoning &amp; Assessment of Evidence</label>
              <textarea
                rows={5}
                value={findingsSummary}
                onChange={(e) => setFindingsSummary(e.target.value)}
                className="w-full p-3 bg-white border border-border rounded text-xs leading-relaxed focus:outline-none focus:border-primary"
                required
              />
            </div>
          </div>

          {/* Section 15 Compensation Assessment Worksheet */}
          {findingsDecision === "charges_substantiated" && (
            <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
              <div className="flex justify-between items-center border-b border-border-subtle pb-3">
                <h2 className="font-serif font-bold text-base text-ink flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-primary" />
                  <span>2. Section 15 Compensation Assessment Worksheet</span>
                </h2>
                <span className="font-serif font-bold text-primary text-base">
                  Assessed: {formatINR(totalCompensationRupees * 100)}
                </span>
              </div>

              <p className="text-xs text-ink-secondary">
                Under Section 15 of the Act, compensation payable to the aggrieved woman is determined by having regard to the mental trauma, loss in career opportunity, medical expenses, and respondent income.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-3 rounded border border-border space-y-1">
                  <label className="text-ink font-semibold">1. Mental Trauma, Pain &amp; Suffering (INR)</label>
                  <input
                    type="number"
                    value={mentalTraumaRupees}
                    onChange={(e) => setMentalTraumaRupees(parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 border border-border rounded text-xs focus:outline-none focus:border-primary"
                  />
                  <div className="text-[10px] text-ink-secondary">Section 15(a) Factor</div>
                </div>

                <div className="bg-white p-3 rounded border border-border space-y-1">
                  <label className="text-ink font-semibold">2. Loss in Career Opportunity (INR)</label>
                  <input
                    type="number"
                    value={careerLossRupees}
                    onChange={(e) => setCareerLossRupees(parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 border border-border rounded text-xs focus:outline-none focus:border-primary"
                  />
                  <div className="text-[10px] text-ink-secondary">Section 15(b) Factor</div>
                </div>

                <div className="bg-white p-3 rounded border border-border space-y-1">
                  <label className="text-ink font-semibold">3. Medical &amp; Psychiatric Expenses (INR)</label>
                  <input
                    type="number"
                    value={medicalExpensesRupees}
                    onChange={(e) => setMedicalExpensesRupees(parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 border border-border rounded text-xs focus:outline-none focus:border-primary"
                  />
                  <div className="text-[10px] text-ink-secondary">Section 15(c) Factor</div>
                </div>

                <div className="bg-white p-3 rounded border border-border space-y-1">
                  <label className="text-ink font-semibold">4. Respondent Financial Capacity / Salary (INR)</label>
                  <input
                    type="number"
                    value={respondentCapacityRupees}
                    onChange={(e) => setRespondentCapacityRupees(parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 border border-border rounded text-xs focus:outline-none focus:border-primary"
                  />
                  <div className="text-[10px] text-ink-secondary">Section 15(d) Factor</div>
                </div>
              </div>
            </div>
          )}

          {/* Recommended Employer Actions */}
          <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-3 text-xs">
            <h2 className="font-serif font-bold text-base text-ink">
              3. Recommended Disciplinary Actions (Section 13(3))
            </h2>
            <textarea
              rows={4}
              value={recommendedEmployerAction}
              onChange={(e) => setRecommendedEmployerAction(e.target.value)}
              className="w-full p-3 bg-white border border-border rounded text-xs font-mono leading-relaxed focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 border border-border rounded text-xs font-semibold text-ink hover:bg-white flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Final Report</span>
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Sign &amp; Submit Section 13 Report</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
