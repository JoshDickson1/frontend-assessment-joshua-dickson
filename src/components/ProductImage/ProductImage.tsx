"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  src?: string;
  alt: string;
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  priority = false,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100 text-xs font-medium text-gray-400">
        Image unavailable
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={300}
      height={300}
      priority={priority}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      className="h-full w-full object-contain"
      onError={() => setFailed(true)}
    />
  );
}
