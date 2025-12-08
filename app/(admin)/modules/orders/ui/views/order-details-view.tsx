"use client";

import { useStockLocations } from "@/app/(admin)/modules/location/hooks/use-location-queries";
import { useGetOrder } from "@/app/(admin)/modules/orders/hooks/use-order-queries";
import { useCapturePayment } from "@/app/(admin)/modules/orders/hooks/use-payment-mutations";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { OrderActivityCard } from "../components/order-activity-card";
import { OrderCustomerCard } from "../components/order-customer-card";
import { OrderDetailsHeader } from "../components/order-details-header";
import { OrderFulfillmentCard } from "../components/order-fulfillment-card";
import { OrderSummaryCard } from "../components/order-summary-card";
import { OrderUnfulfilledItemsCard } from "../components/order-unfulfilled-items-card";

type OrderDetailsViewProps = {
  orderId: string;
};

export const OrderDetailsView = ({ orderId }: OrderDetailsViewProps) => {
  const { data, isLoading, isError } = useGetOrder(orderId, {
    fields:
      "+currency_code,*customer,*items,*fulfillments,*payment_collections,*payment_collections.payments",
  });
  const order = data?.order;

  const { data: stockLocationsData } = useStockLocations();
  const firstLocationId = stockLocationsData?.stock_locations?.[0]?.id;

  const capturePaymentMutation = useCapturePayment(orderId);

  // Find the first payment that can be captured (authorized but not captured)
  const uncapturedPayment = order?.payment_collections
    ?.flatMap((pc) => pc.payments || [])
    .find((p) => p.captured_at === null && p.canceled_at === null);

  const handleCapturePayment = () => {
    if (!uncapturedPayment) return;

    capturePaymentMutation.mutate(uncapturedPayment.id, {
      onSuccess: () => {
        toast.success("Payment captured successfully");
      },
      onError: (error) => {
        toast.error(`Failed to capture payment: ${error.message}`);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-6">
        <Loader2 className="text-muted-foreground size-6 animate-spin" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6">
        <h2 className="text-lg font-semibold">Error loading order</h2>
        <p className="text-muted-foreground text-sm">
          Could not find order with ID {orderId}
        </p>
      </div>
    );
  }

  return (
    <div className="@container flex flex-col gap-4">
      <OrderDetailsHeader order={order} />
      <div className="grid grid-cols-1 gap-4 @[768px]:grid-cols-[3fr_2fr]">
        {/* Primary column */}
        <div className="space-y-4 @[768px]:order-1">
          <OrderUnfulfilledItemsCard
            order={order}
            locationId={firstLocationId}
          />
          {order.fulfillments?.map((fulfillment, index) => (
            <OrderFulfillmentCard
              key={fulfillment.id}
              order={order}
              fulfillment={fulfillment}
              index={index + 1}
            />
          ))}
          <OrderSummaryCard
            subtotal={order.subtotal}
            shippingTotal={order.shipping_total}
            taxTotal={order.tax_total}
            total={order.total}
            paidTotal={(order.payment_collections || []).reduce(
              (acc, pc) =>
                acc + (pc.captured_amount || 0) - (pc.refunded_amount || 0),
              0,
            )}
            currencyCode={order.currency_code}
            paymentStatus={order.payment_status}
            onCapturePayment={
              uncapturedPayment ? handleCapturePayment : undefined
            }
            isCapturing={capturePaymentMutation.isPending}
          />
        </div>

        {/* Secondary column */}
        <div className="space-y-4 @[768px]:order-2">
          <OrderCustomerCard order={order} />
          <OrderActivityCard orderId={order.id} />
        </div>
      </div>
    </div>
  );
};
