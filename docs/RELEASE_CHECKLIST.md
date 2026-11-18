# ACORN CONSULTANTS: RELEASE & PRODUCTION READINESS CHECKLIST

**Release Version:** v3.0.0 Production Release Candidate  
**Lead Engineer:** Acorn Release Engineer (`acorn-release-engineer`)  
**Deployment Target:** Vercel Production & Enterprise Standalone Node.js Cluster  
**Domain:** `https://acornconsultants.in` (and Vercel edge deployment)

---

## 1. Environment Variables Checklist (Names Only - Zero Secret Leaks)

The following environment variables are validated by the platform runtime:

- `NODE_ENV` (`production`)
- `PORT` (`3000` or hosting provider dynamic port)
- `NEXT_PUBLIC_APP_URL` (`https://acornconsultants.in`)
- `SESSION_SECRET` (Cryptographic HMAC-SHA256 session signature key)
- `ENCRYPTION_KEY` (AES-256-GCM narrative vault 32-byte secret)
- `AUDIT_HMAC_SECRET` (Append-only audit trail HMAC verification secret)
- `BREAK_GLASS_SECRET` (Emergency dual-approval break-glass signature secret)
- `SIGNATURE_KEY_SECRET` (Digital e-sign HMAC verification key)
- `RAZORPAY_KEY_ID` (Public client gateway key)
- `RAZORPAY_KEY_SECRET` (Server-side HMAC-SHA256 signature secret)
- `RAZORPAY_WEBHOOK_SECRET` (Cryptographic webhook signature validator)
- `DATABASE_URL` (Sovereign MongoDB connection URI with TLS 1.3 enforced)
- `REDIS_URL` (Encrypted in-memory cache and session state cluster)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (Content-free transactional mailer)

---

## 2. Pre-Release Verification Gates

- [x] **Production Static Prerender:** `npm run build` compiled 135 of 135 pages with zero errors.
- [x] **Type Safety:** Strict TypeScript compilation (`tsc --noEmit`) completed with 0 diagnostics.
- [x] **ESLint Linting:** `next lint` completed with 0 errors and 0 warnings.
- [x] **Unit Test Suite:** 35 of 35 authoritative statutory, cryptographic, and access-control unit tests passed (100%).
- [x] **Real-Time Admin Suite:** 76 of 76 admin consoles, API mutations, and auth gates passed (100%).
- [x] **Interactive Workflows & APIs:** 15 of 15 end-to-end API and workflow verification suites passed (100%).
- [x] **HTTP Route Crawler:** 143 of 143 targeted application routes verified with HTTP 200 responses.
- [x] **Internal Hyperlinks:** 127 of 127 discovered hyperlinks confirmed live with zero 404s.
- [x] **Web App Manifest:** PWA Manifest `/manifest.webmanifest` generated with brand icons and standalone mode.
- [x] **AEO & LLM Search Engine File:** `/llms.txt` deployed with verified chambers registry for ChatGPT Search, Perplexity, Claude, and Gemini.
- [x] **Search Engine Optimization (SEO):** Trilingual Schema.org JSON-LD (`LegalService`, `Organization`, `WebSite`, `SearchAction`), XML Sitemap, and multi-bot `robots.txt` active.
- [x] **Bar Council of India Rule 36 Compliance:** Informational disclaimer embedded across public footers, chat widgets, and intake dockets. Zero banned advertising claims.
- [x] **Security Hardening:** Strict CSP, HSTS (`max-age=63072000; includeSubDomains; preload`), `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, and `Permissions-Policy` enforced in middleware and headers.
- [x] **Cryptographic Data Privacy:** AES-256-GCM sealed narrative vault, PII scrubber regex engine, and content-free event notifications.
- [x] **Clean Repository:** Zero API credentials, production keys, or real complainant data committed.

---

## 3. Rollback & Deployment Runbook

1. **Production Deployment Execution:**
   - Git push to `main` branch automatically triggers Vercel CI/CD pipeline.
   - For standalone container environments, execute `node .next/standalone/server.js`.
2. **Git Release Tagging:**
   - Tag release: `git tag -a v3.0.0-prod -m "Acorn Consultants v3.0.0 Production Release"`
   - Push tags: `git push origin --tags`
3. **Rollback Strategy:**
   - In event of unforeseen upstream network or gateway outage, instant one-click rollback to prior stable deployment via Vercel dashboard or CI orchestrator.
   - Database state uses immutable append-only records with hash chaining, eliminating schema rollback corruption.
