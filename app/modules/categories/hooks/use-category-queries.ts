"use client";

import { getCategory, listCategories } from "@/app/lib/api/categories";
import { HttpTypes } from "@medusajs/types";
import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { categoryQueries } from "../queries";

// Query hooks

/**
 * Hook to list product categories from the store
 * @param query - Store product category query parameters
 * @param options - React Query options
 */
export const useSuspenseListCategories = (
  query?: HttpTypes.StoreProductCategoryListParams,
  options?: Omit<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof listCategories>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery(
    categoryQueries.listCategories.queryOptions(query, options),
  );
};

/**
 * Hook to get a single product category by ID
 * @param categoryId - Category ID
 * @param query - Store product category query parameters
 * @param options - React Query options
 */
export const useSuspenseGetCategory = (
  categoryId: string,
  query?: HttpTypes.StoreProductCategoryParams,
  options?: Omit<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof getCategory>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery(
    categoryQueries.getCategory.queryOptions({ categoryId, query }, options),
  );
};

// Re-export categoryQueries for convenience
export { categoryQueries } from "../queries";
