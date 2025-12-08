"use client";

import { useListOrders } from "@/app/(admin)/modules/orders/hooks/use-order-queries";
import { useMemo, useState } from "react";
import { OrdersTable } from "../components/orders-table";
import { OrderTableRow } from "../components/orders-table/columns";

const PAGE_SIZE = 20;

export const OrdersView = () => {
  const [currentPage, setCurrentPage] = useState(0);

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

  const totalItems = data?.count ?? 0;
  const hasNextPage = (currentPage + 1) * PAGE_SIZE < totalItems;
  const hasPreviousPage = currentPage > 0;

  return (
    <OrdersTable
      data={tableData}
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      totalItems={totalItems}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      onNextPage={() => setCurrentPage((p) => p + 1)}
      onPreviousPage={() => setCurrentPage((p) => p - 1)}
      isLoading={isLoading}
    />
  );
};
