"use client";

import { listOrders, retrieveOrder } from "@/app/lib/api/orders";
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  useQuery,
  type UseInfiniteQueryOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
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

export const useInfiniteOrders = <
  TSelectData = InfiniteData<Awaited<ReturnType<typeof listOrders>>>,
>(
  limit: number = 10,
  options?: Omit<
    UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof listOrders>>,
      Error,
      TSelectData,
      QueryKey,
      number
    >,
    "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
  >,
) => {
  return useInfiniteQuery(
    orderQueries.listOrders.queryOptions(
      { limit },
      {
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
          if (!lastPage) return undefined;
          const { offset, limit, count } = lastPage;
          if (offset + limit < count) {
            return offset + limit;
          }
          return undefined;
        },
        ...options,
      },
    ),
  );
};
