"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { LISTING_URL_STORAGE_KEY } from "@/lib/listing";

export function ListingUrlTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const listingUrl = query ? `/?${query}` : "/";

    window.sessionStorage.setItem(LISTING_URL_STORAGE_KEY, listingUrl);
  }, [searchParams]);

  return null;
}
