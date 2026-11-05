"use client";

import React from "react";
import { LegalPageLayout, TocItem } from "@/components/legal-page-layout";

const TOC: TocItem[] = [
  { id: "statutory-scope", title: "Statutory Scope & Commitment" },
  { id: "information-collected", title: "Categories of Information Collected" },
  { id: "posh-section-16", title: "POSH Section 16 Strict Non-Disclosure" },
  { id: "data-processing", title: "Purposes of Data Processing" },
  { id: "security-standards", title: "Information Security & Encryption" },
  { id: "financial-data", title: "Financial Remittance Data & Gateways" },
  { id: "client-rights", title: "Client Rights & Grievance Officer" },
];

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="How Acorn Legal Consultants collects, secures, and safeguards personal data, confidential matter records, and statutory POSH filings."
      eyebrow="DATA PRIVACY &bull; STATUTORY NON-DISCLOSURE"
      toc={TOC}
    >
      {/* Section 1 */}
      <section id="statutory-scope" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          1. Statutory Scope &amp; Commitment
        </h2>
        <p>
          Acorn Legal Consultants (&quot;the Firm&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates legal advisory and compliance chambers in Kolkata, West Bengal, India. We are deeply committed to respecting personal privacy, client-advocate professional privilege, and statutory confidentiality mandates under Indian law, including the Information Technology Act, 2000, the Digital Personal Data Protection Act, 2023, and the Advocates Act, 1961.
        </p>
        <p>
          This Privacy Policy sets out the principles governing data collected via our website (<strong>www.acornlegal.in</strong>), digital intake forms, service request channels, and secure compliance portals.
        </p>
      </section>

      {/* Section 2 */}
      <section id="information-collected" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          2. Categories of Information Collected
        </h2>
        <p>
          We collect only information reasonably necessary to evaluate prospective inquiries, deliver legal services, process statutory compliance filings, and facilitate authorized consultations:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate">
          <li>
            <strong className="text-navy">Contact &amp; Identification Data:</strong> Full legal name, professional email address, telephone/mobile number, organizational affiliation, and postal address.
          </li>
          <li>
            <strong className="text-navy">Matter Intake Details:</strong> High-level factual narratives, court or forum names, relevant dates, and preliminary documents uploaded voluntarily through our consultation intake forms.
          </li>
          <li>
            <strong className="text-navy">Technical &amp; Session Data:</strong> Browser user agent, timestamp of visit, and device category. As a firm policy, we do not employ aggressive behavioral advertising cookies or third-party tracking pixels.
          </li>
        </ul>
        <div className="p-4 bg-surface rounded-card border border-border text-xs text-slate">
          <em>[Legal text to be supplied by Acorn counsel regarding specific digital log retention schedules and local court record archives.]</em>
        </div>
      </section>

      {/* Section 3 */}
      <section id="posh-section-16" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          3. POSH Section 16 Strict Non-Disclosure
        </h2>
        <p>
          In accordance with <strong>Section 16 of the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013</strong> (&quot;POSH Act&quot;):
        </p>
        <blockquote className="border-l-2 border-gold pl-4 py-2 italic text-navy bg-surface rounded-r">
          &quot;Notwithstanding anything contained in the Right to Information Act, 2005, the contents of the complaint, the identity and addresses of the aggrieved woman, respondent and witnesses, any information relating to conciliation and inquiry proceedings, recommendations of the Internal Committee and the action taken by the employer shall not be published, communicated or made known to the public, press and media in any manner.&quot;
        </blockquote>
        <p>
          Our digital platform strictly isolates POSH matter workflows. Complaint records and survivor disclosures are stored with encryption at rest, restricted by Role-Based Access Control (RBAC), and never aggregated with general corporate marketing data. Breach of POSH Section 16 attracts statutory penalties under Section 17 of the POSH Act.
        </p>
      </section>

      {/* Section 4 */}
      <section id="data-processing" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          4. Purposes of Data Processing
        </h2>
        <p>Information submitted to the firm is processed strictly for the following purposes:</p>
        <ol className="list-decimal pl-5 space-y-2 text-slate">
          <li>Conducting conflict-of-interest checks prior to accepting formal legal engagements.</li>
          <li>Responding to initial consultations and scheduling chambers strategy sessions.</li>
          <li>Executing professional engagement letters and delivering agreed advisory services.</li>
          <li>Generating statutory GST invoices, receipts, and compliance audit documentation.</li>
          <li>Fulfilling legal and regulatory obligations imposed by Indian courts and tribunals.</li>
        </ol>
      </section>

      {/* Section 5 */}
      <section id="security-standards" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          5. Information Security &amp; Encryption
        </h2>
        <p>
          We deploy multi-layered technical and administrative safeguards to protect your personal information against unauthorized disclosure, alteration, or destruction. All data transmission across this website utilizes 256-bit Transport Layer Security (TLS 1.3). Digital case evidence uploaded through secure portals is hashed using SHA-256 for cryptographic integrity.
        </p>
        <div className="p-4 bg-surface rounded-card border border-border text-xs text-slate">
          <em>[Legal text to be supplied by Acorn counsel defining technical cloud infrastructure certifications and audit cycles.]</em>
        </div>
      </section>

      {/* Section 6 */}
      <section id="financial-data" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          6. Financial Remittance Data &amp; Gateways
        </h2>
        <p>
          Online payments for retainers and consultation fees are processed directly by <strong>Razorpay Software Private Limited</strong>, a PCI-DSS Level 1 compliant payment aggregator. Acorn Legal Consultants does not collect, process, or store credit card numbers, CVVs, debit card PINs, or UPI credentials on our servers.
        </p>
      </section>

      {/* Section 7 */}
      <section id="client-rights" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          7. Client Rights &amp; Grievance Officer
        </h2>
        <p>
          In accordance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, and the Digital Personal Data Protection Act, 2023, you may request access to, correction of, or deletion of your personal contact data, subject to statutory retention obligations for court records.
        </p>
        <div className="bg-surface p-5 rounded-card border border-border space-y-2 text-xs">
          <strong className="text-navy text-sm block">Chambers Data Grievance Officer:</strong>
          <p className="text-slate">Acorn Legal Consultants, Chambers Registry</p>
          <p className="text-slate">12/1 Park Street, 4th Floor, Kolkata 700016, West Bengal, India</p>
          <p className="text-slate">Email: <a href="mailto:privacy@acornlegal.in" className="text-navy font-semibold underline">privacy@acornlegal.in</a> &bull; Phone: +91 33 2289 0000</p>
        </div>
      </section>
    </LegalPageLayout>
  );
}
