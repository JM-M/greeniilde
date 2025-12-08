import { Thumbnail } from "@/app/(admin)/dashboard/components/shared/thumbnail";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { cn, convertToLocale } from "@/app/lib/utils";
import { HttpTypes } from "@medusajs/types";

type OrderItemsCardProps = {
  items: HttpTypes.AdminOrderLineItem[];
  currencyCode: string;
  className?: string;
};

export const OrderItemsCard = ({
  items,
  currencyCode,
  className,
}: OrderItemsCardProps) => {
  return (
    <Card className={cn("gap-4", className)}>
      <CardHeader className="gap-1">
        <CardTitle>Items</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-muted/10 flex items-center gap-3 rounded-xl border p-2"
          >
            <Thumbnail src={item.thumbnail} className="size-14 rounded-lg" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{item.title}</p>
              <p className="text-muted-foreground text-xs">
                {item.variant_sku || item.variant_title || "N/A"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">
                {convertToLocale({
                  amount: item.unit_price,
                  currencyCode,
                })}
              </p>
              <p className="text-muted-foreground text-xs">
                Qty {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
