import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { ApocAiChat } from "@/components/chat/ApocAiChat";
import { Toaster } from "@/components/ui/Toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { KeyboardShortcuts } from "@/components/ui/KeyboardShortcuts";
import { KonamiCodeListener } from "@/components/features/KonamiCodeListener";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { RouteProgress } from "@/components/ui/RouteProgress";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "@/components/PostHogProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "APOC-BNB ☢️ | Survival is Luxury",
    template: "%s | APOC-BNB",
  },
  description:
    "The world's first (and last) premium rental platform for the post-apocalyptic elite. Book verified fallout-free bunkers, orbital suites, and hollowed-out mountains.",
  keywords: [
    "bunker",
    "apocalypse",
    "survival",
    "rental",
    "post-apocalyptic",
    "fallout shelter",
    "safe haven",
    "radiation-free",
  ],
  authors: [{ name: "APOC-BNB" }],
  creator: "APOC-BNB",
  publisher: "APOC-BNB",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "APOC-BNB ☢️ | Survival is Luxury",
    description:
      "Book premium bunkers and safe havens in the post-apocalyptic wasteland.",
    siteName: "APOC-BNB",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "APOC-BNB ☢️ | Survival is Luxury",
    description: "The world's premium post-apocalyptic rental platform.",
    creator: "@apocbnb",
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PostHogProvider>
          <NuqsAdapter>
            <QueryProvider>
              <Suspense fallback={null}>
                <RouteProgress />
              </Suspense>
              <ErrorBoundary>
                {children}
                <NoiseOverlay />
                <ApocAiChat />
                <Toaster />
                <KeyboardShortcuts />
                <KonamiCodeListener />
              </ErrorBoundary>
              <Analytics />
              <SpeedInsights />
            </QueryProvider>
          </NuqsAdapter>
        </PostHogProvider>
      </body>
    </html>
  );
}
