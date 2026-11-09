import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const cookieToken =
    req.cookies.get("acorn_admin_session")?.value ||
    req.cookies.get("acorn_session")?.value;
  const authHeader = req.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const token = cookieToken || bearerToken;

  if (!token || token.trim().length === 0) {
    return NextResponse.json(
      { authenticated: false, error: "No active session cookie or authorization header found." },
      { status: 401 }
    );
  }

  const result = await verifySessionToken(token);
  if (!result.valid || !result.user) {
    return NextResponse.json(
      { authenticated: false, error: result.reason || "Invalid or expired session token." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
      chamber: result.user.chamber || "Kolkata Chambers • Park Street District",
    },
  });
}
