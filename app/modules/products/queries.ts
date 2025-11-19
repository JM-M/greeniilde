import {
  getProductReviews,
  getProductReviewStats,
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
import {
  createQueryAction,
  createSuspenseQueryAction,
} from "@/app/lib/query/create-query-action";

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

const getProductsFromMeilisearchQueryNonSuspense = createQueryAction(
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

const getProductReviewsQuery = createSuspenseQueryAction(getProductReviews, [
  "products",
  "getProductReviews",
]);

const getProductReviewStatsQuery = createSuspenseQueryAction(
  getProductReviewStats,
  ["products", "getProductReviewStats"],
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
} as const;
