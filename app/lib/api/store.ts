"use server";

import { HttpTypes } from "@medusajs/types";
import { sdk } from "../medusa/config";

export interface StoreConfig {
  name: string;
  supported_currencies?: HttpTypes.StoreCurrency[] | undefined;
  default_sales_channel_id?: string;
  default_region_id?: string;
  default_location_id?: string;
  metadata: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export async function getStoreConfig() {
  const headers = {
    "x-store-id": process.env.STORE_ID!,
  };

  return sdk.client.fetch<StoreConfig>("/store/config", {
    method: "GET",
    headers,
  });
}
