import { retrieveOrder } from "@/app/lib/api/orders";
import { createQueryAction } from "@/app/lib/query/create-query-action";

// Create query utilities
const retrieveOrderQuery = createQueryAction(retrieveOrder, [
  "orders",
  "retrieveOrder",
]);

// Export query utilities for easy access to query keys
export const orderQueries = {
  retrieveOrder: retrieveOrderQuery,
} as const;
