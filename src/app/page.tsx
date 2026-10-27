import { Suspense } from "react";
import { CategoryFilter } from "@/components/CategoryFilter/CategoryFilter";
import { ProductResults } from "@/components/ProductResults/ProductResults";
import { ProductGridSkeleton } from "@/components/Skeletons/ProductGridSkeleton";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { getCategories } from "@/lib/api";
import { firstParam } from "@/lib/searchParams";

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
  const pageParam = firstParam(params.page);
  const categories = await getCategories();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Content Explorer
        </h1>
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

      <Suspense
        key={`${q ?? ""}|${category ?? ""}|${pageParam ?? ""}`}
        fallback={
          <div>
            <div className="mb-6 h-5 w-40 animate-pulse rounded bg-gray-200" />
            <ProductGridSkeleton />
          </div>
        }
      >
        <ProductResults q={q} category={category} pageParam={pageParam} />
      </Suspense>
    </main>
  );
}
