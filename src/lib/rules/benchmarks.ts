/* counsel to verify */
/**
 * Statutory Compliance Benchmarks & Health Evaluation
 * POSH Act 2013 & West Bengal Rules
 */

export interface OrganizationHealthData {
  headcount: number;
  icMembersCount: number;
  womenMembersCount: number;
  externalMemberPresent: boolean;
  policyAcknowledgedRatio: number; // 0.0 - 1.0
  annualReportFiled: boolean;
  activeCasesPendingOver90Days: number;
}

export interface OrganizationHealthEvaluation {
  score: number; // 0 - 100
  status: "compliant" | "warning" | "non_compliant";
  defects: string[];
  recommendations: string[];
}

/* counsel to verify */
/**
 * Evaluates organization POSH statutory compliance health
 */
export function evaluateOrganizationHealth(
  data: OrganizationHealthData
): OrganizationHealthEvaluation {
  const defects: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // 1. Mandatory IC Constitution check (Section 4) if headcount >= 10
  if (data.headcount >= 10) {
    if (data.icMembersCount < 4) {
      score -= 30;
      defects.push(`IC has only ${data.icMembersCount} members. Section 4(2) mandates a minimum of 4 members.`);
    }

    const requiredWomen = Math.ceil(data.icMembersCount / 2);
    if (data.womenMembersCount < requiredWomen) {
      score -= 25;
      defects.push(`IC has only ${data.womenMembersCount} women members. Section 4(2)(c) mandates at least 50% women.`);
    }

    if (!data.externalMemberPresent) {
      score -= 25;
      defects.push("IC lacks an independent External Member from an NGO or legal association committed to women's rights.");
    }
  }

  // 2. Annual Report filing (Section 21 & 22)
  if (!data.annualReportFiled) {
    score -= 15;
    defects.push("Section 21/22 Annual Report for prior calendar year not yet filed with the District Officer.");
    recommendations.push("Prepare and file Section 21 return before statutory January 31 deadline.");
  }

  // 3. Inquiry Delay Red Flags (Section 11(4))
  if (data.activeCasesPendingOver90Days > 0) {
    score -= 20;
    defects.push(`${data.activeCasesPendingOver90Days} inquiry docket(s) pending beyond statutory 90-day limitation.`);
    recommendations.push("Convene extraordinary IC sitting to conclude pending inquiries or seek extension.");
  }

  // 4. Awareness & Policy Acknowledgement (Section 19)
  if (data.policyAcknowledgedRatio < 0.8) {
    score -= 10;
    recommendations.push(`Employee policy acknowledgement at ${Math.round(data.policyAcknowledgedRatio * 100)}%. Target 95%+ coverage.`);
  }

  const finalScore = Math.max(0, Math.min(100, score));
  let status: OrganizationHealthEvaluation["status"] = "compliant";
  if (finalScore < 60) {
    status = "non_compliant";
  } else if (finalScore < 85) {
    status = "warning";
  }

  return {
    score: finalScore,
    status,
    defects,
    recommendations,
  };
}
