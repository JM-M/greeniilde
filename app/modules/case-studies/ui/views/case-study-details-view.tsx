import { caseStudyQueries } from "@/app/lib/hooks/use-case-study-queries";
import { getQueryClient } from "@/app/lib/query/get-query-client";
import { CaseStudyDetailsViewClient } from "@/app/modules/case-studies/ui/components/case-study-details-view-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

type CaseStudyDetailsViewProps = {
  id: string;
};

export const CaseStudyDetailsView = async ({
  id,
}: CaseStudyDetailsViewProps) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(caseStudyQueries.detail(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <CaseStudyDetailsViewClient id={id} />
      </Suspense>
    </HydrationBoundary>
  );
};
