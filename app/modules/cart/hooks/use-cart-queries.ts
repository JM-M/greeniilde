"use client";

import { retrieveCart, type RetrieveCartParams } from "@/app/lib/api/cart";
import {
  useQuery,
  useSuspenseQuery,
  type UseQueryOptions,
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
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof retrieveCart>>, Error>,
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
    subtotal: cart?.item_subtotal || 0,
    total: cart?.total || 0, // TODO: Total should not exist if shipping method is not selected
    tax_total: cart?.tax_total || 0,
    shipping_total: cart?.shipping_total || 0,
    discount_total: cart?.discount_total || 0,
    ...rest,
  };
};

export const useRetrieveCart = (
  params?: RetrieveCartParams,
  options?: Omit<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof retrieveCart>>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  const { data: cart, ...rest } = useQuery(
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
    subtotal: cart?.item_subtotal || 0,
    total: cart?.total || 0, // TODO: Total should not exist if shipping method is not selected
    tax_total: cart?.tax_total || 0,
    shipping_total: cart?.shipping_total || 0,
    discount_total: cart?.discount_total || 0,
    ...rest,
  };
};

export const useListCartShippingMethodsQuery = (
  cartId: string,
  options?: Omit<
    UseQueryOptions<
      Awaited<
        ReturnType<typeof import("@/app/lib/api/cart").listCartShippingOptions>
      >,
      Error
    >,
    "queryKey" | "queryFn"
  >,
) => {
  const { data, ...rest } = useQuery(
    cartQueries.listCartShippingOptions.queryOptions(cartId, options),
  );

  return {
    data,
    ...rest,
  };
};

// Re-export cartQueries for convenience
export { cartQueries } from "../queries";
