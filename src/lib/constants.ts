// Acorn Legal Platform Constants & Metadata

export const BRAND_CONFIG = {
  name: "Acorn Consultants",
  shortName: "Acorn Consultants",
  tagline: "Educational, Tax & Legal Consultants",
  subTagline: "Over 15 Years of Dedicated Practice",
  phone: "+91 828 69 36 899",
  advocatePhone: "+91 8369171822",
  emergencyPhone: "+91 8369171822",
  whatsapp: "+91 828 69 36 899",
  email: "acornconsultant2014@gmail.com",
  poshEmail: "acornconsultant2014@gmail.com",
  advocateOnPanel: "Adv. Rajesh Telge",
  experienceYears: 15,
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

export interface OfferedServiceItem {
  id: string;
  title: string;
  category: "legal_court" | "finance_business" | "careers_attestation" | "education_admissions";
  categoryLabel: string;
  description: string;
  highlight?: string;
}

export const ALL_OFFERED_SERVICES: OfferedServiceItem[] = [
  // Legal, Court & Matrimonial
  {
    id: "court-marriage",
    title: "Court Marriage for all Caste & Religions",
    category: "legal_court",
    categoryLabel: "Legal & Court Matters",
    description: "Special Marriage Act solemnization, appointment booking, documentation, and formal solemnization for all castes and religions.",
    highlight: "All Castes & Religions",
  },
  {
    id: "marriage-registration",
    title: "Marriage Registration",
    category: "legal_court",
    categoryLabel: "Legal & Court Matters",
    description: "Statutory marriage registration certificate procurement from the Registrar of Marriages with rapid verification.",
  },
  {
    id: "registered-will",
    title: "Registered WILL",
    category: "legal_court",
    categoryLabel: "Legal & Court Matters",
    description: "Comprehensive drafting, execution, witness coordination, and formal Sub-Registrar registration of testamentary Wills.",
  },
  {
    id: "public-notice",
    title: "Public Notice",
    category: "legal_court",
    categoryLabel: "Legal & Court Matters",
    description: "Drafting and publication of statutory public notices in leading English and vernacular newspapers for title search, claims, or loss of documents.",
  },
  {
    id: "divorce-domestic-violence",
    title: "Divorce / Domestic Violence",
    category: "legal_court",
    categoryLabel: "Legal & Court Matters",
    description: "Counsel and advocacy in mutual consent divorce, contested matrimonial petitions, Section 125 maintenance, and Protection of Women from Domestic Violence Act proceedings.",
  },
  {
    id: "birth-certificate-home-delivery",
    title: "Birth Certificate for Home Delivery Children",
    category: "legal_court",
    categoryLabel: "Legal & Court Matters",
    description: "Specialized documentation, magistrate order sanctioning, municipal compliance, and issuance of official birth certificates for non-hospital home births.",
    highlight: "Specialized Assistance",
  },
  {
    id: "civil-criminal-property",
    title: "All Civil / Criminal & Property Matters",
    category: "legal_court",
    categoryLabel: "Legal & Court Matters",
    description: "Complete legal representation under Advocate on Panel Mr. Rajesh Telge before District Courts, High Court, and appellate forums.",
  },
  {
    id: "title-search-30-years",
    title: "Land / Plot Title Search Reports – of 30 Years",
    category: "legal_court",
    categoryLabel: "Legal & Court Matters",
    description: "Exhaustive 30-year non-encumbrance title search across Sub-Registrar records, chain deeds, mutation records, and issuance of formal Title Certificate.",
    highlight: "30 Years Search",
  },
  {
    id: "society-transfer-papers",
    title: "Society Transfer Papers as per Bye-Laws",
    category: "legal_court",
    categoryLabel: "Legal & Court Matters",
    description: "End-to-end co-operative housing society flat transfer documentation, Associate Membership applications, and statutory NOC compliance under Society Bye-Laws.",
  },
  {
    id: "property-card-extracts",
    title: "Property Card – 7×12 / 6×12 Extract",
    category: "legal_court",
    categoryLabel: "Legal & Court Matters",
    description: "Procurement, certified copy search, and legal verification of revenue land records, 7/12 & 6/12 extracts, and City Survey Property Cards.",
  },
  {
    id: "index-2-verification",
    title: "Search & Verification of Index – 2 Copy",
    category: "legal_court",
    categoryLabel: "Legal & Court Matters",
    description: "Official Sub-Registrar records inspection, Index-2 extraction, registered document verification, and certified copy retrieval.",
  },
  {
    id: "gift-release-rectification-deed",
    title: "Gift Deed / Release Deed / Deed of Rectification",
    category: "legal_court",
    categoryLabel: "Legal & Court Matters",
    description: "Precision drafting and registration of family gift deeds, co-owner release relinquishment deeds, and clerical error rectification deeds.",
  },
  {
    id: "probate-succession-certificate",
    title: "Probate / Succession Certificate",
    category: "legal_court",
    categoryLabel: "Legal & Court Matters",
    description: "Filing and tracking testamentary petitions for Grant of Probate of Wills and Succession Certificates before competent Civil and High Courts.",
  },
  {
    id: "live-in-relationship-agreement",
    title: "Live In Relationship Agreement",
    category: "legal_court",
    categoryLabel: "Legal & Court Matters",
    description: "Co-habitation agreements drafting mutual financial obligations, shared tenancy terms, and legal rights under prevailing judicial precedents.",
  },
  {
    id: "life-certificate-senior-citizen",
    title: "Life Certificate / Senior Citizen Card",
    category: "legal_court",
    categoryLabel: "Legal & Court Matters",
    description: "Assistance with annual Jeevan Pramaan digital life certificate generation and state government Senior Citizen Card application and benefits.",
  },
  {
    id: "gazette-notifications",
    title: "GAZETTE – Name Change / Religion Change / Date of Birth Change",
    category: "legal_court",
    categoryLabel: "Legal & Court Matters",
    description: "Drafting affidavits, local newspaper notifications, application submission, and procurement of the Official Government Gazette notification copy.",
    highlight: "Official Gazette",
  },
  {
    id: "motor-accident-claims",
    title: "Motor & Road Accident Hit & Run Cases (MV Act)",
    category: "legal_court",
    categoryLabel: "Legal & Court Matters",
    description: "Filing and pursuing compensation claims before the Motor Accidents Claims Tribunal (MACT) for disability or death under the Motor Vehicles Act.",
    highlight: "Monetary Compensation",
  },
  {
    id: "maharera-complaints",
    title: "RERA / MAHARERA Complaint Registration & Follow-Up",
    category: "legal_court",
    categoryLabel: "Legal & Court Matters",
    description: "Drafting and filing complaints against delayed possession, structural defects, or unauthorized layout alterations before RERA / MahaRERA Authorities.",
  },

  // Finance & Business Related Legal Services
  {
    id: "leave-license-doorstep",
    title: "Leave & License Agreement – REGISTRATION DONE AT YOUR DOOR STEP",
    category: "finance_business",
    categoryLabel: "Finance & Business",
    description: "Government-approved biometric e-registration for residential & commercial Leave & License agreements conducted right at your home/office at your convenient timings.",
    highlight: "Doorstep Service",
  },
  {
    id: "commercial-leave-license",
    title: "Commercial Leave & License Agreement",
    category: "finance_business",
    categoryLabel: "Finance & Business",
    description: "Customized commercial leasing contracts for retail, corporate office, and industrial properties with lock-in clauses, GST compliance, and security deposit safeguards.",
  },
  {
    id: "sale-purchase-agreements",
    title: "Sale & Purchase Agreement with Stamp Duty & Registration",
    category: "finance_business",
    categoryLabel: "Finance & Business",
    description: "Comprehensive Agreement for Sale & Conveyance Deeds, precise stamp duty valuation calculation, TDS compliance, and Sub-Registrar execution.",
  },
  {
    id: "power-of-attorney",
    title: "Irrevocable / Special / General Power of Attorney",
    category: "finance_business",
    categoryLabel: "Finance & Business",
    description: "Drafting and registering irrevocable developer POAs, general management POAs, and NRI special power of attorney with consular attestation support.",
  },
  {
    id: "commercial-loan-agreements",
    title: "Commercial Loan Agreements",
    category: "finance_business",
    categoryLabel: "Finance & Business",
    description: "Drafting hypothecation deeds, commercial borrowing contracts, promoter guarantee documentation, and security creation advisory.",
  },
  {
    id: "liability-waivers-employee-bonds",
    title: "Irrevocable Waiver, Release of Liability & Employee Bond Agreements",
    category: "finance_business",
    categoryLabel: "Finance & Business",
    description: "Enforceable employee service bond agreements, liquidated damages clauses, non-compete covenants, and mutual release of liability settlements.",
  },
  {
    id: "society-formation-gdca",
    title: "Co-operative Society Formation by Approved GDCA-Auditor",
    category: "finance_business",
    categoryLabel: "Finance & Business",
    description: "Statutory housing and commercial co-operative society registration, chief promoter documentation, and compliance certified by approved GDCA auditors.",
    highlight: "Approved GDCA Auditor",
  },
  {
    id: "society-management-byelaws",
    title: "Co-operative Society Management by Expert Society Managers",
    category: "finance_business",
    categoryLabel: "Finance & Business",
    description: "Day-to-day statutory management, maintenance billing, AGM minutes drafting, election compliance, and dispute resolution well-versed in Society Bye-laws.",
  },
  {
    id: "liquor-drinking-license",
    title: "Liquor Drinking License for Individual Person (State Excise)",
    category: "finance_business",
    categoryLabel: "Finance & Business",
    description: "Official individual lifetime and annual drinking permit application, document verification, and issuance from the State Excise Department.",
    highlight: "State Excise",
  },

  // Careers, Jobs, Students & General Services
  {
    id: "state-attestation",
    title: "State Attestation",
    category: "careers_attestation",
    categoryLabel: "Careers & Attestation",
    description: "State Home Department (HRD), Higher Education Department, and General Administration Department authentication for educational and personal certificates.",
  },
  {
    id: "embassy-attestation",
    title: "Embassy Attestation",
    category: "careers_attestation",
    categoryLabel: "Careers & Attestation",
    description: "Official diplomatic legalization and consular attestation for UAE, Saudi Arabia, Kuwait, Qatar, Oman, and international embassies in India.",
  },
  {
    id: "mea-apostille",
    title: "MEA Attestation or Apostille",
    category: "careers_attestation",
    categoryLabel: "Careers & Attestation",
    description: "Ministry of External Affairs (MEA) Government of India Apostille stickers under Hague Convention and regular commercial attestations.",
    highlight: "MEA Apostille",
  },
  {
    id: "income-certificate",
    title: "Income Certificate",
    category: "careers_attestation",
    categoryLabel: "Careers & Attestation",
    description: "Tahsildar / Sub-Divisional Officer (SDO) income certificate documentation, affidavit preparation, and prompt processing.",
  },
  {
    id: "eligibility-migration-certificate",
    title: "Eligibility & Migration Certificate",
    category: "careers_attestation",
    categoryLabel: "Careers & Attestation",
    description: "Inter-university and state board migration certificate procurement, duplicate degree applications, and transcript clearances.",
  },
  {
    id: "pcc-police-clearance",
    title: "PCC – Police Clearance Certificate Assistance",
    category: "careers_attestation",
    categoryLabel: "Careers & Attestation",
    description: "Passport Seva Kendra and local Police Commissionerate PCC application filling, appointment scheduling, and verification tracking.",
  },
  {
    id: "domicile-certificate",
    title: "Domicile Certificate",
    category: "careers_attestation",
    categoryLabel: "Careers & Attestation",
    description: "State residency and domicile certificate procurement for competitive exams, government quota admissions, and public employment.",
  },
  {
    id: "passport-online-assistance",
    title: "Passport On-line Registration Assistance",
    category: "careers_attestation",
    categoryLabel: "Careers & Attestation",
    description: "Fresh, renewal, tatkaal, and minor passport online application filing, document preparation, and appointment booking at PSK / POPSK.",
  },
  {
    id: "consumer-court-complaints",
    title: "Consumer Court Appeals & Complaints",
    category: "careers_attestation",
    categoryLabel: "Careers & Attestation",
    description: "Drafting and filing consumer grievances before District and State Consumer Disputes Redressal Commissions against deficient services and defective goods.",
  },
  {
    id: "affidavits-notary-indemnity",
    title: "Affidavit & Notary for Indemnity Bond / Gap Certificate / Anti-Ragging",
    category: "careers_attestation",
    categoryLabel: "Careers & Attestation",
    description: "First-Class Judicial Magistrate / Notary public affidavits for educational gap certificates, anti-ragging declarations, pharmacy registration, and medical declarations.",
  },
  {
    id: "govt-employment-card",
    title: "Govt. Employment Card for Government Jobs (Age 15 to 25)",
    category: "careers_attestation",
    categoryLabel: "Careers & Attestation",
    description: "Official Employment Exchange registration card procurement and youth profile tracking for candidates aged 15 to 25 years.",
    highlight: "Age Limit: 15–25 Yrs",
  },
  {
    id: "govt-jobs-guidance",
    title: "Guidance for Applying in Government Jobs (8th, 9th, SSC, HSC, Diploma, ITI)",
    category: "careers_attestation",
    categoryLabel: "Careers & Attestation",
    description: "Complete eligibility screening, reservation category guidance, and application filling assistance for central, state, railway, and municipal job recruitments.",
  },
  {
    id: "caste-validity-certificate",
    title: "Caste Certificate (Caste Validity Certificate / Non-Creamy Layer)",
    category: "careers_attestation",
    categoryLabel: "Careers & Attestation",
    description: "SDO caste certificate applications, Scrutiny Committee Caste Validity dossiers, genealogical tree documentation, and Non-Creamy Layer certificate renewals.",
  },
  {
    id: "inhouse-mediation-counseling",
    title: "In-House Mediation & Counseling",
    category: "careers_attestation",
    categoryLabel: "Careers & Attestation",
    description: "Private, amicable out-of-court dispute settlement sessions conducted in our chambers for family partitions, partnership disputes, and pre-litigation conciliation.",
  },

  // Education & Admissions
  {
    id: "private-ssc-hsc-graduation",
    title: "Pass PRIVATE 10-SSC / 12- Arts, Commerce, Science / Graduation",
    category: "education_admissions",
    categoryLabel: "Education & Admissions",
    description: "Private enrollment through government approved Boards & Universities. Qualified lecturers providing 100% guidance on writing answer papers, comprehensive notes, study material & in-house lectures. Special coaching & counseling psychologist for repeaters / failed students.",
    highlight: "Guaranteed 100% Results Coaching",
  },
  {
    id: "college-admissions-india-abroad",
    title: "College Admissions Guidance in India & Abroad (MBBS, MD, Pharmacy)",
    category: "education_admissions",
    categoryLabel: "Education & Admissions",
    description: "Strategic counseling, merit list tracking, and confirmed admission guidance for MBBS, MD, MS, B.Pharm, D.Pharm, engineering, overseas recruitment, and student visa assistance.",
    highlight: "MBBS • MD • Pharmacy",
  },
  {
    id: "mumbai-university-admissions",
    title: "Mumbai University Admissions Form Filling Assistance (June to Sept)",
    category: "education_admissions",
    categoryLabel: "Education & Admissions",
    description: "Dedicated pre-admission registration and form filling support for FY / SY / TY programs across all affiliated colleges, faculties, and autonomous institutes.",
    highlight: "FY • SY • TY (June–Sept)",
  },
  {
    id: "school-rte-admissions",
    title: "All Schools Pre-Admissions / RTE Form Filling Assistance (Oct to Dec)",
    category: "education_admissions",
    categoryLabel: "Education & Admissions",
    description: "Playgroup, Nursery, Jr. KG, Sr. KG, and 1st Standard Right to Education (RTE) online lottery application assistance, document verification, and admission formalities.",
    highlight: "Playgroup to 1st Std (Oct–Dec)",
  },
  {
    id: "online-services-portal",
    title: "Online Services & Digital Registrations",
    category: "education_admissions",
    categoryLabel: "Education & Admissions",
    description: "One-stop digital facilitation desk for government scheme registrations, portal uploads, digital signatures (DSC), and statutory e-services.",
  },
];

export const PRACTICE_AREAS = [
  {
    slug: "advisory",
    title: "Educational, Tax & Legal Advisory",
    shortDesc:
      "Over 15 years of multifaceted expertise delivering customized solutions across educational, tax, statutory governance, and personal client advisory.",
    icon: "Briefcase",
    services: [
      "Taxation, Statutory Filings & Advisory",
      "Educational Guidance & Admissions Counseling",
      "Personal Client Legal Consulting & Needs Assessment",
      "Business Reorganizations & Commercial Structuring",
      "State Excise & Departmental Licensing",
    ],
  },
  {
    slug: "legal-documentation",
    title: "Legal Documentation & Contracts",
    shortDesc:
      "Precision drafting and registration of Leave & License, Sale Agreements, Powers of Attorney, Registered Wills, Gift Deeds, and Commercial Bonds.",
    icon: "FileText",
    services: [
      "Leave & License Registration (Doorstep Service)",
      "Registered Wills, Probate & Succession Petitions",
      "Sale & Purchase Agreements with Stamp Duty Verification",
      "General, Special & Irrevocable Power of Attorney (POA)",
      "Gift Deeds, Release Deeds & Deeds of Rectification",
      "Commercial Loan & Employee Bond Agreements",
    ],
  },
  {
    slug: "dispute-resolution",
    title: "Dispute Resolution & In-House Mediation",
    shortDesc:
      "Pre-litigation strategy, structured in-house mediation, commercial arbitration, and motor accident compensation under the Motor Vehicles Act.",
    icon: "Compass",
    services: [
      "In-House Mediation & Family/Commercial Conciliation",
      "Motor & Road Accident Hit & Run Claims (MV Act Compensation)",
      "Consumer Court Appeals, Complaints & Grievance Redressal",
      "Domestic & Commercial Arbitration Practice",
      "Settlement Agreements & Pre-Litigation Audits",
    ],
  },
  {
    slug: "representation",
    title: "Judicial & Matrimonial Representation",
    shortDesc:
      "Disciplined advocacy in Civil, Criminal, and Property litigation, Court Marriage solemnization for all castes & religions, Divorce, and High Court advocacy.",
    icon: "Landmark",
    services: [
      "Court Marriage & Marriage Registration (All Castes & Religions)",
      "All Civil, Criminal & Property Litigation Advocacy",
      "Divorce, Domestic Violence & Matrimonial Proceedings",
      "High Court & NCLT Commercial Advocacy",
      "Live-In Relationship Agreements & Declarations",
    ],
  },
  {
    slug: "corporate-commercial",
    title: "Society Governance & Commercial Support",
    shortDesc:
      "Co-operative society formation by approved GDCA auditors, society bye-laws management, member transfer papers, and corporate transactional support.",
    icon: "Briefcase",
    services: [
      "Co-operative Society Formation (Approved GDCA Auditor)",
      "Society Management & Compliance with Society Bye-Laws",
      "Society Transfer Documentation & NOC Formalities",
      "Corporate Structuring, LLP Governance & Secretarial Support",
      "Commercial Contracts, Asset Purchases & Licensing",
    ],
  },
  {
    slug: "posh-compliance",
    title: "POSH & Workplace Dignity Support",
    shortDesc:
      "Compassionate, unbiased support for anyone facing workplace harassment—women and men alike—along with grievance committee setup, independent external counsel, and respectful workplace training.",
    icon: "ShieldCheck",
    services: [
      "Confidential Support & Guidance for Both Women and Men",
      "Independent & Unbiased External Grievance Committee Members",
      "Support Against False Accusations & Unfair Workplace Treatment",
      "Plain-Language Anti-Harassment Policies & Codes of Conduct",
      "Dignity & Respect Sensitisation Workshops for Teams",
      "Fair, Empathetic Inquiry Facilitation & Annual Governance",
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
      "Employee Bond Agreements & Liability Waivers",
      "Disciplinary Inquiries & Domestic Enquiries",
      "Retrenchment, Layoff & Closure Compliance",
      "Workplace Safety & Factory Act Audits",
    ],
  },
  {
    slug: "real-estate-property",
    title: "Real Estate, Title Due Diligence & RERA",
    shortDesc:
      "Comprehensive 30-year property title search reports, MahaRERA & RERA complaint registration, Property Card, 7/12 extracts, and Index-2 verification.",
    icon: "Building2",
    services: [
      "30-Year Land & Plot Title Investigation Search Reports",
      "Property Card, 7×12 & 6×12 Extract Procurement",
      "Search & Official Verification of Index-2 Copies",
      "RERA & MahaRERA Complaint Registration & Follow-Up",
      "Conveyance Deeds, Mutation & Regularisation",
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

