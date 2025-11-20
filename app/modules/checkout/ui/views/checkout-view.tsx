import { PageTitle } from "@/app/components/shared/page-title";
import { DEFAULT_COUNTRY_CODE } from "@/app/constants/terminal";
import { getQueryClient } from "@/app/lib/query/get-query-client";
import { CheckoutStepRouter } from "@/app/modules/checkout/ui/components/checkout-step-router";
import { CheckoutStepsBreadcrumb } from "@/app/modules/checkout/ui/components/checkout-steps-breadcrumb";
import { terminalQueries } from "@/app/modules/terminal/queries";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export const CheckoutView = async () => {
  const queryClient = getQueryClient();

  // Prefetch terminal data for checkout forms
  queryClient.prefetchQuery(terminalQueries.getCountries.queryOptions());
  queryClient.prefetchQuery(
    terminalQueries.getStates.queryOptions(DEFAULT_COUNTRY_CODE),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="view-container">
          <PageTitle title="Checkout" />
          <CheckoutStepsBreadcrumb />
          <div className="mt-4">
            <CheckoutStepRouter />
          </div>
        </div>
      </Suspense>
    </HydrationBoundary>
  );
};
