import { listCartShippingOptions, retrieveCart } from "@/app/lib/api/cart";
import { createQuery, createSuspenseQuery } from "@/app/lib/query/create-query";

// Create query utilities
const retrieveCartQuery = createSuspenseQuery(retrieveCart, [
  "cart",
  "retrieveCart",
]);

const listCartShippingOptionsQuery = createQuery(listCartShippingOptions, [
  "cart",
  "listCartShippingOptions",
]);

// Export query utilities for easy access to query keys
// Usage: cartQueries.retrieveCart.queryKey(params)
export const cartQueries = {
  retrieveCart: retrieveCartQuery,
  listCartShippingOptions: listCartShippingOptionsQuery,
} as const;
