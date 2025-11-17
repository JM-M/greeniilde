"use client";

import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import {
  useProductSortParams,
  SORT_OPTIONS,
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

export const ProductSort = () => {
  const [{ sort }, setSort] = useProductSortParams();

  return (
    <RadioGroup
      value={sort ?? "newest"}
      onValueChange={(value) => setSort({ sort: value as SortOption })}
      className="space-y-3"
    >
      {SORT_OPTIONS.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <RadioGroupItem value={option} id={`sort-${option}`} />
          <Label
            htmlFor={`sort-${option}`}
            className="cursor-pointer text-sm font-normal"
          >
            {SORT_LABELS[option]}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

