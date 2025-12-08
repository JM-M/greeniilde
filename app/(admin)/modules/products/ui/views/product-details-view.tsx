"use client";

import { useGetProduct } from "@/app/(admin)/modules/products/hooks/use-product-queries";
import { ProductForm } from "../components/product-form";

interface ProductDetailsViewProps {
  productId: string;
}

export const ProductDetailsView = ({ productId }: ProductDetailsViewProps) => {
  const { data, isLoading } = useGetProduct(productId);

  if (isLoading) {
    return <div className="p-4">Loading product...</div>;
  }

  if (!data?.product) {
    return <div className="p-4">Product not found</div>;
  }

  return <ProductForm product={data.product} />;
};
