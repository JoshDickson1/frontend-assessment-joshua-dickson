import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { Background } from "@/components/Background/Background";
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
        className={`${geistSans.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <NavigationProgressProvider>
          <div className="relative isolate min-h-screen">
            <Background />
            <Navbar />
            <div className="relative">{children}</div>
          </div>
        </NavigationProgressProvider>
      </body>
    </html>
  );
}
