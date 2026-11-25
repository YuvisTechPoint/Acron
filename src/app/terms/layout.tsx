import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Acorn Legal Consultants, Kolkata",
  description:
    "Terms of service and digital conditions of use for Acorn Legal Consultants, Kolkata. Covers engagement principles, payments, and Calcutta jurisdiction.",
  alternates: {
    canonical: "https://acornconsultants.in/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

