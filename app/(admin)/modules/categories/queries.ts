import { getCategory, listCategories } from "@/app/(admin)/lib/api/categories";
import { createQuery } from "@/app/lib/query/create-query";
import { HttpTypes } from "@medusajs/types";

const listCategoriesQuery = createQuery(listCategories, [
  "categories",
  "listCategories",
]);

const getCategoryQuery = createQuery(
  async ({ id, query }: { id: string; query?: HttpTypes.SelectParams }) =>
    getCategory(id, query),
  ["categories", "getCategory"],
);

export const categoryQueries = {
  listCategories: listCategoriesQuery,
  getCategory: getCategoryQuery,
} as const;
