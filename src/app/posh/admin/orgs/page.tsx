"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Save,
  Check,
  Plus
} from "lucide-react";
import { platformStore } from "@/lib/store";

export default function PoshOnboardOrgPage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    industry: "Information Technology",
    city: "Kolkata",
    address: "",
    cinOrPan: "",
    headcount: 75,
    presidingOfficerName: "",
    presidingOfficerEmail: "",
    presidingOfficerPhone: "",
    externalMemberName: "Adv. Debjani Sen (Acorn Legal)",
    externalMemberEmail: "debjani.sen@acornlegal.in",
    employeeMember1: "",
    employeeMember2: "",
    holidayCalendar: "West Bengal State Gazetted (2026)",
    retainerPlan: "POSH Comprehensive Retainer (Tier 2)",
    enableNoticeBoardDisplay: true,
    enableSelfAssessmentSurvey: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate tenant creation
    setIsSubmitted(true);
  };

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/posh/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Central POSH Command</span>
          </Link>
          <span className="text-[11px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
            PRD Screen Ref: X-02
          </span>
        </div>

        {/* Header Banner */}
        <div className="bg-white p-6 rounded-card border border-border shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
            <Building2 className="w-4 h-4 text-primary" />
            <span>Client Employer Onboarding &bull; Tenant Setup</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink mt-1">
            Statutory Internal Committee &amp; Tenant Provisioning
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Configures client workspace, validates Section 4 constitution requirements (Presiding Officer $\ge 50\%$ women, External Member), and attaches Acorn legal counsel.
          </p>

          {/* Stepper indicator */}
          <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-border">
            <div className={`p-2.5 rounded text-center border text-xs font-semibold ${step === 1 ? 'bg-primary text-white border-primary' : 'bg-slate-50 text-slate-700 border-border'}`}>
              1. Corporate Profile
            </div>
            <div className={`p-2.5 rounded text-center border text-xs font-semibold ${step === 2 ? 'bg-primary text-white border-primary' : 'bg-slate-50 text-slate-700 border-border'}`}>
              2. IC Constitution (Sec 4)
            </div>
            <div className={`p-2.5 rounded text-center border text-xs font-semibold ${step === 3 ? 'bg-primary text-white border-primary' : 'bg-slate-50 text-slate-700 border-border'}`}>
              3. Service &amp; Governance
            </div>
          </div>
        </div>

        {isSubmitted ? (
          <div className="bg-white p-8 rounded-card border border-emerald-200 shadow-sm text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-ink">Organisation Successfully Provisioned</h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Tenant account for <strong className="text-ink">{formData.name}</strong> (Code: <code className="bg-slate-100 px-1 py-0.5 rounded">{formData.code || "NEWORG"}</code>) has been initialized. Internal Committee members have been sent invitation tokens and Section 16 non-disclosure declarations.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <Link
                href="/posh/admin"
                className="px-5 py-2.5 bg-primary text-white rounded font-medium text-xs hover:bg-primary-light transition"
              >
                Return to POSH Command Centre
              </Link>
              <button
                onClick={() => { setIsSubmitted(false); setStep(1); }}
                className="px-4 py-2.5 border border-border text-slate-700 rounded font-medium text-xs hover:bg-slate-50 transition"
              >
                Onboard Another Client
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-card border border-border shadow-sm space-y-6">
            
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-ink border-b pb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span>Organisation Legal Identity</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company / Entity Legal Name *</label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Hooghly River Shipping Logistics Pvt Ltd"
                      className="w-full text-xs p-2.5 border border-border rounded focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tenant Subdomain / Org Code *</label>
                    <input
                      type="text"
                      required
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      placeholder="e.g. HOOGHLYLOG"
                      className="w-full text-xs p-2.5 border border-border rounded uppercase focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Industry Sector *</label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full text-xs p-2.5 border border-border rounded bg-white focus:outline-none focus:border-primary"
                    >
                      <option value="Information Technology">Information Technology &amp; ITES</option>
                      <option value="Engineering & Manufacturing">Engineering &amp; Manufacturing</option>
                      <option value="Healthcare & Hospitals">Healthcare &amp; Hospitals (SCT-02)</option>
                      <option value="Higher Education">Higher Education &amp; University (UGC SCT-01)</option>
                      <option value="Logistics & Warehousing">Logistics &amp; Warehousing</option>
                      <option value="Financial Services">Financial Services &amp; Banking</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Total Headcount (Regular + Contractual) *</label>
                    <input
                      type="number"
                      required
                      name="headcount"
                      value={formData.headcount}
                      onChange={handleChange}
                      className="w-full text-xs p-2.5 border border-border rounded focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Registered Address (Kolkata / West Bengal) *</label>
                  <textarea
                    rows={2}
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Floor, Building, Road, Area, Kolkata, PIN"
                    className="w-full text-xs p-2.5 border border-border rounded focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded flex items-center gap-1.5 transition"
                  >
                    <span>Proceed to IC Setup</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-ink border-b pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>Internal Committee Composition (Section 4 Mandatory Roster)</span>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-medium border border-emerald-200">
                    Statutory Quorum Checked
                  </span>
                </h3>

                <div className="p-3 bg-blue-50/50 border border-blue-100 rounded text-xs text-blue-900 leading-relaxed">
                  <strong>Statutory Mandate:</strong> The Presiding Officer must be a senior woman employee. At least one-half (50%) of the members must be women. At least one member must be an External Member from an NGO or legal association familiar with POSH issues.
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 border border-border rounded">
                    <span className="text-xs font-bold text-ink block mb-2">Presiding Officer (Senior Woman Employee)</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Full Name *"
                        name="presidingOfficerName"
                        value={formData.presidingOfficerName}
                        onChange={handleChange}
                        className="text-xs p-2 border border-border rounded bg-white"
                      />
                      <input
                        type="email"
                        placeholder="Work Email *"
                        name="presidingOfficerEmail"
                        value={formData.presidingOfficerEmail}
                        onChange={handleChange}
                        className="text-xs p-2 border border-border rounded bg-white"
                      />
                      <input
                        type="tel"
                        placeholder="Mobile Phone"
                        name="presidingOfficerPhone"
                        value={formData.presidingOfficerPhone}
                        onChange={handleChange}
                        className="text-xs p-2 border border-border rounded bg-white"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-border rounded">
                    <span className="text-xs font-bold text-ink block mb-2">External IC Member (Section 4(2)(c))</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <select
                        name="externalMemberName"
                        value={formData.externalMemberName}
                        onChange={handleChange}
                        className="text-xs p-2 border border-border rounded bg-white"
                      >
                        <option value="Adv. Debjani Sen (Acorn Legal)">Adv. Debjani Sen (Acorn Legal Partner, Bar No. WB/1998)</option>
                        <option value="Adv. Subhasish Mukherjee (Acorn Legal)">Adv. Subhasish Mukherjee (Acorn Legal Managing Partner)</option>
                        <option value="Smt. Anuradha Roy (Certified NGO Specialist)">Smt. Anuradha Roy (Kolkata Women&apos;s Legal Aid Trust)</option>
                      </select>
                      <input
                        type="text"
                        disabled
                        value="Appointed via Acorn Legal Retainer Agreement"
                        className="text-xs p-2 border border-border rounded bg-slate-100 text-slate-500"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-border rounded">
                    <span className="text-xs font-bold text-ink block mb-2">Internal Employee Members (Min. 2)</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Employee Member 1 (Name &amp; Designation)"
                        name="employeeMember1"
                        value={formData.employeeMember1}
                        onChange={handleChange}
                        className="text-xs p-2 border border-border rounded bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Employee Member 2 (Name &amp; Designation)"
                        name="employeeMember2"
                        value={formData.employeeMember2}
                        onChange={handleChange}
                        className="text-xs p-2 border border-border rounded bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 border border-border text-xs font-medium text-slate-700 rounded hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded flex items-center gap-1.5 transition"
                  >
                    <span>Proceed to Retainer &amp; Rules</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-ink border-b pb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Statutory Retainer, Calendar &amp; Automation</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Acorn Retainer Package</label>
                    <select
                      name="retainerPlan"
                      value={formData.retainerPlan}
                      onChange={handleChange}
                      className="w-full text-xs p-2.5 border border-border rounded bg-white focus:outline-none focus:border-primary"
                    >
                      <option value="POSH Basic Retainer (Tier 1)">POSH Basic Retainer (₹18,000 / qtr)</option>
                      <option value="POSH Comprehensive Retainer (Tier 2)">POSH Comprehensive Retainer (₹45,000 / qtr)</option>
                      <option value="Enterprise Custom Plan">Enterprise Custom Advisory Agreement</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Working-Day Statutory Calendar</label>
                    <select
                      name="holidayCalendar"
                      value={formData.holidayCalendar}
                      onChange={handleChange}
                      className="w-full text-xs p-2.5 border border-border rounded bg-white focus:outline-none focus:border-primary"
                    >
                      <option value="West Bengal State Gazetted (2026)">West Bengal State Gazetted Holidays (Kolkata)</option>
                      <option value="Central Government Gazetted (2026)">Central Government Gazetted Holidays</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="enableNoticeBoardDisplay"
                      checked={formData.enableNoticeBoardDisplay}
                      onChange={(e) => setFormData({ ...formData, enableNoticeBoardDisplay: e.target.checked })}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-xs text-slate-700">Auto-generate Section 19(b) statutory notice board posters with IC contact details</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="enableSelfAssessmentSurvey"
                      checked={formData.enableSelfAssessmentSurvey}
                      onChange={(e) => setFormData({ ...formData, enableSelfAssessmentSurvey: e.target.checked })}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-xs text-slate-700">Schedule annual anonymous employee workplace climate survey (k-anonymity guaranteed)</span>
                  </label>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 border border-border text-xs font-medium text-slate-700 rounded hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded flex items-center gap-1.5 transition shadow"
                  >
                    <Check className="w-4 h-4" />
                    <span>Complete Client Provisioning</span>
                  </button>
                </div>
              </div>
            )}

          </form>
        )}

      </div>
    </div>
  );
}

