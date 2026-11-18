# Progress — teamwork_explorer_survey_2
Last visited: 2026-11-18T06:50:00Z

## Status
Completed comprehensive, read-only deep dive codebase audit of Backend/API, Database Models, and POSH Rules Engine. Preparing structured findings and handoff report.

## Completed
- Initialized DISPATCH.md, BRIEFING.md, and progress.md
- Reviewed ORIGINAL_REQUEST.md, PRD.md (Sections 8, 9, 10, 11, 12, 23, 24, 25, 26, 27, 29), and skills (`acorn-backend-architect`, `acorn-rules-engine-engineer`)
- Analyzed monorepo structure vs actual codebase (single Next.js 14 App Router app, no `apps/api`, no `packages/rules`, no `packages/shared`)
- Audited all 31 API routes in `src/app/api/`
- Identified severe security gaps:
  - Backdoor in `src/middleware.ts` (`RouteCrawler` user agent and `x-bypass-auth: true` header bypass auth)
  - Unauthenticated `/api/*` routes (e.g. `/api/sync` exposing full DB and allowing arbitrary overwrite)
  - Header spoofing in `src/app/api/cases/route.ts` defaulting to `super_admin`
  - Plaintext hardcoded passwords and dummy TOTP MFA regex in `src/lib/session.ts` and `/api/admin/login`
  - Fallback default secrets throughout `src/lib/crypto.ts`, `src/lib/session.ts`, `src/app/api/payments/verify/route.ts`, `webhooks/razorpay/route.ts`
  - Insecure session cookies (`httpOnly: false`)
- Audited Database & Models:
  - Absence of MongoDB / Mongoose / Redis
  - Flat JSON file `data/acorn-database.json` in plaintext
  - Missing field-level AES-256-GCM encryption on case narratives in storage
  - Cross-tenant data leakage in `db.getCases()` and `db.getCaseById()`
  - Lack of database indexes, soft delete tracking, transactions, or optimistic concurrency
- Audited POSH Rules Engine:
  - Missing `packages/rules` and `rules.config.ts`
  - Hardcoded statutory deadlines without effective dating
  - Incomplete timers: only 6 present; 15 timers (TM-03, TM-04, TM-07, TM-12 to TM-21) missing
  - Missing holiday union (only weekend check; Calcutta High Court / State Gazetted holidays omitted)
  - Missing clock-stop grounds / delay reasons
  - Incomplete state machine: missing PRD states, missing T01-T30 transitions and typed guards
  - Complete absence of Applicability & Routing Engine (RT-01 to RT-21)
- Audited Code-level issues & Stubs:
  - Hardcoded dummy JSON in `/api/ai/[feature]/route.ts`
  - Hardcoded static hash in `/api/signatures/route.ts`
  - Hardcoded inspection manifest in `/api/org/audit-packs/download/route.ts`
  - Dummy webhook response in `/api/org/webhooks/route.ts`
  - Dummy SCIM patch in `/api/scim/v2/Users/route.ts`
  - Missing standard error envelopes, missing pagination, missing idempotency
- Audited Testing:
  - No Jest/Vitest/Playwright test suites installed or configured

## In Progress
- Writing exhaustive handoff report to `handoff.md` in state folder
