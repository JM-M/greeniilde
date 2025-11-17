"use client";

import { cn } from "@/app/lib/utils";
import { ShoppingCart } from "lucide-react";
import { Button } from "../../ui/button";
import { useCartSheet } from "./cart-sheet-context";

type CartButtonProps = {
  count?: number;
  className?: string;
};

export function CartButton({ count = 0, className }: CartButtonProps) {
  const { setOpen } = useCartSheet();
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Open cart"
      className={cn("relative", className)}
      onClick={() => setOpen(true)}
    >
      <ShoppingCart />
      <span
        aria-hidden="true"
        className="bg-primary absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full text-[10px] leading-none text-white"
      >
        {count}
      </span>
    </Button>
  );
}
