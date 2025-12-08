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
