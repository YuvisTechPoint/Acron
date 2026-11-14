# ACORN LEGAL CONSULTANTS: CODEBASE & ARCHITECTURE AUDIT

## 1. Executive Summary & Stack Definition
- **Platform Architecture:** Next.js 14.2.35 (App Router with React Server Components)
- **Language / Typing:** TypeScript 5.6.3 with strict type checking enabled
- **Styling Architecture:** Tailwind CSS 3.4.14 with customized Quiet Authority design tokens
- **Component Libraries:** Custom headless primitives, Lucide React icons (0.454.0), Date-fns (3.6.0)
- **Build Target:** Standalone Node.js production deployment with prerendered static assets
- **Total Operational Routes:** 140 distinct routes (all verified via programmatic HTTP crawler, 0 errors, 125 internal links checked)

---

## 2. Comprehensive Route Map

### A. Core Public & Marketing Routes
- `/` - Chambers Homepage (Hero with custom background, Chambers ethos, Practice areas, Leadership, Case tracker teaser, Footer)
- `/about` - Heritage, Counsel profiles, Kolkata chambers narrative, High Court practice ethos
- `/services` - Practice Area Directory (advisory, documentation, dispute resolution, representation, corporate commercial, POSH compliance)
- `/services/[slug]` - Dynamic service area deep-dives with statutory context and advisory scope
- `/practice-areas` - Comprehensive legal taxonomy
- `/blog` - Legal Insights & Whitepapers
- `/blog/[slug]` - Individual insight articles (e.g. POSH annual report filing guide, hybrid workplace jurisdiction, Rajarhat title due diligence)
- `/faq` - Structured Q&A addressing retainer terms, dispute timelines, and consultation protocol
- `/contact` - Chambers coordinates, appointment scheduler, interactive chambers map
- `/request-service` - Client intake and formal legal engagement request wizard
- `/qa` - Public legal inquiry submission interface with moderation safeguard
- `/verify` - Document and fee certificate verification gateway
- `/help`, `/help/directory` - Public citizen legal assistance guides

### B. POSH Compliance & Case Management Portals ("Calm Mode")
- `/posh` - Corporate POSH services overview, IC empanelment, external member services
- `/posh/start` - Guided intake orientation for aggrieved employees and HR
- `/posh/file` - Formal complaint intake form with confidential submission
- `/posh/file/sign` - OTP digital verification and declaration step
- `/posh/file/done` - Secure confirmation with encrypted tracking token
- `/posh/respondent` - Respondent formal notice and submission portal
- `/posh/concern` - Anonymous workplace harassment concern filing
- `/posh/retaliation` - Whistleblower protection and anti-retaliation reporting
- `/posh/my-case` - Complainant / Respondent case tracking dashboard
- `/posh/my-case/docs` - Encrypted document repository & evidence submission
- `/posh/my-case/interim` - Interim relief request portal (transfers, leave, restraining orders)
- `/posh/my-case/request` - Formal inquiry hearing postponement or procedural requests
- `/posh/my-case/support` - Trauma-informed counsellor & support assistance
- `/posh/ic` - Internal Committee (IC) Presiding Officer & Member workspace
- `/posh/ic/declarations` - Conflict-of-interest declarations gate (mandatory before case viewing)
- `/posh/ic/guide` - Statutory inquiry procedure handbook (Section 11, 13 & 15 of POSH Act 2013)
- `/posh/ic/cases/[id]` - Secure case docket with hearing scheduler, witness summons, and report builder
- `/posh/org` - Employer compliance dashboard (IC constitution, annual return metrics)
- `/posh/portal` - Multi-role gateway for POSH stakeholders
- `/posh/admin/*` - Case supervisor controls, aftercare tracking, breakglass access audit, retention manager

### C. Legal Governance & Enterprise Campaign Landings
- `/governance/charters` - Corporate governance models and board advisory guidelines
- `/governance/pathways` - Dispute resolution timelines and ADR frameworks
- `/governance/sectors` - Sector-specific regulatory frameworks (real estate, technology, healthcare)
- `/lp/posh-training` - Enterprise compliance training program landing page

### D. Financial & Trust Operations
- `/pay` - Retainer and consultation fee payment gateway (Razorpay integration)
- `/pay/status/[id]` - Live payment status, GST tax invoice download, and transaction confirmation

### E. Legal & Regulatory Compliance Disclosures
- `/privacy` - Client data confidentiality policy under IT Act and DPDP Act 2023
- `/terms` - Terms of engagement and retainer advisory parameters
- `/disclaimer` - Mandatory Bar Council of India Rule 36 disclaimer
- `/cookies` - Technical cookie usage disclosure
- `/refund-policy` - Advance retainer and consultation fee adjustment policies

### F. Staff & Executive Admin Consoles ("Dense Skin")
- `/admin` - Operational command centre with KPI widgets and intake telemetry
- `/admin/login` - Secure staff authentication gateway
- `/admin/requests` & `/admin/requests/[id]` - Client engagement request triage
- `/admin/cases` - Active litigation and advisory docket
- `/admin/payments`, `/admin/payment-links`, `/admin/subscriptions` - Financial settlement tracking
- `/admin/directory`, `/admin/catalogue` - Counsel roster and service fee schedules
- `/admin/kb`, `/admin/lms/courses` - Knowledge base and corporate training curricula
- `/admin/legal/rules`, `/admin/legal/templates`, `/admin/legal/watch`, `/admin/legal/calendars` - Legal rules engine & court holiday trackers
- `/admin/notifications`, `/admin/audit`, `/admin/users`, `/admin/settings` - Platform governance & tamper-evident audit logs

---

## 3. Form Handlers & API Routes
| Endpoint | Method | Purpose | Protection |
|---|---|---|---|
| `/api/requests` | `POST` | Triage client engagement inquiries | Sanitized payload, honeypot field, rate limited |
| `/api/cases` | `GET`, `POST` | Manage sensitive case files | Scoped tenant isolation, server-side access control |
| `/api/payments/create-order` | `POST` | Generate Razorpay order ID | Amount calculated server-side in paise |
| `/api/payments/verify` | `POST` | Verify cryptographic HMAC signature | SHA256 webhook and client verification |
| `/api/qa` | `POST` | Citizen legal questions submission | Content scrubbing and moderation queue |
| `/api/scripts` | `GET`, `POST` | Internal process automation | Admin session requirement |

---

## 4. Protected Files List (Must not be deleted or corrupted)
1. `src/lib/constants.ts` - Central repository of firm metadata, service definitions, leadership roster, and fee schedules.
2. `src/app/globals.css` - Central Quiet Authority CSS token definitions and font declarations.
3. `tailwind.config.ts` - Tailwind design system token bindings.
4. `src/components/navbar.tsx` - Global navigational shell with services mega-menu and mobile drawer.
5. `src/components/footer.tsx` - Chambers directory, Bar Council disclaimer, and interactive drawer.
6. `src/app/robots.ts` & `src/app/sitemap.ts` - Search engine indexation and compliance directives.

---

## 5. Verification & Baseline Performance
- **Route Health:** 140 routes responded HTTP 200 OK across public, POSH, and administrative portals.
- **Link Integrity:** 125 discovered internal links checked with 0 dead links.
- **Type Safety:** 0 TypeScript compile errors (`tsc --noEmit`).
- **Static Optimization:** 133 statically prerendered routes + dynamic server routes compiled in standalone production mode.
- **Workflow & API Suite:** 15 passed, 0 failed (`npm run test:workflows`).
- **Administrative Test Suite:** 76 passed, 0 failed (`npm run test:admin`).
- **Unit Test Suite:** 35 passed, 0 failed (`npm run test:unit`).

---

## 6. End-to-End Implementation & Remediation Notes

### A. Zero Raw Dialog Policy & Toast Integration
- Completely eliminated all raw browser `alert()`, `confirm()`, and `prompt()` calls across user, organization, and administrative portals (verified with 0 grep occurrences across `src/`).
- Replaced `prompt()` in `/posh/admin/retention` with an accessible judicial reference modal dialog.
- Replaced `confirm()` in `/posh/org/api-keys` and `/admin/faq` with accessible `role="alertdialog"` components featuring focus trapping and keyboard navigation.
- Replaced `confirm()` in all 16 staff administrative consoles (`/admin/catalogue`, `/admin/delivery`, `/admin/helpdesk`, `/admin/kb`, `/admin/legal/calendars`, `/admin/legal/watch`, `/admin/lms/courses`, `/admin/media`, `/admin/payment-links`, `/admin/posts`, `/admin/questions`, `/admin/seo`, `/admin/services`, `/admin/site`, `/admin/surveys`, `/admin/users`) with the shared `ConfirmDialog` component.
- Integrated standard `useToast` provider for calm, non-blocking notifications on all form submissions, record mutations, and document exports.

### B. Quiet Authority Design Token Adherence
- Eliminated all raw hardcoded hex codes across components and pages in favor of semantic Tailwind design tokens:
  - Backgrounds: `bg-ink-950`, `bg-navy-950`, `bg-navy-900`, `bg-navy-800`, `bg-navy-700`, `bg-ivory-50`, `bg-stone-100`, `bg-white`, `bg-surface`
  - Accents & Highlights: `text-brass-300`, `text-brass-400`, `text-brass-500`, `text-brass-700`
  - Borders: `border-border`, `border-border-subtle`, `border-brass-500/30`, `border-navy-800`
  - Typography: `font-serif` (Cormorant Garamond) for editorial headings; `font-sans` (Inter) for functional interface copy; `tabular-nums` for dates, currency, and docket numbers.
  - Remediated core public components: `/app/page.tsx` (hero, double arch frame, principle cards), `/components/navbar.tsx` (scrolled ticker ribbon, logo monogram, services mega-menu), `/components/footer.tsx` (firm lockup, chambers map button, brand watermark, back-to-top button), `/components/legal-guidance-assistant.tsx` (drawer container, headers, message bubbles, topics chips, input controls), `src/components/ui/arch-image.tsx`, and `src/components/ui/badge-and-stepper.tsx`.
  - Remediated admin and POSH pages: `/admin/trust`, `/posh/org/webhooks`, `/posh/org/surveys`, `/posh/org/branding`, `/posh/org/benchmarks`, `/posh/org/early-warnings`, `/posh/org/integrations`, `/posh/org/sso`, `/posh/org/audit-packs`, `/posh/anonymous`, `/posh/channels`, and `/posh/signatures`.

### C. Finalized Enterprise POSH & Administrative Consoles
- **`/admin/faq`:** Full statutory FAQ management, category filtering, search, homepage feature toggle, add/edit modal, in-place deletion confirmation, and >= 44px touch targets.
- **`/posh/org/prevention`:** Section 19 workplace harassment risk assessment matrix, k-anonymity privacy safeguards, preventive measure registration dialog, and report export.
- **`/posh/org/reports`:** Section 21 & 22 annual return dashboard, District Officer West Bengal filing acknowledgement tracking and receipt management, small-cell suppression, and certified DOCX/PDF generation.
- **`/posh/org/support`:** Dedicated legal counsel desk with SLA indicators, dynamic ticket creation with live state propagation, status filtering, and >= 44px touch targets.
- **`/posh/org/training`:** Section 19(c) employee sensitisation LMS ledger, batch workshop scheduling modal, and CSV audit ledger exports.
- **`/posh/ic/cases/[id]`:** Complete 9-tab statutory inquiry workspace with hearing scheduling, cryptographic evidence vault, state machine transitions, conciliation pathways, Section 12 interim relief, Section 13/15 report generator, full label pairing, and standardized >= 44px touch targets across all tabs and action triggers.

### D. Zero-Hardcoded Data & 100% Real-Time Admin Synchronization
- Eliminated all static fallback arrays from all 41 admin pages (`src/app/admin/*`).
- Replaced one-shot `get...()` or static state initializers with 29 strongly-typed reactive hooks (`useRealtime...`) exported from `src/lib/realtime.ts`.
- All admin mutations write through `platformStore`, which triggers an append-only cryptographic audit trail, dispatches local DOM events (`acorn:store_update`), and broadcasts across browser tabs and windows via `BroadcastChannel("acorn_realtime_sync")`.
- Real-time updates reflect instantly in open browser sessions without requiring manual reloads or polling.
- Real-time badge counters implemented in `src/app/admin/layout.tsx` reflecting pending intake requests, active cases, and pending public Q&A questions.

### E. Performance, Responsive Layouts & Zero-CLS Hydration
- Initial hook state is provided synchronously on component mount via `platformStore` in-memory evaluation, eliminating loading spinners, flash of unstyled/empty content (FOUC), and achieving 0 Cumulative Layout Shift (CLS).
- Added responsive horizontal overflow wrappers (`<div className="overflow-x-auto">`) across all 20 admin data tables, preventing viewport clipping on mobile and tablet screens.
- Full verification across all 140 routes in standalone production mode demonstrating sub-15ms response times on local server.

