"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { buttonVariants } from "@/app/components/ui/button";
import { Spinner } from "@/app/components/ui/spinner";
import { cn } from "@/app/lib/utils";

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
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isDeleting}
            className={cn(buttonVariants({ variant: "destructive" }))}
          >
            {isDeleting ? (
              <>
                <Spinner />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
