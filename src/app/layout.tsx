import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
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
import { ChunkRecovery } from "@/components/chunk-recovery";
import { Providers } from "@/components/providers";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { PWARegister } from "@/components/pwa-register";

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

export const viewport: Viewport = {
  themeColor: "#1F3864",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://acornconsultants.in"),
  title: {
    default: "Acorn Consultants | Educational, Tax & Legal Services",
    template: "%s | Acorn Consultants",
  },
  description:
    "Over 15 years of expertise in Educational, Tax & Legal Services. Dedicated legal advocacy, 30-year property title search, doorstep Leave & License registration, registered Wills, co-operative society management, MEA Apostille attestation, and educational guidance.",
  keywords: [
    "Acorn Consultants",
    "Educational Tax & Legal Consultants",
    "Advocate on Panel Rajesh Telge",
    "Doorstep Leave and License registration",
    "30 years land title search report",
    "Court marriage lawyer",
    "Marriage registration certificate",
    "Registered Will drafting and execution",
    "Co-operative housing society formation GDCA auditor",
    "MahaRERA complaint registration",
    "Motor accident hit and run claim compensation MV Act",
    "MEA Apostille and Embassy attestation",
    "Private 10th SSC 12th coaching guidance",
    "College admissions guidance MBBS MD Pharmacy",
    "Mumbai University admission form filling",
    "School RTE form filling assistance",
    "POSH compliance and External Member",
  ],
  alternates: {
    canonical: "https://acornconsultants.in",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Acorn Consultants | Educational, Tax & Legal Services",
    description: "Over 15 years of expertise in Educational, Tax & Legal Services. Work done well, with a personal touch.",
    url: "https://acornconsultants.in",
    siteName: "Acorn Consultants",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://acornconsultants.in/brand/logo.png",
        width: 1200,
        height: 1200,
        alt: "Acorn Consultants Emblem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Acorn Consultants | Educational, Tax & Legal Services",
    description: "Over 15 years of expertise in Educational, Tax & Legal Services. Work done well, with a personal touch.",
    images: ["https://acornconsultants.in/brand/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LegalService", "ProfessionalService", "Organization"],
      "@id": "https://acornconsultants.in/#organization",
      name: "Acorn Consultants",
      alternateName: [
        "Acorn Legal Consultants",
        "Acorn Educational, Tax & Legal Consultants",
      ],
      url: "https://acornconsultants.in",
      logo: "https://acornconsultants.in/brand/logo.png",
      image: "https://acornconsultants.in/brand/hero.png",
      slogan: "Work done well, with a personal touch.",
      description:
        "Over 15 years of expertise in Educational, Tax & Legal Services. Legal representation, 30-year property title searches, doorstep Leave & License registration, registered Wills, co-operative society management, MEA Apostille attestation, and educational consulting.",
      telephone: "+91-8286936899",
      email: "acornconsultant2014@gmail.com",
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Suite 4B, Camac Court, 25 Camac Street, Park Street District",
        addressLocality: "Kolkata",
        addressRegion: "West Bengal",
        postalCode: "700016",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 22.5488,
        longitude: 88.3541,
      },
      founder: {
        "@type": "Person",
        name: "Adv. Rajesh Telge",
        jobTitle: "Advocate on Panel & Principal Legal Consultant",
        telephone: "+91-8369171822",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:30",
          closes: "19:30",
        },
      ],
      areaServed: [
        { "@type": "AdministrativeArea", name: "Kolkata" },
        { "@type": "AdministrativeArea", name: "West Bengal" },
        { "@type": "AdministrativeArea", name: "Maharashtra" },
        { "@type": "Country", name: "India" },
      ],
      sameAs: [
        "https://acornconsultants.in",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://acornconsultants.in/#website",
      url: "https://acornconsultants.in",
      name: "Acorn Consultants",
      publisher: {
        "@id": "https://acornconsultants.in/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://acornconsultants.in/services?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ItemList",
      "@id": "https://acornconsultants.in/#sitelinks",
      name: "Chambers Navigation & Core Practice Hubs",
      itemListElement: [
        {
          "@type": "SiteNavigationElement",
          position: 1,
          name: "Chambers Overview & Heritage",
          url: "https://acornconsultants.in",
        },
        {
          "@type": "SiteNavigationElement",
          position: 2,
          name: "About Us & Panel Advocates",
          url: "https://acornconsultants.in/about",
        },
        {
          "@type": "SiteNavigationElement",
          position: 3,
          name: "Comprehensive 37 Services Directory",
          url: "https://acornconsultants.in/services",
        },
        {
          "@type": "SiteNavigationElement",
          position: 4,
          name: "Statutory POSH Act 2013 Governance Portal",
          url: "https://acornconsultants.in/posh",
        },
        {
          "@type": "SiteNavigationElement",
          position: 5,
          name: "Statutory Commentary, Precedents & Insights",
          url: "https://acornconsultants.in/blog",
        },
        {
          "@type": "SiteNavigationElement",
          position: 6,
          name: "Frequently Asked Questions & Answers",
          url: "https://acornconsultants.in/faq",
        },
        {
          "@type": "SiteNavigationElement",
          position: 7,
          name: "Chambers Contact & Consultation Intake",
          url: "https://acornconsultants.in/contact",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-ivory-50 text-ink antialiased font-sans selection:bg-brass-300/30">
        <Providers>
          <PWARegister />
          <ChunkRecovery />
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
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
        </Providers>
      </body>
    </html>
  );
}
