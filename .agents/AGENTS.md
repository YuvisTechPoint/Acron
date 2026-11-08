# ACORN LEGAL CONSULTANTS: PROJECT CONSTITUTION

## Mission
Transform the existing Next.js website into a premium, editorial, blue-and-ivory law-firm website that feels hand-crafted, calm and trustworthy. The design source of truth is docs/DESIGN_SYSTEM.md. The brand line is "Excellence in Law. Integrity in Practice." and "Where Legal Expertise Meets Strategic Excellence."

## Hard rules (never break)
1. The site is already built and its content is configured. DO NOT delete, rename or rewrite existing content, routes, API routes, forms, payment logic, environment variables, or data files. Restyle, restructure presentation and add components around them. If you believe copy should change, write the suggestion to docs/COPY_SUGGESTIONS.md and do not apply it.
2. Detect the stack first (Next.js version, App Router or Pages Router, styling system, component library). Adapt to it. If Tailwind or shadcn/ui are missing, propose adding them in the plan and wait for approval.
3. Only use design tokens from docs/DESIGN_SYSTEM.md. No hard-coded hex values in components.
4. Legal advertising rules: no testimonials, client results, rankings, guarantees, "best lawyer" claims or invented statistics. Use [placeholders] for unknown facts. Keep the disclaimer in the footer of every page.
5. Banned UI: popups, newsletter modals, auto-play carousels, infinite marquees, scroll hijacking, splash loaders, chat widgets, parallax over 24px, anything that repeats animation.
6. POSH pages and portals use "calm mode" (fade-only motion, no red alarm styling, no urgency language). Admin and console screens are dense and functional.
7. No new dependency without listing it in the plan (name, size, reason). Prefer zero new animation libraries beyond one of Framer Motion or GSAP.
8. Performance budget: LCP under 2.5s, CLS under 0.1, INP under 200ms, Lighthouse accessibility 95+.
9. Never read, print or commit secrets or .env values.

## Working method
- Always plan before coding. Produce an Implementation Plan and Task List artifact and wait for approval at each phase gate.
- Respect file ownership when running in parallel (see the master workflow). Never edit files owned by another agent; leave a note in docs/HANDOFFS.md instead.
- After each phase: run build, lint and type-check; take browser screenshots at 360, 768, 1280 and 1536 px; write a walkthrough. Fix failures before reporting done.
- Commit at the end of each phase with a clear message.

---

## APPLICATION LAYER RULES (Part 2)

Source of truth: docs/PRD.md and docs/PLAYBOOK.md (Part C, prompts B0 to B17). Where they disagree with a screen or a skill, the PRD wins and you must say so.

Security and privacy (never break):
1. Real complaint data never exists outside production. All seed and test data is synthetic.
2. Never log, print or store complaint content, names, phone numbers or tokens in logs, errors, tickets, notifications, analytics or test output. Use the scrubber from the baseline.
3. Notifications, emails and real-time events carry only case ID, organisation code, generic text and dates (content-free). A lint test must fail the build if any other merge field appears.
4. Case access is enforced on the SERVER by a single function (canAccessCase). Hiding buttons in the UI is not security.
5. Every record carries orgId; every query goes through the tenant-scoped repository. Cross-tenant access throws and is audited.
6. Audit log is append-only with a hash chain. No update or delete path exists in application code.
7. Secrets only from environment variables validated at startup. Never read or commit .env files.
8. All money in paise integers; all dates in UTC; shown in IST.
9. Security-critical areas (auth, MFA, encryption, key handling, canAccessCase, rules engine, payments, break-glass, retention, export) MUST be flagged "NEEDS HUMAN REVIEW" in the walkthrough and cannot be merged by agents alone.
10. Legal rules and timelines live only in packages/rules config files, effective-dated, with a "counsel to verify" comment. Never hard-code a deadline elsewhere.

Method: plan first; tests first for security and rules code; each stage ends with build, lint, type-check, test run, a walkthrough artifact and a git commit, then wait for my approval.

---

## LAUNCH AND OPERATIONS RULES (Part 3)

1. You NEVER receive, read, request or store production credentials, private keys, live payment keys or real personal data. Production deployment runs only from the CI pipeline after a human approves the release. Do not run deployment commands against production from this editor.
2. You may deploy only to STAGING, and only with synthetic data.
3. No force-push, no history rewriting, no deleting tags or branches without my explicit instruction. Every release has a git tag and a rollback plan.
4. Never disable a failing test, security check or lint rule to make a pipeline pass. Report the defect.
5. Infrastructure is code: everything you create (Docker, CI, IaC, monitoring) is committed and reviewable. No manual-only steps without a written runbook.
6. Operational screens (/ops) never show complaint content; they use case IDs only. Logs pass through the PII scrubber.
7. Every procedure you build is a state machine with an owner, time targets, evidence upload, audit entry per step and overdue state.
8. Defaults for open legal decisions are not yours to choose. Where the PRD says counsel must confirm, build the setting and leave it Open.
9. At each stage end: tests, walkthrough, screenshots, commit, STOP for approval.
