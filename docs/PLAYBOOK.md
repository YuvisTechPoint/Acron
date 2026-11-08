# ACORN LEGAL CONSULTANTS: BUILD PLAYBOOK & PROMPTS SPECIFICATION (B0 to B17)

## Part A: Decisions & Prerequisites
- **D-1 Monorepo Structure:** `apps/web` (Next.js marketing site & citizen portals), `apps/admin` (Next.js staff console), `apps/api` (Node, Express, Socket.io, Redis), `packages/shared` (Zod schemas), `packages/rules` (POSH rules engine).
- **D-2 Hosting & Region:** AWS / Cloudflare / Local Docker, India region (ap-south-1 Mumbai / Kolkata data sovereignty).
- **D-3 Payments:** Consultation retainers and fixed fee advisory in paise integers.
- **D-10 Penetration Testing:** Third-party security audit gate required prior to live complaint intake.
- **D-11 Alert Routing:** Content-free notifications dispatched to designated compliance officers.
- **D-23 Retention & Purge:** 7-year statutory retention with cryptographic disposal verification.

---

## Part B: Prompts & Implementation Specifications (B0 - B17)

### Prompt B0: Monorepo & Baseline Setup
Initialize repository workspace structure with strict TypeScript configurations, pino logger with PII scrubbing, helmet, CORS, and request tracking IDs (`x-request-id`).

### Prompt B1: Shared Schemas (`packages/shared`)
Define single source of truth Zod schemas for client intake requests, question & answer moderation, service taxonomy, and transaction records.

### Prompt B2: API Foundation & Error Envelope (`apps/api`)
Standardize API responses into an immutable envelope:
```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "meta": { "requestId": "req_...", "timestamp": "2026-11-08T..." }
}
```

### Prompt B3: Authentication & Multi-Factor Auth (MFA)
Implement Argon2id password hashing, rotating refresh tokens with reuse detection stored in httpOnly secure cookies, CSRF protection, TOTP MFA (RFC 6238) with SHA-256 hashed single-use backup recovery codes, account lockout after 5 failed attempts, and absolute session timeouts.

### Prompt B4: RBAC, Tenancy Scoping & Audit Chain
Tenant isolation enforced at the database repository query layer (`tenantScopedRepo`). Append-only cryptographic SHA-256 hash chain where each audit entry validates `hash = SHA256(prevHash + timestamp + actorId + action + payload)`.

### Prompt B5: Public Back End & Intake Handlers
REST endpoints for client intake requests (`/api/requests`) and public legal Q&A (`/api/qa`) featuring rate limiting, honeypot spam detection, and content sanitizer.

### Prompt B6: Razorpay Payments & GST Ledger
Server-side order generation in paise, HMAC SHA-256 webhook signature validation using raw body buffers, idempotent request handling via idempotency keys, and GST compliance receipts.

### Prompt B7: Realtime Telemetry & Live Feeds (Socket.io)
Socket.io server with Redis pub/sub adapter, permission-scoped rooms, and content-free event broadcasts notifying staff of new dockets within 5 seconds without exposing client names or case narratives.

### Prompt B8: Dense Staff Admin Console (`apps/admin`)
Dense professional skin (navy `#0A1424` sidebar with brass indicators, 13px tabular data grids, status chips, server-side filtering, CSV export with permission gates).

### Prompt B9: POSH Rules Engine (`packages/rules`)
Pure TypeScript rules engine implementing working day calculations, court holiday calendars, statutory timers TM-01 to TM-21, state machine T01 to T30, and IC composition validator with 40 table-driven test scenarios.

### Prompt B10: POSH Intake & Evidence Vault
Confidential multi-step intake wizard, OTP verification, virus scan hook on evidence uploads, and encrypted digital tokens.

### Prompt B11: IC Inquiry Workspace & Procedural Lifecycle
Docket management, witness summons generation, hearing minutes recorder, cross-examination logs, and final inquiry findings generator.

### Prompt B12: Complainant & Respondent Portals ("Calm Mode")
Calm mode interface, Quick Exit panic control, zero urgent alarm styling, neutral browser tab titles, and encrypted case communication.

### Prompt B13: Annual Report & Compliance Generator
Automated Section 21 / 22 Annual Report generator outputting formatted DOCX and PDF returns for submission to the District Officer. Small-group suppression (minimum cohort size of 5) prevents de-anonymization in analytics.

### Prompt B14: Enterprise LMS & Service Desk
Interactive employee POSH awareness modules, automated training certificate generation, and SLA-tracked legal service desk.

### Prompt B15: Docker Services & Infrastructure as Code
Containerized deployment stack including replica MongoDB, Redis cache, Mailpit local SMTP sandbox, ClamAV antivirus daemon, and MinIO S3 storage.

### Prompt B16: Automated Test Suite & CI/CD Pipeline
Continuous integration running ESLint, TypeScript compiler checks, contract testing against OpenAPI specs, Playwright journey tests, and Axe accessibility audits.

### Prompt B17: Operations Command & Go-Live Readiness
Incident response workflows, break-glass two-person authorization portal, backup restoration drill verification, and 17-point pre-flight checklist.
