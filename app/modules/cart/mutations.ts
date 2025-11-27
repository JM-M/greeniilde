import { setAddresses, setShippingMethod } from "@/app/lib/api/cart";
import { createMutationAction } from "@/app/lib/query/create-query";

// Create mutation utilities
const setCartAddressesMutation = createMutationAction(setAddresses, [
  "cart",
  "setAddresses",
]);

const setCartShippingMethodMutation = createMutationAction(setShippingMethod, [
  "cart",
  "setShippingMethod",
]);

// Export mutation utilities for easy access to mutation keys
// Usage: cartMutations.setCartAddresses.mutationKey()
export const cartMutations = {
  setCartAddresses: setCartAddressesMutation,
  setCartShippingMethod: setCartShippingMethodMutation,
} as const;
