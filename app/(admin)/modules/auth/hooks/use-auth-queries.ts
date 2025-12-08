"use client";

import { getUser } from "@/app/(admin)/lib/api/auth";
import {
  useQuery,
  useSuspenseQuery,
  type UseQueryOptions,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { authQueries } from "../queries";

/**
 * Hook to get the authenticated user
 * Returns user if authenticated, null otherwise
 */
export const useGetUser = (
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getUser>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery(authQueries.getUser.queryOptions(undefined, options));
};

/**
 * Hook to get the authenticated user (suspense version)
 * Returns user if authenticated, null otherwise
 */
export const useSuspenseGetUser = (
  options?: Omit<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUser>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery(
    authQueries.getSuspenseUser.queryOptions(undefined, options),
  );
};
