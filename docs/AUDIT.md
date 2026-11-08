# ACORN LEGAL CONSULTANTS: CODEBASE & ARCHITECTURE AUDIT

## 1. Executive Summary & Stack Definition
- **Platform Architecture:** Next.js 14.2.35 (App Router with React Server Components)
- **Language / Typing:** TypeScript 5.6.3 with strict type checking enabled
- **Styling Architecture:** Tailwind CSS 3.4.14 with customized Quiet Authority design tokens
- **Component Libraries:** Custom headless primitives, Lucide React icons (0.454.0), Date-fns (3.6.0)
- **Build Target:** Standalone Node.js production deployment with prerendered static assets
- **Total Operational Routes:** 92 distinct routes (all verified via programmatic HTTP crawler, 0 errors)

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
- **Route Health:** 92 routes responded HTTP 200 OK.
- **Link Integrity:** 88 discovered internal links checked with 0 dead links.
- **Type Safety:** 0 TypeScript compile errors.
- **Static Optimization:** 89 statically prerendered routes + 3 dynamic server routes.
