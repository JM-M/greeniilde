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
import { type VariantProps } from "class-variance-authority";

interface ConfirmationDialogProps {
  /**
   * Trigger element that opens the dialog
   */
  trigger: React.ReactNode;
  /**
   * Title of the confirmation dialog
   */
  title?: string;
  /**
   * Description explaining the action
   */
  description?: string;
  /**
   * Text for the confirm button
   */
  confirmText?: string;
  /**
   * Text shown while action is in progress
   */
  confirmingText?: string;
  /**
   * Button variant for the confirm button
   */
  confirmVariant?: VariantProps<typeof buttonVariants>["variant"];
  /**
   * Callback when action is confirmed
   */
  onConfirm: () => void;
  /**
   * Whether the action is in progress
   */
  isLoading?: boolean;
  /**
   * Controls the open state externally (optional)
   */
  open?: boolean;
  /**
   * Callback when open state changes (optional)
   */
  onOpenChange?: (open: boolean) => void;
}

export const ConfirmationDialog = ({
  trigger,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  confirmingText = "Confirming...",
  confirmVariant = "default",
  onConfirm,
  isLoading = false,
  open,
  onOpenChange,
}: ConfirmationDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isLoading}
            className={cn(buttonVariants({ variant: confirmVariant }))}
          >
            {isLoading ? (
              <>
                <Spinner />
                {confirmingText}
              </>
            ) : (
              confirmText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
