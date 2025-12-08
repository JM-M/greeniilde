import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { cn } from "@/app/lib/utils";
import { HttpTypes } from "@medusajs/types";
import { FulfillItemsDialog } from "./fulfill-items-dialog";
import {
  OrderFulfillmentItem,
  type OrderFulfillmentItemData,
} from "./order-fulfillment-item";

type OrderUnfulfilledItemsCardProps = {
  order: HttpTypes.AdminOrder;
  locationId?: string;
  className?: string;
};

export const OrderUnfulfilledItemsCard = ({
  order,
  locationId,
  className,
}: OrderUnfulfilledItemsCardProps) => {
  const fulfillments = order.fulfillments || [];
  const items = order.items || [];

  // Calculate unfulfilled quantities for each item
  const unfulfilledItems: OrderFulfillmentItemData[] = items
    .map((item) => {
      // Sum up fulfilled quantities across all fulfillments
      const fulfilledQuantity = fulfillments.reduce((acc, fulfillment) => {
        const fulfillmentItems = ((fulfillment as any).items ||
          (fulfillment as any).data?.items ||
          []) as HttpTypes.AdminFulfillmentItem[];
        const match = fulfillmentItems.find(
          (fItem) => fItem.line_item_id === item.id,
        );
        return acc + (match ? match.quantity : 0);
      }, 0);

      const unfulfilledQty = item.quantity - fulfilledQuantity;

      // Determine fulfillment status
      let fulfillmentStatus: OrderFulfillmentItemData["fulfillmentStatus"] =
        "not_fulfilled";
      if (fulfilledQuantity > 0 && unfulfilledQty > 0) {
        fulfillmentStatus = "partially_fulfilled";
      }

      return {
        id: item.id,
        title: item.title,
        sku: item.variant_sku || item.variant_title || "N/A",
        quantity: unfulfilledQty,
        fulfillmentStatus,
        thumbnail: item.thumbnail,
      };
    })
    .filter((item) => item.quantity > 0);

  // Don't render if all items are fulfilled
  if (unfulfilledItems.length === 0) {
    return null;
  }

  return (
    <Card className={cn("gap-4", className)}>
      <CardHeader className="gap-1">
        <CardTitle>Unfulfilled items</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {unfulfilledItems.map((item) => (
          <OrderFulfillmentItem key={item.id} item={item} />
        ))}
      </CardContent>
      {locationId && (
        <CardFooter className="justify-end">
          <FulfillItemsDialog
            items={unfulfilledItems}
            orderId={order.id}
            locationId={locationId}
          >
            <Button size="sm">Fulfill items</Button>
          </FulfillItemsDialog>
        </CardFooter>
      )}
    </Card>
  );
};
