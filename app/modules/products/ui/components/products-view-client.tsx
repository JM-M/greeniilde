"use client";

import { Suspense, useState } from "react";
import { useProductFilterParams } from "../../hooks/use-product-filter-params";
import { useProductSortParams } from "../../hooks/use-product-sort-params";
import { FilterDialog } from "./filter-dialog";
import { ProductFilter, ProductFilterSkeleton } from "./product-filter";
import {
  ProductGridContainer,
  ProductGridSkeleton,
} from "./product-grid-container";
import { ProductViewHeader } from "./product-view-header";
import { SortDialog } from "./sort-dialog";

export const ProductsViewClient = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [productSortParams] = useProductSortParams();
  const [productFilterParams] = useProductFilterParams();

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
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGridContainer
                sort={productSortParams.sort}
                filter={productFilterParams}
              />
            </Suspense>
          </div>
          <div className="sticky top-20 hidden h-fit w-80 shrink-0 lg:block">
            <ProductFilter />
          </div>
        </div>
      </div>
    </>
  );
};

export const ProductViewClientSkeleton = () => {
  return (
    <div className="view-container">
      <ProductViewHeader
        filterOpen={false}
        onFilterOpenChange={() => {}}
        sortOpen={false}
        onSortOpenChange={() => {}}
      />
      <div className="flex gap-6">
        <div className="flex-1">
          <ProductGridSkeleton />
        </div>
        <div className="sticky top-20 hidden h-fit w-80 shrink-0 lg:block">
          <ProductFilterSkeleton />
        </div>
      </div>
    </div>
  );
};
