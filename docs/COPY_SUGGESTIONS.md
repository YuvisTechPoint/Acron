# ACORN LEGAL CONSULTANTS: COPY SUGGESTIONS & EDITORIAL RECOMMENDATIONS

> **Notice:** Under Rule 1 of the Project Constitution (`.agents/AGENTS.md`), all existing client-approved content, legal phrasing, route names, and data files remain strictly intact. The following recommendations are logged for editorial review by Acorn Managing Partners and Counsel.

---

## 1. Homepage Hero & Ethos
- **Current Headline:** *"Excellence in Law. Integrity in Practice."*
- **Recommendation:** Maintain as primary. Consider adding a formal subscript: *"Advocates & Legal Advisors admitted to practice before the High Court of Judicature at Calcutta and subordinate courts throughout West Bengal."*
- **Rationale:** Clarifies territorial qualification and institutional standing without violating Bar Council advertising restrictions.

---

## 2. Practice Area Descriptions
- **Corporate Commercial (`/services/corporate-commercial`):**
  - *Suggestion:* Emphasize cross-border compliance under FEMA and DPIIT regulations for overseas investments entering Eastern India.
- **Dispute Resolution (`/services/dispute-resolution`):**
  - *Suggestion:* Highlight institutional arbitration under the MCIA and DIAC rules alongside traditional ad-hoc arbitrations.

---

## 3. POSH Compliance Portal Notices
- **Intake Confirmation (`/posh/file/done`):**
  - *Current Copy:* Provides tracking token and status summary.
  - *Suggestion:* Add explicit reassurance: *"In accordance with Section 16 of the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, the identity and address of the aggrieved woman, respondent and witnesses, along with any information relating to conciliation and inquiry proceedings, are strictly confidential and exempt from disclosure."*

---

## 4. Retainer Payment Terms (`/pay`)
- *Suggestion:* Specify that all advance professional fee deposits are credited to a dedicated client ledger and adjusted against periodic invoices upon milestone deliverables.

---

## 5. Chambers Dispatch & Statutory Intelligence Subscription (Integrated Footer)
- **Directive:** Per client instructions, all consumer retail wording ("product drops", "restock alerts", "gear") and retail blue palette (`#1546e8`) from consumer gear references have been completely excised.
- **Institutional Implementation:** Implemented as a bespoke, quiet-authority legal dispatch desk directly integrated into the footer (`src/components/footer-chambers-dispatch.tsx`) right above the ACORN watermark as designated by counsel:
  - *Eyebrow:* `CHAMBERS DISPATCH • STATUTORY INTELLIGENCE`
  - *Title:* `Stay informed on statutory compliance & judicial precedents.`
  - *Subtitle:* `Receive concise legal intelligence, regulatory updates, and corporate governance briefings curated by senior counsel for corporate boards, compliance officers, and institutional leadership.`
  - *Credentials Bar:*
    1. `Quarterly Legal Gazette`: Statutory digests, High Court precedents & compliance revisions.
    2. `Institutional Discretion`: Privileged counsel distribution roster. Zero commercial tracking.
    3. `Regulatory Precision`: Companies Act, POSH IC mandates & WBRERA governance commentary.
  - *Form Inputs:* First Name, Last Name, Corporate / Professional Email Address, Subscribe Button.
  - *Consent Checkbox:* `I wish to receive quarterly statutory bulletins and chambers advisories. Privileged communication under Bar Council standards. Zero commercial spam.`
  - *Security Guarantee:* `Strict Confidentiality • Encrypted Transmission • Zero Commercial Sharing`.
- **Implementation Status:** Active and fully responsive across 360px–1536px viewports in `src/components/footer-chambers-dispatch.tsx` and wired into `src/components/footer.tsx`. Home page cleanly transitions from Confidential Intake into the editorial footer.

