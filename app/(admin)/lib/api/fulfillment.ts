"use server";

import { sdk } from "@/app/lib/medusa/config";
import { HttpTypes } from "@medusajs/types";
import { getAuthHeaders } from "./auth";

/**
 * Create a fulfillment for an order
 */
export const createFulfillment = async ({
  orderId,
  payload,
}: {
  orderId: string;
  payload: HttpTypes.AdminCreateOrderFulfillment;
}) => {
  const headers = await getAuthHeaders();
  return await sdk.admin.order.createFulfillment(orderId, payload, {}, headers);
};

/**
 * Create a shipment for a fulfillment (marks as shipped)
 */
export const createShipment = async ({
  orderId,
  fulfillmentId,
  payload,
}: {
  orderId: string;
  fulfillmentId: string;
  payload?: HttpTypes.AdminCreateOrderShipment;
}) => {
  const headers = await getAuthHeaders();
  return await sdk.admin.order.createShipment(
    orderId,
    fulfillmentId,
    payload || { items: [] },
    {},
    headers,
  );
};

/**
 * Mark a fulfillment as delivered
 */
export const markAsDelivered = async ({
  orderId,
  fulfillmentId,
}: {
  orderId: string;
  fulfillmentId: string;
}) => {
  const headers = await getAuthHeaders();
  return await sdk.admin.order.markAsDelivered(
    orderId,
    fulfillmentId,
    {},
    headers,
  );
};
