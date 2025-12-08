"use client";

import { DataTable } from "@/app/(admin)/dashboard/components/shared/data-table";
import { DataTablePagination } from "@/app/(admin)/dashboard/components/shared/data-table/pagination";
import { RowSelectionState } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { CategoriesTableActions } from "./actions";
import { CategoryTableRow, columns } from "./columns";
import { CategoryTableHeader } from "./header";

interface CategoriesTableProps {
  data: CategoryTableRow[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
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
  searchTerm,
  onSearchChange,
  isLoading,
}: CategoriesTableProps) => {
  const router = useRouter();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const selectedCategoryIds = useMemo(() => {
    return Object.keys(rowSelection).filter((id) => rowSelection[id]);
  }, [rowSelection]);

  return (
    <div className="space-y-3">
      <CategoryTableHeader value={searchTerm} onChange={onSearchChange} />
      <DataTable
        columns={columns}
        data={data}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        getRowId={(row) => row.id}
        isLoading={isLoading}
        onRowClick={(row) => router.push(`/dashboard/categories/${row.id}`)}
        getRowClassName={() => "cursor-pointer"}
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
