# Acorn Legal Consultants: Full Remediation & End-to-End Audit Walkthrough

**Audit Reference:** [docs/AUDIT.md](file:///c:/Users/prasa/Desktop/Acron%20New/docs/AUDIT.md)  
**Execution Status:** **100% Completed (18/18 Tasks Verified)**  
**Automated Test Matrix:**
- `npm run typecheck` (`tsc --noEmit`): **0 errors**
- `npm run lint` (`next lint`): **0 warnings, 0 errors**
- `node scripts/test-unit.mjs`: **35/35 passed (100%)**
- `node scripts/test-workflows.mjs`: **15/15 passed (100%)**
- `node scripts/test-admin-realtime.mjs`: **76/76 passed (100%)**
- `node scripts/verify-all.mjs`: **143/143 routes (200 OK) + 127/127 internal links valid (0 broken)**

---

## 1. Executive Summary & Core Deliverables

All 18 architectural, security, statutory, and operational gaps identified in `docs/AUDIT.md` have been comprehensively remediated, end-to-end verified, and locked with automated tests:

1. **User Experience & Chambers Geography (`chambers-map.tsx`):**
   - Fixed the "Get Directions" anchor link inside the Chambers Geography modal to match the exact visual specification and direct users to **Apple Maps** (`https://maps.apple.com/?daddr=22.5497,88.3533&q=Camac+Court+Building...&dirflg=d`).
2. **Phase P0 (Critical Security & Zero-Backdoor Authentication):**
   - Eliminated `RouteCrawler` and `x-bypass-auth` middleware backdoors.
   - Enforced session verification in Edge middleware using Web Crypto API.
   - Secured `/api/sync` against unauthenticated writes and sensitive collection exfiltration.
   - Replaced plaintext passwords with PBKDF2-SHA256 salted hashes and RFC 6238 TOTP validation.
   - Fixed audit log HMAC key mismatch and removed the 100-log slice limit.
   - Removed client payment fallbacks and scoped the `QuickExit` Escape key listener strictly to `/posh` routes.
3. **Phase P1 (Architecture, Encryption at Rest & Statutory Rules Engine):**
   - Mounted persistent volume `./data:/app/data` in `docker-compose.yml` and configured Dockerfile permissions.
   - Integrated AES-256-GCM encryption at rest for complaint narratives and statements (`detailedStatement`, `summary`) in `src/lib/db.ts`.
   - Built strict tenant-scoped repository access enforcing `CrossTenantAccessError` and immutable audit logging.
   - Built effective-dated statutory rules configuration (`src/lib/rules/engine/rules.config.ts`).
   - Implemented all 21 statutory timers (`TM-01` to `TM-21`) in `src/lib/rules/statutory-timelines.ts`.
   - Built Calcutta High Court and West Bengal judicial holiday/vacation calendar with Limitation Act Section 4 rollover (`src/lib/rules/calendar.ts`).
   - Implemented 21 statutory routing rules (`RT-01` to `RT-21`) in `src/lib/rules/routing.ts`.
   - Implemented complete procedural transitions (`T01` to `T30`) in `src/lib/rules/state-machine.ts`.
   - Enforced idempotency key tracking and removed `sig_test_` bypasses in Razorpay payments.
4. **Phase P2 (Operations Console, API Standards & Persistent UI):**
   - Built root `/ops` operational command centre (`src/app/ops/page.tsx`) with real-time telemetry, 11-step SOP-01 incident workflow, and statutory 6-hour CERT-In regulatory countdown clock.
   - Replaced hardcoded break-glass PIN `"ACORN-9900"` with server-side dual approval protocol and 2-hour TTL token (`src/app/api/posh/breakglass/route.ts`, `src/app/posh/admin/breakglass/page.tsx`).
   - Standardized API envelopes (`apiSuccess`, `apiError`, `checkIfMatch`, `parsePaginationParams`) in `src/lib/api-response.ts`.
   - Wired digital signature seals and 11-part inspection audit pack generation to genuine HMAC-SHA256 cryptographic routines.
   - Added counter-exhibit and document upload inputs to `request-service` and respondent reply portals.
   - Replaced repetitive `animate-bounce` in guidance assistant with WCAG-compliant `animate-pulse motion-reduce:animate-none`.

---

## 2. Statutory & Security Review Flags (NEEDS HUMAN REVIEW)

Per **Constitution Part 2 Rule 9**, the following security-critical areas are formally cataloged and flagged for human review prior to production release:

| Subsystem | Flagged Component | Human Review Scope & Justification |
| :--- | :--- | :--- |
| **Authentication & Sessions** | [src/lib/session.ts](file:///c:/Users/prasa/Desktop/Acron%20New/src/lib/session.ts), [src/lib/auth-credentials.ts](file:///c:/Users/prasa/Desktop/Acron%20New/src/lib/auth-credentials.ts) | **NEEDS HUMAN REVIEW**: Pure Web Crypto HMAC-SHA256 session token signing in Edge middleware; PBKDF2-SHA256 credential hashing; RFC 6238 TOTP clock drift algorithm (±1 window). |
| **Server-Side Access Guard** | [src/lib/rules/access.ts](file:///c:/Users/prasa/Desktop/Acron%20New/src/lib/rules/access.ts), [src/lib/db.ts](file:///c:/Users/prasa/Desktop/Acron%20New/src/lib/db.ts) | **NEEDS HUMAN REVIEW**: `canAccessCase()` statutory boundary enforcement and `CrossTenantAccessError` thrown on unauthorized cross-tenant docket queries. |
| **Encryption at Rest** | [src/lib/crypto.ts](file:///c:/Users/prasa/Desktop/Acron%20New/src/lib/crypto.ts), [src/lib/db.ts](file:///c:/Users/prasa/Desktop/Acron%20New/src/lib/db.ts) | **NEEDS HUMAN REVIEW**: AES-256-GCM authenticated cipher with 12-byte IV and 16-byte auth tag; key derivation via SHA-256 from `ENCRYPTION_KEY`. |
| **Statutory Rules Engine** | [src/lib/rules/engine/rules.config.ts](file:///c:/Users/prasa/Desktop/Acron%20New/src/lib/rules/engine/rules.config.ts), [src/lib/rules/statutory-timelines.ts](file:///c:/Users/prasa/Desktop/Acron%20New/src/lib/rules/statutory-timelines.ts) | **NEEDS HUMAN REVIEW**: Effective-dated statutory parameters for POSH Act 2013 & Rules 2013; 21 statutory timers (`TM-01` to `TM-21`); High Court vacation calendar rollover (`calendar.ts`). |
| **Emergency Break-Glass** | [src/app/api/posh/breakglass/route.ts](file:///c:/Users/prasa/Desktop/Acron%20New/src/app/api/posh/breakglass/route.ts) | **NEEDS HUMAN REVIEW**: Dual-approval authorization protocol requiring two distinct senior counsel credentials and 6-digit TOTP verification; 2-hour TTL token generation; cryptographic append-only audit trail logging. |
| **Razorpay Payment Gateway** | [src/app/api/payments/verify/route.ts](file:///c:/Users/prasa/Desktop/Acron%20New/src/app/api/payments/verify/route.ts), [src/app/pay/page.tsx](file:///c:/Users/prasa/Desktop/Acron%20New/src/app/pay/page.tsx) | **NEEDS HUMAN REVIEW**: Server-side HMAC-SHA256 signature verification; removal of client fallback bypasses; idempotency key tracking preventing duplicate payments. |
