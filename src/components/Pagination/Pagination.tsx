import Link from "next/link";
import { buildProductListUrl } from "@/lib/searchParams";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  q?: string;
  category?: string;
}

const baseClass =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition";
const enabledClass =
  "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900";
const disabledClass =
  "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-300";
const activeClass = "border-accent bg-accent text-accent-foreground";

export function Pagination({
  currentPage,
  totalPages,
  q,
  category,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const pageHref = (page: number) =>
    buildProductListUrl({ q, category, page });

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {isFirstPage ? (
        <span className={`${baseClass} ${disabledClass}`}>Previous</span>
      ) : (
        <Link
          href={pageHref(currentPage - 1)}
          className={`${baseClass} ${enabledClass}`}
        >
          Previous
        </Link>
      )}

      {pages.map((page) =>
        page === currentPage ? (
          <span
            key={page}
            aria-current="page"
            className={`${baseClass} ${activeClass}`}
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={pageHref(page)}
            className={`${baseClass} ${enabledClass}`}
          >
            {page}
          </Link>
        ),
      )}

      {isLastPage ? (
        <span className={`${baseClass} ${disabledClass}`}>Next</span>
      ) : (
        <Link
          href={pageHref(currentPage + 1)}
          className={`${baseClass} ${enabledClass}`}
        >
          Next
        </Link>
      )}
    </nav>
  );
}
