"use client";

import { Input } from "@/app/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { useSuspenseDefaultRegion } from "@/app/modules/region/hooks/use-region-queries";
import { useFormContext } from "react-hook-form";
import { ProductFormValues } from "../../../schemas";

// Currency symbol mapping for common currencies
const CURRENCY_SYMBOLS: Record<string, string> = {
  ngn: "₦",
  usd: "$",
  eur: "€",
  gbp: "£",
};

export const VariantsTable = () => {
  const { watch, setValue } = useFormContext<ProductFormValues>();
  const variants = watch("variants") || [];

  // Get currency code from the default region
  const { data: regionData } = useSuspenseDefaultRegion();
  const currencyCode = regionData.region.currency_code;
  const currencySymbol =
    CURRENCY_SYMBOLS[currencyCode.toLowerCase()] || currencyCode.toUpperCase();

  const updateVariantPrice = (variantIndex: number, amount: number) => {
    const currentVariants = [...variants];
    const variant = currentVariants[variantIndex];

    // Set price for the region's currency
    if (amount > 0) {
      variant.prices = [{ currency_code: currencyCode, amount }];
    } else {
      variant.prices = [];
    }

    setValue("variants", currentVariants, { shouldDirty: true });
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Variant</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Prices</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variants.map((variant, variantIndex) => {
            return (
              <TableRow key={variantIndex}>
                <TableCell>
                  <div className="font-medium">{variant.title}</div>
                </TableCell>

                <TableCell>
                  <Input
                    placeholder="Auto-generated SKU"
                    value={variant.sku || ""}
                    onChange={(e) => {
                      const currentVariants = [...variants];
                      currentVariants[variantIndex].sku = e.target.value;
                      setValue("variants", currentVariants, {
                        shouldDirty: true,
                      });
                    }}
                    className="w-32"
                  />
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <InputGroup>
                      <InputGroupAddon>{currencySymbol}</InputGroupAddon>
                      <InputGroupInput
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={
                          variant.prices?.find(
                            (p) =>
                              p.currency_code?.toUpperCase() ===
                              currencyCode.toUpperCase(),
                          )?.amount || ""
                        }
                        onChange={(e) =>
                          updateVariantPrice(
                            variantIndex,
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="w-24"
                      />
                    </InputGroup>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
