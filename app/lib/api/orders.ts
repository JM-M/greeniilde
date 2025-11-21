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
          "*items, *items.variant, *items.product, *shipping_address, *billing_address, *shipping_methods, *payment_collections, *payment_collections.payment_sessions, *fulfillments",
      },
      headers,
    )
    .then(({ order }) => order)
    .catch((err) => {
      console.error(err);
      return null;
    });
}

export async function listOrders(limit: number = 10, offset: number = 0) {
  const headers = await getAuthHeaders();

  return sdk.store.order
    .list(
      {
        limit,
        offset,
        fields:
          "*items, *items.variant, *items.product, *shipping_address, *billing_address, *shipping_methods, *payment_collections, *payment_collections.payment_sessions",
      },
      headers,
    )
    .then(({ orders, count, offset, limit }) => ({
      orders,
      count,
      offset,
      limit,
    }))
    .catch((err) => {
      console.error(err);
      return null;
    });
}
