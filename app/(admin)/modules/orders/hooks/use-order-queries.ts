"use client";

import { listOrders } from "@/app/(admin)/lib/api/orders";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { orderQueries } from "../queries";

/**
 * Hook to list orders
 */
export const useListOrders = (
  query?: Parameters<typeof listOrders>[0],
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof listOrders>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery(orderQueries.listOrders.queryOptions(query, options));
};
