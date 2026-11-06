import { NextRequest, NextResponse } from "next/server";
import { platformStore } from "@/lib/store";
import { POSHCase } from "@/lib/types";

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

    const org = platformStore.getOrganizations().find((o) => o.id === body.orgId || o.code === body.orgCode);
    const orgCode = org ? org.code : "GENERIC";
    const year = new Date().getFullYear();
    const caseNumber = `POSH-${orgCode}-${year}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCase: POSHCase = {
      id: `CASE-${Date.now()}`,
      caseNumber,
      orgId: org ? org.id : body.orgId,
      complainantCode: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
      respondentCode: `RSP-${Math.floor(1000 + Math.random() * 9000)}`,
      state: "SUBMITTED",
      priority: body.priority || "NORMAL",
      filedAt: new Date().toISOString(),
      daysRemaining90: 90,
      allegations: [body.incidentDescription],
      evidence: [],
      hearings: [],
      interimReliefs: [],
      presidingOfficerName: org?.presidingOfficerName || org?.icPresidingOfficer || "Presiding Officer",
      externalMemberName: org?.externalMemberName || org?.icExternalMember || "Adv. Debjani Sen (Acorn Legal)"
    };

    platformStore.addCase(newCase);
    platformStore.addAuditLog(
      "POSH_INTAKE_SUBMITTED",
      newCase.complainantCode || "Anonymous",
      `New confidential inquiry docket ${caseNumber} initiated.`
    );

    return NextResponse.json({
      success: true,
      caseNumber,
      state: newCase.state,
      message: "Confidential POSH complaint intake received and registered into the statutory inquiry docket.",
      case: {
        caseNumber,
        state: newCase.state,
        filedAt: newCase.filedAt,
        daysRemaining90: newCase.daysRemaining90
      }
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// GET /api/cases - List cases (Section 16 masked)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orgId = searchParams.get("orgId");

    let cases = platformStore.getCases();
    if (orgId) {
      cases = cases.filter((c) => c.orgId === orgId);
    }

    // Ensure Section 16 compliance by returning masked metadata
    const maskedCases = cases.map((c) => ({
      id: c.id,
      caseNumber: c.caseNumber,
      orgId: c.orgId,
      complainantCode: c.complainantCode,
      respondentCode: c.respondentCode,
      state: c.state,
      priority: c.priority,
      filedAt: c.filedAt,
      daysRemaining90: c.daysRemaining90,
      hearingsCount: c.hearings ? c.hearings.length : 0,
      evidenceCount: c.evidence ? c.evidence.length : 0
    }));

    return NextResponse.json({
      success: true,
      count: maskedCases.length,
      data: maskedCases
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

