"use client";

import { ResponsiveDialog } from "@/app/components/shared/responsive-dialog";
import { ProductSort } from "./product-sort";

interface SortDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SortDialog = ({ open, onOpenChange }: SortDialogProps) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Sort Products"
      description="Choose how to sort products"
    >
      <ProductSort />
    </ResponsiveDialog>
  );
};

