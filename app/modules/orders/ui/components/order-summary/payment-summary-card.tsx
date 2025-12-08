import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { convertToLocale } from "@/app/lib/utils";
import { HttpTypes } from "@medusajs/types";
import { DownloadIcon } from "lucide-react";
import { PaymentStatusBadge } from "../payment-status-badge";

type PaymentSummaryCardProps = {
  order: HttpTypes.StoreOrder;
};

export function PaymentSummaryCard({ order }: PaymentSummaryCardProps) {
  const paymentCollection = order.payment_collections?.[0];
  const isPaid = paymentCollection?.status === "authorized";
  const amount = paymentCollection?.amount ?? order.total;

  return (
    <Card className="p-4 md:p-5">
      <CardHeader className="grid-rows-1 items-center gap-0 px-0 py-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Payment
          </CardTitle>
          <PaymentStatusBadge status={isPaid ? "authorized" : "not_paid"} />
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="mt-2 text-sm">
          <div className="font-semibold">
            {(() => {
              const session = paymentCollection?.payment_sessions?.[0];
              const data = session?.data as
                | {
                    authorization?: {
                      brand?: string;
                      last4?: string;
                    };
                  }
                | undefined;

              const brand = data?.authorization?.brand;
              const last4 = data?.authorization?.last4;

              if (brand && last4) {
                return `${brand.charAt(0).toUpperCase() + brand.slice(1)} •••• ${last4}`;
              }

              return session?.provider_id ?? "Manual Payment";
            })()}
          </div>
          <div className="mt-1">
            <span className="text-muted-foreground">Total:</span>{" "}
            <span className="font-semibold">
              {convertToLocale({
                amount,
                currencyCode: order.currency_code,
              })}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-end">
            <Button asChild variant="outline" size="sm">
              <a href={`/api/orders/${order.id}/receipt`} target="_blank">
                <DownloadIcon />
                Receipt
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Skeleton } from "@/app/components/ui/skeleton";

export function PaymentSummaryCardSkeleton() {
  return (
    <Card className="p-4 md:p-5">
      <CardHeader className="grid-rows-1 items-center gap-0 px-0 py-0">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="mt-2 flex flex-col gap-2">
          <Skeleton className="h-5 w-40" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="mt-2 flex items-center justify-end">
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
