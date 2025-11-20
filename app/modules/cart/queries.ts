import { listCartShippingOptions, retrieveCart } from "@/app/lib/api/cart";
import { createSuspenseQueryAction } from "@/app/lib/query/create-query-action";

// Create query utilities
const retrieveCartQuery = createSuspenseQueryAction(retrieveCart, [
  "cart",
  "retrieveCart",
]);

const listCartShippingOptionsQuery = createSuspenseQueryAction(
  listCartShippingOptions,
  ["cart", "listCartShippingOptions"],
);

// Export query utilities for easy access to query keys
// Usage: cartQueries.retrieveCart.queryKey(params)
export const cartQueries = {
  retrieveCart: retrieveCartQuery,
  listCartShippingOptions: listCartShippingOptionsQuery,
} as const;
