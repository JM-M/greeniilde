"use client";

import { useState } from "react";

import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";
import { ProductQuantityControls } from "./product-quantity-controls";

type ProductPurchaseControlsProps = {
  className?: string;
};

export const ProductPurchaseControls = ({
  className,
}: ProductPurchaseControlsProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className={cn("flex gap-2", className)}>
      <ProductQuantityControls
        value={quantity}
        onChange={setQuantity}
        min={1}
      />
      <Button className="flex-1" type="button">
        Add to cart
      </Button>
    </div>
  );
};
