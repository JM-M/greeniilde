import { ColumnDef, RowData } from "@tanstack/react-table";
import { ReactNode } from "react";

/**
 * Module augmentation to extend TanStack Table's ColumnMeta with custom properties.
 * This allows type-safe access to custom meta properties on column definitions.
 */
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /**
     * Custom skeleton element to show when the table is loading.
     * Falls back to a default text skeleton if not provided.
     */
    skeleton?: ReactNode;
    /**
     * Additional className for the column header and cells.
     */
    className?: string;
  }
}

// Re-export ColumnDef for convenience
export type { ColumnDef };
