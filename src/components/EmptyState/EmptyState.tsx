import { ProgressLink } from "@/components/NavigationProgress/ProgressLink";

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
    <div className="glass mx-auto flex max-w-xl flex-col items-center justify-center rounded-2xl px-6 py-16 text-center">
      <h2 className="text-lg font-semibold text-gray-900">
        No products found
      </h2>
      <p className="mt-2 max-w-md text-sm text-gray-600">{message}</p>
      <ProgressLink
        href="/"
        className="focus-ring mt-6 inline-flex h-10 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground transition hover:bg-accent/90"
      >
        Clear filters
      </ProgressLink>
    </div>
  );
}
