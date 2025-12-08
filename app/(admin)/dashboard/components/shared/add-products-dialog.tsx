"use client";

import { ProductSelector } from "@/app/(admin)/dashboard/components/shared/product-selector";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { ReactNode, useState } from "react";

interface AddProductsDialogProps {
  /** Trigger element that opens the dialog */
  trigger: ReactNode;
  /** Callback when products are saved */
  onSave: (selectedIds: string[]) => void;
  /** Whether save operation is in progress */
  isLoading?: boolean;
  /** Product IDs to exclude from selection (e.g., already added) */
  excludeProductIds?: string[];
  /** Dialog title */
  title?: string;
  /** Dialog description */
  description?: string;
}

export function AddProductsDialog({
  trigger,
  onSave,
  isLoading = false,
  excludeProductIds = [],
  title = "Select products",
  description = "Select products to add",
}: AddProductsDialogProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    // Reset selection when dialog closes
    if (!newOpen) {
      setSelected(new Set());
    }
  };

  const handleSave = () => {
    onSave(Array.from(selected));
    setOpen(false);
    setSelected(new Set());
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl p-3">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
        </DialogHeader>
        <ProductSelector
          value={selected}
          onChange={setSelected}
          excludeIds={excludeProductIds}
        />
        <DialogFooter className="mt-3">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading || selected.size === 0}
          >
            {isLoading
              ? "Adding..."
              : `Add ${selected.size} product${selected.size !== 1 ? "s" : ""}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
