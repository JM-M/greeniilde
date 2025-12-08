"use server";

import { sdk } from "@/app/lib/medusa/config";
import { HttpTypes } from "@medusajs/types";
import { getAuthHeaders } from "./auth";

export const listProducts = async (
  query?: HttpTypes.AdminProductListParams,
) => {
  const headers = await getAuthHeaders();
  return await sdk.admin.product.list(query, headers);
};
