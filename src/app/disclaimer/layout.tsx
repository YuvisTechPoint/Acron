import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bar Council Disclaimer | Acorn Legal Consultants, Kolkata",
  description:
    "Statutory declaration and website notice pursuant to Bar Council of India Rule 36 and the Advocates Act, 1961 for Acorn Legal Consultants, Kolkata.",
  alternates: {
    canonical: "https://www.acornlegal.in/disclaimer",
  },
};

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

