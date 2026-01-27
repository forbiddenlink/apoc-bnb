import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ApocAiChat } from "@/components/chat/ApocAiChat";
import { Toaster } from "@/components/ui/Toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APOC-BNB ☢️ | Survival is Luxury",
  description: "The world's first (and last) premium rental platform for the post-apocalyptic elite. Book verified fallout-free bunkers, orbital suites, and hollowed-out mountains.",
  keywords: ["bunker", "apocalypse", "survival", "rental", "post-apocalyptic", "fallout shelter"],
  authors: [{ name: "APOC-BNB" }],
  openGraph: {
    title: "APOC-BNB ☢️ | Survival is Luxury",
    description: "Book premium bunkers and safe havens in the post-apocalyptic wasteland.",
    images: ["/images/hero-bunker.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "APOC-BNB ☢️ | Survival is Luxury",
    description: "The world's premium post-apocalyptic rental platform.",
    images: ["/images/hero-bunker.png"],
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
        <ErrorBoundary>
          {children}
          <ApocAiChat />
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  );
}
