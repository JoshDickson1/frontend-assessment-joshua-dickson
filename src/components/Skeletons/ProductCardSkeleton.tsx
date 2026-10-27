export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="aspect-square animate-pulse bg-gray-100" />

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

        <div className="mt-auto flex items-center justify-between">
          <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
