# ACORN LEGAL CONSULTANTS: PAGE BRIEFS & LAYOUT SPECIFICATIONS

## 1. Homepage (`/`)
- **Grid & Layout:** Asymmetric 12-column editorial grid. Maximum container width: 1240px.
- **Hero Treatment:** High-impact dark hero (`bg-ink-950`). Headline: *"Excellence in Law. <span class='italic text-brass-300'>Integrity</span> in Practice."* Background incorporates hero architectural imagery with dark navy gradient overlay.
- **Signature Devices:** Roman arch frame for Chambers imagery, hairline dividers with centered brass ticks (`#B08D57`), Roman numerals (`I`, `II`, `III`, `IV`) for key firm pillars.
- **Sections:**
  1. *Hero:* Authority assertion, quick consultation CTA, Chambers jurisdiction badge (Calcutta High Court).
  2. *Chambers Ethos (Ivory):* 3-column asymmetric layout detailing institutional pedigree, confidentiality standards, and advisory methodology.
  3. *Core Practice Areas (Stone):* Premium card directory featuring hover spotlight, icon badges, and direct links to practice deep-dives.
  4. *POSH & Institutional Governance Spotlight (Navy):* Quiet authority presentation of POSH compliance and dispute resolution solutions.
  5. *Senior Leadership & Counsel (Ivory):* Editorial biographical cards.
  6. *Case Docket Telemetry & Retainer Assistance (Stone):* Real-time case tracking teaser and client intake wizard.

---

## 2. About Chambers (`/about`)
- **Layout:** Warm ivory (`#FBF9F4`) baseline with an editorial 2-column narrative.
- **Signature Device:** Arch image showcasing Kolkata architectural heritage, hairline timeline of chambers foundation and institutional growth.
- **Hierarchy:** H1 "Counsel of Record. Trusted Advisors." Body text set at 18px with generous 1.75 line-height.
- **Ethos Highlights:** Focus on Bar Council ethics, independence of legal thought, and procedural thoroughness.

---

## 3. Practice Areas & Service Detail (`/services`, `/services/[slug]`)
- **Index Layout (`/services`):** Editorial list layout with subtle brass numbering (`01` through `06`). Hovering over items provides high-contrast brass accents and summary disclosures.
- **Detail Template (`/services/[slug]`):**
  - *Hero:* Clean ivory header with practice eyebrow tag and statutory references.
  - *Scope of Work:* 2-column checklist of advisory parameters, drafting services, and representation forums.
  - *Procedural Framework:* Step-by-step progress stepper illustrating client engagement lifecycle.
  - *Statutory Disclosures:* Citations to relevant Indian statutes (Companies Act 2013, Arbitration and Conciliation Act 1996, POSH Act 2013).

---

## 4. POSH Portal Suite (`/posh/*`)
- **Atmosphere:** Strictly "Calm Mode". Restrained ivory (`#FDFBF7`) background, dark navy accents, zero aggressive alarm red styling.
- **Signature Device:** "Quick Exit" fixed control in header to instantly redirect to a neutral portal; neutral browser tab title.
- **Sub-pages:**
  - `/posh/start` & `/posh/file`: Multi-step intake form with progress indicator, autosave notice, and OTP verification step (`/posh/file/sign`).
  - `/posh/my-case`: Status indicator (Received -> Notice -> Conciliation/Inquiry -> Report), document upload area with virus check indicator.
  - `/posh/ic`: Confidential workspace requiring signed conflict-of-interest declarations before unlocking case files.

---

## 5. Insights & Articles (`/blog`, `/blog/[slug]`)
- **Index:** Clean 3-column card grid with reading time estimates, publication dates in IST, and category tags.
- **Article Reader:** Focused single-column typography (max-w-[760px] centered), reading progress indicator, key statutory takeaways callout box, and author attribution.

---

## 6. Client Intake & Contact (`/request-service`, `/contact`)
- **Request Service:** 4-step progressive disclosure wizard (Service Type -> Matter Summary -> Documentation -> Contact Information) with client confidentiality assurance.
- **Contact:** 2-column split with chambers address, consultation hours, live Chambers clock, interactive SVG chambers map, and inquiry form.

---

## 7. Retainers & Settlement (`/pay`, `/pay/status/[id]`)
- **Payment Gateway:** Secure card and net banking payment interface powered by Razorpay test environment. Pre-filled matter reference and transparent GST breakdown (18% IGST/CGST).
- **Status Page:** Clear transaction voucher with printable receipt, transaction ID, and matter allocation notice.

---

## 8. Admin & Operations Console (`/admin/*`)
- **Skin:** Dense professional skin. Contrast navy sidebar (`#0A1424`), white cards on stone, 13px tabular data tables, status chips with icon and text.
- **Modules:** Request triage, case files, financial settlement ledger, rules engine config, audit trail inspector, and automated notification triggers.
