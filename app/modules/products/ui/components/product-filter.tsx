"use client";

import { Checkbox } from "@/app/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible";
import { Label } from "@/app/components/ui/label";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Separator } from "@/app/components/ui/separator";
import { Slider } from "@/app/components/ui/slider";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useProductFilterParams } from "../../hooks/use-product-filter-params";

// Product categories based on product names
const CATEGORIES = [
  "Panels",
  "Inverters",
  "Batteries",
  "Pumps",
  "Services",
] as const;

// Unique specs extracted from product data
const SPECS = [
  "6.5 kW output",
  "25-year warranty",
  "Wi-Fi monitoring",
  "Hybrid ready",
  "98% efficiency",
  "Mobile app",
  "18 kWh storage",
  "Stackable modules",
  "Indoor/outdoor",
  "45m head",
  "Brushless motor",
  "Remote monitoring",
  "Quarterly checks",
  "Priority support",
  "Performance reports",
] as const;

const PRICE_MIN = 0;
const PRICE_MAX = 10000;

export const ProductFilter = () => {
  const [{ categories, priceRange, specs }, setFilters] =
    useProductFilterParams();
  const [priceSliderValue, setPriceSliderValue] = useState<number[]>(
    priceRange.length === 2 ? priceRange : [PRICE_MIN, PRICE_MAX],
  );

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters({
      categories: checked
        ? [...categories, category]
        : categories.filter((c) => c !== category),
    });
  };

  const handlePriceRangeChange = (values: number[]) => {
    // Update local state immediately for smooth UI feedback
    setPriceSliderValue(values);
  };

  const handlePriceRangeCommit = (values: number[]) => {
    // Update URL only when user releases the mouse
    setFilters({ priceRange: values });
  };

  const handleSpecChange = (spec: string, checked: boolean) => {
    setFilters({
      specs: checked ? [...specs, spec] : specs.filter((s) => s !== spec),
    });
  };

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium [&[data-state=open]>svg]:rotate-180">
          <span>Categories</span>
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <ScrollArea className="h-48">
            <div className="space-y-3 pr-4">
              {CATEGORIES.map((category) => {
                const isChecked = categories.includes(category);
                return (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`category-${category}`}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {category}
                    </Label>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Price Range Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium [&[data-state=open]>svg]:rotate-180">
          <span>Price Range</span>
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 pt-2">
          <div className="space-y-2">
            <Slider
              value={priceSliderValue}
              onValueChange={handlePriceRangeChange}
              onValueCommit={handlePriceRangeCommit}
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={100}
              className="w-full"
            />
            <div className="text-muted-foreground flex items-center justify-between text-xs">
              <span>${priceSliderValue[0]?.toLocaleString()}</span>
              <span>${priceSliderValue[1]?.toLocaleString()}</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Specs Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium [&[data-state=open]>svg]:rotate-180">
          <span>Specs</span>
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <ScrollArea className="h-64">
            <div className="space-y-3 pr-4">
              {SPECS.map((spec) => {
                const isChecked = specs.includes(spec);
                return (
                  <div key={spec} className="flex items-center space-x-2">
                    <Checkbox
                      id={`spec-${spec}`}
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        handleSpecChange(spec, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`spec-${spec}`}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {spec}
                    </Label>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
