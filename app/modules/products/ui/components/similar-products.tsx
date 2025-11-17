"use client";

import { ProductCarousel } from "@/app/modules/products/ui/components/product-carousel";

export const SimilarProducts = () => {
  return (
    <section aria-labelledby="similar-products-heading" className="space-y-4">
      <h3 id="similar-products-heading" className="text-xl font-semibold">
        Similar products
      </h3>
      <ProductCarousel />
    </section>
  );
};


