"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useUrlFilters } from "@/hooks/useUrlFilters";

type SearchBarVariant = "glass" | "plain";

interface SearchBarProps {
  autoFocus?: boolean;
  className?: string;
  variant?: SearchBarVariant;
  onSubmit?: () => void;
}

export function SearchBar({
  autoFocus = false,
  className = "",
  variant = "glass",
  onSubmit,
}: SearchBarProps) {
  const { updateFilters, searchParams } = useUrlFilters();
  const urlQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);
  const debouncedQuery = useDebounce(query);
  const skipNextDebouncedUpdate = useRef(false);

  useEffect(() => {
    skipNextDebouncedUpdate.current = true;
    setQuery(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    if (skipNextDebouncedUpdate.current) {
      skipNextDebouncedUpdate.current = false;
      return;
    }

    if (debouncedQuery === urlQuery) {
      return;
    }

    updateFilters({ q: debouncedQuery.trim() || null, page: 1 });
  }, [debouncedQuery, updateFilters, urlQuery]);

  function clearSearch() {
    setQuery("");
    updateFilters({ q: null, page: 1 });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      updateFilters({ q: query.trim() || null, page: 1 });
      onSubmit?.();
    }
  }

  const surface =
    variant === "glass"
      ? "glass"
      : "border border-gray-200/80 bg-white/90 shadow-sm";

  return (
    <div
      className={`relative w-full rounded-control ${surface} transition focus-within:border-accent/40 focus-within:ring-4 focus-within:ring-accent/15 ${className}`}
    >
      <Search
        aria-hidden="true"
        strokeWidth={1.8}
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600"
      />

      <input
        type="text"
        inputMode="search"
        autoComplete="off"
        autoFocus={autoFocus}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search products..."
        aria-label="Search products"
        className="h-12 w-full rounded-control bg-transparent pl-11 pr-10 text-sm text-gray-900 outline-none placeholder:text-gray-600"
      />

      {query && (
        <button
          type="button"
          onClick={clearSearch}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          <X aria-hidden="true" strokeWidth={1.8} className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
