"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  MapPin,
  CheckCircle2,
  Printer,
  Download,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Building,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export default function PoshOrgNoticesPage() {
  const [selectedOrgId, setSelectedOrgId] = useState("org-1");
  const orgs = platformStore.getOrganizations();
  const activeOrg = orgs.find((o) => o.id === selectedOrgId) || orgs[0];

  const locations = [
    {
      id: "LOC-01",
      name: "Salt Lake Sector V Headquarters (Kolkata)",
      floor: "Ground Floor Main Reception & 4th Floor Cafeteria",
      type: "Physical Notice Board (Bilingual: English + Bengali)",
      verifiedAt: "2026-10-15",
      status: "Compliant & Verified",
      inspector: "Adv. Debjani Sen (Acorn Legal Consultants)",
    },
    {
      id: "LOC-02",
      name: "Rajarhat New Town Development Centre (Kolkata)",
      floor: "Building B Employee Entry & 2nd Floor Breakout Area",
      type: "Physical Notice Board (Bilingual: English + Bengali)",
      verifiedAt: "2026-10-18",
      status: "Compliant & Verified",
      inspector: "Adv. Debjani Sen (Acorn Legal Consultants)",
    },
    {
      id: "LOC-03",
      name: "Employee Virtual Workspace & Intranet",
      floor: "Global Employee Portal & Slack Workplace Announcement Banner",
      type: "Digital Continuous Notice Display",
      verifiedAt: "2026-11-01",
      status: "Active & Monitored",
      inspector: "HR Compliance Team",
    },
  ];

  return (
    <div className="bg-ivory-50 min-h-screen py-10 text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link
            href="/posh/org"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to Organisation Console ({activeOrg.name})</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/posh/org/training" className="text-primary font-semibold hover:underline">
              Training LMS (O-05) &rarr;
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="bg-surface p-6 sm:p-8 rounded-card border border-border shadow-card space-y-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                <MapPin className="w-4 h-4 text-primary" />
                <span>PRD Screen O-04 &bull; Section 19(b) Notice Board Displays</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
                Statutory Notice Board Displays &amp; Physical Compliance Audit
              </h1>
              <p className="text-xs text-ink-secondary mt-1">
                Employer: <span className="font-semibold text-ink">{activeOrg.name}</span> &bull; Display of penal consequences and order of constitution of IC at conspicuous places.
              </p>
            </div>

            <select
              value={selectedOrgId}
              onChange={(e) => setSelectedOrgId(e.target.value)}
              className="px-3 py-2 bg-white border border-border rounded text-xs font-semibold text-ink shrink-0"
            >
              {orgs.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Section 19(b) Mandate Banner */}
        <div className="p-5 bg-white rounded-card border border-border shadow-card text-xs text-ink space-y-2">
          <div className="flex items-center gap-2 font-serif font-bold text-primary text-sm">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>Statutory Mandate: Section 19(b) of POSH Act 2013</span>
          </div>
          <p className="text-ink-secondary leading-relaxed">
            &quot;Every employer shall display at any conspicuous place in the workplace, the penal consequences of sexual harassments; and the order constituting, the Internal Committee under sub-section (1) of section 4.&quot; Failure to comply invites statutory fine up to ₹50,000 under Section 26.
          </p>
        </div>

        {/* Printable Notice Posters Download Box */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <div className="flex justify-between items-center border-b border-border-subtle pb-3">
            <h2 className="font-serif font-bold text-base text-ink">
              Bilingual High-Resolution Statutory Posters
            </h2>
            <span className="text-xs text-ink-secondary">Formatted for A2 / A3 Print Displays</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-white p-4 rounded border border-border space-y-3">
              <div className="font-bold text-ink text-sm">
                1. English &amp; Bengali Statutory Notice (Kolkata Standard)
              </div>
              <p className="text-ink-secondary text-[11px] leading-relaxed">
                Contains complete statutory definition of sexual harassment, penal consequences under IPC / BNS &amp; POSH Act, confidential grievance filing link, and contact coordinates of Presiding Officer and Acorn Legal External Member.
              </p>
              <button
                onClick={() => alert("Downloading print-ready bilingual A3 poster (PDF)...")}
                className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-accent" />
                <span>Download Poster (English + বাংলা)</span>
              </button>
            </div>

            <div className="bg-white p-4 rounded border border-border space-y-3">
              <div className="font-bold text-ink text-sm">
                2. Digital Intranet &amp; Screen Saver Graphic Pack
              </div>
              <p className="text-ink-secondary text-[11px] leading-relaxed">
                High-contrast digital creatives designed for employee portal homepages, digital signage monitors in corporate lobbies, and remote team onboarding packages.
              </p>
              <button
                onClick={() => alert("Downloading digital graphics asset bundle (.ZIP)...")}
                className="px-4 py-2 border border-border text-ink text-xs font-semibold rounded hover:bg-surface flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Digital Asset Pack</span>
              </button>
            </div>
          </div>
        </div>

        {/* Monitored Workplace Locations */}
        <div className="bg-surface p-6 rounded-card border border-border shadow-card space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-serif font-bold text-base text-ink">
              Workplace Notice Verification Audit Ledger
            </h2>
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Locations Verified</span>
            </span>
          </div>

          <div className="space-y-3">
            {locations.map((loc) => (
              <div key={loc.id} className="bg-white p-4 rounded border border-border space-y-2 text-xs">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-border-subtle pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-primary">{loc.id}</span>
                    <span className="font-bold text-ink text-sm">{loc.name}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {loc.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-ink-secondary">
                  <div>Physical Spot: <span className="font-semibold text-ink">{loc.floor}</span></div>
                  <div>Format: <span className="font-semibold text-ink">{loc.type}</span></div>
                </div>

                <div className="text-[11px] text-ink-secondary pt-1 flex justify-between items-center">
                  <span>Last Inspected: {loc.verifiedAt} by {loc.inspector}</span>
                  <button
                    onClick={() => alert(`Viewing inspection photo evidence for ${loc.id}...`)}
                    className="text-primary hover:underline font-semibold"
                  >
                    View Photo Evidence &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
