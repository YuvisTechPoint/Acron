import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { platformStore } from "@/lib/store";
import { POSHCase } from "@/lib/types";
import { canAccessCase } from "@/lib/rules/access";

export const dynamic = "force-dynamic";

// POST /api/cases - Submit POSH complaint intake
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const description = body.incidentDescription || body.summary || body.detailedStatement;

    if (!body.orgId || !description) {
      return NextResponse.json(
        { error: "Missing required fields: orgId, incidentDescription" },
        { status: 400 }
      );
    }

    const org = db.getOrganizations().find((o) => o.id === body.orgId || o.code === body.orgCode);
    const orgCode = org ? org.code : "GENERIC";
    const year = new Date().getFullYear();
    const caseNumber = `POSH-${orgCode}-${year}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCase: POSHCase = {
      id: `CASE-${Date.now()}`,
      caseNumber,
      orgId: org ? org.id : body.orgId,
      orgName: org ? org.name : (body.orgName || "Corporate Client"),
      complainantCode: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
      respondentCode: `RSP-${Math.floor(1000 + Math.random() * 9000)}`,
      state: "SUBMITTED",
      priority: body.priority || "NORMAL",
      filedAt: new Date().toISOString(),
      daysRemaining90: 90,
      allegations: [description],
      summary: description,
      detailedStatement: description,
      evidence: [],
      hearings: [],
      interimReliefs: [],
      presidingOfficerName: org?.presidingOfficerName || org?.icPresidingOfficer || "Presiding Officer",
      externalMemberName: org?.externalMemberName || org?.icExternalMember || "Adv. Debjani Sen (Acorn Legal)"
    };

    const saved = db.insertCase(newCase);
    platformStore.addCase(newCase);
    db.insertAuditLog(
      "POSH_INTAKE_SUBMITTED",
      newCase.complainantCode || "Anonymous",
      `New confidential inquiry docket ${caseNumber} initiated in database.`,
      newCase.orgId
    );

    return NextResponse.json({
      success: true,
      caseNumber,
      id: saved.id,
      trackingId: caseNumber,
      status: "SUBMITTED",
      message: "POSH statutory docket successfully registered in persistent database.",
      statutoryNotice: "Under Section 16 of the POSH Act 2013, the identity of the aggrieved woman and respondents is confidential.",
      nextSteps: [
        "Internal Committee will convene within 7 working days.",
        "Formal notice of inquiry and copy of complaint will be dispatched to respondent.",
        "Conciliation option under Section 10 is available prior to inquiry initiation."
      ]
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal processing error during case filing", details: error.message },
      { status: 500 }
    );
  }
}

// GET /api/cases - List POSH cases with Section 16 Confidentiality & canAccessCase guard
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orgId = searchParams.get("orgId") || undefined;
    const requestedCaseId = searchParams.get("id");

    const callerRole = req.headers.get("x-user-role") as any || "super_admin";
    const callerOrgId = req.headers.get("x-user-org") || orgId || "SYSTEM";
    const callerId = req.headers.get("x-user-id") || "usr-current";

    const userContext = {
      id: callerId,
      name: "Authorized Reviewer",
      email: "authorized@acornlegal.in",
      roles: [callerRole],
      orgId: callerOrgId,
      status: "active" as const,
      mfaEnabled: true,
      locale: "en" as const,
      createdAt: new Date().toISOString(),
    };

    if (requestedCaseId) {
      const caseRecord = db.getCaseById(requestedCaseId);
      if (!caseRecord) {
        return NextResponse.json({ error: "Case docket not found" }, { status: 404 });
      }

      const hasAccess = canAccessCase(userContext, caseRecord);
      if (!hasAccess) {
        db.insertAuditLog("UNAUTHORIZED_CASE_ACCESS_BLOCKED", callerId, "Access denied by Section 16 boundary guard", caseRecord.orgId);
        return NextResponse.json({ error: "Access denied by Section 16 statutory guard" }, { status: 403 });
      }

      const maskNarrative = !userContext.roles.includes("super_admin") && !userContext.roles.includes("ic_presiding_officer");

      return NextResponse.json({
        success: true,
        case: {
          ...caseRecord,
          complainantName: maskNarrative ? "[CONFIDENTIAL SEC 16]" : caseRecord.complainantName,
          respondentName: maskNarrative ? "[MASKED RESPONDENT]" : caseRecord.respondentName,
          complainantPhone: "[RESTRICTED]",
          complainantEmail: "[RESTRICTED]",
        }
      });
    }

    const cases = db.getCases(orgId);

    const safeCases = cases.map((c) => {
      const hasAccess = canAccessCase(userContext, c);
      return {
        id: c.id,
        caseNumber: c.caseNumber,
        orgId: c.orgId,
        orgName: c.orgName,
        state: c.state,
        priority: c.priority,
        filedAt: c.filedAt,
        daysRemaining90: c.daysRemaining90 || 90,
        inquiryDeadline: c.inquiryDeadline,
        limitationStatus: c.limitationStatus,
        allegationsCount: c.allegations ? c.allegations.length : (c.summary ? 1 : 0),
        evidenceCount: c.evidence ? c.evidence.length : 0,
        hearingsCount: c.hearings ? c.hearings.length : 0,
        complainantCode: c.complainantCode || "CMP-PROTECTED",
        respondentCode: c.respondentCode || "RSP-PROTECTED",
        canAccessFull: hasAccess,
      };
    });

    return NextResponse.json({
      success: true,
      count: safeCases.length,
      data: safeCases,
      cases: safeCases,
      database: "connected",
      confidentialityNotice: "Identifiers masked per Section 16 of the POSH Act 2013."
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to retrieve case listings", details: error.message },
      { status: 500 }
    );
  }
}
