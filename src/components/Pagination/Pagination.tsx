import { ProgressLink } from "@/components/NavigationProgress/ProgressLink";
import { buildProductListUrl } from "@/lib/searchParams";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  q?: string;
  category?: string;
}

const baseClass =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-sm font-medium transition";
const enabledClass =
  "border-white/60 bg-white/60 text-gray-700 backdrop-blur-sm hover:-translate-y-0.5 hover:border-white/80 hover:bg-white hover:text-gray-900 hover:shadow-sm motion-reduce:transition-none motion-reduce:hover:translate-y-0";
const disabledClass =
  "cursor-not-allowed border-white/40 bg-white/40 text-gray-300";
const activeClass = "border-accent bg-accent text-accent-foreground shadow-sm";

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
        <ProgressLink
          href={pageHref(currentPage - 1)}
          className={`${baseClass} ${enabledClass}`}
        >
          Previous
        </ProgressLink>
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
          <ProgressLink
            key={page}
            href={pageHref(page)}
            className={`${baseClass} ${enabledClass}`}
          >
            {page}
          </ProgressLink>
        ),
      )}

      {isLastPage ? (
        <span className={`${baseClass} ${disabledClass}`}>Next</span>
      ) : (
        <ProgressLink
          href={pageHref(currentPage + 1)}
          className={`${baseClass} ${enabledClass}`}
        >
          Next
        </ProgressLink>
      )}
    </nav>
  );
}
