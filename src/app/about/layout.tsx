import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Firm | Acorn Legal Consultants, Kolkata",
  description:
    "Learn about Acorn Legal Consultants in Kolkata. Discover our founding story, four-pillar approach, core values, and dedicated legal counsel team.",
  alternates: {
    canonical: "https://www.acornlegal.in/about",
  },
  openGraph: {
    title: "About Our Firm | Acorn Legal Consultants, Kolkata",
    description:
      "Where Legal Expertise Meets Strategic Excellence. Discover our values, approach, and Kolkata chambers counsel.",
    url: "https://www.acornlegal.in/about",
    siteName: "Acorn Legal Consultants",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

