import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical insights on AI for business professionals. Real stories from marketing leaders, finance teams, HR directors, sales reps, and more on using AI in their day-to-day work.",
  openGraph: {
    title: "AI Literacy Blog — Practical AI for Business Professionals",
    description:
      "Real perspectives from business leaders on applying AI at work. No hype, no theory — just what's actually working.",
    type: "website",
  },
  alternates: {
    canonical: "https://ailiteracy.com/blog",
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
