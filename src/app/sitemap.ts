import type { MetadataRoute } from "next";

const SITE_URL = "https://ailiteracy.com";

const TRACKS = [
  "marketing",
  "finance",
  "hr",
  "sales",
  "operations",
  "leadership",
  "legal",
  "product",
  "customer",
  "consulting",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const trackPages = TRACKS.map((id) => ({
    url: `${SITE_URL}/tracks/${id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/tracks`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/assessment`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...trackPages,
  ];
}
