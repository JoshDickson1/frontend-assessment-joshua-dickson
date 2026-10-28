"use client";

import { X } from "lucide-react";
import { useUrlFilters } from "@/hooks/useUrlFilters";
import { formatCategoryName } from "@/lib/format";

interface FilterChipsProps {
  q?: string;
  category?: string;
}

const chipClass =
  "inline-flex h-8 items-center gap-1.5 rounded-full border border-accent/15 bg-accent-soft px-3 text-xs font-medium text-accent transition hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40";

export function FilterChips({ q, category }: FilterChipsProps) {
  const { updateFilters } = useUrlFilters();

  if (!q && !category) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {q && (
        <button
          type="button"
          onClick={() => updateFilters({ q: null, page: 1 })}
          aria-label={`Clear search filter: ${q}`}
          className={chipClass}
        >
          <span className="max-w-48 truncate">Search: {q}</span>
          <X
            aria-hidden="true"
            strokeWidth={1.8}
            className="h-3.5 w-3.5 shrink-0"
          />
        </button>
      )}

      {category && (
        <button
          type="button"
          onClick={() => updateFilters({ category: null, page: 1 })}
          aria-label={`Clear category filter: ${formatCategoryName(category)}`}
          className={chipClass}
        >
          <span className="max-w-48 truncate">
            {formatCategoryName(category)}
          </span>
          <X
            aria-hidden="true"
            strokeWidth={1.8}
            className="h-3.5 w-3.5 shrink-0"
          />
        </button>
      )}
    </div>
  );
}
