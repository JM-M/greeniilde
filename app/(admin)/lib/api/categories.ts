"use server";

import { sdk } from "@/app/lib/medusa/config";
import { HttpTypes } from "@medusajs/types";
import { getAuthHeaders } from "./auth";

export const listCategories = async (
  query?: HttpTypes.AdminProductCategoryListParams,
) => {
  const headers = await getAuthHeaders();
  return await sdk.admin.productCategory.list(query, headers);
};

export const deleteCategory = async (categoryId: string) => {
  const headers = await getAuthHeaders();
  return await sdk.admin.productCategory.delete(categoryId, headers);
};

export const batchDeleteCategories = async (categoryIds: string[]) => {
  const headers = await getAuthHeaders();
  // Medusa doesn't have a batch delete for categories, so delete one by one
  const results = await Promise.all(
    categoryIds.map((id) => sdk.admin.productCategory.delete(id, headers)),
  );
  return { deleted: results };
};
