import { redirect } from "next/navigation";
import { Pagination } from "@/components/Pagination/Pagination";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { getProducts, PRODUCTS_PER_PAGE } from "@/lib/api";
import { getPageHref, getTotalPages, parsePage } from "@/lib/pagination";

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { page: pageParam } = await searchParams;
  const { currentPage, skip } = parsePage(pageParam);
  const { products, total } = await getProducts({
    limit: PRODUCTS_PER_PAGE,
    skip,
  });
  const totalPages = getTotalPages(total);

  if (currentPage > totalPages) {
    redirect(getPageHref(totalPages));
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Content Explorer
        </h1>
        <p className="text-sm text-gray-500">
          {total} products &middot; Page {currentPage} of {totalPages}
        </p>
      </header>

      <ProductGrid products={products} />

      <div className="mt-10">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
}
