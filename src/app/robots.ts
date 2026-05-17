import type { MetadataRoute } from "next";

const SITE_URL = "https://ailiteracy.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/tracks",
          "/tracks/",
          "/assessment",
          "/blog",
          "/blog/",
          "/contact",
          "/privacy",
          "/terms",
        ],
        disallow: ["/dashboard", "/admin", "/assessment/results", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
