"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CategoryFilter } from "@/components/CategoryFilter/CategoryFilter";
import { NavbarControls } from "@/components/Navbar/NavbarControls";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import type { Category } from "@/types/product";

const NAVBAR_OFFSET_PX = 64;

interface HeroControlsProps {
  categories: Category[];
  query?: string;
  category?: string;
}

export function HeroControls({
  categories,
  query,
  category,
}: HeroControlsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setSlot(document.getElementById("navbar-controls-slot"));
  }, []);

  useEffect(() => {
    const element = wrapperRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {
        rootMargin: `-${NAVBAR_OFFSET_PX}px 0px 0px 0px`,
        threshold: 0,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={wrapperRef}
        className="mx-auto h-[108px] w-full max-w-2xl sm:h-12"
      >
        {visible && (
          <div className="flex h-full flex-col gap-3 sm:flex-row">
            <SearchBar className="sm:flex-1" />
            <CategoryFilter
              categories={categories}
              className="sm:w-52 sm:shrink-0"
            />
          </div>
        )}
      </div>

      {!visible && slot
        ? createPortal(
            <NavbarControls
              categories={categories}
              query={query}
              category={category}
            />,
            slot,
          )
        : null}
    </>
  );
}
