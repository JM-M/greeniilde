"use client";

import { getProduct, listProducts } from "@/app/(admin)/lib/api/products";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { productQueries } from "../queries";

/**
 * Hook to list products
 */
export const useListProducts = (
  query?: Parameters<typeof listProducts>[0],
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof listProducts>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery(productQueries.listProducts.queryOptions(query, options));
};

/**
 * Hook to get a single product by ID
 */
export const useGetProduct = (
  id: string,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getProduct>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery(productQueries.getProduct.queryOptions(id, options));
};
