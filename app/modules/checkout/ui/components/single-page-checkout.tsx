"use client";

import { CartEmpty } from "@/app/components/shared/cart-empty";
import { Separator } from "@/app/components/ui/separator";
import { useRetrieveCart } from "@/app/modules/cart/hooks/use-cart-queries";
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

const PaymentSectionSkeleton = dynamic(
  () =>
    import("@/app/modules/checkout/ui/components/payment-section").then(
      (mod) => mod.PaymentSectionSkeleton,
    ),
  { ssr: false },
);

interface SinglePageCheckoutProps {
  cartId?: string;
  onPaystackOpen?: () => void;
  onPaystackSettled?: () => void;
}

export const SinglePageCheckout = ({
  cartId,
  onPaystackOpen,
  onPaystackSettled,
}: SinglePageCheckoutProps) => {
  const [isShippingAddressValid, setShippingAddressValid] = useState(false);
  const [isShippingMethodSelected, setIsShippingMethodSelected] =
    useState(false);
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
  const [isSettingShippingMethod, setIsSettingShippingMethod] = useState(false);

  const { numCartItems, isLoading } = useRetrieveCart({ cartId });

  if (isLoading) return <SinglePageCheckoutSkeleton />;

  if (!numCartItems) {
    return <CartEmpty />;
  }

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
              onPaystackOpen={onPaystackOpen}
              onPaystackSettled={onPaystackSettled}
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
