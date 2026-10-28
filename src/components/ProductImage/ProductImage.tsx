"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductImageProps {
  src?: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}

function LoadingDots() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center"
    >
      <span className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400 motion-reduce:animate-none [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400 motion-reduce:animate-none [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400 motion-reduce:animate-none [animation-delay:300ms]" />
      </span>
    </div>
  );
}

export function ProductImage({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  width = 300,
  height = 300,
}: ProductImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [unoptimized, setUnoptimized] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
    setUnoptimized(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100 text-xs font-medium text-gray-600">
        Image unavailable
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {!loaded && <LoadingDots />}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        unoptimized={unoptimized}
        sizes={sizes}
        className={`h-full w-full object-contain transition-opacity duration-300 motion-reduce:transition-none ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (unoptimized) {
            setFailed(true);
          } else {
            setUnoptimized(true);
          }
        }}
      />
    </div>
  );
}
