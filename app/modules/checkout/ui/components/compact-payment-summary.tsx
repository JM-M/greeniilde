"use client";

import { convertToLocale } from "@/app/lib/utils";
import { useRetrieveCart } from "@/app/modules/cart/hooks/use-cart-queries";

export const CompactPaymentSummary = ({
  isShippingAddressValid = true,
  isShippingMethodSelected = false,
  cartId,
  isUpdatingAddress = false,
  isSettingShippingMethod = false,
}: {
  isShippingAddressValid?: boolean;
  isShippingMethodSelected?: boolean;
  cartId?: string;
  isUpdatingAddress?: boolean;
  isSettingShippingMethod?: boolean;
}) => {
  const {
    subtotal,
    shipping_total,
    total,
    tax_total,
    cart,
    isLoading,
    isFetching,
  } = useRetrieveCart({
    cartId,
  });

  const currencyCode = cart?.currency_code || "ngn";

  const showTotals = isShippingAddressValid && isShippingMethodSelected;
  const showSkeleton =
    isFetching || isUpdatingAddress || isSettingShippingMethod;

  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Subtotal</span>
        <span>
          {convertToLocale({
            amount: subtotal,
            currencyCode: currencyCode,
          })}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Shipping</span>
        <span>
          {showSkeleton ? (
            <div className="bg-accent h-4 w-20 animate-pulse rounded" />
          ) : showTotals ? (
            convertToLocale({
              amount: shipping_total,
              currencyCode: currencyCode,
            })
          ) : (
            "-"
          )}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Tax</span>
        <span>
          {showSkeleton ? (
            <div className="bg-accent h-4 w-20 animate-pulse rounded" />
          ) : showTotals ? (
            convertToLocale({
              amount: tax_total,
              currencyCode: currencyCode,
            })
          ) : (
            "-"
          )}
        </span>
      </div>
      <div className="border-t pt-2 text-base font-semibold">
        <div className="flex items-center justify-between">
          <span>Total</span>
          <span>
            {showSkeleton ? (
              <div className="bg-accent h-5 w-24 animate-pulse rounded" />
            ) : showTotals ? (
              convertToLocale({
                amount: total,
                currencyCode: currencyCode,
              })
            ) : (
              "-"
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export const CompactPaymentSummarySkeleton = () => {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Subtotal</span>
        <div className="bg-accent h-4 w-20 animate-pulse rounded" />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Shipping</span>
        <div className="bg-accent h-4 w-20 animate-pulse rounded" />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Tax</span>
        <div className="bg-accent h-4 w-20 animate-pulse rounded" />
      </div>
      <div className="border-t pt-2 text-base font-semibold">
        <div className="flex items-center justify-between">
          <span>Total</span>
          <div className="bg-accent h-5 w-24 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
};
