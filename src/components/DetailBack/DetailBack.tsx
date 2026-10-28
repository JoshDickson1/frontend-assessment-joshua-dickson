"use client";

import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BackToListing } from "@/components/BackToListing/BackToListing";
import { ProgressLink } from "@/components/NavigationProgress/ProgressLink";
import { useListingHref } from "@/hooks/useListingHref";

export function DetailBack() {
  const href = useListingHref();
  const inlineRef = useRef<HTMLSpanElement>(null);
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  const [showInNavbar, setShowInNavbar] = useState(false);

  useEffect(() => {
    setSlot(document.getElementById("navbar-controls-slot"));
  }, []);

  useEffect(() => {
    const element = inlineRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setShowInNavbar(!entry.isIntersecting),
      {
        rootMargin: "-64px 0px 0px 0px",
        threshold: 0,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <span ref={inlineRef} className="inline-flex">
        <BackToListing />
      </span>

      {showInNavbar && slot
        ? createPortal(
            <ProgressLink
              href={href}
              aria-label="Back to listing"
              className="inline-flex h-10 shrink-0 animate-[fade-slide-in_180ms_ease-out] items-center gap-1.5 rounded-full border border-white/60 bg-white/60 px-3 text-sm font-medium text-gray-700 backdrop-blur-sm transition hover:bg-white hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 motion-reduce:animate-none motion-reduce:transition-none"
            >
              <ArrowLeft
                aria-hidden="true"
                strokeWidth={1.8}
                className="h-4 w-4"
              />
              <span className="hidden sm:inline">Back to listing</span>
              <span className="sm:hidden">Back</span>
            </ProgressLink>,
            slot,
          )
        : null}
    </>
  );
}
