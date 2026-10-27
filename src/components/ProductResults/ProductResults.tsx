import { redirect } from "next/navigation";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { Pagination } from "@/components/Pagination/Pagination";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { getProducts, PRODUCTS_PER_PAGE } from "@/lib/api";
import { getTotalPages, parsePage } from "@/lib/pagination";
import { buildProductListUrl } from "@/lib/searchParams";

interface ProductResultsProps {
  q?: string;
  category?: string;
  pageParam?: string;
}

export async function ProductResults({
  q,
  category,
  pageParam,
}: ProductResultsProps) {
  const { currentPage, skip } = parsePage(pageParam);
  const { products, total } = await getProducts({
    limit: PRODUCTS_PER_PAGE,
    skip,
    q,
    category,
  });
  const totalPages = getTotalPages(total);

  if (currentPage > totalPages) {
    redirect(buildProductListUrl({ q, category, page: totalPages }));
  }

  return (
    <>
      <p className="mb-6 text-sm text-gray-500">
        {total} products &middot; Page {currentPage} of {totalPages}
      </p>

      {products.length === 0 ? (
        <EmptyState query={q} category={category} />
      ) : (
        <>
          <ProductGrid products={products} />
          <div className="mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              q={q}
              category={category}
            />
          </div>
        </>
      )}
    </>
  );
}
