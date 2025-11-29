import { convertToLocale } from "@/app/lib/utils";
import {
  OrderCard,
  OrderCardProps,
} from "@/app/modules/orders/ui/components/order-card";
import { StoreOrder } from "@medusajs/types";

export function OrdersList({ orders }: { orders: StoreOrder[] }) {
  return (
    <div className="flex flex-col gap-4 md:mx-auto md:max-w-xl">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          orderId={(order.id || "").toString()}
          displayId={order.display_id || ""}
          status={order.fulfillment_status as OrderCardProps["status"]}
          orderDate={new Date(order.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
          items={
            order.items?.map((item) => ({
              title: item.title,
              thumbnail: item.thumbnail || "",
              quantity: item.quantity,
              variant: item.variant?.title || "",
            })) || []
          }
          totalFormatted={convertToLocale({
            amount: order.total,
            currencyCode: order.currency_code,
          })}
          deliverySummary={
            order.shipping_methods?.[0]?.name || "Standard Delivery"
          }
        />
      ))}
    </div>
  );
}
