"use client";

import { PageTitle } from "@/app/components/shared/page-title";
import { useOrder } from "@/app/modules/orders/hooks/use-order";
import { FulfillmentGroupsList } from "@/app/modules/orders/ui/components/fulfillment-groups/fulfillment-groups-list";
import { BillingAddressCard } from "@/app/modules/orders/ui/components/order-addresses/billing-address-card";
import { ShippingAddressCard } from "@/app/modules/orders/ui/components/order-addresses/shipping-address-card";
import { OrderItemsList } from "@/app/modules/orders/ui/components/order-items/order-items-list";
import { OrderNotes } from "@/app/modules/orders/ui/components/order-notes";
import { OrderStatusTimeline } from "@/app/modules/orders/ui/components/order-status-timeline";
import { DeliverySummaryCard } from "@/app/modules/orders/ui/components/order-summary/delivery-summary-card";
import { PaymentSummaryCard } from "@/app/modules/orders/ui/components/order-summary/payment-summary-card";
import { ShippingSummaryCard } from "@/app/modules/orders/ui/components/order-summary/shipping-summary-card";
import { OrderTotals } from "@/app/modules/orders/ui/components/order-totals";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

export const OrderDetailsView = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, error } = useOrder(id);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
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

  const statusLabel = order.fulfillment_status; // Or map to a display label
  const orderDate = new Date(order.created_at).toLocaleDateString();
  const totalFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: order.currency_code,
  }).format(order.total / 100);

  return (
    <div className="view-container">
      <PageTitle
        title={`Order #${order.display_id}`}
        subtitle={`${statusLabel} • ${orderDate} • ${totalFormatted}`}
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
