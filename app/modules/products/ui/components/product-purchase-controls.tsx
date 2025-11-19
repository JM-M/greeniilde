"use client";

import { useState } from "react";

import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";
import { useAddToCart } from "@/app/modules/cart/hooks/use-cart-mutations";
import { useProductDetailsContext } from "../contexts/product-details-context";
import { ProductQuantityControls } from "./product-quantity-controls";

type ProductPurchaseControlsProps = {
  className?: string;
};

export const ProductPurchaseControls = ({
  className,
}: ProductPurchaseControlsProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const addToCartMutation = useAddToCart();
  const { selectedVariant } = useProductDetailsContext();

  const handleAddToCart = () => {
    if (!selectedVariant?.id) {
      return; // No variant selected
    }

    addToCartMutation.mutate({
      variantId: selectedVariant.id,
      quantity,
    });
  };

  return (
    <div className={cn("flex gap-2", className)}>
      <ProductQuantityControls
        value={quantity}
        onChange={setQuantity}
        min={1}
      />
      <Button
        className="flex-1"
        type="button"
        onClick={handleAddToCart}
        disabled={addToCartMutation.isPending || !selectedVariant?.id}
      >
        {addToCartMutation.isPending ? "Adding..." : "Add to cart"}
      </Button>
    </div>
  );
};
