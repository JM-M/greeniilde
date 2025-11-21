"use server";

import { sdk } from "../medusa/config";
import { getAuthHeaders } from "./auth";

export async function retrieveOrder(id: string) {
  const headers = await getAuthHeaders();

  return sdk.store.order
    .retrieve(
      id,
      {
        fields:
          "*items, *items.variant, *items.product, *shipping_address, *billing_address, *shipping_methods, *payment_collections, *payment_collections.payment_sessions",
      },
      headers,
    )
    .then(({ order }) => order)
    .catch((err) => {
      console.error(err);
      return null;
    });
}
