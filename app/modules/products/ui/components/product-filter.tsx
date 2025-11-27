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
import { Skeleton } from "@/app/components/ui/skeleton";
import { Slider } from "@/app/components/ui/slider";
import { CURRENCY_CODE } from "@/app/constants/api";
import { convertToLocale } from "@/app/lib/utils";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useSuspenseListCategories } from "../../../categories/hooks/use-category-queries";
import { useProductFilterParams } from "../../hooks/use-product-filter-params";
import { useSuspenseGetFacetDistributions } from "../../hooks/use-product-queries";

// TODO: clean up this component

export const ProductFilter = () => {
  const [{ categories, priceRange, specs }, setFilters] =
    useProductFilterParams();

  const { data: facetDistributions } = useSuspenseGetFacetDistributions();

  // Get available categories from facets and fetch category details
  const { data: categoriesData } = useSuspenseListCategories({});

  // Get available category objects (with id and name)
  const availableCategories = categoriesData?.product_categories || [];

  // Get available specs from tags.value facets
  const availableSpecs = Object.keys(facetDistributions?.["tags.value"] || {});

  // Get actual price range from facets
  const minPrices = Object.keys(facetDistributions?.["min_price"] || {}).map(
    Number,
  );
  const maxPrices = Object.keys(facetDistributions?.["max_price"] || {}).map(
    Number,
  );
  const actualMinPrice = minPrices.length > 0 ? Math.min(...minPrices) : 0;
  const actualMaxPrice = maxPrices.length > 0 ? Math.max(...maxPrices) : 0;

  // Calculate step size based on price range (reactive to facet changes)
  const stepSize = useMemo(() => {
    const priceDifference = actualMaxPrice - actualMinPrice;

    return Math.max(Math.min(priceDifference / 100, 100), 1);
  }, [actualMinPrice, actualMaxPrice]);

  const [priceSliderValue, setPriceSliderValue] = useState<number[]>(
    priceRange?.length === 2 ? priceRange : [actualMinPrice, actualMaxPrice],
  );

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      // When checking a category, add it to the selection
      const newCategories = [...categories, categoryId];
      setFilters({ categories: newCategories });
    } else {
      // When unchecking a category, remove it from the selection
      const newCategories = categories.filter((id) => id !== categoryId);
      // If all are unchecked, reset to empty array (show all)
      setFilters({ categories: newCategories });
    }
  };

  const handlePriceRangeChange = (values: number[]) => {
    // Update local state for immediate visual feedback
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
      {/* Category Filter - Only show if categories are available */}
      {availableCategories.length > 0 && (
        <>
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium [&[data-state=open]>svg]:rotate-180">
              <span>Categories</span>
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <ScrollArea className="h-48">
                <div className="space-y-3 pr-4">
                  {availableCategories.map((category) => {
                    // Only check if explicitly selected (not when categories is empty)
                    const isChecked = categories.includes(category.id);
                    return (
                      <div
                        key={category.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={isChecked}
                          onCheckedChange={(checked) =>
                            handleCategoryChange(category.id, checked === true)
                          }
                        />
                        <Label
                          htmlFor={`category-${category.id}`}
                          className="cursor-pointer text-sm font-normal"
                        >
                          {category.name}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CollapsibleContent>
          </Collapsible>
          <Separator />
        </>
      )}

      {/* Price Range Filter - Only show if there's a valid price range */}
      {actualMinPrice < actualMaxPrice && (
        <>
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
                  min={actualMinPrice}
                  max={actualMaxPrice}
                  step={stepSize}
                  className="w-full"
                />
                <div className="text-muted-foreground flex items-center justify-between text-xs">
                  <span>
                    {convertToLocale({
                      amount: priceSliderValue[0],
                      currencyCode: CURRENCY_CODE,
                    })}
                  </span>
                  <span>
                    {convertToLocale({
                      amount: priceSliderValue[1],
                      currencyCode: CURRENCY_CODE,
                    })}
                  </span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          <Separator />
        </>
      )}

      {/* Specs Filter - Only show if specs are available */}
      {availableSpecs.length > 0 && (
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium [&[data-state=open]>svg]:rotate-180">
            <span>Specs</span>
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <ScrollArea className="h-64">
              <div className="space-y-3 pr-4">
                {availableSpecs.map((spec) => {
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
      )}
    </div>
  );
};

export const ProductFilterSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Categories Skeleton */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium [&[data-state=open]>svg]:rotate-180">
          <span>Categories</span>
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <ScrollArea className="h-48">
            <div className="space-y-3 pr-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>
      <Separator />

      {/* Price Range Skeleton */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium [&[data-state=open]>svg]:rotate-180">
          <span>Price Range</span>
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 pt-2">
          <div className="space-y-2">
            <Skeleton className="h-2 w-full" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Separator />

      {/* Specs Skeleton */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium [&[data-state=open]>svg]:rotate-180">
          <span>Specs</span>
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <ScrollArea className="h-64">
            <div className="space-y-3 pr-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-28" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
