import Link from "next/link";
import { formatCategoryName } from "@/lib/format";

interface BreadcrumbsProps {
  category: string;
  title: string;
}

export function Breadcrumbs({ category, title }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="transition hover:text-gray-900">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="text-gray-300">
          /
        </li>
        <li>
          <Link
            href={`/?category=${encodeURIComponent(category)}`}
            className="transition hover:text-gray-900"
          >
            {formatCategoryName(category)}
          </Link>
        </li>
        <li aria-hidden="true" className="text-gray-300">
          /
        </li>
        <li
          aria-current="page"
          className="max-w-full truncate font-medium text-gray-900"
        >
          {title}
        </li>
      </ol>
    </nav>
  );
}
