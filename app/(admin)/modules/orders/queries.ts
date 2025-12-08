import { listOrders } from "@/app/(admin)/lib/api/orders";
import { createQuery } from "@/app/lib/query/create-query";

const listOrdersQuery = createQuery(listOrders, ["orders", "listOrders"]);

export const orderQueries = {
  listOrders: listOrdersQuery,
} as const;
