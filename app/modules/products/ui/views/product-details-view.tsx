import { getQueryClient } from "@/app/lib/query/get-query-client";
import { storeQueries } from "@/app/modules/store/queries";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { productQueries } from "../../queries";
import {
  ProductDetailsViewClient,
  ProductDetailsViewClientSkeleton,
} from "../components/product-details-view-client";

interface ProductDetailsViewProps {
  productId: string;
}

export const ProductDetailsView = async ({
  productId,
}: ProductDetailsViewProps) => {
  const queryClient = getQueryClient();

  // Get store config to access the default region ID
  const storeConfig = await queryClient.fetchQuery(
    storeQueries.getStoreConfig.queryOptions(),
  );
  const regionId = storeConfig.default_region_id;

  // TODO: Convert to an infinite query
  if (regionId) {
    queryClient.prefetchQuery(
      productQueries.getProduct.queryOptions({
        productId,
        query: {
          fields: `*variants.calculated_price,*categories`,
          region_id: regionId,
        },
      }),
    );
  }

  queryClient.prefetchQuery(
    productQueries.getProductReviews.queryOptions({ productId }),
  );

  queryClient.prefetchQuery(
    productQueries.getProductReviewStats.queryOptions(productId),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductDetailsViewClientSkeleton />}>
        <ProductDetailsViewClient />
      </Suspense>
    </HydrationBoundary>
  );
};
