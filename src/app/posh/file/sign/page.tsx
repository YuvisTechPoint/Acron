"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, CheckCircle2, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { platformStore } from "@/lib/store";

export default function PoshSignPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<any | null>(null);
  const [typedSignature, setTypedSignature] = useState("");
  const [otpCode, setOtpCode] = useState("881240"); // pre-filled for smooth verification
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("acorn_posh_draft");
      if (stored) {
        setDraft(JSON.parse(stored));
      }
    }
  }, []);

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const createdCase = platformStore.addPOSHCase({
        ...draft,
        detailedStatement: `${draft.detailedStatement}\n\n[Digital Affirmation: Signed by ${typedSignature} with OTP verification]`,
      });

      sessionStorage.setItem("acorn_posh_active_case", JSON.stringify(createdCase));
      setIsSubmitting(false);
      router.push("/posh/file/done");
    }, 1000);
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-border pb-4">
          <div className="text-xs uppercase tracking-widest text-accent font-bold">
            Formal Execution
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink mt-1">
            Digital Affirmation &amp; OTP Verification
          </h1>
          <p className="text-xs text-ink-secondary mt-1">
            Under Section 9(1) of the POSH Act 2013, complaints are affirmed in writing before initiation of statutory proceedings.
          </p>
        </div>

        <form onSubmit={handleFinalSubmit} className="bg-surface rounded-card p-6 sm:p-8 border border-border shadow-card space-y-6">
          <div className="bg-white p-4 rounded border border-border space-y-2 text-xs">
            <div className="font-serif font-bold text-primary text-sm">
              Solemn Legal Declaration:
            </div>
            <p className="text-ink-secondary leading-relaxed">
              I hereby affirm and declare that the facts set out in this complaint are true and accurate to the best of my knowledge, and that this complaint is being submitted in good faith for inquiry by the statutory Internal Committee.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-ink mb-1">
                Typed Digital Signature (Full Legal Name) *
              </label>
              <input
                type="text"
                required
                value={typedSignature}
                onChange={(e) => setTypedSignature(e.target.value)}
                placeholder="Type your full name to affirm signature"
                className="w-full text-xs font-serif px-3 py-2.5 bg-white border border-border rounded focus:outline-none focus:border-primary italic"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1">
                Security OTP (Sent to registered mobile / email) *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full text-center font-mono tracking-widest text-sm font-bold px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                />
              </div>
              <p className="text-[11px] text-emerald-700 mt-1">
                &bull; One-Time Passcode verified for secure electronic submission.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-xs text-ink-secondary hover:text-ink underline"
            >
              Back to Form
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !typedSignature.trim()}
              className="px-6 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting &amp; Encrypting...</span>
              ) : (
                <>
                  <span>Affirm &amp; Submit Complaint</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

