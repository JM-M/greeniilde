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
import { useSetCartAddresses } from "@/app/modules/cart/hooks/use-cart-mutations";
import { useRetrieveCart } from "@/app/modules/cart/hooks/use-cart-queries";
import { AddressFields } from "@/app/modules/checkout/ui/components/addresses-form/address-fields";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";
import { CHECKOUT_STEPS } from "../../../constants";
import { useCheckoutStepParams } from "../../../hooks/use-checkout-step-param";
import { transformFormValuesToAddresses } from "../../../utils/transform-address";
import { addressesFormSchema, ShippingFormValues } from "./schemas";
import { getDefaultValues, initialAddress } from "./utils";

export const AddressesForm = ({
  onSuccess,
  onValidityChange,
  submitButtonLabel = "Proceed to delivery method",
  autoSubmit = false,
  cartId,
  isUpdatingAddress,
  setIsUpdatingAddress,
}: {
  onSuccess?: () => void;
  onValidityChange?: (isValid: boolean) => void;
  submitButtonLabel?: string;
  autoSubmit?: boolean;
  cartId?: string;
  isUpdatingAddress?: boolean;
  setIsUpdatingAddress?: (isUpdating: boolean) => void;
}) => {
  const [_, setCheckoutStepParams] = useCheckoutStepParams();
  const { cart } = useRetrieveCart({ cartId });
  const { mutate: setCartAddresses, isPending: isSettingCartAddresses } =
    useSetCartAddresses();

  const defaultValues = useMemo(
    () => getDefaultValues(cart || undefined),
    [cart],
  );

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(addressesFormSchema),
    defaultValues,
    mode: "onChange",
  });

  // Update form values when cart changes (e.g. initial load)
  useEffect(() => {
    if (form.formState.isDirty) return;
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const sameAsShipping = form.watch("sameAsShipping");
  const values = form.watch();

  const debouncedSubmit = useDebouncedCallback(() => {
    console.log("auto updating");
    form.handleSubmit(onSubmit)();
  }, 500);

  useEffect(() => {
    const validation = addressesFormSchema.safeParse(values);
    const isValid = validation.success;

    if (onValidityChange) {
      onValidityChange(isValid);
    }

    // console.log({
    //   isDirty: form.formState.isDirty,
    //   notIsSubmitted: !form.formState.isSubmitted,
    //   autoSubmit,
    //   isValid,
    //   notIsSettingCartAddresses: !isSettingCartAddresses,
    // });
    if (
      form.formState.isDirty &&
      autoSubmit &&
      isValid &&
      !isSettingCartAddresses
    ) {
      debouncedSubmit();
    }
  }, [
    autoSubmit,
    isSettingCartAddresses,
    form,
    values,
    debouncedSubmit,
    onValidityChange,
  ]);

  const onSubmit = (values: ShippingFormValues) => {
    if (!cart?.id) {
      console.error("No cart ID available");
      return;
    }

    const addressesData = transformFormValuesToAddresses(values, cart.id);

    // Set loading state BEFORE mutation
    if (setIsUpdatingAddress) {
      setIsUpdatingAddress(true);
    }

    setCartAddresses(addressesData, {
      onSuccess: () => {
        if (onSuccess) {
          onSuccess();
        } else {
          setCheckoutStepParams({
            step: CHECKOUT_STEPS[1],
          });
        }
        toast.success("Shipping address set successfully");
        form.reset(values);
      },
      onError: () => {
        toast.error("Failed to set shipping address");
        form.reset(values);
      },
      onSettled: () => {
        // Reset loading state when mutation completes (success or error)
        if (setIsUpdatingAddress) {
          setIsUpdatingAddress(false);
        }
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
                <FormItem className="flex flex-row items-center space-y-0 space-x-3 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        if (!checked) {
                          form.setValue("billing", initialAddress);
                        } else {
                          form.setValue("billing", null);
                        }
                      }}
                      className="mr-1"
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

          {!autoSubmit && (
            <Button
              type="submit"
              className="w-full"
              disabled={isSettingCartAddresses}
            >
              {submitButtonLabel}
              {submitButtonLabel === "Proceed to delivery method" && (
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              )}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};
