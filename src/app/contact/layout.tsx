import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the AI Literacy team. Questions about the platform, tracks, pricing, or enterprise plans — we're here to help.",
  openGraph: {
    title: "Contact AI Literacy",
    description: "Reach out with questions about our AI training platform.",
    type: "website",
  },
  alternates: {
    canonical: "https://ailiteracy.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
