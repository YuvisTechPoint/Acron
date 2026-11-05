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
          "/api/",
          "/pay/status/",
        ],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/admin/", "/posh/portal/"],
      },
    ],
    sitemap: "https://www.acornlegal.in/sitemap.xml",
  };
}

