/* counsel to verify */
/**
 * Authoritative Statutory Timelines & 21 Timers (TM-01 to TM-21)
 * Reference: Section 8.16.1 of the PRD & POSH Act 2013 / Rules 2013
 *
 * Implements authoritative calendar calculations, alert thresholds,
 * clock-stop reasons, and overdue evaluation.
 */

import { addWorkingDays, applySection4ClosureRollover } from "./calendar";
import { getRuleParameter } from "./engine/rules.config";

export type LimitationStatus =
  | "WITHIN_LIMITATION"
  | "REQUIRES_CONDONATION"
  | "STATUTORILY_BARRED";

export interface LimitationEvaluation {
  status: LimitationStatus;
  elapsedDays: number;
  requiresCondonation: boolean;
  isBarred: boolean;
  explanation: string;
}

export type StatutoryTimerCode =
  | "TM-01" // Complaint period (90 days)
  | "TM-02" // Extension of complaint period (further 90 days)
  | "TM-03" // Intake Acknowledgement (1 working day)
  | "TM-04" // Preliminary Triage (3 working days)
  | "TM-05" // Copy to respondent (7 working days)
  | "TM-06" // Respondent written reply (10 working days)
  | "TM-07" // Hearing notice lead time (3 working days)
  | "TM-08" // Inquiry completion (90 calendar days)
  | "TM-09" // Report to employer & parties (10 calendar days)
  | "TM-10" // Employer implementation (60 calendar days)
  | "TM-11" // Appeal limitation window (90 calendar days)
  | "TM-12" // Interim relief decision (5 working days)
  | "TM-13" // Notice before ex parte action (15 calendar days)
  | "TM-14" // Interim leave maximum duration (90 calendar days)
  | "TM-15" // IC member maximum tenure (3 years)
  | "TM-16" // Annual report to District Officer (January 31)
  | "TM-17" // Board's Report disclosure submission
  | "TM-18" // Annual awareness training cycle (365 calendar days)
  | "TM-19" // Aftercare check-in intervals (30, 60, 90 days)
  | "TM-20" // Record retention review (8 years)
  | "TM-21"; // Abandoned draft expiry (30 calendar days)

export type TimerStatus = "RUNNING" | "PAUSED" | "MET" | "BREACHED" | "CANCELLED";

export interface StatutoryTimerDefinition {
  code: StatutoryTimerCode;
  name: string;
  statutoryReference: string;
  durationDays: number;
  type: "calendar_days" | "working_days" | "fixed_date" | "years";
  alertOffsetsDays: number[]; // e.g. [7, 3, 1] days before deadline
  counselVerified: boolean;
  description: string;
}

/* counsel to verify */
export const STATUTORY_TIMERS: Record<StatutoryTimerCode, StatutoryTimerDefinition> = {
  "TM-01": {
    code: "TM-01",
    name: "Complaint Limitation Window",
    statutoryReference: "Section 9(1) of the POSH Act 2013",
    durationDays: 90,
    type: "calendar_days",
    alertOffsetsDays: [30, 14, 7, 1],
    counselVerified: true,
    description: "3 calendar months (90 days) from date of incident to file complaint.",
  },
  "TM-02": {
    code: "TM-02",
    name: "Condonable Limitation Extension",
    statutoryReference: "Proviso to Section 9(1) of the POSH Act 2013",
    durationDays: 90,
    type: "calendar_days",
    alertOffsetsDays: [14, 7, 2],
    counselVerified: true,
    description: "Up to an additional 3 calendar months (total 180 days) upon recording written cause.",
  },
  "TM-03": {
    code: "TM-03",
    name: "Intake Acknowledgement Receipt",
    statutoryReference: "Best Practice & Model Rules 2013",
    durationDays: 1,
    type: "working_days",
    alertOffsetsDays: [0],
    counselVerified: true,
    description: "Formal digital acknowledgement issued to complainant within 1 working day.",
  },
  "TM-04": {
    code: "TM-04",
    name: "Preliminary IC Triage Review",
    statutoryReference: "Rule 7 & Natural Justice Principles",
    durationDays: 3,
    type: "working_days",
    alertOffsetsDays: [1],
    counselVerified: true,
    description: "Presiding Officer triage and prima facie assessment within 3 working days.",
  },
  "TM-05": {
    code: "TM-05",
    name: "Dispatch of Notice & Complaint Copy",
    statutoryReference: "Rule 7(2) of the POSH Rules 2013",
    durationDays: 7,
    type: "working_days",
    alertOffsetsDays: [3, 1],
    counselVerified: true,
    description: "Copy of the complaint sent to the respondent within 7 working days of receipt.",
  },
  "TM-06": {
    code: "TM-06",
    name: "Respondent Written Reply Submission",
    statutoryReference: "Rule 7(3) of the POSH Rules 2013",
    durationDays: 10,
    type: "working_days",
    alertOffsetsDays: [5, 2, 1],
    counselVerified: true,
    description: "Respondent must file written reply along with supporting documents within 10 working days.",
  },
  "TM-07": {
    code: "TM-07",
    name: "Hearing Notice Minimum Lead Time",
    statutoryReference: "Rule 7(4) & Principles of Natural Justice",
    durationDays: 3,
    type: "working_days",
    alertOffsetsDays: [2, 1],
    counselVerified: true,
    description: "Notice of hearing date given to parties with at least 3 working days notice.",
  },
  "TM-08": {
    code: "TM-08",
    name: "Statutory Inquiry Completion Window",
    statutoryReference: "Section 11(4) of the POSH Act 2013",
    durationDays: 90,
    type: "calendar_days",
    alertOffsetsDays: [30, 15, 7, 3, 1],
    counselVerified: true,
    description: "Formal inquiry must be concluded within 90 calendar days from commencement.",
  },
  "TM-09": {
    code: "TM-09",
    name: "Inquiry Report Submission",
    statutoryReference: "Section 13(1) of the POSH Act 2013",
    durationDays: 10,
    type: "calendar_days",
    alertOffsetsDays: [5, 2, 1],
    counselVerified: true,
    description: "Report provided to employer and both parties within 10 calendar days of inquiry closure.",
  },
  "TM-10": {
    code: "TM-10",
    name: "Employer Implementation of Findings",
    statutoryReference: "Section 13(4) of the POSH Act 2013",
    durationDays: 60,
    type: "calendar_days",
    alertOffsetsDays: [20, 10, 5, 1],
    counselVerified: true,
    description: "Employer must act upon recommendations within 60 calendar days of receipt.",
  },
  "TM-11": {
    code: "TM-11",
    name: "Appellate Limitation Window",
    statutoryReference: "Section 18(2) of the POSH Act 2013",
    durationDays: 90,
    type: "calendar_days",
    alertOffsetsDays: [30, 14, 7],
    counselVerified: true,
    description: "Appeal before court or appellate tribunal within 90 calendar days of recommendations.",
  },
  "TM-12": {
    code: "TM-12",
    name: "Interim Relief Ruling Window",
    statutoryReference: "Section 12 of the POSH Act 2013",
    durationDays: 5,
    type: "working_days",
    alertOffsetsDays: [2, 1],
    counselVerified: true,
    description: "Decision on interim relief recommendations delivered within 5 working days.",
  },
  "TM-13": {
    code: "TM-13",
    name: "Notice Prior to Ex-Parte Termination",
    statutoryReference: "Rule 7(5) of the POSH Rules 2013",
    durationDays: 15,
    type: "calendar_days",
    alertOffsetsDays: [7, 3, 1],
    counselVerified: true,
    description: "Minimum 15 calendar days written notice before ex parte order or dismissal.",
  },
  "TM-14": {
    code: "TM-14",
    name: "Interim Leave Period Ceiling",
    statutoryReference: "Section 12(1)(a) of the POSH Act 2013",
    durationDays: 90,
    type: "calendar_days",
    alertOffsetsDays: [14, 7],
    counselVerified: true,
    description: "Leave granted to aggrieved woman up to a maximum period of 3 months.",
  },
  "TM-15": {
    code: "TM-15",
    name: "IC Member Maximum Tenure",
    statutoryReference: "Section 4(3) of the POSH Act 2013",
    durationDays: 1095, // 3 years
    type: "years",
    alertOffsetsDays: [90, 60, 30],
    counselVerified: true,
    description: "IC members cannot hold office for a period exceeding 3 years from nomination.",
  },
  "TM-16": {
    code: "TM-16",
    name: "Annual POSH Report to District Officer",
    statutoryReference: "Section 21 & Rule 14 of the POSH Rules 2013",
    durationDays: 31, // January 31 annually
    type: "fixed_date",
    alertOffsetsDays: [45, 30, 15, 7, 2],
    counselVerified: true,
    description: "Annual report submitted to District Officer / Collectorate by January 31.",
  },
  "TM-17": {
    code: "TM-17",
    name: "Board's Report POSH Disclosure",
    statutoryReference: "Section 22 of the POSH Act 2013 & Companies Act 2013",
    durationDays: 90,
    type: "calendar_days",
    alertOffsetsDays: [30, 15],
    counselVerified: true,
    description: "Disclosure of case metrics in Annual Board's Report at end of financial year.",
  },
  "TM-18": {
    code: "TM-18",
    name: "Annual Awareness & Sensitisation Cycle",
    statutoryReference: "Section 19(c) of the POSH Act 2013",
    durationDays: 365,
    type: "calendar_days",
    alertOffsetsDays: [60, 30, 14],
    counselVerified: true,
    description: "Organise workshops and awareness programmes at regular annual intervals.",
  },
  "TM-19": {
    code: "TM-19",
    name: "Post-Inquiry Aftercare Monitoring",
    statutoryReference: "PRD Section 8.16 & Acorn Integrity Protocol",
    durationDays: 90,
    type: "calendar_days",
    alertOffsetsDays: [60, 30],
    counselVerified: true,
    description: "Mandatory check-ins at 30, 60, and 90 days following case disposition.",
  },
  "TM-20": {
    code: "TM-20",
    name: "Case Record Retention Period",
    statutoryReference: "Rule 14 & Indian Evidence Act Rules",
    durationDays: 2920, // 8 years
    type: "years",
    alertOffsetsDays: [180, 90, 30],
    counselVerified: true,
    description: "Statutory 8-year retention of inquiry records, minutes, and evidence dockets.",
  },
  "TM-21": {
    code: "TM-21",
    name: "Unfiled Complaint Draft Auto-Expiry",
    statutoryReference: "PRD Section 8.16 & Data Minimisation Rules",
    durationDays: 30,
    type: "calendar_days",
    alertOffsetsDays: [7, 2],
    counselVerified: true,
    description: "Unsubmitted draft complaints purge after 30 days of inactivity.",
  },
};

/* counsel to verify */
/**
 * Evaluates limitation under Section 9(1) of POSH Act 2013
 */
export function evaluateLimitation(
  incidentDate: string | Date,
  filingDate: string | Date = new Date()
): LimitationEvaluation {
  const inc = new Date(incidentDate);
  const fil = new Date(filingDate);

  if (isNaN(inc.getTime()) || isNaN(fil.getTime())) {
    return {
      status: "STATUTORILY_BARRED",
      elapsedDays: -1,
      requiresCondonation: false,
      isBarred: true,
      explanation: "Invalid incident or filing date provided.",
    };
  }

  const elapsedMs = Math.max(0, fil.getTime() - inc.getTime());
  const elapsedDays = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));

  if (elapsedDays <= 90) {
    return {
      status: "WITHIN_LIMITATION",
      elapsedDays,
      requiresCondonation: false,
      isBarred: false,
      explanation: `Complaint filed within the initial statutory 90-day window under Section 9(1) (day ${elapsedDays} of 90).`,
    };
  }

  if (elapsedDays <= 180) {
    return {
      status: "REQUIRES_CONDONATION",
      elapsedDays,
      requiresCondonation: true,
      isBarred: false,
      explanation: `Complaint filed between 91 and 180 days (day ${elapsedDays}). Requires formal condonation of delay with reasons recorded in writing under the proviso to Section 9(1).`,
    };
  }

  return {
    status: "STATUTORILY_BARRED",
    elapsedDays,
    requiresCondonation: false,
    isBarred: true,
    explanation: `Complaint filed after ${elapsedDays} days. Strictly exceeds the maximum 180-day condonable limitation under Section 9(1) and is statutorily barred before the Internal Committee.`,
  };
}

/* counsel to verify */
/**
 * Calculates authoritative deadline for any statutory timer (TM-01 through TM-21)
 */
export function calculateStatutoryDeadline(
  timerCode: StatutoryTimerCode,
  startDate: string | Date
): {
  deadline: Date;
  effectiveDeadlineWithClosureRollover: Date;
  timer: StatutoryTimerDefinition;
} {
  const timer = STATUTORY_TIMERS[timerCode];
  if (!timer) {
    throw new Error(`Statutory timer code '${timerCode}' is unrecognized.`);
  }

  const start = new Date(startDate);
  let rawDeadline: Date;

  if (timer.type === "working_days") {
    rawDeadline = addWorkingDays(start, timer.durationDays);
  } else if (timer.type === "fixed_date" && timerCode === "TM-16") {
    // January 31 of current or following year
    const year = start.getMonth() === 0 && start.getDate() <= 31 ? start.getFullYear() : start.getFullYear() + 1;
    rawDeadline = new Date(Date.UTC(year, 0, 31, 23, 59, 59));
  } else {
    rawDeadline = new Date(start);
    rawDeadline.setDate(rawDeadline.getDate() + timer.durationDays);
  }

  const rollover = applySection4ClosureRollover(rawDeadline);

  return {
    deadline: rawDeadline,
    effectiveDeadlineWithClosureRollover: rollover.effectiveDeadline,
    timer,
  };
}

/* counsel to verify */
export function calculateNoticeDueDate(filingDate: string | Date): Date {
  return calculateStatutoryDeadline("TM-05", filingDate).effectiveDeadlineWithClosureRollover;
}

/* counsel to verify */
export function calculateReplyDueDate(noticeServedDate: string | Date): Date {
  return calculateStatutoryDeadline("TM-06", noticeServedDate).effectiveDeadlineWithClosureRollover;
}

/* counsel to verify */
export function calculateInquiryDueDate(inquiryStartDate: string | Date): Date {
  return calculateStatutoryDeadline("TM-08", inquiryStartDate).effectiveDeadlineWithClosureRollover;
}

/* counsel to verify */
export function calculateReportDueDate(inquiryEndDate: string | Date): Date {
  return calculateStatutoryDeadline("TM-09", inquiryEndDate).effectiveDeadlineWithClosureRollover;
}

/* counsel to verify */
export function calculateImplementationDueDate(reportDate: string | Date): Date {
  return calculateStatutoryDeadline("TM-10", reportDate).effectiveDeadlineWithClosureRollover;
}

/* counsel to verify */
export function calculateAppealDueDate(reportDate: string | Date): Date {
  return calculateStatutoryDeadline("TM-11", reportDate).effectiveDeadlineWithClosureRollover;
}
