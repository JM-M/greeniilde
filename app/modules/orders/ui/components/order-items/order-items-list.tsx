import { cn } from "@/app/lib/utils";

type OrderItem = {
  id: string;
  name: string;
  variant?: string;
  quantity: number;
  unitPriceFormatted: string;
  lineTotalFormatted: string;
  imageUrl: string;
};

interface OrderItemsListProps {
  className?: string;
}

export function OrderItemsList({ className }: OrderItemsListProps) {
  // Static mock data for pure UI
  const items: OrderItem[] = [
    {
      id: "i1",
      name: "Window Frame - Oak 120cm",
      variant: "Oak / 120cm",
      quantity: 1,
      unitPriceFormatted: "$120.00",
      lineTotalFormatted: "$120.00",
      imageUrl: "/images/hero.jpg",
    },
    {
      id: "i2",
      name: "Handle Set - Matte Black",
      variant: "Standard",
      quantity: 2,
      unitPriceFormatted: "$14.00",
      lineTotalFormatted: "$28.00",
      imageUrl: "/next.svg",
    },
  ];

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
              <img
                src={item.imageUrl}
                alt=""
                className="h-12 w-12 shrink-0 rounded-md border object-cover"
              />
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{item.name}</div>
                <div className="text-muted-foreground text-xs">
                  {item.variant ? `${item.variant} • ` : null}Qty{" "}
                  {item.quantity}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-muted-foreground text-sm">
                {item.unitPriceFormatted}
              </div>
              <div className="text-sm font-semibold">
                {item.lineTotalFormatted}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
