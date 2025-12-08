"use client";

import { cn } from "@/app/lib/utils";
import { PropsWithChildren } from "react";

// Matches SIDEBAR_WIDTH in sidebar.tsx
const SIDEBAR_WIDTH_REM = 16;

interface FloatingActionBarProps extends PropsWithChildren {
  /**
   * Controls visibility and animation state
   */
  visible: boolean;
  /**
   * Position of the bar (top or bottom). Defaults to bottom.
   */
  position?: "top" | "bottom";
  /**
   * Distance from screen edge in rem units. Defaults to 1.5 (6 in Tailwind).
   */
  offset?: number;
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
 * A floating action bar that appears at the top or bottom center of the sidebar inset.
 * Slides in from the specified direction when visible.
 */
export const FloatingActionBar = ({
  visible,
  position = "bottom",
  offset = 1.5,
  slideDistance = 1,
  className,
  children,
}: FloatingActionBarProps) => {
  const isTop = position === "top";
  const slideY = visible ? (isTop ? slideDistance : -slideDistance) : 0;

  // Calculate left position: on desktop, center relative to SidebarInset (screen minus sidebar)
  // On mobile (< md), center relative to full screen
  const sidebarOffsetPx = (SIDEBAR_WIDTH_REM * 16) / 2; // Half sidebar width in px

  return (
    <div
      className={cn(
        "fixed z-50 transition-all duration-300 ease-out",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
        className,
      )}
      style={{
        left: "50%",
        [isTop ? "top" : "bottom"]: `${offset}rem`,
        transform: `translateX(calc(-50% + ${sidebarOffsetPx}px)) translateY(${slideY}rem)`,
      }}
    >
      <div className="bg-background/95 supports-backdrop-filter:bg-background/80 flex w-fit items-center gap-2 rounded-lg border p-1 shadow-lg backdrop-blur">
        {children}
      </div>
    </div>
  );
};
