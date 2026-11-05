"use client";

import React from "react";
import { LegalPageLayout, TocItem } from "@/components/legal-page-layout";

const TOC: TocItem[] = [
  { id: "bci-rule-36", title: "Bar Council of India Rule 36 Statement" },
  { id: "no-legal-advice", title: "No Legal Advice or Opinion" },
  { id: "no-client-relationship", title: "Absence of Advocate-Client Privilege" },
  { id: "accuracy-currency", title: "Currency & Completeness of Content" },
  { id: "external-references", title: "External Citations & Third-Party Links" },
  { id: "jurisdiction", title: "Kolkata & Calcutta High Court Jurisdiction" },
];

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      title="Bar Council Disclaimer &amp; Notice"
      subtitle="Statutory compliance declaration under the Advocates Act, 1961 and the Bar Council of India Rules regarding digital information."
      eyebrow="STATUTORY DECLARATION &bull; BCI RULE 36"
      showTopBarCouncilNotice={true}
      toc={TOC}
    >
      {/* Section 1 */}
      <section id="bci-rule-36" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          1. Bar Council of India Rule 36 Statement
        </h2>
        <p>
          Under the rules established by the <strong>Bar Council of India</strong> (specifically Rule 36, Section IV, Chapter II, Part VI of the Bar Council of India Rules framed under the Advocates Act, 1961), advocates and legal practitioners in India are strictly barred from soliciting work, advertising, or self-promoting through public media, commercial campaigns, or digital endorsements.
        </p>
        <p>
          By visiting, browsing, or interacting with <strong>www.acornlegal.in</strong>, you explicitly acknowledge and agree to the following conditions:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate">
          <li>
            You are seeking information regarding Acorn Legal Consultants entirely of your own volition and initiative.
          </li>
          <li>
            There has been no advertisement, personal solicitation, invitation, or inducement of any form by Acorn Legal Consultants or any of its partners or advocates to solicit legal work through this website.
          </li>
          <li>
            The information provided on this website is made available solely at your request for basic informational, academic, and orientation purposes.
          </li>
          <li>
            No material downloaded or accessed from this website will be construed as legal advice or creating any contractual engagement.
          </li>
        </ul>
      </section>

      {/* Section 2 */}
      <section id="no-legal-advice" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          2. No Legal Advice or Opinion
        </h2>
        <p>
          The materials on this website—including legal articles, statutory summaries, POSH compliance guides, and answers provided in the general Q&amp;A repository—are offered solely as general informational overviews. They do not constitute formal legal advice, legal counsel, or binding legal opinions.
        </p>
        <p>
          Applicable laws, judicial precedents, and regulatory notifications are subject to rapid change. Interpretation of statutory provisions depends entirely on the unique facts of each specific situation. Readers must never act or refrain from acting on the basis of any content found on this website without seeking independent legal advice from an advocate licensed in the relevant jurisdiction.
        </p>
        <div className="p-4 bg-surface rounded-card border border-border text-xs text-slate">
          <em>[Legal text to be supplied by Acorn counsel clarifying limitations on retroactive statutory interpretations.]</em>
        </div>
      </section>

      {/* Section 3 */}
      <section id="no-client-relationship" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          3. Absence of Advocate-Client Privilege
        </h2>
        <p>
          Transmitting information through our general contact form, electronic mail addresses, or preliminary service inquiry tools does not establish an advocate-client relationship. Until a formal engagement letter is signed by an authorized partner of Acorn Legal Consultants, communications sent through this website are not protected by formal professional litigation privilege.
        </p>
        <p>
          Please refrain from transmitting confidential or proprietary case strategy documents through general public forms until formal conflict clearance is completed.
        </p>
      </section>

      {/* Section 4 */}
      <section id="accuracy-currency" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          4. Currency &amp; Completeness of Content
        </h2>
        <p>
          While Acorn Legal Consultants endeavors to maintain accurate and up-to-date informational content, we make no representations or warranties of any kind, express or implied, regarding the completeness, accuracy, reliability, or availability of the website or the information, legal summaries, or related graphics contained herein.
        </p>
      </section>

      {/* Section 5 */}
      <section id="external-references" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          5. External Citations &amp; Third-Party Links
        </h2>
        <p>
          This website may contain hyperlinks to statutory portals, court cause lists (e.g., Calcutta High Court, Supreme Court of India, National Company Law Tribunal), or government gazettes. These links are provided solely for user convenience. Acorn Legal Consultants exercises no editorial or technical control over third-party platforms and assumes no responsibility for their content or reliability.
        </p>
      </section>

      {/* Section 6 */}
      <section id="jurisdiction" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          6. Kolkata &amp; Calcutta High Court Jurisdiction
        </h2>
        <p>
          This website is managed and hosted from our chambers located in Kolkata, West Bengal, India. Any claims or disputes arising out of the access or use of this website shall be governed by Indian law and submitted to the exclusive jurisdiction of the competent courts in <strong>Kolkata, West Bengal</strong>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
