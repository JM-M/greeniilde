"use client";

import { Button } from "@/app/components/ui/button";
import { useCheckoutStepParams } from "../../hooks/use-checkout-step-param";
import { CompactPaymentSummary } from "./compact-payment-summary";
import { DeliveryMethods } from "./delivery-methods";

const DeliveryMethodStep = () => {
  const [_, setCheckoutStepParams] = useCheckoutStepParams();

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mx-auto w-full max-w-2xl rounded-lg border p-4">
        <DeliveryMethods />
        <div className="mt-4">
          <CompactPaymentSummary />
        </div>
        <div className="mt-4">
          <Button
            className="w-full"
            onClick={() => {
              setCheckoutStepParams({
                step: "review-and-payment",
              });
            }}
          >
            Proceed to Review & Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMethodStep;
