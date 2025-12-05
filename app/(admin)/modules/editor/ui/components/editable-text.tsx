"use client";

import { registerOverlayPortal } from "@measured/puck";
import "@measured/puck/puck.css";
import { useEffect, useRef } from "react";

export const EditableText = ({
  value,
  onChange,
}: {
  value: string;
  onChange?: (value: string) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // Register the element as an overlay portal so it can be interacted with
      registerOverlayPortal(ref.current);
    }
  }, []);

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => {
        // Update Puck state when user finishes editing (onBlur)
        onChange?.(e.currentTarget.textContent || "");
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
      style={{
        outline: "2px dashed rgba(99, 102, 241, 0.5)",
        outlineOffset: "4px",
        cursor: "text",
        minHeight: "1em",
        display: "inline-block",
      }}
    >
      {value}
    </span>
  );
};
