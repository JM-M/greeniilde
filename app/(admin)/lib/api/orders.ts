"use server";

import { sdk } from "@/app/lib/medusa/config";
import { HttpTypes } from "@medusajs/types";
import { getAuthHeaders } from "./auth";

export const listOrders = async (query?: HttpTypes.AdminOrderFilters) => {
  const headers = await getAuthHeaders();
  const limit = query?.limit || 20;
  const offset = query?.offset ?? 0;

  return await sdk.admin.order.list({ ...query, offset, limit }, headers);
};

export const getOrder = async ({
  id,
  query,
}: {
  id: string;
  query?: Record<string, any>;
}) => {
  const headers = await getAuthHeaders();
  return await sdk.admin.order.retrieve(id, query || {}, headers);
};

export const listOrderChanges = async (orderId: string) => {
  const headers = await getAuthHeaders();
  return await sdk.admin.order.listChanges(orderId, {}, headers);
};
