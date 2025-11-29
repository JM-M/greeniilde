"use client";

import { PageTitle } from "@/app/components/shared/page-title";
import { Skeleton } from "@/app/components/ui/skeleton";
import { convertToLocale } from "@/app/lib/utils";
import { useOrder } from "@/app/modules/orders/hooks/use-order";
import {
  FulfillmentGroupsList,
  FulfillmentGroupsListSkeleton,
} from "@/app/modules/orders/ui/components/fulfillment-groups/fulfillment-groups-list";
import {
  BillingAddressCard,
  BillingAddressCardSkeleton,
} from "@/app/modules/orders/ui/components/order-addresses/billing-address-card";
import {
  ShippingAddressCard,
  ShippingAddressCardSkeleton,
} from "@/app/modules/orders/ui/components/order-addresses/shipping-address-card";
import {
  OrderItemsList,
  OrderItemsListSkeleton,
} from "@/app/modules/orders/ui/components/order-items/order-items-list";
import {
  OrderNotes,
  OrderNotesSkeleton,
} from "@/app/modules/orders/ui/components/order-notes";
import {
  OrderStatusTimeline,
  OrderStatusTimelineSkeleton,
} from "@/app/modules/orders/ui/components/order-status-timeline";
import {
  DeliverySummaryCard,
  DeliverySummaryCardSkeleton,
} from "@/app/modules/orders/ui/components/order-summary/delivery-summary-card";
import {
  PaymentSummaryCard,
  PaymentSummaryCardSkeleton,
} from "@/app/modules/orders/ui/components/order-summary/payment-summary-card";
import {
  ShippingSummaryCard,
  ShippingSummaryCardSkeleton,
} from "@/app/modules/orders/ui/components/order-summary/shipping-summary-card";
import {
  OrderTotals,
  OrderTotalsSkeleton,
} from "@/app/modules/orders/ui/components/order-totals";
import { formatDistanceToNow } from "date-fns";
import { DotIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { OrderStatusBadge } from "../components/order-status-badge";

export const OrderDetailsView = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, error } = useOrder(id);

  if (isLoading) {
    return <OrderDetailsViewSkeleton />;
  }

  if (error || !order) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-destructive">
          Failed to load order details. Please try again later.
        </p>
      </div>
    );
  }

  const orderDate = formatDistanceToNow(new Date(order.created_at), {
    addSuffix: true,
  });
  const totalFormatted = convertToLocale({
    amount: order.total,
    currencyCode: order.currency_code,
  });

  return (
    <div className="view-container">
      <PageTitle
        title={`Order #${order.display_id}`}
        subtitle={
          <div className="flex items-center">
            <OrderStatusBadge status={order.status} />
            <DotIcon />
            <span>{orderDate}</span>
            <DotIcon />
            <span>{totalFormatted}</span>
          </div>
        }
      />
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <OrderStatusTimeline order={order} />
        </div>
        <div>
          <OrderTotals order={order} className="h-full" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <ShippingSummaryCard order={order} />
        <DeliverySummaryCard order={order} />
        <PaymentSummaryCard order={order} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <FulfillmentGroupsList order={order} />
        </div>
        <div>
          <OrderItemsList
            items={order.items || []}
            currencyCode={order.currency_code}
            className="h-full"
          />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <ShippingAddressCard order={order} />
        <BillingAddressCard order={order} />
      </div>
      <div>
        <OrderNotes order={order} />
      </div>
    </div>
  );
};

export function OrderDetailsViewSkeleton() {
  return (
    <div className="view-container">
      <div>
        <Skeleton className="h-8 w-48" />
        <div className="mt-1 flex items-center gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <DotIcon className="text-muted-foreground" />
          <Skeleton className="h-4 w-32" />
          <DotIcon className="text-muted-foreground" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <OrderStatusTimelineSkeleton />
        </div>
        <div>
          <OrderTotalsSkeleton />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <ShippingSummaryCardSkeleton />
        <DeliverySummaryCardSkeleton />
        <PaymentSummaryCardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <FulfillmentGroupsListSkeleton />
        </div>
        <div>
          <OrderItemsListSkeleton />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <ShippingAddressCardSkeleton />
        <BillingAddressCardSkeleton />
      </div>
      <div>
        <OrderNotesSkeleton />
      </div>
    </div>
  );
}
