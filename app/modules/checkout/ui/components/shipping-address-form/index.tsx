"use client";

import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/components/ui/form";
import { DEFAULT_COUNTRY_CODE } from "@/app/constants/terminal";
import { useSetCartAddresses } from "@/app/modules/cart/hooks/use-cart-mutations";
import { useSuspenseRetrieveCart } from "@/app/modules/cart/hooks/use-cart-queries";
import {
  AddressFields,
  addressSchema,
} from "@/app/modules/checkout/ui/components/shipping-address-form/address-fields";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CHECKOUT_STEPS } from "../../../constants";
import { useCheckoutStepParams } from "../../../hooks/use-checkout-step-param";
import { transformFormValuesToAddresses } from "../../../utils/transform-address";

const shippingFormSchema = z
  .object({
    shipping: addressSchema,
    sameAsShipping: z.boolean(),
    billing: addressSchema.nullable(),
  })
  .superRefine((data, ctx) => {
    if (!data.sameAsShipping && !data.billing) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Billing address is required",
        path: ["billing"],
      });
    }
  });

const initialAddress = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  company: "",
  postalCode: "",
  city: "",
  countryCode: DEFAULT_COUNTRY_CODE,
  state: "",
};

export type ShippingFormValues = z.infer<typeof shippingFormSchema>;

export const ShippingAddressForm = () => {
  const [_, setCheckoutStepParams] = useCheckoutStepParams();
  const { cart } = useSuspenseRetrieveCart();
  const { mutate: setCartAddresses, isPending: isSettingCartAddresses } =
    useSetCartAddresses();

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      shipping: initialAddress,
      sameAsShipping: true,
      billing: null,
    },
  });

  const sameAsShipping = form.watch("sameAsShipping");

  const onSubmit = (values: ShippingFormValues) => {
    if (!cart?.id) {
      console.error("No cart ID available");
      return;
    }

    const addressesData = transformFormValuesToAddresses(values, cart.id);
    setCartAddresses(addressesData, {
      onSuccess: () => {
        setCheckoutStepParams({
          step: CHECKOUT_STEPS[1],
        });
        toast.success("Shipping address set successfully");
      },
      onError: () => {
        toast.error("Failed to set shipping address");
      },
    });
  };

  return (
    <div>
      <h3 className="mb-5 text-xl font-semibold">Shipping Address</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <AddressFields prefix="shipping" />

          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="sameAsShipping"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        if (!checked) {
                          form.setValue("billing", initialAddress);
                        }
                      }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Billing address same as shipping address
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {!sameAsShipping && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <h3 className="mb-5 text-xl font-semibold">Billing Address</h3>
                <AddressFields prefix="billing" />
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSettingCartAddresses}
          >
            Proceed to delivery method
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
};
