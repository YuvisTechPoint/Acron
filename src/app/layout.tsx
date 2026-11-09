import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { AssistantWidget } from "@/components/assistant-widget";
import { QuickExit } from "@/components/quick-exit";
import { CookieBanner } from "@/components/cookie-banner";
import { SkipToContent } from "@/components/skip-to-content";
import { BackToTop } from "@/components/back-to-top";
import { CleanCopyHandler } from "@/components/clean-copy-handler";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://acornlegal.in"),
  title: {
    default: "Acorn Legal Consultants | Kolkata | Excellence in Law. Integrity in Practice.",
    template: "%s | Acorn Legal Consultants",
  },
  description:
    "Acorn Legal Consultants is a professional legal consultancy in Kolkata delivering thoughtful, precise, and result-oriented legal solutions for individuals, businesses, and organisations.",
  keywords: [
    "Law firm Kolkata",
    "Legal consultancy West Bengal",
    "POSH compliance Kolkata",
    "Internal Committee External Member",
    "Corporate legal consultant Kolkata",
    "Dispute resolution Kolkata",
  ],
  openGraph: {
    title: "Acorn Legal Consultants | Kolkata",
    description: "Excellence in Law. Integrity in Practice. Professional legal consultancy in Kolkata.",
    url: "https://acornlegal.in",
    siteName: "Acorn Legal Consultants",
    locale: "en_IN",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LegalService", "Organization"],
  name: "Acorn Legal Consultants",
  alternateName: "Acorn Legal",
  url: "https://acornlegal.in",
  logo: "https://acornlegal.in/logo.png",
  slogan: "Excellence in Law. Integrity in Practice.",
  description:
    "A professional legal consultancy delivering thoughtful, precise and result-oriented solutions for individuals, businesses and organisations in Kolkata and West Bengal.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Suite 4B, Camac Court, 25 Camac Street, Park Street District",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    postalCode: "700016",
    addressCountry: "IN",
  },
  telephone: "+91-33-2486-7700",
  email: "contact@acornlegal.in",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:30",
      closes: "19:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "16:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-ivory-50 text-ink antialiased font-sans selection:bg-brass-300/30">
        <CleanCopyHandler />
        <SkipToContent />
        <DisclaimerBanner />
        <QuickExit />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
        <BackToTop />
        <AssistantWidget />
      </body>
    </html>
  );
}
