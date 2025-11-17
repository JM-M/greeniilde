"use client";

import { useState } from "react";
import { FilterDialog } from "../components/filter-dialog";
import { ProductFilter } from "../components/product-filter";
import { ProductGrid } from "../components/product-grid";
import { ProductViewHeader } from "../components/product-view-header";
import { SortDialog } from "../components/sort-dialog";

export const ProductsView = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

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
            <ProductGrid />
          </div>
          <div className="sticky top-20 hidden h-fit w-80 shrink-0 lg:block">
            <ProductFilter />
          </div>
        </div>
      </div>
    </>
  );
};
