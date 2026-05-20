import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the OpusLearn team. Questions about the platform, tracks, pricing, or enterprise plans — we're here to help.",
  openGraph: {
    title: "Contact OpusLearn",
    description: "Reach out with questions about our AI training platform.",
    type: "website",
  },
  alternates: {
    canonical: "https://opuslearn.ai/contact",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
