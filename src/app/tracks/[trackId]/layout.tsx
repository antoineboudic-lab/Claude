import type { Metadata } from "next";

const TRACK_META: Record<string, { title: string; description: string; keywords: string[] }> = {
  marketing: {
    title: "AI for Marketing",
    description:
      "Master AI-powered copywriting, campaign automation, content strategy, and data analysis. A practical marketing track built for business professionals.",
    keywords: ["AI for marketing", "AI marketing tools", "AI copywriting", "marketing automation AI", "ChatGPT for marketers"],
  },
  finance: {
    title: "AI for Finance",
    description:
      "Apply AI to financial modelling, automated reporting, risk analysis, and forecasting. Built for finance professionals who want to work smarter.",
    keywords: ["AI for finance", "AI financial analysis", "ChatGPT for finance", "financial modelling AI", "AI for CFO"],
  },
  hr: {
    title: "AI for HR & People",
    description:
      "Use AI in talent acquisition, L&D automation, HR analytics, and employee engagement. A people-first track for HR leaders.",
    keywords: ["AI for HR", "AI in human resources", "AI recruiting", "HR automation", "ChatGPT for HR"],
  },
  sales: {
    title: "AI for Sales",
    description:
      "Accelerate your pipeline with AI-powered prospect research, proposal writing, CRM automation, and sales forecasting.",
    keywords: ["AI for sales", "AI sales tools", "AI prospecting", "ChatGPT for sales", "sales automation AI"],
  },
  operations: {
    title: "AI for Operations",
    description:
      "Optimise processes with AI-driven automation, decision support, supply chain intelligence, and quality operations.",
    keywords: ["AI for operations", "AI process automation", "operations AI tools", "ChatGPT for operations", "supply chain AI"],
  },
  leadership: {
    title: "AI Strategy for Leaders",
    description:
      "Develop AI strategy, lead change management, enable your team, and make better executive decisions with AI — built for senior leaders.",
    keywords: ["AI strategy for leaders", "AI for executives", "AI leadership training", "AI change management", "executive AI course"],
  },
  legal: {
    title: "AI for Legal",
    description:
      "Use AI to accelerate contract review, legal research, drafting, and due diligence. A practical AI track built for in-house counsel and legal professionals.",
    keywords: ["AI for lawyers", "AI contract review", "legal AI tools", "AI legal research", "ChatGPT for lawyers"],
  },
  product: {
    title: "AI for Product",
    description:
      "From user research to roadmap prioritisation and PRD generation — master AI tools that help product managers ship better products faster.",
    keywords: ["AI for product managers", "AI product management", "AI PRD writing", "ChatGPT for product", "product roadmap AI"],
  },
  customer: {
    title: "AI for Customer Success",
    description:
      "Use AI to identify at-risk accounts, personalise outreach, automate reporting, and scale customer engagement. Built for CS teams.",
    keywords: ["AI for customer success", "AI churn prediction", "CS automation AI", "ChatGPT for customer success", "AI customer retention"],
  },
  consulting: {
    title: "AI for Consulting",
    description:
      "Apply AI to research, analysis, slide decks, and client delivery. A practical track for consultants who want AI as their competitive edge.",
    keywords: ["AI for consultants", "AI consulting tools", "ChatGPT for consulting", "AI strategy consulting", "consulting AI productivity"],
  },
};

const SITE_URL = "https://ailiteracy.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trackId: string }>;
}): Promise<Metadata> {
  const { trackId } = await params;
  const meta = TRACK_META[trackId] ?? {
    title: "AI Learning Track",
    description: "A personalised AI learning track for business professionals.",
    keywords: ["AI training", "AI course", "business AI"],
  };

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: `${meta.title} | AI Literacy`,
      description: meta.description,
      type: "website",
      url: `${SITE_URL}/tracks/${trackId}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.title} | AI Literacy`,
      description: meta.description,
    },
    alternates: {
      canonical: `${SITE_URL}/tracks/${trackId}`,
    },
  };
}

export default async function TrackLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ trackId: string }>;
}) {
  const { trackId } = await params;
  const meta = TRACK_META[trackId];

  const jsonLd = meta
    ? {
        "@context": "https://schema.org",
        "@type": "Course",
        name: meta.title,
        description: meta.description,
        url: `${SITE_URL}/tracks/${trackId}`,
        provider: {
          "@type": "Organization",
          name: "AI Literacy",
          url: SITE_URL,
        },
        educationalLevel: "Professional",
        inLanguage: "en",
        isAccessibleForFree: true,
        courseMode: "online",
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: "PT4H",
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
