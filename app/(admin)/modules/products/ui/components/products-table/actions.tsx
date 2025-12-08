"use client";

import { DeleteConfirmationDialog } from "@/app/(admin)/dashboard/components/shared/delete-confirmation-dialog";
import { FloatingActionBar } from "@/app/(admin)/dashboard/components/shared/floating-action-bar";
import { useBatchDeleteProducts } from "@/app/(admin)/modules/products/hooks/use-product-actions";
import { Button } from "@/app/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ProductsTableActionsProps {
  selectedIds: string[];
  onDeleteSuccess?: () => void;
}

export const ProductsTableActions = ({
  selectedIds,
  onDeleteSuccess,
}: ProductsTableActionsProps) => {
  const selectedCount = selectedIds.length;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const batchDeleteMutation = useBatchDeleteProducts({
    onSuccess: () => {
      toast.success(
        `${selectedCount} product${selectedCount === 1 ? "" : "s"} deleted successfully`,
      );
      setIsDialogOpen(false);
      onDeleteSuccess?.();
    },
    onError: (error) => {
      toast.error(`Failed to delete products: ${error.message}`);
    },
  });

  const handleDelete = () => {
    batchDeleteMutation.mutate(selectedIds);
  };

  return (
    <FloatingActionBar visible={selectedCount > 0}>
      <span className="text-muted-foreground px-2 text-sm">
        {selectedCount} product{selectedCount === 1 ? "" : "s"} selected
      </span>
      <DeleteConfirmationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        trigger={
          <Button
            variant="outline"
            size="sm"
            className="border-destructive/80 text-destructive/80 hover:border-destructive hover:text-destructive w-full border hover:bg-transparent sm:w-auto"
          >
            <Trash2Icon className="size-3" />
            Delete
          </Button>
        }
        title={`Delete ${selectedCount} product${selectedCount === 1 ? "" : "s"}?`}
        description={`This action cannot be undone. This will permanently delete ${selectedCount === 1 ? "this product" : "these products"} and all associated variants.`}
        onConfirm={handleDelete}
        isDeleting={batchDeleteMutation.isPending}
      />
    </FloatingActionBar>
  );
};
