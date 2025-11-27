"use client";

import { Separator } from "@/app/components/ui/separator";
import {
  AddressesForm,
  AddressesFormSkeleton,
} from "@/app/modules/checkout/ui/components/addresses-form";
import {
  CompactPaymentSummary,
  CompactPaymentSummarySkeleton,
} from "@/app/modules/checkout/ui/components/compact-payment-summary";
import {
  DeliveryMethods,
  DeliveryMethodsSkeleton,
} from "@/app/modules/checkout/ui/components/delivery-methods";
import {
  OrderSummary,
  OrderSummarySkeleton,
} from "@/app/modules/checkout/ui/components/order-summary";
import { PaymentSectionSkeleton } from "@/app/modules/checkout/ui/components/payment-section";
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
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
  const [isSettingShippingMethod, setIsSettingShippingMethod] = useState(false);

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
              isUpdatingAddress={isUpdatingAddress}
              setIsUpdatingAddress={setIsUpdatingAddress}
            />
          </div>

          <Separator />

          {/* Delivery Methods Section */}
          <div>
            <DeliveryMethods
              isShippingAddressValid={isShippingAddressValid}
              onMethodSelected={setIsShippingMethodSelected}
              cartId={cartId}
              isUpdatingAddress={isUpdatingAddress}
              isSettingShippingMethod={isSettingShippingMethod}
              setIsSettingShippingMethod={setIsSettingShippingMethod}
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="sticky top-17 space-y-4">
          <div className="space-y-6 rounded-lg border p-4">
            <OrderSummary cartId={cartId} />
            <Separator />
            <CompactPaymentSummary
              isShippingAddressValid={isShippingAddressValid}
              isShippingMethodSelected={isShippingMethodSelected}
              cartId={cartId}
              isUpdatingAddress={isUpdatingAddress}
              isSettingShippingMethod={isSettingShippingMethod}
            />
          </div>

          <div className="mt-4">
            <PaymentSection
              cartId={cartId}
              isShippingAddressValid={isShippingAddressValid}
              isShippingMethodSelected={isShippingMethodSelected}
              isUpdatingAddress={isUpdatingAddress}
              isSettingShippingMethod={isSettingShippingMethod}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SinglePageCheckoutSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="space-y-8">
          {/* Shipping Address Section */}
          <div>
            <AddressesFormSkeleton />
          </div>

          <Separator />

          {/* Delivery Methods Section */}
          <div>
            <DeliveryMethodsSkeleton />
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="sticky top-17 space-y-4">
          <div className="space-y-6 rounded-lg border p-4">
            <OrderSummarySkeleton />
            <Separator />
            <CompactPaymentSummarySkeleton />
          </div>

          <div className="mt-4">
            <PaymentSectionSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};
