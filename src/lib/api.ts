import { cache } from "react";
import type { Category, Product, ProductsResponse } from "@/types/product";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://dummyjson.com"
).replace(/\/$/, "");

const REVALIDATE_SECONDS = 3600;

export const PRODUCTS_PER_PAGE = 20;

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface GetProductsParams {
  limit?: number;
  skip?: number;
  q?: string;
  category?: string;
}

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `API request failed (${response.status} ${response.statusText}): ${path}`,
    );
  }

  return response.json() as Promise<T>;
}

export async function getProducts({
  limit = PRODUCTS_PER_PAGE,
  skip = 0,
  q,
  category,
}: GetProductsParams = {}): Promise<ProductsResponse> {
  if (q && category) {
    const data = await fetchJson<ProductsResponse>(
      `/products/search?q=${encodeURIComponent(q)}&limit=0`,
    );
    const products = data.products.filter(
      (product) => product.category === category,
    );

    return {
      products: products.slice(skip, skip + limit),
      total: products.length,
      skip,
      limit,
    };
  }

  if (q) {
    return fetchJson<ProductsResponse>(
      `/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`,
    );
  }

  if (category) {
    return fetchJson<ProductsResponse>(
      `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`,
    );
  }

  return fetchJson<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
}

export const getProduct = cache(
  async (id: string | number): Promise<Product | null> => {
    try {
      return await fetchJson<Product>(
        `/products/${encodeURIComponent(String(id))}`,
      );
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return null;
      }

      throw error;
    }
  },
);

export function getCategories(): Promise<Category[]> {
  return fetchJson<Category[]>("/products/categories");
}
