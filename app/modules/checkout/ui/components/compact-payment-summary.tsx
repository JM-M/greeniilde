"use client";

import { CURRENCY_CODE } from "@/app/constants/api";
import { convertToLocale } from "@/app/lib/utils";
import { useSuspenseRetrieveCart } from "@/app/modules/cart/hooks/use-cart-queries";

export const CompactPaymentSummary = ({
  isShippingAddressValid = true,
  isShippingMethodSelected = false,
}: {
  isShippingAddressValid?: boolean;
  isShippingMethodSelected?: boolean;
}) => {
  const { subtotal, shipping_total, total, tax_total, cart } =
    useSuspenseRetrieveCart();

  const currencyCode = cart?.currency_code || CURRENCY_CODE;

  const showTotals = isShippingAddressValid && isShippingMethodSelected;

  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Subtotal</span>
        <span>
          {convertToLocale({
            amount: subtotal,
            currency_code: currencyCode,
          })}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Shipping</span>
        <span>
          {showTotals
            ? convertToLocale({
                amount: shipping_total,
                currency_code: currencyCode,
              })
            : "-"}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Tax</span>
        <span>
          {showTotals
            ? convertToLocale({
                amount: tax_total,
                currency_code: currencyCode,
              })
            : "-"}
        </span>
      </div>
      <div className="border-t pt-2 text-base font-semibold">
        <div className="flex items-center justify-between">
          <span>Total</span>
          <span>
            {showTotals
              ? convertToLocale({
                  amount: total,
                  currency_code: currencyCode,
                })
              : "-"}
          </span>
        </div>
      </div>
    </div>
  );
};
