import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { cn } from "@/app/lib/utils";
import Link from "next/link";

type OrderStatus = "processing" | "shipped" | "delivered" | "canceled";

export type OrderCardProps = {
  orderId: string;
  status: OrderStatus;
  orderDate: string;
  thumbnailUrls: string[];
  totalFormatted: string;
  deliverySummary: string;
  className?: string;
};

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

export function OrderCard({
  orderId,
  status,
  orderDate,
  thumbnailUrls,
  totalFormatted,
  deliverySummary,
  className,
}: OrderCardProps) {
  const visibleThumbnails = thumbnailUrls.slice(0, 2);
  const overflowCount = Math.max(0, thumbnailUrls.length - visibleThumbnails.length);

  return (
    <Card className={cn("p-4 md:p-5", className)}>
      <CardHeader className="px-0 py-0">
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-medium">
              <Link
                href={`/orders/${orderId}`}
                className="max-w-[220px] truncate align-middle underline-offset-4 hover:underline"
              >
                Order {orderId}
              </Link>
            </CardTitle>
            <Badge className={statusClassNames[status]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
          <div className="text-muted-foreground text-sm">{orderDate}</div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex items-center gap-2">
          {visibleThumbnails.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt=""
              className="h-10 w-10 rounded-md object-cover border"
            />
          ))}
          {overflowCount > 0 ? (
            <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-md bg-muted px-2 text-xs font-medium text-muted-foreground border">
              +{overflowCount}
            </span>
          ) : null}
          <div className="ml-2 text-sm text-muted-foreground">
            {deliverySummary}
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-0">
        <div className="flex w-full items-center justify-between">
          <div className="text-sm font-semibold">{totalFormatted}</div>
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="sm">
              Track
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href={`/orders/${orderId}`}>View details</Link>
            </Button>
            <Button variant="secondary" size="sm">
              Invoice
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}


