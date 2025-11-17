import { Badge } from "@/app/components/ui/badge";

type HeaderProps = {
  showShipmentIndex?: boolean;
  index?: number;
  total?: number;
  status: "processing" | "shipped" | "out-for-delivery" | "delivered" | "canceled";
  carrier?: string;
  trackingId?: string;
  etaOrDelivered?: string;
};

const statusClassNames: Record<HeaderProps["status"], string> = {
  processing:
    "border-transparent bg-amber-100 text-amber-800 dark:bg-amber-400/20 dark:text-amber-300",
  shipped:
    "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-400/20 dark:text-blue-300",
  "out-for-delivery":
    "border-transparent bg-indigo-100 text-indigo-800 dark:bg-indigo-400/20 dark:text-indigo-300",
  delivered:
    "border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-300",
  canceled:
    "border-transparent bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground",
};

export function FulfillmentGroupHeader({
  showShipmentIndex,
  index,
  total,
  status,
  carrier,
  trackingId,
  etaOrDelivered,
}: HeaderProps) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
      <div className="flex items-center gap-2">
        <div className="text-sm font-medium text-muted-foreground">
          {showShipmentIndex && typeof index === "number" && typeof total === "number"
            ? `Shipment ${index} of ${total}`
            : "Shipment"}
        </div>
        <Badge className={statusClassNames[status]}>
          {status === "out-for-delivery" ? "Out for delivery" : status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>
      <div className="text-right md:text-left">
        <div className="text-sm">
          <span className="font-medium">{carrier ?? "Carrier"}</span>
          {trackingId ? (
            <span className="text-muted-foreground"> • {trackingId}</span>
          ) : null}
        </div>
        {etaOrDelivered ? (
          <div className="text-muted-foreground text-xs">{etaOrDelivered}</div>
        ) : null}
      </div>
    </div>
  );
}


