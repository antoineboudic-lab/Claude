import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.opuslearn.ai";

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

const BLOG_SLUGS = [
  "marketing-ai-briefs",
  "finance-prompting-mistakes",
  "hr-opuslearn-strategy",
  "sales-ai-journey",
  "operations-decision-support",
  "leadership-ai-change",
  "legal-ai-contract-review",
  "product-ai-discovery",
  "customer-success-ai-retention",
  "consulting-ai-research",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const trackPages = TRACKS.map((id) => ({
    url: `${SITE_URL}/tracks/${id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogPosts = BLOG_SLUGS.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
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
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/assessment`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...trackPages,
    ...blogPosts,
    {
      url: `${SITE_URL}/teams`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
