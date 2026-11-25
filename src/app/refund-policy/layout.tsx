import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Acorn Legal Consultants, Kolkata",
  description:
    "Remittance, cancellation, and refund policy of Acorn Legal Consultants, Kolkata. Guidelines for scheduled consultations, retainers, and banking timelines.",
  alternates: {
    canonical: "https://acornconsultants.in/refund-policy",
  },
};

export default function RefundPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

