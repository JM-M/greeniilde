import { OrderCard } from "@/app/modules/orders/ui/components/order-card";

const MOCK_ORDERS = [
  {
    orderId: "A3F9D2",
    status: "processing" as const,
    orderDate: "Nov 12, 2025",
    thumbnailUrls: [
      "/images/hero.jpg",
      "/next.svg",
      "/vercel.svg",
    ],
    totalFormatted: "$148.00",
    deliverySummary: "Arrives Tue, Nov 18",
  },
  {
    orderId: "B9Z1K7",
    status: "shipped" as const,
    orderDate: "Nov 08, 2025",
    thumbnailUrls: [
      "/window.svg",
    ],
    totalFormatted: "$79.00",
    deliverySummary: "On the way",
  },
  {
    orderId: "C1Q7V5",
    status: "delivered" as const,
    orderDate: "Nov 04, 2025",
    thumbnailUrls: [
      "/globe.svg",
      "/file.svg",
    ],
    totalFormatted: "$212.45",
    deliverySummary: "Delivered Nov 10",
  },
  {
    orderId: "D7L3M2",
    status: "canceled" as const,
    orderDate: "Oct 29, 2025",
    thumbnailUrls: [],
    totalFormatted: "$0.00",
    deliverySummary: "Order canceled",
  },
];

export function OrdersList() {
  return (
    <div className="flex flex-col gap-4">
      {MOCK_ORDERS.map((order) => (
        <OrderCard
          key={order.orderId}
          orderId={order.orderId}
          status={order.status}
          orderDate={order.orderDate}
          thumbnailUrls={order.thumbnailUrls}
          totalFormatted={order.totalFormatted}
          deliverySummary={order.deliverySummary}
        />
      ))}
    </div>
  );
}


