import { NextResponse } from "next/server";
import { platformStore } from "@/lib/store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orgCode = searchParams.get("orgCode") || undefined;
  const connectors = platformStore.getConnectors(orgCode);
  return NextResponse.json({ success: true, connectors });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, action, status } = body;
    if (!id) {
      return NextResponse.json({ error: "Missing connector id" }, { status: 400 });
    }
    if (action === "toggle" && status) {
      platformStore.toggleConnector(id, status);
      return NextResponse.json({ success: true, message: `Connector status updated to ${status}` });
    }
    return NextResponse.json({ success: true, message: "Connector synced successfully", lastSyncAt: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to process connector action" }, { status: 500 });
  }
}
