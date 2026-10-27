export function firstParam(
  value?: string | string[],
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

interface ProductListUrlParams {
  q?: string;
  category?: string;
  page?: number;
}

export function buildProductListUrl({
  q,
  category,
  page = 1,
}: ProductListUrlParams): string {
  const params = new URLSearchParams();

  if (q) {
    params.set("q", q);
  }

  if (category) {
    params.set("category", category);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();

  return query ? `/?${query}` : "/";
}
