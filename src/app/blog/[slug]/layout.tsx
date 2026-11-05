import { Metadata } from "next";
import { platformStore } from "@/lib/store";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blogs = platformStore.getBlogs();
  const post = blogs.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Legal Insights Article | Acorn Legal Consultants",
      description: "Legal insights, court precedents, and statutory analysis from Kolkata.",
    };
  }

  const authorName =
    typeof post.author === "object" && post.author !== null
      ? (post.author as any).name
      : (post.author || "Acorn Legal Counsel");

  return {
    title: `${post.title} | Acorn Legal Consultants, Kolkata`,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.acornlegal.in/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Acorn Legal Consultants`,
      description: post.excerpt,
      url: `https://www.acornlegal.in/blog/${post.slug}`,
      siteName: "Acorn Legal Consultants",
      type: "article",
      publishedTime: post.publishedAt,
      authors: [authorName],
    },
  };
}

export default function BlogSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
