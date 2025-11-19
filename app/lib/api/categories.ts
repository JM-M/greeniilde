"use server";

import { HttpTypes } from "@medusajs/types";
import { sdk } from "../medusa/config";

/**
 * List product categories from the store
 * Public endpoint - no authentication required
 */
export const listCategories = async (
  query?: HttpTypes.StoreProductCategoryListParams,
) => {
  return await sdk.store.category.list(query);
};

/**
 * Get a single product category by ID
 * Public endpoint - no authentication required
 */
export const getCategory = async ({
  categoryId,
  query,
}: {
  categoryId: string;
  query?: HttpTypes.StoreProductCategoryParams;
}) => {
  return await sdk.store.category.retrieve(categoryId, query);
};
