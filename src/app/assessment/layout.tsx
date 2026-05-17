import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find My AI Learning Path",
  description:
    "Take the 3-minute AI literacy assessment and get a personalised learning path built for your role, industry, and goals. Free, no credit card required.",
  openGraph: {
    title: "Find My AI Learning Path | AI Literacy",
    description:
      "Answer 5 quick questions. Get a personalised AI curriculum built specifically for your job function.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://ailiteracy.com/assessment",
  },
};

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
