"use client";

import { useEffect, useRef, useState } from "react";
import { CategoryFilter } from "@/components/CategoryFilter/CategoryFilter";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import type { Category } from "@/types/product";

type Panel = "search" | "filter" | null;

interface NavbarControlsProps {
  categories: Category[];
  query?: string;
  category?: string;
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <circle cx="9" cy="9" r="5.25" />
      <path d="m13 13 3.5 3.5" strokeLinecap="round" />
    </svg>
  );
}

function SlidersIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path d="M3 6h14M3 14h14" strokeLinecap="round" />
      <circle cx="7" cy="6" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="13" cy="14" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function NavbarControls({
  categories,
  query,
  category,
}: NavbarControlsProps) {
  const [panel, setPanel] = useState<Panel>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!panel) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setPanel(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        const trigger =
          panel === "search"
            ? searchButtonRef.current
            : filterButtonRef.current;

        setPanel(null);
        trigger?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [panel]);

  function closePanel() {
    const trigger =
      panel === "search" ? searchButtonRef.current : filterButtonRef.current;

    setPanel(null);
    trigger?.focus();
  }

  const buttonClass =
    "relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition hover:bg-white/80 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40";

  return (
    <div
      ref={containerRef}
      className="flex h-10 animate-[fade-slide-in_220ms_ease-out] items-center gap-1.5 motion-reduce:animate-none"
    >
      <button
        ref={searchButtonRef}
        type="button"
        onClick={() => setPanel(panel === "search" ? null : "search")}
        aria-label="Search"
        aria-haspopup="dialog"
        aria-expanded={panel === "search"}
        aria-controls="navbar-search-panel"
        className={buttonClass}
      >
        <SearchIcon className="h-5 w-5" />
        {query && (
          <span
            aria-hidden="true"
            className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent ring-2 ring-white"
          />
        )}
      </button>

      <button
        ref={filterButtonRef}
        type="button"
        onClick={() => setPanel(panel === "filter" ? null : "filter")}
        aria-label="Filter"
        aria-haspopup="dialog"
        aria-expanded={panel === "filter"}
        aria-controls="navbar-filter-panel"
        className={buttonClass}
      >
        <SlidersIcon className="h-5 w-5" />
        {category && (
          <span
            aria-hidden="true"
            className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent ring-2 ring-white"
          />
        )}
      </button>

      {panel && (
        <div
          id={
            panel === "search" ? "navbar-search-panel" : "navbar-filter-panel"
          }
          role="dialog"
          aria-label={
            panel === "search" ? "Search products" : "Filter by category"
          }
          className="fixed inset-x-0 top-16 z-50 px-4 pt-2 sm:px-6"
        >
          <div className="glass mx-auto w-full max-w-2xl animate-[panel-in_180ms_ease-out] rounded-2xl p-3 motion-reduce:animate-none">
            {panel === "search" ? (
              <SearchBar autoFocus variant="plain" onSubmit={closePanel} />
            ) : (
              <CategoryFilter
                categories={categories}
                autoFocus
                variant="plain"
                onSelect={closePanel}
                inline
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
