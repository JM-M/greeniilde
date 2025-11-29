import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/app/lib/utils";
import { HttpTypes } from "@medusajs/types";

type OrderStatus = HttpTypes.StoreOrder["status"];

const statusClassNames: Record<OrderStatus, string> = {
  processing:
    "bg-amber-100 text-amber-800 border-transparent dark:bg-amber-400/20 dark:text-amber-300",
  shipped:
    "bg-blue-100 text-blue-800 border-transparent dark:bg-blue-400/20 dark:text-blue-300",
  delivered:
    "bg-emerald-100 text-emerald-800 border-transparent dark:bg-emerald-400/20 dark:text-emerald-300",
  canceled:
    "bg-muted text-muted-foreground border-transparent dark:bg-muted/50 dark:text-muted-foreground",
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  return (
    <Badge className={cn("capitalize", statusClassNames[status])}>
      {status.replaceAll("_", " ")}
    </Badge>
  );
};
