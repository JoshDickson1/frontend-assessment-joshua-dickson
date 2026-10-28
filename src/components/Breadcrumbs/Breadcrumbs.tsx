import { ChevronRight } from "lucide-react";
import { ProgressLink } from "@/components/NavigationProgress/ProgressLink";
import { formatCategoryName } from "@/lib/format";

interface BreadcrumbsProps {
  category: string;
  title: string;
}

export function Breadcrumbs({ category, title }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-gray-600">
      <ol className="flex flex-wrap items-center gap-1.5 rounded-full border border-white/60 bg-white/60 px-3 py-1.5 backdrop-blur-sm">
        <li>
          <ProgressLink
            href="/"
            className="focus-ring rounded-full px-1.5 py-0.5 transition hover:bg-white hover:text-gray-900"
          >
            Home
          </ProgressLink>
        </li>
        <li aria-hidden="true" className="flex items-center text-gray-500">
          <ChevronRight strokeWidth={1.8} className="h-3.5 w-3.5" />
        </li>
        <li>
          <ProgressLink
            href={`/?category=${encodeURIComponent(category)}`}
            className="focus-ring rounded-full px-1.5 py-0.5 transition hover:bg-white hover:text-gray-900"
          >
            {formatCategoryName(category)}
          </ProgressLink>
        </li>
        <li aria-hidden="true" className="flex items-center text-gray-500">
          <ChevronRight strokeWidth={1.8} className="h-3.5 w-3.5" />
        </li>
        <li
          aria-current="page"
          className="max-w-full truncate px-1.5 font-medium text-gray-900"
        >
          {title}
        </li>
      </ol>
    </nav>
  );
}
