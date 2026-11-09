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
    const questions = db.getQuestions();
    const faqs = db.getFaqs();
    const serviceRequests = db.getServiceRequests();
    const cases = db.getCases();
    const team = db.getTeamMembers();
    const legalRules = db.getLegalRules();
    const systemSettings = db.getSystemSettings();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      database: "active",
      data: {
        siteConfig,
        services,
        posts,
        questions,
        faqs,
        serviceRequests,
        cases,
        team,
        legalRules,
        systemSettings,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to retrieve sync state" }, { status: 500 });
  }
}
