"use client";

import { Button } from "@/app/components/ui/button";
import { Spinner } from "@/app/components/ui/spinner";
import {
  useInitiatePaymentSession,
  usePlaceOrder,
} from "@/app/modules/cart/hooks/use-cart-mutations";
import { useRetrieveCart } from "@/app/modules/cart/hooks/use-cart-queries";
import { useEffect } from "react";
import { usePaystackPayment } from "react-paystack";

export const PaymentSection = ({
  cartId,
  isShippingAddressValid,
  isShippingMethodSelected,
  isUpdatingAddress,
  isSettingShippingMethod,
  onPaystackOpen,
  onPaystackSettled,
}: {
  cartId?: string;
  isShippingAddressValid: boolean;
  isShippingMethodSelected: boolean;
  isUpdatingAddress: boolean;
  isSettingShippingMethod: boolean;
  onPaystackOpen?: () => void;
  onPaystackSettled?: () => void;
}) => {
  const { cart, isLoading: isRetrievingCart } = useRetrieveCart({ cartId });
  const { mutate: placeOrder, isPending: isPlacingOrder } = usePlaceOrder();
  const { mutate: initiatePaymentSession, isPending: isInitiatingPayment } =
    useInitiatePaymentSession();

  useEffect(() => {
    if (
      cart?.id &&
      !cart?.payment_collection?.payment_sessions?.length &&
      cart.email &&
      isShippingAddressValid &&
      isShippingMethodSelected
    ) {
      initiatePaymentSession(
        {
          cart,
          data: {
            provider_id: "pp_paystack_paystack",
            data: {
              email: cart.email,
            },
          },
        },
        {
          onError: (err) => {
            console.error("Error initiating payment session:", err);
          },
        },
      );
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

  const onSuccess = () => {
    onPaystackSettled?.();
    placeOrder(cart?.id, {
      onSuccess: (data) => {
        if (data.type === "order" && data.order) {
          // const orderId = data.order.id;
          // window.location.href = `/checkout/confirmation?orderId=${orderId}`;
        }
      },
    });
  };

  const onClose = () => {
    onPaystackSettled?.();
  };

  const handlePayment = () => {
    if (!paystackSession) {
      console.error("No Paystack session found");
      return;
    }
    onPaystackOpen?.();
    initializePayment({ onSuccess, onClose });
  };

  const isLoading =
    isPlacingOrder ||
    isInitiatingPayment ||
    !paystackSession ||
    isRetrievingCart;

  const isCartUnready =
    !isShippingAddressValid ||
    !isShippingMethodSelected ||
    isUpdatingAddress ||
    isSettingShippingMethod;

  const isPaymentDisabled = isLoading || isCartUnready;

  return (
    <div className="mt-4">
      <Button
        className="h-12 w-full"
        onClick={handlePayment}
        disabled={isPaymentDisabled}
      >
        {isLoading && !isCartUnready ? (
          <>
            <Spinner />
            Please wait...
          </>
        ) : (
          "Pay with Paystack"
        )}
      </Button>
    </div>
  );
};

export const PaymentSectionSkeleton = () => {
  return (
    <div className="mt-4">
      <div className="bg-accent h-12 w-full animate-pulse rounded-md" />
    </div>
  );
};
