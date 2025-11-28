"use client";

import {
  getProductReviews,
  getProductReviewStats,
} from "@/app/lib/api/product-reviews";
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
 * @param query - Optional query parameters for filtering
 * @param options - React Query options
 */
export const useSuspenseGetProductReviews = (
  productId: string,
  query?: import("@/app/lib/api/product-reviews").StoreProductReviewsQuery,
  options?: Omit<
    UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof getProductReviews>>,
      Error
    >,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery(
    productQueries.getProductReviews.queryOptions(
      { productId, query },
      options,
    ),
  );
};

/**
 * Hook to get product reviews for a specific product (non-suspense version)
 * @param productId - Product ID
 * @param query - Optional query parameters for filtering
 * @param options - React Query options
 */
export const useGetProductReviews = (
  productId: string,
  query?: import("@/app/lib/api/product-reviews").StoreProductReviewsQuery,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getProductReviews>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery(
    productQueries.getProductReviews.queryOptions(
      { productId, query },
      options,
    ),
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
    UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof getProductReviewStats>>,
      Error
    >,
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

/**
 * Hook to verify if the authenticated user has purchased a specific product
 * Returns null if not authenticated, or purchase verification status with order details
 * @param productId - Product ID to verify purchase for
 * @param options - React Query options
 */
export const useVerifyUserPurchasedProduct = (
  productId: string,
  options?: Omit<
    UseQueryOptions<
      Awaited<
        ReturnType<
          typeof import("@/app/lib/api/product-reviews").verifyUserPurchasedProduct
        >
      >,
      Error
    >,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery(
    productQueries.verifyUserPurchasedProduct.queryOptions(productId, options),
  );
};

/**
 * Hook to get the current authenticated user's review for a specific product
 * Automatically fetches the user's purchase info and filters reviews by their order
 * @param productId - Product ID
 * @returns User's review if they have purchased and reviewed the product
 */
export const useGetUserProductReview = (productId: string) => {
  const { data: verification } = useVerifyUserPurchasedProduct(productId);

  return useGetProductReviews(
    productId,
    { order_id: verification?.orderId },
    {
      enabled: !!verification?.hasPurchased && !!verification?.orderId,
    },
  );
};
