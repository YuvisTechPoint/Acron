import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Acorn Legal Consultants, Kolkata",
  description:
    "Cookie and local storage policy of Acorn Legal Consultants. Minimal, privacy-first technical tokens with zero tracking on POSH portals under Rule BR-046.",
  alternates: {
    canonical: "https://www.acornlegal.in/cookies",
  },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

