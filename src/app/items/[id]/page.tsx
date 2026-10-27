import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackToListing } from "@/components/BackToListing/BackToListing";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { ProductGallery } from "@/components/ProductGallery/ProductGallery";
import { getProduct } from "@/lib/api";
import {
  formatCategoryName,
  formatPrice,
  getDiscountedPrice,
} from "@/lib/format";

interface ProductPageProps {
  params: Promise<{ id: string }>;
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

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return { title: "Product not found | Content Explorer" };
  }

  const image = product.thumbnail || product.images[0];

  return {
    title: `${product.title} | Content Explorer`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: image ? [{ url: image, alt: product.title }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const discountedPrice = getDiscountedPrice(
    product.price,
    product.discountPercentage,
  );
  const hasDiscount = product.discountPercentage > 0;
  const inStock = product.stock > 0;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Breadcrumbs category={product.category} title={product.title} />
        <BackToListing />
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery
          key={product.id}
          images={product.images}
          title={product.title}
        />

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-accent-soft px-3 py-1 font-medium text-accent">
              {formatCategoryName(product.category)}
            </span>
            {product.brand && (
              <span className="text-gray-500">{product.brand}</span>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              {product.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <StarIcon />
                {product.rating.toFixed(1)}
              </span>
              <span aria-hidden="true">&middot;</span>
              <span className={inStock ? "text-emerald-700" : "text-red-600"}>
                {inStock ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <span className="text-3xl font-semibold text-gray-900">
              {formatPrice(discountedPrice)}
            </span>

            {hasDiscount && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                  {Math.round(product.discountPercentage)}% off
                </span>
              </>
            )}
          </div>

          <p className="text-sm leading-6 text-gray-600">
            {product.description}
          </p>

          {product.tags.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Tags
              </h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <dl className="grid grid-cols-2 gap-4 rounded-xl border border-gray-200 bg-white p-4 text-sm">
            <div>
              <dt className="text-gray-500">Brand</dt>
              <dd className="mt-0.5 font-medium text-gray-900">
                {product.brand ?? "Unbranded"}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Category</dt>
              <dd className="mt-0.5 font-medium text-gray-900">
                {formatCategoryName(product.category)}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Product ID</dt>
              <dd className="mt-0.5 font-medium text-gray-900">
                #{product.id}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Availability</dt>
              <dd
                className={`mt-0.5 font-medium ${
                  inStock ? "text-emerald-700" : "text-red-600"
                }`}
              >
                {inStock ? "In stock" : "Out of stock"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}
