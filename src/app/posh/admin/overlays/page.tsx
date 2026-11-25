"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  ShieldCheck,
  Building2,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ArrowRight,
  Filter,
  Download,
  Eye,
  Check,
  Scale,
  Compass,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { platformStore } from "@/lib/store";
import { useRealtimeCollection } from "@/lib/realtime";

interface SectorOverlayConfig {
  code: string;
  name: string;
  regulatoryBody: string;
  statutoryBasis: string;
  status: "ACTIVE" | "PENDING_COUNSEL" | "DRAFT";
  version: string;
  dualApprovedBy?: string;
  approvalDate?: string;
  requiresCounselGate: boolean;
  routesToLocalCommittee: boolean;
  relationshipTypes: string[];
  trainingVariant: string;
  notes: string;
}

const INITIAL_OVERLAYS: SectorOverlayConfig[] = [
  {
    code: "SCT-01",
    name: "Higher Education, Colleges & Universities",
    regulatoryBody: "University Grants Commission (UGC) / AICTE",
    statutoryBasis: "UGC (Prevention, Prohibition and Redressal of Sexual Harassment) Regulations, 2015 & POSH Act 2013",
    status: "ACTIVE",
    version: "v2.1",
    dualApprovedBy: "Adv. Rajesh Telge (Managing Counsel)",
    approvalDate: "2026-10-15",
    requiresCounselGate: false,
    routesToLocalCommittee: false,
    relationshipTypes: ["Faculty", "Staff", "Student", "Research Scholar", "Visiting Fellow"],
    trainingVariant: "TRN-EDU-01 (Campus & Faculty Dynamics)",
    notes: "Aggrieved woman covers enrolled students. Mandatory student representation on IC for student-involved inquiries.",
  },
  {
    code: "SCT-02",
    name: "Hospitals, Clinics & Healthcare Institutions",
    regulatoryBody: "National Medical Commission (NMC) / State Medical Council",
    statutoryBasis: "POSH Act 2013, Hospital By-Laws & Clinical Establishments Act",
    status: "ACTIVE",
    version: "v2.0",
    dualApprovedBy: "Adv. Rajesh Telge (Managing Counsel)",
    approvalDate: "2026-09-20",
    requiresCounselGate: false,
    routesToLocalCommittee: false,
    relationshipTypes: ["Resident Doctor", "Consultant", "Nursing Staff", "Attendant", "Contract Staff"],
    trainingVariant: "TRN-MED-02 (Clinical Shift & Night-Duty Protocols)",
    notes: "Third-party patient privacy guard active. Interim relief includes duty roster isolation.",
  },
  {
    code: "SCT-03",
    name: "Information Technology & Global Capability Centres (GCC)",
    regulatoryBody: "Ministry of Electronics and Information Technology (MeitY)",
    statutoryBasis: "POSH Act 2013 & BRSR Principle 5 Disclosures",
    status: "ACTIVE",
    version: "v3.0",
    dualApprovedBy: "Adv. Rajesh Telge (Managing Counsel)",
    approvalDate: "2026-11-01",
    requiresCounselGate: false,
    routesToLocalCommittee: false,
    relationshipTypes: ["Regular Employee", "Contractor", "Remote Worker", "Intern", "Vendor"],
    trainingVariant: "TRN-IT-401 (Virtual & Digital Workplace Conduct)",
    notes: "Online conduct evidence ingestion active (Slack, Teams, Email headers). Multi-branch IC mapping.",
  },
  {
    code: "SCT-04",
    name: "Hospitality, Retail, Security & Facility Services",
    regulatoryBody: "State Shops and Establishments Acts & Ministry of Labour",
    statutoryBasis: "POSH Act 2013 & Model Standing Orders",
    status: "ACTIVE",
    version: "v1.8",
    dualApprovedBy: "Adv. Rajesh Telge (Managing Counsel)",
    approvalDate: "2026-08-12",
    requiresCounselGate: false,
    routesToLocalCommittee: false,
    relationshipTypes: ["Frontline Staff", "Agency Worker", "Contract Guard", "Housekeeping", "Guest/Visitor"],
    trainingVariant: "TRN-HOSP-04 (Low-Literacy & Shift Dynamics)",
    notes: "Audio narrative recording option and bilingual (Hindi/Bengali) visual posters enabled.",
  },
  {
    code: "SCT-05",
    name: "Factories, Manufacturing & Contractor-Heavy Plants",
    regulatoryBody: "Chief Inspector of Factories & Ministry of Labour",
    statutoryBasis: "Factories Act, 1948 & POSH Act 2013",
    status: "ACTIVE",
    version: "v2.2",
    dualApprovedBy: "Adv. Rajesh Telge (Managing Counsel)",
    approvalDate: "2026-10-05",
    requiresCounselGate: false,
    routesToLocalCommittee: false,
    relationshipTypes: ["Permanent Worker", "Contract Worker", "Apprentice", "Site Engineer"],
    trainingVariant: "TRN-MFG-05 (Plant & Shift Safety Standards)",
    notes: "Principal employer responsibility tracking enabled under Sec. 2(f). Site-level branch records.",
  },
  {
    code: "SCT-06",
    name: "Media, Film, Theatre & Event Production Units",
    regulatoryBody: "Ministry of Information & Broadcasting / Guilds",
    statutoryBasis: "POSH Act 2013 & Project-Based Industry Rules",
    status: "ACTIVE",
    version: "v1.5",
    dualApprovedBy: "Adv. Rajesh Telge (Managing Counsel)",
    approvalDate: "2026-07-18",
    requiresCounselGate: false,
    routesToLocalCommittee: false,
    relationshipTypes: ["Freelancer", "Artist", "Crew Member", "Production Executive"],
    trainingVariant: "TRN-MEDIA-06 (Project-Based Freelance Safeguards)",
    notes: "Project-type tenancy with automatic archive upon wrap-up. Temporary project IC charters.",
  },
  {
    code: "SCT-07",
    name: "Domestic Workers & Private Dwelling Places",
    regulatoryBody: "District Magistrate / Local Committee (Section 6)",
    statutoryBasis: "POSH Act 2013, Section 2(m) & Section 6",
    status: "ACTIVE",
    version: "v1.0",
    dualApprovedBy: "Adv. Rajesh Telge (Managing Counsel)",
    approvalDate: "2026-06-10",
    requiresCounselGate: false,
    routesToLocalCommittee: true,
    relationshipTypes: ["Domestic Worker", "Caregiver", "Driver", "Cook"],
    trainingVariant: "TRN-DOM-07 (Community & Local Committee Rights)",
    notes: "Private households are not employer tenants. Inquiries strictly routed to District Local Committee.",
  },
  {
    code: "SCT-08",
    name: "Unorganised Sector (Street Vending, Small Workshops)",
    regulatoryBody: "District Nodal Officers & District Collectorate",
    statutoryBasis: "POSH Act 2013, Section 6 & Supreme Court 2024 Orders",
    status: "ACTIVE",
    version: "v1.0",
    dualApprovedBy: "Adv. Rajesh Telge (Managing Counsel)",
    approvalDate: "2026-06-10",
    requiresCounselGate: false,
    routesToLocalCommittee: true,
    relationshipTypes: ["Informal Worker", "Daily Wage Earner", "Artisan"],
    trainingVariant: "TRN-UNORG-08 (Statutory Rights Under District Officer)",
    notes: "Direct 7-day forwarding to Local Committee pursuant to Aureliano Fernandes directives.",
  },
  {
    code: "SCT-09",
    name: "Gig & Digital Platform Workers",
    regulatoryBody: "Code on Social Security, 2020 & State Gig Worker Guidelines",
    statutoryBasis: "Unsettled statutory position; voluntary policy adoption",
    status: "PENDING_COUNSEL",
    version: "v1.2-SANDBOX",
    requiresCounselGate: true,
    routesToLocalCommittee: false,
    relationshipTypes: ["Platform Partner", "Delivery Executive", "Independent Contractor"],
    trainingVariant: "TRN-GIG-09 (Platform Grievance Protocols)",
    notes: "Requires counsel verification on worker classification prior to activating corporate IC jurisdiction.",
  },
  {
    code: "SCT-10",
    name: "Law Firms, Advocates' Chambers & Bar Associations",
    regulatoryBody: "Bar Council of India / State Bar Councils",
    statutoryBasis: "POSH Act 2013 (Kerala HC Precedent on Bar Associations)",
    status: "ACTIVE",
    version: "v2.0",
    dualApprovedBy: "Adv. Rajesh Telge (Managing Counsel)",
    approvalDate: "2026-10-22",
    requiresCounselGate: false,
    routesToLocalCommittee: false,
    relationshipTypes: ["Associate Advocate", "Intern", "Legal Assistant", "Clerk"],
    trainingVariant: "TRN-LAW-10 (Chambers & Legal Fiduciary Conduct)",
    notes: "Bar association matters routed to Local Committee. Full IC required for law firms >= 10 staff.",
  },
  {
    code: "SCT-11",
    name: "Government Departments, PSUs & Autonomous Bodies",
    regulatoryBody: "Department of Personnel & Training (DoPT) / CVC",
    statutoryBasis: "Central Civil Services (Conduct) Rules & POSH Act 2013",
    status: "ACTIVE",
    version: "v2.5",
    dualApprovedBy: "Adv. Rajesh Telge (Managing Counsel)",
    approvalDate: "2026-11-05",
    requiresCounselGate: false,
    routesToLocalCommittee: false,
    relationshipTypes: ["Gazetted Officer", "Non-Gazetted Employee", "Deputation Staff", "Contractor"],
    trainingVariant: "TRN-GOV-11 (Public Authority & SHe-Box Compliance)",
    notes: "Mandatory SHe-Box registration verification. RTI Section 16 confidentiality exemptions applied.",
  },
  {
    code: "SCT-12",
    name: "Armed Forces, Police & Paramilitary Units",
    regulatoryBody: "Ministry of Defence / Ministry of Home Affairs",
    statutoryBasis: "Army/Navy/Air Force Acts & Special Service Tribunals",
    status: "PENDING_COUNSEL",
    version: "v1.0-GATE",
    requiresCounselGate: true,
    routesToLocalCommittee: false,
    relationshipTypes: ["Uniformed Personnel", "Civilian Employee", "Trainee"],
    trainingVariant: "TRN-DEF-12 (Armed Forces Tribunal & Service Rules)",
    notes: "MANDATORY COUNSEL GATE: Tenant cannot be activated without Senior Counsel verification.",
  },
  {
    code: "SCT-13",
    name: "Non-Governmental Organisations, Trusts & Societies",
    regulatoryBody: "Registrar of Societies / Charity Commissioner",
    statutoryBasis: "POSH Act 2013 & Societies Registration Act",
    status: "ACTIVE",
    version: "v1.4",
    dualApprovedBy: "Adv. Rajesh Telge (Managing Counsel)",
    approvalDate: "2026-09-15",
    requiresCounselGate: false,
    routesToLocalCommittee: false,
    relationshipTypes: ["Program Staff", "Volunteer", "Beneficiary", "Intern"],
    trainingVariant: "TRN-NGO-13 (Humanitarian & Community Setting)",
    notes: "Beneficiary grievances flagged for Counsel preliminary assessment.",
  },
  {
    code: "SCT-14",
    name: "Co-Working Hubs, Shared Offices & Tech Parks",
    regulatoryBody: "State Shops & Commercial Establishments",
    statutoryBasis: "POSH Act 2013 (Multi-Employer Premises Rule)",
    status: "ACTIVE",
    version: "v2.0",
    dualApprovedBy: "Adv. Rajesh Telge (Managing Counsel)",
    approvalDate: "2026-10-01",
    requiresCounselGate: false,
    routesToLocalCommittee: false,
    relationshipTypes: ["Community Member", "Hub Staff", "Contract Vendor"],
    trainingVariant: "TRN-HUB-14 (Shared Premises Jurisdictional Protocols)",
    notes: "Cross-employer formal cooperation protocol RT-07 automatically issued to host facility.",
  },
  {
    code: "SCT-15",
    name: "Sports Academies, Federations & Training Centres",
    regulatoryBody: "Ministry of Youth Affairs & Sports / National Sports Federations",
    statutoryBasis: "National Sports Development Code & POSH Act 2013",
    status: "ACTIVE",
    version: "v1.6",
    dualApprovedBy: "Adv. Rajesh Telge (Managing Counsel)",
    approvalDate: "2026-08-30",
    requiresCounselGate: false,
    routesToLocalCommittee: false,
    relationshipTypes: ["Athlete", "Coach", "Physiotherapist", "Federation Official"],
    trainingVariant: "TRN-SPORT-15 (Athlete Protection & Safe Sports)",
    notes: "Heightened fiduciary duty of care for minor and emerging athletes.",
  },
  {
    code: "SCT-16",
    name: "Political Parties & Registered Trade Unions",
    regulatoryBody: "Election Commission of India / Trade Union Registrar",
    statutoryBasis: "Trade Unions Act 1926 & Non-Statutory Internal Charters",
    status: "PENDING_COUNSEL",
    version: "v1.0-GATE",
    requiresCounselGate: true,
    routesToLocalCommittee: false,
    relationshipTypes: ["Party Cadre", "Office Bearer", "Union Member"],
    trainingVariant: "TRN-POL-16 (Political Entity Voluntary Safeguards)",
    notes: "MANDATORY COUNSEL GATE: Non-statutory policy adoption requiring counsel legal opinion.",
  },
  {
    code: "SCT-17",
    name: "Multinational Corporations & Cross-Border Remote Teams",
    regulatoryBody: "Ministry of Corporate Affairs / Cross-Border Jurisdictions",
    statutoryBasis: "POSH Act 2013 & Global Code of Conduct (Extra-territorial)",
    status: "ACTIVE",
    version: "v2.3",
    dualApprovedBy: "Adv. Rajesh Telge (Managing Counsel)",
    approvalDate: "2026-11-10",
    requiresCounselGate: false,
    routesToLocalCommittee: false,
    relationshipTypes: ["Global Employee", "Expat Staff", "Third-Party Consultant"],
    trainingVariant: "TRN-MNC-17 (Cross-Border Jurisdictional Compliance)",
    notes: "Handles dual-jurisdiction events and extraterritorial workplace definitions.",
  },
];

export default function PoshAdminOverlaysPage() {
  const { toast } = useToast();
  const overlays = useRealtimeCollection<SectorOverlayConfig[]>("posh_sector_overlays", INITIAL_OVERLAYS);
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [selectedOverlay, setSelectedOverlay] = useState<SectorOverlayConfig | null>(null);

  const handleApprove = (code: string) => {
    const updated = overlays.map((o) =>
      o.code === code
        ? {
            ...o,
            status: "ACTIVE" as const,
            dualApprovedBy: "Adv. Rajesh Telge (Chambers Counsel)",
            approvalDate: new Date().toISOString().split("T")[0],
          }
        : o
    );
    platformStore.saveCollectionState("posh_sector_overlays", updated);
    toast({
      title: "Sector Approved",
      description: `Sector Overlay ${code} dual-approved by Chambers Counsel.`,
      variant: "success",
    });
  };

  const handleExportConfig = () => {
    const jsonStr = JSON.stringify(overlays, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `acorn-sector-overlays-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Config Exported",
      description: "Sector overlays configuration exported successfully.",
      variant: "success",
    });
  };

  const filteredOverlays = overlays.filter((o) => {
    if (selectedFilter === "ALL") return true;
    if (selectedFilter === "ACTIVE") return o.status === "ACTIVE";
    if (selectedFilter === "PENDING") return o.status === "PENDING_COUNSEL";
    if (selectedFilter === "LOCAL_COMMITTEE") return o.routesToLocalCommittee;
    return true;
  });

  return (
    <div className="min-h-screen bg-ivory-50 text-ink pt-28 pb-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-navy-700/70 mb-2">
            <Link href="/admin" className="hover:underline">Admin Console</Link>
            <span>/</span>
            <Link href="/posh/admin" className="hover:underline">POSH Governance</Link>
            <span>/</span>
            <span className="text-navy-900 font-semibold">Sector Overlays (SCT-R01 to R04)</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-ivory-300">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-navy-100 text-navy-800 border border-navy-200 mb-2">
                <Layers className="w-3.5 h-3.5 text-navy-700" />
                PRD Section 8.33 & Prompt 7.2 Administrative Governance
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal">
                Sector Overlays & Statutory Jurisdiction Matrix
              </h1>
              <p className="mt-1 text-sm text-ink-muted max-w-3xl">
                Dual-approved regulatory overlays tailoring statutory workflows, IC member compositions, training curricula, and routing logic across all 17 distinct employment sectors.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleExportConfig}
                className="inline-flex items-center gap-2 px-4 py-2 border border-ivory-300 rounded text-xs font-medium bg-white hover:bg-ivory-100 text-navy-800 shadow-sm transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON Config</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 mb-6 p-1 bg-ivory-200/60 rounded-lg border border-ivory-300 w-fit">
          {[
            { id: "ALL", label: "All 17 Sectors" },
            { id: "ACTIVE", label: "Active & Dual-Approved" },
            { id: "PENDING", label: "Pending Counsel Approval" },
            { id: "LOCAL_COMMITTEE", label: "Local Committee Mandates" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                selectedFilter === tab.id
                  ? "bg-navy-700 text-white shadow-sm"
                  : "text-ink-muted hover:text-navy-900 hover:bg-ivory-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overlays Table */}
        <div className="bg-white border border-ivory-300 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-ivory-100/70 border-b border-ivory-300 font-mono text-[11px] uppercase tracking-wider text-navy-900">
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Sector Description</th>
                  <th className="py-3 px-4">Regulatory Authority</th>
                  <th className="py-3 px-4">Routing & Gates</th>
                  <th className="py-3 px-4">Version & Approval</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-200">
                {filteredOverlays.map((item) => (
                  <tr key={item.code} className="hover:bg-ivory-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-navy-800">
                      {item.code}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-navy-950 text-sm">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-ink-muted mt-0.5 max-w-md line-clamp-1">
                        {item.notes}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-ink font-medium">
                      {item.regulatoryBody}
                    </td>
                    <td className="py-3 px-4">
                      {item.requiresCounselGate ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                          <Lock className="w-2.5 h-2.5" />
                          Counsel Gate Required
                        </span>
                      ) : item.routesToLocalCommittee ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-900 border border-blue-300">
                          <Compass className="w-2.5 h-2.5" />
                          District Local Committee
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-700">
                          Standard IC Docket
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px]">
                      <div>{item.version}</div>
                      {item.dualApprovedBy ? (
                        <div className="text-[10px] text-emerald-700">
                          Verified: {item.approvalDate}
                        </div>
                      ) : (
                        <div className="text-[10px] text-amber-700">Awaiting Sign-off</div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {item.status === "ACTIVE" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                          <AlertTriangle className="w-3 h-3 text-amber-700" />
                          Pending Counsel
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedOverlay(item)}
                          className="px-2.5 py-1 rounded border border-ivory-300 hover:bg-ivory-100 text-navy-800 transition-colors text-xs font-medium"
                        >
                          Details
                        </button>
                        {item.status === "PENDING_COUNSEL" && (
                          <button
                            onClick={() => handleApprove(item.code)}
                            className="px-2.5 py-1 rounded bg-navy-700 hover:bg-navy-800 text-white transition-colors text-xs font-medium"
                          >
                            Approve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Overlay Modal */}
        {selectedOverlay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg border border-ivory-300 shadow-xl max-w-2xl w-full p-6 relative">
              <div className="flex items-center justify-between pb-4 border-b border-ivory-200">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-navy-100 text-navy-800">
                    {selectedOverlay.code}
                  </span>
                  <h3 className="font-serif text-xl text-navy-950 font-semibold">
                    {selectedOverlay.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedOverlay(null)}
                  className="text-ink-muted hover:text-navy-950 text-sm font-semibold p-1"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs text-ink/90">
                <div>
                  <span className="font-semibold text-navy-950 block">Statutory Basis:</span>
                  <p className="text-ink-muted mt-0.5">{selectedOverlay.statutoryBasis}</p>
                </div>

                <div>
                  <span className="font-semibold text-navy-950 block">Governing Regulatory Authority:</span>
                  <p className="text-ink-muted mt-0.5">{selectedOverlay.regulatoryBody}</p>
                </div>

                <div>
                  <span className="font-semibold text-navy-950 block">Governed Relationship Taxonomy:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedOverlay.relationshipTypes.map((rel, i) => (
                      <span key={i} className="px-2 py-0.5 bg-ivory-100 text-navy-800 rounded font-mono text-[11px] border border-ivory-300">
                        {rel}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-navy-950 block">Assigned Training Curriculum Variant:</span>
                  <p className="font-mono text-navy-800 bg-ivory-100 p-1.5 rounded border border-ivory-300 mt-1">
                    {selectedOverlay.trainingVariant}
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-navy-950 block">Special Statutory Notes & Counsel Guidance:</span>
                  <p className="bg-amber-50/70 text-amber-900 border border-amber-200 p-2.5 rounded mt-1 leading-relaxed">
                    {selectedOverlay.notes}
                  </p>
                </div>

                {selectedOverlay.dualApprovedBy && (
                  <div className="pt-2 border-t border-ivory-200 flex items-center justify-between text-[11px] text-ink-muted">
                    <span>Approved by: {selectedOverlay.dualApprovedBy}</span>
                    <span>Date: {selectedOverlay.approvalDate}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-ivory-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedOverlay(null)}
                  className="px-4 py-2 border border-ivory-300 hover:bg-ivory-100 rounded text-xs font-medium text-navy-800 transition-colors"
                >
                  Close
                </button>
                {selectedOverlay.status === "PENDING_COUNSEL" && (
                  <button
                    onClick={() => {
                      handleApprove(selectedOverlay.code);
                      setSelectedOverlay(null);
                    }}
                    className="px-4 py-2 bg-navy-700 hover:bg-navy-800 text-white rounded text-xs font-medium transition-colors"
                  >
                    Grant Counsel Dual-Approval
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
