import { getQueryClient } from "@/app/lib/query/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { loadProductFilterParams, loadProductSortParams } from "../../params";
import { productQueries } from "../../queries";
import { convertFiltersToMeilisearch } from "../../utils/filter";
import { convertSortToMeilisearch } from "../../utils/sort";
import {
  ProductsViewClient,
  ProductViewClientSkeleton,
} from "../components/products-view-client";

interface ProductsViewProps {
  productFilterParams: Awaited<ReturnType<typeof loadProductFilterParams>>;
  productSortParams: Awaited<ReturnType<typeof loadProductSortParams>>;
}

export const ProductsView = async ({
  productFilterParams,
  productSortParams,
}: ProductsViewProps) => {
  const queryClient = getQueryClient();

  // Investigate: Cannot update a component (`Router`) while rendering a different component (`ProductsViewClient`). To locate the bad setState() call inside `ProductsViewClient`
  // TODO: Convert to an infinite query
  queryClient.prefetchQuery(
    productQueries.getProductsFromMeilisearch.queryOptions({
      sort: convertSortToMeilisearch(productSortParams.sort),
      filter: convertFiltersToMeilisearch(productFilterParams),
    }),
  );

  queryClient.prefetchQuery(
    productQueries.getFacetDistributions.queryOptions(),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductViewClientSkeleton />}>
        <ProductsViewClient />
      </Suspense>
    </HydrationBoundary>
  );
};
