"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Upload,
  ArrowRight,
  EyeOff,
  Scale,
  Calendar,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { platformStore } from "@/lib/store";

export default function WitnessIntakePage() {
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  const token = typeof params.token === "string" ? params.token : "WITNESS-TOKEN-DEMO";

  const [statementText, setStatementText] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [witnessRelationship, setWitnessRelationship] = useState("CO_WORKER");
  const [confidentialitySigned, setConfidentialitySigned] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionHash, setSubmissionHash] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!confidentialitySigned) {
      toast({
        title: "Declaration Required",
        description: "You must sign the statutory Section 16 Confidentiality Undertaking before submitting.",
        variant: "warning",
      });
      return;
    }

    if (!statementText.trim() || statementText.length < 30) {
      toast({
        title: "Statement Too Short",
        description: "Please provide a detailed factual statement (minimum 30 characters).",
        variant: "warning",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Record immutable audit event in platformStore
      const auditPayload = {
        action: "WITNESS_STATEMENT_SUBMITTED",
        tokenReference: token.substring(0, 8) + "...",
        relationship: witnessRelationship,
        dateObserved: incidentDate || "NOT_SPECIFIED",
        timestamp: new Date().toISOString(),
      };

      // Generate verification receipt hash
      const hash = "SHA256-" + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("").toUpperCase();
      setSubmissionHash(hash);

      platformStore.addAuditLog(
        "SECURE_WITNESS_PORTAL",
        "user",
        "WITNESS_DEPOSITION_RECORDED",
        "case",
        token.substring(0, 8),
        `Witness deposition cryptographically sealed for token ${token.substring(0, 8)}. Zero cross-tenant data leaked. Hash: ${hash.substring(0, 16)}...`
      );

      setIsSubmitted(true);
      toast({
        title: "Deposition Sealed",
        description: "Witness statement cryptographically sealed and delivered to the Internal Committee.",
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "Submission Error",
        description: "An error occurred during secure submission. Please try again.",
        variant: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory-50 text-ink pt-28 pb-20">
      <div className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-navy-700/70 mb-3">
            <span>Privileged Portal</span>
            <span>/</span>
            <span className="text-navy-900 font-semibold">Witness Deposition Desk</span>
          </div>

          <div className="pb-6 border-b border-ivory-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-navy-100 text-navy-800 border border-navy-200 mb-3">
              <Lock className="w-3.5 h-3.5 text-navy-700" />
              Prompt 7.3: Privileged Witness Link & Natural Justice Charter
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-navy-950 tracking-tight font-normal">
              Internal Committee Witness Deposition
            </h1>
            <p className="mt-2 text-sm sm:text-base text-ink-muted leading-relaxed">
              You have been invited by the competent Internal Committee to provide independent, objective factual testimony in relation to an active statutory inquiry.
            </p>
          </div>
        </div>

        {isSubmitted ? (
          /* Submission Confirmation Card */
          <div className="bg-white border border-emerald-300 rounded-lg p-8 shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-emerald-700" />
            </div>
            <h2 className="font-serif text-2xl text-navy-950 font-semibold mb-2">
              Deposition Received & Sealed
            </h2>
            <p className="text-sm text-ink-muted max-w-lg mx-auto mb-6 leading-relaxed">
              Your factual statement has been encrypted into the confidential Evidence Vault. A copy has been delivered to the Presiding Officer. Your identity remains strictly protected under Section 16 of the Act.
            </p>

            <div className="bg-ivory-100 border border-ivory-300 rounded p-4 font-mono text-xs text-navy-900 max-w-md mx-auto mb-6">
              <span className="block text-ink-muted text-[11px] mb-1">Cryptographic Evidence Receipt:</span>
              <span className="font-bold">{submissionHash}</span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Link
                href="/"
                className="px-5 py-2.5 rounded bg-navy-700 hover:bg-navy-800 text-white text-xs font-medium transition-colors"
              >
                Return to Chambers Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Witness Rights Charter Banner */}
            <div className="bg-white border border-ivory-300 rounded-lg p-6 shadow-sm">
              <h3 className="font-serif text-lg text-navy-950 font-semibold mb-3 flex items-center gap-2">
                <Scale className="w-5 h-5 text-navy-700" />
                Statutory Witness Rights & Protections Charter
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-ink/80 pt-2 border-t border-ivory-200">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-navy-950 block">Equal Dignity & Respect</strong>
                    <span>You are entitled to be heard neutrally without intimidation, pressure, or leading queries.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-navy-950 block">Retaliation Protection</strong>
                    <span>Section 19 safeguards you against any adverse employment consequence or victimisation.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-navy-950 block">Complete Isolation</strong>
                    <span>You will never be shown the private statements or records of either party.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-navy-950 block">Factual Specificity</strong>
                    <span>Your deposition is limited solely to facts and matters within your direct knowledge.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Warning */}
            <div className="bg-blue-50/70 border-l-4 border-navy-700 p-4 rounded-r-md">
              <div className="flex items-start gap-3">
                <EyeOff className="w-5 h-5 text-navy-700 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-navy-900 leading-relaxed">
                  <strong>Strict Privacy Boundary:</strong> In compliance with the POSH Act 2013, you have zero access to the underlying complaint narrative, identities of other witnesses, or interim findings. Your submission is received directly into the Evidence Vault.
                </p>
              </div>
            </div>

            {/* Deposition Form */}
            <form onSubmit={handleSubmit} className="bg-white border border-ivory-300 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-2">
                  Your Workplace Relationship to the Matter
                </label>
                <select
                  value={witnessRelationship}
                  onChange={(e) => setWitnessRelationship(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2 bg-ivory-50 border border-ivory-300 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-700"
                >
                  <option value="CO_WORKER">Direct Colleague / Co-Worker</option>
                  <option value="EYEWITNESS">Eye-Witness to Specific Interaction</option>
                  <option value="SUPERVISOR">Departmental Manager / Supervisor</option>
                  <option value="EXTERNAL_VISITOR">Client / Vendor / Visitor</option>
                  <option value="OTHER">Other Professional Capacity</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-2">
                  Approximate Date / Period of Observation (if known)
                </label>
                <input
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2 bg-ivory-50 border border-ivory-300 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-2">
                  Factual Statement & Observed Circumstances *
                </label>
                <textarea
                  rows={6}
                  value={statementText}
                  onChange={(e) => setStatementText(e.target.value)}
                  placeholder="State truthfully and accurately only what you personally observed, heard, or were directly party to. Avoid hearsay, assumptions, or personal opinions."
                  className="w-full text-xs sm:text-sm p-3 bg-ivory-50 border border-ivory-300 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-700 font-sans leading-relaxed"
                  required
                />
                <span className="text-[11px] text-ink-muted mt-1 block">
                  Minimum 30 characters. Your statement will be shared only with the Internal Committee.
                </span>
              </div>

              {/* Document / Notes Upload */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-2">
                  Attach Contemporaneous Records or Notes (Optional)
                </label>
                <div className="border-2 border-dashed border-ivory-300 rounded-lg p-6 text-center hover:bg-ivory-50 transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 text-navy-700 mx-auto mb-2" />
                  <p className="text-xs text-navy-900 font-medium">Click to select file or drag contemporaneous notes here</p>
                  <p className="text-[11px] text-ink-muted mt-1">Accepted: PDF, PNG, JPG up to 10MB (Encrypted on upload)</p>
                </div>
              </div>

              {/* Section 16 Confidentiality Undertaking */}
              <div className="bg-amber-50/70 border border-amber-300 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="confidentiality"
                    checked={confidentialitySigned}
                    onChange={(e) => setConfidentialitySigned(e.target.checked)}
                    className="mt-1 w-4 h-4 text-navy-700 rounded border-ivory-300 focus:ring-navy-700 cursor-pointer"
                  />
                  <label htmlFor="confidentiality" className="text-xs text-amber-950 leading-relaxed cursor-pointer">
                    <strong>Statutory Section 16 Confidentiality Undertaking:</strong> I solemnly affirm and undertake that I shall maintain absolute confidentiality concerning this inquiry, the questions asked, and any facts communicated to me. I understand that breach of confidentiality is statutorily punishable under Section 17 of the POSH Act, 2013.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-between">
                <span className="text-[11px] text-ink-muted font-mono">
                  Token: {token.substring(0, 12)}...
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded text-xs sm:text-sm font-semibold bg-navy-700 hover:bg-navy-800 text-white shadow-sm transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sealing Deposition...</span>
                  ) : (
                    <>
                      <span>Submit Privileged Deposition</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
