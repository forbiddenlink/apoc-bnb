import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ApocAiChat } from "@/components/chat/ApocAiChat";
import { Toaster } from "@/components/ui/Toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { KeyboardShortcuts } from "@/components/ui/KeyboardShortcuts";
import { KonamiCodeListener } from "@/components/features/KonamiCodeListener";
import { QueryProvider } from "@/components/providers/QueryProvider";

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
  description: "The world's first (and last) premium rental platform for the post-apocalyptic elite. Book verified fallout-free bunkers, orbital suites, and hollowed-out mountains.",
  keywords: ["bunker", "apocalypse", "survival", "rental", "post-apocalyptic", "fallout shelter", "safe haven", "radiation-free"],
  authors: [{ name: "APOC-BNB" }],
  creator: "APOC-BNB",
  publisher: "APOC-BNB",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "APOC-BNB ☢️ | Survival is Luxury",
    description: "Book premium bunkers and safe havens in the post-apocalyptic wasteland.",
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
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
        <QueryProvider>
          <ErrorBoundary>
            {children}
            <ApocAiChat />
            <Toaster />
            <KeyboardShortcuts />
            <KonamiCodeListener />
          </ErrorBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}
