import Link from "next/link";

interface EmptyStateProps {
  query?: string;
  category?: string;
}

export function EmptyState({ query, category }: EmptyStateProps) {
  const message = query
    ? `We couldn't find anything for "${query}"${
        category ? " in this category" : ""
      }.`
    : "There are no products in this category.";

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-16 text-center">
      <h2 className="text-lg font-semibold text-gray-900">
        No products found
      </h2>
      <p className="mt-2 max-w-md text-sm text-gray-500">{message}</p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition hover:bg-accent/90"
      >
        Clear filters
      </Link>
    </div>
  );
}
