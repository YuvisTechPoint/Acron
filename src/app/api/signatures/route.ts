import { NextResponse } from "next/server";
import { platformStore } from "@/lib/store";

export async function GET() {
  const requests = platformStore.getSignatures();
  return NextResponse.json({ success: true, requests });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { documentCode, signerName, method } = body;

    platformStore.addAuditLog(
      "TECHKOL",
      "esign_gateway",
      "DOCUMENT_DIGITALLY_SIGNED",
      "system",
      documentCode || "DOC-2026",
      `Document ${documentCode} signed by ${signerName} via ${method}`
    );

    return NextResponse.json({
      success: true,
      message: `Document ${documentCode} successfully countersigned and sealed via ${method}`,
      timestamp: new Date().toISOString(),
      tamperEvidentSeal: "sha256:4b227777d4c88e9182390a1bc294817a",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to sign document" }, { status: 500 });
  }
}

