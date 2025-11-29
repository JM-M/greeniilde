import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { HttpTypes } from "@medusajs/types";
import { formatDistanceToNow } from "date-fns";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";
import { OrderStatusBadge } from "./order-status-badge";

export type OrderCardProps = {
  orderId: string;
  displayId: number | string;
  status: HttpTypes.StoreOrder["status"];
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

export function OrderCard({
  orderId,
  displayId,
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
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-medium">
              <Link
                href={`/orders/${orderId}`}
                className="max-w-[220px] truncate align-middle underline-offset-4 hover:underline"
              >
                Order #{displayId}
              </Link>
            </CardTitle>
            <OrderStatusBadge status={status} />
          </div>
          <div className="text-muted-foreground text-sm">
            {formatDistanceToNow(new Date(orderDate), { addSuffix: true })}
          </div>
        </div>
      </CardHeader>
      <CardContent>
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
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <div className="text-sm font-semibold">{totalFormatted}</div>
          <div className="flex items-center gap-1.5">
            <Button asChild variant="ghost" size="sm">
              <a href={`/api/orders/${orderId}/receipt`} target="_blank">
                <DownloadIcon />
                Receipt
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`/orders/${orderId}`}>View details</Link>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export function OrderCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Skeleton className="size-12 shrink-0 rounded-md" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t pt-3">
          <Skeleton className="h-4 w-full max-w-[200px]" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
