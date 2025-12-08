"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { CURRENCY_CODE } from "@/app/constants/api";
import { useFormContext } from "react-hook-form";
import { ProductFormValues } from "../../../schemas";

/**
 * Simple price and inventory inputs for products without explicit variants.
 * This creates/uses an invisible "default" variant behind the scenes.
 */
export const SimpleVariantFields = () => {
  const { control } = useFormContext<ProductFormValues>();

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={control}
            name="defaultVariant.price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ({CURRENCY_CODE.toUpperCase()})</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? undefined : Number(value));
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="defaultVariant.inventory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inventory</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? undefined : Number(value));
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
