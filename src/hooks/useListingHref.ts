"use client";

import { useEffect, useState } from "react";
import { LISTING_URL_STORAGE_KEY } from "@/lib/listing";

export function useListingHref() {
  const [href, setHref] = useState("/");

  useEffect(() => {
    const saved = window.sessionStorage.getItem(LISTING_URL_STORAGE_KEY);

    if (saved && saved.startsWith("/") && !saved.startsWith("//")) {
      setHref(saved);
    }
  }, []);

  return href;
}
