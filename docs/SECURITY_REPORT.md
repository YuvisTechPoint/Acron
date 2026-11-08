# ACORN LEGAL CONSULTANTS: SECURITY ARCHITECTURE & HARDENING REPORT

**Audit Date:** 2026-11-08  
**Auditor:** Acorn Security Reviewer (`acorn-security-reviewer`)

---

## 1. HTTP Security Headers Hardening

The application applies strict enterprise-grade security headers to all responses in `next.config.mjs`:

| Header | Configured Value | Security Purpose |
|---|---|---|
| **Strict-Transport-Security (HSTS)** | `max-age=63072000; includeSubDomains; preload` | Enforces strict HTTPS transport for two full calendar years across all subdomains. |
| **X-Frame-Options** | `DENY` | Prevents framing and clickjacking attacks across all pages. |
| **X-Content-Type-Options** | `nosniff` | Disables MIME type sniffing by client browsers. |
| **Referrer-Policy** | `strict-origin-when-cross-origin` | Protects URI path privacy during external navigations. |
| **Permissions-Policy** | `camera=(), microphone=(), geolocation=()` | Blocks unauthorized hardware access in client contexts. |
| **X-DNS-Prefetch-Control** | `on` | Optimizes external DNS resolution while guarding user privacy. |

---

## 2. Secrets & Credential Sanitization

- **Repository Scan:** Automated scan executed across git history and workspace.
- **Result:** Zero API keys, database credentials, Razorpay secret keys, or private certificates committed.
- **Gitignore Protection:** `.env`, `.env.local`, `.env.production`, `node_modules`, and `.next` are strictly ignored.
- **Runtime Environment:** Environment variables (e.g., `RAZORPAY_KEY_ID`, `DATABASE_URL`) are read exclusively from validated server environments.

---

## 3. Form Input Validation & Threat Mitigation

- **Client & Server Validation:** Form payloads submitted to `/api/requests`, `/api/qa`, and `/api/payments/verify` undergo structural type verification.
- **Spam & Bot Protection:** Honeypot form inputs detect automated bot submissions without burdening legitimate users with intrusive visual CAPTCHAs.
- **Payment Verification:** Razorpay order verification computes and validates HMAC SHA256 signatures server-side. Amounts are computed in paise on the server to prevent client-side price tampering.
- **POSH Confidentiality Isolation:** Complaint identifiers, witness records, and committee notes are encrypted in transit and isolated by tenant/organization ID.
