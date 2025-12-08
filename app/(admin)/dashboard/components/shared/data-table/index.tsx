"use client";

import {
  ColumnDef,
  OnChangeFn,
  Row,
  RowSelectionState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { DataTableSkeleton } from "./skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  renderAboveTable?: React.ReactNode;
  renderBelowTable?: React.ReactNode;
  getRowClassName?: (row: Row<TData>) => string | undefined;
  onRowClick?: (row: Row<TData>) => void;
  getSubRows?: (row: TData) => TData[] | undefined;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string;
  /**
   * Whether the table is in a loading state
   */
  isLoading?: boolean;
  /**
   * Number of skeleton rows to show when loading. Defaults to 5.
   */
  loadingRowCount?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  renderAboveTable,
  renderBelowTable,
  getRowClassName,
  onRowClick,
  getSubRows,
  rowSelection,
  onRowSelectionChange,
  getRowId,
  isLoading = false,
  loadingRowCount = 5,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [expanded, setExpanded] = React.useState({});
  const [internalRowSelection, setInternalRowSelection] =
    React.useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    onRowSelectionChange: onRowSelectionChange || setInternalRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows,
    getRowId,
    state: {
      sorting,
      expanded,
      rowSelection: rowSelection || internalRowSelection,
    },
  });

  const renderTableBody = () => {
    if (isLoading) {
      return <DataTableSkeleton columns={columns} rowCount={loadingRowCount} />;
    }

    if (!table.getRowModel().rows?.length) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      );
    }

    return table.getRowModel().rows.map((row) => (
      <TableRow
        key={row.id}
        className={getRowClassName?.(row)}
        data-state={row.getIsSelected() && "selected"}
        onClick={() => onRowClick?.(row)}
        role={onRowClick ? "button" : undefined}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell
            key={cell.id}
            className={(cell.column.columnDef.meta as any)?.className}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <div className="w-full space-y-3">
      {renderAboveTable}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted/30">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={
                        (header.column.columnDef.meta as any)?.className
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </div>
      {renderBelowTable}
    </div>
  );
}
