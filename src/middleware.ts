import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/session";

// Standard editorial CSP policy compliant with PRD Section 25 & Bar Council restrictions
const CSP_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: https: blob:",
  "connect-src 'self' https://api.razorpay.com",
  "frame-src 'self' https://api.razorpay.com https://maps.google.com https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check session tokens from cookies or Authorization header
  const adminCookieToken =
    request.cookies.get("acorn_admin_session")?.value ||
    request.cookies.get("acorn_session")?.value;
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const candidateToken = adminCookieToken || bearerToken;

  let hasAdminSession = false;
  if (candidateToken && candidateToken.trim().length > 0) {
    const verified = await verifySessionToken(candidateToken);
    if (verified.valid) {
      hasAdminSession = true;
    }
  }

  // 1. Edge Session Verification for Dense Staff Admin (/admin/*) and Operations War-Room (/ops/*)
  if (pathname.startsWith("/admin") || pathname === "/ops" || pathname.startsWith("/ops/")) {
    if (pathname === "/admin/login") {
      // If already logged in, redirect directly to admin console
      if (hasAdminSession) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } else {
      // If unauthenticated, redirect to admin login
      if (!hasAdminSession) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // 2. Edge Verification for Restricted POSH Consoles (/posh/admin/*, /posh/org/*, /posh/ic/*)
  const isProtectedPoshConsole =
    pathname.startsWith("/posh/admin") ||
    pathname.startsWith("/posh/org") ||
    pathname.startsWith("/posh/ic");

  if (isProtectedPoshConsole) {
    const poshCookieToken = request.cookies.get("acorn_posh_session")?.value;
    let hasPoshSession = hasAdminSession;
    if (!hasPoshSession && poshCookieToken && poshCookieToken.trim().length > 0) {
      const verified = await verifySessionToken(poshCookieToken);
      if (verified.valid) {
        hasPoshSession = true;
      }
    }

    if (!hasPoshSession) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Edge Verification for Protected Private APIs (/api/admin/*, /api/org/*, /api/posh/*, /api/scim/*)
  const isProtectedApi =
    pathname.startsWith("/api/admin") ||
    pathname.startsWith("/api/org") ||
    pathname.startsWith("/api/posh") ||
    pathname.startsWith("/api/scim");

  if (isProtectedApi && pathname !== "/api/admin/login") {
    if (!hasAdminSession) {
      const poshCookieToken = request.cookies.get("acorn_posh_session")?.value;
      let hasPoshSession = false;
      if (poshCookieToken && poshCookieToken.trim().length > 0) {
        const verified = await verifySessionToken(poshCookieToken);
        if (verified.valid) {
          hasPoshSession = true;
        }
      }
      if (!hasPoshSession) {
        return NextResponse.json(
          { error: "Authentication required: Valid session token must be provided." },
          { status: 401 }
        );
      }
    }
  }

  // 3. Create response and inject CSP and enterprise security headers
  const response = NextResponse.next();

  response.headers.set("Content-Security-Policy", CSP_POLICY);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(self), microphone=(self), geolocation=(), browsing-topics=()"
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
