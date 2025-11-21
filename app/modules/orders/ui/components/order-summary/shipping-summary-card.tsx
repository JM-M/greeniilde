import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { HttpTypes } from "@medusajs/types";

type ShippingSummaryCardProps = {
  order: HttpTypes.StoreOrder;
};

export function ShippingSummaryCard({ order }: ShippingSummaryCardProps) {
  const shippingAddress = order.shipping_address;

  return (
    <Card className="p-4 md:p-5">
      <CardHeader className="grid-rows-1 items-center gap-0 px-0 py-0">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          Shipping to
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="mt-2 text-sm">
          <div className="font-semibold">
            {shippingAddress?.first_name} {shippingAddress?.last_name}
          </div>
          <div className="text-muted-foreground mt-1 truncate">
            {shippingAddress?.address_1}, {shippingAddress?.city}
          </div>
          <div className="text-muted-foreground mt-1 truncate">
            {order.email}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
