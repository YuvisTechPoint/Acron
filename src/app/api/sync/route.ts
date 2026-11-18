import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifySessionToken } from "@/lib/session";

export const dynamic = "force-dynamic";

/**
 * GET /api/sync
 * Returns real-time snapshot of chambers database state.
 * Authenticated super_admin sessions receive the full administrative dataset.
 * Unauthenticated requests receive only public, non-confidential CMS collections.
 */
export async function GET(req: NextRequest) {
  try {
    const adminToken =
      req.cookies.get("acorn_admin_session")?.value ||
      req.cookies.get("acorn_session")?.value ||
      (req.headers.get("authorization")?.startsWith("Bearer ")
        ? req.headers.get("authorization")!.slice(7)
        : null);

    let isAuthorizedAdmin = false;
    if (adminToken && adminToken.trim().length > 0) {
      const verified = await verifySessionToken(adminToken);
      if (verified.valid) {
        isAuthorizedAdmin = true;
      }
    }

    if (isAuthorizedAdmin) {
      const allData = db.getAllCollections();
      return NextResponse.json({
        success: true,
        timestamp: new Date().toISOString(),
        database: "active",
        scope: "administrative",
        data: allData,
      });
    }

    // Public sanitized subset (only non-confidential public content)
    const allData = db.getAllCollections();
    const publicData = {
      practice_areas: allData.practice_areas || [],
      articles: allData.articles || [],
      faqs: allData.faqs || [],
      site_settings: allData.site_settings || {},
      chambers_ticker: allData.chambers_ticker || [],
    };

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      database: "active",
      scope: "public",
      data: publicData,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to retrieve sync state" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/sync
 * Real-time synchronization endpoint for persisting admin updates to server database.
 * Strictly restricted to verified staff administrators.
 */
export async function POST(req: NextRequest) {
  try {
    const adminToken =
      req.cookies.get("acorn_admin_session")?.value ||
      req.cookies.get("acorn_session")?.value ||
      (req.headers.get("authorization")?.startsWith("Bearer ")
        ? req.headers.get("authorization")!.slice(7)
        : null);

    if (!adminToken || adminToken.trim().length === 0) {
      return NextResponse.json(
        { error: "Unauthorized: Administrative session token required for persistence." },
        { status: 401 }
      );
    }

    const verified = await verifySessionToken(adminToken);
    if (!verified.valid) {
      return NextResponse.json(
        { error: "Forbidden: Invalid or expired administrative session." },
        { status: 403 }
      );
    }

    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    // Single collection mutation
    if (body.key && body.value !== undefined) {
      db.setCollection(body.key, body.value);
      return NextResponse.json({
        success: true,
        key: body.key,
        timestamp: new Date().toISOString(),
      });
    }

    // Batch collection mutation
    if (body.batch && typeof body.batch === "object") {
      for (const [key, value] of Object.entries(body.batch)) {
        if (value !== undefined) {
          db.setCollection(key, value);
        }
      }
      return NextResponse.json({
        success: true,
        count: Object.keys(body.batch).length,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { error: "Payload must contain 'key' and 'value', or 'batch'" },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to sync collection to server database" },
      { status: 500 }
    );
  }
}
