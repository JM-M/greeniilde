"use client";

import { Button } from "@/app/components/ui/button";
import { useIsMobile } from "@/app/hooks/use-mobile";
import { ArrowUpDownIcon, FilterIcon } from "lucide-react";
import {
  useProductSortParams,
  type SortOption,
} from "../../hooks/use-product-sort-params";

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest",
  oldest: "Oldest",
  "most-expensive": "Most Expensive",
  "least-expensive": "Least Expensive",
  "name-asc": "Name (A to Z)",
  "name-desc": "Name (Z to A)",
};

interface ProductViewHeaderProps {
  filterOpen: boolean;
  onFilterOpenChange: (open: boolean) => void;
  sortOpen: boolean;
  onSortOpenChange: (open: boolean) => void;
}

export const ProductViewHeader = ({
  filterOpen,
  onFilterOpenChange,
  sortOpen,
  onSortOpenChange,
}: ProductViewHeaderProps) => {
  const isMobile = useIsMobile();
  const [{ sort }] = useProductSortParams();
  const currentSortLabel = SORT_LABELS[sort ?? "newest"];

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold">Products</h2>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size={isMobile ? "sm" : "default"}
          onClick={() => onSortOpenChange(true)}
        >
          <ArrowUpDownIcon />
          <span>{currentSortLabel}</span>
        </Button>
        <Button
          variant="outline"
          size={isMobile ? "icon" : "default"}
          onClick={() => onFilterOpenChange(true)}
          className="lg:hidden"
        >
          <FilterIcon /> {isMobile ? null : "Filter"}
        </Button>
      </div>
    </div>
  );
};
