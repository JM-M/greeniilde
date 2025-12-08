import { getProduct, listProducts } from "@/app/(admin)/lib/api/products";
import { createQuery } from "@/app/lib/query/create-query";

const listProductsQuery = createQuery(listProducts, [
  "products",
  "listProducts",
]);

const getProductQuery = createQuery(getProduct, ["products", "getProduct"]);

export const productQueries = {
  listProducts: listProductsQuery,
  getProduct: getProductQuery,
} as const;
