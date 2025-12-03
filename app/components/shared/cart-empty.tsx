import { useCartSheet } from "@/app/contexts/cart-sheet-context";
import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export const CartEmpty = () => {
  const { setOpen } = useCartSheet();

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-y-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border">
        <ShoppingBagIcon className="text-muted-foreground h-8 w-8" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
      </div>
      <Button asChild className="mt-4" onClick={() => setOpen(false)}>
        <Link href="/products">Continue Shopping</Link>
      </Button>
    </div>
  );
};
