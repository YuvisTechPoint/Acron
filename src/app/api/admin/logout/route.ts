import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { platformStore } from "@/lib/store";
import { revokeSessionToken } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const token =
      req.cookies.get("acorn_admin_session")?.value ||
      req.cookies.get("acorn_session")?.value;

    if (token) {
      revokeSessionToken(token);
    }

    db.insertAuditLog("ADMIN_LOGOUT", "Admin", "Staff admin session terminated", "SYSTEM", "auth", "session");
    platformStore.addAuditLog("Admin", "super_admin", "ADMIN_LOGOUT", "auth", "session", "Admin session logged out");

    const response = NextResponse.json({
      success: true,
      message: "Admin session successfully terminated.",
    });

    const expireOptions = {
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    };

    response.cookies.set("acorn_admin_session", "", expireOptions);
    response.cookies.set("acorn_session", "", expireOptions);
    response.cookies.set("acorn_posh_session", "", expireOptions);

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Logout error", details: error.message },
      { status: 500 }
    );
  }
}
