import { ProductCardSkeleton } from "@/components/Skeletons/ProductCardSkeleton";

interface ProductGridSkeletonProps {
  count?: number;
}

export function ProductGridSkeleton({
  count = 20,
}: ProductGridSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
