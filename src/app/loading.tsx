import { ProductGridSkeleton } from "@/components/Skeletons/ProductGridSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-6">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
      </header>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200 sm:max-w-xs" />
        <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200 sm:w-48" />
      </div>

      <div className="mb-6 h-5 w-40 animate-pulse rounded bg-gray-200" />
      <ProductGridSkeleton />
    </main>
  );
}
