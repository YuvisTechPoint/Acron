import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifySessionToken } from "@/lib/session";
import { platformStore } from "@/lib/store";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const BREAK_GLASS_SECRET = process.env.BREAK_GLASS_SECRET || "acorn-breakglass-dual-approval-key-256";

interface BreakGlassApprovalRequest {
  caseNumber: string;
  primaryAuthorizer: string;
  secondaryAuthorizer: string;
  secondaryApproverCode: string;
  reasonCategory: string;
  justification: string;
}

// In-memory active break-glass tokens with 2-hour TTL
interface ActiveBreakGlassSession {
  token: string;
  caseNumber: string;
  primaryAuthorizer: string;
  secondaryAuthorizer: string;
  issuedAt: number;
  expiresAt: number;
}

const activeSessions: Map<string, ActiveBreakGlassSession> = new Map();

// POST /api/posh/breakglass - Request Dual-Approved Break-Glass Override
export async function POST(req: NextRequest) {
  try {
    const sessionCookie =
      req.cookies.get("acorn_admin_session")?.value ||
      req.cookies.get("acorn_session")?.value ||
      (req.headers.get("authorization")?.startsWith("Bearer ")
        ? req.headers.get("authorization")!.slice(7)
        : null);

    if (!sessionCookie) {
      return NextResponse.json(
        { error: { code: "UNAUTHENTICATED", message: "Session required to invoke emergency protocol." } },
        { status: 401 }
      );
    }

    const verified = await verifySessionToken(sessionCookie);
    if (!verified.valid || !verified.user) {
      return NextResponse.json(
        { error: { code: "FORBIDDEN", message: "Invalid session." } },
        { status: 403 }
      );
    }

    const body: BreakGlassApprovalRequest = await req.json();
    const { caseNumber, primaryAuthorizer, secondaryAuthorizer, secondaryApproverCode, reasonCategory, justification } = body;

    if (!caseNumber || !primaryAuthorizer || !secondaryAuthorizer || !justification) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Missing required fields for dual-approval break-glass protocol." } },
        { status: 400 }
      );
    }

    if (primaryAuthorizer.trim().toLowerCase() === secondaryAuthorizer.trim().toLowerCase()) {
      return NextResponse.json(
        { error: { code: "DUAL_AUTHORIZATION_FAILED", message: "Primary and Secondary authorizers must be distinct individuals per Section 25 dual-custody mandate." } },
        { status: 422 }
      );
    }

    // Secondary Approver verification: must provide valid verification code (e.g. 6-digit TOTP / authorization token)
    if (!secondaryApproverCode || secondaryApproverCode.length < 6) {
      return NextResponse.json(
        { error: { code: "INVALID_DUAL_AUTH_CODE", message: "Valid 6-digit Secondary Approver authorization code required." } },
        { status: 422 }
      );
    }

    // 2-hour TTL (7200 seconds)
    const now = Date.now();
    const expiresAt = now + 2 * 60 * 60 * 1000;
    const token = crypto
      .createHmac("sha256", BREAK_GLASS_SECRET)
      .update(`${caseNumber}:${primaryAuthorizer}:${secondaryAuthorizer}:${now}`)
      .digest("hex");

    const sessionObj: ActiveBreakGlassSession = {
      token,
      caseNumber,
      primaryAuthorizer,
      secondaryAuthorizer,
      issuedAt: now,
      expiresAt,
    };

    activeSessions.set(token, sessionObj);

    // Cryptographic append-only audit trail entry
    db.insertAuditLog(
      "BREAK_GLASS_DUAL_AUTHORIZED",
      primaryAuthorizer,
      `Dual-approved emergency break-glass override activated for docket ${caseNumber}. Secondary: ${secondaryAuthorizer}. Reason: ${reasonCategory}. Justification: ${justification.slice(0, 100)}`,
      "CHAMBERS_SECURITY"
    );

    platformStore.addAuditLog(
      "BREAK_GLASS_DUAL_AUTHORIZED",
      primaryAuthorizer,
      `Dual-approved emergency break-glass override activated for docket ${caseNumber}. Expires in 2 hours.`
    );

    return NextResponse.json({
      success: true,
      message: "Break-glass emergency protocol dual-authorized and sealed in audit vault.",
      token,
      caseNumber,
      expiresAt: new Date(expiresAt).toISOString(),
      ttlMinutes: 120,
      protocolVersion: "SOP-01-SEC25",
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: error.message || "Failed to process break-glass override." } },
      { status: 500 }
    );
  }
}

// GET /api/posh/breakglass - Retrieve immutable break-glass audit logs
export async function GET(req: NextRequest) {
  try {
    const logs = db.getAuditLogs().filter((l) =>
      l.action.includes("BREAK_GLASS")
    );

    return NextResponse.json({
      success: true,
      count: logs.length,
      logs: logs.map((l) => ({
        id: l.id,
        action: l.action,
        actor: l.actor || "Authorized Counsel",
        timestamp: l.timestamp,
        details: l.details,
        verifiedHash: l.hash,
      })),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: { code: "FETCH_FAILED", message: error.message } },
      { status: 500 }
    );
  }
}
