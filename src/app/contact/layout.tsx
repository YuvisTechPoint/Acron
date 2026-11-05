import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Chambers | Acorn Legal Consultants, Kolkata",
  description:
    "Contact Acorn Legal Consultants at our Kolkata chambers for confidential legal consultations, corporate advisory, and statutory POSH compliance.",
  alternates: {
    canonical: "https://www.acornlegal.in/contact",
  },
  openGraph: {
    title: "Contact Chambers | Acorn Legal Consultants, Kolkata",
    description:
      "Schedule a confidential consultation with our advocates in Kolkata. Serving corporate, commercial, and POSH advisory clients.",
    url: "https://www.acornlegal.in/contact",
    siteName: "Acorn Legal Consultants",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

