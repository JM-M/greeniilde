import {
  getFacetDistributions,
  getFilterableAttributes,
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

const getProductsFromMeilisearchQuery = createSuspenseQueryAction(
  getProductsFromMeilisearch,
  ["products", "getProductsFromMeilisearch"],
);

const getFilterableAttributesQuery = createSuspenseQueryAction(
  getFilterableAttributes,
  ["products", "getFilterableAttributes"],
);

const getFacetDistributionsQuery = createSuspenseQueryAction(
  getFacetDistributions,
  ["products", "getFacetDistributions"],
);

// Export query utilities for easy access to query keys
// Usage: productQueries.listProducts.queryKey(query)
export const productQueries = {
  listProducts: listProductsQuery,
  getProduct: getProductQuery,
  searchProducts: searchProductsQuery,
  getProductHits: getProductHitsQuery,
  getProductsFromMeilisearch: getProductsFromMeilisearchQuery,
  getFilterableAttributes: getFilterableAttributesQuery,
  getFacetDistributions: getFacetDistributionsQuery,
} as const;
