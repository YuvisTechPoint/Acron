import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice Areas & Legal Services | Acorn Legal Consultants, Kolkata",
  description:
    "Explore our 6 core legal practice areas: Advisory, Legal Documentation, Dispute Resolution, Legal Representation, Corporate & Commercial, and POSH Compliance.",
  alternates: {
    canonical: "https://www.acornlegal.in/services",
  },
  openGraph: {
    title: "Practice Areas & Legal Services | Acorn Legal Consultants, Kolkata",
    description:
      "Comprehensive corporate, civil litigation, dispute resolution, and POSH compliance counsel in Kolkata.",
    url: "https://www.acornlegal.in/services",
    siteName: "Acorn Legal Consultants",
    type: "website",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

