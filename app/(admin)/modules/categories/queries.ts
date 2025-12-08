import { getCategory, listCategories } from "@/app/(admin)/lib/api/categories";
import { createQuery } from "@/app/lib/query/create-query";

const listCategoriesQuery = createQuery(listCategories, [
  "categories",
  "listCategories",
]);

const getCategoryQuery = createQuery(getCategory, [
  "categories",
  "getCategory",
]);

export const categoryQueries = {
  listCategories: listCategoriesQuery,
  getCategory: getCategoryQuery,
} as const;
