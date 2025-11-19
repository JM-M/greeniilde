import {
  getProduct,
  getProductHits,
  getProductsFromMeilisearch,
  listProducts,
  searchProducts,
} from "@/app/lib/api/products";
import { createSuspenseQueryAction } from "@/app/lib/query/create-query-action";

// Create query utilities
const listProductsQuery = createSuspenseQueryAction(listProducts, [
  "products",
  "listProducts",
]);

const getProductQuery = createSuspenseQueryAction(getProduct, [
  "products",
  "getProduct",
]);

const searchProductsQuery = createSuspenseQueryAction(searchProducts, [
  "products",
  "searchProducts",
]);

const getProductHitsQuery = createSuspenseQueryAction(getProductHits, [
  "products",
  "getProductHits",
]);

const getProductsFromMeilisearchQuery = createSuspenseQueryAction(getProductsFromMeilisearch, [
  "products",
  "getProductsFromMeilisearch",
]);

// Export query utilities for easy access to query keys
// Usage: productQueries.listProducts.queryKey(query)
export const productQueries = {
  listProducts: listProductsQuery,
  getProduct: getProductQuery,
  searchProducts: searchProductsQuery,
  getProductHits: getProductHitsQuery,
  getProductsFromMeilisearch: getProductsFromMeilisearchQuery,
} as const;
