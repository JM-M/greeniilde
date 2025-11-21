import { listOrders, retrieveOrder } from "@/app/lib/api/orders";
import { createInfiniteQuery, createQuery } from "@/app/lib/query/create-query";

// Create query utilities
const retrieveOrderQuery = createQuery(retrieveOrder, [
  "orders",
  "retrieveOrder",
]);

const listOrdersQuery = createInfiniteQuery(
  async ({ limit }: { limit: number }, offset: number) => {
    return listOrders(limit, offset);
  },
  ["orders", "list"],
);

// Export query utilities for easy access to query keys
export const orderQueries = {
  retrieveOrder: retrieveOrderQuery,
  listOrders: listOrdersQuery,
} as const;
