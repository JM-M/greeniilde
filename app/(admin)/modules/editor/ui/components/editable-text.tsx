"use client";

import { registerOverlayPortal, usePuck } from "@measured/puck";
import "@measured/puck/puck.css";
import { useEffect, useRef } from "react";

export const EditableText = ({
  value,
  propName,
  componentId,
}: {
  value: string;
  propName: string;
  componentId: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  // Use public usePuck API
  const { dispatch, getSelectorForId, getItemById } = usePuck();

  useEffect(() => {
    if (ref.current) {
      // Only update the DOM if the value has changed from outside
      // This prevents cursor jumping during user typing
      if (value !== ref.current.textContent) {
        ref.current.textContent = value;
      }

      const cleanupPortal = registerOverlayPortal(ref.current);

      const handleInput = async () => {
        if (!ref.current) return;

        const newValue = ref.current.textContent || "";

        // Get the current component data
        const node = getItemById(componentId);
        if (!node) {
          console.error(`Node not found for componentId: ${componentId}`);
          return;
        }

        // Get selector (zone and index) for this component
        const selector = getSelectorForId(componentId);
        if (!selector) {
          console.error(`Selector not found for componentId: ${componentId}`);
          return;
        }

        // Update props with new value
        const newProps = { ...node.props, [propName]: newValue };

        // Dispatch replace action
        dispatch({
          type: "replace",
          data: { ...node, props: newProps },
          destinationIndex: selector.index,
          destinationZone: selector.zone,
          recordHistory: true,
        });
      };

      ref.current.addEventListener("input", handleInput);

      return () => {
        ref.current?.removeEventListener("input", handleInput);
        cleanupPortal?.();
      };
    }
  }, [componentId, propName, value, dispatch, getSelectorForId, getItemById]);

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
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
    />
  );
};
