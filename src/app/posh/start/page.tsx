"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Building,
  Scale,
  ExternalLink,
} from "lucide-react";

export default function PoshApplicabilityWizard() {
  const [step, setStep] = useState(1);
  const [employeeCountOver10, setEmployeeCountOver10] = useState<boolean | null>(null);
  const [isRespondentTheEmployer, setIsRespondentTheEmployer] = useState<boolean | null>(null);
  const [within3Months, setWithin3Months] = useState<boolean | null>(null);
  const [workplaceRelated, setWorkplaceRelated] = useState<boolean | null>(null);

  const isComplete = step === 5;

  // Evaluation logic per POSH Act 2013
  const isRoutedToLocalCommittee = !employeeCountOver10 || isRespondentTheEmployer;
  const needsLimitationExtension = within3Months === false;

  return (
    <div className="bg-ivory-50 min-h-screen py-16 sm:py-24 text-ink">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="border-b border-border pb-4">
          <div className="text-xs uppercase tracking-widest text-accent font-bold">
            Statutory Triage
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
            POSH Redressal &amp; Routing Wizard
          </h1>
          <p className="text-xs text-ink-secondary mt-1">
            Answers 4 simple statutory questions to determine whether your matter is redressed by an Internal Committee (IC) or the District Local Committee (LC).
          </p>
        </div>

        {/* Wizard Card */}
        <div className="bg-white rounded-card p-6 sm:p-10 border border-border shadow-card">
          {!isComplete ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-ink-secondary border-b border-border-subtle pb-3">
                <span className="font-semibold text-primary">Question {step} of 4</span>
                <span>{step * 25}% Complete</span>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-ink">
                    1. Does the establishment employ 10 or more people?
                  </h3>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Under Section 4(1), include full-time staff, contract workers, consultants, probationers, and interns at the workplace.
                  </p>
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => {
                        setEmployeeCountOver10(true);
                        setStep(2);
                      }}
                      className={`w-full p-4 text-left rounded border transition-colors flex items-center justify-between text-xs font-semibold ${
                        employeeCountOver10 === true ? "bg-primary text-white border-primary" : "bg-white border-border hover:bg-surface-muted text-ink"
                      }`}
                    >
                      <span>Yes, 10 or more employees (Standard Organisation)</span>
                      <ArrowRight className="w-4 h-4 opacity-60" />
                    </button>
                    <button
                      onClick={() => {
                        setEmployeeCountOver10(false);
                        setStep(2);
                      }}
                      className={`w-full p-4 text-left rounded border transition-colors flex items-center justify-between text-xs font-semibold ${
                        employeeCountOver10 === false ? "bg-primary text-white border-primary" : "bg-white border-border hover:bg-surface-muted text-ink"
                      }`}
                    >
                      <span>No, fewer than 10 employees (Small Establishment)</span>
                      <ArrowRight className="w-4 h-4 opacity-60" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-ink">
                    2. Is the complaint directly against the Employer / Founder / Managing Director?
                  </h3>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Under Section 6(1) of the Act, if the allegation is against the highest executive authority or sole proprietor, an internal committee cannot inquire into its own employer.
                  </p>
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => {
                        setIsRespondentTheEmployer(true);
                        setStep(3);
                      }}
                      className="w-full p-4 text-left rounded border bg-white border-border hover:bg-surface-muted text-ink text-xs font-semibold flex items-center justify-between"
                    >
                      <span>Yes, the respondent is the Employer / Founder / MD</span>
                      <ArrowRight className="w-4 h-4 opacity-60" />
                    </button>
                    <button
                      onClick={() => {
                        setIsRespondentTheEmployer(false);
                        setStep(3);
                      }}
                      className="w-full p-4 text-left rounded border bg-white border-border hover:bg-surface-muted text-ink text-xs font-semibold flex items-center justify-between"
                    >
                      <span>No, the respondent is a colleague, manager, vendor, or client</span>
                      <ArrowRight className="w-4 h-4 opacity-60" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-ink">
                    3. Did the incident (or the last incident in a series) occur within the past 3 months?
                  </h3>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Section 9(1) sets a general 3-month limitation period, but the committee has statutory discretion to extend by another 3 months upon recorded reasons.
                  </p>
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => {
                        setWithin3Months(true);
                        setStep(4);
                      }}
                      className="w-full p-4 text-left rounded border bg-white border-border hover:bg-surface-muted text-ink text-xs font-semibold flex items-center justify-between"
                    >
                      <span>Yes, within the last 3 months</span>
                      <ArrowRight className="w-4 h-4 opacity-60" />
                    </button>
                    <button
                      onClick={() => {
                        setWithin3Months(false);
                        setStep(4);
                      }}
                      className="w-full p-4 text-left rounded border bg-white border-border hover:bg-surface-muted text-ink text-xs font-semibold flex items-center justify-between"
                    >
                      <span>No, more than 3 months ago (Requires recorded extension grounds)</span>
                      <ArrowRight className="w-4 h-4 opacity-60" />
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-ink">
                    4. Did the incident occur in connection with work?
                  </h3>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Under Section 2(o), this includes office premises, client sites, work travel, client dinners, and digital workspaces (Zoom, Slack, WhatsApp, email).
                  </p>
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => {
                        setWorkplaceRelated(true);
                        setStep(5);
                      }}
                      className="w-full p-4 text-left rounded border bg-white border-border hover:bg-surface-muted text-ink text-xs font-semibold flex items-center justify-between"
                    >
                      <span>Yes, at work premises or extended digital / travel workspace</span>
                      <ArrowRight className="w-4 h-4 opacity-60" />
                    </button>
                    <button
                      onClick={() => {
                        setWorkplaceRelated(false);
                        setStep(5);
                      }}
                      className="w-full p-4 text-left rounded border bg-white border-border hover:bg-surface-muted text-ink text-xs font-semibold flex items-center justify-between"
                    >
                      <span>Unsure / purely personal relationship dispute</span>
                      <ArrowRight className="w-4 h-4 opacity-60" />
                    </button>
                  </div>
                </div>
              )}

              {step > 1 && (
                <div className="pt-4 border-t border-border-subtle flex justify-start">
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-1.5 text-xs text-ink-secondary hover:text-ink font-medium"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Question</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-ink">
                    Routing Evaluation Complete
                  </h3>
                  <p className="text-xs text-ink-secondary">
                    Based on the statutory criteria of the POSH Act, 2013:
                  </p>
                </div>
              </div>

              {/* Outcome Determination */}
              {isRoutedToLocalCommittee ? (
                <div className="p-5 bg-amber-50 rounded border border-amber-200 space-y-3 text-xs text-amber-950">
                  <div className="font-serif font-bold text-sm text-amber-900 flex items-center gap-1.5">
                    <Scale className="w-4 h-4" />
                    <span>Route: District Local Committee (LC) Referral</span>
                  </div>
                  <p className="leading-relaxed">
                    Because {!employeeCountOver10 ? "the establishment has fewer than 10 employees" : "the allegation is against the employer directly"}, statutory jurisdiction lies with the <strong>Local Committee (LC)</strong> constituted by the District Officer under Section 6 of the Act.
                  </p>
                  <p className="leading-relaxed">
                    In Kolkata, the Local Committee operates under the Office of the District Magistrate. Acorn Legal can assist you in preparing a formal referral and complaint petition.
                  </p>
                  <div className="pt-2 flex gap-3">
                    <Link
                      href="/help/directory"
                      className="px-4 py-2 bg-amber-800 text-white font-semibold rounded hover:bg-amber-900 text-xs"
                    >
                      View Kolkata LC Directory
                    </Link>
                    <Link
                      href="/contact"
                      className="px-4 py-2 border border-amber-800 text-amber-900 font-semibold rounded text-xs hover:bg-white"
                    >
                      Request Legal Assistance
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-emerald-50 rounded border border-emerald-200 space-y-3 text-xs text-emerald-950">
                  <div className="font-serif font-bold text-sm text-emerald-900 flex items-center gap-1.5">
                    <Building className="w-4 h-4" />
                    <span>Route: Internal Committee (IC) at Your Organisation</span>
                  </div>
                  <p className="leading-relaxed">
                    Your workplace meets the 10+ employee statutory threshold and the respondent is not the employer. Your matter will be inquired into by the <strong>Internal Committee (IC)</strong> of your organisation.
                  </p>
                  {needsLimitationExtension && (
                    <div className="bg-white p-3 rounded border border-emerald-300 text-xs text-ink">
                      <strong>Limitation Note:</strong> As the incident occurred more than 3 months ago, you will be prompted in the form to state the reasons preventing timely filing. The IC can condone delay by an additional 3 months under Section 9(1) proviso.
                    </div>
                  )}
                  <div className="pt-2 flex gap-3">
                    <Link
                      href="/posh/file"
                      className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded text-xs transition-colors flex items-center gap-1.5"
                    >
                      <span>Proceed to Complaint Intake Form</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-border flex justify-between items-center text-xs">
                <button
                  onClick={() => {
                    setStep(1);
                    setEmployeeCountOver10(null);
                    setIsRespondentTheEmployer(null);
                    setWithin3Months(null);
                  }}
                  className="text-ink-secondary hover:text-ink underline"
                >
                  Restart Wizard
                </button>
                <Link href="/posh/portal" className="text-primary font-semibold hover:underline">
                  Back to Portal Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

