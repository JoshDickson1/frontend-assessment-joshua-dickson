"use client";

import { useEffect, useState } from "react";
import { useUrlFilters } from "@/hooks/useUrlFilters";
import type { Category } from "@/types/product";

interface CategoryFilterProps {
  categories: Category[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const { updateFilters, searchParams } = useUrlFilters();
  const urlCategory = searchParams.get("category") ?? "";
  const [category, setCategory] = useState(urlCategory);

  useEffect(() => {
    setCategory(urlCategory);
  }, [urlCategory]);

  return (
    <select
      value={category}
      onChange={(event) => {
        const nextCategory = event.target.value;
        setCategory(nextCategory);
        updateFilters({ category: nextCategory || null, page: 1 });
      }}
      aria-label="Filter by category"
      className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-48"
    >
      <option value="">All categories</option>
      {categories.map((item) => (
        <option key={item.slug} value={item.slug}>
          {item.name}
        </option>
      ))}
    </select>
  );
}
