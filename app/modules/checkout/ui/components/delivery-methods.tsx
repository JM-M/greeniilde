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
  useSuspenseRetrieveCart,
} from "@/app/modules/cart/hooks/use-cart-queries";
import { useTerminalRates } from "@/app/modules/terminal/hooks/use-terminal-queries";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";

type DeliveryFormValues = {
  rateId: string;
};

// TODO: Sync selected method with cart.shipping_methods[0]. Note that a free rate is always generated.

export const DeliveryMethods = () => {
  const { cart } = useSuspenseRetrieveCart();

  const { data: terminalRatesData, isLoading } = useTerminalRates(
    cart?.id || "",
    {
      enabled: !!cart?.id && !!cart?.shipping_address,
    },
  );

  const { data: shippingOptions } = useListCartShippingMethodsQuery(
    cart?.id || "",
  );

  const { mutate: setCartShippingMethod, isPending: isSettingMethod } =
    useSetCartShippingMethod();

  const form = useForm<DeliveryFormValues>({
    defaultValues: { rateId: "" },
    mode: "onSubmit",
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="text-muted-foreground size-6 animate-spin" />
      </div>
    );
  }

  const rates = terminalRatesData?.rates || [];

  const handleRateChange = (rateId: string) => {
    const rate = rates.find((r) => r.rate_id === rateId);
    if (!rate || !cart?.id) return;

    // Find the corresponding shipping option
    // We strictly look for the option belonging to the 'fulfillment-terminal' provider
    const targetShippingOption = shippingOptions?.find(
      (so) => so.provider_id === "fulfillment-terminal_fulfillment-terminal",
    );

    if (targetShippingOption && terminalRatesData?.shipment?.shipment_id) {
      setCartShippingMethod({
        cartId: cart.id,
        shippingMethodId: targetShippingOption.id,
        data: {
          terminal_rate_id: rate.rate_id,
          terminal_shipment_id: terminalRatesData.shipment.shipment_id,
          terminal_rate: rate,
        },
      });
    }

    form.setValue("rateId", rateId);
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-3">
        <div className="text-base font-semibold">Delivery method</div>

        {rates.length === 0 ? (
          <div className="text-muted-foreground text-sm">
            No delivery methods available for this address.
          </div>
        ) : (
          <FormField
            control={form.control}
            name="rateId"
            render={({ field }) => (
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
                                  currency_code: rate.currency,
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
            )}
          />
        )}
      </div>
    </Form>
  );
};
