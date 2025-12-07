import { getPageContent } from "@/app/(admin)/lib/api/editor";
import { caseStudyConfig } from "@/app/(admin)/modules/editor/configs/case-study";
import { caseStudyQueries } from "@/app/lib/hooks/use-case-study-queries";
import { getQueryClient } from "@/app/lib/query/get-query-client";
import { Data, Render } from "@measured/puck";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

type CaseStudyDetailsViewProps = {
  path: string;
};

export const CaseStudyDetailsView = async ({
  path,
}: CaseStudyDetailsViewProps) => {
  const queryClient = getQueryClient();

  // Get the page content from CMS
  const pageContent = await getPageContent({ path });

  // Prefetch related case studies data
  // Note: We'd need the currentId from the page content to exclude it
  await queryClient.prefetchQuery(caseStudyQueries.list());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Render
        config={caseStudyConfig}
        data={(pageContent?.puckData as Data) ?? { content: [], root: {} }}
      />
    </HydrationBoundary>
  );
};
