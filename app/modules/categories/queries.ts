import {
  getCategory,
  listCategories,
} from "@/app/lib/api/categories";
import { createSuspenseQueryAction } from "@/app/lib/query/create-query-action";

// Create query utilities
const listCategoriesQuery = createSuspenseQueryAction(listCategories, [
  "categories",
  "listCategories",
]);

const getCategoryQuery = createSuspenseQueryAction(getCategory, [
  "categories",
  "getCategory",
]);

// Export query utilities for easy access to query keys
// Usage: categoryQueries.listCategories.queryKey(query)
export const categoryQueries = {
  listCategories: listCategoriesQuery,
  getCategory: getCategoryQuery,
} as const;
