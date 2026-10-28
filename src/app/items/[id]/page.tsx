import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { BackToListing } from "@/components/BackToListing/BackToListing";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { ProductGallery } from "@/components/ProductGallery/ProductGallery";
import { getProduct } from "@/lib/api";
import { formatPrice, getDiscountedPrice } from "@/lib/format";

interface ProductPageProps {
  params: Promise<{ id: string }>;
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
    <main className="mx-auto w-full max-w-7xl animate-[page-in_280ms_ease-out] px-4 py-10 sm:px-6 lg:px-8 motion-reduce:animate-none">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="order-2 sm:order-1">
          <Breadcrumbs category={product.category} title={product.title} />
        </div>
        <div className="order-1 sm:order-2">
          <BackToListing />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery
          key={product.id}
          images={product.images}
          title={product.title}
        />

        <div className="glass flex flex-col gap-5 rounded-2xl p-6 sm:p-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              {product.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
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

          <div className="flex flex-wrap items-end gap-3">
            <span className="text-3xl font-semibold text-gray-900">
              {formatPrice(discountedPrice)}
            </span>

            {hasDiscount && (
              <>
                <span className="text-lg text-gray-500 line-through">
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
              <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Tags
              </h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/60 bg-white/60 px-3 py-1 text-xs text-gray-600"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="border-t border-dashed border-gray-300/80 pt-5">
            <dl className="grid grid-cols-2 gap-4 rounded-xl border border-white/60 bg-white/60 p-4 text-sm">
              <div>
                <dt className="text-gray-600">Brand</dt>
                <dd className="mt-0.5 font-medium text-gray-900">
                  {product.brand ?? "Unbranded"}
                </dd>
              </div>
              <div>
                <dt className="text-gray-600">Availability</dt>
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
      </div>
    </main>
  );
}
