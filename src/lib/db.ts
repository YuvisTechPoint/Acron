import fs from "fs";
import path from "path";
import { EventEmitter } from "events";
import {
  POSHCase,
  ServiceRequest,
  QuestionAnswer,
  BlogPost,
  User,
  Organization,
  AuditLogEntry,
  SiteConfig,
  FaqItem,
  TeamMemberItem,
  LegalRule,
  SystemSettings,
} from "./types";
import { computeAuditHash } from "./crypto";

// Persistent disk path for the database file
const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "acorn-database.json");

// In-memory Database Schema
export interface DatabaseSchema {
  version: string;
  lastUpdated: string;
  siteConfig: SiteConfig;
  services: any[];
  blogPosts: BlogPost[];
  cases: POSHCase[];
  serviceRequests: ServiceRequest[];
  questions: QuestionAnswer[];
  organizations: Organization[];
  users: User[];
  auditLogs: AuditLogEntry[];
  signatures: any[];
  auditPacks: any[];
  connectors: any[];
  subscriptions: any[];
  earlyWarnings: any[];
  benchmarks: any[];
  faqs?: FaqItem[];
  team?: TeamMemberItem[];
  legalRules?: LegalRule[];
  systemSettings?: SystemSettings;
}

// Initial Chambers Default Seed (Statutory & Chambers Foundation)
const INITIAL_SEED: DatabaseSchema = {
  version: "3.0.0",
  lastUpdated: new Date().toISOString(),
  siteConfig: {
    firmName: "ACORN",
    tagline: "",
    brandSubline: "",
    founderName: "Adv. Debjani Sen",
    founderTitle: "Managing Counsel",
    disclaimer:
      "As per the rules of the Bar Council of India, law firms and legal practitioners are not permitted to solicit work or advertise. The information on this website is solely for informational purposes.",
    primaryEmail: "contact@acornlegal.in",
    poshEmail: "posh-helpdesk@acornlegal.in",
    receptionPhone: "+91 (033) 2486-7700",
    emergencyPhone: "+91 98300 99999",
    addressLine1: "Suite 4B, Camac Court, 25 Camac Street",
    addressLine2: "Park Street District",
    city: "Kolkata",
    postalCode: "700016",
    state: "West Bengal",
    operatingHours: "Mon – Sat: 9:30 AM – 7:30 PM IST",
    courtVacationNotice: "Calcutta High Court Winter Vacation Notice: Vacation Bench sitting available for urgent interim relief.",
    googleMapsQuery: "Acorn Legal Consultants, Camac Street, Kolkata",
    heroHeadline: "Excellence in Law.",
    heroSubheadline: "Integrity in Practice.",
    heroDescription:
      "A specialized legal consultancy in Kolkata delivering thoughtful, precise, and result-oriented solutions for corporate governance, commercial contracts, regulatory affairs, and institutional integrity.",
    heroBgImage: "/images/hero.png",
    heroPrimaryCtaText: "Request a Consultation",
    heroPrimaryCtaLink: "/request-service",
    heroSecondaryCtaText: "Explore our services",
    heroSecondaryCtaLink: "/services",
    heroBadge1Title: "Discretion",
    heroBadge1Desc: "Absolute privilege & confidentiality",
    heroBadge2Title: "Diligence",
    heroBadge2Desc: "Exhaustive statutory research",
    heroBadge3Title: "Transparency",
    heroBadge3Desc: "Clear scope & accountable advisory",
    heroArchTitle: "Chambers of Acorn",
    heroArchSubtitle: "CAMAC STREET • KOLKATA",
    footerRollText:
      "Acorn Legal Consultants • Excellence in Law • Integrity in Practice • Calcutta High Court • POSH Act Advisory • Corporate Governance • Commercial Contracts • Arbitration & Mediation",
    updatedAt: new Date().toISOString(),
  },
  services: [
    {
      id: "srv-advisory",
      slug: "advisory",
      name: "Corporate Advisory & Regulatory Compliance",
      shortDesc: "Strategic counsel on corporate governance, Companies Act, SEBI mandates, and regulatory oversight.",
      description: "Comprehensive corporate advisory services ensuring statutory compliance and strategic risk management.",
      features: [
        "Board Advisory & Governance Frameworks",
        "Companies Act, 2013 Statutory Filings",
        "FDI & FEMA Cross-Border Structuring",
        "Regulatory Inspection Representation",
      ],
      pricePaise: 4500000,
      turnaround: "3-5 Working Days",
      status: "active",
      showOnHomepage: true,
      order: 1,
    },
    {
      id: "srv-contracts",
      slug: "legal-documentation",
      name: "Commercial Contracts & Documentation",
      shortDesc: "Precise drafting, vetting, and negotiation of bespoke commercial agreements and master service contracts.",
      description: "Rigorous contract lifecycle management safeguarding enterprise interests.",
      features: [
        "Master Service & Vendor Agreements",
        "Non-Disclosure & Intellectual Property Assignment",
        "Shareholders & Joint Venture Agreements",
        "Employment & Executive Service Contracts",
      ],
      pricePaise: 3500000,
      turnaround: "2-4 Working Days",
      status: "active",
      showOnHomepage: true,
      order: 2,
    },
    {
      id: "srv-dispute",
      slug: "dispute-resolution",
      name: "Dispute Resolution & Commercial Arbitration",
      shortDesc: "Pre-litigation strategy, statutory mediation, domestic arbitration, and high-stakes negotiation.",
      description: "Structured dispute resolution aimed at swift settlement while preserving commercial relationships.",
      features: [
        "Arbitration & Conciliation Act Proceedings",
        "Section 9 & Section 34 Court Applications",
        "Commercial Contract Breach Settlement",
        "Insolvency & Bankruptcy Code Representation",
      ],
      pricePaise: 6500000,
      turnaround: "Immediate Priority",
      status: "active",
      showOnHomepage: true,
      order: 3,
    },
    {
      id: "srv-posh",
      slug: "posh-compliance",
      name: "POSH Act 2013 Compliance & IC Advisory",
      shortDesc: "Complete statutory compliance, external IC membership, capacity training, and annual reporting desk.",
      description: "End-to-end statutory compliance under the Prevention of Sexual Harassment of Women at Workplace Act, 2013.",
      features: [
        "Empanelled External Member Representation",
        "90-Day Statutory Inquiry Adjudication",
        "Annual Report Filing to District Officer",
        "Confidential Workplace Grievance Audits",
      ],
      pricePaise: 5000000,
      turnaround: "Annual Retainer / On-Demand",
      status: "active",
      showOnHomepage: true,
      order: 4,
    },
  ],
  blogPosts: [
    {
      id: "post-01",
      slug: "posh-annual-report-district-officer-west-bengal-guide",
      title: "Statutory Filing of POSH Annual Reports to the District Officer in West Bengal",
      summary: "A comprehensive practical guide on Section 21 statutory reporting obligations for corporate employers in Kolkata.",
      excerpt: "A comprehensive practical guide on Section 21 statutory reporting obligations for corporate employers in Kolkata.",
      content: "Section 21 of the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 mandates that the Internal Committee shall in each calendar year prepare and submit an annual report to the employer and the District Officer.",
      author: {
        name: "Adv. Debjani Sen",
        role: "Senior Counsel & External Member",
      },
      category: "posh_compliance",
      publishedAt: "2026-10-15",
      status: "published",
      tags: ["POSH Act", "Annual Compliance", "Kolkata Jurisprudence"],
      readingTimeMinutes: 6,
      views: 340,
    },
    {
      id: "post-02",
      slug: "remote-work-hybrid-workplace-posh-jurisdiction",
      title: "Extending POSH Act Jurisdiction to Hybrid Work & Virtual Communications",
      summary: "Navigating Slack, Zoom, and WhatsApp misconduct under the 'notional extension of workplace' doctrine.",
      excerpt: "Navigating Slack, Zoom, and WhatsApp misconduct under the 'notional extension of workplace' doctrine.",
      content: "The definition of 'workplace' under Section 2(o) of the POSH Act has been judicially interpreted expansively by Indian High Courts to encompass any virtual or digital space arising out of or during the course of employment.",
      author: {
        name: "Dr. Ananya Mukherjee",
        role: "Senior Partner, Regulatory Practice",
      },
      category: "posh_compliance",
      publishedAt: "2026-10-28",
      status: "published",
      tags: ["Hybrid Workplace", "Digital Harassment", "Case Law Analysis"],
      readingTimeMinutes: 8,
      views: 290,
    },
    {
      id: "post-03",
      slug: "real-estate-title-due-diligence-kolkata-rajarhat-wbrera",
      title: "Commercial Title Due Diligence & WBRERA Compliance in Rajarhat-New Town",
      summary: "Mitigating title defects, land ceiling sanctions, and municipal approvals in Bengal commercial transactions.",
      excerpt: "Mitigating title defects, land ceiling sanctions, and municipal approvals in Bengal commercial transactions.",
      content: "Institutional investors and corporate acquirers of commercial real estate in greater Kolkata must conduct rigorous thirty-year title searches coupled with WBRERA statutory verification.",
      author: {
        name: "Adv. Sourav Ganguly",
        role: "Partner, Commercial & Property Law",
      },
      category: "real_estate",
      publishedAt: "2026-11-02",
      status: "published",
      tags: ["Real Estate", "WBRERA", "Title Search", "Kolkata"],
      readingTimeMinutes: 7,
      views: 180,
    },
  ],
  cases: [
    {
      id: "ACN-POSH-2026-0041",
      caseNumber: "ACN-POSH-2026-0041",
      orgId: "org-bengal-tech",
      orgName: "Bengal Cloud Technologies Pvt Ltd",
      complainantName: "Executive Employee (Masked)",
      complainantEmail: "complainant.vault@org-bengal-tech.internal",
      complainantPhone: "+91 98300 XXXXX",
      respondentName: "Department Head (Engineering)",
      respondentEmail: "respondent.vault@org-bengal-tech.internal",
      respondentPhone: "+91 98311 XXXXX",
      incidentDates: ["2026-09-12", "2026-09-18"],
      incidentLocation: "Kolkata Development Centre & Microsoft Teams",
      natureOfHarassment: ["verbal", "electronic", "hostile_work_environment"],
      state: "INQUIRY_IN_PROGRESS",
      filedAt: "2026-10-02T10:30:00.000Z",
      inquiryDeadline: "2026-12-31T23:59:59.000Z",
      limitationStatus: "within_3_months",
      summary: "Allegations of persistent inappropriate electronic messages via corporate messaging tools outside business hours accompanied by implied professional retaliation.",
      detailedStatement: "Encrypted under AES-256-GCM narrative vault. Access restricted strictly to Internal Committee quorum.",
      hearings: [
        {
          id: "h-0041-01",
          hearingNumber: 1,
          scheduledDate: "2026-10-20",
          scheduledTime: "11:30 AM IST",
          locationOrLink: "In-Camera Confidential Hearing Chamber, Camac Street",
          attendees: ["Dr. Ananya Mukherjee (PO)", "Adv. Debjani Sen (External Member)", "Complainant"],
          agenda: "Preliminary Examination of Complainant & Exhibit Identification",
          status: "completed",
          minutesSummary: "Complainant affirmed written statement under Section 11. Three electronic chat transcripts submitted as Exhibits A-1 through A-3.",
        },
        {
          id: "h-0041-02",
          hearingNumber: 2,
          scheduledDate: "2026-11-15",
          scheduledTime: "02:30 PM IST",
          locationOrLink: "Virtual Hearing Room (WebRTC Secure)",
          attendees: ["Dr. Ananya Mukherjee (PO)", "Adv. Debjani Sen (External Member)", "Respondent"],
          agenda: "Cross-Examination of Respondent & Defense Exhibit Verification",
          status: "scheduled",
        },
      ],
      evidence: [
        {
          id: "ev-0041-01",
          exhibitCode: "EX-01",
          title: "Export of Microsoft Teams Chat History (Certified under Section 65B)",
          fileType: "application/pdf",
          fileSizeKb: 1420,
          uploadedBy: "complainant",
          uploadedAt: "2026-10-02T11:00:00.000Z",
          sha256Hash: "6c5e7b2a9d8f1e3c4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e6d7c",
          isRedacted: true,
          chainOfCustody: [
            { timestamp: "2026-10-02T11:00:00Z", user: "Complainant", action: "Uploaded digitally" },
            { timestamp: "2026-10-03T14:30:00Z", user: "Presiding Officer", action: "Sealed & Admitted" },
          ],
        },
      ],
      interimReliefRequested: {
        type: "transfer",
        details: "Transfer of reporting relationship during statutory inquiry to prevent interaction.",
        status: "recommended",
        recommendedAt: "2026-10-05T12:00:00.000Z",
      },
    },
    {
      id: "ACN-POSH-2026-0038",
      caseNumber: "ACN-POSH-2026-0038",
      orgId: "org-apex-fin",
      orgName: "Apex Financial Advisory Services",
      complainantName: "Junior Associate (Masked)",
      complainantEmail: "associate@apexfin.internal",
      complainantPhone: "+91 98322 XXXXX",
      respondentName: "Vice President (Advisory)",
      respondentEmail: "vp@apexfin.internal",
      respondentPhone: "+91 98333 XXXXX",
      incidentDates: ["2026-08-20"],
      incidentLocation: "Offsite Corporate Dinner, Park Street",
      natureOfHarassment: ["physical", "unwelcome_conduct"],
      state: "REPORT_SUBMITTED",
      filedAt: "2026-08-28T09:15:00.000Z",
      inquiryDeadline: "2026-11-26T23:59:59.000Z",
      limitationStatus: "within_3_months",
      summary: "Physical boundary violation during client celebration event.",
      detailedStatement: "Encrypted under AES-256-GCM. Section 13 inquiry report submitted to Employer with recommendation for written reprimand and compensation.",
      hearings: [],
      evidence: [],
    },
    {
      id: "ACN-POSH-2026-0029",
      caseNumber: "ACN-POSH-2026-0029",
      orgId: "org-heritage-tea",
      orgName: "Heritage Bengal Tea & Plantations Ltd",
      complainantName: "Estate Executive (Masked)",
      complainantEmail: "estate@heritagetea.internal",
      complainantPhone: "+91 98344 XXXXX",
      respondentName: "Assistant General Manager",
      respondentEmail: "agm@heritagetea.internal",
      respondentPhone: "+91 98355 XXXXX",
      incidentDates: ["2026-06-15"],
      incidentLocation: "Siliguri Regional Office",
      natureOfHarassment: ["verbal"],
      state: "CLOSED",
      filedAt: "2026-06-25T11:45:00.000Z",
      inquiryDeadline: "2026-09-23T23:59:59.000Z",
      limitationStatus: "within_3_months",
      summary: "Inappropriate remarks resolved amicably through non-monetary Section 10 conciliation with formal unconditional apology.",
      detailedStatement: "Closed following compliance report under Section 10(4).",
      hearings: [],
      evidence: [],
    },
  ],
  serviceRequests: [
    {
      id: "SR-1731110000001",
      refNumber: "ACN-SR-2026-104921",
      referenceNumber: "ACN-SR-2026-104921",
      fullName: "Priya Mukherjee",
      name: "Priya Mukherjee",
      email: "p.mukherjee@tartanventures.com",
      phone: "+91 98301 23456",
      organization: "Tartan Ventures LLP",
      preferredChannel: "email",
      preferredMode: "ONLINE_VC",
      serviceCategory: "corporate_advisory",
      practiceArea: "Corporate Advisory",
      subject: "Cross-Border FDI Compliance & Share Subscription Vetting",
      description: "We are closing an institutional seed round from Singapore investors and require FDI reporting and RBI filings.",
      status: "NEW",
      createdAt: "2026-11-05T14:20:00.000Z",
      updatedAt: "2026-11-05T14:20:00.000Z",
      urgency: "urgent",
    },
  ],
  questions: [
    {
      id: "QA-1731110000001",
      refNumber: "ACN-QA-2026-449102",
      referenceNumber: "ACN-QA-2026-449102",
      authorName: "Rohan Sengupta",
      authorEmail: "rohan.s@fintechkolkata.io",
      askedByName: "Rohan Sengupta",
      askedByEmail: "rohan.s@fintechkolkata.io",
      question: "Can an employee file a POSH complaint more than 90 days after the incident if they were on certified medical leave?",
      category: "posh_compliance",
      status: "answered",
      isPublic: true,
      isPublished: true,
      answer: "Under Section 9(1) of the POSH Act, the primary limitation period is 3 months. However, the proviso grants the Internal Committee statutory discretion to condone a delay of up to an additional 3 months (total 6 months / 180 days) upon recording satisfaction that certified medical incapacitation prevented timely filing.",
      answeredBy: "Adv. Debjani Sen",
      views: 312,
      upvotes: 48,
      createdAt: "2026-10-10T16:00:00.000Z",
      updatedAt: "2026-10-11T11:00:00.000Z",
    },
  ],
  organizations: [
    {
      id: "org-bengal-tech",
      name: "Bengal Cloud Technologies Pvt Ltd",
      code: "ORG-BCT-01",
      industry: "Information Technology",
      employeeCount: 420,
      registeredAddress: "DLF IT Park, Tower 2, Sector V, Salt Lake, Kolkata 700091",
      city: "Kolkata",
      hasIC: true,
      complianceScore: 94,
      icPresidingOfficer: "usr-ic-po-01",
      icExternalMember: "usr-ic-ext-01",
      presidingOfficerName: "Dr. Ananya Mukherjee",
      externalMemberName: "Adv. Debjani Sen",
      policyAcknowledgedPct: 98,
      lastAnnualReportYear: 2025,
      annualReportStatus: "submitted_to_do",
      planTier: "retainer_enterprise",
      createdAt: "2024-03-01T00:00:00.000Z",
    },
    {
      id: "org-apex-fin",
      name: "Apex Financial Advisory Services",
      code: "ORG-AFA-02",
      industry: "Banking & Financial Services",
      employeeCount: 165,
      registeredAddress: "Avani Signature, 91A Chowringhee Road, Kolkata 700020",
      city: "Kolkata",
      hasIC: true,
      complianceScore: 88,
      icPresidingOfficer: "usr-ic-po-02",
      icExternalMember: "usr-ic-ext-01",
      presidingOfficerName: "Indrani Lahiri",
      externalMemberName: "Adv. Debjani Sen",
      policyAcknowledgedPct: 92,
      lastAnnualReportYear: 2025,
      annualReportStatus: "submitted_to_do",
      planTier: "retainer_standard",
      createdAt: "2024-06-15T00:00:00.000Z",
    },
  ],
  users: [
    {
      id: "usr-admin-01",
      name: "Adv. Debjani Sen",
      email: "debjani.sen@acornlegal.in",
      roles: ["super_admin", "legal_consultant", "posh_admin"],
      status: "active",
      mfaEnabled: true,
      locale: "en",
      createdAt: "2024-01-01T00:00:00.000Z",
    },
    {
      id: "usr-admin-02",
      name: "Dr. Ananya Mukherjee",
      email: "ananya.mukherjee@acornlegal.in",
      roles: ["admin", "legal_consultant", "ic_presiding_officer"],
      status: "active",
      mfaEnabled: true,
      locale: "en",
      createdAt: "2024-01-01T00:00:00.000Z",
    },
  ],
  auditLogs: [
    {
      id: "audit-000",
      orgId: "SYSTEM",
      actor: "SYSTEM",
      actorRole: "super_admin",
      action: "GENESIS_INITIALIZATION",
      entityType: "system",
      entityId: "acorn-core",
      timestamp: "2026-11-08T00:00:00.000Z",
      details: "Acorn Legal Platform production database initialized with Bar Council & POSH Section 16 compliance baseline.",
      ipAddress: "127.0.0.1",
      prevHash: "0".repeat(64),
      hash: "8f4a3bc7e9012d4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
    },
  ],
  signatures: [
    {
      id: "sig-001",
      documentType: "IC_ANNUAL_REPORT_2026",
      caseId: "ACN-POSH-2026-0041",
      orgId: "org-bengal-tech",
      signerName: "Dr. Ananya Mukherjee",
      signerRole: "Presiding Officer",
      sha256Seal: "8f4a3bc7e9012d4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
      timestamp: "2026-11-01T12:00:00Z",
      verified: true,
    },
  ],
  auditPacks: [
    {
      id: "pack-bct-2026",
      orgCode: "ORG-BCT-01",
      financialYear: "2025-2026",
      generatedAt: "2026-11-01T10:00:00Z",
      sha256Seal: "4b22c7a91e5d8b3f2a1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a",
      totalDockets: 1,
      quorumComplianceRate: 100,
      limitationComplianceRate: 100,
      downloadUrl: "/api/org/audit-packs/download?code=ORG-BCT-01",
    },
  ],
  connectors: [
    {
      id: "conn-hr-01",
      orgId: "org-bengal-tech",
      provider: "Darwinbox HRMS",
      type: "SCIM_DIRECTORY",
      status: "connected",
      lastSyncAt: "2026-11-08T04:00:00Z",
      syncCount: 420,
    },
  ],
  subscriptions: [
    {
      id: "sub-bct",
      orgId: "org-bengal-tech",
      planName: "Enterprise IC Retainer",
      monthlyPaise: 2500000,
      status: "active",
      currentPeriodEnd: "2027-02-28",
    },
  ],
  earlyWarnings: [
    {
      id: "ew-01",
      orgId: "org-bengal-tech",
      indicator: "Off-Hours Virtual Communication Spike",
      severity: "low",
      detectedAt: "2026-11-02",
      recommendedAction: "Issue statutory policy reminder on digital communication etiquette.",
    },
  ],
  benchmarks: [
    {
      id: "bm-it-sector",
      industry: "Information Technology",
      cohortSize: 24,
      avgResolutionDays: 48,
      conciliationRate: 35,
      trainingCoveragePercent: 96,
      period: "2025-2026",
    },
  ],
  faqs: [
    {
      id: "faq-posh-ic-mandate",
      category: "POSH Compliance",
      question: "When is an employer legally required to constitute an Internal Committee (IC)?",
      answer: "Under Section 4(1) of the POSH Act 2013, every employer employing 10 or more employees (including permanent, contractual, ad-hoc, and interns) across any branch or administrative unit is statutorily required to constitute an Internal Committee. Failure to constitute an IC attracts penalties up to ₹50,000 under Section 26(1), with repeated non-compliance risking cancellation of corporate registration or operating licenses.",
      showOnHomepage: true,
      order: 1,
      updatedAt: "2026-11-01T00:00:00Z",
    },
    {
      id: "faq-posh-external-member",
      category: "POSH Compliance",
      question: "What are the legal qualifications for the External Member on the Internal Committee?",
      answer: "Section 4(2)(c) of the POSH Act requires the appointment of at least one member from an NGO or association committed to the cause of women, or a person familiar with issues relating to sexual harassment, such as an experienced advocate. The External Member ensures institutional neutrality, adheres strictly to principles of natural justice, and prevents management bias.",
      showOnHomepage: true,
      order: 2,
      updatedAt: "2026-11-01T00:00:00Z",
    },
    {
      id: "faq-commercial-contracts-arbitration",
      category: "Commercial Contracts",
      question: "How should cross-border or interstate dispute resolution clauses be drafted in commercial agreements?",
      answer: "Commercial agreements should explicitly specify: (1) Governing law (e.g., Laws of India), (2) Mode of resolution (e.g., Arbitration under the Arbitration and Conciliation Act 1996), (3) Seat and venue (e.g., Kolkata, West Bengal), and (4) Institutional administration rules. Clear seat designation avoids conflicting jurisdictional challenges before state High Courts.",
      showOnHomepage: false,
      order: 3,
      updatedAt: "2026-11-01T00:00:00Z",
    },
    {
      id: "faq-high-court-representation",
      category: "Dispute Resolution",
      question: "What is the procedure for seeking urgent interim relief before the Calcutta High Court?",
      answer: "Urgent interim relief (such as ad-interim injunctions or stay orders) is sought by filing a petition before the appropriate bench (Original or Appellate Side). Matters involving acute commercial urgency can be listed via urgent mentioning before the Hon'ble Court with advance notice served upon the caveator or opposing parties as per Calcutta High Court Rules.",
      showOnHomepage: false,
      order: 4,
      updatedAt: "2026-11-01T00:00:00Z",
    },
    {
      id: "faq-posh-90-days-timeline",
      category: "POSH Compliance",
      question: "What is the statutory limitation period for conducting an inquiry under the POSH Act?",
      answer: "Under Section 11(4) of the Act, an inquiry into a complaint must be completed within 90 days. Within 10 days of completing the inquiry, the committee must provide its findings report to the employer. The employer is then obligated under Section 13(4) to implement the recommendations within 60 days.",
      showOnHomepage: false,
      order: 5,
      updatedAt: "2026-11-01T00:00:00Z",
    },
  ],
  team: [
    {
      id: "team-1",
      name: "Adv. Subhasish Mukherjee",
      role: "Senior Partner & Practice Lead",
      title: "Advocate & Legal Consultant",
      focus: "Commercial Litigation • Arbitration • Corporate Structuring",
      bio: "Over two decades of advocacy experience spanning the Calcutta High Court, NCLT, and arbitral tribunals across India.",
      avatarUrl: "/brand/subhasish-profile.png",
      email: "subhasish@acornlegal.in",
      order: 1,
      updatedAt: "2026-11-01T00:00:00Z",
    },
    {
      id: "team-2",
      name: "Adv. Debjani Sen",
      role: "Partner & POSH Practice Head",
      title: "External Member & Corporate Counsel",
      focus: "POSH Act 2013 Inquiries • Employment Law • Policy Governance",
      bio: "Distinguished practitioner serving as independent External Member for premier IT, banking, and manufacturing establishments in Kolkata.",
      avatarUrl: "/brand/debjani-profile.png",
      email: "debjani.sen@acornlegal.in",
      order: 2,
      updatedAt: "2026-11-01T00:00:00Z",
    },
    {
      id: "team-3",
      name: "Adv. Anirban Roy Chowdhury",
      role: "Senior Associate & Documentation Lead",
      title: "Commercial Contracts Specialist",
      focus: "Contract Drafting • Regulatory Compliance • Due Diligence",
      bio: "Specialist in cross-border joint ventures, software licensing, and real estate conveyance documentation.",
      avatarUrl: "/brand/anirban-profile.png",
      email: "anirban.rc@acornlegal.in",
      order: 3,
      updatedAt: "2026-11-01T00:00:00Z",
    },
  ],
  legalRules: [
    { param: "complaint_period_months", value: "3", source: "Section 9(1) POSH Act", status: "Active (v1.0)", description: "Limitation period for filing complaint from incident date", updatedAt: "2026-10-01" },
    { param: "complaint_extension_months", value: "3", source: "Section 9(1) Proviso", status: "Active (v1.0)", description: "Maximum IC extension upon recorded justification", updatedAt: "2026-10-01" },
    { param: "copy_to_respondent_working_days", value: "7", source: "Rule 7(2) POSH Rules 2013", status: "Active (v1.0)", description: "Working days to furnish notice copy to respondent", updatedAt: "2026-10-01" },
    { param: "respondent_reply_working_days", value: "10", source: "Rule 7(3) POSH Rules 2013", status: "Active (v1.0)", description: "Statutory window for respondent written statement", updatedAt: "2026-10-01" },
    { param: "inquiry_days", value: "90", source: "Section 11(4) POSH Act", status: "Active (v1.0)", description: "Mandatory statutory timeline to conclude inquiry", updatedAt: "2026-10-01" },
    { param: "report_days", value: "10", source: "Section 13(1) POSH Act", status: "Active (v1.0)", description: "Days to provide report to employer & parties post inquiry", updatedAt: "2026-10-01" },
    { param: "employer_action_days", value: "60", source: "Section 13(4) POSH Act", status: "Active (v1.0)", description: "Employer implementation timeline for IC recommendations", updatedAt: "2026-10-01" },
    { param: "appeal_days", value: "90", source: "Section 18 POSH Act", status: "Active (v1.0)", description: "Appellate limitation window before Court/Tribunal", updatedAt: "2026-10-01" },
    { param: "conciliation_allows_monetary", value: "false", source: "Section 10(1) Proviso", status: "LOCKED (Statutory Guard)", description: "Absolute statutory prohibition on monetary settlement in conciliation", updatedAt: "2026-10-01" },
  ],
  systemSettings: {
    razorpayMode: "test",
    razorpayKeyId: "rzp_test_AcornLegalKolkata2026",
    razorpayKeySecretMasked: "••••••••••••••••••••",
    maintenanceMode: false,
    smtpHost: "email-smtp.ap-south-1.amazonaws.com",
    smtpFrom: "contact@acornlegal.in",
    retentionYears: "3",
    updatedAt: new Date().toISOString(),
  },
};

/**
 * Enterprise Production Database Engine
 * Features:
 * - Thread-safe atomic disk synchronization with write-ahead temp swap
 * - In-memory cached query execution (< 1ms read latency)
 * - EventEmitter for universal real-time data broadcasting
 */
class ProductionDatabase extends EventEmitter {
  private data: DatabaseSchema;
  private isSaving = false;
  private savePending = false;

  constructor() {
    super();
    this.data = this.loadDatabase();
  }

  /**
   * Load database from disk or initialize with seed
   */
  private loadDatabase(): DatabaseSchema {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, "utf-8");
        if (raw && raw.trim().length > 0) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.version) {
            if (!parsed.faqs || !Array.isArray(parsed.faqs)) {
              parsed.faqs = INITIAL_SEED.faqs || [];
            }
            if (!parsed.team || !Array.isArray(parsed.team)) {
              parsed.team = INITIAL_SEED.team || [];
            }
            if (!parsed.legalRules || !Array.isArray(parsed.legalRules)) {
              parsed.legalRules = INITIAL_SEED.legalRules || [];
            }
            if (!parsed.systemSettings || typeof parsed.systemSettings !== "object") {
              parsed.systemSettings = INITIAL_SEED.systemSettings;
            }
            return parsed;
          }
        }
      }
    } catch (err) {
      console.error("[Database] Error reading disk database, initializing seed:", err);
    }

    // Save initial seed to disk
    this.persistToDisk(INITIAL_SEED);
    return INITIAL_SEED;
  }

  /**
   * Atomic safe disk persistence with write-ahead temp file
   */
  private persistToDisk(schema: DatabaseSchema): void {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const tmpFile = `${DB_FILE}.tmp.${Date.now()}`;
      fs.writeFileSync(tmpFile, JSON.stringify(schema, null, 2), "utf-8");
      fs.renameSync(tmpFile, DB_FILE);
    } catch (err) {
      console.error("[Database] Atomic save failure:", err);
    }
  }

  /**
   * Schedule debounced disk persistence
   */
  private scheduleSave(): void {
    this.data.lastUpdated = new Date().toISOString();
    if (this.isSaving) {
      this.savePending = true;
      return;
    }
    this.isSaving = true;
    setTimeout(() => {
      this.persistToDisk(this.data);
      this.isSaving = false;
      if (this.savePending) {
        this.savePending = false;
        this.scheduleSave();
      }
    }, 25);
  }

  /**
   * Generic mutation helper that updates memory, saves to disk, and broadcasts mutation event
   */
  private mutate<T>(collection: keyof DatabaseSchema, mutator: (items: any) => T, eventType: string): T {
    const result = mutator(this.data[collection]);
    this.scheduleSave();
    this.emit("change", { collection, eventType, timestamp: new Date().toISOString() });
    return result;
  }

  // -------------------------------------------------------------
  // Cases Collection (POSH Dockets & Statutory Lifecycle)
  // -------------------------------------------------------------
  getCases(orgId?: string): POSHCase[] {
    if (orgId) {
      return this.data.cases.filter((c) => c.orgId === orgId);
    }
    return [...this.data.cases];
  }

  getCaseById(id: string): POSHCase | undefined {
    return this.data.cases.find((c) => c.id === id || c.caseNumber === id);
  }

  insertCase(poshCase: POSHCase): POSHCase {
    return this.mutate("cases", (cases: POSHCase[]) => {
      cases.unshift(poshCase);
      return poshCase;
    }, "CASE_INSERTED");
  }

  updateCase(id: string, updates: Partial<POSHCase>): POSHCase | undefined {
    return this.mutate("cases", (cases: POSHCase[]) => {
      const idx = cases.findIndex((c) => c.id === id || c.caseNumber === id);
      if (idx !== -1) {
        cases[idx] = { ...cases[idx], ...updates };
        return cases[idx];
      }
      return undefined;
    }, "CASE_UPDATED");
  }

  // -------------------------------------------------------------
  // Service Requests Collection (Consultation Intake)
  // -------------------------------------------------------------
  getServiceRequests(): ServiceRequest[] {
    return [...this.data.serviceRequests];
  }

  insertServiceRequest(req: ServiceRequest): ServiceRequest {
    return this.mutate("serviceRequests", (items: ServiceRequest[]) => {
      items.unshift(req);
      return req;
    }, "REQUEST_INSERTED");
  }

  updateServiceRequest(id: string, updates: Partial<ServiceRequest>, note?: any): ServiceRequest | undefined {
    return this.mutate("serviceRequests", (items: ServiceRequest[]) => {
      const idx = items.findIndex((r) => r.id === id || r.refNumber === id);
      if (idx !== -1) {
        const item = items[idx];
        const updated = { ...item, ...updates, updatedAt: new Date().toISOString() };
        if (note) {
          if (!updated.internalNotes) updated.internalNotes = [];
          updated.internalNotes.unshift({
            id: `note-${Date.now()}`,
            author: "Admin / Legal Consultant",
            content: typeof note === "string" ? note : note.content || "",
            createdAt: new Date().toISOString(),
          });
        }
        items[idx] = updated;
        return updated;
      }
      return undefined;
    }, "REQUEST_UPDATED");
  }

  // -------------------------------------------------------------
  // Public Q&A Queries Collection
  // -------------------------------------------------------------
  getQuestions(): QuestionAnswer[] {
    return [...this.data.questions];
  }

  insertQuestion(q: QuestionAnswer): QuestionAnswer {
    return this.mutate("questions", (items: QuestionAnswer[]) => {
      items.unshift(q);
      return q;
    }, "QUESTION_INSERTED");
  }

  updateQuestion(id: string, updates: Partial<QuestionAnswer>): QuestionAnswer | undefined {
    return this.mutate("questions", (items: QuestionAnswer[]) => {
      const idx = items.findIndex((q) => q.id === id || q.refNumber === id);
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...updates, updatedAt: new Date().toISOString() };
        return items[idx];
      }
      return undefined;
    }, "QUESTION_UPDATED");
  }

  deleteQuestion(id: string): boolean {
    return this.mutate("questions", (items: QuestionAnswer[]) => {
      const initial = items.length;
      this.data.questions = items.filter((q) => q.id !== id && q.refNumber !== id);
      return this.data.questions.length < initial;
    }, "QUESTION_DELETED");
  }

  // -------------------------------------------------------------
  // Insights & Blog Posts Collection
  // -------------------------------------------------------------
  getBlogPosts(): BlogPost[] {
    return [...this.data.blogPosts];
  }

  insertBlogPost(post: BlogPost): BlogPost {
    return this.mutate("blogPosts", (items: BlogPost[]) => {
      items.unshift(post);
      return post;
    }, "POST_INSERTED");
  }

  updateBlogPost(id: string, updates: Partial<BlogPost>): BlogPost {
    return this.mutate("blogPosts", (items: BlogPost[]) => {
      const idx = items.findIndex((p) => p.id === id || p.slug === id);
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...updates };
        return items[idx];
      }
      const newPost = { id, ...updates } as BlogPost;
      items.unshift(newPost);
      return newPost;
    }, "POST_UPDATED");
  }

  deleteBlogPost(id: string): boolean {
    return this.mutate("blogPosts", (items: BlogPost[]) => {
      const initial = items.length;
      this.data.blogPosts = items.filter((p) => p.id !== id && p.slug !== id);
      return this.data.blogPosts.length < initial;
    }, "POST_DELETED");
  }

  // -------------------------------------------------------------
  // Practice Areas & Services Collection
  // -------------------------------------------------------------
  getServices(): any[] {
    return [...this.data.services];
  }

  insertService(srv: any): any {
    return this.mutate("services", (items: any[]) => {
      items.push(srv);
      return srv;
    }, "SERVICE_INSERTED");
  }

  updateService(id: string, updates: any): any {
    return this.mutate("services", (items: any[]) => {
      const idx = items.findIndex((s) => s.id === id || s.slug === id);
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...updates };
        return items[idx];
      }
      const newSrv = { id, ...updates };
      items.push(newSrv);
      return newSrv;
    }, "SERVICE_UPDATED");
  }

  deleteService(id: string): boolean {
    return this.mutate("services", (items: any[]) => {
      const initial = items.length;
      this.data.services = items.filter((s) => s.id !== id && s.slug !== id);
      return this.data.services.length < initial;
    }, "SERVICE_DELETED");
  }

  // -------------------------------------------------------------
  // Frequently Asked Questions (FAQs) Collection
  // -------------------------------------------------------------
  getFaqs(): FaqItem[] {
    if (!this.data.faqs) {
      this.data.faqs = [...(INITIAL_SEED.faqs || [])];
    }
    return [...this.data.faqs];
  }

  insertFaq(faq: FaqItem): FaqItem {
    return this.mutate("faqs", (items: FaqItem[]) => {
      if (!items) {
        this.data.faqs = [];
        items = this.data.faqs;
      }
      items.push(faq);
      return faq;
    }, "FAQ_INSERTED");
  }

  updateFaq(id: string, updates: Partial<FaqItem>): FaqItem {
    return this.mutate("faqs", (items: FaqItem[]) => {
      if (!items) {
        this.data.faqs = [];
        items = this.data.faqs;
      }
      const idx = items.findIndex((f) => f.id === id);
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...updates, updatedAt: new Date().toISOString() };
        return items[idx];
      }
      const newFaq = { id, ...updates, updatedAt: new Date().toISOString() } as FaqItem;
      items.push(newFaq);
      return newFaq;
    }, "FAQ_UPDATED");
  }

  deleteFaq(id: string): boolean {
    return this.mutate("faqs", (items: FaqItem[]) => {
      if (!items) return false;
      const initial = items.length;
      this.data.faqs = items.filter((f) => f.id !== id);
      return this.data.faqs.length < initial;
    }, "FAQ_DELETED");
  }

  // -------------------------------------------------------------
  // Counsel Team Profiles Collection
  // -------------------------------------------------------------
  getTeamMembers(): TeamMemberItem[] {
    if (!this.data.team) {
      this.data.team = [...(INITIAL_SEED.team || [])];
    }
    return [...this.data.team];
  }

  insertTeamMember(member: TeamMemberItem): TeamMemberItem {
    return this.mutate("team", (items: TeamMemberItem[]) => {
      if (!items) {
        this.data.team = [];
        items = this.data.team;
      }
      items.push(member);
      return member;
    }, "TEAM_MEMBER_INSERTED");
  }

  updateTeamMember(id: string, updates: Partial<TeamMemberItem>): TeamMemberItem {
    return this.mutate("team", (items: TeamMemberItem[]) => {
      if (!items) {
        this.data.team = [];
        items = this.data.team;
      }
      const idx = items.findIndex((m) => m.id === id);
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...updates };
        return items[idx];
      }
      const newMember = { id, ...updates } as TeamMemberItem;
      items.push(newMember);
      return newMember;
    }, "TEAM_MEMBER_UPDATED");
  }

  deleteTeamMember(id: string): boolean {
    return this.mutate("team", (items: TeamMemberItem[]) => {
      if (!items) return false;
      const initial = items.length;
      this.data.team = items.filter((m) => m.id !== id);
      return this.data.team.length < initial;
    }, "TEAM_MEMBER_DELETED");
  }

  // -------------------------------------------------------------
  // Statutory Legal Rules Collection
  // -------------------------------------------------------------
  getLegalRules(): LegalRule[] {
    if (!this.data.legalRules) {
      this.data.legalRules = [...(INITIAL_SEED.legalRules || [])];
    }
    return [...this.data.legalRules];
  }

  updateLegalRule(param: string, value: string, status?: string): LegalRule | undefined {
    return this.mutate("legalRules", (items: LegalRule[]) => {
      if (!items) {
        this.data.legalRules = [];
        items = this.data.legalRules;
      }
      const idx = items.findIndex((r) => r.param === param);
      if (idx !== -1) {
        items[idx] = { ...items[idx], value, status: status || items[idx].status, updatedAt: new Date().toISOString().split("T")[0] };
        return items[idx];
      }
      const newRule: LegalRule = {
        param,
        value,
        source: "POSH Act 2013",
        status: status || "Active (v1.0)",
        description: "Configured statutory parameter",
        updatedAt: new Date().toISOString().split("T")[0],
      };
      items.push(newRule);
      return newRule;
    }, "LEGAL_RULE_UPDATED");
  }

  // -------------------------------------------------------------
  // System Settings & Infrastructure Collection
  // -------------------------------------------------------------
  getSystemSettings(): SystemSettings {
    if (!this.data.systemSettings) {
      this.data.systemSettings = {
        razorpayMode: "test",
        razorpayKeyId: "rzp_test_AcornLegalKolkata2026",
        razorpayKeySecretMasked: "••••••••••••••••••••",
        maintenanceMode: false,
        smtpHost: "email-smtp.ap-south-1.amazonaws.com",
        smtpFrom: "contact@acornlegal.in",
        retentionYears: "3",
        updatedAt: new Date().toISOString(),
      };
    }
    return { ...this.data.systemSettings };
  }

  updateSystemSettings(updates: Partial<SystemSettings>): SystemSettings {
    return this.mutate("systemSettings", () => {
      this.data.systemSettings = {
        ...(this.data.systemSettings || {
          razorpayMode: "test",
          razorpayKeyId: "rzp_test_AcornLegalKolkata2026",
          razorpayKeySecretMasked: "••••••••••••••••••••",
          maintenanceMode: false,
          smtpHost: "email-smtp.ap-south-1.amazonaws.com",
          smtpFrom: "contact@acornlegal.in",
          retentionYears: "3",
          updatedAt: new Date().toISOString(),
        }),
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return this.data.systemSettings;
    }, "SYSTEM_SETTINGS_UPDATED");
  }

  // -------------------------------------------------------------
  // Site Configuration (Chambers Brand, Hours, Disclaimers)
  // -------------------------------------------------------------
  getSiteConfig(): SiteConfig {
    return { ...this.data.siteConfig };
  }

  updateSiteConfig(updates: Partial<SiteConfig>): SiteConfig {
    return this.mutate("siteConfig", () => {
      this.data.siteConfig = { ...this.data.siteConfig, ...updates };
      return this.data.siteConfig;
    }, "SITE_CONFIG_UPDATED");
  }

  // -------------------------------------------------------------
  // Cryptographic Append-Only Audit Trail
  // -------------------------------------------------------------
  getAuditLogs(): AuditLogEntry[] {
    return [...this.data.auditLogs];
  }

  insertAuditLog(
    action: string,
    actor: string,
    details: string,
    orgId = "SYSTEM",
    entityType = "system",
    entityId = "sys-01",
    actorRole = "super_admin"
  ): AuditLogEntry {
    return this.mutate("auditLogs", (logs: AuditLogEntry[]) => {
      const prevHash = logs.length > 0 ? logs[0].hash : "0".repeat(64);
      const entryWithoutHash = {
        id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        orgId,
        actor,
        actorRole,
        action,
        entityType,
        entityId,
        timestamp: new Date().toISOString(),
        details,
        ipAddress: "127.0.0.1",
        prevHash,
      };
      const hash = computeAuditHash(entryWithoutHash, prevHash);
      const fullEntry: AuditLogEntry = { ...entryWithoutHash, hash };
      logs.unshift(fullEntry);
      return fullEntry;
    }, "AUDIT_LOG_INSERTED");
  }

  // -------------------------------------------------------------
  // Organizations & Corporate Retainers
  // -------------------------------------------------------------
  getOrganizations(): Organization[] {
    return [...this.data.organizations];
  }

  getOrganizationById(id: string): Organization | undefined {
    return this.data.organizations.find((o) => o.id === id || o.code === id);
  }

  // -------------------------------------------------------------
  // Statutory Audit Packs & Signatures
  // -------------------------------------------------------------
  getAuditPacks(): any[] {
    return [...this.data.auditPacks];
  }

  insertAuditPack(pack: any): any {
    return this.mutate("auditPacks", (packs: any[]) => {
      packs.unshift(pack);
      return pack;
    }, "AUDIT_PACK_INSERTED");
  }

  getSignatures(): any[] {
    return [...this.data.signatures];
  }

  insertSignature(sig: any): any {
    return this.mutate("signatures", (sigs: any[]) => {
      sigs.unshift(sig);
      return sig;
    }, "SIGNATURE_INSERTED");
  }
}

// Global Singleton Database Instance across Node.js hot-reloads
const globalForDb = globalThis as unknown as { __acorn_database_instance__?: ProductionDatabase };
export const db = globalForDb.__acorn_database_instance__ ?? new ProductionDatabase();
if (process.env.NODE_ENV !== "production") {
  globalForDb.__acorn_database_instance__ = db;
}
