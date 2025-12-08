"use client";

import { DataTable } from "@/app/(admin)/dashboard/components/shared/data-table";
import { DataTablePagination } from "@/app/(admin)/dashboard/components/shared/data-table/pagination";
import { RowSelectionState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { CategoriesTableActions } from "./actions";
import { CategoryTableRow, columns } from "./columns";

interface CategoriesTableProps {
  data: CategoryTableRow[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  isLoading?: boolean;
}

export const CategoriesTable = ({
  data,
  currentPage,
  pageSize,
  totalItems,
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
  isLoading,
}: CategoriesTableProps) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const selectedCategoryIds = useMemo(() => {
    return Object.keys(rowSelection).filter((id) => rowSelection[id]);
  }, [rowSelection]);

  return (
    <div className="space-y-3">
      <DataTable
        columns={columns}
        data={data}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        getRowId={(row) => row.id}
        isLoading={isLoading}
      />
      <CategoriesTableActions
        selectedIds={selectedCategoryIds}
        onDeleteSuccess={() => setRowSelection({})}
      />
      <DataTablePagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onNext={onNextPage}
        onPrevious={onPreviousPage}
        nextDisabled={!hasNextPage}
        previousDisabled={!hasPreviousPage}
      />
    </div>
  );
};
