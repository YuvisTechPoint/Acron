# ACORN LEGAL CONSULTANTS: RELEASE & DEPLOYMENT CHECKLIST

**Release Version:** v1.0 Production Candidate  
**Lead Engineer:** Acorn Release Engineer (`acorn-release-engineer`)

---

## 1. Environment Variables Checklist (Names Only - Never Store Values)

The following variables must be configured in the host environment / CI pipeline prior to live deployment:

- `NODE_ENV` (`production`)
- `PORT` (e.g. `3000` or host assigned)
- `NEXT_PUBLIC_APP_URL` (Canonical base URL, e.g. `https://acornlegal.in`)
- `RAZORPAY_KEY_ID` (Public payment key)
- `RAZORPAY_KEY_SECRET` (Server-side secret HMAC key)
- `RAZORPAY_WEBHOOK_SECRET` (Webhook cryptographic validation secret)
- `DATABASE_URL` (MongoDB / Database connection string with SSL enabled)
- `REDIS_URL` (Session & real-time cache cluster endpoint)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (Transactional mailer)

---

## 2. Pre-Release Verification Gates

- [x] **Production Build:** `npm run build` completed successfully (89 static pages prerendered, 3 dynamic routes compiled).
- [x] **Type Safety:** TypeScript strict compiler check passed with zero diagnostics.
- [x] **Route Coverage:** 92 of 92 application routes verified via HTTP crawler with zero 404s.
- [x] **Internal Hyperlinks:** 88 discovered internal navigation paths verified with zero broken targets.
- [x] **Bar Council Compliance:** Rule 36 advertising restrictions verified; mandatory footer disclaimer in place.
- [x] **Accessibility Baseline:** WCAG 2.1 Level AA color contrast confirmed across all tokens; keyboard focus rings active.
- [x] **Security Hardening:** HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy active in `next.config.mjs`.
- [x] **Clean Repository:** Zero API secrets, customer records, or credentials committed.

---

## 3. Deployment & Rollback Strategy

1. **Staging Verification:** Automated deployment to staging with synthetic test dockets.
2. **Production Release:** Zero-downtime rolling deployment behind edge reverse proxy (Cloudflare / NGINX).
3. **Rollback Procedure:**
   - Tag current release: `git tag -a v1.0.0-release -m "Acorn Legal Consultants v1.0 Production Release"`
   - In event of runtime incident: revert deployment to previous immutable container tag via CI orchestrator within 30-minute recovery objective.
   - Maintain automated database backup snapshots prior to any migration executions.
