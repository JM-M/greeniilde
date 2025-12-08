"use client";

import { listCategories } from "@/app/(admin)/lib/api/categories";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { categoryQueries } from "../queries";

/**
 * Hook to list categories
 */
export const useListCategories = (
  query?: Parameters<typeof listCategories>[0],
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof listCategories>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery(categoryQueries.listCategories.queryOptions(query, options));
};
