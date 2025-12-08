"use client";

import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { isEqual } from "lodash-es";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { ProductFormValues, ProductVariant } from "../../../schemas";
import { OptionsManager } from "./options-manager";
import { VariantsTable } from "./variants-table";

// Generate all possible variant combinations from options
function generateVariants(
  options: ProductFormValues["options"],
): Omit<ProductVariant, "prices">[] {
  if (options.length === 0) {
    return [
      {
        title: "Default",
        options: {},
      },
    ];
  }

  // Create cartesian product of all option values
  const combinations = cartesianProduct(options.map((opt) => opt.values));

  return combinations.map((combination, index) => {
    const optionValues: Record<string, string> = {};
    options.forEach((option, optionIndex) => {
      optionValues[option.name] = combination[optionIndex];
    });

    const title = Object.values(optionValues).join(" / ");

    return {
      title,
      sku: `${combination.join("-")}`.toUpperCase(),
      options: optionValues,
    };
  });
}

// Helper function for cartesian product
function cartesianProduct<T>(arrays: T[][]): T[][] {
  return arrays.reduce<T[][]>(
    (acc, curr) => acc.flatMap((x) => curr.map((y) => [...x, y])),
    [[]],
  );
}

// Helper function to check if options have actually changed
function haveOptionsChanged(
  previousOptions: string,
  currentOptions: any[],
): boolean {
  return JSON.stringify(currentOptions) !== previousOptions;
}

// Helper function to check if we should skip variant generation on initial mount
function shouldSkipVariantGeneration(
  isInitialMount: boolean,
  variantsCount: number,
): boolean {
  return isInitialMount && variantsCount > 0;
}

// Helper function to merge existing variant data with generated variants
function mergeVariantData(
  generatedVariants: Omit<ProductVariant, "prices">[],
  existingVariants: ProductVariant[],
): ProductVariant[] {
  return generatedVariants.map((generated) => {
    const existing = existingVariants.find((v) => {
      const match = isEqual(v.options, generated.options);
      return match;
    });

    return {
      ...generated,
      id: existing?.id, // Preserve ID for updates
      sku: existing?.sku || generated.sku, // Preserve existing SKU or use generated
      prices: existing?.prices || [], // Preserve prices
    };
  });
}

export const VariantsManager = () => {
  const { watch, setValue } = useFormContext<ProductFormValues>();
  const options = watch("options") || [];
  const variants = watch("variants") || [];
  const isInitialMount = useRef(true);
  const previousOptionsRef = useRef<string>(JSON.stringify(options));

  // Auto-generate variants when options change
  useEffect(() => {
    // Skip on initial mount if variants already exist (loaded from backend)
    if (shouldSkipVariantGeneration(isInitialMount.current, variants.length)) {
      isInitialMount.current = false;
      return;
    }

    // Only regenerate if options actually changed
    if (!haveOptionsChanged(previousOptionsRef.current, options)) {
      return;
    }
    previousOptionsRef.current = JSON.stringify(options);

    if (options.length === 0) {
      // If no options, create a single default variant
      const defaultVariant: ProductVariant = {
        title: "Default",
        options: {},
        prices: [],
      };

      if (variants.length === 0 || variants.length > 1) {
        setValue("variants", [defaultVariant]);
      }
      return;
    }

    const generatedVariants = generateVariants(options);
    const updatedVariants = mergeVariantData(generatedVariants, variants);

    setValue("variants", updatedVariants);
  }, [options, setValue, variants]);

  return (
    <div className="space-y-6">
      <OptionsManager />

      {variants.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Product Variants
              <Badge variant="secondary">{variants.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <VariantsTable />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
