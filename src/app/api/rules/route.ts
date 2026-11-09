import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { platformStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rules = db.getLegalRules();
    return NextResponse.json({ success: true, rules });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to retrieve statutory rules" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { param, value, status } = body;

    if (!param || value === undefined) {
      return NextResponse.json({ error: "Missing parameter key or value" }, { status: 400 });
    }

    // Protection for statutory non-monetary guardrail under Section 10(1)
    if (param === "conciliation_allows_monetary" && value === "true") {
      return NextResponse.json(
        { error: "Statutory Violation: Section 10(1) Proviso strictly blocks monetary terms in conciliation." },
        { status: 403 }
      );
    }

    const saved = db.updateLegalRule(param, String(value), status);
    platformStore.updateLegalRule(param, String(value), status);
    db.insertAuditLog("LEGAL_RULE_MODIFIED", "Admin", `Statutory rule parameter ${param} updated to "${value}"`);

    return NextResponse.json({
      success: true,
      message: "Statutory rule updated in persistent database and synchronized in real-time",
      rule: saved,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update legal rule" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return PATCH(req);
}
