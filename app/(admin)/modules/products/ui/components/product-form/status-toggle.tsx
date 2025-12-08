"use client";

import { ProductFormValues } from "@/app/(admin)/modules/products/schemas";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { useFormContext } from "react-hook-form";

/**
 * A toggle that switches between "draft" and "published" status.
 * Connected to the form context.
 */
export const StatusToggle = () => {
  const { watch, setValue } = useFormContext<ProductFormValues>();
  const status = watch("status");
  const isPublished = status === "published";

  const handleChange = (checked: boolean) => {
    setValue("status", checked ? "published" : "draft", {
      shouldDirty: true,
    });
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="space-y-0.5">
        <div className="flex flex-row items-center justify-between">
          <Label className="text-base">Published</Label>
          <Switch checked={isPublished} onCheckedChange={handleChange} />
        </div>
        <div className="text-muted-foreground text-xs">
          {isPublished
            ? "Product is visible to customers."
            : "Product is in draft mode and not visible."}
        </div>
      </div>
    </div>
  );
};
