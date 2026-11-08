Run the Acorn premium redesign as a gated programme. Use Planning mode. Use sub-agents (skills) in parallel only where the table says so. After each phase: build, lint, type-check, screenshots at 360/768/1280/1536, a short walkthrough, a git commit, then STOP and ask me to approve before the next phase.

PHASE 1: AUDIT (sequential)
- acorn-codebase-auditor writes docs/AUDIT.md and the protected-files list. Wait for my approval.

PHASE 2: FOUNDATION (sequential)
- acorn-art-director: tokens, fonts, /design-system page, docs/PAGE_BRIEFS.md for every route.
- acorn-frontend-builder: shared primitives (Button, Link, Eyebrow, SectionHeading, Rule, ArchImage, Card, form fields, Accordion, Stepper).
- acorn-motion-engineer: motion helpers and reduced-motion hook.

PHASE 3: GLOBAL SHELL (sequential)
- acorn-frontend-builder: header with mega-menu, mobile drawer, footer, cookie card, 404 and 500 pages.
- acorn-motion-engineer: sticky header behaviour and route transition.

PHASE 4: PAGES (parallel, four sub-agents, each owns its folders)
- Agent A (acorn-frontend-builder + acorn-motion-engineer): Home page.
- Agent B (acorn-frontend-builder): About, Services index, Service detail template.
- Agent C (acorn-frontend-builder): POSH landing in calm mode, Insights index and article, FAQ.
- Agent D (acorn-frontend-builder): Request service, Contact, Pay and status pages, legal pages, campaign landing template.
- acorn-art-director reviews all four against PAGE_BRIEFS.md and sends rejections back.

PHASE 5: QUALITY (parallel, four sub-agents, read-mostly)
- acorn-content-seo-editor: metadata, JSON-LD, sitemap, compliance report.
- acorn-accessibility-auditor: audit and fix tokens and components.
- acorn-performance-engineer: Core Web Vitals fixes.
- acorn-security-reviewer: headers, CSP, forms, dependency audit.
Merge their changes in this order: accessibility, performance, SEO, security. Re-run build after each merge.

PHASE 6: BROWSER QA AND POLISH (sequential)
- acorn-browser-qa: full route and form testing at four widths, recordings, docs/QA_REPORT.md.
- Fix every defect, re-test until clean.

PHASE 7: RELEASE (sequential)
- acorn-release-engineer: docs/RELEASE_CHECKLIST.md and a pull request summary. Do not deploy.

At every gate, report: what changed, files touched, dependencies added, screenshots, metrics, risks, and what you need from me.
