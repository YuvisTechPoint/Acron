/* counsel to verify */
/**
 * Server-side Authoritative Case Access Control (canAccessCase)
 * 
 * Statutory References & Constitution Rules:
 * - Cross-tenant access is strictly forbidden (every record carries orgId).
 * - Section 16 POSH Act: Strict confidentiality.
 * - Server-side enforcement (hiding UI buttons is NOT security).
 */

export interface AccessUser {
  id: string;
  roles: string[];
  orgId?: string;
}

export interface CaseAccessTarget {
  id: string;
  orgId: string;
  complainantId?: string;
  complainantCode?: string;
  respondentId?: string;
  respondentCode?: string;
  presidingOfficerId?: string;
  icMemberIds?: string[];
}

/* counsel to verify */
/**
 * Authoritative server-side case access decision function
 */
export function canAccessCase(
  user: AccessUser,
  caseData: CaseAccessTarget
): boolean {
  if (!user || !caseData) {
    return false;
  }

  const roles = user.roles || [];

  // 1. Super Admin access
  if (roles.includes("super_admin")) {
    return true;
  }

  // 2. Strict Tenant Isolation - User's org must match case org
  if (user.orgId && user.orgId !== caseData.orgId) {
    return false;
  }

  // 3. Complainant role - Can only access own docket
  if (roles.includes("complainant")) {
    return (
      (Boolean(caseData.complainantId) && user.id === caseData.complainantId) ||
      (Boolean(caseData.complainantCode) && user.id === caseData.complainantCode)
    );
  }

  // 4. Respondent role - Can only access own docket
  if (roles.includes("respondent")) {
    return (
      (Boolean(caseData.respondentId) && user.id === caseData.respondentId) ||
      (Boolean(caseData.respondentCode) && user.id === caseData.respondentCode)
    );
  }

  // 5. IC Presiding Officer & IC Members within the organization
  const isICMember =
    roles.includes("ic_presiding_officer") ||
    roles.includes("ic_member") ||
    roles.includes("ic_external_member") ||
    roles.includes("legal_consultant") ||
    roles.includes("posh_admin");

  if (isICMember) {
    if (user.orgId && caseData.orgId && user.orgId === caseData.orgId) {
      return true;
    }
  }

  // 6. Organization Admin - Allowed metadata view if matching org
  if (roles.includes("org_admin")) {
    return Boolean(user.orgId && caseData.orgId && user.orgId === caseData.orgId);
  }

  return false;
}
