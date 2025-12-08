import { ConfirmationDialog } from "@/app/(admin)/dashboard/components/shared/confirmation-dialog";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { cn, convertToLocale } from "@/app/lib/utils";
import { PaymentStatusBadge } from "@/app/modules/orders/ui/components/payment-status-badge";
import { HttpTypes } from "@medusajs/types";

type OrderSummaryCardProps = {
  subtotal: number;
  shippingTotal: number;
  taxTotal: number;
  total: number;
  paidTotal: number;
  currencyCode: string;
  paymentStatus: HttpTypes.AdminOrder["payment_status"];
  onCapturePayment?: () => void;
  isCapturing?: boolean;
  className?: string;
};

export const OrderSummaryCard = ({
  subtotal,
  shippingTotal,
  taxTotal,
  total,
  paidTotal,
  currencyCode,
  paymentStatus,
  onCapturePayment,
  isCapturing = false,
  className,
}: OrderSummaryCardProps) => {
  const hasOutstandingBalance = paidTotal < total;
  const outstandingAmount = total - paidTotal;

  const totals = [
    {
      label: "Subtotal",
      value: convertToLocale({ amount: subtotal, currencyCode }),
    },
    {
      label: "Shipping",
      value: convertToLocale({ amount: shippingTotal, currencyCode }),
    },
    {
      label: "Tax",
      value: convertToLocale({ amount: taxTotal, currencyCode }),
    },
    {
      label: "Total",
      value: convertToLocale({ amount: total, currencyCode }),
      bold: true,
    },
    {
      label: "Paid",
      value: convertToLocale({ amount: paidTotal, currencyCode }),
      bold: true,
    },
  ];

  return (
    <Card className={cn("gap-4", className)}>
      <CardHeader className="gap-1">
        <CardTitle>Summary</CardTitle>
        <CardAction>
          <PaymentStatusBadge status={paymentStatus} />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-2">
        {totals.map((row) => (
          <div
            key={row.label}
            className={cn("flex items-center justify-between text-sm", {
              "font-semibold": row.bold,
            })}
          >
            <span className="text-muted-foreground">{row.label}</span>
            <span
              className={cn("text-foreground", {
                "font-semibold": row.bold,
              })}
            >
              {row.value}
            </span>
          </div>
        ))}
      </CardContent>
      {hasOutstandingBalance && onCapturePayment && (
        <CardFooter className="justify-end">
          <ConfirmationDialog
            trigger={<Button size="sm">Capture payment</Button>}
            title="Capture payment"
            description={`This will capture ${convertToLocale({ amount: outstandingAmount, currencyCode })} from the customer's payment method.`}
            confirmText="Capture"
            confirmingText="Capturing..."
            onConfirm={onCapturePayment}
            isLoading={isCapturing}
          />
        </CardFooter>
      )}
    </Card>
  );
};
