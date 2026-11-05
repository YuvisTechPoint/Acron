import { NextRequest, NextResponse } from "next/server";
import { platformStore } from "@/lib/store";

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

