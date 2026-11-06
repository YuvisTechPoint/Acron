"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  ShieldCheck,
  User,
  Building,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Save,
  HelpCircle,
} from "lucide-react";
import { platformStore } from "@/lib/store";

export default function PoshComplaintIntakePage() {
  const router = useRouter();

  // Step 1 to 8 (A to H)
  const [currentStep, setCurrentStep] = useState(1);
  const [lastSaved, setLastSaved] = useState<string>("Draft autosaved");

  // Step A: Safety & Confidentiality
  const [safetyAcknowledged, setSafetyAcknowledged] = useState(true);

  // Step B: Complainant details
  const [complainantName, setComplainantName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [supportPerson, setSupportPerson] = useState("");
  const [prefLang, setPrefLang] = useState<"en" | "bn" | "hi">("en");
  const [needsAssistance, setNeedsAssistance] = useState(false);

  // Step C: Organisation
  const [orgId, setOrgId] = useState("org-1");
  const [orgName, setOrgName] = useState("Kolkata Cloud Technologies Pvt Ltd");

  // Step D: Respondent
  const [respondentName, setRespondentName] = useState("");
  const [respondentDesignation, setRespondentDesignation] = useState("");
  const [respondentDepartment, setRespondentDepartment] = useState("");
  const [respondentEmail, setRespondentEmail] = useState("");

  // Step E: Incident
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentLocation, setIncidentLocation] = useState("");
  const [natureOfHarassment, setNatureOfHarassment] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [detailedStatement, setDetailedStatement] = useState("");

  // Step F: Witnesses
  const [witnessName, setWitnessName] = useState("");
  const [witnessRole, setWitnessRole] = useState("");

  // Step G: Interim Relief (Section 12)
  const [interimType, setInterimType] = useState<string>("restrain_respondent");
  const [interimDetails, setInterimDetails] = useState("");

  // Step H: Conciliation preference
  const [conciliationPreference, setConciliationPreference] = useState(false);

  // Available organisations from store
  const organizations = platformStore.getOrganizations();

  const natureOptions = [
    "Unwelcome physical contact and advances",
    "Demand or request for sexual favours",
    "Making sexually coloured remarks",
    "Showing pornography or offensive material",
    "Any other unwelcome physical, verbal or non-verbal conduct of sexual nature",
    "Implied or explicit promise of preferential treatment or threat of detrimental treatment",
  ];

  const toggleNature = (item: string) => {
    if (natureOfHarassment.includes(item)) {
      setNatureOfHarassment(natureOfHarassment.filter((n) => n !== item));
    } else {
      setNatureOfHarassment([...natureOfHarassment, item]);
    }
  };

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
      setLastSaved(`Autosaved at ${new Date().toLocaleTimeString("en-IN")}`);
    } else {
      // Package draft and pass to digital sign screen
      const draftComplaint = {
        orgId,
        orgName,
        complainantName,
        complainantDesignation: designation,
        complainantDepartment: department,
        complainantEmail: email,
        complainantPhone: phone,
        needsAssistance,
        supportPersonName: supportPerson || undefined,
        preferredLanguage: prefLang,
        respondentName,
        respondentDesignation,
        respondentDepartment,
        respondentEmail,
        incidentDates: [incidentDate || new Date().toISOString().split("T")[0]],
        incidentLocation,
        natureOfHarassment: natureOfHarassment.length > 0 ? natureOfHarassment : ["General POSH Concern"],
        summary,
        detailedStatement,
        witnesses: witnessName ? [{ name: witnessName, role: witnessRole || "Colleague" }] : [],
        interimRelief: interimDetails ? { type: interimType, details: interimDetails } : undefined,
        conciliationRequested: conciliationPreference,
      };

      if (typeof window !== "undefined") {
        sessionStorage.setItem("acorn_posh_draft", JSON.stringify(draftComplaint));
      }
      router.push("/posh/file/sign");
    }
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-16 text-ink">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Stepper Progress Bar */}
        <div className="bg-surface p-4 rounded-card border border-border flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary font-serif text-sm">
              Step {currentStep} of 8:
            </span>
            <span className="text-ink font-medium">
              {currentStep === 1 && "A. Safety & Statutory Rights"}
              {currentStep === 2 && "B. Complainant Identity"}
              {currentStep === 3 && "C. Organisation Context"}
              {currentStep === 4 && "D. Respondent Details"}
              {currentStep === 5 && "E. Incident Chronology"}
              {currentStep === 6 && "F. Witnesses & Exhibits"}
              {currentStep === 7 && "G. Interim Relief (Sec 12)"}
              {currentStep === 8 && "H. Redressal Mode & Review"}
            </span>
          </div>
          <div className="text-[11px] text-ink-secondary flex items-center gap-1">
            <Save className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lastSaved}</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-surface rounded-card p-6 sm:p-8 border border-border shadow-card space-y-6">
          {/* STEP 1 / A: Safety & Confidentiality */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-serif font-bold text-lg">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <span>Statutory Confidentiality &amp; Trauma-Informed Notice</span>
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Before you begin, please know that your safety, dignity, and privacy are protected by law under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013.
              </p>

              <div className="bg-white p-4 rounded border border-border-subtle space-y-2.5 text-xs text-ink">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Section 16 Confidentiality:</strong> Your identity, contact details, and statement cannot be disclosed to the public, press, or colleagues.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Safe Exit Available:</strong> Pressing ESC or clicking the red &quot;Quick Exit&quot; button at the top right replaces your screen instantly with a neutral search.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Assistance &amp; Support Person:</strong> You have the right to nominate a trusted colleague or support person to accompany you during any IC interactions.</span>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-ink cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safetyAcknowledged}
                    onChange={(e) => setSafetyAcknowledged(e.target.checked)}
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span>I acknowledge my statutory rights and wish to proceed in confidence.</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 2 / B: Complainant Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-ink">
                Complainant Identification &amp; Safe Contact
              </h3>
              <p className="text-xs text-ink-secondary">
                Your contact details are used exclusively by the Internal Committee to serve notices and schedule private sessions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={complainantName}
                    onChange={(e) => setComplainantName(e.target.value)}
                    placeholder="e.g. Priyanka Sen"
                    className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Designation / Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Department / Team *
                  </label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Engineering &amp; QA"
                    className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Safe Mobile / Telephone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98300 00000"
                    className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Safe Email Address (Personal or Corporate) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priyanka@example.com"
                    className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Support Person (Optional)
                  </label>
                  <input
                    type="text"
                    value={supportPerson}
                    onChange={(e) => setSupportPerson(e.target.value)}
                    placeholder="Trusted colleague name"
                    className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Preferred Language
                  </label>
                  <select
                    value={prefLang}
                    onChange={(e) => setPrefLang(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                  >
                    <option value="en">English</option>
                    <option value="bn">Bengali (বাংলা)</option>
                    <option value="hi">Hindi (हिन्दी)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 / C: Organisation Context */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-ink">
                Employer / Workplace Selection
              </h3>
              <p className="text-xs text-ink-secondary">
                Select your employer organisation to route the complaint directly to your registered Internal Committee.
              </p>

              <div className="space-y-3 pt-2">
                {organizations.map((org) => (
                  <label
                    key={org.id}
                    onClick={() => {
                      setOrgId(org.id);
                      setOrgName(org.name);
                    }}
                    className={`block p-4 rounded border cursor-pointer transition-colors ${
                      orgId === org.id
                        ? "bg-primary-light/50 border-primary shadow-sm"
                        : "bg-white border-border hover:bg-surface-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-serif font-bold text-sm text-primary">
                        {org.name}
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-ink-secondary font-bold">
                        {org.code}
                      </span>
                    </div>
                    <div className="text-xs text-ink-secondary mt-1">
                      {org.registeredAddress}
                    </div>
                    <div className="text-[11px] text-ink mt-2">
                      <strong>IC Presiding Officer:</strong> {org.icPresidingOfficer} &bull; <strong>External Member:</strong> {org.icExternalMember}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4 / D: Respondent Details */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-ink">
                Respondent Details (Person Against Whom Complaint is Filed)
              </h3>
              <p className="text-xs text-ink-secondary">
                Under Section 11(1) and statutory rules, the IC must serve a formal copy of the allegations to the respondent within 7 working days.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Respondent Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={respondentName}
                    onChange={(e) => setRespondentName(e.target.value)}
                    placeholder="e.g. Rakesh Majumdar"
                    className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Respondent Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={respondentDesignation}
                    onChange={(e) => setRespondentDesignation(e.target.value)}
                    placeholder="e.g. Director - Client Delivery"
                    className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Respondent Department *
                  </label>
                  <input
                    type="text"
                    required
                    value={respondentDepartment}
                    onChange={(e) => setRespondentDepartment(e.target.value)}
                    placeholder="e.g. Enterprise Delivery"
                    className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Respondent Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={respondentEmail}
                    onChange={(e) => setRespondentEmail(e.target.value)}
                    placeholder="rakesh@company.com"
                    className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 / E: Incident Chronology */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-ink">
                Incident Chronology &amp; Description
              </h3>
              <p className="text-xs text-ink-secondary">
                Describe the events factually. You can include dates, locations, digital channels, and what was said or done.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Date of Incident (or Most Recent Date) *
                  </label>
                  <input
                    type="date"
                    required
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Incident Location / Setting *
                  </label>
                  <input
                    type="text"
                    required
                    value={incidentLocation}
                    onChange={(e) => setIncidentLocation(e.target.value)}
                    placeholder="e.g. Sector V Office / WhatsApp / Client Dinner"
                    className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-2">
                  Nature of Allegations (Select all applicable) *
                </label>
                <div className="space-y-2">
                  {natureOptions.map((opt, idx) => (
                    <label
                      key={idx}
                      className="flex items-start gap-2 text-xs text-ink cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={natureOfHarassment.includes(opt)}
                        onChange={() => toggleNature(opt)}
                        className="mt-0.5 rounded text-primary"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Summary of Incident (1-2 Sentences) *
                </label>
                <input
                  type="text"
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Concise overview of what occurred"
                  className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Detailed Statement &amp; Facts *
                </label>
                <textarea
                  required
                  rows={5}
                  value={detailedStatement}
                  onChange={(e) => setDetailedStatement(e.target.value)}
                  placeholder="Please state what happened, including any words spoken, physical gestures, digital messages, or subsequent interactions."
                  className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                ></textarea>
              </div>
            </div>
          )}

          {/* STEP 6 / F: Witnesses & Exhibits */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-ink">
                Witnesses &amp; Initial Documentary Evidence
              </h3>
              <p className="text-xs text-ink-secondary">
                You may name individuals who witnessed the incident or to whom you spoke immediately afterwards. Additional exhibits can also be submitted later into the secure Evidence Vault.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Witness Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={witnessName}
                    onChange={(e) => setWitnessName(e.target.value)}
                    placeholder="e.g. Rohit Ghosh"
                    className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Witness Role / Context
                  </label>
                  <input
                    type="text"
                    value={witnessRole}
                    onChange={(e) => setWitnessRole(e.target.value)}
                    placeholder="e.g. Team Lead / Overheard conversation"
                    className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="p-4 bg-white rounded border border-dashed border-border text-center space-y-2">
                <FileText className="w-8 h-8 text-ink-secondary mx-auto" />
                <div className="text-xs font-semibold text-ink">
                  Document / Screenshot Attachment
                </div>
                <div className="text-[11px] text-ink-secondary">
                  Chat screenshots, emails, or call logs can be attached now or uploaded directly into your case file upon registration.
                </div>
              </div>
            </div>
          )}

          {/* STEP 7 / G: Interim Relief (Section 12) */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-serif font-bold text-lg">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <span>Interim Relief Request (Section 12 of POSH Act)</span>
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed">
                During the pendency of an inquiry, you have the statutory right to request interim protection from the Internal Committee to prevent victimisation or discomfort at the workplace.
              </p>

              <div className="space-y-2 pt-2">
                <label className="block p-3 rounded border bg-white border-border text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="interim"
                    value="restrain_respondent"
                    checked={interimType === "restrain_respondent"}
                    onChange={() => setInterimType("restrain_respondent")}
                    className="mr-2"
                  />
                  <strong>Restrain Respondent:</strong> Direct respondent not to contact, supervise, or report on complainant&apos;s appraisals.
                </label>

                <label className="block p-3 rounded border bg-white border-border text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="interim"
                    value="transfer"
                    checked={interimType === "transfer"}
                    onChange={() => setInterimType("transfer")}
                    className="mr-2"
                  />
                  <strong>Transfer:</strong> Recommend transfer of complainant or respondent to another department/office.
                </label>

                <label className="block p-3 rounded border bg-white border-border text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="interim"
                    value="paid_leave_up_to_3_months"
                    checked={interimType === "paid_leave_up_to_3_months"}
                    onChange={() => setInterimType("paid_leave_up_to_3_months")}
                    className="mr-2"
                  />
                  <strong>Statutory Paid Leave:</strong> Grant paid leave up to 3 months (in addition to standard leave).
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Specific Details of Relief Desired:
                </label>
                <textarea
                  rows={3}
                  value={interimDetails}
                  onChange={(e) => setInterimDetails(e.target.value)}
                  placeholder="e.g. Immediate shift adjustment and exclusion of respondent from my year-end performance evaluation."
                  className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                ></textarea>
              </div>
            </div>
          )}

          {/* STEP 8 / H: Redressal Mode & Review */}
          {currentStep === 8 && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-ink">
                Redressal Mode &amp; Statutory Review
              </h3>

              {/* Conciliation (Section 10) vs Formal Inquiry (Section 11) */}
              <div className="p-4 bg-white rounded border border-border space-y-3">
                <div className="text-xs font-bold text-primary uppercase tracking-wider">
                  Section 10 Conciliation Option
                </div>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  Under Section 10(1) of the Act, you may request the IC to facilitate conciliation before initiating a formal inquiry.
                </p>
                <div className="p-2.5 bg-amber-50 rounded border border-amber-200 text-[11px] text-amber-900">
                  <strong>Statutory Proviso:</strong> Under Section 10(1), NO monetary settlement shall be made as the basis of conciliation.
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-ink cursor-pointer">
                    <input
                      type="checkbox"
                      checked={conciliationPreference}
                      onChange={(e) => setConciliationPreference(e.target.checked)}
                      className="w-4 h-4 text-primary rounded"
                    />
                    <span>I wish to explore conciliation first before formal inquiry.</span>
                  </label>
                </div>
              </div>

              {/* Summary Review Card */}
              <div className="bg-surface-muted p-4 rounded border border-border space-y-2 text-xs">
                <div className="font-bold text-ink mb-1">Complaint Summary for Submission:</div>
                <div><strong>Complainant:</strong> {complainantName || "Not stated"} ({designation})</div>
                <div><strong>Organisation:</strong> {orgName}</div>
                <div><strong>Respondent:</strong> {respondentName || "Not stated"} ({respondentDesignation})</div>
                <div><strong>Incident Date:</strong> {incidentDate || "Recent"} &bull; {incidentLocation}</div>
                <div><strong>Allegation:</strong> {summary || "Submitted statement"}</div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-border flex justify-between items-center">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 border border-border text-ink text-xs font-semibold rounded hover:bg-white flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <Link
                href="/posh/portal"
                className="text-xs text-ink-secondary hover:text-ink underline"
              >
                Cancel &amp; Exit
              </Link>
            )}

            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-colors flex items-center gap-2"
            >
              <span>{currentStep === 8 ? "Proceed to Digital Sign & Affirm" : "Save & Continue"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

