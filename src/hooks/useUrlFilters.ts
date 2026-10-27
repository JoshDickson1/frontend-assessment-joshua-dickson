"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { buildProductListUrl } from "@/lib/searchParams";

interface FilterUpdates {
  q?: string | null;
  category?: string | null;
  page?: number;
}

export function useUrlFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateFilters = useCallback(
    ({ q, category, page }: FilterUpdates) => {
      const nextQuery = q !== undefined ? q : searchParams.get("q");
      const nextCategory =
        category !== undefined ? category : searchParams.get("category");

      startTransition(() => {
        router.replace(
          buildProductListUrl({
            q: nextQuery || undefined,
            category: nextCategory || undefined,
            page: page ?? 1,
          }),
          { scroll: false },
        );
      });
    },
    [router, searchParams, startTransition],
  );

  return { updateFilters, searchParams, isPending };
}
