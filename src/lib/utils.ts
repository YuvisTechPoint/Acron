import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(paise: number): string {
  const rupees = paise / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return "N/A";
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString: string | undefined): string {
  if (!dateString) return "N/A";
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(d);
  } catch {
    return dateString;
  }
}

// Statutory Counter / Reference Generators per PRD 24.2
export function generateServiceRequestRef(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `ACN-SR-${year}-${rand}`;
}

export function generateQARef(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `ACN-QA-${year}-${rand}`;
}

export function generateCaseNumber(orgCode: string = "CORP"): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `POSH-${orgCode.toUpperCase()}-${year}-${rand}`;
}

export function generateConcernRef(orgCode: string = "CORP"): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `CR-${orgCode.toUpperCase()}-${year}-${rand}`;
}

export function generateReceiptNumber(): string {
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `ACN/RC/2026-27/${rand}`;
}

export function generateReferenceNumber(prefix: string = "SR"): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `ACN-${prefix.toUpperCase()}-${year}-${rand}`;
}

export function generateInvoiceNumber(): string {
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `ACN/INV/2026-27/${rand}`;
}

// Calculate days remaining and urgency
export function calculateDaysRemaining(targetDateStr: string): {
  days: number;
  isOverdue: boolean;
  isUrgent: boolean;
  label: string;
} {
  const target = new Date(targetDateStr);
  const now = new Date();
  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      days: Math.abs(diffDays),
      isOverdue: true,
      isUrgent: true,
      label: `${Math.abs(diffDays)} days overdue`,
    };
  }

  return {
    days: diffDays,
    isOverdue: false,
    isUrgent: diffDays <= 7,
    label: diffDays === 0 ? "Due today" : `${diffDays} days remaining`,
  };
}

/**
 * Small-cell suppression helper implementing PRD CONF-002, BR-047, and Section 8.6.3:
 * "No report, chart or export shall show a number for a group smaller than the suppression threshold (default 5); small cells are shown as 'fewer than 5'."
 */
export function formatSuppressedCount(
  count: number,
  threshold: number = 5,
  options?: { isPrivileged?: boolean }
): string {
  if (options?.isPrivileged) {
    return String(count);
  }
  if (count > 0 && count < threshold) {
    return "< 5";
  }
  return String(count);
}

export function isCellSuppressed(count: number, threshold: number = 5): boolean {
  return count > 0 && count < threshold;
}

/**
 * POSH Section 9(1) Limitation & Condonation Evaluator:
 * Statutory limit: 3 months (approx 90 days) from incident date.
 * Section 9(1) Proviso: Condonation permitted for reasons recorded in writing,
 * NOT EXCEEDING 3 additional months (total 6 months / 180 days).
 * Beyond 6 months: Strictly TIME-BARRED under statute. IC has no power to condone delay.
 */
export function evaluateLimitationStatus(
  incidentDateStr?: string,
  filingDateStr?: string
): {
  daysElapsed: number;
  monthsElapsed: number;
  status: "WITHIN_LIMITATION" | "REQUIRES_CONDONATION" | "STATUTORILY_BARRED";
  canCondone: boolean;
  message: string;
} {
  if (!incidentDateStr) {
    return {
      daysElapsed: 0,
      monthsElapsed: 0,
      status: "WITHIN_LIMITATION",
      canCondone: true,
      message: "Incident date not specified; assuming timely filing.",
    };
  }

  const incidentDate = new Date(incidentDateStr);
  const filingDate = filingDateStr ? new Date(filingDateStr) : new Date();
  const diffTime = Math.max(0, filingDate.getTime() - incidentDate.getTime());
  const daysElapsed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const monthsElapsed = Math.round((daysElapsed / 30.4375) * 10) / 10;

  if (daysElapsed <= 90) {
    return {
      daysElapsed,
      monthsElapsed,
      status: "WITHIN_LIMITATION",
      canCondone: true,
      message: `Filed within 3 months (${daysElapsed} days). Satisfies Section 9(1) limitation.`,
    };
  }

  if (daysElapsed <= 180) {
    return {
      daysElapsed,
      monthsElapsed,
      status: "REQUIRES_CONDONATION",
      canCondone: true,
      message: `Filed after 3 months but within 6 months (${daysElapsed} days). Requires written condonation of delay under Proviso to Section 9(1).`,
    };
  }

  return {
    daysElapsed,
    monthsElapsed,
    status: "STATUTORILY_BARRED",
    canCondone: false,
    message: `Filed ${daysElapsed} days (${monthsElapsed} months) after incident. Exceeds the 3 additional months permitted by the Proviso to Section 9(1). Statutorily barred from IC inquiry; must be dismissed or referred to Local Committee / Police.`,
  };
}

/**
 * POSH Section 10(1) Proviso Conciliation Terms Validator:
 * "Provided that no monetary settlement shall be made as a basis of conciliation."
 */
export function validateConciliationTerms(terms: string): {
  isValid: boolean;
  violations: string[];
  errorMessage?: string;
} {
  if (!terms || !terms.trim()) {
    return { isValid: false, violations: ["Terms cannot be empty"], errorMessage: "Conciliation terms are required." };
  }

  const monetaryPatterns = [
    { regex: /₹\s*[\d,]+/i, label: "Rupee currency symbol (₹) amount" },
    { regex: /\b(?:rs\.?|inr|rupees?|paise)\s*[\d,]+/i, label: "Currency reference with numeric amount" },
    { regex: /[\d,]+\s*(?:rs\.?|inr|rupees?|paise|lakhs?|crores?)/i, label: "Numeric amount followed by currency" },
    { regex: /\b(?:cash\s+settlement|monetary\s+compensation|financial\s+damages|cash\s+payment|monetary\s+payment)\b/i, label: "Direct monetary compensation phrase" },
  ];

  const violations: string[] = [];
  for (const p of monetaryPatterns) {
    if (p.regex.test(terms)) {
      violations.push(p.label);
    }
  }

  if (violations.length > 0) {
    return {
      isValid: false,
      violations,
      errorMessage: `Statutory Violation (Section 10(1) Proviso): Conciliation terms contain monetary provisions (${violations.join(", ")}). The POSH Act strictly prohibits any monetary settlement at the conciliation stage. Compensation can only be assessed under Section 15 upon formal finding of harassment.`,
    };
  }

  return { isValid: true, violations: [] };
}

/**
 * POSH Section 4 Quorum Validator:
 * - Minimum 3 members present
 * - Presiding Officer must be present
 * - At least 50% women
 */
export function validateICQuorum(attendees: {
  total: number;
  poPresent: boolean;
  womenCount: number;
}): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (attendees.total < 3) {
    errors.push(`Quorum deficient: At least 3 members must be present (currently ${attendees.total}).`);
  }
  if (!attendees.poPresent) {
    errors.push("Presiding Officer must be present to convene hearing.");
  }
  const minWomen = Math.ceil(attendees.total / 2);
  if (attendees.womenCount < minWomen) {
    errors.push(`Women representation deficient: At least 50% (${minWomen} of ${attendees.total}) must be women (currently ${attendees.womenCount}).`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}


