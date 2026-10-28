"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useTransition } from "react";
import { useNavigationProgress } from "@/components/NavigationProgress/NavigationProgressProvider";
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
  const { start, complete } = useNavigationProgress();
  const navigating = useRef(false);

  const updateFilters = useCallback(
    ({ q, category, page }: FilterUpdates) => {
      const nextQuery = q !== undefined ? q : searchParams.get("q");
      const nextCategory =
        category !== undefined ? category : searchParams.get("category");
      const nextUrl = buildProductListUrl({
        q: nextQuery || undefined,
        category: nextCategory || undefined,
        page: page ?? 1,
      });

      if (nextUrl === `${window.location.pathname}${window.location.search}`) {
        return;
      }

      navigating.current = true;
      start();

      startTransition(() => {
        router.replace(nextUrl, { scroll: false });
      });
    },
    [router, searchParams, start],
  );

  useEffect(() => {
    if (navigating.current && !isPending) {
      navigating.current = false;
      complete();
    }
  });

  return { updateFilters, searchParams, isPending };
}
