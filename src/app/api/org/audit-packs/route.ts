import { NextRequest, NextResponse } from "next/server";
import { platformStore } from "@/lib/store";
import { db } from "@/lib/db";
import { generateDigitalSeal } from "@/lib/crypto";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgCode = searchParams.get("orgCode") || "TECHKOL";
  const packs = platformStore.getAuditPacks(orgCode);
  return NextResponse.json({ success: true, count: packs.length, packs });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orgCode, fiscalYear } = body;
    const targetOrg = orgCode || "TECHKOL";
    const fy = fiscalYear || "2026-27";
    const timestamp = new Date().toISOString();
    const packId = `pack-${targetOrg.toLowerCase()}-${Date.now()}`;
    const digitalSeal = generateDigitalSeal({ orgCode: targetOrg, fiscalYear: fy, packId, timestamp });
    const sha256Seal = digitalSeal.sealHash;

    db.insertAuditLog(
      "AUDIT_PACK_GENERATED",
      "Compliance Officer",
      `11-part statutory inspection manifest generated for ${targetOrg} FY ${fy}. Seal: ${sha256Seal.slice(0, 16)}...`,
      targetOrg
    );

    platformStore.addAuditLog(
      "AUDIT_PACK_GENERATED",
      "Compliance Officer",
      `Inspection-Ready Audit Pack generated for ${targetOrg} FY ${fy}. Seal: ${sha256Seal}`
    );

    return NextResponse.json({
      success: true,
      message: `Inspection-Ready Audit Pack generated for ${targetOrg} FY ${fy}`,
      packId,
      sha256Seal,
      downloadUrl: `/api/org/audit-packs/download?orgCode=${targetOrg}&fiscalYear=${fy}`,
      timestamp,
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to generate pack" }, { status: 500 });
  }
}

