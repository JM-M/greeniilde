import { convertToLocale } from "@/app/lib/utils";
import {
  OrderCard,
  OrderCardProps,
} from "@/app/modules/orders/ui/components/order-card";
import { StoreOrder } from "@medusajs/types";

export function OrdersList({ orders }: { orders: StoreOrder[] }) {
  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          orderId={(order.display_id || "").toString()}
          status={order.fulfillment_status as OrderCardProps["status"]}
          orderDate={new Date(order.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
          thumbnailUrls={order.items?.map((item) => item.thumbnail || "") || []}
          totalFormatted={convertToLocale({
            amount: order.total,
            currency_code: order.currency_code,
          })}
          deliverySummary={
            order.shipping_methods?.[0]?.name || "Standard Delivery"
          }
        />
      ))}
    </div>
  );
}
