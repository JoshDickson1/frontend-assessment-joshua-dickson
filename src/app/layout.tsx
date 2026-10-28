import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Background } from "@/components/Background/Background";
import { Footer } from "@/components/Footer/Footer";
import { NavigationProgressProvider } from "@/components/NavigationProgress/NavigationProgressProvider";
import { Navbar } from "@/components/Navbar/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://frontend-assessment-joshua-dickson.vercel.app";
const description = "Browse and explore products from the DummyJSON API.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Content Explorer",
    template: "%s | Content Explorer",
  },
  description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Content Explorer",
    title: "Content Explorer",
    description,
  },
  twitter: {
    card: "summary",
    title: "Content Explorer",
    description,
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
        id="top"
        className={`${geistSans.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          Skip to content
        </a>
        <NavigationProgressProvider>
          <div className="relative isolate flex flex-1 flex-col">
            <Background />
            <Navbar />
            <div className="relative flex flex-1 flex-col">{children}</div>
            <Footer />
          </div>
        </NavigationProgressProvider>
      </body>
    </html>
  );
}
