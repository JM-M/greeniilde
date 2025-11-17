"use client";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/app/components/ui/item";
import { cn } from "@/app/lib/utils";
import { ProductQuantityControls } from "@/app/modules/products/ui/components/product-quantity-controls";
import { Trash2Icon } from "lucide-react";
import { Button } from "../../ui/button";

type CartItemProps = {
  id: string;
  title: string;
  price: string;
  quantity: number;
  imageUrl?: string;
  className?: string;
  onChangeQuantity: (next: number) => void;
  onRemove: () => void;
};

export function CartItem({
  title,
  price,
  quantity,
  imageUrl,
  className,
  onChangeQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <Item variant="outline" size="sm" className={cn("h-fit p-2", className)}>
      <ItemMedia
        variant="image"
        className="aspect-square size-14 self-center rounded-lg"
      >
        {imageUrl ? (
          <img src={imageUrl} alt={title} />
        ) : (
          <div className="bg-muted size-full" />
        )}
      </ItemMedia>
      <ItemContent className="min-w-0 gap-2">
        <ItemHeader>
          <ItemTitle className="truncate">{title}</ItemTitle>
          <span className="text-sm font-medium">{price}</span>
        </ItemHeader>
        <ItemFooter>
          <ProductQuantityControls
            minusButtonProps={{ size: "icon-sm" }}
            plusButtonProps={{ size: "icon-sm" }}
            inputProps={{ className: "h-8" }}
            value={quantity}
            onChange={onChangeQuantity}
            min={1}
            className="w-auto"
          />

          <ItemActions className="basis-full gap-2 sm:basis-auto">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onRemove}
              aria-label="Remove from cart"
              title="Remove"
            >
              <Trash2Icon />
            </Button>
          </ItemActions>
        </ItemFooter>
      </ItemContent>
    </Item>
  );
}
