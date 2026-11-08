---
name: acorn-security-reviewer
description: Use to review headers, CSP, form handling, rate limiting, dependency risks and secret handling for the Next.js site before release.
---
# Steps
1. Add security headers in next.config (HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors) and a strict CSP that matches the scripts actually used.
2. Review form handlers and API routes: validation (zod), rate limiting, honeypot, no sensitive data in logs or URLs.
3. Run npm audit and list high and critical issues; do not auto-upgrade major versions without approval.
4. Confirm no secrets in the repository and that .env files are ignored. Report in docs/SECURITY_REPORT.md.
