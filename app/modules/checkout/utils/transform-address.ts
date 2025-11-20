import { SetAddressesParams } from "@/app/lib/api/cart";
import { AddressFormValues } from "@/app/modules/checkout/ui/components/shipping-address-form/address-fields";
import type { ShippingFormValues } from "../ui/components/shipping-address-form";

/**
 * Transforms shipping form values into the format expected by setCartAddresses
 */
export function transformFormValuesToAddresses(
  formValues: ShippingFormValues,
  cartId: string,
): SetAddressesParams {
  const mapAddress = (values: AddressFormValues) => ({
    first_name: values.firstName,
    last_name: values.lastName,
    address_1: values.addressLine1,
    address_2: values.addressLine2 || "",
    city: values.city,
    postal_code: values.postalCode,
    country_code: values.countryCode.toLowerCase(),
    province: values.state || "",
    phone: values.phone || "",
    company: values.company || "",
  });

  const shippingAddress = mapAddress(formValues.shipping);
  const billingAddress =
    formValues.sameAsShipping || !formValues.billing
      ? shippingAddress
      : mapAddress(formValues.billing);

  return {
    shipping_address: shippingAddress,
    billing_address: billingAddress,
    email: formValues.shipping.email,
    cartId,
  };
}
