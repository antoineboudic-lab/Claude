import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Learning Tracks",
  description:
    "Explore role-specific AI learning tracks for Marketing, Finance, HR, Sales, Operations, and Leadership. Find the path built for your job.",
  openGraph: {
    title: "AI Learning Tracks | AI Literacy",
    description:
      "Six role-specific AI training tracks. Built for the real tasks you face — not abstract theory.",
    type: "website",
  },
  alternates: {
    canonical: "https://ailiteracy.com/tracks",
  },
};

export default function TracksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
