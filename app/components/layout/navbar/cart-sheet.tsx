"use client";

import { Button } from "@/app/components/ui/button";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/components/ui/sheet";
import { CartItem } from "./cart-item";
import { useCartSheet } from "./cart-sheet-context";

type CartLineItem = {
  id: string;
  title: string;
  price: string;
  quantity: number;
  imageUrl?: string;
};

type CartSheetProps = {
  className?: string;
  count?: number;
  items?: CartLineItem[];
  subtotal?: string;
  onChangeQuantity?: (id: string, next: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
};

export function CartSheet({
  className,
  count = 0,
  items = [],
  subtotal = "$0.00",
  onChangeQuantity,
  onRemoveItem,
  onCheckout,
}: CartSheetProps) {
  const { open, setOpen } = useCartSheet();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader className="p-4">
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription>
            {count === 1 ? "1 item" : `${count} items`} in your cart
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="px-4">
          <div className="flex flex-col gap-3 pb-4">
            {items.length === 0 ? (
              <div className="text-muted-foreground py-8 text-sm">
                Your cart is empty.
              </div>
            ) : (
              items.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  quantity={item.quantity}
                  imageUrl={item.imageUrl}
                  onChangeQuantity={(q) =>
                    onChangeQuantity ? onChangeQuantity(item.id, q) : undefined
                  }
                  onRemove={() =>
                    onRemoveItem ? onRemoveItem(item.id) : undefined
                  }
                />
              ))
            )}
          </div>
        </ScrollArea>

        <SheetFooter className="gap-3 p-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Subtotal</span>
            <span className="text-base font-semibold">{subtotal}</span>
          </div>
          <Button className="w-full" onClick={onCheckout}>
            Checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
