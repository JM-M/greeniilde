import { listProducts } from "@/app/(admin)/lib/api/products";
import { createQuery } from "@/app/lib/query/create-query";

const listProductsQuery = createQuery(listProducts, [
  "products",
  "listProducts",
]);

export const productQueries = {
  listProducts: listProductsQuery,
} as const;
