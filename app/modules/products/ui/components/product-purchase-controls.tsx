"use client";

import { useState } from "react";

import { Button } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
import { useCartSheet } from "@/app/contexts/cart-sheet";
import { cn } from "@/app/lib/utils";
import {
  useAddToCart,
  useCreateBuyNowCart,
} from "@/app/modules/cart/hooks/use-cart-mutations";
import { BuyNowModal } from "@/app/modules/checkout/ui/components/buy-now-modal";
import { ShoppingBagIcon } from "lucide-react";
import { LiaTelegram } from "react-icons/lia";
import { SiWhatsapp } from "react-icons/si";
import { useProductDetailsContext } from "../contexts/product-details-context";
import { ProductQuantityControls } from "./product-quantity-controls";

type ProductPurchaseControlsProps = {
  className?: string;
};

export const ProductPurchaseControls = ({
  className,
}: ProductPurchaseControlsProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
  const [buyNowCartId, setBuyNowCartId] = useState<string | null>(null);

  const { setOpen: setCartSheetOpen } = useCartSheet();

  const addToCartMutation = useAddToCart();
  const { mutate: createBuyNowCart, isPending: isCreatingBuyNowCart } =
    useCreateBuyNowCart();
  const { selectedVariant, product } = useProductDetailsContext();

  const handleAddToCart = () => {
    if (!selectedVariant?.id) {
      return; // No variant selected
    }

    addToCartMutation.mutate(
      {
        variantId: selectedVariant.id,
        quantity,
      },
      {
        onSuccess: () => {
          setCartSheetOpen(true);
        },
      },
    );
  };

  const handleBuyNow = () => {
    if (!selectedVariant?.id || !product?.id) {
      return;
    }

    createBuyNowCart(
      {
        product_id: product.id,
        variant_id: selectedVariant.id,
      },
      {
        onSuccess: (cart) => {
          if (cart?.id) {
            setBuyNowCartId(cart.id);
            setIsBuyNowOpen(true);
          }
        },
        onError: (error) => {
          console.error("Failed to create buy now cart:", error);
        },
      },
    );
  };

  return (
    <div className="space-y-3">
      <div className={cn("flex gap-2", className)}>
        <ProductQuantityControls
          value={quantity}
          onChange={setQuantity}
          min={1}
          plusButtonProps={{ className: "h-10" }}
          minusButtonProps={{ className: "h-10" }}
          inputProps={{ className: "h-10" }}
        />
        <Button
          className="h-10 flex-1"
          type="button"
          onClick={handleAddToCart}
          disabled={addToCartMutation.isPending || !selectedVariant?.id}
        >
          <ShoppingBagIcon />
          {addToCartMutation.isPending ? "Adding..." : "Add to cart"}
        </Button>
      </div>
      <Button
        variant="outline"
        className="h-10 w-full border"
        onClick={handleBuyNow}
        disabled={isCreatingBuyNowCart || !selectedVariant?.id}
      >
        {isCreatingBuyNowCart ? "Preparing..." : "Buy now"}
      </Button>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button variant="outline" className="h-10">
          <SiWhatsapp />
          Buy on WhatsApp
        </Button>
        <Button variant="outline" className="h-10">
          <LiaTelegram />
          Buy on Telegram
        </Button>
      </div>
      <BuyNowModal
        open={isBuyNowOpen}
        onOpenChange={setIsBuyNowOpen}
        cartId={buyNowCartId}
      />
    </div>
  );
};

export const ProductPurchaseControlsSkeleton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className="space-y-3">
      <div className={cn("flex gap-2", className)}>
        {/* Quantity controls skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-10" />
        </div>
        {/* Add to cart button skeleton */}
        <Skeleton className="h-10 flex-1" />
      </div>
      {/* Buy now button skeleton */}
      <Skeleton className="h-10 w-full" />
      {/* Social buttons skeleton */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};
