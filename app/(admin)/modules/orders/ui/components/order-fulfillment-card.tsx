"use client";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { cn } from "@/app/lib/utils";
import {
  FulfillmentCardStatusBadge,
  type FulfillmentCardStatus,
} from "@/app/modules/orders/ui/components/fulfillment-status-badge";
import { HttpTypes } from "@medusajs/types";
import { toast } from "sonner";
import {
  useCreateShipment,
  useMarkAsDelivered,
} from "../../hooks/use-fulfillment-mutations";
import { OrderFulfillmentItem } from "./order-fulfillment-item";

type OrderFulfillmentCardProps = {
  order: HttpTypes.AdminOrder;
  fulfillment: NonNullable<HttpTypes.AdminOrder["fulfillments"]>[number];
  index: number;
  className?: string;
};

export const OrderFulfillmentCard = ({
  order,
  fulfillment,
  index,
  className,
}: OrderFulfillmentCardProps) => {
  const fulfillmentItems = ((fulfillment as any).items ||
    (fulfillment as any).data?.items ||
    []) as HttpTypes.AdminFulfillmentItem[];
  const orderItems = order.items || [];

  const createShipmentMutation = useCreateShipment(order.id);
  const markAsDeliveredMutation = useMarkAsDelivered(order.id);

  // Map fulfillment items to order items with details
  const items = fulfillmentItems
    .map((fItem) => {
      const orderItem = orderItems.find(
        (item) => item.id === fItem.line_item_id,
      );

      if (!orderItem) return null;

      return {
        id: orderItem.id,
        title: orderItem.title,
        sku: orderItem.variant_sku || orderItem.variant_title || "N/A",
        quantity: fItem.quantity,
        thumbnail: orderItem.thumbnail,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (items.length === 0) {
    return null;
  }

  const createdDate = new Date(fulfillment.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  const isCanceled = !!fulfillment.canceled_at;
  const isShipped = !!fulfillment.shipped_at;
  const isDelivered = !!fulfillment.delivered_at;

  const handleMarkAsShipped = () => {
    createShipmentMutation.mutate(fulfillment.id, {
      onSuccess: () => {
        toast.success("Fulfillment marked as shipped");
      },
      onError: (error) => {
        toast.error(`Failed to mark as shipped: ${error.message}`);
      },
    });
  };

  const handleMarkAsDelivered = () => {
    markAsDeliveredMutation.mutate(fulfillment.id, {
      onSuccess: () => {
        toast.success("Fulfillment marked as delivered");
      },
      onError: (error) => {
        toast.error(`Failed to mark as delivered: ${error.message}`);
      },
    });
  };

  // Determine status
  let status: FulfillmentCardStatus = "pending";
  if (isCanceled) {
    status = "canceled";
  } else if (isDelivered) {
    status = "delivered";
  } else if (isShipped) {
    status = "shipped";
  }

  const showActions = !isCanceled && !isDelivered;
  const isLoading =
    createShipmentMutation.isPending || markAsDeliveredMutation.isPending;

  return (
    <Card className={cn("gap-4", className)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex flex-col gap-1">
          <CardTitle className="flex items-center gap-2 text-base">
            Fulfillment #{index}
          </CardTitle>
          <p className="text-muted-foreground text-sm">Created {createdDate}</p>
        </div>
        <FulfillmentCardStatusBadge status={status} />
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <OrderFulfillmentItem key={item.id} item={item} />
        ))}
      </CardContent>
      {showActions && (
        <CardFooter className="justify-end gap-2">
          {!isShipped && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleMarkAsShipped}
              disabled={isLoading}
            >
              {createShipmentMutation.isPending
                ? "Marking..."
                : "Mark as shipped"}
            </Button>
          )}
          <Button
            size="sm"
            onClick={handleMarkAsDelivered}
            disabled={isLoading}
          >
            {markAsDeliveredMutation.isPending
              ? "Marking..."
              : "Mark as delivered"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
