import { NextRequest, NextResponse } from "next/server";
import { verifyRequestSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = await verifyRequestSession(req);
  if (!auth.authorized || !auth.user) {
    return NextResponse.json(
      { authenticated: false, error: auth.error || "Invalid or expired session token." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      name: auth.user.name,
      email: auth.user.email,
      role: auth.user.role,
      chamber: auth.user.chamber || "Kolkata Chambers • Park Street District",
    },
  });
}
