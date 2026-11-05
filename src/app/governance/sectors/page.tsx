"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  GraduationCap,
  Stethoscope,
  Laptop,
  Factory,
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen
} from "lucide-react";

interface SectorOverlay {
  id: string;
  code: string;
  name: string;
  regulatoryBody: string;
  statutoryReference: string;
  icon: any;
  keyMandates: string[];
  acornSpecialization: string;
}

const SECTOR_OVERLAYS: SectorOverlay[] = [
  {
    id: "SCT-01",
    code: "UGC-EDU",
    name: "Higher Education Institutions & Universities",
    regulatoryBody: "University Grants Commission (UGC) / AICTE",
    statutoryReference: "UGC (Prevention, Prohibition and Redressal of Sexual Harassment of Women Employees and Students in Higher Educational Institutions) Regulations, 2015",
    icon: GraduationCap,
    keyMandates: [
      "Mandatory student representation (3 elected/nominated students) on the Internal Complaints Committee (ICC) if complainant/respondent is a student.",
      "Strict penalty of de-funding, de-recognition or UGC grant withdrawal for non-constitution of ICC.",
      "Vulnerability protections for research scholars, doctoral candidates and ad-hoc lecturers.",
      "Strict zero-tolerance policy integrated into university statutes and student handbooks."
    ],
    acornSpecialization: "Acorn acts as external legal member for premier universities and colleges across West Bengal, conducting ICC workshops and structuring student-friendly grievance mechanisms."
  },
  {
    id: "SCT-02",
    code: "HEALTH-HOSP",
    name: "Healthcare Providers, Hospitals & Medical Colleges",
    regulatoryBody: "National Medical Commission (NMC) / West Bengal Clinical Establishments Act",
    statutoryReference: "NMC Guidelines for Safe Working Environments in Medical Institutions & POSH Act 2013",
    icon: Stethoscope,
    keyMandates: [
      "24/7 security escorts and dedicated on-call rest rooms for female resident doctors and nurses on night duty.",
      "Strict protocol for patient-attendant harassment and third-party hospital visitors (Sec 2(o) extended workplace).",
      "Protection against retaliation in clinical evaluations, postgraduate residency postings, and thesis approvals."
    ],
    acornSpecialization: "Drafting hospital POSH SOPs, clinical safety charters, and providing external legal counsel on hospital IC benches."
  },
  {
    id: "SCT-03",
    code: "TECH-REMOTE",
    name: "IT, Tech Startups & Hybrid / Remote Workplaces",
    regulatoryBody: "Ministry of Labour & Employment / MeitY",
    statutoryReference: "Section 2(o) 'Workplace' Extended Scope & Supreme Court Guidelines",
    icon: Laptop,
    keyMandates: [
      "Explicit inclusion of digital platforms (Slack, Teams, WhatsApp, Zoom, emails) under workplace harassment definitions.",
      "Coverage of official offsite client visits, conferences, hackathons, and corporate dinners.",
      "Digital forensic protocols for capturing and hashing electronic chat records without invading personal device privacy."
    ],
    acornSpecialization: "Digital workplace codes of conduct, cross-border remote worker policies, and digital forensic chain-of-custody advisory for Salt Lake Sector V and New Town tech firms."
  },
  {
    id: "SCT-04",
    code: "MFG-FACTORY",
    name: "Manufacturing Plants, Heavy Engineering & Factories",
    regulatoryBody: "Directorate of Factories, West Bengal / Factories Act, 1948",
    statutoryReference: "Factories Act, 1948 Section 66 (Night Shift for Women) & POSH Act 2013",
    icon: Factory,
    keyMandates: [
      "Mandatory vernacular (Bengali & Hindi) notice boards and illustrated posters across shop floors and canteens.",
      "Employer-provided safe pickup and drop transportation for women workers in night shifts.",
      "Inclusion of contractual, casual, apprentice and daily-wage women under IC jurisdiction."
    ],
    acornSpecialization: "Bilingual IC trainings for manufacturing shop-floor supervisors, vernacular complaint filing systems, and industrial compliance audits."
  },
  {
    id: "SCT-05",
    code: "LEGAL-PROF",
    name: "Law Firms, Consulting Partnerships & Chambers",
    regulatoryBody: "Bar Council of India / High Court Rules",
    statutoryReference: "Bar Council of India Rules & Gender Sensitization and Internal Complaints Committee (GSICC)",
    icon: Scale,
    keyMandates: [
      "Addressing power imbalances between Equity Partners / Senior Advocates and junior associates, paralegals, or interns.",
      "Confidentiality safeguards protecting future professional career prospects of junior lawyers.",
      "Independent investigation mechanisms to avoid internal firm bias or partner collusion."
    ],
    acornSpecialization: "Independent peer-firm external inquiry chairing, partner sensitization roundtables, and compliance audits for legal and financial partnerships."
  }
];

export default function SectorOverlaysPage() {
  const [selectedSector, setSelectedSector] = useState<SectorOverlay>(SECTOR_OVERLAYS[0]);

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
            <Link href="/governance/pathways" className="text-slate-600 hover:text-primary">
              Justice Pathways
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
            <Building2 className="w-4 h-4 text-primary" />
            <span>PRD Section 8.33 &bull; Regulatory Compliance Overlays</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-ink mt-2">
            Industry &amp; Sector-Specific POSH Frameworks
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            While the POSH Act 2013 lays down universal minimum standards, different sectors are governed by specialized statutory regulations, judicial directives, and administrative guidelines. Acorn Legal provides tailored compliance architectures for each industry.
          </p>
        </div>

        {/* Sector Navigation Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {SECTOR_OVERLAYS.map((s) => {
            const Icon = s.icon;
            const isSelected = selectedSector.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSector(s)}
                className={`p-4 rounded-card border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white text-slate-700 border-border hover:border-slate-300"
                }`}
              >
                <Icon className={`w-6 h-6 mb-3 ${isSelected ? 'text-gold' : 'text-primary'}`} />
                <div>
                  <div className="font-bold text-xs leading-snug">{s.name}</div>
                  <div className={`text-[10px] mt-1 font-mono ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                    {s.code}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Sector Spotlight Card */}
        <div className="bg-white rounded-card border border-border shadow-sm p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  {selectedSector.id}
                </span>
                <span className="text-xs text-gold font-bold tracking-wider uppercase">
                  {selectedSector.regulatoryBody}
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-ink mt-1">
                {selectedSector.name}
              </h2>
            </div>

            <Link
              href="/request-service?practice=posh"
              className="px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded shadow transition inline-flex items-center gap-1.5 shrink-0"
            >
              <span>Engage Acorn for {selectedSector.code}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-slate-500 block mb-1">
              Governing Statutory Citation &amp; Regulations:
            </span>
            <div className="p-3 bg-slate-50 rounded border border-slate-200 font-mono text-xs text-primary font-medium">
              {selectedSector.statutoryReference}
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-slate-500 block mb-3">
              Sector Mandatory Compliance Directives:
            </span>
            <div className="space-y-3">
              {selectedSector.keyMandates.map((m, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 bg-slate-50/60 border border-slate-100 rounded-lg text-xs text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{m}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 bg-gold/10 border border-gold/30 rounded-lg space-y-2">
            <div className="flex items-center gap-2 font-bold text-primary text-xs">
              <Scale className="w-4 h-4 text-gold" />
              <span>Acorn Legal Consulting Practice Blueprint</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedSector.acornSpecialization}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

