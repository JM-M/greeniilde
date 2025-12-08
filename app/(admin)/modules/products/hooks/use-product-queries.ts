"use client";

import { listProducts } from "@/app/(admin)/lib/api/products";
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
