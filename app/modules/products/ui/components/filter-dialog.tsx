"use client";

import { ResponsiveDialog } from "@/app/components/shared/responsive-dialog";
import { Button } from "@/app/components/ui/button";
import { ProductFilter } from "./product-filter";

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FilterDialog = ({ open, onOpenChange }: FilterDialogProps) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Filter Products"
      description="Filter products by your preferences"
    >
      <div className="mb-5 space-y-4">
        <ProductFilter />
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline">Clear Filters</Button>
          <Button>Apply Filters</Button>
        </div>
      </div>
    </ResponsiveDialog>
  );
};
