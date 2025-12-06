import { editorQueries } from "@/app/(admin)/modules/editor/queries";
import { getQueryClient } from "@/app/lib/query/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { Editor } from "../components/editor";

export const EditorView = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const queryClient = getQueryClient();

  const path = searchParams.path as string | undefined;

  // Prefetch page content
  queryClient.prefetchQuery(
    editorQueries.getPageContent.queryOptions({ path, isDraft: true }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading editor...</div>}>
        <Editor path={path} />
      </Suspense>
    </HydrationBoundary>
  );
};
