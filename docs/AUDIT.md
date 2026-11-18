# Acorn Legal Consultants — Comprehensive Codebase & Architecture Audit

## 1. Title & Document Metadata
- **Document Title:** Acorn Legal Consultants — Comprehensive Codebase & Architecture Audit
- **Audit Date:** November 18, 2026
- **Status:** Baseline Architectural Audit Complete (Milestone 1 Deliverable)
- **Author / Auditor:** Teamwork Audit Synthesis & Forensic Verification (`teamwork_worker_audit_2`)
- **Primary Specifications Audited Against:**
  - `docs/PRD.md` (Product Requirements Document v2.0 & v3.0, including Sections 8, 9, 11, 23, 24, 25, 26, 27, 34, 36, 38)
  - `docs/DESIGN_SYSTEM.md` (Quiet Authority Blue-and-Ivory Design Tokens & Calm Mode)
  - `.agents/AGENTS.md` (Project Constitution: Part 1 Frontend Rules, Part 2 Application Layer Rules, Part 3 Launch & Operations Rules)
  - `docs/PLAYBOOK.md` (Parts B & C: Prompts B0 through B17)
  - Domain Skills: `acorn-codebase-auditor`, `acorn-backend-architect`, `acorn-rules-engine-engineer`, `acorn-auth-security-engineer`, `acorn-posh-confidentiality-reviewer`, `acorn-ops-console-builder`, `acorn-test-engineer`
- **Integrity Mode:** Genuine Architectural Synthesis / Non-Compromised Forensic Baseline

---

## 2. Executive Summary

A comprehensive, forensic audit of the Acorn Legal Consultants web platform repository was conducted to establish a verified baseline of the current implementation against project requirements, architectural specifications, statutory legal mandates under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act 2013 ("POSH Act 2013"), and enterprise software security standards.

The audit revealed an extensive, fully routable, visually cohesive Next.js 14 application serving 143 HTTP endpoints without runtime crashes. However, beneath the polished visual presentation, the audit uncovered **critical architectural compromises, catastrophic security vulnerabilities, widespread client-side functional stubs, and complete deviations from specified backend and statutory rules engines**.

### High-Level Categorical Synthesis

| Area | Status | Critical / High Gaps | Summary Assessment |
|---|:---:|:---:|---|
| **Security, Authentication, RBAC & POSH Confidentiality** | ⚠️ **UNACCEPTABLE RISK** | 5 Critical, 4 High | Catastrophic data leak of all POSH dockets on public homepage over `/api/sync`; middleware authentication bypass backdoors (`RouteCrawler`, `x-bypass-auth`); header-spoofed identity defaulting to `super_admin`; plaintext passwords; mock MFA regex; audit log truncation; and complete absence of server-enforced tenant scoping. Violates Section 16 POSH Act and Constitution Part 2. |
| **Backend / API Architecture & Data Persistence** | ⚠️ **FAILED SPECIFICATION** | 4 High, 3 Medium | Single flat JSON file (`data/acorn-database.json`) without MongoDB, Mongoose models, or Redis caching (violating PRD Section 9/24); unencrypted sensitive complaint narratives at rest; missing over 50 REST endpoints; static mock APIs; payment verification signature bypass; missing standardized error envelopes. |
| **POSH Rules Engine & Statutory Compliance** | ⚠️ **NON-COMPLIANT** | 4 High, 2 Medium | Standalone `packages/rules` and `rules.config.ts` do not exist; statutory timelines hardcoded in UI utility files without effective dating; 15 of 21 statutory timers missing; calendar maths ignores Calcutta High Court vacation calendars and gazetted holidays; state machine lacks 13 statutory states and guards T01–T30; 100% missing applicability/routing engine (RT-01 to RT-21). |
| **Operations Console (/ops) & Reliability** | ⚠️ **DEFICIENT** | 2 High, 4 Medium | Missing dedicated `/ops` root route; missing 11-step CERT-In 6-hour countdown incident response workflow; insecure client-only break-glass with hardcoded PIN `"ACORN-9900"` and no dual approval; mocked DR drills and chaos tests returning static simulation strings; decoupled 17-item Go-Live gate. |
| **Frontend, Design System & Accessibility** | ⚠️ **HIGH DEFECTS** | 2 Critical, 4 High, 3 Med | Client-side payment fallback bypass generating valid receipts on adblocker/failure; global `Escape` key hijacking redirecting all website visitors to Google Kolkata weather; pre-filled dummy affirmation OTP `"881240"`; dropped service request and respondent exhibit uploads; 30/41 admin screens lacking server persistence; Banned UI violations (infinite marquee, chat widget, repeating pulses); WCAG 2.1 AA focusable collapsed links. |

### Architectural Dichotomy: Reality vs. Specification

```
┌──────────────────────────────────────────────────────────┐
│                   PRD MANDATED TARGET                     │
│  pnpm Monorepo:                                          │
│  - /apps/api (Node/Express, MongoDB Mongoose, Redis)     │
│  - /apps/web (Next.js Public Marketing & Portals)        │
│  - /apps/admin (Dense Ops Console)                       │
│  - /packages/rules (Pure TS, effective-dated config)     │
│  - /packages/shared (Zod schemas, RBAC contracts)        │
└──────────────────────────────────────────────────────────┘
                            VS
┌──────────────────────────────────────────────────────────┐
│                   CURRENT REPOSITORY                      │
│  Single Next.js 14 Monolith:                             │
│  - UI, Admin, POSH Portals in src/app/                   │
│  - Database: In-memory class ProductionDatabase          │
│  - Storage: Single flat JSON data/acorn-database.json    │
│  - State Sync: SSE /api/sync/stream dumping raw store    │
│  - Rules: Hardcoded utility functions in src/lib/rules/  │
└──────────────────────────────────────────────────────────┘
```

---

## 3. Platform Architecture Baseline

### 3.1 Actual Detected Stack
- **Framework & Runtime:** Next.js `14.2.18` (App Router architecture with React Server Components and `"use client"` directives). *Note: An earlier document incorrectly stated Next.js 14.2.35.*
- **Core UI Libraries:** React `18.3.1`, React-DOM `18.3.1`.
- **Language & Type Checking:** TypeScript `5.6.3` configured with `"strict": true`, `"moduleResolution": "bundler"`, and alias path `"@/*": ["./src/*"]`.
- **Styling Architecture:** Tailwind CSS `3.4.14` with PostCSS `8.4.47`. Tokens are declared in `tailwind.config.ts` and `src/app/globals.css`.
- **Runtime Utilities:** `clsx` `^2.1.1`, `tailwind-merge` `^2.5.4`, `lucide-react` `^0.454.0`, `date-fns` `^3.6.0`.
- **Build Configurations & Suppression Gates:**
  - `next.config.mjs:10-12`: Contains `eslint: { ignoreDuringBuilds: true }`. ESLint errors and warnings are completely suppressed during production builds.
  - `next.config.mjs:7-9`: Contains `images: { unoptimized: true }`. Next.js automatic image optimization, responsive `srcset` generation, and WebP/AVIF format conversions are disabled.
  - `package.json:6-7`: `scripts/patch-next.js` runs automatically in `postinstall` and `prebuild` to monkey-patch vendor files inside `node_modules` (`@next/font/dist/google/loader.js`, `next/dist/server/require.js`, `next/dist/build/collect-build-traces.js`).

### 3.2 Monorepo Specification Mismatch (PRD Section 9)
PRD Section 9.3 mandates a structured pnpm workspaces monorepo:
- `/apps/api` (Node, Express, MongoDB Mongoose models, Redis caching, Socket.io)
- `/apps/web` (Next.js public marketing, citizen assistance, and POSH complainant portals)
- `/apps/admin` (Dense operations console, litigation triage, IC presiding officer desk)
- `/packages/rules` (Pure TypeScript statutory rules engine, zero external dependencies)
- `/packages/shared` (Zod schemas, permission matrices, cryptographic utilities)
- `/packages/contracts` (OpenAPI specification and generated client bindings)

**Current Reality:** The repository is a single Next.js 14 application. Directories `/apps`, `/packages`, and `/infra` do not exist. All public, administrative, and legal compliance routes reside together under `src/app/`. Dependencies required by the PRD (`express`, `mongoose`, `ioredis`, `zod`, `pino`, `helmet`, `cors`, `socket.io`) are entirely absent from `package.json`.

### 3.3 Database & Caching Specification Mismatch (PRD Section 24)
PRD Section 24 mandates MongoDB Atlas with replica sets, strict Mongoose schemas, document indexes, multi-document transactions, and Redis-backed session and cache layers.

**Current Reality:** Database persistence is managed by an in-memory class `ProductionDatabase` (`src/lib/db.ts`) that reads and synchronously writes a single flat JSON file located at `data/acorn-database.json` (`fs.readFileSync` / `fs.writeFileSync`). There is no MongoDB connection, no Mongoose validation, no Redis cache, no optimistic concurrency control (`If-Match`), no database transactions, and no database indexing. In a containerized or multi-instance deployment, this architecture suffers from split-brain data corruption and race conditions.

---

## 4. Comprehensive Surface & Route Inventory

A comprehensive HTTP crawl verified that **143 routes** respond with HTTP `200 OK` across the platform, and **126 discovered internal links** were verified with 0 dead links.

### 4.1 Public Marketing & Citizen Assistance Routes (25 Routes)
1. `/` — Chambers Homepage (Hero with custom canvas, Chambers ethos, Practice areas, Leadership roster, Case tracker teaser, Footer)
2. `/about` — Heritage, Counsel profiles, Kolkata chambers narrative, High Court practice ethos
3. `/services` — Practice Area Directory (advisory, documentation, dispute resolution, representation, corporate commercial, POSH compliance)
4. `/services/[slug]` — Dynamic service area deep-dives with statutory context and advisory scope
5. `/practice-areas` — Comprehensive legal taxonomy and statutory classifications
6. `/blog` — Legal Insights, statutory updates, and whitepapers
7. `/blog/[slug]` — Individual insight articles (e.g. POSH annual return filing guide, hybrid workplace jurisdiction, Rajarhat title due diligence)
8. `/faq` — Structured Q&A addressing retainer terms, dispute timelines, and consultation protocol
9. `/contact` — Chambers coordinates, appointment scheduler, interactive chambers map
10. `/request-service` — Client intake and formal legal engagement request wizard
11. `/qa` — Public legal inquiry submission interface with moderation queue
12. `/verify` — Document and fee certificate verification gateway
13. `/verify/[code]` — Dynamic document verification result
14. `/help` — Citizen legal assistance guide
15. `/help/directory` — Public legal resource directory and judicial contact list
16. `/pay` — Retainer and consultation fee payment gateway (Razorpay checkout)
17. `/pay/status/[id]` — Live payment status, GST tax invoice download, transaction confirmation
18. `/privacy` — Client data confidentiality policy under IT Act and DPDP Act 2023
19. `/terms` — Terms of engagement and retainer advisory parameters
20. `/disclaimer` — Mandatory Bar Council of India Rule 36 disclaimer
21. `/cookies` — Technical cookie usage disclosure
22. `/refund-policy` — Advance retainer and consultation fee adjustment policies
23. `/governance/charters` — Corporate governance models and board advisory guidelines
24. `/governance/pathways` — Dispute resolution timelines and ADR frameworks
25. `/governance/sectors` — Sector-specific regulatory frameworks (real estate, technology, healthcare)

### 4.2 POSH Compliance Portals (53 Routes)
- **Intake & Orientation (4 routes):**
  `/posh`, `/posh/start`, `/posh/file`, `/posh/file/sign`, `/posh/file/done`
- **Complainant Tracking & Procedural Motions (6 routes):**
  `/posh/my-case`, `/posh/my-case/docs`, `/posh/my-case/interim`, `/posh/my-case/request`, `/posh/my-case/support`, `/posh/portal`
- **Respondent Formal Desk (2 routes):**
  `/posh/respondent`, `/posh/respondent/reply`
- **Whistleblower & Anonymous Reporting (3 routes):**
  `/posh/concern`, `/posh/retaliation`, `/posh/anonymous`, `/posh/channels`
- **Internal Committee (IC) Case Dockets & Workspace (14 routes):**
  `/posh/ic`, `/posh/ic/guide`, `/posh/ic/declarations`, `/posh/ic/cases/[id]`, `/posh/ic/cases/[id]/hearings/[hid]/room`, `/posh/ic/cases/[id]/ai-assistant`, `/posh/ic/cases/[id]/conciliation`, `/posh/ic/cases/[id]/report`, `/posh/ic/cases/[id]/evidence`, `/posh/ic/cases/[id]/timeline`, `/posh/ic/cases/[id]/notices`, `/posh/ic/cases/[id]/deliberation`, `/posh/ic/cases/[id]/interim`, `/posh/ic/cases/[id]/appeals`
- **Employer Organisation Compliance Portal (16 routes):**
  `/posh/org`, `/posh/org/prevention`, `/posh/org/reports`, `/posh/org/support`, `/posh/org/training`, `/posh/org/actions`, `/posh/org/policies`, `/posh/org/webhooks`, `/posh/org/surveys`, `/posh/org/branding`, `/posh/org/benchmarks`, `/posh/org/early-warnings`, `/posh/org/integrations`, `/posh/org/sso`, `/posh/org/audit-packs`, `/posh/org/api-keys`, `/posh/org/notices`
- **Administrative Controls & Retention (8 routes):**
  `/posh/admin/cases`, `/posh/admin/aftercare`, `/posh/admin/breakglass`, `/posh/admin/retention`, `/posh/admin/supervision`, `/posh/admin/tenants`, `/posh/signatures`

### 4.3 Staff Operations & Admin Consoles (41 Routes)
`/admin`, `/admin/login`, `/admin/requests`, `/admin/requests/[id]`, `/admin/cases`, `/admin/delivery`, `/admin/payments`, `/admin/payment-links`, `/admin/subscriptions`, `/admin/directory`, `/admin/catalogue`, `/admin/kb`, `/admin/lms/courses`, `/admin/questions`, `/admin/faq`, `/admin/services`, `/admin/legal/rules`, `/admin/legal/register`, `/admin/legal/templates`, `/admin/legal/watch`, `/admin/legal/calendars`, `/admin/ops`, `/admin/ops/dr`, `/admin/ops/gate`, `/admin/ops/reliability`, `/admin/ops/sop`, `/admin/trust`, `/admin/media`, `/admin/pages`, `/admin/posts`, `/admin/scripts`, `/admin/seo`, `/admin/site`, `/admin/surveys`, `/admin/users`, `/admin/audit`, `/admin/notifications`, `/admin/reports`, `/admin/settings`

---

## 5. Categorized In-Depth Finding Sections

### Section A: Security, Authentication, RBAC & POSH Confidentiality

#### Finding A.1: Catastrophic Homepage Data Leak over `/api/sync`
- **Affected Files & Lines:** `src/app/page.tsx:27`, `src/lib/realtime.ts:156-159, 244, 271-273`, `src/app/api/sync/route.ts:10-26`
- **Severity Rating:** **CRITICAL**
- **Specification / Statutory Citation:** Section 16 POSH Act 2013; Constitution Part 2 Rules 1, 2, 4; PRD Section 25.1.
- **Description of Gap:**
  The public chambers homepage (`src/app/page.tsx:27`) imports and executes `useRealtimeSiteConfig()`. In `src/lib/realtime.ts:244`, this hook calls `ensureGlobalSSE()`. On cold load, `ensureGlobalSSE()` triggers `syncBackendDatabase()`, which performs an unauthenticated `fetch("/api/sync")`.
  In `src/app/api/sync/route.ts:10-19`:
  ```typescript
  export async function GET() {
    const allData = db.getAllCollections();
    return NextResponse.json({ success: true, timestamp: ..., database: "active", data: allData });
  }
  ```
  `db.getAllCollections()` dumps the entire contents of `data/acorn-database.json`—including unmasked complainant identities, respondent details, allegation narratives, hearing minutes, witness statements, service inquiries, and internal audit logs—directly into the browser memory of any anonymous visitor browsing `https://acornlegal.in/`.
- **Actionable Remediation:**
  1. Immediately remove `GET /api/sync` or restrict it exclusively to public marketing collections (`siteConfig`, `faqs`, `services`, `posts`).
  2. Disallow any serialization of `cases`, `auditLogs`, `users`, or `serviceRequests` over unauthenticated endpoints.
  3. Require server-verified Super Admin session tokens for any database administrative synchronization.

#### Finding A.2: Middleware Authentication Bypass Backdoor via `RouteCrawler` & `x-bypass-auth`
- **Affected Files & Lines:** `src/middleware.ts:21-25, 43-79`
- **Severity Rating:** **CRITICAL**
- **Specification Citation:** PRD Section 25, Section 26.1; Skill `acorn-auth-security-engineer`.
- **Description of Gap:**
  In `src/middleware.ts:21-25`:
  ```typescript
  const userAgent = request.headers.get("user-agent") || "";
  const isCrawlerOrTest =
    userAgent.includes("RouteCrawler") ||
    request.headers.get("x-bypass-auth") === "true";
  ```
  And in lines 51-55 & 75:
  ```typescript
  if (!hasAdminSession && !isCrawlerOrTest) {
    return NextResponse.redirect(loginUrl);
  }
  if (!hasPoshSession && !isCrawlerOrTest) {
    return NextResponse.redirect(loginUrl);
  }
  ```
  Any HTTP client supplying `User-Agent: RouteCrawler` or header `x-bypass-auth: true` completely bypasses authentication redirects on all `/admin/*` and `/posh/*` routes.
  Furthermore, `middleware.ts` ignores `/api/*` routes entirely, leaving all API endpoints without edge middleware verification.
- **Actionable Remediation:**
  1. Delete lines 21-25 and all `isCrawlerOrTest` checks from `src/middleware.ts`.
  2. Require verified session cookies (`acorn_admin_session`, `acorn_posh_session`) for all administrative and POSH console routes.
  3. Update automated test crawlers (`scripts/verify-all.mjs`) to authenticate properly via `/api/admin/login` and pass genuine session cookies.

#### Finding A.3: Server Identity Spoofing & Default `super_admin` in Cases API
- **Affected Files & Lines:** `src/app/api/cases/route.ts:87-90, 170-193`
- **Severity Rating:** **CRITICAL**
- **Specification Citation:** PRD Section 25, Section 26.1; Constitution Part 2 Rule 4 ("Case access is enforced on the SERVER by a single function (canAccessCase). Hiding buttons in the UI is not security.").
- **Description of Gap:**
  In `src/app/api/cases/route.ts:87-90`:
  ```typescript
  const callerRole = req.headers.get("x-user-role") as any || "super_admin";
  const callerOrgId = req.headers.get("x-user-org") || orgId || "SYSTEM";
  const callerId = req.headers.get("x-user-id") || "usr-current";
  ```
  If an unauthenticated caller sends `GET /api/cases?id=...` with no headers, `callerRole` defaults to `"super_admin"`! Since `canAccessCase` grants full access to `super_admin`, any anonymous caller receives full access to confidential dockets. Moreover, any client can spoof `x-user-role`, `x-user-org`, and `x-user-id` to impersonate any role.
  In `PATCH /api/cases` (lines 170-193), there are zero authentication checks, zero role verification, and no invocation of `canTransition()`.
- **Actionable Remediation:**
  1. Derive user identity, tenant `orgId`, and role exclusively from the server-verified session cookie (`verifySessionToken(req.cookies.get("acorn_session"))`).
  2. Remove all header fallbacks (`x-user-role`, `x-user-org`). Throw HTTP 401 Unauthorized if no valid session cookie exists.
  3. Wire `PATCH /api/cases` to server-side `canTransition()` and enforce IC quorum validation.

#### Finding A.4: Client-Side Direct Case Access Bypassing Server RBAC
- **Affected Files & Lines:** `src/app/posh/ic/cases/[id]/page.tsx:39, 60-63`, `src/app/posh/my-case/page.tsx:28-41`, `src/app/posh/respondent/page.tsx:18, 23`
- **Severity Rating:** **CRITICAL**
- **Specification Citation:** PRD Section 8, Section 25; Constitution Part 2 Rule 4.
- **Description of Gap:**
  In `src/app/posh/ic/cases/[id]/page.tsx:39`:
  ```typescript
  const [poshCase, setPoshCase] = useState<POSHCase | undefined>(() => platformStore.getCaseById(caseId));
  ```
  In `src/app/posh/my-case/page.tsx:28-41` and `src/app/posh/respondent/page.tsx:18-23`, case data, minutes, and witness depositions are loaded directly from browser in-memory `platformStore` without calling the backend API or invoking server-side `canAccessCase`. Anyone navigating directly to these URLs reads case files without access checks.
- **Actionable Remediation:**
  1. Refactor all POSH portal pages to fetch case dockets strictly through authenticated server API endpoints (`GET /api/cases?id=...`).
  2. Implement OTP-verified magic-link authentication for complainants and respondents before rendering docket interfaces.

#### Finding A.5: Unauthenticated Database Overwrite and Deletion via `POST /api/sync`
- **Affected Files & Lines:** `src/app/api/sync/route.ts:29-75`, `src/lib/db.ts:786-787`
- **Severity Rating:** **CRITICAL**
- **Specification Citation:** PRD Section 25.1; Constitution Part 2 Rule 6.
- **Description of Gap:**
  `POST /api/sync` accepts `{ key: string, value: any }` and executes `db.setCollection(body.key, body.value)` with zero authentication or authorization.
  In `src/lib/db.ts:786-787`:
  ```typescript
  } else if (key === "audit_logs" || key === "auditLogs") {
    this.data.auditLogs = value;
  ```
  An external attacker can send `POST /api/sync` with `{ "key": "audit_logs", "value": [] }` or `{ "key": "cases", "value": [] }` to instantly wipe all audit logs or case files from the server.
- **Actionable Remediation:**
  1. Require an authenticated Super Admin session for `POST /api/sync`.
  2. Explicitly prohibit mutation of sensitive collections (`auditLogs`, `cases`, `users`) via generic key-value setters.

#### Finding A.6: Dummy MFA Regex Validation & Insecure Session Cookies
- **Affected Files & Lines:** `src/app/api/admin/login/route.ts:60, 83-94`
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 26.2, Section 26.3; Skill `acorn-auth-security-engineer`.
- **Description of Gap:**
  In `src/app/api/admin/login/route.ts:60`:
  ```typescript
  const isMfaValid = /^\d{6}$/.test(mfaCode);
  ```
  Any arbitrary 6 digits (e.g. `000000`, `123456`) pass two-factor authentication. There is zero RFC 6238 TOTP computation, no shared secret storage, no timestamp window check, and no backup codes.
  In lines 88-94, cookies are issued with:
  ```typescript
  httpOnly: false,
  ```
  Setting `httpOnly: false` exposes the administrator session token to client JavaScript, making it vulnerable to extraction via Cross-Site Scripting (XSS).
- **Actionable Remediation:**
  1. Implement RFC 6238 TOTP using `otplib` or `speakeasy` against a stored user secret.
  2. Set `httpOnly: true`, `secure: true`, and `sameSite: "strict"` on all session cookies.

#### Finding A.7: Plaintext Admin Passwords & Universal Password Bypass
- **Affected Files & Lines:** `src/lib/session.ts:52-58`, `src/app/api/admin/login/route.ts:50`
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 26.2; Constitution Hard Rule 9.
- **Description of Gap:**
  In `src/lib/session.ts:52-58`, valid administrator passwords (`AcornLegal@2026`, `Admin@2026!`, `admin123`, `Acorn@2026`, `subhasish2026`) are committed in plaintext code.
  In `src/app/api/admin/login/route.ts:50`:
  ```typescript
  const isPasswordValid = VALID_ADMIN_PASSWORDS.has(password) || password === "••••••••••••";
  ```
  Entering 12 bullet characters `"••••••••••••"` acts as a universal backdoor password, successfully authenticating any administrator.
- **Actionable Remediation:**
  1. Remove `VALID_ADMIN_PASSWORDS` and the bullet password bypass.
  2. Implement password hashing using Argon2id or bcrypt with unique cryptographic salts.

#### Finding A.8: Inconsistent Audit Hash HMAC Key & In-Memory Truncation
- **Affected Files & Lines:** `src/lib/db.ts:1207`, `src/lib/crypto.ts:101-104`, `src/lib/store.ts:1794`
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 25, Section 34; Constitution Part 2 Rule 6.
- **Description of Gap:**
  In `src/lib/db.ts:1207`:
  ```typescript
  const hash = computeAuditHash(entryWithoutHash, prevHash);
  ```
  In `src/lib/crypto.ts:101-104`:
  ```typescript
  export function computeAuditHash(
    entry: Partial<AuditLogEntry>,
    secretKey: string = DEFAULT_HMAC_SECRET
  ): string
  ```
  `db.ts` passes `prevHash` as the second argument (`secretKey`), whereas `store.ts` and `verifyAuditChain` compute hashes using `DEFAULT_HMAC_SECRET`. As a result, all audit entries generated via `db.insertAuditLog` fail verification when checked by `verifyAuditChain`.
  Additionally, in `src/lib/store.ts:1794`:
  ```typescript
  this.set("audit_logs", logs.slice(0, 100)); // maintain latest 100
  ```
  Truncating the audit log to 100 entries discards historical entries, breaking the immutable append-only requirement and invalidating the hash chain.
- **Actionable Remediation:**
  1. Align `computeAuditHash` signature in `db.ts` to use `DEFAULT_HMAC_SECRET` and include `prevHash` in the canonicalized entry payload.
  2. Remove `logs.slice(0, 100)`. Store all audit logs append-only with statutory multi-year retention.

#### Finding A.9: Absence of Tenant Scoping & Cross-Tenant Exceptions
- **Affected Files & Lines:** `src/lib/db.ts:827-836, 845-854`, `src/lib/store.ts`
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 24.1; Constitution Part 2 Rule 5 ("Every record carries orgId; every query goes through the tenant-scoped repository. Cross-tenant access throws and is audited.").
- **Description of Gap:**
  In `src/lib/db.ts:827-836`:
  - `getCases(orgId?: string)`: If `orgId` is omitted, returns all cases across all tenants.
  - `getCaseById(id: string)`: Does not accept or filter by `orgId`.
  - `updateCase(id, updates)`: Updates any case across any organization without verifying tenant ownership.
  There are zero exceptions thrown and zero audit entries created for cross-tenant access attempts.
- **Actionable Remediation:**
  1. Create a tenant-scoped repository wrapper requiring `orgId` on all operations.
  2. Throw an explicit `CrossTenantAccessError` and log a high-severity security audit event whenever a query accesses records outside the authenticated user's `orgId`.

#### Finding A.10: PII Scrubber Bypassed in Database Inserts, Error Handlers & Webhooks
- **Affected Files & Lines:** `src/lib/db.ts:1183`, `src/app/error.tsx:17`, `src/app/api/org/webhooks/route.ts:10`
- **Severity Rating:** **MEDIUM**
- **Specification Citation:** PRD Section 8, Section 25; Constitution Part 2 Rule 2 ("Never log, print or store complaint content, names, phone numbers or tokens in logs, errors, tickets, notifications...").
- **Description of Gap:**
  `scrubPII` (`src/lib/crypto.ts:163`) is only invoked in `store.ts`. In `src/lib/db.ts:1183`, `insertAuditLog` stores raw unscrubbed details in `data/acorn-database.json`.
  In `src/app/error.tsx:17`, `console.error("Application runtime error:", error)` prints unscrubbed error stacks to server logs.
  In `src/app/api/org/webhooks/route.ts:10`, the payload scrubber only checks 4 hardcoded keys (`complaintText`, `victimName`, `narrative`, `deposition`), allowing `complainantName`, `respondentName`, `phone`, and `email` to leak.
- **Actionable Remediation:**
  1. Wrap all database audit log writes and error handlers in `scrubPII()`.
  2. Extend webhook payload sanitizer to scrub all PII fields (mobile, email, names, addresses).

---

### Section B: Backend / API Architecture & Data Persistence

#### Finding B.1: Single Flat JSON File Database Lacking MongoDB, Mongoose, Indexes & Transactions
- **Affected Files & Lines:** `src/lib/db.ts` (full file), `data/acorn-database.json`
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 24.1 to 24.7, Section 9.2.
- **Description of Gap:**
  The backend persistence layer consists of a single 3,500-line JSON file (`data/acorn-database.json`) read and written via synchronous Node.js `fs` calls. Mongoose models (`Case`, `User`, `Organisation`, `AuditLog`, `Payment`), document schemas, indexes (unique compound, text, TTL), transactions (`session.withTransaction`), and soft-delete conventions (`isDeleted`, `deletedAt`) are completely absent.
- **Actionable Remediation:**
  1. Define Mongoose schemas matching PRD Section 24 in `src/models/` (or `/apps/api/src/models`).
  2. Implement MongoDB Atlas connection with replica set support and transaction-safe operations.

#### Finding B.2: Unencrypted Sensitive Case Narratives at Rest
- **Affected Files & Lines:** `data/acorn-database.json:226-340`, `src/app/api/cases/route.ts:28-47`
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 24.6, Section 24.9; Constitution Part 2 Rule 1.
- **Description of Gap:**
  Case dockets store sensitive fields (`detailedStatement`, `complainantEmail`, `complainantPhone`, `respondentEmail`, `respondentPhone`, `incidentLocation`, `natureOfHarassment`) in plaintext JSON. While `encryptNarrative()` exists in `src/lib/crypto.ts`, it is never invoked during database writes.
- **Actionable Remediation:**
  1. Encrypt all sensitive narrative fields and PII using AES-256-GCM before writing to storage.
  2. Compute blind HMAC indexes for exact-match case lookups.

#### Finding B.3: Missing PRD Section 25 REST Endpoints
- **Affected Files & Lines:** `src/app/api/*` (31 routes implemented vs 80+ specified in PRD Section 25)
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 25.1 to 25.4.
- **Description of Gap:**
  Over 50 required REST endpoints under `/api/v1` are absent:
  - Procedural case endpoints: `/posh/cases/{id}/transitions`, `/timers`, `/conciliation`, `/notices`, `/replies`, `/statements`, `/documents/{did}/release`, `/interim`, `/appeals`, `/break-glass`.
  - Auth endpoints: `/auth/login`, `/auth/mfa/verify`, `/auth/refresh`, `/auth/logout`, `/auth/otp/*`.
  - Two-step S3 file upload architecture: `POST /files/upload-url` (presigned S3/GCS URL) and `POST /files/{id}/complete` (triggering malware scan).
  - Socket.io `/rt` realtime namespace with content-free events.
- **Actionable Remediation:**
  Implement missing REST endpoints adhering to the PRD Section 25 OpenAPI contract.

#### Finding B.4: Mock API Endpoints Returning Static Hardcoded Dummy JSON
- **Affected Files & Lines:**
  - `src/app/api/ai/[feature]/route.ts:32-57` (static timeline array & checklist)
  - `src/app/api/signatures/route.ts:27` (static hash `"sha256:4b227777d4c88e9182390a1bc294817a"`)
  - `src/app/api/org/audit-packs/download/route.ts:30-116` (hardcoded inspection manifest with fake CIN `U72200WB2018PTC229871`)
  - `src/app/api/org/webhooks/route.ts:29-35` (mock outbox dispatch confirmation)
  - `src/app/api/scim/v2/Users/route.ts:142-181` (mock user PATCH response without DB update)
  - `src/app/api/admin/slo/route.ts:14-20` (static chaos experiment string)
- **Severity Rating:** **MEDIUM**
- **Specification Citation:** PRD Section 25, Section 32, Section 38.2; Integrity Mandate.
- **Description of Gap:**
  These endpoints serve pre-fabricated static JSON responses rather than executing dynamic logic or reading from persistent storage.
- **Actionable Remediation:**
  Connect these endpoints to genuine backend evaluation engines, dynamic digital seal generation (`generateDigitalSeal`), live organization statistics aggregation, and real outbound webhook dispatches.

#### Finding B.5: Payment Verification Sandbox Bypass & Missing Idempotency Checks
- **Affected Files & Lines:** `src/app/api/payments/verify/route.ts:64-73, 82-129`
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 25, Section 27; Constitution Part 2 Rule 8.
- **Description of Gap:**
  In `src/app/api/payments/verify/route.ts:64-73`:
  ```typescript
  if (!isSignatureValid && isTestMode) {
    if (signature.startsWith("sig_test_") || signature.startsWith("mock_") || signature === "test_signature") {
      isSignatureValid = true;
    }
  }
  ```
  If `RAZORPAY_KEY_SECRET` is unset, `isTestMode` defaults to `true`. Passing `signature: "test_signature"` verifies any payment, marks orders as paid, and issues genuine tax invoices.
  Furthermore, `/api/payments/verify` has no idempotency checks; sending repeated requests with the same `razorpayPaymentId` creates duplicate payment transactions and receipts.
- **Actionable Remediation:**
  1. Remove sandbox signature bypasses from payment verification routes.
  2. Implement strict HMAC-SHA256 signature verification.
  3. Add idempotency key tracking on `razorpayPaymentId` in the payments database.

#### Finding B.6: Missing Standard API Error Envelope, Pagination & Concurrency Control
- **Affected Files & Lines:** `src/app/api/*` (all route handlers)
- **Severity Rating:** **MEDIUM**
- **Specification Citation:** PRD Section 25.1.
- **Description of Gap:**
  API error responses are inconsistent flat strings (e.g. `{ error: "..." }`). None conform to PRD Section 25.1:
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
  Endpoints (`GET /api/cases`, `GET /api/requests`, `GET /api/services`) return unpaginated arrays and lack `If-Match` optimistic concurrency control headers.
- **Actionable Remediation:**
  Create a unified `apiResponse` helper in `src/lib/api-response.ts` enforcing standardized error envelopes, pagination meta, and `X-Request-Id` headers.

#### Finding B.7: Hardcoded Default Secrets Without Startup Validation Schema
- **Affected Files & Lines:** `src/lib/crypto.ts:5-6`, `src/lib/session.ts:20-23`, `src/app/api/payments/verify/route.ts:6`, `src/app/api/webhooks/razorpay/route.ts:5-8`, `src/lib/db.ts:631`
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 27.3; Constitution Part 2 Rule 7 ("Secrets only from environment variables validated at startup. Never read or commit .env files.").
- **Description of Gap:**
  Cryptographic, session, and payment secrets use hardcoded fallback strings when environment variables are missing (e.g. `"acorn-aes256-confidential-vault-key-default-32B"`, `"rzp_test_AcornLegalKolkata2026"`). There is no Zod validation schema executed at startup.
- **Actionable Remediation:**
  Implement a Zod schema in `src/lib/env.ts` that validates all required secrets at process boot and halts execution if any secret is missing or malformed.

---

### Section C: POSH Rules Engine & Statutory Compliance

#### Finding C.1: Missing `packages/rules` Package & Missing `rules.config.ts`
- **Affected Files & Lines:** `packages/rules` (missing), `src/lib/rules/`
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 8.30, Section 23; Skill `acorn-rules-engine-engineer`; Constitution Part 2 Rule 10 ("Legal rules and timelines live only in packages/rules config files, effective-dated, with a 'counsel to verify' comment.").
- **Description of Gap:**
  `packages/rules` does not exist. Statutory rules are implemented as ad-hoc helper functions inside `src/lib/rules/` within the frontend Next.js directory. `rules.config.ts` is absent.
- **Actionable Remediation:**
  Create a standalone, pure TypeScript module `packages/rules` with zero external dependencies and a centralized, effective-dated `rules.config.ts`.

#### Finding C.2: Hardcoded Statutory Numbers Without Effective Dating
- **Affected Files & Lines:** `src/lib/rules/statutory-timelines.ts:54, 64, 90, 107, 123, 133, 143`
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 23; Constitution Part 2 Rule 10.
- **Description of Gap:**
  Statutory deadlines (90 days, 180 days, 7 working days, 10 working days, 60 days) are hardcoded directly within logic branches without versioning, effective dates (`effectiveFrom`, `effectiveTo`), or "counsel to verify" annotations.
- **Actionable Remediation:**
  Extract all statutory numbers into `rules.config.ts` under versioned schemas with explicit counsel verification annotations.

#### Finding C.3: Incomplete Statutory Timers (Missing 15 of 21 Timers)
- **Affected Files & Lines:** `src/lib/rules/statutory-timelines.ts`
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 8.16.1 (TM-01 through TM-21).
- **Description of Gap:**
  The codebase only implements 6 timer calculators. The following 15 statutory timers are completely missing:
  - TM-03: Acknowledgement timer (1 business day)
  - TM-04: Triage timer (7 calendar days)
  - TM-07: Hearing notice lead time timer (minimum 7 calendar days)
  - TM-12: Interim relief decision timer
  - TM-13: Notice before ex parte action timer (3 consecutive notices)
  - TM-14: Interim leave limit timer (up to 3 months)
  - TM-15: IC member tenure expiry timer (3 years under Section 4(3))
  - TM-16: Annual report filing timer (due by January 31 under Section 21)
  - TM-17: Board's Report disclosure data timer
  - TM-18: Awareness training cycle timer
  - TM-19: Aftercare check-in timers (30/60/90 days post-closure)
  - TM-20: Retention review timer
  - TM-21: Draft complaint expiry timer (14 days)
- **Actionable Remediation:**
  Implement the full registry of timers TM-01 to TM-21 with plain-language statutory explanations, alert offsets, and overdue states.

#### Finding C.4: Weekend-Only Calendar Maths Omitting High Court Vacations & Gazetted Holidays
- **Affected Files & Lines:** `src/lib/rules/statutory-timelines.ts:90-96, 107-113`
- **Severity Rating:** **MEDIUM**
- **Specification Citation:** PRD Section 8.16.2 & Section 8.16.3.
- **Description of Gap:**
  Working day calculation only checks `dayOfWeek !== 0 && dayOfWeek !== 6`. It does not load or union Calcutta High Court annual vacation calendars, West Bengal state gazetted holidays, or national holidays. Clock-stop grounds (conciliation pause, ex parte notice wait, legal stays, medical incapacitation) are completely unsupported.
- **Actionable Remediation:**
  Implement a calendar engine with holiday registers (national, West Bengal gazetted, Calcutta High Court vacation calendars) and clock-stop state handling.

#### Finding C.5: Incomplete State Machine Missing Statutory States & Transitions T01–T30 with Typed Guards
- **Affected Files & Lines:** `src/lib/rules/state-machine.ts:7-23, 114-118`
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 8.15.1, Section 8.15.2, Section 23.
- **Description of Gap:**
  The state machine lacks 13 statutory states defined in PRD Section 8.15.1 (`DRAFT`, `LATE_REVIEW`, `AWAITING_INFO`, `CONCILIATION`, `LEGAL_STAY`, `DELIBERATION`, `REPORT_ISSUED`, `ACTION_PENDING`, `ACTION_COMPLETED`, `APPEAL_WINDOW`, `APPEAL_FILED`, `REFERRED_LC`, `REJECTED`).
  Transitions T01 to T30 lack typed guards: `canTransition()` performs only a flat array search without verifying quorum, OTP affirmations, non-monetary settlement restrictions, or limitation periods.
- **Actionable Remediation:**
  Implement the full 19-state machine with transitions T01 to T30 and typed guard functions enforcing statutory preconditions.

#### Finding C.6: 100% Missing Applicability & Statutory Routing Engine (RT-01 to RT-21)
- **Affected Files & Lines:** `src/lib/rules/` (no routing files exist)
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 8.11, Section 23; Skill `acorn-rules-engine-engineer`.
- **Description of Gap:**
  PRD Section 8.11 specifies rules RT-01 through RT-21 to determine jurisdiction between Internal Committee, Local Committee, Section 19(h) criminal referral, third-party employer routing, minor/POCSO referral, and multi-branch handling. No routing engine exists in the repository.
- **Actionable Remediation:**
  Build `src/lib/rules/routing.ts` (or `packages/rules/src/routing.ts`) evaluating workplace headcount, employer respondent status, unorganised sector nexus, and multi-branch jurisdiction.

---

### Section D: Operations Console (/ops) & Reliability

#### Finding D.1: Missing Dedicated `/ops` Root Route
- **Affected Files & Lines:** `src/app/ops` (missing; implemented under `src/app/admin/ops/`)
- **Severity Rating:** **MEDIUM**
- **Specification Citation:** PRD Section 7, Section 25; Skill `acorn-ops-console-builder`.
- **Description of Gap:**
  PRD Section 7 and 25 specify a dedicated `/ops` operations area for Acorn staff (`/ops`, `/ops/incidents`, `/ops/dr`, `/ops/gate`, `/ops/breakglass`). Currently, these screens are located under `/admin/ops/*`.
- **Actionable Remediation:**
  Create `/ops` route tree or configure Next.js route rewrites mapping `/ops/*` to the operations console with appropriate staff role guards.

#### Finding D.2: Missing 11-Step Incident Response Workflow with CERT-In 6-Hour Clock
- **Affected Files & Lines:** Entire repository (zero matches for CERT-In incident workflow)
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 25, Section 36; Skill `acorn-ops-console-builder`.
- **Description of Gap:**
  The statutory 11-step incident response workflow with the CERT-In 6-hour regulator statutory countdown clock, evidence upload, severity triage, and breach notification triggers is completely absent.
- **Actionable Remediation:**
  Build the 11-step incident response state machine with automated CERT-In 6-hour timer calculation and statutory reporting templates.

#### Finding D.3: Insecure Client-Only Break-Glass Protocol with Hardcoded PIN
- **Affected Files & Lines:** `src/app/posh/admin/breakglass/page.tsx:58, 62-67`
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 25; Constitution Part 2 Rule 9; Skill `acorn-ops-console-builder`.
- **Description of Gap:**
  In `src/app/posh/admin/breakglass/page.tsx:62-67`:
  ```typescript
  if (form.emergencyPin !== "ACORN-9900") { ... }
  ```
  The security override PIN is hardcoded as `"ACORN-9900"`. There is no dual approval requirement (requires two distinct authorized credentials per PRD). Break-glass session state is purely client-side React state (`useState`), which is not persisted or validated by any server API or tied to `canAccessCase`.
- **Actionable Remediation:**
  1. Remove hardcoded PIN `"ACORN-9900"`.
  2. Implement server-side dual approval requiring distinct authentication credentials from Senior Partner and IC Presiding Officer.
  3. Enforce server-issued break-glass tokens with maximum 2-hour TTL and immutable audit logging.

#### Finding D.4: Mocked DR Drills & Chaos Experiments Returning Static Strings
- **Affected Files & Lines:** `src/app/admin/ops/dr/page.tsx:32-37, 51-55`, `src/app/admin/ops/reliability/page.tsx:27-37`
- **Severity Rating:** **MEDIUM**
- **Specification Citation:** PRD Section 36; Skill `acorn-ops-console-builder`.
- **Description of Gap:**
  Clicking "Simulate Tamper Check" in `/admin/ops/dr` triggers a static string output (`"SIMULATION TEST RESULT: Hash mismatch immediately flagged..."`) rather than running cryptographic audit chain verification. Drill histories and chaos experiment results are hardcoded mock arrays.
- **Actionable Remediation:**
  Wire DR drills to execute genuine audit hash chain verification on a detached copy of the database and execute real latency probes.

#### Finding D.5: Decoupled 17-Item Go-Live Gate
- **Affected Files & Lines:** `src/app/admin/ops/gate/page.tsx:23-28`
- **Severity Rating:** **MEDIUM**
- **Specification Citation:** PRD Section 36; Constitution Part 3 Rule 9.
- **Description of Gap:**
  The 17-item Go-Live verification gate is a purely manual UI toggle. It is not connected to automated test results, pen-test vulnerability scanners, or tenant isolation checks (violating the rule: "The go-live gate stays RED while any S1 or S2 defect, Critical or High pen-test finding, or failed tenant-isolation test is open").
- **Actionable Remediation:**
  Wire the Go-Live gate checklist items to real test execution status, security lint outputs, and automated health check probes.

#### Finding D.6: Missing Operational Submodules
- **Affected Files & Lines:** `src/app/admin/ops/sop/page.tsx:32-40`, missing submodules
- **Severity Rating:** **MEDIUM**
- **Specification Citation:** PRD Section 36.
- **Description of Gap:**
  UAT Manager, Release & Feature Flags Tracker, Hypercare & Warranty Tracker, and Privacy & Vendor Operations are completely missing. The SOP Recurrence Engine is a client-side toggle without a scheduled daemon.
- **Actionable Remediation:**
  Implement missing operations console views and build a persistent cron/scheduler engine for recurring SOPs.

---

### Section E: Frontend, Design System & Accessibility

#### Finding E.1: Client-Side Payment Fallback Bypass Issuing Verified Receipts
- **Affected Files & Lines:** `src/app/pay/page.tsx:150-179, 208-296`, `src/components/payment-modal.tsx:40-76`
- **Severity Rating:** **CRITICAL**
- **Specification Citation:** PRD Section 27; Constitution Part 2 Rule 9.
- **Description of Gap:**
  In `src/app/pay/page.tsx:208-296`:
  ```typescript
  if (typeof window !== "undefined" && (window as any).Razorpay) {
    ...
  } else {
    // Fallback for sandboxed or adblocked headless browser
    completeFallbackPayment(orderId);
  }
  ```
  `completeFallbackPayment` generates a fake `pay_...` ID via `Math.random()`, records the payment as successful in `platformStore`, displays a success toast (`"Receipt verified via Razorpay gateway"`), and redirects to the receipt page issuing an authentic tax invoice. In `PaymentModal`, Razorpay checkout is never invoked at all—it immediately records a mock payment.
- **Actionable Remediation:**
  Remove `completeFallbackPayment`. If the Razorpay script is blocked or fails, render an explicit error message (`"Payment gateway could not be reached. No funds have been debited."`) and never issue receipts without server webhook verification.

#### Finding E.2: Global `Escape` Key Hijacking in `quick-exit.tsx`
- **Affected Files & Lines:** `src/components/quick-exit.tsx:16-27`, `src/app/layout.tsx:239`
- **Severity Rating:** **CRITICAL**
- **Specification Citation:** WCAG 2.1 AA (2.1.1 Keyboard, 2.1.2 No Keyboard Trap); Constitution Part 1 Rule 5.
- **Description of Gap:**
  In `src/components/quick-exit.tsx:16-27`:
  ```typescript
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        triggerQuickExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  ```
  Because `QuickExit` is mounted in root `layout.tsx`, the `Escape` listener is bound globally across the **entire site**. Whenever any user presses `Escape` anywhere (on the homepage, closing a modal, navigating the navbar), they are immediately ejected to `https://www.google.com/search?q=kolkata+weather+forecast`.
- **Actionable Remediation:**
  Scope the keydown listener strictly to active POSH complainant inquiry routes:
  ```typescript
  if (!pathname?.startsWith("/posh")) return;
  ```
  Ensure the event listener is attached only when on designated emergency-exit pages.

#### Finding E.3: Statutory Digital Affirmation OTP Verification Stub
- **Affected Files & Lines:** `src/app/posh/file/sign/page.tsx:14, 32-45`
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 8.1, Section 9 (R-01); Section 9(1) POSH Act 2013.
- **Description of Gap:**
  In `src/app/posh/file/sign/page.tsx:14`:
  ```typescript
  const [otpCode, setOtpCode] = useState("881240"); // pre-filled for smooth verification
  ```
  In `handleFinalSubmit`, the OTP is never sent to the backend or verified against an SMS/email service. Any string or the default pre-filled value allows instant submission.
- **Actionable Remediation:**
  Dispatch genuine OTP to complainant's contact number/email, verify via `/api/auth/otp/verify`, and record OTP verification timestamp and IP in the audit log.

#### Finding E.4: Incomplete Form Uploads & Discarded Payloads
- **Affected Files & Lines:** `src/app/request-service/page.tsx:67-75, 116-127`, `src/app/posh/respondent/reply/page.tsx:52-68, 255-271`
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 6.2, Section 7.1, Section 8.1 (Rule 7).
- **Description of Gap:**
  - In `src/app/request-service/page.tsx`, `files` are added to component state, but in `handleSubmit`, the payload sent to `/api/requests` omits `files` entirely. Uploaded documents are silently discarded.
  - In `src/app/posh/respondent/reply/page.tsx:255-271`, the defense exhibits dropzone is a visual dashed box with **no `<input type="file">`** element and no event handlers. Furthermore, the respondent's witness roster is discarded on submission.
- **Actionable Remediation:**
  1. Wire multi-part file uploads to presigned storage endpoints in both forms.
  2. Add `<input type="file" multiple className="sr-only" />` to the respondent dropzone and persist the witness roster to the case defense docket.

#### Finding E.5: Fake Evidence Hashes via `Math.random()` & Mock `.txt` Downloads
- **Affected Files & Lines:** `src/app/posh/my-case/docs/page.tsx:20, 35-44, 57-82`
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 8.1 (Screen C-07); Indian Evidence Act Section 65B.
- **Description of Gap:**
  In `my-case/docs/page.tsx`, evidence upload does not read user files. It generates a fake 64-character hex string using `Math.random()`, hardcodes `fileSizeKb: 340`, and saves a metadata stub. The "Download Decrypted Exhibit" button downloads a synthetic `.txt` file containing mock text rather than the genuine uploaded document.
- **Actionable Remediation:**
  Compute authentic SHA-256 hashes over uploaded file buffers, persist files to secure encrypted object storage, and stream authentic decrypted files upon authorized download.

#### Finding E.6: 30 of 41 Staff Admin Consoles Lacking Server `fetch()` Calls
- **Affected Files & Lines:** `src/app/admin/**/page.tsx` (30 pages)
- **Severity Rating:** **HIGH**
- **Specification Citation:** PRD Section 7.1, Section 7.4.
- **Description of Gap:**
  30 out of 41 administrative console pages (including `/admin/pages`, `/admin/media`, `/admin/ops/dr`, `/admin/ops/sop`, `/admin/trust`, `/admin/users`) update only local browser `platformStore` and `localStorage`. No HTTP `fetch()` requests are made to backend APIs. Multi-user or cross-device administrative updates fail to synchronize.
- **Actionable Remediation:**
  Wire all administrative mutations to dedicated REST endpoints (`/api/admin/*`) backed by persistent database storage.

#### Finding E.7: Constitutional Banned UI Violations
- **Affected Files & Lines:** `src/components/navbar.tsx:136`, `src/app/globals.css:309`, `src/app/layout.tsx:247`, `src/components/legal-guidance-assistant.tsx`, `src/app/page.tsx:350`, `src/components/footer.tsx:265`
- **Severity Rating:** **MEDIUM**
- **Specification Citation:** Constitution Part 1 Rule 5 ("Banned UI: popups, newsletter modals, auto-play carousels, infinite marquees, scroll hijacking, splash loaders, chat widgets, parallax over 24px, anything that repeats animation.").
- **Description of Gap:**
  1. **Infinite Marquee:** `navbar.tsx:136` renders `.footer-ticker-track`, which `globals.css:309` binds to `animation: footer-ticker-scroll 38s linear infinite`.
  2. **Chat Widget:** `layout.tsx:247` renders `<AssistantWidget />` globally, expanding into a floating legal guidance chat widget.
  3. **Repeating Animations:** Multiple components use indefinitely repeating `animate-pulse` and `animate-bounce` looping animations.
- **Actionable Remediation:**
  1. Remove infinite marquee animation from navbar ticker.
  2. Gate `<AssistantWidget />` under an explicit admin feature toggle or remove from public layouts.
  3. Replace repeating pulse animations with calm, static indicators.

#### Finding E.8: Design Token Violations: Non-Token Hardcoded Hex Values
- **Affected Files & Lines:** `src/components/navbar.tsx:295-296`, `src/app/pay/page.tsx:229`, `src/app/manifest.ts:11-12`, `src/app/posh/org/notices/page.tsx:138-150`, `src/app/posh/org/branding/page.tsx:33-34`
- **Severity Rating:** **LOW**
- **Specification Citation:** `docs/DESIGN_SYSTEM.md`; Constitution Part 1 Rule 3 ("Only use design tokens from docs/DESIGN_SYSTEM.md. No hard-coded hex values in components.").
- **Description of Gap:**
  Active components contain hardcoded hex values (`#0b1329`, `#FAF7F2`, `#FBF9F5`, `#0E2042`, `#C29B38`) instead of using Tailwind design tokens (`bg-ink-950`, `bg-ivory-50`, `text-brass-500`).
- **Actionable Remediation:**
  Replace hardcoded hex strings with semantic Tailwind token classes.

#### Finding E.9: Accessibility (WCAG 2.1 AA) Non-Compliance
- **Affected Files & Lines:** `src/components/footer.tsx:121-139`, `src/components/ui/form-controls.tsx:12-140`, `src/components/ui/button.tsx:32`, `src/app/page.tsx:569`, `src/components/cookie-banner.tsx:98`
- **Severity Rating:** **MEDIUM**
- **Specification Citation:** WCAG 2.1 AA (2.4.3 Focus Order, 2.4.7 Focus Visible, 3.3.1 Error Identification, 2.5.5 Target Size); Constitution Part 1 Rule 8.
- **Description of Gap:**
  1. **Invisible Focusable Links:** Mobile footer accordion panels toggle `opacity-0` without `hidden` or `display: none`. Keyboard tabbing focuses invisible links.
  2. **Missing ARIA in Forms:** `Input`, `Textarea`, and `Select` lack `aria-describedby`, `aria-invalid`, and `role="alert"`. Screen readers do not announce error states.
  3. **Sub-44px Touch Targets:** Buttons (`btn-sm` at 36px, carousel arrows at 32px, cookie reject button at 36px) fail the 44px minimum touch target requirement.
- **Actionable Remediation:**
  1. Add `hidden` to collapsed accordion sections.
  2. Bind input errors with `aria-describedby` and `aria-invalid="true"`.
  3. Ensure all clickable buttons and interactive targets have `min-h-[44px] min-w-[44px]`.

#### Finding E.10: Root Layout Metadata Retaining Legacy Non-Legal Keywords
- **Affected Files & Lines:** `src/app/layout.tsx:32-58`
- **Severity Rating:** **LOW**
- **Specification Citation:** PRD Section 6.1; `docs/DESIGN_SYSTEM.md`.
- **Description of Gap:**
  Root metadata contains legacy non-legal text:
  `"Advocate on Panel Rajesh Telge", "Doorstep Leave and License registration", "Private 10th SSC 12th coaching guidance", "College admissions guidance MBBS MD Pharmacy"`.
  This contradicts the High Court Calcutta and Pan-India corporate advisory identity of Acorn Legal Consultants.
- **Actionable Remediation:**
  Update metadata title, description, and keywords to reflect corporate law, POSH advisory, High Court litigation, and dispute resolution.

---

## 6. Code Completeness & Hygiene Matrix

### 6.1 Code-Level Markers & Functional Stubs Analysis

| Category | Scan Metric | Result | Assessment & Notes |
|---|:---:|:---:|---|
| **TODO / FIXME / HACK Markers** | Grep uppercase markers | **0 occurrences** | Codebase contains zero unaddressed comment markers. Gaps are embedded directly in executable logic rather than marked with comments. |
| **Simulated / Mock Responses** | API handlers returning static data | **6 endpoints** | `/api/ai/[feature]`, `/api/signatures`, `/api/org/audit-packs/download`, `/api/org/webhooks`, `/api/scim/v2/Users`, `/api/admin/slo` return hardcoded JSON. |
| **Authentication Backdoors** | Hardcoded bypass conditions | **3 locations** | `src/middleware.ts` (`RouteCrawler`, `x-bypass-auth`), `src/app/api/admin/login` (`"••••••••••••"`), `src/app/api/cases` (default `super_admin`). |
| **Simulated Cryptography** | `Math.random()` fake hashes / seals | **3 locations** | `pay/page.tsx` (`pay_...`), `posh/my-case/docs` (fake SHA256), `api/signatures` (static seal). |
| **Raw Browser Dialogs** | `alert()`, `confirm()`, `prompt()` | **0 occurrences** | Verified completely clean. All dialogs use accessible modal components. |
| **Unhandled Error Catches** | Empty `catch {}` blocks | **0 occurrences** | All catch blocks log or return error responses. However, error handlers bypass PII scrubbing (`error.tsx:17`). |

### 6.2 Test Infrastructure Audit

| Test Suite / Runner | Target Package | Status | Gap & Impact |
|---|---|:---:|---|
| **Component Unit Tests** | `@testing-library/react`, Jest / Vitest | ❌ **0% Coverage** | Neither Jest, Vitest, nor Testing Library is installed. Zero `.test.tsx` or `.spec.tsx` files exist. Interactive UI components and form behaviors are completely untested. |
| **End-to-End Browser Tests** | `@playwright/test` | ❌ **Broken** | `tests/click-diag.spec.ts` imports `@playwright/test`, but `@playwright/test` is absent from `package.json`. No test runner or browser binaries are installed. |
| **Automated Node VM Suites** | `scripts/test-unit.mjs`, `scripts/test-admin-realtime.mjs`, `scripts/test-workflows.mjs`, `scripts/verify-all.mjs` | ⚠️ **Passing but Masking Defects** | 126 tests pass via native Node.js scripts. However, `scripts/verify-all.mjs:222` uses `User-Agent: RouteCrawler/1.0` to exploit the middleware authentication backdoor, creating false confidence that protected pages are verified. |
| **Security & RBAC Test Suite** | Tenant isolation, session replay, SQL/NoSQL injection, PII leak tests | ❌ **Missing** | Zero automated tests verify cross-tenant isolation, session expiration, token forgery, or PII redaction. |

---

## 7. Prioritized Remediation Roadmap

The remediation schedule is prioritized into three distinct execution phases based on statutory severity, regulatory risk, and architectural dependencies.

```
PHASE P0 (IMMEDIATE CRITICAL): Security, Auth & POSH Confidentiality (12-16 hrs)
  ├── SEC-01: Remove middleware RouteCrawler & x-bypass-auth backdoors
  ├── SEC-02: Eliminate homepage data leak over /api/sync
  ├── SEC-03: Remove header spoofing in /api/cases; enforce server RBAC
  ├── SEC-04: Replace plaintext passwords and mock MFA with Argon2id + RFC 6238 TOTP
  ├── SEC-05: Remove client payment bypass and Escape key hijacking
  └── SEC-06: Fix audit hash HMAC key mismatch and eliminate log truncation
                              │
                              ▼
PHASE P1 (HIGH PRIORITY): Architecture, Rules Engine & Data Encryption (20-28 hrs)
  ├── ARCH-01: Migrate single flat JSON to MongoDB Atlas + Mongoose models
  ├── ARCH-02: Implement AES-256-GCM encryption at rest for case narratives
  ├── ARCH-03: Enforce tenant-scoped repository pattern with cross-tenant exceptions
  ├── RUL-01: Create packages/rules and rules.config.ts with effective dating
  ├── RUL-02: Implement 15 missing statutory timers (TM-03 to TM-21)
  ├── RUL-03: Implement calendar engine with High Court vacations and gazetted holidays
  └── RUL-04: Build statutory routing engine (RT-01 to RT-21) and transition guards T01–T30
                              │
                              ▼
PHASE P2 (MEDIUM PRIORITY): Operations, API Standards, UI & Testing (16-24 hrs)
  ├── OPS-01: Build /ops console and 11-step incident response with CERT-In 6h clock
  ├── OPS-02: Replace mock break-glass with server-side dual approval protocol
  ├── API-01: Standardize API error envelopes, pagination, and If-Match concurrency
  ├── API-02: Replace mock API stubs with genuine backend evaluations
  ├── UI-01: Wire 30 admin consoles and /posh/org to server persistence
  ├── UI-02: Fix form file uploads, affirmation OTP, and remove Banned UI elements
  └── TST-01: Install Vitest & Playwright, configure comprehensive security test matrix
```

### Itemized Task Schedule

| Phase | Task ID | Description | Target Files | PRD / Const. Ref | Est. Effort | Dependencies |
|:---:|:---:|---|---|---|:---:|---|
| **P0** | `SEC-01` | Remove `RouteCrawler` and `x-bypass-auth` middleware backdoors; enforce verified session cookies across all protected routes. | `src/middleware.ts` | PRD Sec 26.1 | 2.0h | None |
| **P0** | `SEC-02` | Restrict `GET /api/sync` to public CMS data only; require Super Admin auth for private collections; restrict `POST /api/sync`. | `src/app/api/sync/route.ts` | POSH Sec 16, Const. Rule 4 | 1.5h | `SEC-01` |
| **P0** | `SEC-03` | Remove header spoofing (`x-user-role`, `x-user-org`) in `/api/cases`; derive identity strictly from verified session token. | `src/app/api/cases/route.ts` | Const. Rule 4 | 1.5h | `SEC-01` |
| **P0** | `SEC-04` | Eliminate plaintext passwords and `"••••••••••••"` bypass; implement Argon2id hashing, RFC 6238 TOTP, and `httpOnly` cookies. | `src/lib/session.ts`, `src/app/api/admin/login/route.ts` | PRD Sec 26.2, 26.3 | 3.0h | None |
| **P0** | `SEC-05` | Remove client payment fallback bypass (`completeFallbackPayment`); scope `QuickExit` Escape key listener strictly to POSH routes. | `src/app/pay/page.tsx`, `src/components/payment-modal.tsx`, `src/components/quick-exit.tsx` | PRD Sec 27, WCAG 2.1 | 2.0h | None |
| **P0** | `SEC-06` | Fix audit hash HMAC key mismatch in `db.ts:1207`; remove audit log truncation (`logs.slice(0, 100)`) in `store.ts`. | `src/lib/db.ts`, `src/lib/store.ts`, `src/lib/crypto.ts` | Const. Rule 6 | 1.5h | None |
| **P1** | `ARCH-01` | Build Mongoose models in `src/models/` matching PRD Section 24; integrate MongoDB Atlas connection with replica set transactions. | `src/models/*`, `src/lib/db.ts` | PRD Sec 24.1 | 6.0h | `SEC-02` |
| **P1** | `ARCH-02` | Encrypt all sensitive complaint narratives, respondent replies, and PII at rest via AES-256-GCM. | `src/lib/db.ts`, `src/app/api/cases/route.ts` | PRD Sec 24.6, Const. Rule 1 | 3.0h | `ARCH-01` |
| **P1** | `ARCH-03` | Implement tenant-scoped repository pattern requiring `orgId`; throw explicit `CrossTenantAccessError` and log security audit event. | `src/lib/db.ts`, `src/lib/store.ts` | Const. Rule 5 | 3.0h | `ARCH-01` |
| **P1** | `RUL-01` | Create `packages/rules` (or `src/lib/rules/engine`) with `rules.config.ts` containing effective-dated parameters and counsel annotations. | `src/lib/rules/*` | PRD Sec 23, Const. Rule 10 | 3.0h | None |
| **P1** | `RUL-02` | Implement complete statutory timer registry (TM-01 through TM-21) with alert offsets and overdue states. | `src/lib/rules/statutory-timelines.ts` | PRD Sec 8.16.1 | 4.0h | `RUL-01` |
| **P1** | `RUL-03` | Build calendar engine with High Court vacation calendars, West Bengal gazetted holidays, and clock-stop grounds. | `src/lib/rules/calendar.ts` | PRD Sec 8.16.2, 8.16.3 | 3.0h | `RUL-01` |
| **P1** | `RUL-04` | Implement statutory routing engine (RT-01 to RT-21) and complete state machine transitions T01–T30 with typed guards. | `src/lib/rules/routing.ts`, `src/lib/rules/state-machine.ts` | PRD Sec 8.11, 8.15 | 5.0h | `RUL-01` |
| **P1** | `PAY-01` | Remove `sig_test_` bypass and enforce idempotency key tracking on payment order creation and verification routes. | `src/app/api/payments/*` | PRD Sec 27 | 2.0h | `ARCH-01` |
| **P2** | `OPS-01` | Build `/ops` console area with 11-step incident response workflow and CERT-In 6-hour regulator countdown clock. | `src/app/ops/*`, `src/app/admin/ops/*` | PRD Sec 36 | 4.0h | `SEC-01` |
| **P2** | `OPS-02` | Replace hardcoded break-glass PIN `"ACORN-9900"` with server-side dual approval protocol and 2-hour TTL token. | `src/app/posh/admin/breakglass/page.tsx` | PRD Sec 25, Const. Rule 9 | 2.5h | `SEC-01` |
| **P2** | `API-01` | Standardize all API error responses to `{ error: { code, message, details, requestId } }`; add pagination and `If-Match`. | `src/lib/api-response.ts`, `src/app/api/*` | PRD Sec 25.1 | 3.0h | `ARCH-01` |
| **P2** | `API-02` | Wire mock endpoints (`/api/ai/*`, `/api/signatures`, `/api/org/audit-packs/*`, webhooks) to genuine backend logic. | `src/app/api/*` | PRD Sec 25, 38 | 3.5h | `ARCH-01` |
| **P2** | `UI-01` | Wire 30 admin consoles and `/posh/org/*` state mutations to persistent server endpoints via `fetch()`. | `src/app/admin/**/page.tsx`, `src/app/posh/org/*` | PRD Sec 7.1 | 4.0h | `API-01` |
| **P2** | `UI-02` | Fix service request / respondent file uploads, implement server OTP validation, remove Banned UI, and resolve WCAG 2.1 AA defects. | `src/app/request-service/*`, `src/components/*` | Const. Rule 5, WCAG 2.1 | 3.5h | None |
| **P2** | `TST-01` | Install Vitest and Playwright; build automated security test matrix for tenant isolation, auth replay, and PII leakage. | `package.json`, `tests/*` | PRD Sec 29 | 4.0h | All |

---

## 8. Verification & Attestation

This audit was conducted using direct static file inspection, AST pattern analysis, line-by-line verification, and programmatic test suite execution. All findings cite exact file paths and line numbers verified against the current repository state.

- **Typecheck Status:** Clean compilation (`npm run typecheck` exits code 0).
- **Test Suite Status:** 126 automated checks pass (`npm test` exits code 0).
- **Next Phase Gate:** Proceed to Milestone 2 (Phase P0: Critical Security & Privacy Remediation).
