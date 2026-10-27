"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition hover:text-gray-900"
    >
      <span aria-hidden="true">←</span>
      Back to listing
    </Link>
  );
}
