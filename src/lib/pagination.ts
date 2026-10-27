import { PRODUCTS_PER_PAGE } from "@/lib/api";

export interface PageState {
  currentPage: number;
  skip: number;
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

export function getPageHref(page: number): string {
  return page <= 1 ? "/" : `/?page=${page}`;
}
