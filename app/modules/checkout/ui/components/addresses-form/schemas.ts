import { addressSchema } from "@/app/modules/checkout/ui/components/addresses-form/address-fields";
import { z } from "zod";

export const addressesFormSchema = z.discriminatedUnion("sameAsShipping", [
  z.object({
    sameAsShipping: z.literal(true),
    shipping: addressSchema,
    billing: z.any(),
  }),
  z.object({
    sameAsShipping: z.literal(false),
    shipping: addressSchema,
    billing: addressSchema,
  }),
]);

export type ShippingFormValues = z.infer<typeof addressesFormSchema>;
