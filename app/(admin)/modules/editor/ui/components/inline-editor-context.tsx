"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface InlineEditorContextValue {
  /** Currently active field ID in format "{componentId}:{propName}" */
  activeFieldId: string | null;
  /** Set the active field by ID */
  setActiveField: (id: string | null) => void;
  /** Register a sidebar field's DOM element ref */
  registerSidebarFieldRef: (id: string, ref: HTMLElement | null) => void;
  /** Scroll a sidebar field into view */
  scrollToSidebarField: (id: string) => void;
  /** Register an editable text's DOM element ref */
  registerEditableTextRef: (id: string, ref: HTMLElement | null) => void;
  /** Scroll an editable text into view */
  scrollToEditableText: (id: string) => void;
}

const InlineEditorContext = createContext<InlineEditorContextValue | null>(
  null,
);

export function InlineEditorProvider({ children }: { children: ReactNode }) {
  const [activeFieldId, setActiveFieldId] = useState<string | null>(null);
  const sidebarFieldRefs = useRef<Map<string, HTMLElement>>(new Map());
  const editableTextRefs = useRef<Map<string, HTMLElement>>(new Map());

  const setActiveField = useCallback((id: string | null) => {
    setActiveFieldId(id);
  }, []);

  const registerSidebarFieldRef = useCallback(
    (id: string, ref: HTMLElement | null) => {
      if (ref) {
        sidebarFieldRefs.current.set(id, ref);
      } else {
        sidebarFieldRefs.current.delete(id);
      }
    },
    [],
  );

  const scrollToSidebarField = useCallback((id: string) => {
    const element = sidebarFieldRefs.current.get(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const registerEditableTextRef = useCallback(
    (id: string, ref: HTMLElement | null) => {
      if (ref) {
        editableTextRefs.current.set(id, ref);
      } else {
        editableTextRefs.current.delete(id);
      }
    },
    [],
  );

  const scrollToEditableText = useCallback((id: string) => {
    const element = editableTextRefs.current.get(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const value = useMemo(
    () => ({
      activeFieldId,
      setActiveField,
      registerSidebarFieldRef,
      scrollToSidebarField,
      registerEditableTextRef,
      scrollToEditableText,
    }),
    [
      activeFieldId,
      setActiveField,
      registerSidebarFieldRef,
      scrollToSidebarField,
      registerEditableTextRef,
      scrollToEditableText,
    ],
  );

  return (
    <InlineEditorContext.Provider value={value}>
      {children}
    </InlineEditorContext.Provider>
  );
}

export function useInlineEditorContext() {
  const context = useContext(InlineEditorContext);
  if (!context) {
    throw new Error(
      "useInlineEditorContext must be used within an InlineEditorProvider",
    );
  }
  return context;
}

/** Helper to generate field ID from componentId and propName */
export function getFieldId(componentId: string, propName: string): string {
  return `${componentId}:${propName}`;
}
