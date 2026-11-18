# Hand-off Report: Deep Codebase Audit of Backend/API, Database Models, and POSH Rules Engine

## 1. Observation

A comprehensive, read-only static analysis and runtime probe of the Acron New / Acorn Legal Consultants repository was conducted against `docs/PRD.md` (v2.0 / v3.0), `docs/PLAYBOOK.md` (Part B/C, Prompts B0 to B17), repository constitution rules in `AGENTS.md`, and specialized skill guidelines (`acorn-backend-architect`, `acorn-rules-engine-engineer`).

The following direct, verifiable observations were recorded across the codebase:

---

### Category 1: Backend & API Architecture, Monorepo Structure & Environment Configuration

1. **Absence of Monorepo Structure & Separate Backend Service:**
   - **File System / Root Directory:**
     - The root directory contains only a single Next.js App Router application (`src/app/`, `src/lib/`, `src/components/`).
     - **Observed:** Directories `apps/api`, `packages/rules`, and `packages/shared` **do not exist**.
     - `package.json` (lines 21–40) lists only 7 production dependencies (`clsx`, `date-fns`, `lucide-react`, `next`, `react`, `react-dom`, `tailwind-merge`). Dependencies specified in PRD Section 9.2, Section 25, and `acorn-backend-architect/SKILL.md`—namely `express`, `mongoose`, `ioredis`/`redis`, `zod`, `pino`, `helmet`, `cors`, and `socket.io`—are completely absent from `package.json`.
   - **Specification Reference:** PRD Section 9.3 ("Code organisation: `/apps/api`, `/apps/web`, `/apps/admin`, `/packages/rules`, `/packages/shared`"), Section 25, and PLAYBOOK Prompts B0 & B1.

2. **Absence of Startup Environment Variable Validation Schema:**
   - **Observation:** No Zod environment schema exists. In `src/lib/crypto.ts`, `src/lib/session.ts`, `src/app/api/payments/verify/route.ts`, and `src/app/api/webhooks/razorpay/route.ts`, environment variables are read ad-hoc with hardcoded fallback default secrets:
     - `src/lib/crypto.ts:5`: `const DEFAULT_KEY_SECRET = process.env.ENCRYPTION_KEY || "acorn-aes256-confidential-vault-key-default-32B";`
     - `src/lib/crypto.ts:6`: `const DEFAULT_HMAC_SECRET = process.env.AUDIT_HMAC_SECRET || "acorn-append-only-audit-secret-hmac-256";`
     - `src/lib/session.ts:20-23`:
       ```ts
       const SESSION_SECRET =
         process.env.ADMIN_SESSION_SECRET ||
         process.env.SESSION_SECRET ||
         "acorn-legal-consultants-session-hmac-sha256-key-2026-kolkata-chambers";
       ```
     - `src/app/api/payments/verify/route.ts:6`: `const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "default_razorpay_secret_key";`
     - `src/app/api/webhooks/razorpay/route.ts:5-8`:
       ```ts
       const RAZORPAY_WEBHOOK_SECRET =
         process.env.RAZORPAY_WEBHOOK_SECRET ||
         process.env.RAZORPAY_KEY_SECRET ||
         "default_razorpay_webhook_secret";
       ```
     - `src/lib/db.ts:631`: Initial seed hardcodes `razorpayKeyId: "rzp_test_AcornLegalKolkata2026"`.
   - **Specification Reference:** PRD Section 27.3 ("Configuration is read once at start from the environment and validated by a Zod schema; the application refuses to start if a required value is missing or malformed. Secrets come from the secret manager. No default values for secrets are allowed."), Constitution Part 2 Rule 7.

3. **Authentication Backdoor & Missing Middleware Protection on API Routes:**
   - **File:** `src/middleware.ts` (lines 21–25, 43–79):
     ```ts
     const userAgent = request.headers.get("user-agent") || "";
     const isCrawlerOrTest =
       userAgent.includes("RouteCrawler") ||
       request.headers.get("x-bypass-auth") === "true";
     ```
     Lines 51–55:
     ```ts
     if (!hasAdminSession && !isCrawlerOrTest) {
       const loginUrl = new URL("/admin/login", request.url);
       ...
       return NextResponse.redirect(loginUrl);
     }
     ```
     - **Observed:** Any client sending `User-Agent: RouteCrawler` or HTTP header `x-bypass-auth: true` completely bypasses the admin authentication gate for `/admin/*` and `/posh/*`.
     - **Observed:** `src/middleware.ts` only checks `pathname.startsWith("/admin")` and `isProtectedPoshConsole`. It contains **zero checks** for `/api/*` paths. All `/api/*` routes are entirely omitted from middleware session validation.

4. **Hardcoded Plaintext Credentials & Mock MFA in Admin Auth:**
   - **File:** `src/lib/session.ts` (lines 52–58):
     ```ts
     export const VALID_ADMIN_PASSWORDS = new Set([
       "AcornLegal@2026",
       "Admin@2026!",
       "admin123",
       "Acorn@2026",
       "subhasish2026",
     ]);
     ```
   - **File:** `src/app/api/admin/login/route.ts` (line 50):
     ```ts
     const isPasswordValid = VALID_ADMIN_PASSWORDS.has(password) || password === "••••••••••••";
     ```
     And line 60:
     ```ts
     const isMfaValid = /^\d{6}$/.test(mfaCode);
     ```
     And line 88:
     ```ts
     httpOnly: false,
     ```
     - **Observed:** Passwords are stored in plaintext in the codebase. The literal bullet string `"••••••••••••"` is accepted as a valid password. TOTP MFA validation is a static regex `/^\d{6}$/` accepting any 6 arbitrary digits without computing RFC 6238 TOTP against a shared secret. Session cookies are issued with `httpOnly: false`.
   - **Specification Reference:** PRD Section 26.2, Section 26.3, Constitution Part 2 Rule 7 & 9.

---

### Category 2: Endpoint Completeness & API Contract Gaps

1. **Public Exposure and Unauthenticated Overwrite of Entire Database via `/api/sync`:**
   - **File:** `src/app/api/sync/route.ts` (lines 10–26, 29–75):
     - `GET /api/sync`: Returns `db.getAllCollections()`, dumping all database tables—including unmasked complainant and respondent personal details, internal case notes, service requests, and system credentials—to any unauthenticated caller.
     - `POST /api/sync`: Directly executes `db.setCollection(body.key, body.value)` without checking any token, session cookie, or caller identity. Any caller can overwrite or wipe any collection in the database.
   - **Specification Reference:** PRD Section 25.1, Section 8.7, POSH Act Section 16.

2. **Header-Spoofable Access Control & Default `super_admin` in `/api/cases`:**
   - **File:** `src/app/api/cases/route.ts` (lines 87–90):
     ```ts
     const callerRole = req.headers.get("x-user-role") as any || "super_admin";
     const callerOrgId = req.headers.get("x-user-org") || orgId || "SYSTEM";
     const callerId = req.headers.get("x-user-id") || "usr-current";
     ```
     - **Observed:** If a request provides no auth headers or credentials, `callerRole` defaults to `"super_admin"` and `callerOrgId` defaults to `"SYSTEM"`. Any client can forge `x-user-role: super_admin` to access confidential dockets.
     - `PATCH /api/cases` (lines 170–193) has zero authentication or authorization checks, does not invoke `canTransition()`, and allows arbitrary updates to case dockets and states.
   - **Specification Reference:** PRD Section 25, Section 26.1, Constitution Part 2 Rule 4 ("Case access is enforced on the SERVER by a single function (canAccessCase). Hiding buttons in the UI is not security.").

3. **Missing POSH Procedural Lifecycle Endpoints (PRD Section 25.4 & Section 11):**
   - **Observed:** Comparing implemented routes in `src/app/api/` against PRD Section 25:
     - Implemented endpoints in repo: 31 Next.js route files.
     - PRD Section 25 specifies over 80 REST endpoints under `/api/v1`.
     - **Missing case procedural sub-endpoints:**
       - `/posh/cases/{id}/transitions` and `/posh/cases/{id}/transitions/available`
       - `/posh/cases/{id}/timers`, `/timers/{code}/pause`, `/timers/{code}/resume`
       - `/posh/cases/{id}/events`
       - `/posh/cases/{id}/roles`
       - `/posh/cases/{id}/conflicts/declare` and `/conflicts/matches`
       - `/posh/cases/{id}/conciliation`
       - `/posh/cases/{id}/notices` (formal notice generation & proof of service)
       - `/posh/cases/{id}/replies`
       - `/posh/cases/{id}/statements` and `/statements/{sid}/sign`
       - `/posh/cases/{id}/documents/{did}/release`
       - `/posh/cases/{id}/interim`
       - `/posh/cases/{id}/employer-action`
       - `/posh/cases/{id}/appeals`
       - `/posh/cases/{id}/legal-hold`
       - `/posh/cases/{id}/break-glass`
       - `/posh/cases/{id}/retaliation`
       - `/posh/cases/{id}/export`
     - **Missing Auth Endpoints:** `/auth/login`, `/auth/mfa/verify`, `/auth/refresh`, `/auth/logout`, `/auth/forgot`, `/auth/reset`, `/auth/otp/*`.
     - **Missing File Upload Architecture:** PRD Section 25.1 mandates a two-step upload flow (`POST /files/upload-url` returning signed S3/GCS URL + `POST /files/{id}/complete` triggering malware scan). In the codebase, no file upload endpoint exists; evidence in UI is simulated with static client-side metadata.
     - **Missing Realtime Architecture:** PRD Section 25 specifies Socket.io namespace `/rt` with content-free events. The codebase uses SSE (`/api/sync/stream`) broadcasting raw internal mutation objects.

4. **Stubs Returning Hardcoded Dummy JSON:**
   - **`src/app/api/ai/[feature]/route.ts` (lines 32–57):**
     - Feature `timeline_synthesizer` returns static hardcoded events:
       `{ date: "12 Aug 2026", event: "Project sprint kickoff meeting in 3rd Floor conference hall." }, ...`
     - Feature `natural_justice_checklist_verifier` returns static hardcoded checklist items:
       `{ rule: "7-Day Advance Notice of Oral Hearing", status: "PASS", detail: "Notice issued 10 days prior." }, ...`
   - **`src/app/api/signatures/route.ts` (line 27):**
     - Returns a hardcoded static seal hash: `tamperEvidentSeal: "sha256:4b227777d4c88e9182390a1bc294817a"`.
   - **`src/app/api/org/audit-packs/download/route.ts` (lines 30–116):**
     - Returns an entire 11-part inspection manifest composed of hardcoded static mock strings (`cinNumber: "U72200WB2018PTC229871"`, hardcoded branch headcounts, static training metrics, hardcoded acknowledgment receipt `"WB/N24P/POSH/2026/AR-0891"`).
   - **`src/app/api/org/webhooks/route.ts` (lines 29–35):**
     - Returns mock dispatch confirmation (`outboxId: obx-...`) without making any outbound HTTP request.
   - **`src/app/api/scim/v2/Users/route.ts` (lines 142–181):**
     - `PATCH` method logs an audit log and returns a mock user JSON without updating any database record or revoking active sessions.
   - **`src/app/api/admin/slo/route.ts` (lines 14–20):**
     - Returns a hardcoded message: `"Chaos experiment ... executed. Circuit breakers responded within 120ms without data loss."`

5. **Payment Verification Sandbox Bypass & Missing Idempotency:**
   - **File:** `src/app/api/payments/verify/route.ts` (lines 64–73):
     ```ts
     if (!isSignatureValid && isTestMode) {
       if (
         signature.startsWith("sig_test_") ||
         signature.startsWith("mock_") ||
         signature === "test_signature"
       ) {
         isSignatureValid = true;
       }
     }
     ```
     - **Observed:** If `RAZORPAY_KEY_SECRET` is unset, `isTestMode` defaults to `true`. Passing `signature: "test_signature"` verifies any transaction, creates invoice records, and marks orders paid.
     - **Observed:** `POST /api/payments/create-order` and `POST /api/payments/verify` have **no idempotency checks**. Calling verify repeatedly creates duplicate payment transactions and receipts for the same `razorpayPaymentId`.

---

### Category 3: Database & Models vs PRD Data Dictionary

1. **Absence of MongoDB, Mongoose, and Redis:**
   - **Observed:** All database operations run through `src/lib/db.ts` (`ProductionDatabase`), an in-memory class wrapping a single JSON file at `data/acorn-database.json` read with `fs.readFileSync` and persisted with `fs.writeFileSync`.
   - No Mongoose schemas or models exist in the repository.
   - No database indexes (unique, compound, text, TTL) exist.
   - Multi-document transactions (`session.withTransaction`) do not exist.
   - Optimistic concurrency control (`version` field checked against `If-Match` header) is absent.
   - Soft-delete conventions (`isDeleted`, `deletedAt`, `deletedBy`) are absent in `db.ts` (items are directly spliced from arrays).
   - **Specification Reference:** PRD Section 24.1 ("All collections are MongoDB collections accessed through Mongoose models in `/apps/api/src/models`"), Section 24.3 to 24.7.

2. **Unencrypted Sensitive Case Data at Rest:**
   - **File:** `data/acorn-database.json` (lines 226–340):
     - Case records store sensitive details (`complainantEmail`, `complainantPhone`, `respondentEmail`, `respondentPhone`, `incidentLocation`, `natureOfHarassment`, `summary`) as unencrypted plaintext JSON fields.
     - In `src/app/api/cases/route.ts:28-47`, `newCase` assigns `description` directly to `detailedStatement` without calling `encryptNarrative()`.
     - Although `encryptNarrative` exists in `src/lib/crypto.ts`, it is never integrated into `src/lib/db.ts` or `/api/cases`.
   - **Specification Reference:** PRD Section 24.6, Section 24.9 ("Encryption field map: `cases.complaintText`, `cases.respondentResponse`, `cases.incidentLocation`, `cases.incidentDate`, `caseDepositions.transcript`, `caseConciliations.terms` are encrypted with AES-256-GCM at application layer"), Constitution Part 2 Rule 1.

3. **Cross-Tenant Data Exposure in Database Access Methods:**
   - **File:** `src/lib/db.ts` (lines 827–836):
     ```ts
     getCases(orgId?: string): POSHCase[] {
       if (orgId) {
         return this.data.cases.filter((c) => c.orgId === orgId);
       }
       return [...this.data.cases];
     }

     getCaseById(id: string): POSHCase | undefined {
       return this.data.cases.find((c) => c.id === id || c.caseNumber === id);
     }
     ```
     - **Observed:** If `orgId` is omitted, `getCases()` returns cases across all organizations. `getCaseById()` does not accept or enforce `orgId`. Any caller providing a case ID retrieves the case regardless of organization tenancy.
   - **Specification Reference:** PRD Section 24.1, Constitution Part 2 Rule 5 ("Every record carries orgId; every query goes through the tenant-scoped repository. Cross-tenant access throws and is audited.").

---

### Category 4: POSH Rules Engine vs Statutory Specifications

1. **Non-Compliant File Structure & Hardcoded Parameters:**
   - **Observation:** `packages/rules` does not exist. Rules are situated inside `src/lib/rules/` within the frontend Next.js application.
   - `rules.config.ts` does not exist. Statutory deadlines and numbers (90 days, 180 days, 7 working days, 10 working days, 60 days) are hardcoded directly within functions in `src/lib/rules/statutory-timelines.ts`:
     - Line 54: `if (elapsedDays <= 90)`
     - Line 64: `if (elapsedDays <= 180)`
     - Line 90: `while (daysAdded < 7)`
     - Line 107: `while (daysAdded < 10)`
     - Line 123: `date.setDate(date.getDate() + 90)`
     - Line 133: `date.setDate(date.getDate() + 10)`
     - Line 143: `date.setDate(date.getDate() + 60)`
   - No effective-dating mechanism (`effectiveFrom`, `effectiveTo`, `ruleSetVersion`) exists.
   - **Specification Reference:** PRD Section 8.30, Section 23, `acorn-rules-engine-engineer/SKILL.md` ("Statutory numbers only in `rules.config.ts`, effective-dated. Flag NEEDS HUMAN REVIEW and list every number for counsel to verify in `docs/RULES_FOR_COUNSEL.md`.").

2. **Incomplete Statutory Timers (Missing 15 of 21 Timers):**
   - **File:** `src/lib/rules/statutory-timelines.ts` contains only 6 calculator functions (`calculateNoticeDueDate`, `calculateReplyDueDate`, `calculateInquiryDueDate`, `calculateReportDueDate`, `calculateImplementationDueDate`, `calculateAppealDueDate`).
   - **Missing Timers from PRD Section 8.16.1 (TM-01 to TM-21):**
     - TM-03: Acknowledgement timer (1 business day)
     - TM-04: Triage timer (7 calendar days)
     - TM-07: Hearing notice lead time timer (min 7 days)
     - TM-12: Interim relief decision timer
     - TM-13: Notice before ex parte action timer (3 consecutive notices before ex parte)
     - TM-14: Interim leave limit timer (up to 3 months)
     - TM-15: IC member tenure expiry timer (3 years statutory limit under Section 4(3))
     - TM-16: Annual report filing timer (due by January 31 under Section 21)
     - TM-17: Board's Report disclosure data timer
     - TM-18: Awareness training cycle timer
     - TM-19: Aftercare check-in timers (30/60/90 days post-closure)
     - TM-20: Retention review timer
     - TM-21: Draft complaint expiry timer (14 days)
   - **Specification Reference:** PRD Section 8.16.1.

3. **Missing Holiday Union & Working Day Rules:**
   - **File:** `src/lib/rules/statutory-timelines.ts` (lines 90–96, 107–113):
     Working day calculation only checks `dayOfWeek !== 0 && dayOfWeek !== 6`.
     - **Observed:** Calcutta High Court annual vacation calendars, West Bengal state gazetted holidays, and national holidays are not loaded or unioned into the working day calculations.
     - **Observed:** Clock-stop grounds (PRD Section 8.16.3: conciliation pause, ex parte notice wait period, legal stay, medical incapacitation) are not supported.
   - **Specification Reference:** PRD Section 8.16.2 & Section 8.16.3.

4. **Incomplete State Machine & Missing Typed Guards (T01 to T30):**
   - **File:** `src/lib/rules/state-machine.ts`:
     - Defines 16 custom states (`CaseState`).
     - **Missing Statutory States from PRD Section 8.15.1:** `DRAFT`, `LATE_REVIEW`, `AWAITING_INFO`, `CONCILIATION`, `LEGAL_STAY`, `DELIBERATION`, `REPORT_ISSUED`, `ACTION_PENDING`, `ACTION_COMPLETED`, `APPEAL_WINDOW`, `APPEAL_FILED`, `REFERRED_LC`, `REJECTED`.
     - **Missing Transitions & Typed Guards:** PRD Section 8.15.2 and Section 23 define transitions T01 to T30 with strict typed guards (checking required fields, OTP confirmation, quorum validation, non-monetary settlement validation, limitation check, employer implementation verification). `canTransition` in `src/lib/rules/state-machine.ts:114-118` executes only a flat array search (`ALLOWED_TRANSITIONS.some(...)`) without evaluating any guard conditions or executing transition side effects.

5. **Total Absence of Applicability & Routing Engine (RT-01 to RT-21):**
   - **Observation:** PRD Section 8.11 and Section 23 specify routing rules RT-01 through RT-21 (determining jurisdiction between Internal Committee, Local Committee, criminal referral under Section 19(h), third-party employer routing, minor complainant / POCSO routing, and multiple branch routing).
   - **Observed:** No routing engine exists anywhere in `src/lib/rules/` or elsewhere in the codebase.
   - **Specification Reference:** PRD Section 8.11, Section 23, `acorn-rules-engine-engineer/SKILL.md` ("routing RT-01 to RT-21").

---

### Category 5: Code Completeness & API Standards

1. **Missing Standard Error Envelope:**
   - All API routes in `src/app/api/` return flat or non-standard objects (e.g. `{ error: "..." }` or `{ error: "...", details: "..." }`).
   - None conform to the PRD Section 25.1 schema:
     ```json
     {
       "error": {
         "code": "ERROR_CODE",
         "message": "Human readable message",
         "details": [],
         "requestId": "..."
       }
     }
     ```
   - No `X-Request-Id` header is injected by API routes.

2. **Missing Pagination Across Endpoints:**
   - `GET /api/cases`, `GET /api/requests`, `GET /api/services`, `GET /api/posts`, `GET /api/faq`, `GET /api/rules` return unpaginated full arrays. None support `page`, `pageSize`, `limit`, or cursor parameters.

3. **Missing Concurrency Control:**
   - No endpoints support `If-Match` version checking or optimistic locking. Concurrent updates overwrite each other.

---

### Category 6: Test Suite Deficiencies

1. **Missing Standard Test Frameworks:**
   - `package.json` contains no test runner packages (`jest`, `vitest`, `mocha`, `supertest`, `@playwright/test`).
   - `tests/click-diag.spec.ts` imports `@playwright/test`, but running it fails because `@playwright/test` is not installed.
2. **Missing Rules Engine Test Matrix:**
   - `acorn-rules-engine-engineer/SKILL.md` requires a table-driven test suite of 40 scenarios covering month-end, leap year, holidays, limitation extensions, and conciliation pause/resume. `scripts/test-unit.mjs` only tests 5 basic static checks in a Node VM.

---

## 2. Logic Chain

1. **From Observation 1.1 to Architectural Assessment:**
   Because `apps/api`, `packages/rules`, and `packages/shared` are absent, and dependencies `express`, `mongoose`, `ioredis`, and `zod` are not installed, the repository currently operates as a monolithic Next.js web application rather than the multi-package MERN architecture mandated by PRD Section 9, 24, 25, and 27.

2. **From Observations 1.3, 1.4, 2.1, and 2.2 to Security Severity Assessment:**
   - In `src/middleware.ts`, checking `userAgent.includes("RouteCrawler")` or `x-bypass-auth === "true"` creates a permanent authentication bypass accessible to any HTTP client.
   - Because `src/middleware.ts` ignores `/api/*`, all API routes depend entirely on per-route guards.
   - In `src/app/api/sync/route.ts`, `GET` and `POST` lack any authentication, allowing unauthenticated callers to exfiltrate or wipe all platform data.
   - In `src/app/api/cases/route.ts`, defaulting `callerRole` to `"super_admin"` allows arbitrary callers to view Section 16 protected dockets simply by omitting or forging `x-user-role`.
   - Therefore, the application exhibits **CRITICAL** confidentiality, authorization, and data integrity vulnerabilities that violate Section 16 of the POSH Act 2013 and Constitution Rules 4 & 5.

3. **From Observations 1.2 and 2.5 to Integrity Assessment:**
   - Because fallback default secrets are hardcoded in code and Zod startup validation is missing, missing environment variables in production fail silently while using known, publicly visible cryptographic keys.
   - Because `payments/verify/route.ts` accepts simulated signatures when `RAZORPAY_KEY_SECRET` is unset, and lacks idempotency, financial reconciliations are vulnerable to forged payment confirmations and duplicate receipt generation.

4. **From Observations 3.1, 3.2, and 3.3 to Database Assessment:**
   - Storing all data in a single flat file `data/acorn-database.json` without MongoDB, indexes, or transactions restricts the system to single-process deployments and risks race conditions and data corruption under concurrent load.
   - Storing case narratives and personal contact data in plaintext JSON without application-layer AES-256-GCM encryption violates PRD Section 24.6 and Section 26.4.
   - `db.getCaseById()` and `db.getCases()` without mandatory tenant scoping allow cross-tenant data leakage.

5. **From Observations 4.1 through 4.5 to Rules Engine Assessment:**
   - The absence of `packages/rules` and `rules.config.ts` means statutory rules cannot be versioned or audited independently of UI code.
   - Hardcoding calendar calculations without West Bengal holidays or High Court vacation calendars causes statutory deadline miscalculations (e.g. Rule 7(2) 7-day notice due dates calculated across court vacations).
   - The absence of TM-03 to TM-21, RT-01 to RT-21, and transition guards T01 to T30 means the statutory workflow engine cannot enforce compliance with the POSH Act.

---

## 3. Caveats

1. **Frontend Presentation Scope:** This audit investigated the backend APIs, database models, rules engine, and security layer. Pure frontend styling, layout aesthetics, and design tokens were examined only where they interfaced with API routes or authentication gates.
2. **Runtime Production Load Testing:** Analysis was performed via static code inspection and local test script execution. High-concurrency load testing (e.g. k6 / autocannon) was not executed in this survey turn.
3. **External Cloud Integrations:** Integrations with Razorpay, AWS KMS, DLT SMS gateways, and cloud secret managers were audited based on repository code, as live external credentials are not stored in the repository per Constitution rules.

---

## 4. Conclusion & Itemized Remediation Schedule

### Summary Table of Findings

| Gap ID | Component / File Path | Line(s) | PRD / Standard Ref | Severity | Description | Remediation Steps |
|---|---|---|---|:---:|---|---|
| **GAP-SEC-01** | `src/middleware.ts` | 21–25, 51–55 | PRD Sec 26.1, AGENTS.md Part 2 | **CRITICAL** | Middleware auth bypass backdoor via `RouteCrawler` user agent or `x-bypass-auth: true` header. | Remove lines 21–25 and `!isCrawlerOrTest` check immediately. Require valid signed session token for all protected routes. |
| **GAP-SEC-02** | `src/app/api/sync/route.ts` | 10–75 | PRD Sec 25, POSH Act Sec 16 | **CRITICAL** | `/api/sync` exposes entire database (unmasked PII & cases) via unauthenticated GET, and allows arbitrary database overwrite via unauthenticated POST. | Restrict `/api/sync` to authenticated Super Admin session; remove raw collection dump; filter PII; validate payloads with Zod. |
| **GAP-SEC-03** | `src/app/api/cases/route.ts` | 87–90, 170–193 | PRD Sec 25, Constitution Part 2 Rule 4 | **CRITICAL** | `x-user-role` header spoofing defaults to `super_admin` in `GET /api/cases`. `PATCH /api/cases` has no authentication and allows arbitrary state changes. | Extract user identity and role solely from verified session cookies on the server; remove HTTP header fallbacks; invoke `canTransition()` and verify IC quorum. |
| **GAP-SEC-04** | `src/lib/session.ts`, `src/app/api/admin/login/route.ts` | `session.ts:52-58`, `login:50,60,88` | PRD Sec 26.2, 26.3 | **CRITICAL** | Plaintext admin passwords stored in code; literal `"••••••••••••"` accepted; TOTP MFA is a mock 6-digit regex; session cookies issued with `httpOnly: false`. | Hash passwords with Argon2id; implement true RFC 6238 TOTP using `otplib`; issue cookies with `httpOnly: true` and `SameSite: strict`. |
| **GAP-SEC-05** | `src/lib/crypto.ts`, `src/lib/session.ts`, `payments/verify`, `webhooks/razorpay` | `crypto:5-6`, `session:20-23`, `verify:6`, `webhooks:5-8` | PRD Sec 27.3, Constitution Part 2 Rule 7 | **HIGH** | Hardcoded default fallback secrets throughout crypto, auth, and payment modules. No startup environment validation schema. | Implement Zod environment schema in `src/lib/env.ts` validating all required secrets at boot; throw and halt process if any secret is missing; remove all default secrets. |
| **GAP-DB-01** | `src/lib/db.ts`, `data/acorn-database.json` | Full file | PRD Sec 24.1, Sec 9.2 | **HIGH** | Database is a single flat JSON file loaded into memory. No MongoDB, Mongoose models, indexes, or transactions. | Build Mongoose models in `apps/api/src/models` (or `src/models`) matching PRD Section 24; implement MongoDB Atlas connection with replica set transactions. |
| **GAP-DB-02** | `src/lib/db.ts`, `data/acorn-database.json`, `src/app/api/cases/route.ts` | `db.ts:226-340`, `cases:28-47` | PRD Sec 24.6, 24.9, POSH Act Sec 16 | **HIGH** | Case narratives, detailed statements, and PII are stored in plaintext JSON without application-layer AES-256-GCM encryption. | Integrate `encryptNarrative` and `decryptNarrative` from `src/lib/crypto.ts` into case storage lifecycle; compute blind indexes for exact-match lookups. |
| **GAP-DB-03** | `src/lib/db.ts` | 827–836 | PRD Sec 24.1, Constitution Part 2 Rule 5 | **HIGH** | `db.getCases()` returns all cases across all tenants if `orgId` is omitted. `db.getCaseById()` performs no tenant scoping. | Enforce mandatory `orgId` parameter in repository layer; throw error and audit if cross-tenant query is attempted. |
| **GAP-RUL-01** | `src/lib/rules/`, `packages/rules` | N/A | PRD Sec 8.30, Sec 23, `acorn-rules-engine-engineer` | **HIGH** | `packages/rules` and `rules.config.ts` do not exist. Statutory numbers are hardcoded directly in functions without effective dating. | Create standalone pure TypeScript package `packages/rules` (or isolated engine) with `rules.config.ts` listing all statutory parameters with `effectiveFrom` dates. |
| **GAP-RUL-02** | `src/lib/rules/statutory-timelines.ts` | Full file | PRD Sec 8.16.1 | **HIGH** | 15 of 21 statutory timers missing (TM-03, TM-04, TM-07, TM-12 to TM-21). | Implement complete timer registry TM-01 to TM-21 with plain-language explanations, alert offsets, and overdue states. |
| **GAP-RUL-03** | `src/lib/rules/statutory-timelines.ts` | 90–96, 107–113 | PRD Sec 8.16.2, 8.16.3 | **MEDIUM** | Working day maths only skips weekends; ignores Calcutta High Court vacation calendars and state gazetted holidays. No clock-stop grounds. | Implement calendar engine with court vacation and holiday union; add clock-stop grounds (conciliation pause, ex parte notice wait, legal stays). |
| **GAP-RUL-04** | `src/lib/rules/state-machine.ts` | 7–23, 114–118 | PRD Sec 8.15.1, 8.15.2, Sec 23 | **HIGH** | State machine missing PRD states (`DRAFT`, `LATE_REVIEW`, `AWAITING_INFO`, `LEGAL_STAY`, `DELIBERATION`, `REPORT_ISSUED`, `ACTION_PENDING`, `ACTION_COMPLETED`, etc.) and all transitions T01 to T30 with typed guards. | Implement exhaustive state machine with all 19 states and transitions T01–T30 with typed guards enforcing statutory requirements. |
| **GAP-RUL-05** | `src/lib/rules/` | N/A | PRD Sec 8.11, Sec 23 | **HIGH** | Total absence of Applicability and Routing Engine (RT-01 to RT-21). | Build routing engine evaluating workplace headcount, employer respondent status, unorganised sector nexus, and multi-branch jurisdiction. |
| **GAP-API-01** | `src/app/api/ai/[feature]/route.ts` | 32–57 | PRD Sec 25 | **MEDIUM** | AI feature endpoint returns hardcoded dummy JSON strings for timeline and natural justice verification. | Wire AI endpoint to real server-side timeline synthesis engine and natural justice checklist evaluator. |
| **GAP-API-02** | `src/app/api/signatures/route.ts` | 27 | PRD Sec 25 | **MEDIUM** | Digital signature endpoint returns a static hardcoded hash `"sha256:4b227777d4c88e9182390a1bc294817a"`. | Compute dynamic cryptographic digital seal using `generateDigitalSeal()` over document content and signer metadata. |
| **GAP-API-03** | `src/app/api/org/audit-packs/download/route.ts` | 30–116 | PRD Sec 38.2 | **MEDIUM** | Audit pack download returns static mock manifest with fake CIN, static headcount, and hardcoded receipt strings. | Dynamically aggregate the 11-part manifest from live database records, case dockets, training sessions, and committee rosters. |
| **GAP-API-04** | `src/app/api/org/webhooks/route.ts`, `src/app/api/scim/v2/Users/route.ts` | `webhooks:29-35`, `scim:142-181` | PRD Sec 25, RFC 7644 | **MEDIUM** | Webhook POST returns mock ID without HTTP dispatch. SCIM PATCH returns mock user without updating status or revoking session. | Implement real outbound webhook dispatcher with HMAC signature; implement true SCIM user provisioning and deactivation. |
| **GAP-API-05** | `src/app/api/payments/verify/route.ts` | 64–73, 82–129 | PRD Sec 25, Constitution Part 2 Rule 8 | **HIGH** | Payment verification accepts fake signatures (`sig_test_`, `mock_`, `test_signature`) in test mode and has no idempotency checks. | Remove fake signature acceptance; enforce strict HMAC-SHA256 signature verification; add Redis/DB idempotency key checking on `razorpayPaymentId`. |
| **GAP-API-06** | `src/app/api/*` | All route files | PRD Sec 25.1 | **MEDIUM** | Missing standard error envelope `{ error: { code, message, details, requestId } }`, missing pagination (`page`, `pageSize`), missing `If-Match` concurrency. | Create unified API helper in `src/lib/api-response.ts` enforcing standardized error envelopes, pagination meta, and `X-Request-Id` headers. |
| **GAP-TST-01** | `package.json`, `tests/` | `package.json:15-19`, `tests/click-diag.spec.ts` | PRD Sec 14, Sec 29 | **HIGH** | No standard test runner installed (`jest`, `vitest`, `playwright`). Only custom node VM scripts exist. `@playwright/test` referenced but uninstalled. | Install Vitest/Jest and Playwright; configure CI test runners for unit, integration, and contract test suites. |

---

## 5. Verification Method

To independently verify all findings and validate future remediations:

1. **Verify Middleware Backdoor:**
   ```powershell
   # Attempt to access protected admin page with backdoor header:
   curl -I http://localhost:3000/admin -H "x-bypass-auth: true"
   # Expected without backdoor: HTTP 307 redirect to /admin/login.
   # Observed defect: Returns HTTP 200 OK.
   ```

2. **Verify Database Exfiltration via `/api/sync`:**
   ```powershell
   curl http://localhost:3000/api/sync
   # Observed defect: Returns HTTP 200 with full unmasked database contents including all case dockets.
   ```

3. **Verify Header Spoofing in `/api/cases`:**
   ```powershell
   curl "http://localhost:3000/api/cases?id=ACN-POSH-2026-0041" -H "x-user-role: super_admin"
   # Observed defect: Returns full case details without requiring any authentication cookie or token.
   ```

4. **Verify Plaintext Secrets and Credentials in Code:**
   ```powershell
   node -e "const fs = require('fs'); const content = fs.readFileSync('src/lib/session.ts', 'utf8'); console.log(content.includes('AcornLegal@2026'));"
   # Returns: true
   ```

5. **Verify Hardcoded Stubs:**
   - Inspect `src/app/api/ai/[feature]/route.ts` line 36 to verify static hardcoded timeline array.
   - Inspect `src/app/api/signatures/route.ts` line 27 to verify static hash string.
   - Inspect `src/app/api/payments/verify/route.ts` line 69 to verify simulated signature acceptance.

6. **Verify Rules Engine Completeness:**
   - Check existence of `packages/rules`:
     ```powershell
     Test-Path "packages/rules"
     # Returns: False
     ```
   - Check for TM-03 through TM-21 in `src/lib/rules/statutory-timelines.ts`:
     ```powershell
     Select-String -Path "src/lib/rules/statutory-timelines.ts" -Pattern "calculateTriageDueDate|calculateNoticeBeforeExParte"
     # Returns: None (functions do not exist)
     ```
