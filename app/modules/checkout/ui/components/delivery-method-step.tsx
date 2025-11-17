"use client";

import { Button } from "@/app/components/ui/button";
import { CompactPaymentSummary } from "./compact-payment-summary";
import { DeliveryMethods } from "./delivery-methods";

const DeliveryMethodStep = () => {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mx-auto w-full max-w-xl rounded-lg border p-4">
        <DeliveryMethods />
        <div className="mt-4">
          <CompactPaymentSummary />
        </div>
        <div className="mt-4">
          <Button className="w-full">Proceed to Review & Payment</Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMethodStep;
