import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { Background } from "@/components/Background/Background";
import { Footer } from "@/components/Footer/Footer";
import { NavigationProgressProvider } from "@/components/NavigationProgress/NavigationProgressProvider";
import { Navbar } from "@/components/Navbar/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: "400",
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
        className={`${geistSans.variable} ${instrumentSerif.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <NavigationProgressProvider>
          <div className="relative isolate flex flex-1 flex-col">
            <Background />
            <Navbar />
            <div className="relative flex-1">{children}</div>
            <Footer />
          </div>
        </NavigationProgressProvider>
      </body>
    </html>
  );
}
