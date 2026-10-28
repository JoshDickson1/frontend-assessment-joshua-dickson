import { Suspense } from "react";
import { Hero } from "@/components/Hero/Hero";
import { HeroControls } from "@/components/Hero/HeroControls";
import { ListingUrlTracker } from "@/components/ListingUrlTracker/ListingUrlTracker";
import { ProductResults } from "@/components/ProductResults/ProductResults";
import { ProductGridSkeleton } from "@/components/Skeletons/ProductGridSkeleton";
import { getCategories } from "@/lib/api";
import { firstParam } from "@/lib/searchParams";

interface HomePageProps {
  searchParams: Promise<{
    page?: string | string[];
    q?: string | string[];
    category?: string | string[];
  }>;
}

function HeroControlsSkeleton() {
  return (
    <div className="mx-auto flex h-[108px] w-full max-w-2xl flex-col gap-3 sm:h-12 sm:flex-row">
      <div className="skeleton h-12 flex-1 rounded-control" />
      <div className="skeleton h-12 rounded-control sm:w-52" />
    </div>
  );
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const q = firstParam(params.q)?.trim() || undefined;
  const category = firstParam(params.category) || undefined;
  const pageParam = firstParam(params.page);
  const categories = await getCategories();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <Hero>
        <Suspense fallback={<HeroControlsSkeleton />}>
          <ListingUrlTracker />
          <HeroControls categories={categories} query={q} category={category} />
        </Suspense>
      </Hero>

      <section className="pb-16">
        <Suspense
          key={`${q ?? ""}|${category ?? ""}|${pageParam ?? ""}`}
          fallback={
            <div>
              <div className="skeleton mb-6 h-5 w-40 rounded" />
              <ProductGridSkeleton />
            </div>
          }
        >
          <ProductResults q={q} category={category} pageParam={pageParam} />
        </Suspense>
      </section>
    </main>
  );
}
