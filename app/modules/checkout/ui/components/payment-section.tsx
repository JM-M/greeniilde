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
import { toast } from "sonner";

export const PaymentSection = () => {
  const { cart } = useSuspenseRetrieveCart();
  const { mutateAsync: placeOrder, isPending: isPlacingOrder } =
    usePlaceOrder();
  const {
    mutateAsync: initiatePaymentSession,
    isPending: isInitiatingPayment,
  } = useInitiatePaymentSession();
  const router = useRouter();

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
      const data = await placeOrder(cart?.id);
      if (data.type === "order" && data.order) {
        const orderId = data.order.id;
        router.push(`/checkout/confirmation?orderId=${orderId}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
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
    <div className="mt-4">
      <Button
        className="h-12 w-full"
        onClick={handlePayment}
        disabled={!paystackSession || isLoading}
      >
        {isLoading ? "Processing..." : "Pay with Paystack"}
      </Button>
    </div>
  );
};
