"use client";

import {
  getFacetDistributions,
  getFilterableAttributes,
  getProduct,
  getProductHits,
  getProductsFromMeilisearch,
  listProducts,
  searchProducts,
  type SearchProductsInput,
} from "@/app/lib/api/products";
import { HttpTypes } from "@medusajs/types";
import {
  useQuery,
  useSuspenseQuery,
  type UseQueryOptions,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { productQueries } from "../queries";

// Query hooks

/**
 * Hook to list products from the store
 * @param query - Store product query parameters
 * @param options - React Query options
 */
export const useSuspenseListProducts = (
  query?: HttpTypes.StoreProductParams,
  options?: Omit<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof listProducts>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery(
    productQueries.listProducts.queryOptions(query, options),
  );
};

/**
 * Hook to get a single product by ID
 * @param productId - Product ID
 * @param query - Store product query parameters
 * @param options - React Query options
 */
export const useSuspenseGetProduct = (
  productId: string,
  query?: HttpTypes.StoreProductParams,
  options?: Omit<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof getProduct>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery(
    productQueries.getProduct.queryOptions({ productId, query }, options),
  );
};

/**
 * Hook to search products using Meilisearch
 * @param input - Search parameters
 * @param options - React Query options
 */
export const useSuspenseSearchProducts = (
  input: SearchProductsInput,
  options?: Omit<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof searchProducts>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery(
    productQueries.searchProducts.queryOptions(input, options),
  );
};

/**
 * Hook to get product search hits with metadata
 * @param input - Search parameters
 * @param options - React Query options
 */
export const useSuspenseProductHits = (
  input: SearchProductsInput,
  options?: Omit<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof getProductHits>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery(
    productQueries.getProductHits.queryOptions(input, options),
  );
};

/**
 * Hook to get products directly from Meilisearch index
 * @param input - Meilisearch search parameters
 * @param options - React Query options
 */
export const useSuspenseGetProductsFromMeilisearch = (
  input: Parameters<typeof getProductsFromMeilisearch>[0],
  options?: Omit<
    UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof getProductsFromMeilisearch>>,
      Error
    >,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery(
    productQueries.getProductsFromMeilisearch.queryOptions(input, options),
  );
};

/**
 * Hook to get products directly from Meilisearch index (non-suspense version)
 * @param input - Meilisearch search parameters
 * @param options - React Query options
 */
export const useGetProductsFromMeilisearch = (
  input: Parameters<typeof getProductsFromMeilisearch>[0],
  options?: Omit<
    UseQueryOptions<
      Awaited<ReturnType<typeof getProductsFromMeilisearch>>,
      Error
    >,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery(
    productQueries.getProductsFromMeilisearchNonSuspense.queryOptions(
      input,
      options,
    ),
  );
};

/**
 * Hook to get filterable attributes from Meilisearch index
 * @param options - React Query options
 */
export const useSuspenseGetFilterableAttributes = (
  options?: Omit<
    UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof getFilterableAttributes>>,
      Error
    >,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery(
    productQueries.getFilterableAttributes.queryOptions(undefined, options),
  );
};

/**
 * Hook to get facet distributions for all filterable attributes
 * Returns the range of values and their counts for each filterable attribute
 * @param options - React Query options
 */
export const useSuspenseGetFacetDistributions = (
  options?: Omit<
    UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof getFacetDistributions>>,
      Error
    >,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery(
    productQueries.getFacetDistributions.queryOptions(undefined, options),
  );
};

// Re-export productQueries for convenience
export { productQueries } from "../queries";
