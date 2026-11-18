import { NextRequest, NextResponse } from "next/server";
import { platformStore } from "@/lib/store";
import { db } from "@/lib/db";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function GET() {
  const requests = platformStore.getSignatures();
  return NextResponse.json({ success: true, count: requests.length, requests });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { documentCode, signerName, method, orgId, caseNumber } = body;

    if (!documentCode || !signerName) {
      return NextResponse.json(
        { error: "Missing required signature fields: documentCode, signerName" },
        { status: 400 }
      );
    }

    const signingSecret = process.env.SIGNATURE_KEY_SECRET || "acorn-confidential-signature-vault-secret";
    const timestamp = new Date().toISOString();
    const sealData = `${documentCode}:${signerName}:${method || "Aadhaar eSign"}:${timestamp}`;
    const tamperEvidentSeal = `sha256:${crypto.createHmac("sha256", signingSecret).update(sealData).digest("hex")}`;

    db.insertAuditLog(
      "DOCUMENT_DIGITALLY_SIGNED",
      signerName,
      `Document ${documentCode} signed via ${method || "Aadhaar eSign"}. Case: ${caseNumber || "N/A"}. Seal: ${tamperEvidentSeal.slice(0, 18)}...`,
      orgId || "SYSTEM"
    );

    platformStore.addAuditLog(
      "DOCUMENT_DIGITALLY_SIGNED",
      signerName,
      `Document ${documentCode} signed via ${method || "Aadhaar eSign"}. Seal: ${tamperEvidentSeal}`
    );

    return NextResponse.json({
      success: true,
      message: `Document ${documentCode} successfully countersigned and sealed via ${method || "Aadhaar eSign"}`,
      documentCode,
      signerName,
      method: method || "Aadhaar eSign",
      timestamp,
      tamperEvidentSeal,
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to sign document" }, { status: 500 });
  }
}

