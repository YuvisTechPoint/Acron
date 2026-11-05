"use client";

import React from "react";
import { LegalPageLayout, TocItem } from "@/components/legal-page-layout";

const TOC: TocItem[] = [
  { id: "scope", title: "Scope of Fee Remittances" },
  { id: "consultation-cancellation", title: "Cancellation of Scheduled Consultations" },
  { id: "advisory-retainers", title: "Professional Advisory & Retainer Fees" },
  { id: "posh-training-refunds", title: "POSH Training & Compliance Audits" },
  { id: "ineligible-refunds", title: "Non-Refundable Circumstances" },
  { id: "processing-timeline", title: "Refund Processing & Banking Timelines" },
  { id: "contact-billing", title: "Billing Desk Contact" },
];

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      title="Refund &amp; Cancellation Policy"
      subtitle="Standard policies governing fee adjustments, consultation cancellations, and retainer reconciliations for Acorn Legal Consultants."
      eyebrow="BILLING POLICIES &bull; REMITTANCE TERMS"
      toc={TOC}
    >
      {/* Section 1 */}
      <section id="scope" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          1. Scope of Fee Remittances
        </h2>
        <p>
          Acorn Legal Consultants provides professional legal consulting, corporate documentation, dispute advisory, and POSH compliance services. Payments made through our digital payment gateway or wire transfer correspond to professional retainers, scheduled consultation slots, or statutory advisory deliverables.
        </p>
        <p>
          Unlike retail merchandise, legal professional services involve dedicated counsel time, conflict searches, legal research, and intellectual work commenced immediately upon receipt of instructions.
        </p>
      </section>

      {/* Section 2 */}
      <section id="consultation-cancellation" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          2. Cancellation of Scheduled Consultations
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-slate">
          <li>
            <strong className="text-navy">Notice greater than 24 hours:</strong> If you cancel a scheduled consultation at least 24 hours prior to the appointed time, you may request a 100% credit toward rescheduling or an 85% monetary refund (subject to deduction of 15% gateway processing and administrative overhead).
          </li>
          <li>
            <strong className="text-navy">Notice within 24 hours:</strong> Cancellations made within 24 hours of the appointment or failure to attend (&quot;no-show&quot;) are non-refundable, as counsel time has been reserved exclusively for your chambers appointment.
          </li>
          <li>
            <strong className="text-navy">Chambers Rescheduling:</strong> If our counsel must reschedule due to emergency court appearances or judicial directions, clients will be offered an immediate alternate slot or a 100% full refund upon request.
          </li>
        </ul>
      </section>

      {/* Section 3 */}
      <section id="advisory-retainers" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          3. Professional Advisory &amp; Retainer Fees
        </h2>
        <p>
          Retainers and matter fees are invoiced pursuant to signed engagement letters. Once legal research, drafting, or court appearances have commenced, retainer fees are earned proportionally based on professional hours rendered or completed contract milestones.
        </p>
        <div className="p-4 bg-surface rounded-card border border-border text-xs text-slate">
          <em>[Legal text to be supplied by Acorn counsel regarding unspent retainer account reconciliation rules.]</em>
        </div>
      </section>

      {/* Section 4 */}
      <section id="posh-training-refunds" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          4. POSH Training &amp; Compliance Audits
        </h2>
        <p>
          Corporate training modules, IC capacity-building workshops, and annual compliance audits cancelled with more than 7 business days written notice are eligible for an 80% refund. Cancellations received within 7 business days are eligible for a 50% credit valid for 6 months toward future workshops.
        </p>
      </section>

      {/* Section 5 */}
      <section id="ineligible-refunds" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          5. Non-Refundable Circumstances
        </h2>
        <p>Refunds shall not be granted under the following conditions:</p>
        <ul className="list-disc pl-5 space-y-2 text-slate">
          <li>Completed consultations or opinions where counsel has rendered advice.</li>
          <li>Drafted contracts, agreements, or legal notices delivered to the client.</li>
          <li>Disbursements paid to third parties, including court filing fees, stamp duties, process server charges, or statutory registry charges.</li>
          <li>Adverse judicial outcomes or court orders (in accordance with Bar Council ethical standards, advocate fees are not contingent upon litigation results).</li>
        </ul>
      </section>

      {/* Section 6 */}
      <section id="processing-timeline" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          6. Refund Processing &amp; Banking Timelines
        </h2>
        <p>
          Approved refunds are processed to the original payment source (credit card, net banking, or UPI) through Razorpay within <strong>7 to 10 working days</strong>. Acorn Legal Consultants shall not be liable for subsequent delays caused by the client&apos;s receiving bank or card issuing network.
        </p>
      </section>

      {/* Section 7 */}
      <section id="contact-billing" className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy border-b border-border pb-2">
          7. Billing Desk Contact
        </h2>
        <p>
          To request a cancellation, refund, or fee reconciliation, please transmit written instructions to our accounting registry:
        </p>
        <div className="bg-surface p-5 rounded-card border border-border space-y-2 text-xs">
          <strong className="text-navy text-sm block">Chambers Accounts &amp; Billing Registry:</strong>
          <p className="text-slate">Acorn Legal Consultants, 12/1 Park Street, 4th Floor, Kolkata 700016</p>
          <p className="text-slate">
            Email: <a href="mailto:billing@acornlegal.in" className="text-navy font-semibold underline">billing@acornlegal.in</a> &bull; Direct Phone: +91 33 2289 0000
          </p>
          <p className="text-slate font-medium">Please quote your Payment Reference Code (`ACN/RC/...`) or Invoice Number in all refund requests.</p>
        </div>
      </section>
    </LegalPageLayout>
  );
}
