"use client";

import { retrieveOrder } from "@/app/lib/api/orders";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { orderQueries } from "../queries";

// Query hooks

/**
 * Hook to get a single order by ID
 * @param orderId - Order ID
 * @param options - React Query options
 */
export const useRetrieveOrder = (
  orderId: string,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof retrieveOrder>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery(
    orderQueries.retrieveOrder.queryOptions(orderId, {
      ...options,
      enabled: !!orderId && options?.enabled !== false,
    }),
  );
};
