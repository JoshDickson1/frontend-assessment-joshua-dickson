"use client";

import { useState } from "react";
import { ProductImage } from "@/components/ProductImage/ProductImage";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState<string | undefined>(images[0]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-white p-6">
        <ProductImage
          src={activeImage}
          alt={title}
          priority
          width={800}
          height={800}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {images.length > 1 && (
        <div
          role="group"
          aria-label="Product images"
          className="flex gap-3 overflow-x-auto pb-1"
        >
          {images.map((image, index) => {
            const isActive = image === activeImage;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveImage(image)}
                aria-label={`View image ${index + 1} of ${images.length}`}
                aria-pressed={isActive}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-white p-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isActive
                    ? "border-blue-600 ring-2 ring-blue-100"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <ProductImage src={image} alt="" sizes="64px" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
