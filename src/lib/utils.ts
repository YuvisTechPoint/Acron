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

