"use client";

import { Button } from "@/app/components/ui/button";
import { CompactPaymentSummary } from "./compact-payment-summary";
import { DeliveryMethodSelected } from "./delivery-method-selected";
import { OrderSummary } from "./order-summary";

const ReviewAndPaymentStep = () => {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mx-auto w-full max-w-2xl rounded-lg border p-4">
        <OrderSummary />
        <div className="mt-4">
          <DeliveryMethodSelected method="standard" />
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
