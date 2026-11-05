import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal FAQ & Inquiries | Acorn Legal Consultants, Kolkata",
  description:
    "Explore answers to frequent legal questions on corporate advisory, disputes, real estate, and POSH compliance. Submit a confidential legal inquiry to our registry.",
  alternates: {
    canonical: "https://www.acornlegal.in/faq",
  },
  openGraph: {
    title: "Legal FAQ & Inquiries | Acorn Legal Consultants, Kolkata",
    description:
      "Clarifications on legal procedures, statutory timelines, and POSH mandates.",
    url: "https://www.acornlegal.in/faq",
    siteName: "Acorn Legal Consultants",
    type: "website",
  },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

