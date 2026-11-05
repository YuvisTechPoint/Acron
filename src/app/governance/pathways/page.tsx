"use client";

import React from "react";
import Link from "next/link";
import {
  Scale,
  ShieldCheck,
  Building2,
  FileText,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  Lock
} from "lucide-react";

interface Pathway {
  id: string;
  name: string;
  forum: string;
  statutoryBasis: string;
  standardOfProof: string;
  statutoryTimeline: string;
  remediesAvailable: string[];
  confidentialityProtection: string;
  acornRole: string;
}

const PATHWAYS: Pathway[] = [
  {
    id: "PATH-01",
    name: "Internal Committee (IC) Inquiry",
    forum: "Employer's Internal Committee (or Acorn assisted bench)",
    statutoryBasis: "POSH Act 2013, Sections 4, 9, 11 & 13",
    standardOfProof: "Preponderance of Probabilities (Civil / Quasi-Judicial standard)",
    statutoryTimeline: "Strict 90-day inquiry + 10-day report submission + 60-day employer implementation",
    remediesAvailable: [
      "Interim relief (transfer, 3-month paid leave, appraisal restraint)",
      "Written apology, warning, censure, or reprimand",
      "Withholding of promotion, increments, or bonus",
      "Termination of employment / dismissal from service",
      "Deduction of financial compensation from salary under Section 15"
    ],
    confidentialityProtection: "Section 16 strict non-disclosure statutory bar; violation attracts ₹5,000 fine and disciplinary action.",
    acornRole: "Appointed External Member under Sec 4(2)(c), inquiry drafting, evidence vetting, and annual compliance filing."
  },
  {
    id: "PATH-02",
    name: "District Local Committee (LC)",
    forum: "Local Committee constituted by District Magistrate / Collector",
    statutoryBasis: "POSH Act 2013, Sections 6 & 7",
    standardOfProof: "Preponderance of Probabilities",
    statutoryTimeline: "90-day inquiry period from receipt of complaint",
    remediesAvailable: [
      "Quasi-judicial recommendations directly to District Officer",
      "Directing employer or respondent to pay compensation",
      "Filing police complaint under Section 509/354 if employer defaults"
    ],
    confidentialityProtection: "Section 16 confidentiality mandates apply equally to LC members and staff.",
    acornRole: "Assisting complainants in drafting petitions to Kolkata District Magistrate and navigating LC summons."
  },
  {
    id: "PATH-03",
    name: "Criminal Prosecution (Police / Magistrate)",
    forum: "Jurisdictional Police Station / Chief Metropolitan Magistrate Court",
    statutoryBasis: "Bhartiya Nyaya Sanhita 2023 (BNS) / IPC Sections 354A, 354D, 509 & CrPC / BNSS",
    standardOfProof: "Beyond Reasonable Doubt (Strict criminal standard)",
    statutoryTimeline: "Police charge sheet within 60/90 days; trial before magistrate",
    remediesAvailable: [
      "Arrest and custodial interrogation of the accused",
      "Criminal conviction with imprisonment up to 3 to 7 years",
      "Criminal court fine paid to the state and victim compensation"
    ],
    confidentialityProtection: "Section 72 BNS (formerly Section 228A IPC) prohibits publishing identity of victim of sexual offences.",
    acornRole: "Chamber advocates assist with FIR registration, Section 154/156(3) magistrate applications, and criminal bail opposition."
  },
  {
    id: "PATH-04",
    name: "Section 18 Statutory Judicial Appeal",
    forum: "Appellate Tribunal / Industrial Tribunal / High Court",
    statutoryBasis: "POSH Act 2013, Section 18 read with Service Rules",
    standardOfProof: "Judicial Review of Natural Justice & Reasonableness",
    statutoryTimeline: "Statutory appeal must be preferred within 90 days from the date of the recommendation/order",
    remediesAvailable: [
      "Setting aside or modifying illegal or biased IC inquiry report",
      "Ordering de novo inquiry by a newly reconstituted committee",
      "Reinstatement with back wages if wrongfully terminated"
    ],
    confidentialityProtection: "High Court / Tribunal in-camera proceedings may be sought under Section 16 safeguards.",
    acornRole: "Adv. Subhasish Mukherjee and chamber advocates represent clients before the High Court at Calcutta."
  }
];

export default function JusticePathwaysPage() {
  return (
    <div className="bg-surface min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/posh"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition"
          >
            <span>&larr; Back to POSH Practice Group</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/governance/sectors" className="text-slate-600 hover:text-primary">
              Sector Overlays
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/governance/charters" className="text-slate-600 hover:text-primary">
              Rights Charters
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white p-8 rounded-card border border-border shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold">
            <Compass className="w-4 h-4 text-primary" />
            <span>PRD Section 8.34 &bull; Redressal Jurisdictions</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-ink mt-2">
            Comparative Justice &amp; Legal Remedies Map
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            In India, an aggrieved individual has multiple concurrent legal avenues for redressal. The POSH Act 2013 civil inquiry operates independently of criminal proceedings and does not bar the complainant from filing a police FIR under Bhartiya Nyaya Sanhita (Section 9(1) proviso).
          </p>
        </div>

        {/* Pathways Grid */}
        <div className="space-y-6">
          {PATHWAYS.map((p) => (
            <div key={p.id} className="bg-white rounded-card border border-border shadow-sm p-6 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-primary text-white px-2 py-0.5 rounded">
                      {p.id}
                    </span>
                    <h2 className="font-serif text-xl font-bold text-ink">{p.name}</h2>
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    Forum: <strong className="text-slate-700">{p.forum}</strong>
                  </div>
                </div>

                <div className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1.5 rounded border border-slate-200">
                  {p.statutoryBasis}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-slate-700 block mb-0.5">Standard of Proof:</span>
                    <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-slate-800">
                      {p.standardOfProof}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 block mb-0.5">Statutory Timeline &amp; Clock:</span>
                    <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-slate-800 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary shrink-0" />
                      <span>{p.statutoryTimeline}</span>
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 block mb-0.5">Confidentiality Safeguards:</span>
                    <div className="p-2.5 bg-blue-50/60 rounded border border-blue-200 text-blue-900 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-blue-700 shrink-0" />
                      <span>{p.confidentialityProtection}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-slate-700 block mb-1">Available Statutory Remedies:</span>
                    <ul className="space-y-1.5">
                      {p.remediesAvailable.map((rem, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{rem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="font-bold text-primary block mb-1">Acorn Legal Practice Role:</span>
                    <p className="text-slate-600 italic">
                      {p.acornRole}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

