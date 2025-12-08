import { Thumbnail } from "@/app/(admin)/dashboard/components/shared/thumbnail";
import { Badge } from "@/app/components/ui/badge";

export type OrderFulfillmentItemData = {
  id: string;
  title: string;
  sku: string;
  quantity: number;
  fulfillmentStatus?: "not_fulfilled" | "partially_fulfilled" | "fulfilled";
  thumbnail?: string | null;
};

type OrderFulfillmentItemProps = {
  item: OrderFulfillmentItemData;
};

const statusBadgeConfig = {
  not_fulfilled: { label: "Unfulfilled", variant: "outline" as const },
  partially_fulfilled: { label: "Partial", variant: "secondary" as const },
  fulfilled: { label: "Fulfilled", variant: "default" as const },
};

export const OrderFulfillmentItem = ({ item }: OrderFulfillmentItemProps) => {
  const statusConfig = item.fulfillmentStatus
    ? statusBadgeConfig[item.fulfillmentStatus]
    : null;

  return (
    <div className="bg-muted/10 flex items-center gap-3 rounded-xl border p-2">
      <Thumbnail src={item.thumbnail} className="size-14 rounded-lg" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{item.title}</p>
        <p className="text-muted-foreground text-xs">SKU: {item.sku}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <p className="text-sm font-semibold">Qty {item.quantity}</p>
        {statusConfig && (
          <Badge variant={statusConfig.variant} className="text-xs">
            {statusConfig.label}
          </Badge>
        )}
      </div>
    </div>
  );
};
