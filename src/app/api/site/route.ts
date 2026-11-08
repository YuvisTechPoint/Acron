import { NextResponse } from "next/server";
import { platformStore } from "@/lib/store";

export async function GET() {
  const config = platformStore.getSiteConfig();
  return NextResponse.json({ success: true, config });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    platformStore.updateSiteConfig(body);
    return NextResponse.json({
      success: true,
      message: "Site configuration updated and synchronized in real-time",
      config: platformStore.getSiteConfig(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update site config" }, { status: 500 });
  }
}

