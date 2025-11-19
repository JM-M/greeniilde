"use client";

import { useProductDetailsContext } from "../contexts/product-details-context";

type ProductDescriptionProps = {
  className?: string;
};

export const ProductDescription = ({ className }: ProductDescriptionProps) => {
  const { product } = useProductDetailsContext();
  return <div className={className}>{product.description}</div>;
};
