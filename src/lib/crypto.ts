import crypto from "crypto";
import { AuditLogEntry } from "./types";

const AES_ALGORITHM = "aes-256-gcm";
const DEFAULT_KEY_SECRET = process.env.ENCRYPTION_KEY || "acorn-aes256-confidential-vault-key-default-32B";
const DEFAULT_HMAC_SECRET = process.env.AUDIT_HMAC_SECRET || "acorn-append-only-audit-secret-hmac-256";

/**
 * Derives a consistent 32-byte key from secret string
 */
function getKey(secret?: string): Buffer {
  return crypto.createHash("sha256").update(secret || DEFAULT_KEY_SECRET).digest();
}

export interface EncryptedPayload {
  ciphertext: string;
  iv: string;
  tag: string;
}

/**
 * Encrypts sensitive case narratives using AES-256-GCM
 */
export function encryptNarrative(text: string, secretKey?: string): EncryptedPayload {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(AES_ALGORITHM, getKey(secretKey), iv);
  let ciphertext = cipher.update(text, "utf8", "hex");
  ciphertext += cipher.final("hex");
  const tag = cipher.getAuthTag().toString("hex");

  return {
    ciphertext,
    iv: iv.toString("hex"),
    tag,
  };
}

/**
 * Decrypts AES-256-GCM encrypted narrative payloads
 */
export function decryptNarrative(
  encrypted: EncryptedPayload | string,
  secretKey?: string
): string {
  let ciphertext: string;
  let ivHex: string;
  let tagHex: string;

  if (typeof encrypted === "string") {
    if (encrypted.startsWith("{")) {
      const parsed = JSON.parse(encrypted);
      ciphertext = parsed.ciphertext;
      ivHex = parsed.iv;
      tagHex = parsed.tag || parsed.authTag;
    } else {
      const parts = encrypted.split(":");
      if (parts.length === 3) {
        [ivHex, tagHex, ciphertext] = parts;
      } else {
        throw new Error("Invalid serialized encrypted payload format");
      }
    }
  } else {
    ciphertext = encrypted.ciphertext;
    ivHex = encrypted.iv;
    tagHex = encrypted.tag;
  }

  const decipher = crypto.createDecipheriv(
    AES_ALGORITHM,
    getKey(secretKey),
    Buffer.from(ivHex, "hex")
  );
  decipher.setAuthTag(Buffer.from(tagHex, "hex"));

  let decrypted = decipher.update(ciphertext, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

/**
 * Canonical payload serialization for audit log HMAC hashing
 */
export function canonicalizeAuditPayload(entry: Partial<AuditLogEntry>): string {
  return [
    entry.prevHash || "0".repeat(64),
    entry.timestamp || "",
    entry.actor || "",
    entry.actorRole || "",
    entry.action || "",
    entry.entityType || "",
    entry.entityId || "",
    entry.orgId || "",
    entry.details || "",
  ].join("|");
}

/**
 * Computes deterministic HMAC-SHA256 for audit chaining
 */
export function computeAuditHash(
  entry: Partial<AuditLogEntry>,
  secretKey: string = DEFAULT_HMAC_SECRET
): string {
  const payload = canonicalizeAuditPayload(entry);
  return crypto.createHmac("sha256", secretKey).update(payload).digest("hex");
}

/**
 * Validates cryptographic chain integrity across an array of audit entries
 */
export function verifyAuditChain(
  chain: AuditLogEntry[],
  secretKey: string = DEFAULT_HMAC_SECRET
): { valid: boolean; brokenIndex?: number; error?: string } {
  if (!chain || chain.length === 0) {
    return { valid: true };
  }

  // Detect ordering: reverse chronological (newest first, logs.unshift) vs chronological
  let isReverseChronological = false;
  if (chain.length > 1) {
    if (
      chain[0].prevHash === chain[1].hash ||
      chain[chain.length - 1].prevHash === "0".repeat(64)
    ) {
      isReverseChronological = true;
    }
  }

  const logs = isReverseChronological ? [...chain].reverse() : chain;

  for (let i = 0; i < logs.length; i++) {
    const entry = logs[i];
    const expectedHash = computeAuditHash(entry, secretKey);

    if (entry.hash !== expectedHash) {
      return {
        valid: false,
        brokenIndex: isReverseChronological ? chain.length - 1 - i : i,
        error: `Hash mismatch at index ${i}: expected ${expectedHash}, got ${entry.hash}`,
      };
    }

    if (i > 0) {
      const prevEntry = logs[i - 1];
      if (entry.prevHash !== prevEntry.hash) {
        return {
          valid: false,
          brokenIndex: isReverseChronological ? chain.length - 1 - i : i,
          error: `Broken chain link at index ${i}: prevHash ${entry.prevHash} does not match previous hash ${prevEntry.hash}`,
        };
      }
    }
  }

  return { valid: true };
}

/**
 * PII Scrubber redacting names, phone numbers, email addresses, and identification numbers
 */
export function scrubPII(text: string, customNames: string[] = []): string {
  if (!text) return "";

  let scrubbed = text;

  // 1. Scrub Emails
  scrubbed = scrubbed.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    "[REDACTED_EMAIL]"
  );

  // 2. Scrub Indian Aadhaar Numbers (12 digits, continuous or 4-4-4 separated)
  scrubbed = scrubbed.replace(
    /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g,
    "[REDACTED_AADHAAR]"
  );

  // 3. Scrub Indian PAN Numbers (5 letters, 4 digits, 1 letter - case insensitive)
  scrubbed = scrubbed.replace(
    /\b[a-zA-Z]{5}[0-9]{4}[a-zA-Z]\b/g,
    "[REDACTED_PAN]"
  );

  // 4. Scrub Indian and International Mobile/Phone Numbers
  scrubbed = scrubbed.replace(
    /(?:\+?91[\s.-]?)?[6-9]\d{4}[\s.-]?\d{5}\b|\+?\d{1,3}[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b|\b\d{10}\b/g,
    "[REDACTED_PHONE]"
  );

  // 5. Scrub Identified Titles and Honorific Name Patterns
  scrubbed = scrubbed.replace(
    /\b(?:Adv\.|Advocate|Adv|Dr\.|Dr|Mr\.|Mr|Mrs\.|Mrs|Ms\.|Ms|Miss|Justice|Prof\.|Prof)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*/g,
    "[REDACTED_NAME]"
  );

  // 6. Scrub Custom Names passed in
  for (const name of customNames) {
    if (name && name.trim().length > 1) {
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const reg = new RegExp(`\\b${escaped}\\b`, "gi");
      scrubbed = scrubbed.replace(reg, "[REDACTED_NAME]");
    }
  }

  return scrubbed;
}

export interface DigitalSeal {
  sealHash: string;
  algorithm: string;
  timestamp: string;
  signature: string;
  manifestId: string;
}

/**
 * Generates tamper-evident digital seal for statutory packs and case documents
 */
export function generateDigitalSeal(
  data: any,
  options: { keyId?: string; signerRole?: string; purpose?: string } = {}
): DigitalSeal {
  const canonicalData = typeof data === "string" ? data : JSON.stringify(data);
  const sealHash = crypto.createHash("sha256").update(canonicalData).digest("hex");
  const manifestId = `SEAL-${Date.now()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
  const timestamp = new Date().toISOString();

  const sealPayload = `${manifestId}|${sealHash}|${timestamp}|${options.signerRole || "PRESIDING_OFFICER"}|${options.purpose || "STATUTORY_INSPECTION"}`;
  const signature = crypto
    .createHmac("sha256", DEFAULT_HMAC_SECRET)
    .update(sealPayload)
    .digest("hex");

  return {
    sealHash,
    algorithm: "HMAC-SHA256",
    timestamp,
    signature,
    manifestId,
  };
}
