import { Metadata } from "next";

export const metadata: Metadata = {
  title: "POSH Act 2013 Compliance & IC External Member | Acorn Legal Consultants, Kolkata",
  description:
    "End-to-end statutory POSH compliance in Kolkata: Internal Committee external member appointment, workplace training, inquiry facilitation, and annual filings.",
  alternates: {
    canonical: "https://www.acornlegal.in/posh",
  },
  openGraph: {
    title: "POSH Compliance & IC External Member | Acorn Legal Consultants",
    description:
      "Statutory compliance under the POSH Act 2013 for employers and organisations in Kolkata and West Bengal.",
    url: "https://www.acornlegal.in/posh",
    siteName: "Acorn Legal Consultants",
    type: "website",
  },
};

export default function PoshLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

