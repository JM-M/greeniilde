"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import { CHECKOUT_STEPS } from "@/app/modules/checkout/constants";
import { useCheckoutStepParams } from "@/app/modules/checkout/hooks/use-checkout-step-param";
import * as React from "react";

const formatStepLabel = (step: (typeof CHECKOUT_STEPS)[number]) =>
  step.replace(/-/g, " ");

export const CheckoutStepsBreadcrumb = () => {
  const [{ step }, setParams] = useCheckoutStepParams();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {CHECKOUT_STEPS.map((s, i) => {
          const isCurrent = s === step;
          const isLast = i === CHECKOUT_STEPS.length - 1;

          return (
            <React.Fragment key={s}>
              <BreadcrumbItem>
                {isCurrent ? (
                  <BreadcrumbPage className="capitalize">
                    {formatStepLabel(s)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <button
                      type="button"
                      className="capitalize"
                      onClick={() => setParams({ step: s })}
                    >
                      {formatStepLabel(s)}
                    </button>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast ? <BreadcrumbSeparator /> : null}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
