import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Multi-Agent Leadgen • Live Preview | Yexity",
  description: "AI-powered lead generation with automated sourcing, enrichment, outreach, and analysis. See it live in action.",
  openGraph: {
    title: "Multi-Agent Leadgen • Live Preview",
    description: "AI-powered lead generation platform with real-time dashboard",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi-Agent Leadgen • Live Preview",
    description: "AI-powered lead generation platform",
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
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
