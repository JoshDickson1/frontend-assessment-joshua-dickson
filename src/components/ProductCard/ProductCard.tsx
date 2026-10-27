import Link from "next/link";
import { ProductImage } from "@/components/ProductImage/ProductImage";
import type { Product } from "@/types/product";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 text-amber-500"
    >
      <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.29 3.96a1 1 0 0 0 .95.69h4.16c.97 0 1.37 1.24.59 1.81l-3.37 2.44a1 1 0 0 0-.36 1.12l1.28 3.96c.3.92-.75 1.69-1.54 1.12l-3.36-2.45a1 1 0 0 0-1.18 0l-3.36 2.45c-.79.57-1.84-.2-1.54-1.12l1.28-3.96a1 1 0 0 0-.36-1.12L2.05 9.39c-.78-.57-.38-1.81.59-1.81h4.16a1 1 0 0 0 .95-.69l1.3-3.96Z" />
    </svg>
  );
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <Link
      href={`/items/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-square bg-gray-50 p-4">
        <ProductImage
          src={product.thumbnail}
          alt={product.title}
          priority={priority}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h2 className="line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-blue-600">
          {product.title}
        </h2>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-base font-semibold text-gray-900">
            {priceFormatter.format(product.price)}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-600">
            <StarIcon />
            {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
