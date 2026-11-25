import { NextRequest, NextResponse } from "next/server";
import { platformStore } from "@/lib/store";
import { requireAuth } from "@/lib/api-response";

// GET /api/scripts - Retrieve active third-party tracking scripts
export async function GET(req: NextRequest) {
  try {
    const referer = req.headers.get("referer") || "";
    const isPoshPage = referer.includes("/posh");

    // Strict Rule BR-046 Enforcement:
    // "Zero marketing or analytics scripts may execute on any POSH complaint intake,
    // inquiry tracking, or IC management page."
    if (isPoshPage) {
      return NextResponse.json({
        success: true,
        scripts: [],
        policyNote: "Rule BR-046 Active: All tracking scripts blocked on POSH pages."
      });
    }

    const scripts = platformStore.getScripts().filter((s) => s.isEnabled);

    return NextResponse.json({
      success: true,
      count: scripts.length,
      scripts
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// PATCH /api/scripts - Toggle or update a script's enabled state (Staff Admin Restricted)
export async function PATCH(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth.authorized) {
      return auth.response;
    }

    const body = await req.json();
    const { id, isEnabled } = body;
    if (!id || typeof isEnabled !== "boolean") {
      return NextResponse.json({ error: "Missing required fields: id, isEnabled" }, { status: 400 });
    }
    const updated = platformStore.updateScript(id, isEnabled);
    return NextResponse.json({
      success: true,
      message: `Script ${id} state updated to ${isEnabled ? "ENABLED" : "DISABLED"}`,
      script: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update script state", details: error.message },
      { status: 500 }
    );
  }
}


