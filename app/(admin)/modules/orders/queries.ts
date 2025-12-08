import {
  getOrder,
  listOrderChanges,
  listOrders,
} from "@/app/(admin)/lib/api/orders";
import { createQuery } from "@/app/lib/query/create-query";

const listOrdersQuery = createQuery(listOrders, ["orders", "listOrders"]);
const getOrderQuery = createQuery(getOrder, ["orders", "getOrder"]);
const listOrderChangesQuery = createQuery(listOrderChanges, [
  "orders",
  "listOrderChanges",
]);

export const orderQueries = {
  listOrders: listOrdersQuery,
  getOrder: getOrderQuery,
  listOrderChanges: listOrderChangesQuery,
} as const;
