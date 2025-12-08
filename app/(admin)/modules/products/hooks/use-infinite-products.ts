"use client";

import { listProducts } from "@/app/(admin)/lib/api/products";
import {
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { productQueries } from "../queries";

type ListProductsParams = Parameters<typeof listProducts>[0];

/**
 * Hook for infinite scroll pagination of products
 */
export const useInfiniteProducts = (
  params?: ListProductsParams,
  options?: Omit<
    UseInfiniteQueryOptions<Awaited<ReturnType<typeof listProducts>>, Error>,
    "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
  >,
) => {
  return useInfiniteQuery({
    queryKey: [...productQueries.listProducts.queryKey(params), "infinite"],
    queryFn: async ({ pageParam = 0 }) => {
      return listProducts({
        ...params,
        offset: pageParam as number,
        limit: params?.limit ?? 20,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce(
        (sum, page) => sum + (page.products?.length ?? 0),
        0,
      );
      const hasMore = totalFetched < (lastPage.count ?? 0);
      return hasMore ? totalFetched : undefined;
    },
    ...options,
  });
};
