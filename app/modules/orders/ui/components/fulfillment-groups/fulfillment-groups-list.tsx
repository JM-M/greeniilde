import { FulfillmentGroupCard, type FulfillmentGroup } from "@/app/modules/orders/ui/components/fulfillment-groups/fulfillment-group-card";

const MOCK_ITEMS = [
  { id: "i1", name: "Window Frame - Oak 120cm", qty: 1, imageUrl: "/images/hero.jpg" },
  { id: "i2", name: "Handle Set - Matte Black", qty: 2, imageUrl: "/next.svg" },
  { id: "i3", name: "Weather Strip Kit", qty: 1, imageUrl: "/vercel.svg" },
];

const MOCK_GROUPS_SINGLE: FulfillmentGroup[] = [
  {
    id: "g1",
    status: "shipped",
    carrier: "UPS",
    trackingId: "1Z 999 AA1 01 2345 6784",
    etaOrDelivered: "Arrives Tue, Nov 18",
    items: MOCK_ITEMS,
  },
];

const MOCK_GROUPS_MULTI: FulfillmentGroup[] = [
  {
    id: "g1",
    status: "delivered",
    carrier: "UPS",
    trackingId: "1Z 999 AA1 01 1111 1111",
    etaOrDelivered: "Delivered Nov 10",
    items: [MOCK_ITEMS[0]],
  },
  {
    id: "g2",
    status: "out-for-delivery",
    carrier: "FedEx",
    trackingId: "7845 3321 9911",
    etaOrDelivered: "Out for delivery",
    items: [MOCK_ITEMS[1], MOCK_ITEMS[2]],
  },
];

export function FulfillmentGroupsList() {
  // Toggle between SINGLE or MULTI to eyeball layouts
  const groups: FulfillmentGroup[] = MOCK_GROUPS_SINGLE;
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
      <div className="text-sm font-medium text-muted-foreground">
        Shipments
      </div>
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


