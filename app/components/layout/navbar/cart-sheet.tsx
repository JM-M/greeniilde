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
import { CURRENCY_CODE } from "@/app/constants/api";
import { useCartSheet } from "@/app/contexts/cart-sheet-context";
import { convertToLocale } from "@/app/lib/utils";
import { useSuspenseRetrieveCart } from "@/app/modules/cart/hooks/use-cart-queries";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartItem } from "./cart-item";

type CartSheetProps = {
  className?: string;
};

export function CartSheet({ className }: CartSheetProps) {
  const { open, setOpen } = useCartSheet();

  const router = useRouter();

  const { items, numCartItems, cart, subtotal, total } =
    useSuspenseRetrieveCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader className="p-4">
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription>
            {numCartItems === 1 ? "1 item" : `${numCartItems} items`} in your
            cart
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
                  price={String(item.total)}
                  quantity={item.quantity}
                  imageUrl={item.thumbnail}
                />
              ))
            )}
          </div>
        </ScrollArea>

        <SheetFooter className="gap-3 p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Subtotal</span>
            <span className="text-lg font-semibold">
              {convertToLocale({
                amount: subtotal,
                currencyCode: cart?.currency_code || CURRENCY_CODE,
              })}
            </span>
          </div>
          <Button className="h-12 w-full" asChild>
            <Link
              href="/checkout"
              onClick={() => {
                router.push("/checkout");
                setOpen(false);
              }}
            >
              Proceed to checkout
              <ArrowRightIcon />
            </Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
