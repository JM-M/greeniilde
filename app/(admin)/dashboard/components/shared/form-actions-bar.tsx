"use client";

import { FloatingActionBar } from "@/app/(admin)/dashboard/components/shared/floating-action-bar";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";

interface FormActionsBarProps {
  /**
   * Whether to show the bar (typically when form is dirty)
   */
  visible: boolean;
  /**
   * Handler for Cancel button
   */
  onCancel: () => void;
  /**
   * Handler for Save button
   */
  onSave: () => void;
  /**
   * Whether the form is currently saving
   */
  isSaving?: boolean;
  /**
   * Position of the bar (top or bottom). Defaults to top.
   */
  position?: "top" | "bottom";
  /**
   * Slide distance in rem units when hidden. Defaults to 1 (4 in Tailwind).
   */
  slideDistance?: number;
  /**
   * Additional className for the container
   */
  className?: string;
}

/**
 * A floating action bar for forms that shows "Unsaved changes" with Cancel and Save buttons.
 * Uses FloatingActionBar internally.
 */
export const FormActionsBar = ({
  visible,
  onCancel,
  onSave,
  isSaving = false,
  position = "top",
  slideDistance,
  className,
}: FormActionsBarProps) => {
  return (
    <FloatingActionBar
      visible={visible}
      position={position}
      slideDistance={slideDistance}
      className={cn("bg-muted/40", className)}
    >
      <span className="text-muted-foreground px-2 text-sm">
        Unsaved changes
      </span>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </Button>
        <Button size="sm" onClick={onSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </FloatingActionBar>
  );
};
