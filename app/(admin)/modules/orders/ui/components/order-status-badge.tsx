import { Badge } from "@/app/components/ui/badge";
import { cn, formatStatus } from "@/app/lib/utils";
import { HttpTypes } from "@medusajs/types";

type PaymentStatus = HttpTypes.AdminOrder["payment_status"];
type FulfillmentStatus = HttpTypes.AdminOrder["fulfillment_status"];

const getPaymentStatusStyles = (status: PaymentStatus): string => {
  // Green - paid
  if (status === "captured") {
    return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800";
  }
  // Yellow - awaiting payment
  if (status === "authorized" || status === "requires_action") {
    return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800";
  }
  // Red - refunded/canceled
  if (
    status === "refunded" ||
    status === "partially_refunded" ||
    status === "canceled"
  ) {
    return "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800";
  }
  // Gray - default for not_paid, awaiting, etc.
  return "bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700";
};

const getFulfillmentStatusStyles = (status: FulfillmentStatus): string => {
  switch (status) {
    case "fulfilled":
    case "delivered":
      // Green - completed
      return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800";
    case "shipped":
      // Blue - in transit
      return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800";
    case "partially_fulfilled":
    case "partially_shipped":
      // Purple - partial
      return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-800";
    case "not_fulfilled":
      // Gray - awaiting
      return "bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700";
    case "canceled":
      // Red - canceled
      return "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800";
    default:
      return "";
  }
};

export const PaymentStatusBadge = ({ status }: { status: PaymentStatus }) => {
  return (
    <Badge className={cn(getPaymentStatusStyles(status))}>
      {formatStatus(status)}
    </Badge>
  );
};

export const FulfillmentStatusBadge = ({
  status,
}: {
  status: FulfillmentStatus;
}) => {
  return (
    <Badge className={cn(getFulfillmentStatusStyles(status))}>
      {formatStatus(status)}
    </Badge>
  );
};
