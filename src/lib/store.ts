import {
  ServiceRequest,
  QuestionAnswer,
  BlogPost,
  POSHCase,
  Organization,
  ICMember,
  PaymentTransaction,
  ScriptTag,
  AuditLogEntry,
  Hearing,
  EvidenceItem,
  SiteConfig,
  CustomService,
  LegalRule,
  DirectoryItem,
  PageContentItem,
} from "./types";
import {
  generateServiceRequestRef,
  generateQARef,
  generateCaseNumber,
  generateReceiptNumber,
  generateInvoiceNumber,
  generateConcernRef,
} from "./utils";

// Initial Seed Data reflecting real-world Kolkata practice & PRD specifications
const SEED_ORGANIZATIONS: Organization[] = [
  {
    id: "org-1",
    code: "TECHKOL",
    name: "Kolkata Cloud Technologies Pvt Ltd",
    registeredAddress: "Sector V, Salt Lake Electronics Complex, Kolkata, West Bengal 700091",
    city: "Kolkata",
    employeeCount: 420,
    hasIC: true,
    complianceScore: 94,
    icPresidingOfficer: "Dr. Ananya Mukherjee (VP Engineering)",
    icExternalMember: "Adv. Debjani Sen (Acorn Legal Consultants)",
    policyAcknowledgedPct: 91,
    lastAnnualReportYear: 2025,
    annualReportStatus: "submitted_to_do",
    planTier: "retainer_enterprise",
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "org-2",
    code: "BENGALIND",
    name: "Bengal Precision Engineering Ltd",
    registeredAddress: "Taratala Industrial Area, Kolkata, West Bengal 700088",
    city: "Kolkata",
    employeeCount: 180,
    hasIC: true,
    complianceScore: 78,
    icPresidingOfficer: "Ms. Sharmila Roy (General Manager HR)",
    icExternalMember: "Adv. Debjani Sen (Acorn Legal Consultants)",
    policyAcknowledgedPct: 68,
    lastAnnualReportYear: 2025,
    annualReportStatus: "draft",
    planTier: "retainer_standard",
    createdAt: "2024-06-20T11:00:00Z",
  },
  {
    id: "org-3",
    code: "HOOGHLY",
    name: "Hooghly Logistics & Shipping Corp",
    registeredAddress: "Strand Road, Dalhousie BBD Bagh, Kolkata, West Bengal 700001",
    city: "Kolkata",
    employeeCount: 65,
    hasIC: true,
    complianceScore: 82,
    icPresidingOfficer: "Ms. Rita Basu (Head of Administration)",
    icExternalMember: "Adv. Debjani Sen (Acorn Legal Consultants)",
    policyAcknowledgedPct: 85,
    lastAnnualReportYear: 2025,
    annualReportStatus: "submitted_to_do",
    planTier: "basic",
    createdAt: "2025-01-10T09:30:00Z",
  },
];

const SEED_IC_MEMBERS: ICMember[] = [
  {
    id: "ic-mem-1",
    orgId: "org-1",
    name: "Dr. Ananya Mukherjee",
    designation: "Vice President - Engineering",
    role: "presiding_officer",
    isWoman: true,
    email: "ananya.m@kolkatacloud.com",
    phone: "+91 98310 99881",
    tenureStartDate: "2024-04-01",
    tenureEndDate: "2027-03-31",
    status: "active",
  },
  {
    id: "ic-mem-2",
    orgId: "org-1",
    name: "Adv. Debjani Sen",
    designation: "Partner, Acorn Legal Consultants",
    role: "external_member",
    isWoman: true,
    email: "debjani.sen@acornlegal.in",
    phone: "+91 98300 12345",
    tenureStartDate: "2024-04-01",
    tenureEndDate: "2027-03-31",
    status: "active",
  },
  {
    id: "ic-mem-3",
    orgId: "org-1",
    name: "Pooja Banerjee",
    designation: "Senior Manager - Talent Acquisition",
    role: "employee_member",
    isWoman: true,
    email: "pooja.b@kolkatacloud.com",
    phone: "+91 98311 22334",
    tenureStartDate: "2024-04-01",
    tenureEndDate: "2027-03-31",
    status: "active",
  },
  {
    id: "ic-mem-4",
    orgId: "org-1",
    name: "Siddhartha Bose",
    designation: "Lead Systems Architect",
    role: "employee_member",
    isWoman: false,
    email: "siddhartha.b@kolkatacloud.com",
    phone: "+91 98312 33445",
    tenureStartDate: "2024-04-01",
    tenureEndDate: "2027-03-31",
    status: "active",
  },
];

const SEED_CASES: POSHCase[] = [
  {
    id: "case-01",
    caseNumber: "POSH-TECHKOL-2026-0014",
    orgId: "org-1",
    orgName: "Kolkata Cloud Technologies Pvt Ltd",
    state: "HEARING_SCHEDULED",
    incidentDates: ["2026-09-12", "2026-09-18"],
    incidentLocation: "Sector V Office & Client Dinner, Salt Lake",
    natureOfHarassment: [
      "Sexually coloured remarks",
      "Unwelcome physical contact or advances",
      "Implicit threat about present or future employment status",
    ],
    summary: "Repeated inappropriate physical contact and suggestive comments by Project Director during late client reviews.",
    detailedStatement: "During client project delivery in September 2026, the respondent repeatedly touched the complainant's hand and shoulder without consent, followed by WhatsApp messages hinting that appraisal ratings depended on private dinners.",
    complainantName: "Sneha Ganguly",
    complainantDesignation: "Senior UI/UX Designer",
    complainantDepartment: "Design & Product",
    complainantEmail: "sneha.g@kolkatacloud.com",
    complainantPhone: "+91 98319 88123",
    needsAssistance: false,
    preferredLanguage: "en",
    respondentName: "Rakesh Majumdar",
    respondentDesignation: "Director - Client Delivery",
    respondentDepartment: "Enterprise Solutions",
    respondentEmail: "rakesh.m@kolkatacloud.com",
    respondentPhone: "+91 98305 66778",
    witnesses: [
      { name: "Rohit Ghosh", role: "Frontend Developer", contact: "rohit.g@kolkatacloud.com" },
      { name: "Monalisa Das", role: "Product Manager", contact: "monalisa.d@kolkatacloud.com" },
    ],
    interimReliefRequested: {
      type: "restrain_respondent",
      details: "Requesting that respondent be barred from reporting line and that respondent be reassigned to separate floor during inquiry.",
      status: "implemented",
      recommendedAt: "2026-09-24T10:00:00Z",
    },
    filedAt: "2026-09-22T08:30:00Z",
    limitationStatus: "within_3_months",
    noticeToRespondentDeadline: "2026-09-29T18:00:00Z",
    noticeServedAt: "2026-09-24T12:00:00Z",
    respondentReplyDeadline: "2026-10-08T18:00:00Z",
    respondentReplyReceivedAt: "2026-10-06T15:30:00Z",
    respondentDefenseSummary: "Respondent claims interactions were professional team bonding and denied coercive intent.",
    inquiryDeadline: "2026-12-21T18:00:00Z", // 90 days from filed
    reportDeadline: "2026-12-31T18:00:00Z",
    conciliationRequested: false,
    hearings: [
      {
        id: "h-1",
        hearingNumber: 1,
        scheduledDate: "2026-10-18",
        scheduledTime: "11:00 AM IST",
        locationOrLink: "IC Confidential Conference Room 3B, Sector V",
        attendees: ["Dr. Ananya Mukherjee", "Adv. Debjani Sen", "Pooja Banerjee", "Sneha Ganguly"],
        agenda: "Examination of Complainant Statement and Verification of WhatsApp Records",
        minutesSummary: "Complainant corroborated dates and times of text messages. Expressed distress and requested no direct confrontation.",
        status: "completed",
      },
      {
        id: "h-2",
        hearingNumber: 2,
        scheduledDate: "2026-11-08",
        scheduledTime: "02:30 PM IST",
        locationOrLink: "IC Confidential Conference Room 3B / Hybrid Webex",
        attendees: ["Dr. Ananya Mukherjee", "Adv. Debjani Sen", "Siddhartha Bose", "Rakesh Majumdar"],
        agenda: "Examination of Respondent and Response to WhatsApp Transcripts",
        status: "scheduled",
      },
    ],
    evidence: [
      {
        id: "ev-1",
        exhibitCode: "EX-001",
        title: "Exported WhatsApp Chat Transcripts (12 Sep - 19 Sep)",
        fileType: "application/pdf",
        fileSizeKb: 1420,
        uploadedBy: "complainant",
        sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        isRedacted: false,
        uploadedAt: "2026-09-22T08:35:00Z",
        chainOfCustody: [
          { action: "Uploaded by complainant", user: "Sneha Ganguly", timestamp: "2026-09-22 08:35" },
          { action: "Verified by IC Presiding Officer", user: "Dr. Ananya Mukherjee", timestamp: "2026-09-23 11:15" },
        ],
      },
      {
        id: "ev-2",
        exhibitCode: "EX-002",
        title: "Client Dinner Expense Bill & Team Attendance Log",
        fileType: "image/jpeg",
        fileSizeKb: 890,
        uploadedBy: "respondent",
        sha256Hash: "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
        isRedacted: true,
        uploadedAt: "2026-10-06T15:35:00Z",
        chainOfCustody: [
          { action: "Submitted with Respondent Reply", user: "Rakesh Majumdar", timestamp: "2026-10-06 15:35" },
        ],
      },
    ],
    assignedICMembers: ["Dr. Ananya Mukherjee", "Adv. Debjani Sen", "Pooja Banerjee", "Siddhartha Bose"],
    isConfidential: true,
    createdAt: "2026-09-22T08:30:00Z",
    updatedAt: "2026-10-20T14:15:00Z",
  },
  {
    id: "case-02",
    caseNumber: "POSH-BENGALIND-2026-0008",
    orgId: "org-2",
    orgName: "Bengal Precision Engineering Ltd",
    state: "PRELIMINARY_ASSESSMENT",
    incidentDates: ["2026-10-25"],
    incidentLocation: "Factory Floor Assembly Line, Taratala",
    natureOfHarassment: ["Verbal abuse with sexual overtone", "Display of pornographic material"],
    summary: "Supervisor displayed offensive material on personal smartphone to junior technician in store room.",
    detailedStatement: "On 25 October during inventory check, supervisor cornered technician and showed explicit video clip making suggestive gestures.",
    complainantName: "Priyanka Naskar",
    complainantDesignation: "Quality Inspector",
    complainantDepartment: "Quality Assurance",
    complainantEmail: "priyanka.n@bengalind.in",
    complainantPhone: "+91 98322 11009",
    needsAssistance: true,
    supportPersonName: "Kakoli Sen (Colleague)",
    preferredLanguage: "bn",
    respondentName: "Bimalesh Kar",
    respondentDesignation: "Plant Supervisor",
    respondentDepartment: "Assembly Shop",
    respondentEmail: "bimalesh.k@bengalind.in",
    witnesses: [],
    interimReliefRequested: {
      type: "transfer",
      details: "Immediate shift change so that respondent and complainant do not share working hours.",
      status: "requested",
    },
    filedAt: "2026-10-30T10:00:00Z",
    limitationStatus: "within_3_months",
    noticeToRespondentDeadline: "2026-11-08T18:00:00Z",
    inquiryDeadline: "2027-01-28T18:00:00Z",
    reportDeadline: "2027-02-07T18:00:00Z",
    conciliationRequested: false,
    hearings: [],
    evidence: [],
    assignedICMembers: ["Ms. Sharmila Roy", "Adv. Debjani Sen"],
    isConfidential: true,
    createdAt: "2026-10-30T10:00:00Z",
    updatedAt: "2026-10-30T10:00:00Z",
  },
];

const SEED_REQUESTS: ServiceRequest[] = [
  {
    id: "req-1",
    refNumber: "ACN-SR-2026-881923",
    fullName: "Aritra Sen",
    email: "aritra.sen@bengaltech.com",
    phone: "+91 98301 44556",
    preferredChannel: "phone",
    serviceCategory: "posh_compliance",
    subject: "Urgent IC Constitution and External Member Appointment for Kolkata Office",
    description: "We are scaling our tech team in Sector V from 25 to 110 employees and need to constitute our statutory Internal Committee, draft workplace anti-harassment policy, and appoint an experienced external member from Acorn Legal.",
    urgency: "urgent",
    status: "IN_REVIEW",
    assignedTo: "Adv. Debjani Sen",
    internalNotes: [
      {
        id: "note-1",
        author: "Adv. Debjani Sen",
        content: "Spoke with client HR Director. Scheduled intro meeting for Friday 3 PM at Camac Street office.",
        createdAt: "2026-11-01T14:00:00Z",
      },
    ],
    createdAt: "2026-11-01T09:15:00Z",
    updatedAt: "2026-11-01T14:00:00Z",
  },
  {
    id: "req-2",
    refNumber: "ACN-SR-2026-882104",
    fullName: "Rajesh Khemka",
    email: "rkhemka@khemkarealty.in",
    phone: "+91 98310 77889",
    preferredChannel: "email",
    serviceCategory: "real_estate",
    subject: "30-Year Title Search Report for 4.5 Acre Parcel in Rajarhat New Town",
    description: "Require title vetting, encumbrance verification, mutation scrutiny and WBRERA developer agreement review for upcoming residential township.",
    urgency: "standard",
    status: "PROPOSAL_SENT",
    assignedTo: "Adv. Subhasish Mukherjee",
    createdAt: "2026-11-02T11:45:00Z",
    updatedAt: "2026-11-03T16:20:00Z",
  },
  {
    id: "req-3",
    refNumber: "ACN-SR-2026-882350",
    fullName: "Tanushree Dutta",
    email: "tdutta@fintechhub.co",
    phone: "+91 98305 22331",
    preferredChannel: "whatsapp",
    serviceCategory: "corporate_advisory",
    subject: "Shareholders Agreement & ESOP Pool Structuring for Seed Round",
    description: "Finalising ₹3.5 Crore angel round with prominent Kolkata investors. Need review of Term Sheet, SHA and Founders Vesting schedule.",
    urgency: "standard",
    status: "NEW",
    createdAt: "2026-11-04T15:20:00Z",
    updatedAt: "2026-11-04T15:20:00Z",
  },
];

const SEED_QUESTIONS: QuestionAnswer[] = [
  {
    id: "qa-1",
    refNumber: "ACN-QA-2026-100234",
    authorName: "HR Lead, IT Park",
    authorEmail: "hr@itparkkol.in",
    category: "posh_law",
    question: "Is it legally mandatory under the POSH Act 2013 to have an external member who is a woman?",
    answer: "Under Section 4(2)(c) of the POSH Act 2013, the External Member must be appointed from amongst non-governmental organisations or associations committed to the cause of women or a person familiar with the issues relating to sexual harassment. While the Act specifies that the Presiding Officer must be a woman and at least half the total IC members must be women, the External Member can technically be of any gender as long as they satisfy the statutory eligibility. However, good corporate governance strongly recommends appointing a woman legal practitioner or gender rights specialist.",
    answeredBy: "Adv. Debjani Sen, Head of POSH Practice",
    answeredAt: "2026-10-15T12:00:00Z",
    status: "published",
    isPublic: true,
    views: 482,
    upvotes: 39,
    createdAt: "2026-10-14T09:00:00Z",
  },
  {
    id: "qa-2",
    refNumber: "ACN-QA-2026-100345",
    authorName: "Startup Founder, Salt Lake",
    authorEmail: "founder@techkol.co",
    category: "employment",
    question: "Does the 90-day inquiry completion limit under Section 11(4) include public holidays and weekends?",
    answer: "No. Statutory courts and high court jurisprudence have clarified that the 90-day period begins from the date the complaint is received (or conservative trigger), and in computing procedural deadlines, principles of natural justice apply. However, ICs should endeavor to complete all evidence and examination well within 90 calendar days to avoid procedural challenges. The subsequent 10 days for submitting the inquiry report to the employer under Section 13(1) is an additional separate statutory window.",
    answeredBy: "Adv. Subhasish Mukherjee, Managing Partner",
    answeredAt: "2026-10-22T14:30:00Z",
    status: "published",
    isPublic: true,
    views: 310,
    upvotes: 27,
    createdAt: "2026-10-21T10:15:00Z",
  },
  {
    id: "qa-3",
    refNumber: "ACN-QA-2026-100512",
    authorName: "Operations Manager",
    authorEmail: "ops@bengallog.in",
    category: "posh_law",
    question: "Can an aggrieved woman request conciliation, and does that involve monetary compensation?",
    answer: "Under Section 10(1) of the POSH Act, the Internal Committee may, before initiating an inquiry and at the express request of the aggrieved woman, take steps to settle the matter between her and the respondent through conciliation. However, Section 10(1) proviso explicitly mandates that NO monetary settlement shall be made as the basis of conciliation. Any settlement involving cash payment under the guise of POSH conciliation is void ab initio.",
    answeredBy: "Adv. Debjani Sen",
    answeredAt: "2026-10-28T16:00:00Z",
    status: "published",
    isPublic: true,
    views: 620,
    upvotes: 54,
    createdAt: "2026-10-27T11:00:00Z",
  },
];

const SEED_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "posh-annual-report-district-officer-west-bengal-guide",
    title: "Statutory POSH Annual Reporting: Section 21 Guidelines for Kolkata Employers",
    summary: "A practical guide for employers and Internal Committees in West Bengal on preparing, validating, and submitting the mandatory Section 21 Annual Report to the District Magistrate.",
    content: `Under Section 21 of the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, every Internal Committee (IC) is statutorily mandated to prepare and submit an Annual Compliance Report to both the Employer and the designated District Officer (DO) in each calendar year.

In Kolkata and surrounding districts of West Bengal, the Office of the District Magistrate serves as the regulatory nodal authority. Failure to file this report or maintain compliance exposes the company and directors to statutory penalties under Section 26, including financial fines of up to ₹50,000 for the first offense and potential revocation of municipal trade licenses for repeated defaults.

### Essential Components of the Annual Report:
1. **Total Complaints Received:** The precise count of written complaints lodged during the calendar year (1 Jan - 31 Dec).
2. **Complaints Disposed Of:** Redressals completed within the statutory 90-day inquiry window with final findings issued under Section 13.
3. **Cases Pending Beyond 90 Days:** A rigorous narrative detailing justified reasons for any procedural extension.
4. **Awareness & Sensitization Workshops:** Concrete records of employee e-learning, interactive manager workshops, and IC capacity building.
5. **Nature of Executive Action Taken:** Employer implementation records regarding reprimand, termination, leave, or compensation deduction.

Acorn Legal Consultants provides automated annual report generation directly through our POSH Org Console, eliminating compliance risks.`,
    author: {
      name: "Adv. Debjani Sen",
      role: "Partner & Head of POSH Redressal Practice",
    },
    category: "POSH Compliance",
    tags: ["POSH Act", "Annual Report", "Compliance", "West Bengal", "District Officer"],
    readingTimeMinutes: 5,
    status: "published",
    publishedAt: "2026-10-20T09:00:00Z",
    views: 1240,
    seoTitle: "POSH Annual Report Section 21 Filing Guide Kolkata West Bengal",
    seoDescription: "Step-by-step statutory filing guidance for Internal Committees in West Bengal submitting Section 21 reports to the District Magistrate.",
  },
  {
    id: "blog-2",
    slug: "remote-work-hybrid-workplace-posh-jurisdiction",
    title: "The Extended Workplace: POSH Act Applicability in Remote and Hybrid Work Environments",
    summary: "Exploring landmark High Court rulings on how Slack messages, virtual meetings, offsite retreats, and home offices fall squarely within the definition of workplace under Section 2(o).",
    content: `The modern workplace is no longer confined within physical brick-and-mortar office boundaries. With hybrid work, client dinners, and digital communication tools like Microsoft Teams, WhatsApp, and Slack, the legal definition of 'workplace' has expanded significantly.

Section 2(o) of the POSH Act adopts an inclusive definition: 'workplace includes any place visited by the employee arising out of or during the course of employment, including transportation provided by the employer'. 

Indian High Courts (including the Delhi High Court in *Saurabh Kumar Mallick v. Comptroller & Auditor General* and the Calcutta High Court) have consistently held that the doctrine of notional extension applies. Digital harassment across corporate email or late-night WhatsApp messaging falls squarely under the jurisdiction of the Internal Committee.

Employers must ensure their POSH policies explicitly cover virtual workspaces, remote work conduct, and establish clear digital evidence preservation protocols.`,
    author: {
      name: "Adv. Subhasish Mukherjee",
      role: "Managing Partner, Dispute Resolution",
    },
    category: "Workplace Law",
    tags: ["Remote Work", "Hybrid Office", "Digital Harassment", "High Court Rulings"],
    readingTimeMinutes: 6,
    status: "published",
    publishedAt: "2026-10-27T10:30:00Z",
    views: 890,
  },
  {
    id: "blog-3",
    slug: "real-estate-title-due-diligence-kolkata-rajarhat-wbrera",
    title: "Navigating Land Due Diligence in Greater Kolkata: Mutation, Encumbrances and WBRERA",
    summary: "Critical legal checks required before acquiring commercial parcels or joint-development rights in Rajarhat New Town, EM Bypass, and Howrah.",
    content: `Acquiring land or structuring joint development agreements in Kolkata requires meticulous scrutiny of legacy revenue records, Cadastral Survey (CS), Revisional Survey (RS), and Land Reforms (LR) records spanning at least 30 years.

Key Due Diligence Imperatives:
- Verification of 14B vesting status under the West Bengal Land Reforms Act, 1955.
- Scrutiny of municipal tax receipts and Kolkata Municipal Corporation (KMC) / Rajarhat-Gopalpur mutation certificates.
- Search at the Registrar of Assurances, Kolkata for registered encumbrances, lis pendens, or equitable mortgages.
- Compliance with West Bengal Real Estate Regulatory Authority (WBRERA) project registration mandates before marketing.`,
    author: {
      name: "Adv. Subhasish Mukherjee",
      role: "Managing Partner",
    },
    category: "Real Estate",
    tags: ["Real Estate", "WBRERA", "Kolkata Property", "Due Diligence"],
    readingTimeMinutes: 7,
    status: "published",
    publishedAt: "2026-11-02T11:00:00Z",
    views: 650,
  },
];

const SEED_PAYMENTS: PaymentTransaction[] = [
  {
    id: "pay-1",
    receiptNumber: "ACN/RC/2026-27/004812",
    invoiceNumber: "ACN/INV/2026-27/004812",
    clientName: "Kolkata Cloud Technologies Pvt Ltd",
    clientEmail: "finance@kolkatacloud.com",
    clientPhone: "+91 98310 99881",
    clientGstin: "19AAACK9921B1Z2",
    serviceCategory: "POSH Retainer",
    itemDescription: "Q3 2026 POSH Enterprise Retainer & External Member Representation",
    amountPaise: 4500000,
    taxPaise: 810000,
    totalPaise: 5310000,
    currency: "INR",
    razorpayPaymentId: "pay_Rzp992187Kolkata",
    razorpayOrderId: "order_Kolkata99120",
    status: "paid",
    paidAt: "2026-10-01T11:30:00Z",
    createdAt: "2026-10-01T11:15:00Z",
  },
  {
    id: "pay-2",
    receiptNumber: "ACN/RC/2026-27/004835",
    invoiceNumber: "ACN/INV/2026-27/004835",
    clientName: "Aritra Sen",
    clientEmail: "aritra.sen@bengaltech.com",
    clientPhone: "+91 98301 44556",
    serviceCategory: "Consultation",
    itemDescription: "Senior Legal Strategy Consultation (45 Min)",
    amountPaise: 450000,
    taxPaise: 81000,
    totalPaise: 531000,
    currency: "INR",
    razorpayPaymentId: "pay_Rzp102934Consult",
    razorpayOrderId: "order_Consult1029",
    status: "paid",
    paidAt: "2026-11-01T09:45:00Z",
    createdAt: "2026-11-01T09:30:00Z",
  },
];

const SEED_SCRIPTS: ScriptTag[] = [
  {
    id: "script-1",
    name: "Google Analytics 4 (Production)",
    provider: "google_analytics",
    scope: "public_only",
    placement: "head",
    code: `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ACORN99210"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ACORN99210', { anonymize_ip: true });
</script>`,
    consentCategory: "analytics",
    isEnabled: true,
    disallowedOnPOSH: true,
    lastModifiedBy: "Super Admin",
    updatedAt: "2026-10-15T10:00:00Z",
  },
  {
    id: "script-2",
    name: "Meta Pixel (Conversion Tracking)",
    provider: "meta_pixel",
    scope: "landing_page_only",
    placement: "head",
    code: `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '9988221100');
fbq('track', 'PageView');
</script>`,
    consentCategory: "marketing",
    isEnabled: false,
    disallowedOnPOSH: true,
    lastModifiedBy: "Marketing Admin",
    updatedAt: "2026-10-25T14:20:00Z",
  },
];

const SEED_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "log-1",
    actor: "Adv. Debjani Sen",
    actorRole: "ic_external_member",
    action: "HEARING_SCHEDULED",
    entityType: "case",
    entityId: "case-01",
    ipAddress: "103.21.124.50",
    timestamp: "2026-10-20 14:15:22 IST",
    details: "Scheduled Hearing #2 with Respondent for 08 Nov 2026 at 02:30 PM",
  },
  {
    id: "log-2",
    actor: "Dr. Ananya Mukherjee",
    actorRole: "ic_presiding_officer",
    action: "EVIDENCE_VERIFIED",
    entityType: "case",
    entityId: "case-01",
    ipAddress: "14.139.212.18",
    timestamp: "2026-09-23 11:15:10 IST",
    details: "Verified digital signature and SHA-256 hash of Exhibit EX-001",
  },
  {
    id: "log-3",
    actor: "Super Admin",
    actorRole: "super_admin",
    action: "ORGANIZATION_HEALTH_AUDIT",
    entityType: "policy",
    entityId: "org-1",
    ipAddress: "182.74.89.14",
    timestamp: "2026-10-01 10:00:00 IST",
    details: "Validated IC composition quorum: 4 members, 75% women, external member active",
  },
];

const SEED_SITE_CONFIG: SiteConfig = {
  firmName: "Acorn Legal Consultants",
  tagline: "Where Legal Expertise Meets Strategic Excellence.",
  brandSubline: "Excellence in Law. Integrity in Practice.",
  founderName: "Adv. Subhasish Mukherjee",
  founderTitle: "Managing Partner & Senior Counsel",
  heroHeadline: "Excellence in Law.",
  heroSubheadline: "Integrity in Practice.",
  heroDescription:
    "A professional legal consultancy delivering thoughtful, precise, and result-oriented solutions for individuals, businesses, and institutions in Kolkata and across India.",
  heroBgImage: "/images/hero.jpg",
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
  addressLine1: "Suite 4B, Camac Court, 25 Camac Street",
  addressLine2: "Park Street District",
  city: "Kolkata",
  state: "West Bengal",
  postalCode: "700016",
  receptionPhone: "+91 (033) 2486-7700",
  primaryEmail: "contact@acornlegal.in",
  poshEmail: "posh.desk@acornlegal.in",
  emergencyPhone: "+91 98300 12345",
  operatingHours: "Monday – Saturday: 9:30 AM – 7:30 PM IST",
  courtVacationNotice:
    "Chambers open throughout High Court long vacation for urgent mentions & POSH inquiries.",
  googleMapsQuery: "Camac Court, 25 Camac Street, Park Street District, Kolkata 700016",
  footerRollText:
    "Excellence in Law • Integrity in Practice • Camac Street Chambers • Kolkata • High Court Practice • POSH Redressal • Corporate Advisory",
  disclaimer:
    "As per the rules of the Bar Council of India, law firms are not permitted to solicit work or advertise. By accessing this website, the user acknowledges that the information provided is solely for informational purposes and does not create an advocate-client relationship.",
  updatedAt: "2026-11-08T00:00:00Z",
};

const SEED_SERVICES: CustomService[] = [
  {
    id: "srv-1",
    name: "Legal Strategy Consultation",
    category: "General Legal",
    shortDesc: "45-minute confidential session with Senior Legal Consultant with clear written roadmap.",
    pricePaise: 450000,
    displayPrice: "₹4,500",
    turnaroundDays: "24 Hours",
    features: [
      "45-minute confidential session with Senior Legal Consultant",
      "Analysis of documents and risk exposure",
      "Clear written advisory roadmap within 24 hours",
      "Applicable towards future legal representation",
    ],
    isPopular: true,
    isActive: true,
    updatedAt: "2026-10-01T00:00:00Z",
  },
  {
    id: "srv-2",
    name: "POSH Retainer (Basic Tier)",
    category: "POSH Retainer",
    shortDesc: "Constitution of statutory Internal Committee (IC) & Acorn External Member representation.",
    pricePaise: 1800000,
    displayPrice: "₹18,000 / quarter",
    turnaroundDays: "Ongoing Retainer",
    features: [
      "Constitution of statutory Internal Committee (IC)",
      "Acorn External Member appointment & representation",
      "Standard Anti-Sexual Harassment Policy & Notice board drafts",
      "Quarterly compliance review & statutory registry maintenance",
      "Assistance in drafting District Officer Annual Report (Sec 21)",
    ],
    isPopular: false,
    isActive: true,
    updatedAt: "2026-10-01T00:00:00Z",
  },
  {
    id: "srv-3",
    name: "POSH Enterprise Compliance Suite",
    category: "POSH Retainer",
    shortDesc: "Comprehensive institutional compliance with dedicated senior IC external member.",
    pricePaise: 4500000,
    displayPrice: "₹45,000 / quarter",
    turnaroundDays: "Comprehensive Enterprise",
    features: [
      "Everything in Basic Tier",
      "Dedicated Senior External Member for all IC proceedings",
      "End-to-end 90-day inquiry management & evidence vault",
      "Annual employee sensitisation & IC orientation workshops",
      "Automated compliance health scoring & risk audit",
      "Bespoke multilingual policy rollouts (EN, BN, HI)",
    ],
    isPopular: true,
    isActive: true,
    updatedAt: "2026-10-01T00:00:00Z",
  },
  {
    id: "srv-4",
    name: "Commercial Contract Drafting & Vetting",
    category: "Documentation",
    shortDesc: "Bespoke commercial contract drafting with complete indemnification and liability protection.",
    pricePaise: 1250000,
    displayPrice: "₹12,500",
    turnaroundDays: "3 Business Days",
    features: [
      "Custom Master Services Agreement or Vendor Agreement",
      "Exhaustive dispute resolution & governing law clauses",
      "Two rounds of negotiation revisions with counter-party",
      "Counsel execution advisory note",
    ],
    isPopular: false,
    isActive: true,
    updatedAt: "2026-10-01T00:00:00Z",
  },
];

const SEED_LEGAL_RULES: LegalRule[] = [
  { param: "complaint_period_months", value: "3", source: "Section 9(1) POSH Act", status: "Active (v1.0)", description: "Limitation period for filing complaint from incident date", updatedAt: "2026-10-01" },
  { param: "complaint_extension_months", value: "3", source: "Section 9(1) Proviso", status: "Active (v1.0)", description: "Maximum IC extension upon recorded justification", updatedAt: "2026-10-01" },
  { param: "copy_to_respondent_working_days", value: "7", source: "Rule 7(2) POSH Rules 2013", status: "Active (v1.0)", description: "Working days to furnish notice copy to respondent", updatedAt: "2026-10-01" },
  { param: "respondent_reply_working_days", value: "10", source: "Rule 7(3) POSH Rules 2013", status: "Active (v1.0)", description: "Statutory window for respondent written statement", updatedAt: "2026-10-01" },
  { param: "inquiry_days", value: "90", source: "Section 11(4) POSH Act", status: "Active (v1.0)", description: "Mandatory statutory timeline to conclude inquiry", updatedAt: "2026-10-01" },
  { param: "report_days", value: "10", source: "Section 13(1) POSH Act", status: "Active (v1.0)", description: "Days to provide report to employer & parties post inquiry", updatedAt: "2026-10-01" },
  { param: "employer_action_days", value: "60", source: "Section 13(4) POSH Act", status: "Active (v1.0)", description: "Employer implementation timeline for IC recommendations", updatedAt: "2026-10-01" },
  { param: "appeal_days", value: "90", source: "Section 18 POSH Act", status: "Active (v1.0)", description: "Appellate limitation window before Court/Tribunal", updatedAt: "2026-10-01" },
  { param: "conciliation_allows_monetary", value: "false", source: "Section 10(1) Proviso", status: "LOCKED (Statutory Guard)", description: "Absolute statutory prohibition on monetary settlement in conciliation", updatedAt: "2026-10-01" },
];

const SEED_DIRECTORY: DirectoryItem[] = [
  {
    id: "DIR-01",
    name: "National Commission for Women (NCW) 24/7 Helpline",
    category: "STATUTORY_AUTHORITY",
    number: "7827170170",
    hours: "24 Hours / 7 Days",
    description: "National emergency helpline for women facing sexual harassment, domestic violence or distress.",
    isVerified: true,
  },
  {
    id: "DIR-02",
    name: "West Bengal State Women Helpline",
    category: "STATE_HELPLINE",
    number: "181 / 1091",
    hours: "Toll-Free 24 Hours",
    description: "Department of Women & Child Development and Social Welfare, Government of West Bengal.",
    isVerified: true,
  },
  {
    id: "DIR-03",
    name: "Kolkata Police Cyber Crime Division",
    category: "CYBER_POLICE",
    number: "033 2214 3000 / 1930",
    hours: "24/7 Emergency Cyber Desk",
    description: "Lalbazar Cyber Police Station for cyber stalking, revenge pornography, and non-consensual imagery.",
    isVerified: true,
  },
  {
    id: "DIR-04",
    name: "West Bengal State Legal Services Authority (WBSLSA)",
    category: "LEGAL_AID",
    number: "15100 / 033 2248 3892",
    hours: "10:00 AM - 5:00 PM (Court Working Days)",
    description: "Free legal representation and counsel for women and economically disadvantaged citizens under Legal Services Authorities Act.",
    isVerified: true,
  },
  {
    id: "DIR-05",
    name: "District Officer (Collector & DM Kolkata) - POSH Cell",
    category: "STATUTORY_AUTHORITY",
    number: "033 2214 5555",
    hours: "10:00 AM - 5:00 PM",
    description: "Office of the District Magistrate Kolkata for filing Section 21 Annual POSH compliance reports and LC referrals.",
    isVerified: true,
  },
  {
    id: "DIR-06",
    name: "Adv. Subhasish Mukherjee",
    category: "ADVOCATE_COUNSEL",
    number: "+91 33 2287 4000",
    hours: "Chambers Hours (By Appointment)",
    description: "Managing Partner with 25+ years in Calcutta High Court writ, commercial litigation, and regulatory advisory.",
    isVerified: true,
    email: "subhasish@acornlegal.in",
    designation: "Managing Partner & Senior Counsel",
    barRegistration: "WB/1482/1998",
  },
  {
    id: "DIR-07",
    name: "Adv. Debjani Sen",
    category: "ADVOCATE_COUNSEL",
    number: "+91 33 2287 4001",
    hours: "Chambers Hours (By Appointment)",
    description: "Partner specializing in POSH Act 2013 advisory, corporate ethics, and statutory IC external member appointments.",
    isVerified: true,
    email: "debjani.sen@acornlegal.in",
    designation: "Partner & External Member Specialist",
    barRegistration: "WB/2104/2007",
  },
];

const SEED_PAGE_CONTENTS: PageContentItem[] = [
  {
    slug: "about",
    title: "About Acorn Legal Consultants",
    subtitle: "Excellence in Law. Integrity in Practice.",
    content:
      "Acorn Legal Consultants is an independent legal consultancy operating from Camac Street, Kolkata. We combine deep statutory jurisprudence with modern corporate diligence.",
    sections: [
      {
        heading: "Our Heritage & Philosophy",
        body: "Established with a commitment to principled legal representation, Acorn Legal Consultants bridges traditional legal advocacy with modern commercial standards.",
      },
      {
        heading: "Calm Authority & Discretion",
        body: "We believe client confidentiality and institutional integrity are sacred trusts. Every inquiry and case is safeguarded with strict legal privilege.",
      },
    ],
    updatedAt: "2026-10-01T00:00:00Z",
  },
  {
    slug: "disclaimer",
    title: "Bar Council of India Statutory Disclaimer",
    subtitle: "Rule 36 of Bar Council of India Rules",
    content:
      "As per the rules of the Bar Council of India, advocates are prohibited from soliciting work or advertising their practice in any form or manner. By accessing this website, the visitor acknowledges that the information provided is solely for informational purposes.",
    updatedAt: "2026-10-01T00:00:00Z",
  },
  {
    slug: "privacy",
    title: "Privacy & Data Protection Charter",
    subtitle: "Digital Personal Data Protection Act (DPDPA 2023) Compliance",
    content:
      "Acorn Legal Consultants implements stringent data protection standards. All client communications, privileged inquiries, and POSH case files are encrypted and scrubbed of PII in public logs.",
    updatedAt: "2026-10-01T00:00:00Z",
  },
  {
    slug: "terms",
    title: "Terms of Engagement & Website Usage",
    subtitle: "Chambers Practice Terms",
    content:
      "Use of this website does not constitute an advocate-client relationship. Formal representation begins only after execution of a vakalatnama or engagement letter following conflict clearance.",
    updatedAt: "2026-10-01T00:00:00Z",
  },
];

// Helper to access and mutate localStorage with fallback to in-memory store
class PlatformStore {
  private isClient = typeof window !== "undefined";

  private get<T>(key: string, seed: T): T {
    if (!this.isClient) return seed;
    try {
      const data = localStorage.getItem(`acorn_${key}`);
      return data ? JSON.parse(data) : seed;
    } catch {
      return seed;
    }
  }

  private set<T>(key: string, value: T): void {
    if (!this.isClient) return;
    try {
      localStorage.setItem(`acorn_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error("Storage error:", e);
    }
  }

  // Service Requests
  getServiceRequests(): ServiceRequest[] {
    return this.get("service_requests", SEED_REQUESTS);
  }

  addServiceRequest(request: Omit<ServiceRequest, "id" | "refNumber" | "status" | "createdAt" | "updatedAt">): ServiceRequest {
    const list = this.getServiceRequests();
    const newReq: ServiceRequest = {
      ...request,
      id: `req-${Date.now()}`,
      refNumber: generateServiceRequestRef(),
      status: "NEW",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    list.unshift(newReq);
    this.set("service_requests", list);
    this.addAuditLog("Visitor", "public", "SERVICE_REQUEST_SUBMITTED", "request", newReq.refNumber, `Service request submitted: ${newReq.subject}`);
    return newReq;
  }

  updateServiceRequestStatus(id: string, status: ServiceRequest["status"], note?: string): void {
    const list = this.getServiceRequests();
    const item = list.find((r) => r.id === id);
    if (item) {
      item.status = status;
      item.updatedAt = new Date().toISOString();
      if (note) {
        if (!item.internalNotes) item.internalNotes = [];
        item.internalNotes.unshift({
          id: `note-${Date.now()}`,
          author: "Admin / Legal Consultant",
          content: note,
          createdAt: new Date().toISOString(),
        });
      }
      this.set("service_requests", list);
    }
  }

  // Q&A
  getQuestions(): QuestionAnswer[] {
    return this.get("qa_list", SEED_QUESTIONS);
  }

  addQuestion(
    qaOrName: QuestionAnswer | string,
    authorEmail?: string,
    category?: QuestionAnswer["category"],
    question?: string
  ): QuestionAnswer {
    const list = this.getQuestions();
    if (typeof qaOrName === "object") {
      list.unshift(qaOrName);
      this.set("qa_list", list);
      return qaOrName;
    }
    const newQA: QuestionAnswer = {
      id: `qa-${Date.now()}`,
      refNumber: generateQARef(),
      authorName: qaOrName,
      authorEmail: authorEmail || "",
      category: category || "corporate",
      question: question || "",
      status: "pending_review",
      isPublic: false,
      views: 0,
      upvotes: 0,
      createdAt: new Date().toISOString(),
    };
    list.unshift(newQA);
    this.set("qa_list", list);
    return newQA;
  }

  answerQuestion(id: string, answer: string, answeredBy: string, publish: boolean): void {
    const list = this.getQuestions();
    const item = list.find((q) => q.id === id);
    if (item) {
      item.answer = answer;
      item.answeredBy = answeredBy;
      item.answeredAt = new Date().toISOString();
      item.status = publish ? "published" : "answered";
      item.isPublic = publish;
      this.set("qa_list", list);
    }
  }

  upvoteQuestion(id: string): void {
    const list = this.getQuestions();
    const item = list.find((q) => q.id === id);
    if (item) {
      item.upvotes += 1;
      this.set("qa_list", list);
    }
  }

  // Blog Posts
  getBlogs(): BlogPost[] {
    return this.get("blogs", SEED_BLOGS);
  }

  addBlogPost(post: Omit<BlogPost, "id" | "views">): BlogPost {
    const list = this.getBlogs();
    const newPost: BlogPost = {
      ...post,
      id: `blog-${Date.now()}`,
      views: 0,
    };
    list.unshift(newPost);
    this.set("blogs", list);
    return newPost;
  }

  // POSH Cases
  getCases(): POSHCase[] {
    return this.get("posh_cases", SEED_CASES);
  }

  getCaseById(id: string): POSHCase | undefined {
    return this.getCases().find((c) => c.id === id || c.caseNumber === id);
  }

  addPOSHCase(complaintData: {
    orgId: string;
    orgName: string;
    complainantName: string;
    complainantDesignation: string;
    complainantDepartment: string;
    complainantEmail: string;
    complainantPhone: string;
    needsAssistance: boolean;
    supportPersonName?: string;
    preferredLanguage: "en" | "bn" | "hi";
    respondentName: string;
    respondentDesignation: string;
    respondentDepartment: string;
    respondentEmail: string;
    incidentDates: string[];
    incidentLocation: string;
    natureOfHarassment: string[];
    summary: string;
    detailedStatement: string;
    witnesses: Array<{ name: string; role: string; contact?: string }>;
    interimRelief?: { type: any; details: string };
    conciliationRequested: boolean;
  }): POSHCase {
    const list = this.getCases();
    const now = new Date();
    
    // Statutory timers calculation
    const noticeDeadline = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 statutory days
    const inquiryDeadline = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000); // 90 days
    const reportDeadline = new Date(inquiryDeadline.getTime() + 10 * 24 * 60 * 60 * 1000); // +10 days

    const newCase: POSHCase = {
      id: `case-${Date.now()}`,
      caseNumber: generateCaseNumber(complaintData.orgName.substring(0, 4).toUpperCase()),
      orgId: complaintData.orgId,
      orgName: complaintData.orgName,
      state: "SUBMITTED",
      incidentDates: complaintData.incidentDates,
      incidentLocation: complaintData.incidentLocation,
      natureOfHarassment: complaintData.natureOfHarassment,
      summary: complaintData.summary,
      detailedStatement: complaintData.detailedStatement,
      complainantName: complaintData.complainantName,
      complainantDesignation: complaintData.complainantDesignation,
      complainantDepartment: complaintData.complainantDepartment,
      complainantEmail: complaintData.complainantEmail,
      complainantPhone: complaintData.complainantPhone,
      needsAssistance: complaintData.needsAssistance,
      supportPersonName: complaintData.supportPersonName,
      preferredLanguage: complaintData.preferredLanguage,
      respondentName: complaintData.respondentName,
      respondentDesignation: complaintData.respondentDesignation,
      respondentDepartment: complaintData.respondentDepartment,
      respondentEmail: complaintData.respondentEmail,
      witnesses: complaintData.witnesses,
      interimReliefRequested: complaintData.interimRelief
        ? {
            type: complaintData.interimRelief.type,
            details: complaintData.interimRelief.details,
            status: "requested",
          }
        : undefined,
      filedAt: now.toISOString(),
      limitationStatus: "within_3_months",
      noticeToRespondentDeadline: noticeDeadline.toISOString(),
      inquiryDeadline: inquiryDeadline.toISOString(),
      reportDeadline: reportDeadline.toISOString(),
      conciliationRequested: complaintData.conciliationRequested,
      hearings: [],
      evidence: [],
      assignedICMembers: ["Dr. Ananya Mukherjee (PO)", "Adv. Debjani Sen (External)"],
      isConfidential: true,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    list.unshift(newCase);
    this.set("posh_cases", list);
    this.addAuditLog("System", "system", "CASE_FILED", "case", newCase.caseNumber, `Confidential complaint lodged under case number ${newCase.caseNumber}`);
    return newCase;
  }

  addCase(c: POSHCase): void {
    const list = this.getCases();
    list.unshift(c);
    this.set("posh_cases", list);
  }

  updateCaseState(caseId: string, newState: POSHCase["state"], details?: string): void {
    const list = this.getCases();
    const c = list.find((item) => item.id === caseId || item.caseNumber === caseId);
    if (c) {
      c.state = newState;
      c.updatedAt = new Date().toISOString();
      this.set("posh_cases", list);
      this.addAuditLog("IC Presiding Officer", "ic_presiding_officer", `CASE_TRANSITION_${newState}`, "case", c.caseNumber, details || `State updated to ${newState}`);
    }
  }

  addHearing(caseId: string, hearing: Omit<Hearing, "id">): void {
    const list = this.getCases();
    const c = list.find((item) => item.id === caseId || item.caseNumber === caseId);
    if (c) {
      const newHearing: Hearing = {
        ...hearing,
        id: `h-${Date.now()}`,
      };
      c.hearings.push(newHearing);
      c.state = "HEARING_SCHEDULED";
      c.updatedAt = new Date().toISOString();
      this.set("posh_cases", list);
      this.addAuditLog("IC", "ic_member", "HEARING_SCHEDULED", "case", c.caseNumber, `Scheduled Hearing #${newHearing.hearingNumber} on ${newHearing.scheduledDate}`);
    }
  }

  addEvidence(caseId: string, evidence: Omit<EvidenceItem, "id" | "exhibitCode" | "uploadedAt" | "chainOfCustody">): void {
    const list = this.getCases();
    const c = list.find((item) => item.id === caseId || item.caseNumber === caseId);
    if (c) {
      const exNum = String(c.evidence.length + 1).padStart(3, "0");
      const newEv: EvidenceItem = {
        ...evidence,
        id: `ev-${Date.now()}`,
        exhibitCode: `EX-${exNum}`,
        uploadedAt: new Date().toISOString(),
        chainOfCustody: [
          {
            action: `Uploaded by ${evidence.uploadedBy}`,
            user: evidence.uploadedBy,
            timestamp: new Date().toLocaleString("en-IN"),
          },
        ],
      };
      c.evidence.push(newEv);
      c.updatedAt = new Date().toISOString();
      this.set("posh_cases", list);
      this.addAuditLog("Evidence Vault", "ic_member", "EVIDENCE_DEPOSITED", "case", c.caseNumber, `Deposited Exhibit ${newEv.exhibitCode}: ${newEv.title}`);
    }
  }

  addInterimRelief(caseId: string, relief: { type: string; details: string; status?: string }): void {
    const list = this.getCases();
    const c = list.find((item) => item.id === caseId || item.caseNumber === caseId);
    if (c) {
      if (!c.interimReliefs) c.interimReliefs = [];
      const item = {
        id: `ir-${Date.now()}`,
        type: relief.type,
        details: relief.details,
        status: relief.status || "requested",
        requestedAt: new Date().toISOString(),
      };
      c.interimReliefs.push(item);
      c.interimReliefRequested = {
        type: (relief.type.toLowerCase().includes("leave") ? "paid_leave_up_to_3_months" : relief.type.toLowerCase().includes("transfer") ? "transfer" : "other") as any,
        details: relief.details,
        status: "requested",
      };
      c.updatedAt = new Date().toISOString();
      this.set("posh_cases", list);
      this.addAuditLog("Section 12 Safeguard", "complainant", "INTERIM_RELIEF_REQUESTED", "case", c.caseNumber, `Requested Section 12 relief: ${relief.type}`);
    }
  }

  addCaseMotion(caseId: string, motion: { type: string; details: string }): void {
    const list = this.getCases();
    const c = list.find((item) => item.id === caseId || item.caseNumber === caseId);
    if (c) {
      if (motion.type === "CONCILIATION") {
        c.conciliationRequested = true;
      }
      c.updatedAt = new Date().toISOString();
      this.set("posh_cases", list);
      this.addAuditLog("Procedural Motion", "complainant", `MOTION_${motion.type}`, "case", c.caseNumber, motion.details);
    }
  }

  // Organizations
  getOrganizations(): Organization[] {
    return this.get("organizations", SEED_ORGANIZATIONS);
  }

  // IC Members
  getICMembers(orgId?: string): ICMember[] {
    const members = this.get("ic_members", SEED_IC_MEMBERS);
    if (orgId) {
      return members.filter((m) => m.orgId === orgId);
    }
    return members;
  }

  // Payments
  getPayments(): PaymentTransaction[] {
    return this.get("payments", SEED_PAYMENTS);
  }

  recordPayment(data: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    serviceCategory: string;
    itemDescription: string;
    amountPaise: number;
    gstin?: string;
  }): PaymentTransaction {
    const list = this.getPayments();
    const taxPaise = Math.round(data.amountPaise * 0.18);
    const newPay: PaymentTransaction = {
      id: `pay-${Date.now()}`,
      receiptNumber: generateReceiptNumber(),
      invoiceNumber: generateInvoiceNumber(),
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,
      clientGstin: data.gstin,
      serviceCategory: data.serviceCategory,
      itemDescription: data.itemDescription,
      amountPaise: data.amountPaise,
      taxPaise: taxPaise,
      totalPaise: data.amountPaise + taxPaise,
      currency: "INR",
      razorpayPaymentId: `pay_mock_${Date.now()}`,
      status: "paid",
      paidAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    list.unshift(newPay);
    this.set("payments", list);
    this.addAuditLog("Payment Gateway", "finance", "PAYMENT_RECORDED", "payment", newPay.receiptNumber, `Receipt issued for ${newPay.itemDescription} (${newPay.receiptNumber})`);
    return newPay;
  }

  addPayment(payment: PaymentTransaction): void {
    const list = this.getPayments();
    list.unshift(payment);
    this.set("payments", list);
  }

  // Scripts
  getScripts(): ScriptTag[] {
    return this.get("scripts", SEED_SCRIPTS);
  }

  updateScript(id: string, isEnabled: boolean): void {
    const list = this.getScripts();
    const s = list.find((item) => item.id === id);
    if (s) {
      s.isEnabled = isEnabled;
      s.updatedAt = new Date().toISOString();
      this.set("scripts", list);
      this.addAuditLog("Admin", "super_admin", "SCRIPT_STATUS_CHANGED", "script", s.name, `Script ${s.name} enabled state set to ${isEnabled}`);
    }
  }

  // Audit Logs
  getAuditLogs(): AuditLogEntry[] {
    return this.get("audit_logs", SEED_AUDIT_LOGS);
  }

  addAuditLog(
    actorOrAction: string,
    actorRoleOrActor: string,
    actionOrDetails: string,
    entityType?: AuditLogEntry["entityType"],
    entityId?: string,
    details?: string
  ): void {
    let finalActor = actorOrAction;
    let finalActorRole = actorRoleOrActor;
    let finalAction = actionOrDetails;
    let finalEntityType = entityType || "system";
    let finalEntityId = entityId || "system";
    let finalDetails = details || "";

    if (entityType === undefined) {
      finalAction = actorOrAction;
      finalActor = actorRoleOrActor;
      finalActorRole = "user";
      finalEntityType = "system";
      finalEntityId = "system";
      finalDetails = actionOrDetails;
    }

    const logs = this.getAuditLogs();
    const entry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      actor: finalActor,
      actorRole: finalActorRole,
      action: finalAction,
      entityType: finalEntityType,
      entityId: finalEntityId,
      ipAddress: "103.21.124.50",
      timestamp: new Date().toLocaleString("en-IN") + " IST",
      details: finalDetails,
    };
    logs.unshift(entry);
    this.set("audit_logs", logs.slice(0, 100)); // maintain latest 100
  }

  // Site Configuration & Hero CMS
  getSiteConfig(): SiteConfig {
    return this.get("site_config", SEED_SITE_CONFIG);
  }

  updateSiteConfig(partial: Partial<SiteConfig>): SiteConfig {
    const current = this.getSiteConfig();
    const updated: SiteConfig = {
      ...current,
      ...partial,
      updatedAt: new Date().toISOString(),
    };
    this.set("site_config", updated);
    this.addAuditLog("Admin", "super_admin", "SITE_CONFIG_UPDATED", "system", "branding", "Updated site configuration and homepage hero settings");
    return updated;
  }

  // Services CMS
  getServices(): CustomService[] {
    return this.get("services_catalogue", SEED_SERVICES);
  }

  addService(service: Omit<CustomService, "id" | "updatedAt">): CustomService {
    const list = this.getServices();
    const newService: CustomService = {
      ...service,
      id: `srv-${Date.now()}`,
      updatedAt: new Date().toISOString(),
    };
    list.push(newService);
    this.set("services_catalogue", list);
    this.addAuditLog("Admin", "super_admin", "SERVICE_ADDED", "system", newService.id, `Created service: ${newService.name}`);
    return newService;
  }

  updateService(id: string, partial: Partial<CustomService>): void {
    const list = this.getServices();
    const idx = list.findIndex((s) => s.id === id);
    if (idx !== -1) {
      list[idx] = {
        ...list[idx],
        ...partial,
        updatedAt: new Date().toISOString(),
      };
      this.set("services_catalogue", list);
      this.addAuditLog("Admin", "super_admin", "SERVICE_UPDATED", "system", id, `Updated service package ${list[idx].name}`);
    }
  }

  deleteService(id: string): void {
    const list = this.getServices();
    const filtered = list.filter((s) => s.id !== id);
    this.set("services_catalogue", filtered);
    this.addAuditLog("Admin", "super_admin", "SERVICE_DELETED", "system", id, `Deleted service package ${id}`);
  }

  // Legal Rules CMS
  getLegalRules(): LegalRule[] {
    return this.get("legal_rules", SEED_LEGAL_RULES);
  }

  updateLegalRule(param: string, value: string, status?: string): void {
    const list = this.getLegalRules();
    const rule = list.find((r) => r.param === param);
    if (rule) {
      rule.value = value;
      if (status) rule.status = status;
      rule.updatedAt = new Date().toISOString();
      this.set("legal_rules", list);
      this.addAuditLog("Admin", "super_admin", "LEGAL_RULE_MODIFIED", "policy", param, `Updated statutory rule ${param} = ${value}`);
    }
  }

  addLegalRule(rule: LegalRule): void {
    const list = this.getLegalRules();
    list.push(rule);
    this.set("legal_rules", list);
    this.addAuditLog("Admin", "super_admin", "LEGAL_RULE_ADDED", "policy", rule.param, `Added new rule ${rule.param}`);
  }

  // Directory CMS (Helplines & Advocate Profiles)
  getDirectory(): DirectoryItem[] {
    return this.get("directory_items", SEED_DIRECTORY);
  }

  addDirectoryItem(item: Omit<DirectoryItem, "id">): DirectoryItem {
    const list = this.getDirectory();
    const newItem: DirectoryItem = {
      ...item,
      id: `DIR-${Date.now()}`,
      updatedAt: new Date().toISOString(),
    };
    list.push(newItem);
    this.set("directory_items", list);
    this.addAuditLog("Admin", "super_admin", "DIRECTORY_ITEM_ADDED", "system", newItem.id, `Added directory item ${newItem.name}`);
    return newItem;
  }

  updateDirectoryItem(id: string, partial: Partial<DirectoryItem>): void {
    const list = this.getDirectory();
    const idx = list.findIndex((d) => d.id === id);
    if (idx !== -1) {
      list[idx] = {
        ...list[idx],
        ...partial,
        updatedAt: new Date().toISOString(),
      };
      this.set("directory_items", list);
      this.addAuditLog("Admin", "super_admin", "DIRECTORY_ITEM_UPDATED", "system", id, `Updated directory item ${list[idx].name}`);
    }
  }

  deleteDirectoryItem(id: string): void {
    const list = this.getDirectory();
    const filtered = list.filter((d) => d.id !== id);
    this.set("directory_items", filtered);
    this.addAuditLog("Admin", "super_admin", "DIRECTORY_ITEM_DELETED", "system", id, `Removed directory item ${id}`);
  }

  // Static Pages CMS
  getAllPages(): PageContentItem[] {
    return this.get("static_pages", SEED_PAGE_CONTENTS);
  }

  getPageContent(slug: string): PageContentItem {
    const pages = this.getAllPages();
    return pages.find((p) => p.slug === slug) || {
      slug,
      title: slug.toUpperCase(),
      content: "",
      updatedAt: new Date().toISOString(),
    };
  }

  updatePageContent(slug: string, partial: Partial<PageContentItem>): void {
    const pages = this.getAllPages();
    const idx = pages.findIndex((p) => p.slug === slug);
    if (idx !== -1) {
      pages[idx] = {
        ...pages[idx],
        ...partial,
        updatedAt: new Date().toISOString(),
      };
    } else {
      pages.push({
        slug,
        title: partial.title || slug,
        content: partial.content || "",
        subtitle: partial.subtitle,
        sections: partial.sections,
        updatedAt: new Date().toISOString(),
      });
    }
    this.set("static_pages", pages);
    this.addAuditLog("Admin", "super_admin", "PAGE_CONTENT_UPDATED", "system", slug, `Updated static content for /${slug}`);
  }

  // Blog Posts CRUD
  updateBlogPost(id: string, partial: Partial<BlogPost>): void {
    const blogs = this.getBlogs();
    const idx = blogs.findIndex((b) => b.id === id);
    if (idx !== -1) {
      blogs[idx] = { ...blogs[idx], ...partial };
      this.set("blogs", blogs);
      this.addAuditLog("Admin", "super_admin", "BLOG_POST_UPDATED", "system", id, `Updated blog post: ${blogs[idx].title}`);
    }
  }

  deleteBlogPost(id: string): void {
    const blogs = this.getBlogs();
    const filtered = blogs.filter((b) => b.id !== id);
    this.set("blogs", filtered);
    this.addAuditLog("Admin", "super_admin", "BLOG_POST_DELETED", "system", id, `Deleted blog post ${id}`);
  }

  // Questions CRUD
  updateQuestion(id: string, partial: Partial<QuestionAnswer>): void {
    const questions = this.getQuestions();
    const idx = questions.findIndex((q) => q.id === id);
    if (idx !== -1) {
      questions[idx] = { ...questions[idx], ...partial };
      this.set("qa_list", questions);
      this.addAuditLog("Admin", "super_admin", "QA_UPDATED", "system", id, `Updated Q&A item ${id}`);
    }
  }

  deleteQuestion(id: string): void {
    const questions = this.getQuestions();
    const filtered = questions.filter((q) => q.id !== id);
    this.set("qa_list", filtered);
    this.addAuditLog("Admin", "super_admin", "QA_DELETED", "system", id, `Deleted Q&A item ${id}`);
  }

  // Scripts CRUD
  addScript(script: Omit<ScriptTag, "id" | "updatedAt">): ScriptTag {
    const scripts = this.getScripts();
    const newScript: ScriptTag = {
      ...script,
      id: `tag-${Date.now()}`,
      updatedAt: new Date().toISOString(),
    };
    scripts.push(newScript);
    this.set("scripts", scripts);
    this.addAuditLog("Admin", "super_admin", "SCRIPT_ADDED", "script", newScript.name, `Added tracking script ${newScript.name}`);
    return newScript;
  }

  deleteScript(id: string): void {
    const scripts = this.getScripts();
    const filtered = scripts.filter((s) => s.id !== id);
    this.set("scripts", filtered);
    this.addAuditLog("Admin", "super_admin", "SCRIPT_DELETED", "script", id, `Deleted script ${id}`);
  }
}

export const platformStore = new PlatformStore();

