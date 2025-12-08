"use client";

import { ConfirmationDialog } from "./confirmation-dialog";

interface DeleteConfirmationDialogProps {
  /**
   * Trigger element that opens the dialog
   */
  trigger: React.ReactNode;
  /**
   * Title of the confirmation dialog
   */
  title?: string;
  /**
   * Description explaining what will be deleted
   */
  description?: string;
  /**
   * Callback when delete is confirmed
   */
  onConfirm: () => void;
  /**
   * Whether the delete action is in progress
   */
  isDeleting?: boolean;
  /**
   * Controls the open state externally (optional)
   */
  open?: boolean;
  /**
   * Callback when open state changes (optional)
   */
  onOpenChange?: (open: boolean) => void;
}

export const DeleteConfirmationDialog = ({
  trigger,
  title = "Are you sure?",
  description = "This action cannot be undone. This will permanently delete this item.",
  onConfirm,
  isDeleting = false,
  open,
  onOpenChange,
}: DeleteConfirmationDialogProps) => {
  return (
    <ConfirmationDialog
      trigger={trigger}
      title={title}
      description={description}
      confirmText="Delete"
      confirmingText="Deleting..."
      confirmVariant="destructive"
      onConfirm={onConfirm}
      isLoading={isDeleting}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
};
