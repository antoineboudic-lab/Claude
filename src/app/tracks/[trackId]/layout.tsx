import type { Metadata } from "next";

const TRACK_META: Record<string, { title: string; description: string }> = {
  marketing: {
    title: "AI for Marketing",
    description:
      "Master AI-powered copywriting, campaign automation, content strategy, and data analysis. A practical marketing track built for business professionals.",
  },
  finance: {
    title: "AI for Finance",
    description:
      "Apply AI to financial modelling, automated reporting, risk analysis, and forecasting. Built for finance professionals who want to work smarter.",
  },
  hr: {
    title: "AI for HR & People",
    description:
      "Use AI in talent acquisition, L&D automation, HR analytics, and employee engagement. A people-first track for HR leaders.",
  },
  sales: {
    title: "AI for Sales",
    description:
      "Accelerate your pipeline with AI-powered prospect research, proposal writing, CRM automation, and sales forecasting.",
  },
  operations: {
    title: "AI for Operations",
    description:
      "Optimise processes with AI-driven automation, decision support, supply chain intelligence, and quality operations.",
  },
  leadership: {
    title: "AI Strategy for Leaders",
    description:
      "Develop AI strategy, lead change management, enable your team, and make better executive decisions with AI — built for senior leaders.",
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
    description:
      "A personalised AI learning track for business professionals.",
  };

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | AI Literacy`,
      description: meta.description,
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/tracks/${trackId}`,
    },
  };
}

export default function TrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
