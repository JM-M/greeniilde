"use server";

import { sdk } from "../medusa/config";
import { getAuthHeaders } from "./auth";

export type StoreProductReview = {
  id: string;
  status: "pending" | "approved" | "flagged";
  product_id: string;
  name: string;
  rating: number;
  content: string;
  order_id: string | null;
  order_line_item_id: string | null;
  created_at: string;
  updated_at: string;
  response: {
    id: string;
    content: string;
    created_at: string;
    updated_at: string;
  } | null;
  images: {
    id: string;
    url: string;
    created_at: string;
    updated_at: string;
  }[];
};
export type StoreProductReviewsResponse = {
  product_reviews: StoreProductReview[];
  count: number;
  offset: number;
  limit: number;
};

export type StoreProductReviewsQuery = {
  order_id?: string | string[];
  status?:
    | "pending"
    | "approved"
    | "flagged"
    | Array<"pending" | "approved" | "flagged">;
  rating?: number | number[];
  product_id?: string | string[];
  offset?: number;
  limit?: number;
};

/**
 * Helper to build query parameters for API requests
 */
const buildQueryParams = (
  query?: StoreProductReviewsQuery,
): Record<string, string> => {
  if (!query) return {};

  const params: Record<string, string> = {};

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      // For arrays, use the format: key[]=value1&key[]=value2
      value.forEach((v) => {
        const arrayKey = `${key}[]`;
        if (params[arrayKey]) {
          params[arrayKey] += `&${arrayKey}=${encodeURIComponent(String(v))}`;
        } else {
          params[arrayKey] = `${arrayKey}=${encodeURIComponent(String(v))}`;
        }
      });
    } else {
      params[key] = encodeURIComponent(String(value));
    }
  });

  return params;
};

/**
 * Get product reviews for a specific product
 * Public endpoint - no authentication required
 */
export const getProductReviews = async ({
  productId,
  query,
}: {
  productId: string;
  query?: StoreProductReviewsQuery;
}) => {
  const queryParams = new URLSearchParams({
    product_id: productId,
    ...buildQueryParams(query),
  });

  const url = `/store/product-reviews?${queryParams.toString()}`;
  return await sdk.client.fetch<StoreProductReviewsResponse>(url);
};

export type StoreProductReviewStats = {
  average_rating: number;
  review_count: number;
  rating_distribution: Record<string, number>;
};

export type StoreProductReviewStatsResponse = {
  product_review_stats: StoreProductReviewStats;
  count: number;
  offset: number;
  limit: number;
};

/**
 * Get product review statistics for a specific product
 * Public endpoint - no authentication required
 */
export const getProductReviewStats = async (productId: string) => {
  const url = `/store/product-review-stats?product_id=${encodeURIComponent(productId)}`;
  return await sdk.client.fetch<StoreProductReviewStatsResponse>(url);
};

/**
 * Verify if the current authenticated user has purchased a specific product
 * Returns order_id and order_line_item_id if found, null otherwise
 */
export const verifyUserPurchasedProduct = async (
  productId: string,
): Promise<{
  hasPurchased: boolean;
  orderId?: string;
  orderLineItemId?: string;
} | null> => {
  try {
    const headers = await getAuthHeaders();

    // User must be authenticated
    if (!headers || !("authorization" in headers)) {
      return null;
    }

    // Fetch user's orders with items included
    const response = await sdk.store.order.list(
      {
        fields: "*items, *items.product",
      },
      headers,
    );

    const { orders } = response;

    // Search through orders to find one containing this product
    for (const order of orders) {
      const lineItem = order.items?.find(
        (item) => item.product_id === productId,
      );

      if (lineItem) {
        return {
          hasPurchased: true,
          orderId: order.id,
          orderLineItemId: lineItem.id,
        };
      }
    }

    // No purchase found
    return {
      hasPurchased: false,
    };
  } catch (error) {
    console.error("Error verifying product purchase:", error);
    return null;
  }
};

export type SubmitReviewData = {
  rating: number;
  comment: string;
};

export type SubmitReviewResponse = {
  success: boolean;
  error?: string;
  review?: StoreProductReview;
};

/**
 * Submit a product review
 * Requires the user to have purchased the product
 */
export const submitReview = async ({
  productId,
  data,
}: {
  productId: string;
  data: SubmitReviewData;
}): Promise<SubmitReviewResponse> => {
  try {
    const headers = await getAuthHeaders();

    // Check authentication
    if (!headers || !("authorization" in headers)) {
      return {
        success: false,
        error: "You must be logged in to write a review",
      };
    }

    // Verify purchase
    const verification = await verifyUserPurchasedProduct(productId);

    if (!verification) {
      return {
        success: false,
        error: "Unable to verify purchase. Please try again later.",
      };
    }

    if (!verification.hasPurchased) {
      return {
        success: false,
        error: "You must purchase this product before you can review it",
      };
    }

    // Submit review using the plugin's API
    const response = await sdk.client.fetch<StoreProductReviewsResponse>(
      `/store/product-reviews`,
      {
        method: "POST",
        headers,
        body: {
          reviews: [
            {
              order_id: verification.orderId,
              order_line_item_id: verification.orderLineItemId,
              rating: data.rating,
              content: data.comment,
              images: [], // Empty for now, can be extended later
            },
          ],
        },
      },
    );

    return {
      success: true,
      review: response.product_reviews[0],
    };
  } catch (error: any) {
    console.error("Error submitting review:", error);
    return {
      success: false,
      error: error?.message || "Failed to submit review. Please try again.",
    };
  }
};
