import { setAddresses } from "@/app/lib/api/cart";
import { createMutationAction } from "@/app/lib/query/create-query";

// Create mutation utilities
const setCartAddressesMutation = createMutationAction(setAddresses, [
  "cart",
  "setAddresses",
]);

// Export mutation utilities for easy access to mutation keys
// Usage: cartMutations.setCartAddresses.mutationKey()
export const cartMutations = {
  setCartAddresses: setCartAddressesMutation,
} as const;
