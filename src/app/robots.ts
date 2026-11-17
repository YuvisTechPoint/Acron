import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/posh/portal/",
          "/posh/ic/",
          "/posh/org/",
          "/posh/my-case/",
          "/api/",
          "/pay/status/",
        ],
      },
      // AI Answer Engines & LLM Search Crawlers
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "Applebot",
          "Bytespider",
          "cohere-ai",
        ],
        allow: ["/", "/services", "/about", "/faq", "/blog", "/contact", "/llms.txt"],
        disallow: [
          "/admin/",
          "/posh/portal/",
          "/posh/ic/",
          "/posh/org/",
          "/posh/my-case/",
          "/api/",
        ],
      },
    ],
    sitemap: "https://acornconsultants.in/sitemap.xml",
  };
}
