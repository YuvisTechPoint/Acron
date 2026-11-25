import path from "node:path";
import fs from "node:fs";

const fontCacheFile = path.join(process.cwd(), "data", "google-fonts-cache.json");
if (fs.existsSync(fontCacheFile) && !process.env.NEXT_FONT_GOOGLE_MOCKED_RESPONSES) {
  process.env.NEXT_FONT_GOOGLE_MOCKED_RESPONSES = fontCacheFile;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      {
        source: "/practice-areas",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/admin/legal",
        destination: "/admin/legal/rules",
        permanent: false,
      },
      {
        source: "/admin/lms",
        destination: "/admin/lms/courses",
        permanent: false,
      },
      {
        source: "/posh/ic/cases",
        destination: "/posh/ic",
        permanent: false,
      },
      {
        source: "/pay/status",
        destination: "/pay",
        permanent: false,
      },
      {
        source: "/lp",
        destination: "/services",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(self), microphone=(self), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
