import { NextResponse } from "next/server";
import { platformStore } from "@/lib/store";

export async function GET() {
  const configs = platformStore.getSSOConfigs();
  return NextResponse.json({ success: true, configs });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.orgCode || !body.protocol) {
      return NextResponse.json({ error: "Missing orgCode or protocol" }, { status: 400 });
    }
    platformStore.saveSSOConfig(body);
    return NextResponse.json({ success: true, message: "SSO configuration saved successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save SSO config" }, { status: 500 });
  }
}
