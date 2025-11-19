"use client";

import { useState } from "react";
import { useProductFilterParams } from "../../hooks/use-product-filter-params";
import { useSuspenseGetProductsFromMeilisearch } from "../../hooks/use-product-queries";
import { useProductSortParams } from "../../hooks/use-product-sort-params";
import { convertFiltersToMeilisearch } from "../../utils/filter";
import { formatPriceRange } from "../../utils/price";
import { convertSortToMeilisearch } from "../../utils/sort";
import { FilterDialog } from "./filter-dialog";
import { ProductFilter } from "./product-filter";
import { ProductGrid } from "./product-grid";
import { ProductViewHeader } from "./product-view-header";
import { SortDialog } from "./sort-dialog";

export const ProductsViewClient = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [productSortParams] = useProductSortParams();
  const [productFilterParams] = useProductFilterParams();

  // Investigate: Cannot update a component (`Router`) while rendering a different component (`ProductsViewClient`). To locate the bad setState() call inside `ProductsViewClient`
  const { data: productsData } = useSuspenseGetProductsFromMeilisearch({
    sort: convertSortToMeilisearch(productSortParams.sort),
    filter: convertFiltersToMeilisearch(productFilterParams),
  });

  const products =
    productsData?.hits.map((hit) => {
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
    }) || [];

  return (
    <>
      <div className="lg:hidden">
        <FilterDialog open={filterOpen} onOpenChange={setFilterOpen} />
      </div>
      <SortDialog open={sortOpen} onOpenChange={setSortOpen} />
      <div className="view-container">
        <ProductViewHeader
          filterOpen={filterOpen}
          onFilterOpenChange={setFilterOpen}
          sortOpen={sortOpen}
          onSortOpenChange={setSortOpen}
        />
        <div className="flex gap-6">
          <div className="flex-1">
            <ProductGrid products={products} />
          </div>
          <div className="sticky top-20 hidden h-fit w-80 shrink-0 lg:block">
            <ProductFilter />
          </div>
        </div>
      </div>
    </>
  );
};
