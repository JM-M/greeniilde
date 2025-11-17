"use client";

import {
  Item,
  ItemContent,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/app/components/ui/item";

export const OrderSummary = () => {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-base font-semibold">Order summary</div>

      <div className="mt-3 flex flex-col gap-3">
        <Item variant="outline" size="sm" className="h-fit p-2">
          <ItemMedia
            variant="image"
            className="aspect-square size-14 self-center rounded-lg"
          >
            <div className="bg-muted size-full" />
          </ItemMedia>
          <ItemContent className="min-w-0 gap-2">
            <ItemHeader>
              <ItemTitle className="truncate">Product name</ItemTitle>
              <span className="text-sm font-medium">$25.00</span>
            </ItemHeader>
            <ItemFooter>
              <span className="text-muted-foreground text-sm">Qty 1</span>
            </ItemFooter>
          </ItemContent>
        </Item>

        <Item variant="outline" size="sm" className="h-fit p-2">
          <ItemMedia
            variant="image"
            className="aspect-square size-14 self-center rounded-lg"
          >
            <div className="bg-muted size-full" />
          </ItemMedia>
          <ItemContent className="min-w-0 gap-2">
            <ItemHeader>
              <ItemTitle className="truncate">Another item</ItemTitle>
              <span className="text-sm font-medium">$15.00</span>
            </ItemHeader>
            <ItemFooter>
              <span className="text-muted-foreground text-sm">Qty 2</span>
            </ItemFooter>
          </ItemContent>
        </Item>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>$55.00</span>
        </div>
      </div>
    </div>
  );
};
