"use client";

import { DataTable } from "@/app/(admin)/dashboard/components/shared/data-table";
import { DataTablePagination } from "@/app/(admin)/dashboard/components/shared/data-table/pagination";
import { useListOrders } from "@/app/(admin)/modules/orders/hooks/use-order-queries";
import { RowSelectionState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { OrdersTableActions } from "./actions";
import { columns, OrderTableRow } from "./columns";

const PAGE_SIZE = 20;

export const OrdersTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { data, isLoading } = useListOrders({
    fields: "*customer,*items",
    limit: PAGE_SIZE,
    offset: currentPage * PAGE_SIZE,
  });

  const tableData: OrderTableRow[] = useMemo(() => {
    if (!data?.orders) return [];
    return data.orders.map((order) => ({
      id: order.id,
      displayId: order.display_id ?? 0,
      createdAt:
        typeof order.created_at === "string"
          ? order.created_at
          : order.created_at.toISOString(),
      customer: order.customer,
      email: order.email ?? "",
      itemsCount: order.items?.length || 0,
      total: order.total,
      currencyCode: order.currency_code,
      paymentStatus: order.payment_status,
      fulfillmentStatus: order.fulfillment_status,
    }));
  }, [data?.orders]);

  const selectedOrderIds = useMemo(() => {
    return Object.keys(rowSelection).filter((id) => rowSelection[id]);
  }, [rowSelection]);

  const totalItems = data?.count ?? 0;
  const hasNextPage = (currentPage + 1) * PAGE_SIZE < totalItems;
  const hasPreviousPage = currentPage > 0;

  if (isLoading) {
    return <div className="p-4">Loading orders...</div>;
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
      <OrdersTableActions selectedCount={selectedOrderIds.length} />
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
