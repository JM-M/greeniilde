"use client";

import { REGION_ID } from "@/app/constants/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { productQueries } from "../../queries";
import { ProductDetailsProvider } from "../contexts/product-details-context";
import {
  ProductConfigurations,
  type Configuration,
} from "./product-configurations";
import { ProductDetailsTabs } from "./product-details-tabs";
import { ProductImagesCarousel } from "./product-images-carousel";
import { ProductInfo } from "./product-info";
import { ProductPurchaseControls } from "./product-purchase-controls";
import { SimilarProducts } from "./similar-products";

import { ProductCategoryBreadcrumb } from "./product-category-breadcrumb";

export const ProductDetailsViewClient = () => {
  const { id: productId } = useParams<{ id: string }>();

  const { data } = useSuspenseQuery(
    productQueries.getProduct.queryOptions({
      productId,
      query: {
        fields: `*variants.calculated_price,*categories`,
        region_id: REGION_ID,
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
