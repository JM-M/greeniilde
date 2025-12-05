import { caseStudyQueries } from "@/app/lib/hooks/use-case-study-queries";
import { getQueryClient } from "@/app/lib/query/get-query-client";
import { productQueries } from "@/app/modules/products/queries";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { loadLandingProductsParams } from "../../params";
import { getMeilisearchFilterFromLandingProductsParams } from "../../utils";
import { CaseStudies } from "../components/case-studies";
import { FAQsWithPuckData } from "./faqs-with-puck-data";
import { HeroWithPuckData } from "./hero-with-puck-data";
import { ProcessWithPuckData } from "./process-with-puck-data";
import { Products } from "../components/products";
import { ValuePropWithPuckData } from "./value-prop-with-puck-data";

interface LandingViewProps {
  landingProductsParams: Awaited<ReturnType<typeof loadLandingProductsParams>>;
}

export const LandingView = async ({
  landingProductsParams,
}: LandingViewProps) => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(
    productQueries.getProductsFromMeilisearch.queryOptions({
      filter: getMeilisearchFilterFromLandingProductsParams(
        landingProductsParams,
      ),
    }),
  );

  await queryClient.prefetchQuery(caseStudyQueries.list());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <HeroWithPuckData />
        <ValuePropWithPuckData />
        <Suspense fallback={<div>Loading case studies...</div>}>
          <CaseStudies />
        </Suspense>
        <Suspense fallback={<div>Loading products...</div>}>
          <Products />
        </Suspense>
        <ProcessWithPuckData />
        <FAQsWithPuckData />
      </div>
    </HydrationBoundary>
  );
};
