import { caseStudyQueries } from "@/app/lib/hooks/use-case-study-queries";
import { getQueryClient } from "@/app/lib/query/get-query-client";
import { CaseStudiesViewClient } from "@/app/modules/case-studies/ui/components/case-studies-view-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

export const CaseStudiesView = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(caseStudyQueries.list());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <CaseStudiesViewClient />
      </Suspense>
    </HydrationBoundary>
  );
};
