"use client";

import { PageTitle } from "@/app/components/shared/page-title";
import { Button } from "@/app/components/ui/button";
import {
  OrdersList,
  OrdersListSkeleton,
} from "@/app/modules/orders/ui/components/orders-list";
import { Loader2 } from "lucide-react";
import { useInfiniteOrders } from "../../hooks/use-order-queries";

export const OrdersViewClient = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteOrders(10, {
      select: (data) => data.pages.flatMap((page) => (page ? page.orders : [])),
    });

  return (
    <div className="view-container">
      <PageTitle title="Orders" />
      <div className="mt-4">
        {isLoading ? (
          <OrdersListSkeleton />
        ) : (
          <OrdersList orders={data || []} />
        )}
        {hasNextPage && (
          <div className="mt-8 flex justify-center">
            <Button
              variant="secondary"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export const OrdersViewClientSkeleton = () => {
  return (
    <div className="view-container">
      <PageTitle title="Orders" />
      <div className="mt-4">
        <OrdersListSkeleton />
      </div>
    </div>
  );
};
