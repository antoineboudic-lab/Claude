import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";
import { AuthProvider } from "@/context/AuthContext";
import { XPToast } from "@/components/gamification/XPToast";
import { BadgeUnlock } from "@/components/gamification/BadgeUnlock";
import { AuthModal } from "@/components/auth/AuthModal";
import FloatingAssistant from "@/components/FloatingAssistant";
import { TrackCompletion } from "@/components/gamification/TrackCompletion";
import PWARegister from "@/components/PWARegister";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = "https://ailiteracy.com";

export const viewport: Viewport = {
  themeColor: '#7C3AED',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AI Literacy — Master AI Without Writing Code",
    template: "%s | AI Literacy",
  },
  description:
    "A personalised AI training platform for business professionals. Role-specific learning paths in Marketing, Finance, HR, Sales, Operations & Leadership. No technical background required.",
  keywords: [
    "AI literacy",
    "AI training for business",
    "AI for non-technical professionals",
    "AI learning platform",
    "artificial intelligence course",
    "AI for marketing",
    "AI for finance",
    "AI for HR",
    "AI for sales",
    "AI for operations",
    "AI for leadership",
    "AI for legal",
    "AI for product managers",
    "AI for customer success",
    "AI for consulting",
    "AI skills",
    "no-code AI",
    "business AI training",
    "AI certification",
    "ChatGPT for business",
  ],
  authors: [{ name: "AI Literacy", url: SITE_URL }],
  creator: "AI Literacy",
  publisher: "AI Literacy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "AI Literacy",
    title: "AI Literacy — Master AI Without Writing Code",
    description:
      "Personalised AI training for business professionals. Choose your role, get your learning path, apply AI immediately — no code required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Literacy — Personalised AI Training for Business Professionals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Literacy — Master AI Without Writing Code",
    description:
      "Personalised AI training for business professionals. Role-specific paths in Marketing, Finance, HR, Sales, Operations & Leadership.",
    images: ["/og-image.png"],
    creator: "@ailiteracy",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "education",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "AI Literacy",
    "application-name": "AI Literacy",
    "msapplication-TileColor": "#7C3AED",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "AI Literacy",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 200,
        height: 200,
      },
      description:
        "AI Literacy is a personalised AI training platform for business professionals across Marketing, Finance, HR, Sales, Operations, and Leadership.",
      foundingDate: "2024",
      sameAs: [
        "https://twitter.com/ailiteracy",
        "https://linkedin.com/company/ailiteracy",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "AI Literacy",
      description: "Personalised AI training for business professionals.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/tracks?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#school`,
      name: "AI Literacy",
      url: SITE_URL,
      description:
        "Business-focused AI training with role-specific learning paths. No technical background required.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI Learning Tracks",
        itemListElement: [
          { "@type": "Course", name: "AI for Marketing", url: `${SITE_URL}/tracks/marketing`, provider: { "@id": `${SITE_URL}/#organization` } },
          { "@type": "Course", name: "AI for Finance", url: `${SITE_URL}/tracks/finance`, provider: { "@id": `${SITE_URL}/#organization` } },
          { "@type": "Course", name: "AI for HR & People", url: `${SITE_URL}/tracks/hr`, provider: { "@id": `${SITE_URL}/#organization` } },
          { "@type": "Course", name: "AI for Sales", url: `${SITE_URL}/tracks/sales`, provider: { "@id": `${SITE_URL}/#organization` } },
          { "@type": "Course", name: "AI for Operations", url: `${SITE_URL}/tracks/operations`, provider: { "@id": `${SITE_URL}/#organization` } },
          { "@type": "Course", name: "AI Strategy for Leaders", url: `${SITE_URL}/tracks/leadership`, provider: { "@id": `${SITE_URL}/#organization` } },
          { "@type": "Course", name: "AI for Legal", url: `${SITE_URL}/tracks/legal`, provider: { "@id": `${SITE_URL}/#organization` } },
          { "@type": "Course", name: "AI for Product", url: `${SITE_URL}/tracks/product`, provider: { "@id": `${SITE_URL}/#organization` } },
          { "@type": "Course", name: "AI for Customer Success", url: `${SITE_URL}/tracks/customer`, provider: { "@id": `${SITE_URL}/#organization` } },
          { "@type": "Course", name: "AI for Consulting", url: `${SITE_URL}/tracks/consulting`, provider: { "@id": `${SITE_URL}/#organization` } },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <GameProvider>
            {children}
            <XPToast />
            <BadgeUnlock />
            <AuthModal />
            <FloatingAssistant />
            <TrackCompletion />
            <PWARegister />
          </GameProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
