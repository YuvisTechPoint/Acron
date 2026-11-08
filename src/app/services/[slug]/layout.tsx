import { Metadata } from "next";
import { PRACTICE_AREAS } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug;
  const area = PRACTICE_AREAS.find((p) => p.slug === slug);

  if (!area) {
    return {
      title: "Legal Service | Acorn Legal Consultants",
      description: "Legal consultancy and advisory services in Kolkata.",
    };
  }

  return {
    title: `${area.title} | Acorn Legal Consultants, Kolkata`,
    description: area.shortDesc,
    alternates: {
      canonical: `https://www.acornlegal.in/services/${area.slug}`,
    },
    openGraph: {
      title: `${area.title} | Acorn Legal Consultants, Kolkata`,
      description: area.shortDesc,
      url: `https://www.acornlegal.in/services/${area.slug}`,
      siteName: "Acorn Legal Consultants",
      type: "website",
    },
  };
}

export default function ServiceSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

