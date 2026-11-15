import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/mypage", "/login", "/signup"],
    },
    sitemap: "https://keiba-times.vercel.app/sitemap.xml",
  };
}
