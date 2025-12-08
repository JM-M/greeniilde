"use client";

import { DataTable } from "@/app/(admin)/dashboard/components/shared/data-table";
import { DataTablePagination } from "@/app/(admin)/dashboard/components/shared/data-table/pagination";
import { RowSelectionState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { OrdersTableActions } from "./actions";
import { columns, OrderTableRow } from "./columns";

interface OrdersTableProps {
  data: OrderTableRow[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export const OrdersTable = ({
  data,
  currentPage,
  pageSize,
  totalItems,
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
}: OrdersTableProps) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const selectedOrderIds = useMemo(() => {
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
      />
      <OrdersTableActions selectedCount={selectedOrderIds.length} />
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
