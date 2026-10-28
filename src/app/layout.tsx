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

export const metadata: Metadata = {
  title: "Content Explorer",
  description: "Browse and explore products from the DummyJSON API.",
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
