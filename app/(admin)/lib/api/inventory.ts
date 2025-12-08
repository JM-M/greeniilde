"use server";

import { sdk } from "@/app/lib/medusa/config";
import { HttpTypes } from "@medusajs/types";
import { getAuthHeaders } from "./auth";

export const batchInventoryItemsLocationLevels = async (
  body: HttpTypes.AdminBatchInventoryItemsLocationLevels,
) => {
  const headers = await getAuthHeaders();
  return await sdk.admin.inventoryItem.batchInventoryItemsLocationLevels(
    body,
    headers,
  );
};
