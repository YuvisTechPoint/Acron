import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Legal Service | Acorn Legal Consultants, Kolkata",
  description:
    "Submit a structured matter intake or advisory proposal request to Acorn Legal Consultants in Kolkata. Confidential and acknowledged within one business day.",
  alternates: {
    canonical: "https://www.acornlegal.in/request-service",
  },
  openGraph: {
    title: "Request a Legal Service | Acorn Legal Consultants, Kolkata",
    description:
      "Confidential legal intake for individuals and corporations. Initial assessment within 1 business day.",
    url: "https://www.acornlegal.in/request-service",
    siteName: "Acorn Legal Consultants",
    type: "website",
  },
};

export default function RequestServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

