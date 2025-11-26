// No longer in use. Replaced by single-page-checkout.tsx

"use client";

import { CHECKOUT_STEPS } from "@/app/modules/checkout/constants";
import { useCheckoutStepParams } from "@/app/modules/checkout/hooks/use-checkout-step-param";
import type { CheckoutStep } from "@/app/modules/checkout/types";
import * as React from "react";
import { Suspense } from "react";

import dynamic from "next/dynamic";

const ShippingStep = React.lazy(() => import("./shipping-step"));
const DeliveryMethodStep = React.lazy(() => import("./delivery-method-step"));
const ReviewAndPaymentStep = dynamic(
  () => import("./review-and-payment-step"),
  { ssr: false },
);

const STEP_COMPONENTS: Record<CheckoutStep, React.ComponentType> = {
  shipping: ShippingStep,
  "delivery-method": DeliveryMethodStep,
  "review-and-payment": ReviewAndPaymentStep,
};

export const CheckoutStepRouter = () => {
  const [{ step }] = useCheckoutStepParams();
  const Comp = STEP_COMPONENTS[step] ?? STEP_COMPONENTS[CHECKOUT_STEPS[0]];

  return (
    <Suspense
      fallback={<div className="text-muted-foreground text-sm">Loading…</div>}
    >
      <Comp />
    </Suspense>
  );
};
