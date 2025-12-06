import { getPageContent } from "@/app/(admin)/lib/api/editor";
import { landingPageConfig } from "@/app/(admin)/modules/editor/configs/landing-page";
import { caseStudyQueries } from "@/app/lib/hooks/use-case-study-queries";
import { getQueryClient } from "@/app/lib/query/get-query-client";
import { productQueries } from "@/app/modules/products/queries";
import { Render } from "@measured/puck";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { loadLandingProductsParams } from "../../params";
import { getMeilisearchFilterFromLandingProductsParams } from "../../utils";

interface LandingViewProps {
  landingProductsParams: Awaited<ReturnType<typeof loadLandingProductsParams>>;
}

export const LandingView = async ({
  landingProductsParams,
}: LandingViewProps) => {
  const queryClient = getQueryClient();
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");

  const pageContent = await getPageContent({ path: pathname });

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
      <Render config={landingPageConfig} data={pageContent?.puckData || {}} />
    </HydrationBoundary>
  );
};
