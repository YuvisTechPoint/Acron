/* counsel to verify */
/**
 * Authoritative Internal Committee Quorum Validation
 * Statutory References:
 * - POSH Act 2013 Section 4: IC constitution (Presiding Officer + >= 2 employee members + 1 external member, >= 50% women).
 * - POSH Rules 2013 Rule 7: Quorum for inquiry proceedings requires at least 3 members, including the Presiding Officer.
 */

export interface QuorumInput {
  totalPresent: number;
  poPresent: boolean;
  womenPresent: number;
  externalMemberPresent?: boolean;
}

export interface QuorumResult {
  isValid: boolean;
  violations: string[];
  reason?: string;
}

/* counsel to verify */
/**
 * Validates IC inquiry proceeding quorum per Rule 7 and Section 4
 */
export function validateQuorum(input: QuorumInput): QuorumResult {
  const violations: string[] = [];

  // 1. Minimum 3 members requirement
  if (input.totalPresent < 3) {
    violations.push(
      `Quorum failed: Rule 7 requires at least 3 IC members present (only ${input.totalPresent} present).`
    );
  }

  // 2. Presiding Officer mandatory presence
  if (!input.poPresent) {
    violations.push(
      "Quorum failed: Rule 7 mandates the presence of the Presiding Officer during inquiry proceedings."
    );
  }

  // 3. Women representation (at least 50% of members present)
  const requiredWomen = Math.ceil(input.totalPresent / 2);
  if (input.womenPresent < requiredWomen) {
    violations.push(
      `Quorum failed: Section 4(2) mandates that at least 50% of present members be women (present: ${input.womenPresent}/${input.totalPresent}, required: ${requiredWomen}).`
    );
  }

  const isValid = violations.length === 0;

  return {
    isValid,
    violations,
    reason: isValid
      ? "Statutory quorum satisfied under POSH Act Section 4 and Rule 7."
      : violations.join(" "),
  };
}
