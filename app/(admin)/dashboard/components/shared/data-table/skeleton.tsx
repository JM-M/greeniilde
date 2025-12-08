import { Skeleton } from "@/app/components/ui/skeleton";
import { TableCell, TableRow } from "@/app/components/ui/table";
import { ColumnDef } from "@tanstack/react-table";
import "./types"; // Import type augmentation

interface DataTableSkeletonProps<TData, TValue> {
  /**
   * Column definitions - used to read custom skeleton from meta
   */
  columns: ColumnDef<TData, TValue>[];
  /**
   * Number of skeleton rows to show. Defaults to 5.
   */
  rowCount?: number;
}

/**
 * A loading skeleton for DataTable that renders placeholder rows.
 * Each cell uses the column's meta.skeleton if defined, otherwise falls back to a default.
 */
export function DataTableSkeleton<TData, TValue>({
  columns,
  rowCount = 5,
}: DataTableSkeletonProps<TData, TValue>) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {columns.map((column, colIndex) => (
            <TableCell key={colIndex} className={column.meta?.className}>
              {column.meta?.skeleton ?? <Skeleton className="h-4 w-24" />}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
