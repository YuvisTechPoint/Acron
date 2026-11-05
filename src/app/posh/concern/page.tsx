"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { generateConcernRef } from "@/lib/utils";
import { platformStore } from "@/lib/store";

export default function PoshConcernReportPage() {
  const [reporterType, setReporterType] = useState<any>("anonymous_bystander");
  const [orgId, setOrgId] = useState("org-1");
  const [department, setDepartment] = useState("");
  const [approxDate, setApproxDate] = useState("");
  const [partiesInvolved, setPartiesInvolved] = useState("");
  const [summary, setSummary] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const organizations = platformStore.getOrganizations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = generateConcernRef("TECH");
    setSubmittedRef(ref);
    platformStore.addAuditLog(
      "Bystander",
      "reporter",
      "CONCERN_REPORTED",
      "case",
      ref,
      `Informal concern logged: ${summary.substring(0, 40)}...`
    );
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-border pb-4">
          <div className="text-xs uppercase tracking-widest text-accent font-bold">
            Early Risk Intervention
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink mt-1">
            Informal Concern / Bystander Report
          </h1>
          <p className="text-xs text-ink-secondary mt-1">
            Report an observed workplace incident without initiating a formal inquiry. Enables IC and HR to assess risks discreetly.
          </p>
        </div>

        <div className="bg-surface rounded-card p-6 sm:p-8 border border-border shadow-card">
          {submittedRef ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-xl text-ink">
                Concern Report Registered
              </h3>
              <div className="inline-block bg-white px-4 py-2 rounded border border-border font-mono text-sm font-bold text-primary">
                Reference: {submittedRef}
              </div>
              <p className="text-xs text-ink-secondary max-w-md mx-auto leading-relaxed">
                Thank you for speaking up. The Internal Committee will review this discreetly for environmental risk factors and workplace climate trends.
              </p>
              <div className="pt-2">
                <Link
                  href="/posh/portal"
                  className="px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover transition-colors inline-block"
                >
                  Return to Portal Desk
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Reporter Role
                </label>
                <select
                  value={reporterType}
                  onChange={(e) => setReporterType(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                >
                  <option value="anonymous_bystander">Anonymous Bystander / Observer</option>
                  <option value="employee">Employee / Peer</option>
                  <option value="manager">Manager / Team Leader</option>
                  <option value="vendor">Vendor / External Partner</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Organisation *
                </label>
                <select
                  value={orgId}
                  onChange={(e) => setOrgId(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                >
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name} ({org.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Department / Area
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Sales / Cafeteria"
                    className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Approximate Date / Time
                  </label>
                  <input
                    type="date"
                    value={approxDate}
                    onChange={(e) => setApproxDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Parties Involved (If known)
                </label>
                <input
                  type="text"
                  value={partiesInvolved}
                  onChange={(e) => setPartiesInvolved(e.target.value)}
                  placeholder="Names or descriptions of persons involved"
                  className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Description of Concern *
                </label>
                <textarea
                  required
                  rows={4}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Describe the behaviour, pattern, or environment observed."
                  className="w-full text-xs px-3 py-2 bg-white border border-border rounded focus:outline-none focus:border-primary"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <Link
                  href="/posh/portal"
                  className="text-xs text-ink-secondary hover:text-ink underline"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-colors"
                >
                  Submit Informal Report
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

