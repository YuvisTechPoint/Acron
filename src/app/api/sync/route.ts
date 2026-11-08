import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/sync
 * Returns latest snapshot of public chambers data from the persistent database.
 */
export async function GET() {
  try {
    const siteConfig = db.getSiteConfig();
    const services = db.getServices();
    const posts = db.getBlogPosts();
    const questions = db.getQuestions().filter((q) => q.isPublic);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      database: "active",
      data: {
        siteConfig,
        services,
        posts,
        questions,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to retrieve sync state" }, { status: 500 });
  }
}

