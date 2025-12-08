"use client";

import { DataTable } from "@/app/(admin)/dashboard/components/shared/data-table";
import { DataTablePagination } from "@/app/(admin)/dashboard/components/shared/data-table/pagination";
import { useListCategories } from "@/app/(admin)/modules/categories/hooks/use-category-queries";
import { RowSelectionState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { CategoriesTableActions } from "./actions";
import { CategoryTableRow, columns } from "./columns";

const PAGE_SIZE = 20;

export const CategoriesTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { data, isLoading } = useListCategories({
    fields: "+products.id",
    limit: PAGE_SIZE,
    offset: currentPage * PAGE_SIZE,
  });

  const tableData: CategoryTableRow[] = useMemo(() => {
    if (!data?.product_categories) return [];
    return data.product_categories.map((category) => ({
      id: category.id,
      name: category.name,
      handle: category.handle,
      isActive: category.is_active,
      isInternal: category.is_internal,
      productCount: category.products?.length || 0,
    }));
  }, [data?.product_categories]);

  const selectedCategoryIds = useMemo(() => {
    return Object.keys(rowSelection).filter((id) => rowSelection[id]);
  }, [rowSelection]);

  const totalItems = data?.count ?? 0;
  const hasNextPage = (currentPage + 1) * PAGE_SIZE < totalItems;
  const hasPreviousPage = currentPage > 0;

  if (isLoading) {
    return <div className="p-4">Loading categories...</div>;
  }

  return (
    <div className="space-y-3">
      <DataTable
        columns={columns}
        data={tableData}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        getRowId={(row) => row.id}
      />
      <CategoriesTableActions selectedCount={selectedCategoryIds.length} />
      <DataTablePagination
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
        totalItems={totalItems}
        onNext={() => setCurrentPage((p) => p + 1)}
        onPrevious={() => setCurrentPage((p) => p - 1)}
        nextDisabled={!hasNextPage}
        previousDisabled={!hasPreviousPage}
      />
    </div>
  );
};
