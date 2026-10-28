"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { ProgressLink } from "@/components/NavigationProgress/ProgressLink";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 h-16 transition-colors duration-300 motion-reduce:transition-none ${
        scrolled
          ? "border-b border-white/70 bg-white/90 shadow-nav backdrop-blur-glass supports-[backdrop-filter]:bg-white/75"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <ProgressLink
          href="/"
          className="group inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-sm transition-transform duration-200 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          >
            <Sparkles strokeWidth={1.8} className="h-4 w-4" />
          </span>
          <span className="font-display text-2xl leading-none tracking-tight text-gray-900">
            Content Explorer
          </span>
        </ProgressLink>

        <div
          id="navbar-controls-slot"
          className="flex h-10 items-center justify-end"
        />
      </div>
    </header>
  );
}
