import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { cn, convertToLocale } from "@/app/lib/utils";
import { useSetCartShippingMethod } from "@/app/modules/cart/hooks/use-cart-mutations";
import {
  useListCartShippingMethodsQuery,
  useRetrieveCart,
} from "@/app/modules/cart/hooks/use-cart-queries";
import { useTerminalRates } from "@/app/modules/terminal/hooks/use-terminal-queries";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type DeliveryFormValues = {
  rateId: string;
};

// TODO: Sync selected method with cart.shipping_methods[0]. Note that a free rate is always generated.

export const DeliveryMethods = ({
  isShippingAddressValid = true,
  onMethodSelected,
  cartId,
  isUpdatingAddress,
  setIsSettingShippingMethod,
}: {
  isShippingAddressValid?: boolean;
  onMethodSelected?: (isSelected: boolean) => void;
  cartId?: string;
  isUpdatingAddress?: boolean;
  setIsSettingShippingMethod?: (isSetting: boolean) => void;
}) => {
  const { cart } = useRetrieveCart({ cartId });

  const {
    data: terminalRatesData,
    isLoading,
    isFetching,
  } = useTerminalRates(
    cart?.id || "",
    {
      items: cart?.items,
      shipping_address: cart?.shipping_address,
    },
    {
      enabled:
        !!cart?.id &&
        !!cart?.shipping_address &&
        !!cart.email &&
        isShippingAddressValid,
    },
  );

  const rates = terminalRatesData?.rates || [];

  const { data: shippingOptions } = useListCartShippingMethodsQuery(
    cart?.id || "",
    {
      enabled: !!cart?.id,
    },
  );

  const { mutate: setCartShippingMethod, isPending: isSettingMethod } =
    useSetCartShippingMethod();

  const form = useForm<DeliveryFormValues>({
    defaultValues: { rateId: "" },
    mode: "onSubmit",
  });

  // Clear selected rate when shipping address changes
  useEffect(() => {
    form.setValue("rateId", "");
    if (onMethodSelected) {
      onMethodSelected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(cart?.shipping_address), form, onMethodSelected]);

  const selectedRateId = form.getValues("rateId");
  // Initialize selection state
  useEffect(() => {
    if (onMethodSelected && selectedRateId) {
      onMethodSelected(true);
    }
  }, [onMethodSelected, selectedRateId]);

  // If the current cart shipping method is not one of the current methods
  // set isShippingMethodSelected to false
  useEffect(() => {
    if (onMethodSelected && !rates.find((r) => r.rate_id === selectedRateId)) {
      onMethodSelected(false);
    }
  }, [rates, selectedRateId]);

  if (isLoading || isFetching || isUpdatingAddress) {
    return <DeliveryMethodsSkeleton />;
  }

  const handleRateChange = (rateId: string) => {
    const rate = rates.find((r) => r.rate_id === rateId);
    if (!rate || !cart?.id) return;

    // Find the corresponding shipping option
    // We strictly look for the option belonging to the 'fulfillment-terminal' provider
    const targetShippingOption = shippingOptions?.find(
      (so) => so.provider_id === "fulfillment-terminal_fulfillment-terminal",
    );

    if (
      targetShippingOption &&
      terminalRatesData?.pickup_address_id &&
      terminalRatesData?.delivery_address_id &&
      terminalRatesData?.parcel_id
    ) {
      // Set loading state BEFORE mutation
      if (setIsSettingShippingMethod) {
        setIsSettingShippingMethod(true);
      }

      setCartShippingMethod(
        {
          cartId: cart.id,
          shippingMethodId: targetShippingOption.id,
          data: {
            terminal_rate_id: rate.rate_id,
            terminal_pickup_address_id: terminalRatesData.pickup_address_id,
            terminal_delivery_address_id: terminalRatesData.delivery_address_id,
            terminal_parcel_id: terminalRatesData.parcel_id,
            terminal_rate: rate,
          },
        },
        {
          onSettled: () => {
            // Reset loading state when mutation completes
            if (setIsSettingShippingMethod) {
              setIsSettingShippingMethod(false);
            }
          },
        },
      );
    }

    form.setValue("rateId", rateId);
    if (onMethodSelected) {
      onMethodSelected(true);
    }
  };

  let content = (
    <div className="text-muted-foreground text-sm">
      No delivery methods available for this address.
    </div>
  );

  if (!isShippingAddressValid) {
    content = (
      <div className="text-muted-foreground text-sm">
        Complete delivery address form to get delivery rates.
      </div>
    );
  } else if (rates.length) {
    content = (
      <FormField
        control={form.control}
        name="rateId"
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={(val) => {
                    handleRateChange(val);
                  }}
                  defaultValue={field.value}
                  className="flex flex-col gap-2"
                  disabled={isSettingMethod}
                >
                  {rates.map((rate) => (
                    <FormItem
                      key={rate.rate_id}
                      className={cn(
                        "flex items-center space-y-0 space-x-3 rounded-lg border p-3",
                        { "border-primary": field.value === rate.rate_id },
                      )}
                    >
                      <FormControl>
                        <RadioGroupItem value={rate.rate_id} />
                      </FormControl>
                      <FormLabel className="flex flex-1 cursor-pointer items-center gap-3 font-normal">
                        <Image
                          src={rate.carrier_logo}
                          alt={rate.carrier_name}
                          className="size-16 rounded-md"
                          height={64}
                          width={64}
                        />
                        <div className="flex-1">
                          <div className="text-base font-medium">
                            {rate.carrier_name}
                          </div>
                          <div className="text-muted-foreground flex items-center justify-between text-sm">
                            <span>{rate.delivery_time}</span>
                            <span>
                              {convertToLocale({
                                amount: rate.amount,
                                currencyCode: rate.currency,
                              })}
                            </span>
                          </div>
                        </div>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          );
        }}
      />
    );
  }

  return (
    <Form {...form}>
      <div className="flex flex-col gap-3">
        <div className="text-base font-semibold">Delivery method</div>

        {content}
      </div>
    </Form>
  );
};

export const DeliveryMethodsSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-base font-semibold">Delivery method</div>

      <div className="flex flex-col gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center space-y-0 space-x-3 rounded-lg border p-3"
          >
            <div className="bg-accent size-4 animate-pulse rounded-full" />
            <div className="bg-accent size-16 animate-pulse rounded-md" />
            <div className="flex flex-1 flex-col gap-2">
              <div className="bg-accent h-5 w-32 animate-pulse rounded" />
              <div className="flex items-center justify-between">
                <div className="bg-accent h-4 w-24 animate-pulse rounded" />
                <div className="bg-accent h-4 w-16 animate-pulse rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
