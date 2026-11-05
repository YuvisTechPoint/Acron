import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Insights & Case Notes | Acorn Legal Consultants, Kolkata",
  description:
    "Authoritative legal analysis, Calcutta High Court case notes, corporate regulatory briefings, and POSH compliance guides published by Acorn Legal Consultants.",
  alternates: {
    canonical: "https://www.acornlegal.in/blog",
  },
  openGraph: {
    title: "Legal Insights & Commentary | Acorn Legal Consultants, Kolkata",
    description:
      "Statutory updates, corporate governance analysis, and court case notes from Kolkata counsel.",
    url: "https://www.acornlegal.in/blog",
    siteName: "Acorn Legal Consultants",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

