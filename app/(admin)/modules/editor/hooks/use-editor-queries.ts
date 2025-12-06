"use client";

import { getPageContent, getPages } from "@/app/(admin)/lib/api/editor";
import {
  useQuery,
  useSuspenseQuery,
  type UseQueryOptions,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { editorQueries } from "../queries";

// Query hooks

/**
 * Hook to get page content by slug (suspense version)
 * @param slug - Page slug (e.g., "home")
 * @param options - React Query options
 */
export const useSuspenseGetPageContent = (
  path: string,
  options?: Omit<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof getPageContent>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery(
    editorQueries.getSuspensePageContent.queryOptions(path, options),
  );
};

/**
 * Hook to get page content by slug (non-suspense version)
 * @param slug - Page slug (e.g., "home")
 * @param options - React Query options
 */
export const useGetPageContent = (
  path: string,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getPageContent>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery(editorQueries.getPageContent.queryOptions(path, options));
};

/**
 * Hook to get all pages
 */
export const useGetPages = (
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getPages>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery(editorQueries.getPages.queryOptions(undefined, options));
};

// Re-export editorQueries for convenience
export { editorQueries } from "../queries";
