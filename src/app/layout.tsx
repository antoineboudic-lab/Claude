import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";
import { AuthProvider } from "@/context/AuthContext";
import { XPToast } from "@/components/gamification/XPToast";
import { BadgeUnlock } from "@/components/gamification/BadgeUnlock";
import { AuthModal } from "@/components/auth/AuthModal";
import FloatingAssistant from "@/components/FloatingAssistant"
import FeedbackButton from "@/components/FeedbackButton";
import { TrackCompletion } from "@/components/gamification/TrackCompletion";
import PWARegister from "@/components/PWARegister";
import CookieBanner from "@/components/CookieBanner";
import { PostHogProvider } from "@/components/PostHogProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { rtlLocales } from '@/i18n/config';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = "https://opuslearn.ai";

export const viewport: Viewport = {
  themeColor: '#2563EB',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OpusLearn — Master AI Without Writing Code",
    template: "%s | OpusLearn",
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
  authors: [{ name: "OpusLearn", url: SITE_URL }],
  creator: "OpusLearn",
  publisher: "OpusLearn",
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
    siteName: "OpusLearn",
    title: "OpusLearn — Master AI Without Writing Code",
    description:
      "Personalised AI training for business professionals. Choose your role, get your learning path, apply AI immediately — no code required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpusLearn — Personalised AI Training for Business Professionals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpusLearn — Master AI Without Writing Code",
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
    "apple-mobile-web-app-title": "OpusLearn",
    "application-name": "OpusLearn",
    "msapplication-TileColor": "#2563EB",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "OpusLearn",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 200,
        height: 200,
      },
      description:
        "OpusLearn is a personalised AI training platform for business professionals across Marketing, Finance, HR, Sales, Operations, and Leadership.",
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
      name: "OpusLearn",
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
      name: "OpusLearn",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const isRTL = rtlLocales.includes(locale as typeof rtlLocales[number]);

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <PostHogProvider>
            <GameProvider>
              {children}
              <XPToast />
              <BadgeUnlock />
              <AuthModal />
              <FloatingAssistant />
              <FeedbackButton />
              <TrackCompletion />
              <PWARegister />
              <CookieBanner />
            </GameProvider>
            </PostHogProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
