"use server";

import { sdk } from "@/app/lib/medusa/config";
import { getAuthHeaders } from "./auth";

/**
 * Capture a payment
 * @param paymentId - The payment ID to capture
 */
export const capturePayment = async (paymentId: string) => {
  const headers = await getAuthHeaders();
  return await sdk.admin.payment.capture(paymentId, {}, {}, headers);
};
