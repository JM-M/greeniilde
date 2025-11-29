import {
  FulfillmentGroupCard,
  type FulfillmentGroup,
} from "@/app/modules/orders/ui/components/fulfillment-groups/fulfillment-group-card";
import { StoreOrder } from "@medusajs/types";

export function FulfillmentGroupsList({ order }: { order: StoreOrder }) {
  const fulfillments = order.fulfillments || [];

  if (fulfillments.length === 0) {
    return (
      <div className="h-full rounded-xl border p-4 md:p-5">
        <div className="text-muted-foreground mb-3 text-sm font-medium">
          Items
        </div>
        <div className="text-muted-foreground text-sm">
          No shipments created yet.
        </div>
      </div>
    );
  }

  const groups: FulfillmentGroup[] = fulfillments.map((fulfillment: any) => {
    const items = (fulfillment.items || []).map((item: any) => {
      // Find the line item in the order to get details like name and thumbnail
      const lineItem = (order.items || []).find((i) => i.id === item.item_id);
      return {
        id: item.item_id,
        name: lineItem?.title || "Unknown Item",
        qty: item.quantity,
        imageUrl: lineItem?.thumbnail || "",
      };
    });

    return {
      id: fulfillment.id,
      status: "shipped", // Default to shipped as Medusa fulfillment usually implies shipped/fulfilled
      carrier: fulfillment.provider_id, // Or map from metadata if available
      trackingId: (fulfillment.tracking_numbers?.[0] as string) || undefined,
      etaOrDelivered: new Date(fulfillment.created_at).toLocaleDateString(), // Using created_at as a proxy for date
      items,
    };
  });

  const total = groups.length;

  if (total === 1) {
    // Single fulfillment: render a single shipment block with no heading/index
    return (
      <div aria-label="Shipment">
        <FulfillmentGroupCard
          group={groups[0]}
          index={1}
          total={1}
          showShipmentIndex={false}
        />
      </div>
    );
  }

  // Multiple fulfillments: render heading and indexed cards
  return (
    <div aria-label="Shipments" className="flex flex-col gap-4">
      <div className="text-muted-foreground text-sm font-medium">Shipments</div>
      <div className="flex flex-col gap-4">
        {groups.map((group, idx) => (
          <FulfillmentGroupCard
            key={group.id}
            group={group}
            index={idx + 1}
            total={total}
            showShipmentIndex
          />
        ))}
      </div>
    </div>
  );
}

import { Skeleton } from "@/app/components/ui/skeleton";

export function FulfillmentGroupsListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-5 w-24" />
      <div className="flex flex-col gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-xl border p-4 md:p-5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <div className="mt-4 flex flex-col gap-4">
              {[1, 2].map((j) => (
                <div key={j} className="flex items-center gap-3">
                  <Skeleton className="size-12 rounded-md" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
