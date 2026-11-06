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
}

export const platformStore = new PlatformStore();

