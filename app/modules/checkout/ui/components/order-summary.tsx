"use client";

import {
  Item,
  ItemContent,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/app/components/ui/item";
import { convertToLocale } from "@/app/lib/utils";
import { useRetrieveCart } from "@/app/modules/cart/hooks/use-cart-queries";

export const OrderSummary = ({ cartId }: { cartId?: string }) => {
  const { cart } = useRetrieveCart({ cartId });
  // console.log(cart);

  return (
    <div>
      <div className="text-base font-semibold">Order summary</div>

      <div className="mt-3 flex flex-col gap-3">
        {cart?.items?.map((item) => {
          return (
            <Item
              key={item.id}
              variant="outline"
              size="sm"
              className="h-fit p-2"
            >
              <ItemMedia
                variant="image"
                className="aspect-square size-14 self-center rounded-lg"
              >
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.product_title}
                    className="size-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="bg-muted size-full" />
                )}
              </ItemMedia>
              <ItemContent className="min-w-0 gap-2">
                <ItemHeader>
                  <ItemTitle className="truncate">
                    {item.product_title}
                  </ItemTitle>
                  <span className="text-sm font-medium">
                    {convertToLocale({
                      amount: item.unit_price,
                      currency_code: cart.currency_code,
                    })}
                  </span>
                </ItemHeader>
                <ItemFooter>
                  <span className="text-muted-foreground text-sm">
                    Qty {item.quantity}
                  </span>
                </ItemFooter>
              </ItemContent>
            </Item>
          );
        })}
      </div>
    </div>
  );
};
