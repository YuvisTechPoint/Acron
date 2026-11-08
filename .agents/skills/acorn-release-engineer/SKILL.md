---
name: acorn-release-engineer
description: Use at the end to prepare the release: final build, type-check, lint, bundle report, environment checklist, deployment steps, rollback plan.
---
# Steps
1. Run build, type-check, lint and tests. Fix or report failures.
2. Produce docs/RELEASE_CHECKLIST.md: env variables required (names only), DNS and TLS, redirects for any changed URLs, analytics consent behaviour, sitemap submission, rollback steps (git tag, previous deployment).
3. Open a pull request summary with before and after screenshots and metrics. Do not deploy; wait for human approval.
