"use client";

import React from "react";
import { LegalPageLayout, TocItem } from "@/components/legal-page-layout";

const TOC: TocItem[] = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "no-privilege", title: "No Advocate-Client Relationship" },
  { id: "nature-of-content", title: "Informational Nature of Content" },
  { id: "engagement-terms", title: "Formal Engagement & Retainers" },
  { id: "online-remittance", title: "Online Payments & Invoicing" },
  { id: "intellectual-property", title: "Intellectual Property Rights" },
  { id: "liability-limitation", title: "Limitation of Liability" },
  { id: "jurisdiction", title: "Governing Law & Kolkata Jurisdiction" },
];

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      subtitle="Standard terms and conditions governing the access, use, and digital engagement with Acorn Legal Consultants."
      eyebrow="LEGAL TERMS &bull; CONDITIONS OF USE"
      toc={TOC}
    >
      {/* Section 1 */}
      <section id="acceptance" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing, browsing, or using the website of Acorn Legal Consultants (<strong>www.acornlegal.in</strong>) or any digital portals associated with our chambers, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service, our Privacy Policy, and our Disclaimer. If you do not agree to these terms, you must discontinue use immediately.
        </p>
      </section>

      {/* Section 2 */}
      <section id="no-privilege" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          2. No Advocate-Client Relationship
        </h2>
        <p>
          Accessing this website, submitting an inquiry through our contact form, requesting a preliminary consultation, or posing questions in our digital Q&amp;A system does <strong>not</strong> create an advocate-client relationship or create any duty of representation between you and Acorn Legal Consultants.
        </p>
        <p>
          An advocate-client relationship is established solely through a formal, mutually executed Engagement Letter and Fee Agreement following standard conflict-of-interest clearance.
        </p>
      </section>

      {/* Section 3 */}
      <section id="nature-of-content" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          3. Informational Nature of Content
        </h2>
        <p>
          The materials, articles, case summaries, FAQ responses, and guidance notes published on this website are intended solely for general academic and informational reference. They do not constitute formal legal opinions or advice and should not be relied upon as a substitute for professional legal analysis on specific facts.
        </p>
        <div className="p-4 bg-surface rounded-card border border-border text-xs text-slate">
          <em>[Legal text to be supplied by Acorn counsel detailing limitations on statutory updates and jurisdictional precedents.]</em>
        </div>
      </section>

      {/* Section 4 */}
      <section id="engagement-terms" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          4. Formal Engagement &amp; Retainers
        </h2>
        <p>
          All professional advisory, litigation representation, drafting, and POSH compliance engagements are executed under separate, written terms defining the scope of counsel, fee structures (retainer, hourly, or lump-sum), reimbursable disbursements, and confidentiality obligations.
        </p>
      </section>

      {/* Section 5 */}
      <section id="online-remittance" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          5. Online Payments &amp; Invoicing
        </h2>
        <p>
          Payments made through our Pay Online facility (/pay) are remittances toward agreed retainers, consultation bookings, or invoices issued by our registry. All payments are subject to 18% statutory Goods and Services Tax (GST). Official receipts (`ACN/RC/...`) and tax invoices (`ACN/INV/...`) are generated immediately upon gateway verification.
        </p>
      </section>

      {/* Section 6 */}
      <section id="intellectual-property" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          6. Intellectual Property Rights
        </h2>
        <p>
          All content on this website, including analysis articles, editorial texts, branding logos, design systems, layouts, and software architectures, is the intellectual property of Acorn Legal Consultants and protected under the Indian Copyright Act, 1957. Content may not be reproduced, republished, or syndicated without prior written consent.
        </p>
      </section>

      {/* Section 7 */}
      <section id="liability-limitation" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          7. Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted by applicable law, Acorn Legal Consultants, its partners, advocates, and associates shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of, or inability to use, this website or any information contained herein.
        </p>
        <div className="p-4 bg-surface rounded-card border border-border text-xs text-slate">
          <em>[Legal text to be supplied by Acorn counsel on liability caps and technical downtime disclaimers.]</em>
        </div>
      </section>

      {/* Section 8 */}
      <section id="jurisdiction" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          8. Governing Law &amp; Kolkata Jurisdiction
        </h2>
        <p>
          These Terms of Service and any disputes or claims arising out of or related to this website shall be governed by and construed in accordance with the laws of the Republic of India. The courts and tribunals situated in <strong>Kolkata, West Bengal</strong> shall have exclusive jurisdiction over any proceeding arising out of these terms.
        </p>
      </section>
    </LegalPageLayout>
  );
}
