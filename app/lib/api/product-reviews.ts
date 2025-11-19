"use server";

import { sdk } from "../medusa/config";

/**
 * Get product reviews for a specific product
 * Public endpoint - no authentication required
 */
export const getProductReviews = async (productId: string) => {
  const url = `/store/product-reviews?product_id=${encodeURIComponent(productId)}`;
  return await sdk.client.fetch(url);
};

/**
 * Get product review statistics for a specific product
 * Public endpoint - no authentication required
 */
export const getProductReviewStats = async (productId: string) => {
  const url = `/store/product-review-stats?product_id=${encodeURIComponent(productId)}`;
  return await sdk.client.fetch(url);
};
