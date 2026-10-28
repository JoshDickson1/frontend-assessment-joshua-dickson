import { Star } from "lucide-react";
import type { CSSProperties } from "react";
import { ProgressLink } from "@/components/NavigationProgress/ProgressLink";
import { ProductImage } from "@/components/ProductImage/ProductImage";
import type { Product } from "@/types/product";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  index?: number;
}

export function ProductCard({
  product,
  priority = false,
  index = 0,
}: ProductCardProps) {
  const shouldAnimate = index >= 4 && index < 8;

  return (
    <ProgressLink
      href={`/items/${product.id}`}
      style={
        shouldAnimate
          ? ({ "--card-index": index } as CSSProperties)
          : undefined
      }
      className={`focus-ring group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        shouldAnimate
          ? "animate-[card-in_320ms_ease-out_both] [animation-delay:calc((var(--card-index)-4)*50ms)] motion-reduce:animate-none"
          : ""
      }`}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50 p-4">
        <div className="h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          <ProductImage
            src={product.thumbnail}
            alt={product.title}
            priority={priority}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h2 className="line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-accent">
          {product.title}
        </h2>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-base font-semibold text-gray-900">
            {priceFormatter.format(product.price)}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-600">
            <Star
              aria-hidden="true"
              strokeWidth={1.8}
              fill="currentColor"
              className="h-4 w-4 text-amber-500"
            />
            {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </ProgressLink>
  );
}
