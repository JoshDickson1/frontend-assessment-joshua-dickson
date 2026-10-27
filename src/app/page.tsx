import { Suspense } from "react";
import { redirect } from "next/navigation";
import { CategoryFilter } from "@/components/CategoryFilter/CategoryFilter";
import { Pagination } from "@/components/Pagination/Pagination";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { getCategories, getProducts, PRODUCTS_PER_PAGE } from "@/lib/api";
import { getTotalPages, parsePage } from "@/lib/pagination";
import { buildProductListUrl, firstParam } from "@/lib/searchParams";

interface HomePageProps {
  searchParams: Promise<{
    page?: string | string[];
    q?: string | string[];
    category?: string | string[];
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const q = firstParam(params.q)?.trim() || undefined;
  const category = firstParam(params.category) || undefined;
  const { currentPage, skip } = parsePage(firstParam(params.page));

  const [{ products, total }, categories] = await Promise.all([
    getProducts({ limit: PRODUCTS_PER_PAGE, skip, q, category }),
    getCategories(),
  ]);
  const totalPages = getTotalPages(total);

  if (currentPage > totalPages) {
    redirect(buildProductListUrl({ q, category, page: totalPages }));
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Content Explorer
        </h1>
        <p className="text-sm text-gray-500">
          {total} products &middot; Page {currentPage} of {totalPages}
        </p>
      </header>

      <Suspense
        fallback={
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <div className="h-10 w-full rounded-lg bg-gray-100 sm:max-w-xs" />
            <div className="h-10 w-full rounded-lg bg-gray-100 sm:w-48" />
          </div>
        }
      >
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <SearchBar />
          <CategoryFilter categories={categories} />
        </div>
      </Suspense>

      <ProductGrid products={products} />

      <div className="mt-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          q={q}
          category={category}
        />
      </div>
    </main>
  );
}
