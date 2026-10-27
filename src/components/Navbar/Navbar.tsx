"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
          ? "border-b border-white/60 bg-white/95 shadow-nav backdrop-blur-glass supports-[backdrop-filter]:bg-white/70"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-sm transition-transform duration-200 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M12 3.5c.4 4.6 3.9 8.1 8.5 8.5-4.6.4-8.1 3.9-8.5 8.5-.4-4.6-3.9-8.1-8.5-8.5 4.6-.4 8.1-3.9 8.5-8.5Z" />
            </svg>
          </span>
          <span className="font-display text-2xl leading-none tracking-tight text-gray-900">
            Content Explorer
          </span>
        </Link>

        <div
          id="navbar-controls-slot"
          className="flex h-10 items-center justify-end"
        />
      </div>
    </header>
  );
}
