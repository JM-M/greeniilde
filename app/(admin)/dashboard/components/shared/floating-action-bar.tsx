"use client";

import { cn } from "@/app/lib/utils";
import { PropsWithChildren } from "react";

interface FloatingActionBarProps extends PropsWithChildren {
  /**
   * Controls visibility and animation state
   */
  visible: boolean;
  /**
   * Additional className for the container
   */
  className?: string;
}

/**
 * A floating action bar that appears at the bottom center of the sidebar inset.
 * Slides in from the bottom when visible.
 */
export const FloatingActionBar = ({
  visible,
  className,
  children,
}: FloatingActionBarProps) => {
  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ease-out",
        // Adjust for sidebar - center within the SidebarInset area
        "md:left-[calc(50%+var(--sidebar-width)/2)]",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
        className,
      )}
    >
      <div className="bg-background/95 supports-backdrop-filter:bg-background/80 flex w-fit items-center gap-2 rounded-lg border p-1 shadow-lg backdrop-blur">
        {children}
      </div>
    </div>
  );
};
