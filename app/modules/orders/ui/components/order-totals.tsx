import { cn, convertToLocale } from "@/app/lib/utils";
import { HttpTypes } from "@medusajs/types";

interface OrderTotalsProps {
  order: HttpTypes.StoreOrder;
  className?: string;
}

export function OrderTotals({ order, className }: OrderTotalsProps) {
  const {
    currency_code,
    total,
    subtotal,
    tax_total,
    shipping_total,
    discount_total,
  } = order;

  const rows: Array<{ label: string; value: string; emphasis?: boolean }> = [
    {
      label: "Subtotal",
      value: convertToLocale({ amount: subtotal, currency_code }),
    },
    {
      label: "Discounts",
      value: convertToLocale({ amount: discount_total, currency_code }),
    },
    {
      label: "Shipping",
      value: convertToLocale({ amount: shipping_total, currency_code }),
    },
    {
      label: "Tax",
      value: convertToLocale({ amount: tax_total, currency_code }),
    },
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
            <span className="text-base font-semibold">
              {convertToLocale({ amount: total, currency_code })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
