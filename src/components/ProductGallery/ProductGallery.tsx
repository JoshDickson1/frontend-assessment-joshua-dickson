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
      <div className="glass relative aspect-square overflow-hidden rounded-2xl p-6">
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
          className="styled-scrollbar flex gap-3 overflow-x-auto pb-1"
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
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border bg-white/70 p-1.5 shadow-sm transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                  isActive
                    ? "border-accent ring-2 ring-accent/15"
                    : "border-white/60 hover:-translate-y-0.5 hover:border-white/80 hover:shadow-md"
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
