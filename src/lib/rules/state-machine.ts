/* counsel to verify */
/**
 * Authoritative POSH Procedural State Machine
 * Governing state transitions across the statutory lifecycle
 */

export type CaseState =
  | "SUBMITTED"
  | "TRIAGE"
  | "NOTICE_ISSUED"
  | "RESPONSE_RECEIVED"
  | "CONCILIATION_REQUESTED"
  | "CONCILIATION_RESOLVED"
  | "CONCILIATION_FAILED"
  | "FORMAL_INQUIRY"
  | "HEARING_SCHEDULED"
  | "EVIDENCE_GATHERING"
  | "REPORT_DRAFTED"
  | "REPORT_SUBMITTED"
  | "EMPLOYER_ACTION_PENDING"
  | "CLOSED"
  | "DISMISSED"
  | "WITHDRAWN";

export interface TransitionRule {
  from: CaseState[];
  to: CaseState;
  description: string;
}

/* counsel to verify */
export const ALLOWED_TRANSITIONS: TransitionRule[] = [
  {
    from: ["SUBMITTED"],
    to: "TRIAGE",
    description: "Presiding Officer conducts initial jurisdictional and limitation triage.",
  },
  {
    from: ["TRIAGE"],
    to: "NOTICE_ISSUED",
    description: "IC serves statutory notice and complaint copies under Rule 7(2).",
  },
  {
    from: ["TRIAGE"],
    to: "DISMISSED",
    description: "Matter dismissed during triage for lack of workplace nexus or jurisdiction.",
  },
  {
    from: ["NOTICE_ISSUED"],
    to: "RESPONSE_RECEIVED",
    description: "Respondent submits written statement within Rule 7(3) 10-day window.",
  },
  {
    from: ["NOTICE_ISSUED", "RESPONSE_RECEIVED"],
    to: "CONCILIATION_REQUESTED",
    description: "Complainant submits written request for Section 10 conciliation.",
  },
  {
    from: ["CONCILIATION_REQUESTED"],
    to: "CONCILIATION_RESOLVED",
    description: "Parties execute non-monetary settlement terms per Section 10(1).",
  },
  {
    from: ["CONCILIATION_REQUESTED"],
    to: "CONCILIATION_FAILED",
    description: "Conciliation fails or settlement terms breached per Section 10(4).",
  },
  {
    from: ["RESPONSE_RECEIVED", "CONCILIATION_FAILED", "NOTICE_ISSUED"],
    to: "FORMAL_INQUIRY",
    description: "IC proceeds to formal inquiry under Section 11.",
  },
  {
    from: ["FORMAL_INQUIRY", "EVIDENCE_GATHERING"],
    to: "HEARING_SCHEDULED",
    description: "Statutory witness or party examination scheduled under Rule 7.",
  },
  {
    from: ["HEARING_SCHEDULED"],
    to: "EVIDENCE_GATHERING",
    description: "Depositions, exhibits, and cross-examination recorded.",
  },
  {
    from: ["FORMAL_INQUIRY", "HEARING_SCHEDULED", "EVIDENCE_GATHERING"],
    to: "REPORT_DRAFTED",
    description: "Findings and recommendations drafted by IC members.",
  },
  {
    from: ["REPORT_DRAFTED"],
    to: "REPORT_SUBMITTED",
    description: "Final inquiry report formally submitted to employer under Section 13(1).",
  },
  {
    from: ["REPORT_SUBMITTED"],
    to: "EMPLOYER_ACTION_PENDING",
    description: "Employer initiates implementation under Section 13(4) 60-day window.",
  },
  {
    from: ["CONCILIATION_RESOLVED", "EMPLOYER_ACTION_PENDING"],
    to: "CLOSED",
    description: "Inquiry successfully completed, actions implemented, docket sealed.",
  },
  {
    from: ["SUBMITTED", "TRIAGE", "NOTICE_ISSUED"],
    to: "WITHDRAWN",
    description: "Complainant voluntarily withdraws complaint with IC permission.",
  },
];

/* counsel to verify */
/**
 * Validates whether state transition is legally permissible
 */
export function canTransition(current: CaseState, next: CaseState): boolean {
  return ALLOWED_TRANSITIONS.some(
    (rule) => rule.from.includes(current) && rule.to === next
  );
}

/* counsel to verify */
/**
 * Returns permissible next states from current state
 */
export function getNextAllowedStates(current: CaseState): CaseState[] {
  return ALLOWED_TRANSITIONS
    .filter((rule) => rule.from.includes(current))
    .map((rule) => rule.to);
}
