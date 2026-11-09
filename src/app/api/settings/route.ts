import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { platformStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = db.getSystemSettings();
    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to retrieve system settings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = db.updateSystemSettings(body);
    platformStore.updateSystemSettings(body);
    db.insertAuditLog(
      "SYSTEM_SETTINGS_UPDATED",
      "Super Admin",
      `Gateway mode=${body.razorpayMode || "test"}, retention=${body.retentionYears || 3}y`
    );

    return NextResponse.json({
      success: true,
      message: "System configuration saved to persistent database and synchronized in real-time",
      settings: updated,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save system settings" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  return POST(req);
}
