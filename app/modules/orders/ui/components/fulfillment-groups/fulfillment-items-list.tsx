type FulfillmentItem = {
  id: string;
  name: string;
  qty: number;
  imageUrl: string;
};

export function FulfillmentItemsList({ items }: { items: FulfillmentItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3">
          <img
            src={item.imageUrl}
            alt=""
            className="h-10 w-10 shrink-0 rounded-md border object-cover"
          />
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">{item.name}</div>
            <div className="text-muted-foreground text-xs">Qty {item.qty}</div>
          </div>
        </div>
      ))}
    </div>
  );
}


