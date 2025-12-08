"use client";

import { DataTable } from "@/app/(admin)/dashboard/components/shared/data-table";
import { DataTablePagination } from "@/app/(admin)/dashboard/components/shared/data-table/pagination";
import { Row, RowSelectionState } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ProductsTableActions } from "./actions";
import { columns, ProductTableRow } from "./columns";
import { ProductTableHeader } from "./header";

interface ProductsTableProps {
  data: ProductTableRow[];
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

export const ProductsTable = ({
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
}: ProductsTableProps) => {
  const router = useRouter();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const selectedProductIds = useMemo(() => {
    return Object.keys(rowSelection).filter((id) => rowSelection[id]);
  }, [rowSelection]);

  const handleRowClick = (row: Row<ProductTableRow>) => {
    router.push(`/dashboard/products/${row.original.id}`);
  };

  return (
    <div className="space-y-3">
      <ProductTableHeader value={searchTerm} onChange={onSearchChange} />
      <DataTable
        columns={columns}
        data={data}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        getRowId={(row) => row.id}
        onRowClick={handleRowClick}
        getRowClassName={() => "cursor-pointer"}
        isLoading={isLoading}
      />
      <ProductsTableActions
        selectedIds={selectedProductIds}
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
