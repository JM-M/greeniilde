"use client";

import {
  createFulfillment,
  createShipment,
  markAsDelivered,
} from "@/app/(admin)/lib/api/fulfillment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderQueries } from "../queries";

/**
 * Hook to create a fulfillment for an order
 */
export const useCreateFulfillment = (orderId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Parameters<typeof createFulfillment>[0]["payload"]) =>
      createFulfillment({ orderId, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orderQueries.getOrder.queryKey({ id: orderId }),
      });
    },
  });
};

/**
 * Hook to create a shipment (mark fulfillment as shipped)
 */
export const useCreateShipment = (orderId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (fulfillmentId: string) =>
      createShipment({ orderId, fulfillmentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orderQueries.getOrder.queryKey({ id: orderId }),
      });
    },
  });
};

/**
 * Hook to mark a fulfillment as delivered
 */
export const useMarkAsDelivered = (orderId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (fulfillmentId: string) =>
      markAsDelivered({ orderId, fulfillmentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orderQueries.getOrder.queryKey({ id: orderId }),
      });
    },
  });
};
