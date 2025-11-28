import { PageTitle } from "@/app/components/shared/page-title";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { convertToLocale } from "@/app/lib/utils";
import { OrderItemsList } from "@/app/modules/orders/ui/components/order-items/order-items-list";
import { PaymentSummaryCard } from "@/app/modules/orders/ui/components/order-summary/payment-summary-card";
import { ShippingSummaryCard } from "@/app/modules/orders/ui/components/order-summary/shipping-summary-card";
import { OrderTotals } from "@/app/modules/orders/ui/components/order-totals";
import { HttpTypes } from "@medusajs/types";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

type CheckoutSuccessProps = {
  order: HttpTypes.StoreOrder;
};

export const CheckoutSuccess = ({ order }: CheckoutSuccessProps) => {
  const orderDate = new Date(order.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  console.log({
    amount: order.total,
    currencyCode: order.currency_code,
  });

  const totalFormatted = convertToLocale({
    amount: order.total,
    currencyCode: order.currency_code,
  });

  return (
    <>
      {/* Success Confirmation Section */}
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-400/20">
          <CheckCircle className="size-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h1 className="text-2xl font-extrabold">Order Confirmed!</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Thank you for your purchase. We've received your order and will send
          you a confirmation email shortly.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <Badge className="border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-300">
            Confirmed
          </Badge>
        </div>
      </div>

      {/* Order Number and Details */}
      <div className="mt-6">
        <PageTitle
          title={`Order #${order.display_id}`}
          subtitle={`${orderDate} • ${totalFormatted}`}
        />
      </div>

      {/* Main Content Grid */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <OrderItemsList
            items={order.items || []}
            currencyCode={order.currency_code}
            className="h-full"
          />
        </div>
        <div>
          <OrderTotals order={order} className="h-full" />
        </div>
      </div>

      {/* Secondary Info Section */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <ShippingSummaryCard order={order} />
        <PaymentSummaryCard order={order} />
      </div>

      {/* Action Buttons Section */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild variant="default">
          <Link href={`/orders/${order.id}`}>View Order Details</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/orders/${order.id}`}>Track Order</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    </>
  );
};
