"use client";

import {
  getCities,
  getCountries,
  getStates,
  type GetCitiesParams,
} from "@/app/lib/api/terminal";
import {
  useQuery,
  useSuspenseQuery,
  type UseQueryOptions,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { terminalQueries } from "../queries";

/**
 * Hook to get all countries from Terminal API
 * @param options - React Query options
 */
export const useSuspenseGetCountries = (
  options?: Omit<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof getCountries>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery(
    terminalQueries.getCountries.queryOptions(undefined, options),
  );
};

/**
 * Hook to get states for a specific country from Terminal API
 * @param countryIsoCode - Country ISO code
 * @param options - React Query options
 */
export const useSuspenseGetStates = (
  countryIsoCode: string,
  options?: Omit<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof getStates>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery(
    terminalQueries.getStates.queryOptions(countryIsoCode, options),
  );
};

/**
 * Hook to get cities for a specific country and optionally state from Terminal API
 * @param params - City search parameters
 * @param options - React Query options
 */
export const useSuspenseGetCities = (
  params: GetCitiesParams,
  options?: Omit<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof getCities>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery(
    terminalQueries.getCities.queryOptions(params, options),
  );
};

/**
 * Hook to get cities for a specific country and optionally state from Terminal API (non-suspense version)
 * @param params - City search parameters
 * @param options - React Query options
 */
export const useGetCities = (
  params: GetCitiesParams,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getCities>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery(
    terminalQueries.getCitiesNonSuspense.queryOptions(params, options),
  );
};

// Re-export terminalQueries for convenience
export { terminalQueries } from "../queries";
