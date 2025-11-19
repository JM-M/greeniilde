"use client";

import { getProductReviews, getProductReviewStats } from "@/app/lib/api/product-reviews";
import {
  useQuery,
  useSuspenseQuery,
  type UseQueryOptions,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { productQueries } from "../queries";

/**
 * Hook to get product reviews for a specific product (suspense version)
 * @param productId - Product ID
 * @param options - React Query options
 */
export const useSuspenseGetProductReviews = (
  productId: string,
  options?: Omit<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof getProductReviews>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery(
    productQueries.getProductReviews.queryOptions(productId, options),
  );
};

/**
 * Hook to get product reviews for a specific product (non-suspense version)
 * @param productId - Product ID
 * @param options - React Query options
 */
export const useGetProductReviews = (
  productId: string,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getProductReviews>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery(
    productQueries.getProductReviews.queryOptions(productId, options),
  );
};

/**
 * Hook to get product review statistics for a specific product (suspense version)
 * @param productId - Product ID
 * @param options - React Query options
 */
export const useSuspenseGetProductReviewStats = (
  productId: string,
  options?: Omit<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof getProductReviewStats>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery(
    productQueries.getProductReviewStats.queryOptions(productId, options),
  );
};

/**
 * Hook to get product review statistics for a specific product (non-suspense version)
 * @param productId - Product ID
 * @param options - React Query options
 */
export const useGetProductReviewStats = (
  productId: string,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getProductReviewStats>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery(
    productQueries.getProductReviewStats.queryOptions(productId, options),
  );
};
