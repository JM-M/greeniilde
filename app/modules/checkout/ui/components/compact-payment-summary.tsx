"use client";

export const CompactPaymentSummary = () => {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Subtotal</span>
        <span>$55.00</span>
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
          <span>$55.00</span>
        </div>
      </div>
    </div>
  );
};
