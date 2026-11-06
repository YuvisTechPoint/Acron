// Acorn Legal Platform Constants & Metadata

export const BRAND_CONFIG = {
  name: "Acorn Legal Consultants",
  shortName: "Acorn Legal",
  tagline: "Excellence in Law. Integrity in Practice.",
  subTagline: "Where Legal Expertise Meets Strategic Excellence.",
  phone: "+91 (033) 2486-7700",
  emergencyPhone: "+91 98300 12345",
  email: "contact@acornlegal.in",
  poshEmail: "posh.desk@acornlegal.in",
  address: {
    line1: "Suite 4B, Camac Court, 25 Camac Street",
    line2: "Park Street District",
    city: "Kolkata",
    state: "West Bengal",
    postalCode: "700016",
    country: "India",
  },
  hours: "Monday – Saturday: 9:30 AM – 7:30 PM IST",
  barCouncilNotice:
    "As per the rules of the Bar Council of India, law firms are not permitted to solicit work or advertise. By accessing this website, the user acknowledges that the information provided is solely for informational purposes and does not create an advocate-client relationship.",
};

export const PRACTICE_AREAS = [
  {
    slug: "advisory",
    title: "Advisory & Regulatory Guidance",
    shortDesc:
      "Strategic corporate structuring, board governance, statutory risk mitigation, and commercial compliance guidance for businesses and institutions.",
    icon: "Briefcase",
    services: [
      "Corporate Governance & Board Advisory",
      "Statutory Regulatory Compliance Audits",
      "Foreign Direct Investment & FEMA Guidance",
      "Director Fiduciary Duty & Liabilities Review",
      "Executive Advisory on Strategic Decisions",
    ],
  },
  {
    slug: "legal-documentation",
    title: "Legal Documentation & Contracts",
    shortDesc:
      "Precision drafting, negotiation, and vetting of commercial contracts, joint venture agreements, shareholder pacts, and service frameworks.",
    icon: "FileText",
    services: [
      "Master Service Agreements & Vendor Contracts",
      "Shareholder & Founder Investment Agreements",
      "Commercial Lease Deeds & Conveyance Instruments",
      "Non-Disclosure & Intellectual Property Covenants",
      "Employment Agreements & Severance Terms",
    ],
  },
  {
    slug: "dispute-resolution",
    title: "Dispute Resolution & Arbitration",
    shortDesc:
      "Pre-litigation strategy, commercial mediation, and domestic and international arbitration representation to resolve disputes with commercial pragmatism.",
    icon: "Compass",
    services: [
      "Commercial Dispute Mediation & Negotiation",
      "Domestic & International Arbitration Practice",
      "Pre-Litigation Strategic Legal Audits",
      "Enforcement of Arbitral Awards & Decrees",
      "Settlement Agreement Drafting & Execution",
    ],
  },
  {
    slug: "representation",
    title: "Judicial & Tribunal Representation",
    shortDesc:
      "Disciplined advocacy before the High Court at Calcutta, National Company Law Tribunal (NCLT), Commercial Courts, and appellate bodies.",
    icon: "Landmark",
    services: [
      "Calcutta High Court Writ & Appellate Advocacy",
      "NCLT Insolvency (IBC) & Company Petitions",
      "Commercial Court Injunctions & Interim Relief",
      "Section 138 Negotiable Instruments Act Matters",
      "Statutory Appellate Authority Representation",
    ],
  },
  {
    slug: "corporate-commercial",
    title: "Corporate & Commercial Support",
    shortDesc:
      "End-to-end commercial transactional support, business reorganizations, asset purchases, secretarial compliance, and licensing.",
    icon: "Briefcase",
    services: [
      "Mergers, Acquisitions & Asset Purchases",
      "Joint Ventures & Consortium Agreements",
      "MCA & ROC Statutory Regulatory Filings",
      "Commercial Partnership Deeds & LLP Governance",
      "Licensing, Permits & Compliance Maintenance",
    ],
  },
  {
    slug: "posh-compliance",
    title: "POSH Compliance & IC Services",
    shortDesc:
      "Statutory Internal Committee (IC) constitution, independent external member representation, policy formulation, e-learning training, and inquiry management.",
    icon: "ShieldCheck",
    services: [
      "Section 4(2)(c) IC External Member Appointments",
      "Comprehensive Workplace Anti-Harassment Policy Drafting",
      "Statutory 90-Day Inquiry Guidance & Investigation",
      "Employee & Managerial Sensitisation Workshops",
      "Section 21 Annual Report Filing with District Officer",
      "Confidential Digital Complaint Management System",
    ],
  },
  {
    slug: "employment-labour",
    title: "Labour & Employment Law",
    shortDesc:
      "Advising employers on Industrial Disputes Act, Code on Wages, Shops and Establishments regulations, executive severance, and non-compete covenants.",
    icon: "Users",
    services: [
      "Employment Contracts & Non-Disclosure Agreements",
      "Disciplinary Inquiries & Domestic Enquiries",
      "Retrenchment, Layoff & Closure Compliance",
      "Workplace Safety & Factory Act Audits",
      "Executive Separation & Restrictive Covenants",
    ],
  },
  {
    slug: "real-estate-property",
    title: "Real Estate & Infrastructure",
    shortDesc:
      "Comprehensive property title due diligence across Kolkata and West Bengal, WBRERA compliance, conveyance deed drafting, and leasing agreements.",
    icon: "Building2",
    services: [
      "Search & Title Investigation Reports (30 Years)",
      "WBRERA Developer Registration & Consumer Representation",
      "Joint Development Agreements (JDA)",
      "Commercial Leasing & Conveyancing",
      "Mutation & Land Revenue Regularisation",
    ],
  },
];

export const HELPLINE_DIRECTORY = [
  {
    name: "National Commission for Women (NCW) 24x7 Helpline",
    number: "7827170170",
    tollFree: "1800-11-2005",
    description: "National emergency assistance for women in distress, domestic violence, and workplace harassment.",
    scope: "National",
    hours: "24 Hours / 7 Days",
  },
  {
    name: "West Bengal Women's Helpline",
    number: "181 / 1091",
    tollFree: "181",
    description: "State-level emergency police response, legal aid coordination, and medical support across West Bengal districts.",
    scope: "West Bengal / Kolkata",
    hours: "24 Hours / 7 Days",
  },
  {
    name: "Kolkata Police Cyber Crime Cell",
    number: "033 2214-3000",
    tollFree: "1930",
    description: "Investigation of digital harassment, non-consensual image sharing, stalking, and electronic evidence preservation.",
    scope: "Kolkata Metropolitan",
    hours: "9:00 AM – 8:00 PM IST",
  },
  {
    name: "West Bengal State Legal Services Authority (WBSLSA)",
    number: "033 2248-3892",
    tollFree: "15100",
    description: "Free legal representation and counsel for women and marginalised workers entitled to legal aid.",
    scope: "West Bengal",
    hours: "10:00 AM – 5:00 PM (Court Working Days)",
  },
  {
    name: "Kolkata District Officer / Local Committee (POSH)",
    number: "033 2223-0102",
    tollFree: "N/A",
    description: "Statutory Local Committee redressal for complaints against employers or establishments under 10 employees.",
    scope: "District Magistrate Office, Kolkata",
    hours: "10:00 AM – 5:30 PM",
  },
];

export const POSH_HELPLINES = HELPLINE_DIRECTORY;

export const SERVICE_PACKAGES = [
  {
    id: "consultation-standard",
    name: "Legal Strategy Consultation",
    category: "General Legal",
    pricePaise: 450000, // ₹4,500
    displayPrice: "₹4,500",
    gstPct: 18,
    features: [
      "45-minute confidential session with Senior Legal Consultant",
      "Analysis of documents and risk exposure",
      "Clear written advisory roadmap within 24 hours",
      "Applicable towards future legal representation",
    ],
  },
  {
    id: "posh-retainer-essential",
    name: "POSH Retainer (Basic Tier)",
    category: "POSH Retainer",
    pricePaise: 1800000, // ₹18,000 / quarter
    displayPrice: "₹18,000 / quarter",
    gstPct: 18,
    features: [
      "Constitution of statutory Internal Committee (IC)",
      "Acorn External Member appointment & representation",
      "Standard Anti-Sexual Harassment Policy & Notice board drafts",
      "Quarterly compliance review & statutory registry maintenance",
      "Assistance in drafting District Officer Annual Report (Sec 21)",
    ],
  },
  {
    id: "posh-retainer-enterprise",
    name: "POSH Enterprise Compliance Suite",
    category: "POSH Retainer",
    pricePaise: 4500000, // ₹45,000 / quarter
    displayPrice: "₹45,000 / quarter",
    gstPct: 18,
    features: [
      "Everything in Basic Tier",
      "Dedicated Senior External Member for all IC proceedings",
      "End-to-end 90-day inquiry management & evidence vault",
      "Annual employee sensitisation & IC orientation workshops",
      "Automated compliance health scoring & risk audit",
      "Bespoke multilingual policy rollouts (EN, BN, HI)",
    ],
  },
];

