"use server";

import { sdk } from "@/app/lib/medusa/config";
import { getAuthHeaders } from "./auth";

/**
 * List stock locations
 */
export const listStockLocations = async () => {
  const headers = await getAuthHeaders();
  return await sdk.admin.stockLocation.list({}, headers);
};
