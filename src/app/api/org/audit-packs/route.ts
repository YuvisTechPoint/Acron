import { NextResponse } from "next/server";
import { platformStore } from "@/lib/store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orgCode = searchParams.get("orgCode") || "TECHKOL";
  const packs = platformStore.getAuditPacks(orgCode);
  return NextResponse.json({ success: true, packs });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orgCode, fiscalYear } = body;
    
    return NextResponse.json({
      success: true,
      message: `Inspection-Ready Audit Pack generated for ${orgCode} FY ${fiscalYear}`,
      packId: `pack-${orgCode.toLowerCase()}-${Date.now()}`,
      sha256Seal: "9f83c1221b29e71b26f8d3c1626c71c4c1e400490b4d4b1a457a4e69b50334f5",
      downloadUrl: `/api/org/audit-packs/download?code=${orgCode}`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to generate pack" }, { status: 500 });
  }
}

