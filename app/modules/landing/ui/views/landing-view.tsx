import { getQueryClient } from "@/app/lib/query/get-query-client";
import { categoryQueries } from "@/app/modules/categories/queries";
import { productQueries } from "@/app/modules/products/queries";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { loadLandingProductsParams } from "../../params";
import { getMeilisearchFilterFromLandingProductsParams } from "../../utils";
import { CaseStudies } from "../components/case-studies";
import { FAQs } from "../components/faqs";
import { Hero } from "../components/hero";
import { Process } from "../components/process";
import { Products } from "../components/products";
import { ValueProp } from "../components/value-prop";

interface LandingViewProps {
  landingProductsParams: Awaited<ReturnType<typeof loadLandingProductsParams>>;
}

export const LandingView = async ({
  landingProductsParams,
}: LandingViewProps) => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(categoryQueries.listCategories.queryOptions({}));

  queryClient.prefetchQuery(
    productQueries.getProductsFromMeilisearch.queryOptions({
      filter: getMeilisearchFilterFromLandingProductsParams(
        landingProductsParams,
      ),
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <Hero />
        <ValueProp />
        <Suspense fallback={<div>Loading products...</div>}>
          <Products />
        </Suspense>
        <Process />
        <CaseStudies />
        <FAQs />
      </div>
    </HydrationBoundary>
  );
};
