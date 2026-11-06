// TypeScript definitions matching PRD Section 24 (Data Dictionary)

export type Role =
  | "super_admin"
  | "admin"
  | "legal_consultant"
  | "editor"
  | "finance"
  | "posh_admin"
  | "org_admin"
  | "ic_presiding_officer"
  | "ic_member"
  | "ic_external_member"
  | "complainant"
  | "respondent";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  roles: Role[];
  orgId?: string;
  status: "active" | "invited" | "suspended";
  mfaEnabled: boolean;
  locale: "en" | "bn" | "hi";
  createdAt: string;
  lastLoginAt?: string;
}

export type ServiceRequestStatus =
  | "NEW"
  | "CONTACTED"
  | "IN_REVIEW"
  | "PROPOSAL_SENT"
  | "ENGAGED"
  | "CLOSED";

export interface ServiceRequest {
  id: string;
  refNumber: string; // ACN-SR-YYYY-NNNNNN
  referenceNumber?: string;
  fullName: string;
  name?: string;
  email: string;
  phone: string;
  organization?: string;
  preferredChannel: "phone" | "email" | "whatsapp" | "in_person";
  preferredMode?: string;
  serviceCategory:
    | "corporate_advisory"
    | "posh_compliance"
    | "dispute_resolution"
    | "employment_labour"
    | "real_estate"
    | "contract_drafting"
    | "general_counsel"
    | string;
  practiceArea?: string;
  subject: string;
  description: string;
  urgency: "standard" | "urgent" | "emergency" | "NORMAL" | "URGENT" | "EMERGENCY" | string;
  status: ServiceRequestStatus;
  assignedTo?: string;
  internalNotes?: Array<{
    id: string;
    author: string;
    content: string;
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionAnswer {
  id: string;
  refNumber: string; // ACN-QA-YYYY-NNNNNN
  referenceNumber?: string;
  authorName: string;
  authorEmail: string;
  askedByName?: string;
  askedByEmail?: string;
  category:
    | "posh_law"
    | "employment"
    | "contracts"
    | "litigation"
    | "corporate"
    | "property"
    | string;
  question: string;
  answer?: string;
  answeredBy?: string;
  answeredAt?: string;
  status: "pending_review" | "answered" | "published" | "rejected" | string;
  isPublic: boolean;
  isPublished?: boolean;
  views: number;
  upvotes: number;
  createdAt: string;
  updatedAt?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  excerpt?: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  authorName?: string;
  category: string;
  tags: string[];
  readingTimeMinutes: number;
  readTimeMinutes?: number;
  featuredImage?: string;
  status: "draft" | "published" | "archived";
  publishedAt?: string;
  views: number;
  seoTitle?: string;
  seoDescription?: string;
}

// POSH Specific Types (PRD Section 8 & 24)
export type CaseState =
  | "DRAFT"
  | "SUBMITTED"
  | "LIMITATION_REVIEW"
  | "PRELIMINARY_ASSESSMENT"
  | "CONCILIATION_REQUESTED"
  | "CONCILIATION_SUCCESS"
  | "NOTICE_SERVED"
  | "REPLY_RECEIVED"
  | "INQUIRY_IN_PROGRESS"
  | "HEARING_SCHEDULED"
  | "REPORT_DRAFTED"
  | "REPORT_ISSUED"
  | "EMPLOYER_ACTION_PENDING"
  | "APPEAL_PERIOD"
  | "CLOSED"
  | "REFERRED_TO_LC";

export interface Organization {
  id: string;
  code: string; // e.g., TECHKOL, BENGALIND
  name: string;
  registeredAddress: string;
  city: string; // Kolkata, etc.
  employeeCount: number;
  hasIC: boolean;
  complianceScore: number; // 0 - 100
  icPresidingOfficer: string;
  icExternalMember: string;
  presidingOfficerName?: string;
  externalMemberName?: string;
  industry?: string;
  healthScore?: number;
  plan?: string;
  policyAcknowledgedPct: number;
  lastAnnualReportYear: number;
  annualReportStatus: "draft" | "submitted_to_do" | "pending";
  planTier: "basic" | "retainer_standard" | "retainer_enterprise" | string;
  createdAt: string;
}

export interface ICMember {
  id: string;
  orgId: string;
  name: string;
  designation: string;
  role: "presiding_officer" | "employee_member" | "external_member";
  isWoman: boolean;
  email: string;
  phone: string;
  tenureStartDate: string;
  tenureEndDate: string;
  status: "active" | "resigned" | "leave";
}

export interface Hearing {
  id: string;
  hearingNumber: number;
  scheduledDate: string;
  scheduledTime: string;
  locationOrLink: string;
  attendees: string[];
  agenda: string;
  minutesSummary?: string;
  status: "scheduled" | "completed" | "rescheduled" | "adjourned";
}

export interface EvidenceItem {
  id: string;
  exhibitCode: string; // EX-001
  title: string;
  fileType: string;
  fileSizeKb: number;
  uploadedBy: "complainant" | "respondent" | "ic_member";
  sha256Hash: string;
  isRedacted: boolean;
  uploadedAt: string;
  verificationStatus?: "verified" | "pending" | "rejected" | string;
  description?: string;
  chainOfCustody: Array<{
    action: string;
    user: string;
    timestamp: string;
  }>;
}

export interface POSHCase {
  id: string;
  caseNumber: string; // POSH-ORG-YYYY-NNNN
  orgId: string;
  orgName?: string;
  state: CaseState | string;
  incidentDates?: string[]; // YYYY-MM-DD
  incidentLocation?: string;
  natureOfHarassment?: string[];
  summary?: string;
  detailedStatement?: string;
  allegations?: string[];
  priority?: "NORMAL" | "HIGH" | "URGENT" | "normal" | "urgent" | "emergency" | string;
  daysRemaining90?: number;
  presidingOfficerName?: string;
  externalMemberName?: string;
  
  // Complainant Details (Masked in non-privileged views)
  complainantName?: string;
  complainantDesignation?: string;
  complainantDepartment?: string;
  complainantEmail?: string;
  complainantPhone?: string;
  complainantCode?: string;
  needsAssistance?: boolean;
  supportPersonName?: string;
  preferredLanguage?: "en" | "bn" | "hi";

  // Respondent Details
  respondentName?: string;
  respondentDesignation?: string;
  respondentDepartment?: string;
  respondentEmail?: string;
  respondentPhone?: string;
  respondentCode?: string;

  // Witnesses
  witnesses?: Array<{
    name: string;
    role: string;
    contact?: string;
  }>;

  // Relief Requested (Section 12)
  interimReliefRequested?: {
    type: "transfer" | "paid_leave_up_to_3_months" | "restrain_respondent" | "other";
    details: string;
    status: "requested" | "recommended" | "rejected" | "implemented";
    recommendedAt?: string;
  };
  interimReliefs?: any[];

  // Statutory Timers & Milestones
  filedAt: string; // Day 0
  limitationStatus?: "within_3_months" | "extended_with_grounds" | "time_barred";
  extensionReason?: string;
  noticeToRespondentDeadline?: string; // Day 7 working days
  noticeServedAt?: string;
  respondentReplyDeadline?: string; // 10 working days from notice
  respondentReplyReceivedAt?: string;
  respondentDefenseSummary?: string;
  inquiryDeadline?: string; // Day 90 statutory max
  inquiryCompletedAt?: string;
  reportDeadline?: string; // 10 days from inquiry completion
  reportSubmittedAt?: string;
  employerActionDeadline?: string; // 60 days from report
  employerActionTaken?: string;
  appealDeadline?: string; // 90 days from recommendations

  // Procedural Records
  conciliationRequested?: boolean;
  conciliationTerms?: string;
  conciliationOutcome?: "successful" | "failed" | "not_attempted";

  hearings: Hearing[];
  evidence: EvidenceItem[];
  
  // Final Findings & Section 15 Compensation
  findingsSummary?: string;
  icRecommendation?: "charges_substantiated" | "charges_not_substantiated" | "settlement_concluded";
  recommendedActions?: string[];
  compensationDetails?: {
    mentalTraumaPaise: number;
    careerLossPaise: number;
    medicalExpensesPaise: number;
    respondentCapacityPaise: number;
    totalAmountRupees: number;
  };

  assignedICMembers?: string[];
  isConfidential?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ConcernReport {
  id: string;
  refNumber: string; // CR-ORG-YYYY-NNNN
  orgId: string;
  reporterType: "anonymous_bystander" | "employee" | "manager" | "vendor";
  incidentSummary: string;
  department: string;
  approxDate: string;
  partiesInvolved: string;
  triageStatus: "new" | "reviewed" | "converted_to_case" | "closed_informally";
  createdAt: string;
}

export interface PaymentTransaction {
  id: string;
  receiptNumber: string; // ACN/RC/2026-27/NNNNNN
  invoiceNumber: string; // ACN/INV/2026-27/NNNNNN
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientGstin?: string;
  serviceCategory: string;
  itemDescription: string;
  amountPaise: number; // in paise
  taxPaise: number; // 18% GST
  gstPaise?: number;
  totalPaise: number;
  currency: "INR";
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  orderId?: string;
  paymentId?: string;
  packageCode?: string;
  packageName?: string;
  method?: string;
  status: "paid" | "pending" | "refunded" | "failed";
  paidAt?: string;
  createdAt: string;
}

export interface ScriptTag {
  id: string;
  name: string;
  provider: "google_analytics" | "meta_pixel" | "clarity" | "custom_chat" | "other";
  scope: "site_wide" | "public_only" | "landing_page_only";
  placement: "head" | "body_start" | "body_end";
  code: string;
  consentCategory: "essential" | "analytics" | "marketing";
  isEnabled: boolean;
  disallowedOnPOSH: boolean; // Must always be true for POSH portals per PRD Section 22.2
  lastModifiedBy: string;
  updatedAt: string;
}

export interface AuditLogEntry {
  id: string;
  actor: string;
  actorRole: string;
  action: string;
  entityType: "case" | "request" | "payment" | "script" | "user" | "policy" | "system" | string;
  entityId: string;
  ipAddress: string;
  timestamp: string;
  details: string;
}

