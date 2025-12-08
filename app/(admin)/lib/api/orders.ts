"use server";

import { sdk } from "@/app/lib/medusa/config";
import { getAuthHeaders } from "./auth";

export const listOrders = async (query?: any) => {
  const headers = await getAuthHeaders();
  const limit = query?.limit || 20;
  const offset = query?.offset ?? 0;

  return await sdk.admin.order.list({ ...query, offset, limit }, headers);
};
