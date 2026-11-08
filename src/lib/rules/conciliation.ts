/* counsel to verify */
/**
 * Conciliation Statutory Guardrails under POSH Act Section 10
 * 
 * Statutory References:
 * - Section 10(1): At the request of the aggrieved woman, IC may take steps to settle the matter through conciliation.
 * - Section 10(1) Proviso: "Provided that no monetary settlement shall be made as a basis of conciliation."
 * - Section 10(2): Where settlement has been arrived at, IC shall record the settlement and forward it to employer.
 * - Section 10(3): Copies of settlement provided to aggrieved woman and respondent.
 * - Section 10(4): Where settlement has been arrived at, no further inquiry shall be conducted (unless term is breached).
 */

export const MONETARY_PATTERN =
  /(?:₹|rs\.?|rupees?|inr|cash|damages|compensation|payment\s+of|monetary|financial|lakh|paise|crore|penalty|severance|reimbursement|remuneration|bribe|bonus|cheque|demand\s+draft)/i;

export interface ConciliationValidationResult {
  isValid: boolean;
  prohibited: boolean;
  reason?: string;
}

/* counsel to verify */
/**
 * Validates conciliation terms to enforce strict Section 10(1) monetary ban
 */
export function validateConciliationTerms(terms: string): ConciliationValidationResult {
  if (!terms || terms.trim().length === 0) {
    return {
      isValid: false,
      prohibited: false,
      reason: "Conciliation terms cannot be empty.",
    };
  }

  if (MONETARY_PATTERN.test(terms)) {
    return {
      isValid: false,
      prohibited: true,
      reason:
        "Section 10(1) strictly prohibits monetary settlements in conciliation. Conciliation terms cannot involve financial compensation, cash payments, or monetary consideration.",
    };
  }

  return {
    isValid: true,
    prohibited: false,
    reason: "Conciliation terms conform to Section 10 non-monetary requirements.",
  };
}
