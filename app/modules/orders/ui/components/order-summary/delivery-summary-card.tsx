import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import { StoreOrder } from "@medusajs/types";

export function DeliverySummaryCard({ order }: { order: StoreOrder }) {
  const shippingMethod = order.shipping_methods?.[0];
  const status = order.fulfillment_status;
  const method = shippingMethod?.name || "Standard Delivery";
  // Medusa doesn't have a standard tracking ID field on the order or shipping method directly in the default store API response
  // It's usually on the fulfillment object, which we might not have fully populated or it's in metadata.
  // We'll leave tracking ID empty or check metadata for now.
  const trackingId = (order.metadata?.tracking_id as string) || "";

  return (
    <Card className="p-4 md:p-5">
      <CardHeader className="grid-rows-1 items-center gap-0 px-0 py-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Delivery
          </CardTitle>
          <Badge className="border-transparent bg-blue-100 text-blue-800 dark:bg-blue-400/20 dark:text-blue-300">
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="mt-2 text-sm">
          {/* We don't have an estimated arrival date in standard order data */}
          <div className="font-semibold">Arrives soon</div>
          <div className="text-muted-foreground mt-1">{method}</div>
          {trackingId && (
            <div className="text-muted-foreground mt-2 truncate">
              Tracking: {trackingId}
            </div>
          )}
          {trackingId && (
            <div className="mt-2">
              <Button variant="link" size="sm" className="px-0">
                Track package
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
