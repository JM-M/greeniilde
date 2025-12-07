"use client";

import { cn } from "@/app/lib/utils";
import { useEffect, useRef, type ReactNode } from "react";
import { getFieldId, useInlineEditorContext } from "./inline-editor-context";
import "./sidebar-field.css";

interface SidebarFieldWrapperProps {
  /** The component ID this field belongs to */
  componentId: string;
  /** The prop/field name */
  propName: string;
  /** The field content to render */
  children: ReactNode;
}

export function SidebarFieldWrapper({
  componentId,
  propName,
  children,
}: SidebarFieldWrapperProps) {
  const { activeFieldId, registerSidebarFieldRef, scrollToEditableText } =
    useInlineEditorContext();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fieldId = getFieldId(componentId, propName);
  const isHighlighted = activeFieldId === fieldId;

  // Register/unregister this field's ref with the context
  useEffect(() => {
    registerSidebarFieldRef(fieldId, wrapperRef.current);
    return () => registerSidebarFieldRef(fieldId, null);
  }, [fieldId, registerSidebarFieldRef]);

  const handleClick = () => {
    // Scroll the corresponding editable text into view
    scrollToEditableText(fieldId);
  };

  return (
    <div
      ref={wrapperRef}
      // className={`sidebar-field-wrapper ${isHighlighted ? "sidebar-field-wrapper--highlighted" : ""}`}
      className={cn("sidebar-field-wrapper", {
        "sidebar-field-wrapper--highlighted": isHighlighted,
      })}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
