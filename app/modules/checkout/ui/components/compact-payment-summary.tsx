"use client";

import { useSuspenseRetrieveCart } from "@/app/modules/cart/hooks/use-cart-queries";

export const CompactPaymentSummary = () => {
  const { subtotal, total } = useSuspenseRetrieveCart();

  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Subtotal</span>
        <span>{subtotal}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Shipping</span>
        <span>$—</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Tax</span>
        <span>$—</span>
      </div>
      <div className="border-t pt-2 text-base font-semibold">
        <div className="flex items-center justify-between">
          <span>Total</span>
          <span>{total}</span>
        </div>
      </div>
    </div>
  );
};
