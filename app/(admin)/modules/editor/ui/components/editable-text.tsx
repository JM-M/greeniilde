"use client";

import { createUsePuck, registerOverlayPortal } from "@measured/puck";
import "@measured/puck/puck.css";
import { useEffect, useRef } from "react";
import { getFieldId, useInlineEditorContext } from "./inline-editor-context";

// Create usePuck with selector support
const usePuck = createUsePuck();

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

  // Use selectors to only get the specific functions we need
  const dispatch = usePuck((s) => s.dispatch);
  const getSelectorForId = usePuck((s) => s.getSelectorForId);
  const getItemById = usePuck((s) => s.getItemById);

  // Use inline editor context for sidebar field communication
  const { setActiveField, scrollToSidebarField, registerEditableTextRef } =
    useInlineEditorContext();
  const fieldId = getFieldId(componentId, propName);

  // Register this editable text ref for scroll-to-view from sidebar
  useEffect(() => {
    registerEditableTextRef(fieldId, ref.current);
    return () => registerEditableTextRef(fieldId, null);
  }, [fieldId, registerEditableTextRef]);

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
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onClickCapture={(e) => {
        e.preventDefault();
        e.stopPropagation();

        // Get the selector for this component and set it to maintain sidebar focus
        const selector = getSelectorForId(componentId);
        if (selector) {
          dispatch({
            type: "setUi",
            ui: {
              itemSelector: selector,
            },
          });
        }

        // Set active field for sidebar highlighting
        setActiveField(fieldId);
        scrollToSidebarField(fieldId);
      }}
      onBlur={() => {
        // Clear active field when inline text loses focus
        setActiveField(null);
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
    />
  );
};
