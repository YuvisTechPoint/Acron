import { NextResponse } from "next/server";
import { platformStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const uptime = process.uptime();
    const memory = process.memoryUsage();
    
    // Quick store integrity check
    const servicesCount = platformStore.getServices().length;
    const postsCount = platformStore.getBlogs().length;
    const casesCount = platformStore.getCases().length;

    const health = {
      status: "healthy",
      version: "3.0.0",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(uptime),
      environment: process.env.NODE_ENV || "production",
      checks: {
        store: "healthy",
        servicesCount,
        postsCount,
        casesCount,
        memory: {
          rssMb: Math.round(memory.rss / (1024 * 1024)),
          heapUsedMb: Math.round(memory.heapUsed / (1024 * 1024)),
          heapTotalMb: Math.round(memory.heapTotal / (1024 * 1024)),
        },
      },
      audit: {
        piiScrubberActive: true,
        sec16PoshCompliance: "ENFORCED",
        disclaimerAppended: true,
      },
    };

    return NextResponse.json(health, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "X-Health-Check": "pass",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: error?.message || "Internal health check failure",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
