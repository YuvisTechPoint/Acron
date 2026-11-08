import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { platformStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = db.getSiteConfig();
  return NextResponse.json({ success: true, config });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const updated = db.updateSiteConfig(body);
    platformStore.updateSiteConfig(body);
    return NextResponse.json({
      success: true,
      message: "Site configuration updated in persistent database and synchronized in real-time",
      config: updated,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update site config" }, { status: 500 });
  }
}
