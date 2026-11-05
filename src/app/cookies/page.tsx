"use client";

import React from "react";
import { LegalPageLayout, TocItem } from "@/components/legal-page-layout";

const TOC: TocItem[] = [
  { id: "what-are-cookies", title: "What Are Cookies &amp; Local Storage" },
  { id: "categories", title: "Cookie Categories We Use" },
  { id: "posh-zero-tracking", title: "Zero Tracking on POSH Compliance Portals" },
  { id: "cookie-preferences", title: "Managing Your Cookie Preferences" },
  { id: "third-party-services", title: "Third-Party Service Providers" },
  { id: "policy-updates", title: "Updates to this Policy" },
];

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      subtitle="Details of our minimal, privacy-first cookie usage, local storage tokens, and absolute non-tracking policy across POSH portals."
      eyebrow="COOKIE USAGE &bull; PRIVACY PREFERENCES"
      toc={TOC}
    >
      {/* Section 1 */}
      <section id="what-are-cookies" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          1. What Are Cookies &amp; Local Storage
        </h2>
        <p>
          Cookies are small text files stored on your browser or device when you visit websites. They help websites remember essential user preferences (such as cookie consent choices, active sessions, and dark/light mode configurations) across visits.
        </p>
        <p>
          Acorn Legal Consultants adheres to a strict, privacy-first architectural approach: we do not employ aggressive cross-site tracking cookies, behavioural advertising pixels (such as Meta Pixel or Google Ad retargeting), or biometric fingerprinting.
        </p>
      </section>

      {/* Section 2 */}
      <section id="categories" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          2. Cookie Categories We Use
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-surface rounded-card border border-border">
            <h3 className="font-serif font-bold text-navy text-base">A. Strictly Essential Cookies &amp; Tokens (Mandatory)</h3>
            <p className="text-xs text-slate mt-1 leading-relaxed">
              Required for basic website navigation, form submission security (CSRF protection), and remembering your cookie preference decision (`acorn_cookie_consent`). These cannot be disabled in our systems.
            </p>
          </div>

          <div className="p-4 bg-surface rounded-card border border-border">
            <h3 className="font-serif font-bold text-navy text-base">B. Privacy-Preserving Analytics (Optional)</h3>
            <p className="text-xs text-slate mt-1 leading-relaxed">
              Aggregated, anonymized page performance statistics used exclusively to monitor website responsiveness and detect server errors. IP addresses are truncated, and data is never cross-referenced with advertising networks.
            </p>
          </div>

          <div className="p-4 bg-surface rounded-card border border-border">
            <h3 className="font-serif font-bold text-navy text-base">C. Marketing &amp; Retargeting (Disabled by Default)</h3>
            <p className="text-xs text-slate mt-1 leading-relaxed">
              We do not run ad networks or behavioral retargeting scripts. In accordance with Bar Council of India Rule 36, all marketing pixels are strictly prohibited on this website.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="posh-section-zero-tracking" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          3. Zero Tracking on POSH Compliance Portals
        </h2>
        <p>
          Under Rule <strong>BR-046</strong> and <strong>Section 16 of the POSH Act, 2013</strong>, survivor confidentiality is an absolute statutory obligation.
        </p>
        <div className="p-4 bg-navy/5 rounded-card border-l-4 border-l-navy border border-border text-xs text-navy space-y-1">
          <strong className="block font-semibold">Trauma-Informed Zero Telemetry Guarantee:</strong>
          <p className="text-slate leading-relaxed">
            All routes under <code className="text-navy font-bold">/posh/</code> and confidential inquiry submission forms completely disable all analytics and non-essential cookies. No external telemetry scripts are permitted to execute on these endpoints under any circumstances.
          </p>
        </div>
      </section>

      {/* Section 4 */}
      <section id="cookie-preferences" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          4. Managing Your Cookie Preferences
        </h2>
        <p>
          You can modify or revoke your cookie choices at any time using our Cookie Consent Banner or through your web browser settings. Most modern browsers allow you to block third-party cookies, clear cookies upon exiting, or run sessions in private/incognito mode.
        </p>
        <div className="p-4 bg-surface rounded-card border border-border text-xs text-slate">
          <em>[Legal text to be supplied by Acorn counsel detailing exact steps for cookie revocation across Chrome, Firefox, Safari, and Edge.]</em>
        </div>
      </section>

      {/* Section 5 */}
      <section id="third-party-services" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          5. Third-Party Service Providers
        </h2>
        <p>
          When you use our secure Pay Online gateway, Razorpay processes transactions under PCI-DSS Level 1 compliance. Razorpay may set session cookies strictly necessary to authenticate financial transactions and deter credit card fraud.
        </p>
      </section>

      {/* Section 6 */}
      <section id="policy-updates" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          6. Updates to this Policy
        </h2>
        <p>
          We periodically review this Cookie Policy to ensure compliance with updated data protection directives issued under the Digital Personal Data Protection Act, 2023. Any revisions will be reflected on this page with an updated effective date.
        </p>
      </section>
    </LegalPageLayout>
  );
}
