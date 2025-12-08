import { listCategories } from "@/app/(admin)/lib/api/categories";
import { createQuery } from "@/app/lib/query/create-query";

const listCategoriesQuery = createQuery(listCategories, [
  "categories",
  "listCategories",
]);

export const categoryQueries = {
  listCategories: listCategoriesQuery,
} as const;
