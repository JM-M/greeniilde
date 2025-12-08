import { Badge } from "@/app/components/ui/badge";
import { cn, formatStatus } from "@/app/lib/utils";
import { HttpTypes } from "@medusajs/types";

type OrderStatus = HttpTypes.AdminOrder["status"];

const getOrderStatusStyles = (status: OrderStatus): string => {
  switch (status) {
    case "completed":
      // Green - completed
      return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800";
    case "pending":
      // Gray - default
      return "bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700";
    case "canceled":
    case "archived":
      // Red - canceled/archived
      return "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800";
    case "requires_action":
      // Amber - action needed
      return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800";
    default:
      return "bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700";
  }
};

export const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  return (
    <Badge className={cn(getOrderStatusStyles(status))}>
      {formatStatus(status)}
    </Badge>
  );
};
