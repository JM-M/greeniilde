"use client";

import { Separator } from "@/app/components/ui/separator";
import { AddressesForm } from "@/app/modules/checkout/ui/components/addresses-form";
import { CompactPaymentSummary } from "@/app/modules/checkout/ui/components/compact-payment-summary";
import { DeliveryMethods } from "@/app/modules/checkout/ui/components/delivery-methods";
import { OrderSummary } from "@/app/modules/checkout/ui/components/order-summary";
import dynamic from "next/dynamic";
import { useState } from "react";

// TODO: Make this work so that all components work in close sync with each other. E.g. a single endpoint to update cart addresses and get the rates.

const PaymentSection = dynamic(
  () =>
    import("@/app/modules/checkout/ui/components/payment-section").then(
      (mod) => mod.PaymentSection,
    ),
  { ssr: false },
);

export const SinglePageCheckout = ({ cartId }: { cartId?: string }) => {
  const [isShippingAddressValid, setShippingAddressValid] = useState(true);
  const [isShippingMethodSelected, setIsShippingMethodSelected] =
    useState(false);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="space-y-8">
          {/* Shipping Address Section */}
          <div>
            <AddressesForm
              submitButtonLabel="Save Address"
              autoSubmit={true}
              onValidityChange={setShippingAddressValid}
              cartId={cartId}
            />
          </div>

          <Separator />

          {/* Delivery Methods Section */}
          <div>
            <DeliveryMethods
              isShippingAddressValid={isShippingAddressValid}
              onMethodSelected={setIsShippingMethodSelected}
              cartId={cartId}
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="sticky top-20 space-y-4">
          <div className="space-y-6 rounded-lg border p-4">
            <OrderSummary cartId={cartId} />
            <Separator />
            <CompactPaymentSummary
              isShippingAddressValid={isShippingAddressValid}
              isShippingMethodSelected={isShippingMethodSelected}
              cartId={cartId}
            />
          </div>

          <div className="mt-4">
            <PaymentSection cartId={cartId} />
          </div>
        </div>
      </div>
    </div>
  );
};
