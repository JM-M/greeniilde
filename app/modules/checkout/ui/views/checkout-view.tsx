import { PageTitle } from "@/app/components/shared/page-title";
import { DEFAULT_COUNTRY_CODE } from "@/app/constants/terminal";
import { getQueryClient } from "@/app/lib/query/get-query-client";
import {
  SinglePageCheckout,
  SinglePageCheckoutSkeleton,
} from "@/app/modules/checkout/ui/components/single-page-checkout";
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
      <div className="view-container">
        <PageTitle title="Checkout" />
        <div className="mt-8">
          <Suspense fallback={<SinglePageCheckoutSkeleton />}>
            <SinglePageCheckout />
          </Suspense>
        </div>
      </div>
    </HydrationBoundary>
  );
};
