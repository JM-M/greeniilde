import { cn } from "@/app/lib/utils";

interface OrderTotalsProps {
  className?: string;
}

export function OrderTotals({ className }: OrderTotalsProps) {
  // Static mock values for UI only
  const subtotal = "$148.00";
  const discount = "-$10.00";
  const shipping = "$8.00";
  const tax = "$12.40";
  const fees = "$0.00";
  const total = "$158.40";

  const rows: Array<{ label: string; value: string; emphasis?: boolean }> = [
    { label: "Subtotal", value: subtotal },
    { label: "Discounts", value: discount },
    { label: "Shipping", value: shipping },
    { label: "Tax", value: tax },
    { label: "Fees", value: fees },
  ];

  return (
    <div className={cn("rounded-xl border p-4 md:p-5", className)}>
      <div className="text-muted-foreground mb-3 text-sm font-medium">
        Order total
      </div>
      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-muted-foreground">{row.label}</span>
            <span>{row.value}</span>
          </div>
        ))}
        <div className="mt-2 border-t pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Total</span>
            <span className="text-base font-semibold">{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
