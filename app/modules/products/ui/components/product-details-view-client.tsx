"use client";

import { useSuspenseStoreConfig } from "@/app/modules/store/hooks/use-store-queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { productQueries } from "../../queries";
import { ProductDetailsProvider } from "../contexts/product-details-context";
import {
  ProductCategoryBreadcrumb,
  ProductCategoryBreadcrumbSkeleton,
} from "./product-category-breadcrumb";
import {
  ProductConfigurations,
  ProductConfigurationsSkeleton,
  type Configuration,
} from "./product-configurations";
import {
  ProductDetailsTabs,
  ProductDetailsTabsSkeleton,
} from "./product-details-tabs";
import {
  ProductImagesCarousel,
  ProductImagesCarouselSkeleton,
} from "./product-images-carousel";
import { ProductInfo, ProductInfoSkeleton } from "./product-info";
import {
  ProductPurchaseControls,
  ProductPurchaseControlsSkeleton,
} from "./product-purchase-controls";
import { SimilarProducts, SimilarProductsSkeleton } from "./similar-products";

export const ProductDetailsViewClient = () => {
  const { id: productId } = useParams<{ id: string }>();
  const { data: storeConfig } = useSuspenseStoreConfig();
  const regionId = storeConfig.default_region_id;

  const { data } = useSuspenseQuery(
    productQueries.getProduct.queryOptions({
      productId,
      query: {
        fields: `*variants.calculated_price,*categories`,
        region_id: regionId,
      },
    }),
  );

  const product = data.product;

  // Extract configurations from product options
  const configurations: Configuration[] = useMemo(() => {
    if (!product.options || product.options.length === 0) {
      return [];
    }

    return product.options.map((option) => ({
      id: option.id,
      name: option.title,
      options: option.values?.map((v) => v.value) || [],
    }));
  }, [product.options]);

  return (
    <ProductDetailsProvider product={product}>
      <div className="view-container">
        <ProductCategoryBreadcrumb
          categories={product.categories || undefined}
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
          <div>
            <ProductImagesCarousel
              images={data.product.images?.map((image) => image.url) || []}
            />
          </div>

          <div className="space-y-6 lg:sticky lg:top-24">
            <ProductInfo
              name={product.title}
              tags={product.tags?.map((tag) => tag.value) || []}
            />
            <ProductConfigurations configurations={configurations} />
            <ProductPurchaseControls />
          </div>
        </div>

        <div className="mt-8">
          <ProductDetailsTabs />
        </div>

        <div className="mt-10">
          <SimilarProducts />
        </div>
      </div>
    </ProductDetailsProvider>
  );
};

export const ProductDetailsViewClientSkeleton = () => {
  return (
    <div className="view-container">
      <ProductCategoryBreadcrumbSkeleton />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
        <div>
          <ProductImagesCarouselSkeleton />
        </div>

        <div className="space-y-6 lg:sticky lg:top-24">
          <ProductInfoSkeleton />
          <ProductConfigurationsSkeleton />
          <ProductPurchaseControlsSkeleton />
        </div>
      </div>

      <div className="mt-8">
        <ProductDetailsTabsSkeleton />
      </div>

      <div className="mt-10">
        <SimilarProductsSkeleton />
      </div>
    </div>
  );
};
