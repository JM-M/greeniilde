"use client";

import { retrieveCustomer } from "@/app/lib/api/customer";
import { authQueries } from "@/app/modules/auth/queries";
import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";

/**
 * Hook to retrieve the current customer
 * @param options - React Query options
 */
export const useSuspenseCustomer = (
  options?: Omit<
    UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof retrieveCustomer>>,
      Error
    >,
    "queryKey" | "queryFn"
  >,
) => {
  const { data: customer } = useSuspenseQuery(
    authQueries.retrieveCustomer.queryOptions(undefined, options),
  );

  return customer;
};
