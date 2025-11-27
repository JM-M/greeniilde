"use client";

import { ProductCarousel } from "@/app/modules/products/ui/components/product-carousel";
import { useGetProductsFromMeilisearch } from "../../hooks/use-product-queries";
import { formatPriceRange } from "../../utils/price";
import { useProductDetailsContext } from "../contexts/product-details-context";

export const SimilarProducts = () => {
  const { product } = useProductDetailsContext();

  const categoryId = product.categories?.[0]?.id;

  const { data } = useGetProductsFromMeilisearch({
    filter: `categories.id = "${categoryId}"`,
  });

  const products = data?.hits.map((hit) => {
    return {
      id: hit.id,
      name: hit.title || "",
      price: formatPriceRange({
        min: hit.min_price,
        max: hit.max_price,
      }),
      specs: hit.tags?.map((tag) => tag.value) || [],
      image: hit.thumbnail || "",
    };
  });

  return (
    <section aria-labelledby="similar-products-heading" className="space-y-4">
      <h3 id="similar-products-heading" className="text-xl font-semibold">
        Similar products
      </h3>
      <ProductCarousel products={products || []} />
    </section>
  );
};
