"use client";

import { useSuspenseDefaultRegion } from "@/app/modules/region/hooks/use-region-queries";
import { useSuspenseGetProductsFromMeilisearch } from "../../hooks/use-product-queries";
import { SortOption } from "../../hooks/use-product-sort-params";
import { convertFiltersToMeilisearch } from "../../utils/filter";
import { formatPriceRange } from "../../utils/price";
import { convertSortToMeilisearch } from "../../utils/sort";
import { ProductCardSkeleton } from "./product-card";
import { ProductGrid } from "./product-grid";

interface ProductGridContainerProps {
  sort: SortOption;
  filter: {
    categories: string[];
    priceRange: number[] | null;
    specs: string[];
  };
}

export const ProductGridContainer = ({
  sort,
  filter,
}: ProductGridContainerProps) => {
  const { data: regionData } = useSuspenseDefaultRegion();
  const currencyCode = regionData.region.currency_code;

  const { data: productsData } = useSuspenseGetProductsFromMeilisearch({
    sort: convertSortToMeilisearch(sort),
    filter: convertFiltersToMeilisearch(filter),
  });

  const products =
    productsData?.hits.map((hit) => {
      return {
        id: hit.id,
        name: hit.title || "",
        price: formatPriceRange(
          {
            min: hit.min_price,
            max: hit.max_price,
          },
          currencyCode,
        ),
        specs: hit.tags?.map((tag) => tag.value) || [],
        image: hit.thumbnail || "",
      };
    }) || [];

  return <ProductGrid products={products} />;
};

export const ProductGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} className="h-full" />
      ))}
    </div>
  );
};
