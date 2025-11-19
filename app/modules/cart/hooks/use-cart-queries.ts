"use client";

import { retrieveCart, type RetrieveCartParams } from "@/app/lib/api/cart";
import { HttpTypes } from "@medusajs/types";
import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { cartQueries } from "../queries";

/**
 * Hook to retrieve cart data using Suspense
 * @param params - Cart retrieval parameters
 * @param options - React Query options
 */
export const useSuspenseRetrieveCart = (
  params?: RetrieveCartParams,
  options?: Omit<
    UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof retrieveCart>>,
      Error
    >,
    "queryKey" | "queryFn"
  >,
) => {
  const { data: cart, ...rest } = useSuspenseQuery(
    cartQueries.retrieveCart.queryOptions(params, options),
  );

  // Calculate derived values
  const numCartItems =
    cart?.items?.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0) || 0;

  return {
    cart,
    numCartItems,
    items: cart?.items || [],
    subtotal: cart?.subtotal || 0,
    total: cart?.total || 0,
    tax_total: cart?.tax_total || 0,
    shipping_total: cart?.shipping_total || 0,
    discount_total: cart?.discount_total || 0,
    ...rest,
  };
};

// Re-export cartQueries for convenience
export { cartQueries } from "../queries";
