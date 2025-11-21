import { cn, convertToLocale } from "@/app/lib/utils";
import { HttpTypes } from "@medusajs/types";

interface OrderItemsListProps {
  items: HttpTypes.StoreOrderLineItem[];
  currencyCode: string;
  className?: string;
}

export function OrderItemsList({
  items,
  currencyCode,
  className,
}: OrderItemsListProps) {
  return (
    <div className={cn("rounded-xl border p-4 md:p-5", className)}>
      <div className="text-muted-foreground mb-3 text-sm font-medium">
        Items
      </div>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="bg-secondary size-12 rounded-md">
                {item.thumbnail && (
                  <img
                    src={item.thumbnail ?? ""}
                    alt={item.title}
                    className="size-12 shrink-0 rounded-md border object-cover"
                  />
                )}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{item.title}</div>
                <div className="text-muted-foreground text-xs">
                  {item.variant?.title ? `${item.variant.title} • ` : null}Qty{" "}
                  {item.quantity}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-muted-foreground text-sm">
                {convertToLocale({
                  amount: item.unit_price,
                  currency_code: currencyCode,
                })}
              </div>
              <div className="text-sm font-semibold">
                {convertToLocale({
                  amount: item.total,
                  currency_code: currencyCode,
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
