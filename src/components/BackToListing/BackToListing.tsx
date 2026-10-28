"use client";

import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { ProgressLink } from "@/components/NavigationProgress/ProgressLink";
import { LISTING_URL_STORAGE_KEY } from "@/lib/listing";

export function BackToListing() {
  const [href, setHref] = useState("/");

  useEffect(() => {
    const saved = window.sessionStorage.getItem(LISTING_URL_STORAGE_KEY);

    if (saved && saved.startsWith("/") && !saved.startsWith("//")) {
      setHref(saved);
    }
  }, []);

  return (
    <ProgressLink
      href={href}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/60 bg-white/60 px-3 text-xs font-medium text-gray-600 backdrop-blur-sm transition hover:bg-white hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
    >
      <ArrowLeft
        aria-hidden="true"
        strokeWidth={1.8}
        className="h-3.5 w-3.5"
      />
      Back to listing
    </ProgressLink>
  );
}
