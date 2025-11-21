"use client";

import { Button } from "@/app/components/ui/button";
import { useSuspenseRetrieveCart } from "@/app/modules/cart/hooks/use-cart-queries";
import { CompactPaymentSummary } from "./compact-payment-summary";
import { DeliveryMethodSelected } from "./delivery-method-selected";
import { OrderSummary } from "./order-summary";

const ReviewAndPaymentStep = () => {
  const { cart } = useSuspenseRetrieveCart();

  const terminalRate = cart?.shipping_methods?.[0]?.data?.terminal_rate as
    | {
        carrier_name: string;
        delivery_time: string;
        amount: number;
        currency: string;
      }
    | undefined;

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
          <Button className="w-full">Pay with Paystack</Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndPaymentStep;
