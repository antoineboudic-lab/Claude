import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Certificates",
  description:
    "View and share your AI Literacy certificates. Verified credentials for completed AI learning tracks — shareable on LinkedIn and with employers.",
  robots: { index: false, follow: false },
};

export default function CertificatesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
