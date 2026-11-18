/* counsel to verify */
/**
 * Authoritative Statutory Routing Engine (Rules RT-01 to RT-21)
 * Reference: Section 8.11 of the PRD
 *
 * Evaluates intake circumstances and returns authoritative jurisdiction,
 * statutory forum, procedural requirements, and plain-language explanation.
 */

export type RoutingForum =
  | "INTERNAL_COMMITTEE"
  | "LOCAL_COMMITTEE"
  | "RECONSTITUTED_IC"
  | "HR_ORGANISATIONAL_POLICY"
  | "POLICE_AND_IC_PARALLEL"
  | "POCSO_AND_IC_MANDATORY_DUAL";

export interface RoutingIntakeInput {
  orgEmployeeCount?: number;
  isRespondentEmployer?: boolean;
  isComplainantDomesticWorker?: boolean;
  isRespondentThirdParty?: boolean;
  isOffPremisesOrTransit?: boolean;
  isVirtualOrOnline?: boolean;
  isRespondentICMember?: boolean;
  isComplainantMinor?: boolean;
  hasAllegationsOfCriminalOffence?: boolean;
  isFilingByLegalHeir?: boolean;
  isAnonymous?: boolean;
  complainantGender?: "woman" | "man" | "non_binary" | "prefer_not_to_say" | string;
  isComplainantContractorOrIntern?: boolean;
  elapsedDaysSinceLastIncident?: number;
  isPublicSectorOrGovt?: boolean;
  isOrgOnboarded?: boolean;
  hasMultipleBranches?: boolean;
}

export interface RoutingOutcome {
  ruleCode: string;
  ruleTitle: string;
  statutoryReference: string;
  forum: RoutingForum;
  jurisdictionAccepted: boolean;
  requiresPoliceAssistance: boolean;
  requiresPocsoReporting: boolean;
  requiresCondonation: boolean;
  summary: string;
  detailedGuidance: string;
  plainLanguageDirections: string[];
}

/* counsel to verify */
export function evaluateRoutingRules(input: RoutingIntakeInput): RoutingOutcome {
  // RT-13: Minor Complainant (POCSO mandatory reporting)
  if (input.isComplainantMinor) {
    return {
      ruleCode: "RT-13",
      ruleTitle: "Aggrieved Person is Under 18 (POCSO Interplay)",
      statutoryReference: "Section 19 of the Protection of Children from Sexual Offences (POCSO) Act 2012",
      forum: "POCSO_AND_IC_MANDATORY_DUAL",
      jurisdictionAccepted: true,
      requiresPoliceAssistance: true,
      requiresPocsoReporting: true,
      requiresCondonation: false,
      summary: "Mandatory POCSO reporting to Special Juvenile Police Unit / Local Police within 24 hours.",
      detailedGuidance: "Section 19 of POCSO mandates reporting of any sexual offences against minors. The IC inquiry may proceed, but statutory criminal reporting is mandatory and non-derogable.",
      plainLanguageDirections: [
        "Immediate referral to the Special Juvenile Police Unit (SJPU) or Local Police under Section 19 of POCSO.",
        "Internal Committee maintains strict confidentiality of minor's identity.",
        "Support person or legal guardian presence is mandatory during all interactions."
      ],
    };
  }

  // RT-03: Complaint Against the Employer
  if (input.isRespondentEmployer) {
    return {
      ruleCode: "RT-03",
      ruleTitle: "Complaint Against Employer / Managing Director / Head",
      statutoryReference: "Section 6(1) of the POSH Act 2013",
      forum: "LOCAL_COMMITTEE",
      jurisdictionAccepted: false,
      requiresPoliceAssistance: false,
      requiresPocsoReporting: false,
      requiresCondonation: false,
      summary: "Statutory jurisdiction transfers to the Local Committee (LC) at the District Collectorate.",
      detailedGuidance: "Under Section 6(1), where the complaint is against the employer itself, the Internal Committee cannot inquire to avoid inherent bias. Jurisdiction vests exclusively in the Local Committee.",
      plainLanguageDirections: [
        "The Internal Committee cannot adjudicate complaints against the employer.",
        "Acorn Legal assists the complainant in lodging the complaint before the District Local Committee (LC).",
        "The employer cannot retaliate during the pendency of the LC inquiry."
      ],
    };
  }

  // RT-02: Small Establishment (< 10 employees)
  if (input.orgEmployeeCount !== undefined && input.orgEmployeeCount < 10) {
    return {
      ruleCode: "RT-02",
      ruleTitle: "Establishment with Fewer than 10 Employees",
      statutoryReference: "Section 6(1) of the POSH Act 2013",
      forum: "LOCAL_COMMITTEE",
      jurisdictionAccepted: false,
      requiresPoliceAssistance: false,
      requiresPocsoReporting: false,
      requiresCondonation: false,
      summary: "Inquiry lies before the District Local Committee.",
      detailedGuidance: "Establishments with fewer than 10 employees are not statutorily mandated to maintain an IC. Complaints are heard by the Local Committee constituted by the District Officer.",
      plainLanguageDirections: [
        "Complaint forwarded to the District Officer / Local Committee of the respective district.",
        "Platform provides statutory templates and evidence compilation assistance."
      ],
    };
  }

  // RT-12: Respondent is Presiding Officer or IC Member
  if (input.isRespondentICMember) {
    return {
      ruleCode: "RT-12",
      ruleTitle: "Respondent is IC Member or Presiding Officer",
      statutoryReference: "Section 4(5) of the POSH Act 2013 & Principles of Natural Justice",
      forum: "RECONSTITUTED_IC",
      jurisdictionAccepted: true,
      requiresPoliceAssistance: false,
      requiresPocsoReporting: false,
      requiresCondonation: false,
      summary: "Mandatory IC reconstitution with recusal of the respondent member.",
      detailedGuidance: "The implicated IC member is immediately recused from committee access and case records. An alternate presiding officer / member is nominated before inquiry commencement.",
      plainLanguageDirections: [
        "Respondent IC member is immediately recused and restricted from docket access.",
        "An ad-hoc independent Presiding Officer is appointed to conduct inquiry.",
        "Audit log records mandatory conflict declaration."
      ],
    };
  }

  // RT-09: Complainant is Not a Woman (Gender Neutrality Policy)
  if (input.complainantGender && !["woman", "female"].includes(input.complainantGender.toLowerCase())) {
    return {
      ruleCode: "RT-09",
      ruleTitle: "Complainant is Male or Non-Binary (Company Neutral Policy)",
      statutoryReference: "Section 2(a) POSH Act 2013 & Organisational Code of Conduct",
      forum: "HR_ORGANISATIONAL_POLICY",
      jurisdictionAccepted: false,
      requiresPoliceAssistance: false,
      requiresPocsoReporting: false,
      requiresCondonation: false,
      summary: "Inquiry handled under Organisational Equal Opportunity / Code of Conduct Policy.",
      detailedGuidance: "The statutory POSH Act 2013 is gender-specific for aggrieved women. Inquiries for male or non-binary complainants proceed under company HR disciplinary policy adhering to natural justice.",
      plainLanguageDirections: [
        "Inquiry proceeds under Organisational Harassment & Disciplinary Policy.",
        "The committee applies identical standards of fair hearing and confidentiality.",
        "Statutory POSH penalties are substituted by corporate disciplinary sanctions."
      ],
    };
  }

  // RT-14: Cognizable Criminal Offence
  if (input.hasAllegationsOfCriminalOffence) {
    return {
      ruleCode: "RT-14",
      ruleTitle: "Allegations Disclose Cognizable Criminal Offence",
      statutoryReference: "Section 19(g) of the POSH Act 2013 & Bharatiya Nyaya Sanhita (BNS)",
      forum: "POLICE_AND_IC_PARALLEL",
      jurisdictionAccepted: true,
      requiresPoliceAssistance: true,
      requiresPocsoReporting: false,
      requiresCondonation: false,
      summary: "Internal Committee inquiry proceeds in parallel with employer legal duty to assist with Police FIR.",
      detailedGuidance: "Under Section 19(g), the employer has a statutory duty to assist the woman if she chooses to lodge an FIR under penal law. The internal inquiry proceeds independently of police investigation.",
      plainLanguageDirections: [
        "Complainant is provided legal option and assistance to lodge a formal police FIR.",
        "The IC inquiry continues without awaiting police investigation conclusions.",
        "Evidence chain of custody is secured for potential judicial presentation."
      ],
    };
  }

  // RT-15: Limitation Evaluation (> 90 days)
  if (input.elapsedDaysSinceLastIncident && input.elapsedDaysSinceLastIncident > 90) {
    const isBarred = input.elapsedDaysSinceLastIncident > 180;
    return {
      ruleCode: "RT-15",
      ruleTitle: isBarred ? "Complaint Statutorily Barred by Limitation" : "Limitation Condonation Required",
      statutoryReference: "Section 9(1) Proviso of the POSH Act 2013",
      forum: "INTERNAL_COMMITTEE",
      jurisdictionAccepted: !isBarred,
      requiresPoliceAssistance: false,
      requiresPocsoReporting: false,
      requiresCondonation: !isBarred,
      summary: isBarred
        ? "Exceeds 180-day limitation ceiling; outside IC statutory jurisdiction."
        : "Filing between 91-180 days requires formal recording of reasons for delay condonation.",
      detailedGuidance: isBarred
        ? "Under Section 9(1), the IC has no legal authority to condone delays exceeding an additional 3 months (total 180 days). Only the High Court via writ petition can grant relief."
        : "The IC must pass a preliminary written order recording sufficient cause that prevented filing within the initial 90 days.",
      plainLanguageDirections: isBarred
        ? ["Complaint cannot be registered by IC due to statutory expiry under Section 9(1).", "Complainant advised regarding civil/criminal remedies."]
        : ["Complainant must submit a written condonation request explaining the delay.", "IC will convene preliminary hearing to record condonation decision."],
    };
  }

  // RT-05: Respondent is Third Party (Vendor, Client, Contractor)
  if (input.isRespondentThirdParty) {
    return {
      ruleCode: "RT-05",
      ruleTitle: "Respondent is a Third Party / Vendor / Visitor",
      statutoryReference: "Section 11(1) Proviso & Section 19(h) of the POSH Act 2013",
      forum: "INTERNAL_COMMITTEE",
      jurisdictionAccepted: true,
      requiresPoliceAssistance: false,
      requiresPocsoReporting: false,
      requiresCondonation: false,
      summary: "IC has jurisdiction; employer collaborates with third party's employer or local police.",
      detailedGuidance: "The aggrieved woman is protected at the workplace regardless of respondent employment status. Findings are transmitted to the respondent's employer for disciplinary action.",
      plainLanguageDirections: [
        "IC conducts full inquiry regarding the incident at the workplace.",
        "Formal notice transmitted to third party's corporate management.",
        "Vendor site ban / contract termination evaluated under interim relief."
      ],
    };
  }

  // RT-01: Standard Statutory IC Jurisdiction
  return {
    ruleCode: "RT-01",
    ruleTitle: "Standard Workplace IC Jurisdiction",
    statutoryReference: "Section 4(1) & Section 9(1) of the POSH Act 2013",
    forum: "INTERNAL_COMMITTEE",
    jurisdictionAccepted: true,
    requiresPoliceAssistance: false,
    requiresPocsoReporting: false,
    requiresCondonation: false,
    summary: "Inquiry conducted by the Internal Committee of the establishment.",
    detailedGuidance: "Establishment has 10 or more employees, respondent is employed therein, and complaint is within the statutory 90-day limitation.",
    plainLanguageDirections: [
      "Inquiry docket assigned to the Internal Committee.",
      "Notice dispatched to respondent within 7 working days.",
      "Conciliation option available prior to formal inquiry hearings."
    ],
  };
}
