"use client";

import {
  getOrder,
  listOrderChanges,
  listOrders,
} from "@/app/(admin)/lib/api/orders";
import { HttpTypes } from "@medusajs/types";
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

/**
 * Hook to get a single order by ID
 */
export const useGetOrder = (
  id: string,
  query?: HttpTypes.SelectParams,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getOrder>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery(orderQueries.getOrder.queryOptions({ id, query }, options));
};

/**
 * Hook to list order changes (activity)
 */
export const useListOrderChanges = (
  orderId: string,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof listOrderChanges>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery(orderQueries.listOrderChanges.queryOptions(orderId, options));
};
