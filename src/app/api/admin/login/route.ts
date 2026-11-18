import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { platformStore } from "@/lib/store";
import {
  AUTHORIZED_ADMIN_ACCOUNTS,
  createSessionToken,
  AdminSessionUser,
} from "@/lib/session";
import { verifyPassword, verifyTOTP } from "@/lib/auth-credentials";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || "").trim().toLowerCase();
    const password = (body.password || "").trim();
    const mfaCode = (body.mfaCode || "").trim();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Check account authorization
    let matchedUser: AdminSessionUser | undefined = AUTHORIZED_ADMIN_ACCOUNTS[email];
    if (!matchedUser) {
      const storeUser = platformStore.getAdminUsers().find((u) => u.email.toLowerCase() === email);
      if (storeUser) {
        matchedUser = {
          email: storeUser.email,
          name: storeUser.name,
          role: storeUser.role,
          chamber: "Kolkata Chambers",
        };
      }
    }

    if (!matchedUser) {
      db.insertAuditLog("ADMIN_LOGIN_FAILED", email, "Unrecognized administrator email address", "SYSTEM", "auth", email);
      return NextResponse.json(
        { success: false, error: "Invalid credentials. Unknown administrative account." },
        { status: 401 }
      );
    }

    // Check salted PBKDF2 password (no plaintext comparisons, no backdoor bypasses)
    const isPasswordValid = verifyPassword(password, email);
    if (!isPasswordValid) {
      db.insertAuditLog("ADMIN_LOGIN_FAILED", email, "Invalid password attempt", "SYSTEM", "auth", email);
      return NextResponse.json(
        { success: false, error: "Invalid password. Please check your credentials." },
        { status: 401 }
      );
    }

    // Check TOTP MFA (RFC 6238 standard verification)
    const isMfaValid = verifyTOTP(mfaCode);
    if (!isMfaValid) {
      db.insertAuditLog("ADMIN_MFA_FAILED", email, "Invalid 6-digit TOTP security code", "SYSTEM", "auth", email);
      return NextResponse.json(
        { success: false, error: "Invalid two-factor authentication (TOTP) code. Please enter a 6-digit code." },
        { status: 401 }
      );
    }

    // Create cryptographically signed HMAC-SHA256 session token
    const sessionToken = await createSessionToken(matchedUser, 86400);

    // Record audit entries
    db.insertAuditLog("ADMIN_LOGIN_SUCCESS", email, `Authenticated successfully as ${matchedUser.role}`, "SYSTEM", "auth", email);
    platformStore.addAuditLog(matchedUser.name, "super_admin", "ADMIN_SESSION_CREATED", "auth", email, `Staff login session established for ${email}`);

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful. Access granted to Acorn Admin Control System.",
      token: sessionToken,
      user: matchedUser,
    });

    const cookieOptions = {
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      httpOnly: false, // Accessible to isomorphic Next.js client store while protected by middleware signature
    };

    response.cookies.set("acorn_admin_session", sessionToken, cookieOptions);
    response.cookies.set("acorn_session", sessionToken, cookieOptions);
    response.cookies.set("acorn_posh_session", sessionToken, cookieOptions);

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Internal authentication error", details: error.message },
      { status: 500 }
    );
  }
}
