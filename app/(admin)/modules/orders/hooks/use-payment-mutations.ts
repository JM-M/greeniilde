"use client";

import { capturePayment } from "@/app/(admin)/lib/api/payments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderQueries } from "../queries";

/**
 * Hook to capture a payment
 */
export const useCapturePayment = (orderId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: capturePayment,
    onSuccess: () => {
      // Invalidate the order query to refresh payment data
      queryClient.invalidateQueries({
        queryKey: orderQueries.getOrder.queryKey({ id: orderId }),
      });
    },
  });
};
