// E-commerce disabled: removed product prefetching
// Original imports preserved as comments for re-enabling

import { getPageContent } from "@/app/(admin)/lib/api/editor";
import { landingPageConfig } from "@/app/(admin)/modules/editor/configs/landing-page";
import { caseStudyQueries } from "@/app/lib/hooks/use-case-study-queries";
import { getQueryClient } from "@/app/lib/query/get-query-client";
import { Data, Render } from "@measured/puck";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";

// E-commerce imports - hidden
// import { productQueries } from "@/app/modules/products/queries";
// import { loadLandingProductsParams } from "../../params";
// import { getMeilisearchFilterFromLandingProductsParams } from "../../utils";

// Original interface with product params
// interface LandingViewProps {
//   landingProductsParams: Awaited<ReturnType<typeof loadLandingProductsParams>>;
// }

export const LandingView = async () => {
  const queryClient = getQueryClient();
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");

  const pageContent = await getPageContent({ path: pathname });

  // E-commerce prefetching - hidden
  // queryClient.prefetchQuery(
  //   productQueries.getProductsFromMeilisearch.queryOptions({
  //     filter: getMeilisearchFilterFromLandingProductsParams(landingProductsParams),
  //   }),
  // );

  await queryClient.prefetchQuery(caseStudyQueries.list());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Render
        config={landingPageConfig}
        data={(pageContent?.puckData as Data) ?? { content: [], root: {} }}
      />
    </HydrationBoundary>
  );
};
