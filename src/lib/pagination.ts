import { PRODUCTS_PER_PAGE } from "@/lib/api";

export interface PageState {
  currentPage: number;
  skip: number;
}

export type PageItem = number | "ellipsis";

export function getPageItems(
  currentPage: number,
  totalPages: number,
): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);

  if (currentPage <= 3) {
    pages.add(2);
    pages.add(3);
  }

  if (currentPage >= totalPages - 2) {
    pages.add(totalPages - 1);
    pages.add(totalPages - 2);
  }

  const sorted = [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const items: PageItem[] = [];

  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) {
      items.push("ellipsis");
    }

    items.push(page);
  });

  return items;
}

export function parsePage(pageParam?: string): PageState {
  const parsed = Number(pageParam);
  const currentPage =
    Number.isInteger(parsed) && parsed > 0 ? parsed : 1;

  return {
    currentPage,
    skip: (currentPage - 1) * PRODUCTS_PER_PAGE,
  };
}

export function getTotalPages(total: number): number {
  return Math.max(1, Math.ceil(total / PRODUCTS_PER_PAGE));
}
