"use client";

import { DataTable } from "@/app/(admin)/dashboard/components/shared/data-table";
import { DataTablePagination } from "@/app/(admin)/dashboard/components/shared/data-table/pagination";
import { useListProducts } from "@/app/(admin)/modules/products/hooks/use-product-queries";
import { RowSelectionState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ProductsTableActions } from "./actions";
import { columns, ProductTableRow } from "./columns";

const PAGE_SIZE = 20;

export const ProductsTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { data, isLoading } = useListProducts({
    fields: "*categories",
    limit: PAGE_SIZE,
    offset: currentPage * PAGE_SIZE,
  });

  const tableData: ProductTableRow[] = useMemo(() => {
    if (!data?.products) return [];
    return data.products.map((product) => ({
      id: product.id,
      title: product.title,
      status: product.status as ProductTableRow["status"],
      thumbnail: product.thumbnail,
      category: product.categories?.[0],
      variants: product.variants || [],
    }));
  }, [data?.products]);

  // Get selected product IDs from the row selection state
  const selectedProductIds = useMemo(() => {
    return Object.keys(rowSelection).filter((id) => rowSelection[id]);
  }, [rowSelection]);

  const totalItems = data?.count ?? 0;
  const hasNextPage = (currentPage + 1) * PAGE_SIZE < totalItems;
  const hasPreviousPage = currentPage > 0;

  if (isLoading) {
    return <div className="p-4">Loading products...</div>;
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
      <ProductsTableActions selectedCount={selectedProductIds.length} />
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
