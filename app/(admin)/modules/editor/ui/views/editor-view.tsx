import { editorQueries } from "@/app/(admin)/modules/editor/queries";
import { getQueryClient } from "@/app/lib/query/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { Editor } from "../components/editor";

export const EditorView = async () => {
  const queryClient = getQueryClient();

  // Prefetch home page content
  queryClient.prefetchQuery(editorQueries.getPageContent.queryOptions("home"));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading editor...</div>}>
        <Editor />
      </Suspense>
    </HydrationBoundary>
  );
};
