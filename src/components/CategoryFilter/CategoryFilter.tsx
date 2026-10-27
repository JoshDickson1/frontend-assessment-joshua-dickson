"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useUrlFilters } from "@/hooks/useUrlFilters";
import type { Category } from "@/types/product";

type CategoryFilterVariant = "glass" | "plain";

interface CategoryFilterProps {
  categories: Category[];
  autoFocus?: boolean;
  className?: string;
  variant?: CategoryFilterVariant;
  onSelect?: () => void;
  inline?: boolean;
}

interface CategoryOption {
  slug: string;
  name: string;
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path d="m6 8 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="m5 10 3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CategoryFilter({
  categories,
  autoFocus = false,
  className = "",
  variant = "glass",
  onSelect,
  inline = false,
}: CategoryFilterProps) {
  const { updateFilters, searchParams } = useUrlFilters();
  const urlCategory = searchParams.get("category") ?? "";
  const [category, setCategory] = useState(urlCategory);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const options: CategoryOption[] = [
    { slug: "", name: "All categories" },
    ...categories.map((item) => ({ slug: item.slug, name: item.name })),
  ];
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.slug === category),
  );
  const selectedName = options[selectedIndex]?.name ?? "All categories";

  useEffect(() => {
    setCategory(urlCategory);
  }, [urlCategory]);

  useEffect(() => {
    setActiveIndex(selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    if (open || (inline && autoFocus)) {
      listRef.current?.focus();
    }
  }, [open, inline, autoFocus]);

  useEffect(() => {
    if (!open && !inline) {
      return;
    }

    const activeOption = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`,
    );

    activeOption?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open, inline]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  function selectCategory(slug: string) {
    setCategory(slug);
    updateFilters({ category: slug || null, page: 1 });
    onSelect?.();
    setOpen(false);
    triggerRef.current?.focus();
  }

  function closeList() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
    }
  }

  function handleListKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, options.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(options.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectCategory(options[activeIndex]?.slug ?? "");
    } else if (event.key === "Escape" && !inline) {
      event.preventDefault();
      closeList();
    }
  }

  const list = (
    <div
      ref={listRef}
      id={listboxId}
      role="listbox"
      aria-label="Categories"
      tabIndex={0}
      aria-activedescendant={
        options[activeIndex] ? `${listboxId}-option-${activeIndex}` : undefined
      }
      onKeyDown={handleListKeyDown}
      className="styled-scrollbar max-h-64 overflow-y-auto overscroll-contain rounded-2xl p-1 outline-none"
    >
      {options.map((option, index) => {
        const isSelected = option.slug === category;
        const isActive = index === activeIndex;

        return (
          <div
            key={option.slug || "all"}
            id={`${listboxId}-option-${index}`}
            data-index={index}
            role="option"
            aria-selected={isSelected}
            onClick={() => selectCategory(option.slug)}
            onMouseEnter={() => setActiveIndex(index)}
            className={`flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm transition ${
              isSelected
                ? "bg-accent text-accent-foreground"
                : isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700"
            }`}
          >
            <span className="truncate">{option.name}</span>
            {isSelected && <CheckIcon className="h-4 w-4 shrink-0" />}
          </div>
        );
      })}
    </div>
  );

  if (inline) {
    return <div className={className}>{list}</div>;
  }

  const surface =
    variant === "glass"
      ? "glass"
      : "border border-gray-200/80 bg-white/90 shadow-sm";

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full rounded-control ${surface} transition focus-within:border-accent/40 focus-within:ring-4 focus-within:ring-accent/15 ${className}`}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? closeList() : setOpen(true))}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label="Filter by category"
        className="flex h-12 w-full items-center justify-between gap-2 rounded-control bg-transparent pl-4 pr-3 text-left text-sm text-gray-900 outline-none"
      >
        <span className="truncate">{selectedName}</span>
        <ChevronIcon
          className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="glass absolute left-0 right-0 top-full z-50 mt-2 animate-[panel-in_160ms_ease-out] rounded-2xl p-1.5 shadow-xl motion-reduce:animate-none">
          {list}
        </div>
      )}
    </div>
  );
}
