import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Acorn Legal Consultants, Kolkata",
  description:
    "Privacy and data protection policy of Acorn Legal Consultants, Kolkata. Learn how client data and statutory POSH Section 16 confidentiality are safeguarded.",
  alternates: {
    canonical: "https://www.acornlegal.in/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

