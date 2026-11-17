import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Acorn Consultants | Educational, Tax & Legal Services",
    short_name: "Acorn Consultants",
    description:
      "Over 15 years of expertise in Educational, Tax & Legal Services. Dedicated legal advocacy, 30-year property title search, doorstep Leave & License registration, registered Wills, and educational consulting.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1329",
    theme_color: "#0b1329",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
