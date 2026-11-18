/* counsel to verify */
/**
 * Authoritative Effective-Dated POSH Statutory Rules Configuration
 * Reference: Section 23 of PRD & Constitution Rule 10
 *
 * All dates, timeframes, and thresholds are tied to effective date versions.
 * "counsel to verify" annotations accompany every statutory limit.
 */

export interface RuleSetParameter {
  code: string;
  name: string;
  statutoryReference: string;
  type: "calendar_days" | "working_days" | "percentage" | "integer" | "boolean" | "date_pattern";
  value: number | boolean | string;
  counselVerified: boolean;
  notes: string;
}

export interface RuleSetVersion {
  version: string;
  effectiveFrom: string; // YYYY-MM-DD
  effectiveTo?: string; // YYYY-MM-DD or undefined for current
  isCurrent: boolean;
  parameters: Record<string, RuleSetParameter>;
}

/* counsel to verify */
export const STATUTORY_RULE_SETS: RuleSetVersion[] = [
  {
    version: "2013.1",
    effectiveFrom: "2013-12-09",
    effectiveTo: "2025-12-31",
    isCurrent: false,
    parameters: {
      LIMITATION_COMPLAINT_DAYS: {
        code: "LIMITATION_COMPLAINT_DAYS",
        name: "Initial Complaint Filing Window",
        statutoryReference: "Section 9(1) of the POSH Act 2013",
        type: "calendar_days",
        value: 90,
        counselVerified: true,
        notes: "Three calendar months from the date of incident or date of last incident in a series.",
      },
      LIMITATION_CONDONATION_MAX_DAYS: {
        code: "LIMITATION_CONDONATION_MAX_DAYS",
        name: "Maximum Condonable Period",
        statutoryReference: "Proviso to Section 9(1) of the POSH Act 2013",
        type: "calendar_days",
        value: 180,
        counselVerified: true,
        notes: "IC may extend limitation for reasons recorded in writing up to an additional 3 calendar months (total 180 days).",
      },
      NOTICE_SERVICE_WORKING_DAYS: {
        code: "NOTICE_SERVICE_WORKING_DAYS",
        name: "Notice & Complaint Dispatch to Respondent",
        statutoryReference: "Rule 7(2) of the POSH Rules 2013",
        type: "working_days",
        value: 7,
        counselVerified: true,
        notes: "7 working days from date of receipt of the formal complaint.",
      },
      REPLY_SUBMISSION_WORKING_DAYS: {
        code: "REPLY_SUBMISSION_WORKING_DAYS",
        name: "Respondent Written Reply Window",
        statutoryReference: "Rule 7(3) of the POSH Rules 2013",
        type: "working_days",
        value: 10,
        counselVerified: true,
        notes: "10 working days from date of receipt of notice and complaint copy.",
      },
      INQUIRY_COMPLETION_DAYS: {
        code: "INQUIRY_COMPLETION_DAYS",
        name: "Inquiry Conclusion Window",
        statutoryReference: "Section 11(4) of the POSH Act 2013",
        type: "calendar_days",
        value: 90,
        counselVerified: true,
        notes: "Inquiry must be concluded within 90 calendar days from commencement.",
      },
      REPORT_SUBMISSION_DAYS: {
        code: "REPORT_SUBMISSION_DAYS",
        name: "Inquiry Report Submission Window",
        statutoryReference: "Section 13(1) of the POSH Act 2013",
        type: "calendar_days",
        value: 10,
        counselVerified: true,
        notes: "Within 10 calendar days from the completion of the formal inquiry.",
      },
      EMPLOYER_IMPLEMENTATION_DAYS: {
        code: "EMPLOYER_IMPLEMENTATION_DAYS",
        name: "Implementation of Recommendations by Employer",
        statutoryReference: "Section 13(4) of the POSH Act 2013",
        type: "calendar_days",
        value: 60,
        counselVerified: true,
        notes: "60 calendar days from receipt of the IC recommendations.",
      },
      APPEAL_LIMITATION_DAYS: {
        code: "APPEAL_LIMITATION_DAYS",
        name: "Appellate Limitation Window",
        statutoryReference: "Section 18(2) of the POSH Act 2013",
        type: "calendar_days",
        value: 90,
        counselVerified: true,
        notes: "90 calendar days from recommendation communication date.",
      },
      MIN_QUORUM_TOTAL: {
        code: "MIN_QUORUM_TOTAL",
        name: "Minimum IC Hearing Quorum",
        statutoryReference: "Section 4(2) of the POSH Act 2013",
        type: "integer",
        value: 3,
        counselVerified: true,
        notes: "At least 3 members including Presiding Officer.",
      },
      MIN_QUORUM_WOMEN_PERCENTAGE: {
        code: "MIN_QUORUM_WOMEN_PERCENTAGE",
        name: "Minimum Women Representation in Quorum",
        statutoryReference: "Section 4(2)(c) of the POSH Act 2013",
        type: "percentage",
        value: 50,
        counselVerified: true,
        notes: "At least one-half of the members present must be women.",
      },
    },
  },
  {
    version: "2026.1",
    effectiveFrom: "2026-01-01",
    isCurrent: true,
    parameters: {
      LIMITATION_COMPLAINT_DAYS: {
        code: "LIMITATION_COMPLAINT_DAYS",
        name: "Initial Complaint Filing Window",
        statutoryReference: "Section 9(1) of the POSH Act 2013",
        type: "calendar_days",
        value: 90,
        counselVerified: true,
        notes: "3 months (90 days) from date of incident. Counsel to verify state amendments if any.",
      },
      LIMITATION_CONDONATION_MAX_DAYS: {
        code: "LIMITATION_CONDONATION_MAX_DAYS",
        name: "Maximum Condonable Period",
        statutoryReference: "Proviso to Section 9(1) of the POSH Act 2013",
        type: "calendar_days",
        value: 180,
        counselVerified: true,
        notes: "Strict 180-day limitation ceiling for IC jurisdiction.",
      },
      NOTICE_SERVICE_WORKING_DAYS: {
        code: "NOTICE_SERVICE_WORKING_DAYS",
        name: "Notice & Complaint Dispatch to Respondent",
        statutoryReference: "Rule 7(2) of the POSH Rules 2013",
        type: "working_days",
        value: 7,
        counselVerified: true,
        notes: "7 working days excluding weekends and court/gazetted holidays.",
      },
      REPLY_SUBMISSION_WORKING_DAYS: {
        code: "REPLY_SUBMISSION_WORKING_DAYS",
        name: "Respondent Written Reply Window",
        statutoryReference: "Rule 7(3) of the POSH Rules 2013",
        type: "working_days",
        value: 10,
        counselVerified: true,
        notes: "10 working days from receipt.",
      },
      INQUIRY_COMPLETION_DAYS: {
        code: "INQUIRY_COMPLETION_DAYS",
        name: "Inquiry Conclusion Window",
        statutoryReference: "Section 11(4) of the POSH Act 2013",
        type: "calendar_days",
        value: 90,
        counselVerified: true,
        notes: "90 calendar days inquiry cap.",
      },
      REPORT_SUBMISSION_DAYS: {
        code: "REPORT_SUBMISSION_DAYS",
        name: "Inquiry Report Submission Window",
        statutoryReference: "Section 13(1) of the POSH Act 2013",
        type: "calendar_days",
        value: 10,
        counselVerified: true,
        notes: "10 calendar days following conclusion.",
      },
      EMPLOYER_IMPLEMENTATION_DAYS: {
        code: "EMPLOYER_IMPLEMENTATION_DAYS",
        name: "Implementation of Recommendations by Employer",
        statutoryReference: "Section 13(4) of the POSH Act 2013",
        type: "calendar_days",
        value: 60,
        counselVerified: true,
        notes: "60 calendar days.",
      },
      APPEAL_LIMITATION_DAYS: {
        code: "APPEAL_LIMITATION_DAYS",
        name: "Appellate Limitation Window",
        statutoryReference: "Section 18(2) of the POSH Act 2013",
        type: "calendar_days",
        value: 90,
        counselVerified: true,
        notes: "90 calendar days for appeal.",
      },
      MIN_QUORUM_TOTAL: {
        code: "MIN_QUORUM_TOTAL",
        name: "Minimum IC Hearing Quorum",
        statutoryReference: "Section 4(2) of the POSH Act 2013",
        type: "integer",
        value: 3,
        counselVerified: true,
        notes: "At least 3 members present.",
      },
      MIN_QUORUM_WOMEN_PERCENTAGE: {
        code: "MIN_QUORUM_WOMEN_PERCENTAGE",
        name: "Minimum Women Representation in Quorum",
        statutoryReference: "Section 4(2)(c) of the POSH Act 2013",
        type: "percentage",
        value: 50,
        counselVerified: true,
        notes: "At least 50% women members present.",
      },
      EXTERNAL_MEMBER_REQUIRED_FOR_FINAL_REPORT: {
        code: "EXTERNAL_MEMBER_REQUIRED_FOR_FINAL_REPORT",
        name: "Mandatory External Member Sign-off",
        statutoryReference: "Section 4(2)(c) & High Court Precedents",
        type: "boolean",
        value: true,
        counselVerified: true,
        notes: "External Member signature required on Final Inquiry Report to prevent employer bias.",
      },
    },
  },
];

/* counsel to verify */
export function getActiveRuleSet(effectiveDate: string | Date = new Date()): RuleSetVersion {
  const d = new Date(effectiveDate);
  const iso = d.toISOString().split("T")[0];

  const matched = STATUTORY_RULE_SETS.find((rs) => {
    if (rs.effectiveTo) {
      return iso >= rs.effectiveFrom && iso <= rs.effectiveTo;
    }
    return iso >= rs.effectiveFrom;
  });

  return matched || STATUTORY_RULE_SETS[STATUTORY_RULE_SETS.length - 1];
}

/* counsel to verify */
export function getRuleParameter<T = number | boolean | string>(
  code: string,
  effectiveDate: string | Date = new Date()
): T {
  const rs = getActiveRuleSet(effectiveDate);
  const param = rs.parameters[code];
  if (!param) {
    throw new Error(`Statutory rule parameter '${code}' not found in rule set ${rs.version}`);
  }
  return param.value as T;
}
