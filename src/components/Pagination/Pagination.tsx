import { ProgressLink } from "@/components/NavigationProgress/ProgressLink";
import { buildProductListUrl } from "@/lib/searchParams";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  q?: string;
  category?: string;
}

const baseClass =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-2.5 text-sm font-medium transition sm:px-3";
const enabledClass =
  "border-white/60 bg-white/60 text-gray-700 backdrop-blur-sm hover:-translate-y-0.5 hover:border-white/80 hover:bg-white hover:text-gray-900 hover:shadow-sm motion-reduce:transition-none motion-reduce:hover:translate-y-0";
const disabledClass =
  "cursor-not-allowed border-white/40 bg-white/40 text-gray-300";
const activeClass = "border-accent bg-accent text-accent-foreground shadow-sm";

type PageItem = number | "ellipsis";

function getPageItems(currentPage: number, totalPages: number): PageItem[] {
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

export function Pagination({
  currentPage,
  totalPages,
  q,
  category,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pageItems = getPageItems(currentPage, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const pageHref = (page: number) =>
    buildProductListUrl({ q, category, page });

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
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

      {pageItems.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            className="inline-flex h-9 min-w-9 items-center justify-center px-1 text-sm text-gray-400"
          >
            …
          </span>
        ) : item === currentPage ? (
          <span
            key={item}
            aria-current="page"
            className={`${baseClass} ${activeClass}`}
          >
            {item}
          </span>
        ) : (
          <ProgressLink
            key={item}
            href={pageHref(item)}
            className={`${baseClass} ${enabledClass}`}
          >
            {item}
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
