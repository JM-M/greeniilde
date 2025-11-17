import {
  Card,
  CardContent,
  CardHeader,
} from "@/app/components/ui/card";
import { FulfillmentGroupHeader } from "@/app/modules/orders/ui/components/fulfillment-groups/fulfillment-group-header";
import { FulfillmentItemsList } from "@/app/modules/orders/ui/components/fulfillment-groups/fulfillment-items-list";
import { FulfillmentStatusInline } from "@/app/modules/orders/ui/components/fulfillment-groups/fulfillment-status-inline";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible";
import { Button } from "@/app/components/ui/button";

type FulfillmentItem = {
  id: string;
  name: string;
  qty: number;
  imageUrl: string;
};

export type FulfillmentGroup = {
  id: string;
  status: "processing" | "shipped" | "out-for-delivery" | "delivered" | "canceled";
  carrier?: string;
  trackingId?: string;
  etaOrDelivered?: string;
  items: FulfillmentItem[];
};

export function FulfillmentGroupCard({
  group,
  index,
  total,
  showShipmentIndex,
}: {
  group: FulfillmentGroup;
  index: number;
  total: number;
  showShipmentIndex: boolean;
}) {
  const visibleItems = group.items.slice(0, 2);
  const hiddenItems = group.items.slice(2);

  return (
    <Card className="p-4 md:p-5">
      <CardHeader className="grid-rows-1 gap-0 px-0 py-0">
        <FulfillmentGroupHeader
          showShipmentIndex={showShipmentIndex}
          index={index}
          total={total}
          status={group.status}
          carrier={group.carrier}
          trackingId={group.trackingId}
          etaOrDelivered={group.etaOrDelivered}
        />
      </CardHeader>
      <CardContent className="px-0">
        <div className="mt-3 flex flex-col gap-3">
          <FulfillmentStatusInline
            label={
              group.status === "out-for-delivery"
                ? "Currently out for delivery"
                : group.status === "delivered"
                ? "Delivered"
                : group.status === "shipped"
                ? "Shipped"
                : group.status === "processing"
                ? "Processing"
                : "Canceled"
            }
          />
          {/* Always show up to two items */}
          <FulfillmentItemsList items={visibleItems} />
          {/* Collapsible for remaining items, if any */}
          {hiddenItems.length > 0 ? (
            <Collapsible>
              <CollapsibleContent className="mt-3">
                <FulfillmentItemsList items={hiddenItems} />
              </CollapsibleContent>
              <div className="mt-1.5">
                <CollapsibleTrigger asChild>
                  <Button variant="link" size="sm" className="px-0">
                    Show {hiddenItems.length} more item
                    {hiddenItems.length > 1 ? "s" : ""}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </Collapsible>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}


