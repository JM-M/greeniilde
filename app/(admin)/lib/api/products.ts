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

export const getProduct = async (
  id: string,
  query?: HttpTypes.SelectParams,
) => {
  const headers = await getAuthHeaders();
  return await sdk.admin.product.retrieve(id, query, headers);
};

export const updateProduct = async ({
  productId,
  updates,
  query,
}: {
  productId: string;
  updates: HttpTypes.AdminUpdateProduct;
  query?: HttpTypes.SelectParams;
}) => {
  const headers = await getAuthHeaders();
  return await sdk.admin.product.update(productId, updates, query, headers);
};

export const createProduct = async ({
  product,
  query,
}: {
  product: HttpTypes.AdminCreateProduct;
  query?: HttpTypes.SelectParams;
}) => {
  const headers = await getAuthHeaders();
  return await sdk.admin.product.create(product, query, headers);
};

export const deleteProduct = async (productId: string) => {
  const headers = await getAuthHeaders();
  return await sdk.admin.product.delete(productId, headers);
};
