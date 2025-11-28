import {
  getProductReviews,
  getProductReviewStats,
  verifyUserPurchasedProduct,
} from "@/app/lib/api/product-reviews";
import {
  getFacetDistributions,
  getFilterableAttributes,
  getProduct,
  getProductHits,
  getProductsFromMeilisearch,
  listProducts,
  searchProducts,
} from "@/app/lib/api/products";
import { createQuery, createSuspenseQuery } from "@/app/lib/query/create-query";

// Create query utilities
const listProductsQuery = createSuspenseQuery(listProducts, [
  "products",
  "listProducts",
]);

const getProductQuery = createSuspenseQuery(getProduct, [
  "products",
  "getProduct",
]);

const searchProductsQuery = createSuspenseQuery(searchProducts, [
  "products",
  "searchProducts",
]);

const getProductHitsQuery = createSuspenseQuery(getProductHits, [
  "products",
  "getProductHits",
]);

const getProductsFromMeilisearchQuery = createSuspenseQuery(
  getProductsFromMeilisearch,
  ["products", "getProductsFromMeilisearch"],
);

const getProductsFromMeilisearchQueryNonSuspense = createQuery(
  getProductsFromMeilisearch,
  ["products", "getProductsFromMeilisearch"],
);

const getFilterableAttributesQuery = createSuspenseQuery(
  getFilterableAttributes,
  ["products", "getFilterableAttributes"],
);

const getFacetDistributionsQuery = createSuspenseQuery(getFacetDistributions, [
  "products",
  "getFacetDistributions",
]);

const getProductReviewsQuery = createSuspenseQuery(getProductReviews, [
  "products",
  "getProductReviews",
]);

const getProductReviewStatsQuery = createSuspenseQuery(getProductReviewStats, [
  "products",
  "getProductReviewStats",
]);

const verifyUserPurchasedProductQuery = createQuery(
  verifyUserPurchasedProduct,
  ["products", "verifyUserPurchasedProduct"],
);

// Export query utilities for easy access to query keys
// Usage: productQueries.listProducts.queryKey(query)
export const productQueries = {
  listProducts: listProductsQuery,
  getProduct: getProductQuery,
  searchProducts: searchProductsQuery,
  getProductHits: getProductHitsQuery,
  getProductsFromMeilisearch: getProductsFromMeilisearchQuery,
  getProductsFromMeilisearchNonSuspense:
    getProductsFromMeilisearchQueryNonSuspense,
  getFilterableAttributes: getFilterableAttributesQuery,
  getFacetDistributions: getFacetDistributionsQuery,
  getProductReviews: getProductReviewsQuery,
  getProductReviewStats: getProductReviewStatsQuery,
  verifyUserPurchasedProduct: verifyUserPurchasedProductQuery,
} as const;
