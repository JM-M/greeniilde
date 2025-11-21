import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { convertToLocale } from "@/app/lib/utils";
import { HttpTypes } from "@medusajs/types";

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
          {isPaid ? (
            <Badge className="border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-300">
              Paid
            </Badge>
          ) : (
            <Badge variant="outline">Pending</Badge>
          )}
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
                currency_code: order.currency_code,
              })}
            </span>
          </div>
          <div className="mt-2">
            <Button variant="link" size="sm" className="px-0">
              View invoice
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
