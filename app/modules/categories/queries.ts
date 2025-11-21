import { getCategory, listCategories } from "@/app/lib/api/categories";
import { createSuspenseQuery } from "@/app/lib/query/create-query";

// Create query utilities
const listCategoriesQuery = createSuspenseQuery(listCategories, [
  "categories",
  "listCategories",
]);

const getCategoryQuery = createSuspenseQuery(getCategory, [
  "categories",
  "getCategory",
]);

// Export query utilities for easy access to query keys
// Usage: categoryQueries.listCategories.queryKey(query)
export const categoryQueries = {
  listCategories: listCategoriesQuery,
  getCategory: getCategoryQuery,
} as const;
