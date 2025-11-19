import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "../lib/query/get-query-client";
import { categoryQueries } from "../modules/categories";

const PagesLayout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(categoryQueries.listCategories.queryOptions({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="min-h-[calc(100vh-4rem)] pt-14">{children}</main>
    </HydrationBoundary>
  );
};

export default PagesLayout;
