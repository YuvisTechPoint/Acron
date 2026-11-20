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
import { formatDate, downloadFile } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

export default function PoshOrgNoticesPage() {
  const { toast } = useToast();
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
          <Link
            href="/posh/org"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-primary transition-colors min-h-[44px] px-2 -ml-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to Organisation Console ({activeOrg.name})</span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/posh/org/training" className="text-primary font-semibold hover:underline min-h-[44px] flex items-center px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
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
                onClick={() => {
                  const posterSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1130" viewBox="0 0 800 1130">
  <rect width="800" height="1130" fill="#FBF9F5"/>
  <rect x="20" y="20" width="760" height="1090" fill="none" stroke="#0E2042" stroke-width="4"/>
  <rect x="30" y="30" width="740" height="1070" fill="none" stroke="#C29B38" stroke-width="1.5"/>
  <text x="400" y="90" font-family="serif" font-size="28" font-weight="bold" fill="#0E2042" text-anchor="middle">ACORN LEGAL CONSULTANTS &bull; POSH ACT 2013</text>
  <text x="400" y="125" font-family="sans-serif" font-size="14" font-weight="bold" fill="#C29B38" text-anchor="middle" letter-spacing="3">MANDATORY STATUTORY WORKPLACE NOTICE (SECTION 19(b))</text>
  <line x1="100" y1="145" x2="700" y2="145" stroke="#E2D9C8" stroke-width="1"/>
  <text x="80" y="190" font-family="serif" font-size="20" font-weight="bold" fill="#0E2042">1. Prohibition of Sexual Harassment</text>
  <text x="80" y="220" font-family="sans-serif" font-size="12" fill="#334155">Sexual harassment at workplace is an offence under Section 3 of the POSH Act 2013 and IPC/BNS.</text>
  <text x="80" y="240" font-family="sans-serif" font-size="12" fill="#334155">কর্মক্ষেত্রে যে কোনও ধরনের যৌন হয়রানি সম্পূর্ণ নিষিদ্ধ ও আইনত দণ্ডনীয় অপরাধ।</text>
  <text x="80" y="290" font-family="serif" font-size="20" font-weight="bold" fill="#0E2042">2. Internal Committee (IC) Contacts</text>
  <text x="80" y="320" font-family="sans-serif" font-size="12" fill="#334155">Presiding Officer: Dr. Ananya Mukherjee | External Member: Adv. Debjani Sen (Acorn Legal)</text>
  <text x="80" y="340" font-family="sans-serif" font-size="12" fill="#334155">Confidential Portal: https://acornlegal.in/posh/portal</text>
  <text x="400" y="1050" font-family="serif" font-size="12" fill="#64748B" text-anchor="middle">Excellence in Law. Integrity in Practice. Acorn Legal Consultants, Kolkata.</text>
</svg>
                  `.trim();
                  downloadFile(`POSH-Statutory-Notice-Poster-${activeOrg.code}.svg`, posterSvg, "image/svg+xml;charset=utf-8");
                  toast({
                    title: "Poster Downloaded",
                    description: `Print-ready bilingual A3 poster (English + বাংলা) downloaded.`,
                    variant: "success",
                  });
                }}
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
                onClick={() => {
                  const digitalBundle = [
                    "===========================================================",
                    "  ACORN LEGAL CONSULTANTS - DIGITAL ASSET MANIFEST",
                    "===========================================================",
                    `Client: ${activeOrg.name}`,
                    "Format: Digital Intranet Banner / Screensaver Pack",
                    "Dimensions: 1920x1080 Full HD & 1200x630 Social Banner",
                    "Includes: Mandatory Sec 19(b) penal notice, QR code to confidential portal,",
                    "and Presiding Officer direct contact channel.",
                    "===========================================================",
                  ].join("\n");
                  downloadFile(`POSH-Digital-Creatives-${activeOrg.code}.txt`, digitalBundle);
                  toast({
                    title: "Asset Pack Downloaded",
                    description: "Digital intranet & screensaver graphics manifest downloaded.",
                    variant: "info",
                  });
                }}
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
                    onClick={() => {
                      toast({
                        title: "Inspection Photo Evidence Verified",
                        description: `Location ${loc.id} physical notice display confirmed by ${loc.inspector} on ${loc.verifiedAt}. Tamper hash logged.`,
                        variant: "success",
                      });
                    }}
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
