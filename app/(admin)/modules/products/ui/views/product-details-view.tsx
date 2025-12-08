"use client";

import { useGetProduct } from "@/app/(admin)/modules/products/hooks/use-product-queries";
import { ProductFormValues } from "@/app/(admin)/modules/products/schemas";
import { CURRENCY_CODE } from "@/app/constants/api";
import { HttpTypes } from "@medusajs/types";
import { ProductForm } from "../components/product-form";
import { ProductFormSkeleton } from "../components/product-form/skeleton";

interface ProductDetailsViewProps {
  productId: string;
}

/**
 * Transform a Medusa product to ProductFormValues
 */
const transformProductToFormValues = (
  product: HttpTypes.AdminProduct,
): Partial<ProductFormValues> => ({
  title: product.title || "",
  description: product.description || "",
  status: product.status || "draft",
  category: product.categories?.[0]?.id || "",
  shipping: {
    package: "",
    weight: product.weight ? Number(product.weight) : undefined,
  },
  media: product.images?.map((img) => img.url) || [],
  tags: product.tags?.map((tag) => tag.value) || [],
  options:
    product.options?.map((opt) => ({
      name: opt.title,
      values: opt.values?.map((v) => v.value) || [],
    })) || [],
  variants:
    product.variants?.map((variant) => ({
      id: variant.id,
      title: variant.title || "",
      sku: variant.sku || "",
      options:
        variant.options?.reduce(
          (acc, opt) => ({
            ...acc,
            [opt.option?.title || ""]: opt.value,
          }),
          {} as Record<string, string>,
        ) || {},
      prices:
        variant.prices?.map((price) => ({
          currency_code:
            (price.currency_code as typeof CURRENCY_CODE) || CURRENCY_CODE,
          amount: price.amount || 0,
        })) || [],
    })) || [],
});

export const ProductDetailsView = ({ productId }: ProductDetailsViewProps) => {
  const { data, isLoading } = useGetProduct(productId, {
    fields:
      "*categories,*options,*options.values,*variants,*variants.options,*variants.prices",
  });

  if (isLoading) {
    return <ProductFormSkeleton />;
  }

  if (!data?.product) {
    return <div className="p-4">Product not found</div>;
  }

  const product = data.product;
  const initialValues = transformProductToFormValues(product);
  const enableVariantsInitially =
    (product.variants?.length || 0) > 1 || (product.options?.length || 0) > 0;

  return (
    <ProductForm
      productId={productId}
      initialValues={initialValues}
      enableVariantsInitially={enableVariantsInitially}
    />
  );
};
