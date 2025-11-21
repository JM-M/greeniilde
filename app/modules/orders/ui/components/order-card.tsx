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
  items: {
    title: string;
    thumbnail?: string;
    quantity: number;
    variant?: string;
  }[];
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
  items,
  totalFormatted,
  deliverySummary,
  className,
}: OrderCardProps) {
  const visibleItems = items.slice(0, 2);
  const overflowCount = Math.max(0, items.length - visibleItems.length);

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
      <CardContent className="px-0 py-4">
        <div className="flex flex-col gap-3">
          {visibleItems.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="bg-secondary size-12 shrink-0 overflow-hidden rounded-md border">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="bg-muted flex h-full w-full items-center justify-center">
                    <span className="text-muted-foreground text-xs">Img</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-0.5 text-sm">
                <span className="line-clamp-1 font-medium">{item.title}</span>
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                  <span>Qty: {item.quantity}</span>
                  {item.variant && (
                    <>
                      <span>•</span>
                      <span>{item.variant}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          {overflowCount > 0 && (
            <div className="text-muted-foreground pl-15 text-xs">
              + {overflowCount} more item{overflowCount > 1 ? "s" : ""}
            </div>
          )}
        </div>
        <div className="text-muted-foreground mt-4 border-t pt-3 text-sm">
          <span className="text-foreground font-medium">Delivery:</span>{" "}
          {deliverySummary}
        </div>
      </CardContent>
      <CardFooter className="px-0 pt-0">
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
