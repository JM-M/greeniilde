"use client";

import { DeleteConfirmationDialog } from "@/app/(admin)/dashboard/components/shared/delete-confirmation-dialog";
import { FloatingActionBar } from "@/app/(admin)/dashboard/components/shared/floating-action-bar";
import { useBatchDeleteCategories } from "@/app/(admin)/modules/categories/hooks/use-category-actions";
import { Button } from "@/app/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CategoriesTableActionsProps {
  selectedIds: string[];
  onDeleteSuccess?: () => void;
}

export const CategoriesTableActions = ({
  selectedIds,
  onDeleteSuccess,
}: CategoriesTableActionsProps) => {
  const selectedCount = selectedIds.length;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const batchDeleteMutation = useBatchDeleteCategories({
    onSuccess: () => {
      toast.success(
        `${selectedCount} ${selectedCount === 1 ? "category" : "categories"} deleted successfully`,
      );
      setIsDialogOpen(false);
      onDeleteSuccess?.();
    },
    onError: (error) => {
      toast.error(`Failed to delete categories: ${error.message}`);
    },
  });

  const handleDelete = () => {
    batchDeleteMutation.mutate(selectedIds);
  };

  return (
    <FloatingActionBar visible={selectedCount > 0}>
      <span className="text-muted-foreground px-2 text-sm">
        {selectedCount} {selectedCount === 1 ? "category" : "categories"}{" "}
        selected
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
        title={`Delete ${selectedCount} ${selectedCount === 1 ? "category" : "categories"}?`}
        description={`This action cannot be undone. This will permanently delete ${selectedCount === 1 ? "this category" : "these categories"}.`}
        onConfirm={handleDelete}
        isDeleting={batchDeleteMutation.isPending}
      />
    </FloatingActionBar>
  );
};
