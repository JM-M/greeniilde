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
import { CURRENCY_CODE } from "@/app/constants/api";
import { useFormContext } from "react-hook-form";
import { ProductFormValues } from "../../../schemas";

const DEFAULT_CURRENCY = { code: CURRENCY_CODE, symbol: "€" };

export const VariantsTable = () => {
  const { watch, setValue } = useFormContext<ProductFormValues>();
  const variants = watch("variants") || [];

  const updateVariantPrice = (variantIndex: number, amount: number) => {
    const currentVariants = [...variants];
    const variant = currentVariants[variantIndex];

    // Set price for the default currency
    if (amount > 0) {
      variant.prices = [{ currency_code: CURRENCY_CODE, amount }];
    } else {
      variant.prices = [];
    }

    setValue("variants", currentVariants);
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
                      setValue("variants", currentVariants);
                    }}
                    className="w-32"
                  />
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <InputGroup>
                      <InputGroupAddon>
                        {DEFAULT_CURRENCY.symbol}
                      </InputGroupAddon>
                      <InputGroupInput
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={
                          variant.prices?.find(
                            (p) =>
                              p.currency_code?.toUpperCase() ===
                              DEFAULT_CURRENCY.code.toUpperCase(),
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
