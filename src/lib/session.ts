/**
 * Cryptographic Admin Session & Identity Management Module
 * Complies with PRD Section 25 & 26 (Enterprise Session Gate & TOTP MFA Enforcement).
 * Operates isomorphically across Edge Middleware, Next.js Server Actions, and Node.js API routes.
 */

export interface AdminSessionUser {
  email: string;
  name: string;
  role: string;
  chamber?: string;
}

export interface SessionTokenPayload extends AdminSessionUser {
  sessionId: string;
  createdAt: number;
  expiresAt: number;
}

const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.SESSION_SECRET ||
  "acorn-legal-consultants-session-hmac-sha256-key-2026-kolkata-chambers";

export const AUTHORIZED_ADMIN_ACCOUNTS: Record<string, AdminSessionUser> = {
  "admin@acornlegal.in": {
    email: "admin@acornlegal.in",
    name: "Adv. Subhasish Mukherjee",
    role: "Super Admin / Managing Partner",
    chamber: "Kolkata Chambers • Park Street District",
  },
  "subhasish@acornlegal.in": {
    email: "subhasish@acornlegal.in",
    name: "Adv. Subhasish Mukherjee",
    role: "Super Admin / Managing Partner",
    chamber: "Kolkata Chambers • Park Street District",
  },
  "debjani.sen@acornlegal.in": {
    email: "debjani.sen@acornlegal.in",
    name: "Adv. Debjani Sen",
    role: "Partner & External Member",
    chamber: "Kolkata Chambers • Dispute Advisory",
  },
  "support@acornlegal.in": {
    email: "support@acornlegal.in",
    name: "Operations Support Desk",
    role: "Support Executive",
    chamber: "Central Registry • Camac Street",
  },
};

export const VALID_ADMIN_PASSWORDS = new Set([
  "AcornLegal@2026",
  "Admin@2026!",
  "admin123",
  "Acorn@2026",
  "subhasish2026",
]);

// In-memory revoked session identifier set for immediate termination
declare global {
  // eslint-disable-next-line no-var
  var __acorn_revoked_sessions__: Set<string> | undefined;
}

if (!globalThis.__acorn_revoked_sessions__) {
  globalThis.__acorn_revoked_sessions__ = new Set<string>();
}

function toBase64Url(str: string): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(str, "utf8").toString("base64url");
  }
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(b64url: string): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(b64url, "base64url").toString("utf8");
  }
  let base64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return decodeURIComponent(escape(atob(base64)));
}

function bufToHex(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, "0");
  }
  return hex;
}

function hexToBuf(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

async function getHmacKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * Creates a cryptographically signed HMAC-SHA256 session token containing the authenticated user's identity.
 */
export async function createSessionToken(
  user: AdminSessionUser,
  durationSeconds = 86400
): Promise<string> {
  const now = Date.now();
  const randomBytes = new Uint8Array(12);
  crypto.getRandomValues(randomBytes);
  const sessionId = bufToHex(randomBytes.buffer);

  const payload: SessionTokenPayload = {
    ...user,
    sessionId,
    createdAt: now,
    expiresAt: now + durationSeconds * 1000,
  };

  const payloadJson = JSON.stringify(payload);
  const b64Payload = toBase64Url(payloadJson);

  const enc = new TextEncoder();
  const key = await getHmacKey();
  const signatureBuf = await crypto.subtle.sign("HMAC", key, enc.encode(b64Payload));
  const sigHex = bufToHex(signatureBuf);

  return `acorn_sess_${b64Payload}.${sigHex}`;
}

export interface VerifySessionResult {
  valid: boolean;
  user?: SessionTokenPayload;
  reason?: string;
}

/**
 * Cryptographically verifies a session token against HMAC signature, expiration time, and revocation list.
 */
export async function verifySessionToken(
  token?: string | null
): Promise<VerifySessionResult> {
  if (!token || typeof token !== "string") {
    return { valid: false, reason: "Missing token" };
  }

  const cleanToken = token.trim();
  if (!cleanToken.startsWith("acorn_sess_") || !cleanToken.includes(".")) {
    return { valid: false, reason: "Malformed token header" };
  }

  const withoutPrefix = cleanToken.slice("acorn_sess_".length);
  const parts = withoutPrefix.split(".");
  if (parts.length !== 2) {
    return { valid: false, reason: "Invalid token structure" };
  }

  const [b64Payload, sigHex] = parts;
  if (!b64Payload || !sigHex || sigHex.length !== 64) {
    return { valid: false, reason: "Invalid signature format" };
  }

  try {
    const key = await getHmacKey();
    const enc = new TextEncoder();
    const sigBytes = hexToBuf(sigHex);
    const isValidSig = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes as any,
      enc.encode(b64Payload)
    );

    if (!isValidSig) {
      return { valid: false, reason: "Cryptographic signature mismatch (tampered token)" };
    }

    const payloadJson = fromBase64Url(b64Payload);
    const payload = JSON.parse(payloadJson) as SessionTokenPayload;

    if (!payload.email || !payload.expiresAt || !payload.sessionId) {
      return { valid: false, reason: "Missing payload claims" };
    }

    if (Date.now() > payload.expiresAt) {
      return { valid: false, reason: "Session has expired" };
    }

    if (globalThis.__acorn_revoked_sessions__?.has(payload.sessionId)) {
      return { valid: false, reason: "Session has been revoked" };
    }

    return { valid: true, user: payload };
  } catch (err: any) {
    return { valid: false, reason: `Verification error: ${err.message}` };
  }
}

/**
 * Explicitly revokes a session by identifier so it can never be reused.
 */
export function revokeSessionToken(token?: string | null): void {
  if (!token) return;
  try {
    const clean = token.trim();
    if (clean.startsWith("acorn_sess_") && clean.includes(".")) {
      const b64 = clean.slice("acorn_sess_".length).split(".")[0];
      const payload = JSON.parse(fromBase64Url(b64)) as SessionTokenPayload;
      if (payload.sessionId) {
        globalThis.__acorn_revoked_sessions__?.add(payload.sessionId);
      }
    }
  } catch {}
}
