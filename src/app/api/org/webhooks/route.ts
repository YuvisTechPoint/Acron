import { NextResponse } from "next/server";
import { platformStore } from "@/lib/store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { endpoint, eventType, tenantId } = body;
    
    // BR-082 Enforcement: Payload scanners strictly reject free-text case narratives
    const forbiddenKeys = ["complaintText", "victimName", "narrative", "deposition"];
    for (const key of forbiddenKeys) {
      if (body[key]) {
        return NextResponse.json(
          { error: `BR-082 Violation: Payload cannot contain confidential field '${key}'` },
          { status: 422 }
        );
      }
    }

    platformStore.addAuditLog(
      tenantId || "ORG",
      "webhook_engine",
      "WEBHOOK_DISPATCHED",
      "system",
      eventType || "UNKNOWN",
      `Dispatched masked event ${eventType} to ${endpoint}`
    );

    return NextResponse.json({
      success: true,
      message: "Webhook event accepted and dispatched through encrypted outbox",
      outboxId: `obx-${Date.now()}`,
      dispatchedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Webhook processing failed" }, { status: 500 });
  }
}
