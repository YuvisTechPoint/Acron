/* counsel to verify */
/**
 * Authoritative Statutory Timelines under POSH Act 2013 & Rules 2013
 * 
 * Statutory References:
 * - Section 9(1): Filing limitation period of 3 months (90 days).
 * - Section 9(1) Proviso: Condonation of delay up to another 3 months (total 180 days) for reasons in writing.
 * - Beyond 180 days: Statutorily barred (no statutory jurisdiction without High Court condonation).
 * - Rule 7(2): Furnish copy of complaint to respondent within 7 working days.
 * - Rule 7(3): Respondent to file written reply within 10 working days.
 * - Section 11(4): Inquiry completion window within 90 days.
 * - Section 13(1): Submission of inquiry report within 10 days of conclusion.
 * - Section 13(4): Implementation of IC recommendations by employer within 60 days.
 * - Section 18(2): Appeal before Appellate Authority within 90 days of report.
 */

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

/* counsel to verify */
/**
 * Evaluates whether a complaint falls within statutory limitation under Section 9(1)
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
 * Calculates due date for furnishing complaint copy to respondent (Rule 7(2): 7 working days)
 */
export function calculateNoticeDueDate(filingDate: string | Date): Date {
  const date = new Date(filingDate);
  let daysAdded = 0;
  while (daysAdded < 7) {
    date.setDate(date.getDate() + 1);
    const dayOfWeek = date.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      daysAdded++;
    }
  }
  return date;
}

/* counsel to verify */
/**
 * Calculates due date for respondent reply (Rule 7(3): 10 working days)
 */
export function calculateReplyDueDate(noticeServedDate: string | Date): Date {
  const date = new Date(noticeServedDate);
  let daysAdded = 0;
  while (daysAdded < 10) {
    date.setDate(date.getDate() + 1);
    const dayOfWeek = date.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      daysAdded++;
    }
  }
  return date;
}

/* counsel to verify */
/**
 * Calculates due date for formal inquiry completion (Section 11(4): 90 calendar days)
 */
export function calculateInquiryDueDate(inquiryStartDate: string | Date): Date {
  const date = new Date(inquiryStartDate);
  date.setDate(date.getDate() + 90);
  return date;
}

/* counsel to verify */
/**
 * Calculates due date for inquiry report submission (Section 13(1): 10 calendar days)
 */
export function calculateReportDueDate(inquiryEndDate: string | Date): Date {
  const date = new Date(inquiryEndDate);
  date.setDate(date.getDate() + 10);
  return date;
}

/* counsel to verify */
/**
 * Calculates due date for employer implementation of IC findings (Section 13(4): 60 calendar days)
 */
export function calculateImplementationDueDate(reportDate: string | Date): Date {
  const date = new Date(reportDate);
  date.setDate(date.getDate() + 60);
  return date;
}

/* counsel to verify */
/**
 * Calculates appeal limitation window (Section 18: 90 calendar days)
 */
export function calculateAppealDueDate(reportDate: string | Date): Date {
  const date = new Date(reportDate);
  date.setDate(date.getDate() + 90);
  return date;
}
