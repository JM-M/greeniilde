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

export const getCategory = async (
  categoryId: string,
  query?: HttpTypes.SelectParams,
) => {
  const headers = await getAuthHeaders();
  return await sdk.admin.productCategory.retrieve(categoryId, query, headers);
};

export const createCategory = async (
  category: HttpTypes.AdminCreateProductCategory,
) => {
  const headers = await getAuthHeaders();
  return await sdk.admin.productCategory.create(category, undefined, headers);
};

export const updateCategory = async ({
  categoryId,
  updates,
}: {
  categoryId: string;
  updates: HttpTypes.AdminUpdateProductCategory;
}) => {
  const headers = await getAuthHeaders();
  return await sdk.admin.productCategory.update(
    categoryId,
    updates,
    undefined,
    headers,
  );
};

export const deleteCategory = async (categoryId: string) => {
  const headers = await getAuthHeaders();
  return await sdk.admin.productCategory.delete(categoryId, headers);
};

export const updateCategoryProducts = async ({
  categoryId,
  updates,
}: {
  categoryId: string;
  updates: HttpTypes.AdminUpdateProductCategoryProducts;
}) => {
  const headers = await getAuthHeaders();
  return await sdk.admin.productCategory.updateProducts(
    categoryId,
    updates,
    undefined,
    headers,
  );
};

export const batchDeleteCategories = async (categoryIds: string[]) => {
  const headers = await getAuthHeaders();
  // Medusa doesn't have a batch delete for categories, so delete one by one
  const results = await Promise.all(
    categoryIds.map((id) => sdk.admin.productCategory.delete(id, headers)),
  );
  return { deleted: results };
};
