import { REGION_ID } from "@/app/constants/api";
import { getQueryClient } from "@/app/lib/query/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { productQueries } from "../../queries";
import { ProductDetailsViewClient } from "../components/product-details-view-client";

interface ProductDetailsViewProps {
  productId: string;
}

export const ProductDetailsView = async ({
  productId,
}: ProductDetailsViewProps) => {
  const queryClient = getQueryClient();

  // TODO: Convert to an infinite query
  queryClient.prefetchQuery(
    productQueries.getProduct.queryOptions({
      productId,
      query: {
        fields: `*variants.calculated_price,*categories`,
        region_id: REGION_ID,
      },
    }),
  );

  queryClient.prefetchQuery(
    productQueries.getProductReviews.queryOptions(productId),
  );

  queryClient.prefetchQuery(
    productQueries.getProductReviewStats.queryOptions(productId),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetailsViewClient />
      </Suspense>
    </HydrationBoundary>
  );
};
