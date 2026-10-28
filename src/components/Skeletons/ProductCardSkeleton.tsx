export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/60 shadow-sm">
      <div className="skeleton aspect-square" />

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />

        <div className="mt-auto flex items-center justify-between">
          <div className="skeleton h-5 w-16 rounded" />
          <div className="skeleton h-4 w-10 rounded" />
        </div>
      </div>
    </div>
  );
}
