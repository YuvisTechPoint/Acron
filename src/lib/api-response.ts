import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { verifyRequestSession, type SessionTokenPayload } from "./session";

export interface ApiPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiErrorEnvelope {
  error: {
    code: string;
    message: string;
    details?: any;
    requestId: string;
    timestamp: string;
  };
}

export interface ApiSuccessEnvelope<T> {
  success: true;
  data: T;
  pagination?: ApiPaginationMeta;
  requestId: string;
  timestamp: string;
}

/**
 * Creates standardized JSON success response with optional pagination and ETag headers
 */
export function apiSuccess<T>(
  data: T,
  options?: {
    status?: number;
    pagination?: { page: number; limit: number; total: number };
    etag?: string;
    headers?: Record<string, string>;
  }
): NextResponse {
  const requestId = `req-${crypto.randomBytes(6).toString("hex")}`;
  const timestamp = new Date().toISOString();

  let paginationMeta: ApiPaginationMeta | undefined;
  if (options?.pagination) {
    const { page, limit, total } = options.pagination;
    const totalPages = Math.ceil(total / limit) || 1;
    paginationMeta = {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }

  const payload: ApiSuccessEnvelope<T> = {
    success: true,
    data,
    ...(paginationMeta ? { pagination: paginationMeta } : {}),
    requestId,
    timestamp,
  };

  const headers = new Headers(options?.headers || {});
  headers.set("X-Request-Id", requestId);

  if (options?.etag) {
    headers.set("ETag", `"${options.etag}"`);
  }

  return NextResponse.json(payload, {
    status: options?.status || 200,
    headers,
  });
}

/**
 * Creates standardized RFC-7807 compatible error envelope
 */
export function apiError(
  code: string,
  message: string,
  status: number = 400,
  details?: any,
  headers?: Record<string, string>
): NextResponse {
  const requestId = `req-${crypto.randomBytes(6).toString("hex")}`;
  const timestamp = new Date().toISOString();

  const payload: ApiErrorEnvelope = {
    error: {
      code,
      message,
      ...(details ? { details } : {}),
      requestId,
      timestamp,
    },
  };

  const responseHeaders = new Headers(headers || {});
  responseHeaders.set("X-Request-Id", requestId);

  return NextResponse.json(payload, {
    status,
    headers: responseHeaders,
  });
}

/**
 * Validates HTTP If-Match header against the resource's current ETag/version string
 * Enforces PRD Section 25.1 optimistic locking
 */
export function checkIfMatch(
  req: NextRequest,
  currentEtag: string
): { matches: boolean; errorResponse?: NextResponse } {
  const ifMatch = req.headers.get("if-match");
  if (!ifMatch) {
    return { matches: true }; // Allowed if client did not supply If-Match
  }

  const cleanHeader = ifMatch.replace(/^"|"$/g, "").trim();
  const cleanCurrent = currentEtag.replace(/^"|"$/g, "").trim();

  if (cleanHeader !== "*" && cleanHeader !== cleanCurrent) {
    return {
      matches: false,
      errorResponse: apiError(
        "PRECONDITION_FAILED",
        "Resource has been modified by another concurrent transaction (ETag mismatch).",
        412,
        { clientVersion: cleanHeader, currentVersion: cleanCurrent }
      ),
    };
  }

  return { matches: true };
}

/**
 * Parses standard pagination parameters from URL query string
 */
export function parsePaginationParams(req: NextRequest): {
  page: number;
  limit: number;
  offset: number;
  sort: string;
  order: "asc" | "desc";
} {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10) || 20));
  const offset = (page - 1) * limit;
  const sort = searchParams.get("sort") || "createdAt";
  const order = (searchParams.get("order")?.toLowerCase() === "asc" ? "asc" : "desc") as "asc" | "desc";

  return { page, limit, offset, sort, order };
}

/**
 * Verifies an administrative (or optional POSH) session token from request
 * cookies or Bearer header and returns either the authenticated user or a
 * standardized error NextResponse.
 */
export async function requireAuth(
  req: Request,
  options?: { allowPoshSession?: boolean }
): Promise<
  | { authorized: true; user: SessionTokenPayload }
  | { authorized: false; response: NextResponse }
> {
  const auth = await verifyRequestSession(req, options);
  if (!auth.authorized || !auth.user) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: auth.error || "Unauthorized" },
        { status: auth.status }
      ),
    };
  }
  return { authorized: true, user: auth.user };
}
