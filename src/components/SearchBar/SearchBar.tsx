"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useUrlFilters } from "@/hooks/useUrlFilters";

export function SearchBar() {
  const { updateFilters, searchParams, isPending } = useUrlFilters();
  const urlQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    if (debouncedQuery === urlQuery) {
      return;
    }

    updateFilters({ q: debouncedQuery || null, page: 1 });
  }, [debouncedQuery, updateFilters, urlQuery]);

  function clearSearch() {
    setQuery("");
    updateFilters({ q: null, page: 1 });
  }

  return (
    <div className="relative w-full sm:max-w-xs">
      <input
        type="text"
        inputMode="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 pr-9 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      {query && (
        <button
          type="button"
          onClick={clearSearch}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
          >
            <path d="M6 6l8 8M14 6l-8 8" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {isPending && (
        <span className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden rounded-b-lg bg-blue-100">
          <span className="block h-full w-1/3 animate-[loading-bar_1.1s_ease-in-out_infinite] bg-blue-500 motion-reduce:translate-x-0 motion-reduce:animate-none" />
        </span>
      )}
    </div>
  );
}
