"use client";

import { Button } from "@/app/components/ui/button";
import { CheckoutSuccess } from "@/app/modules/checkout/ui/components/checkout-success";
import { useRetrieveOrder } from "@/app/modules/orders/hooks/use-order-queries";
import Link from "next/link";

type CheckoutConfirmationViewProps = {
  orderId?: string;
};

export const CheckoutConfirmationView = ({
  orderId,
}: CheckoutConfirmationViewProps) => {
  const { data: order, isLoading, isError } = useRetrieveOrder(orderId!);

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-4 py-20">
        <h1 className="text-2xl font-bold">Order not found</h1>
        <p className="text-muted-foreground">
          We couldn't find the order you're looking for.
        </p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="view-container">
      <CheckoutSuccess order={order} />
    </div>
  );
};
