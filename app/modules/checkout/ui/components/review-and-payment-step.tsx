"use client";

import { Button } from "@/app/components/ui/button";
import {
  useInitiatePaymentSession,
  usePlaceOrder,
} from "@/app/modules/cart/hooks/use-cart-mutations";
import { useSuspenseRetrieveCart } from "@/app/modules/cart/hooks/use-cart-queries";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import { CompactPaymentSummary } from "./compact-payment-summary";
import { DeliveryMethodSelected } from "./delivery-method-selected";
import { OrderSummary } from "./order-summary";

const ReviewAndPaymentStep = () => {
  const { cart } = useSuspenseRetrieveCart();
  const { mutateAsync: placeOrder, isPending: isPlacingOrder } =
    usePlaceOrder();
  const {
    mutateAsync: initiatePaymentSession,
    isPending: isInitiatingPayment,
  } = useInitiatePaymentSession();
  const router = useRouter();

  const terminalRate = cart?.shipping_methods?.[0]?.data?.terminal_rate as
    | {
        carrier_name: string;
        delivery_time: string;
        amount: number;
        currency: string;
      }
    | undefined;

  useEffect(() => {
    if (cart?.id && !cart?.payment_collection?.payment_sessions?.length) {
      initiatePaymentSession({
        cart,
        data: {
          provider_id: "pp_paystack_paystack",
          data: {
            email: cart.email,
          },
        },
      }).catch((err) => {
        console.error("Error initiating payment session:", err);
      });
    }
  }, [cart?.id, cart?.payment_collection, initiatePaymentSession, cart]);

  // Get Paystack session data
  const paystackSession = cart?.payment_collection?.payment_sessions?.find(
    (s) => s.provider_id === "pp_paystack_paystack",
  );

  const config = {
    reference: (paystackSession?.data?.reference as string) || "",
    email: cart?.email || "",
    amount: paystackSession?.amount ? paystackSession.amount * 100 : 0, // Paystack expects kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    accessCode: (paystackSession?.data?.access_code as string) || "",
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = async () => {
    try {
      await placeOrder(cart?.id);
      router.push(`/order/confirmed/${cart?.id}`);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const onClose = () => {
    console.log("Payment closed");
  };

  const handlePayment = () => {
    if (!paystackSession) {
      console.error("No Paystack session found");
      return;
    }
    initializePayment({ onSuccess, onClose });
  };

  const isLoading = isPlacingOrder || isInitiatingPayment;

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mx-auto w-full max-w-2xl rounded-lg border p-4">
        <OrderSummary />
        <div className="mt-4">
          {terminalRate && (
            <DeliveryMethodSelected
              rate={{
                carrier_name: terminalRate.carrier_name,
                delivery_time: terminalRate.delivery_time,
                amount: terminalRate.amount,
                currency_code: terminalRate.currency,
              }}
            />
          )}
        </div>
        <div className="mt-4">
          <CompactPaymentSummary />
        </div>
        <div className="mt-4">
          <Button
            className="w-full"
            onClick={handlePayment}
            disabled={!paystackSession || isLoading}
          >
            {isLoading ? "Processing..." : "Pay with Paystack"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndPaymentStep;
