import { DEFAULT_COUNTRY_CODE } from "@/app/constants/terminal";
import { HttpTypes } from "@medusajs/types";
import { ShippingFormValues } from "./schemas";

export const initialAddress = {
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

export const getDefaultValues = (
  cart: HttpTypes.StoreCart | undefined,
): ShippingFormValues => {
  const isSameAsShipping =
    !cart?.billing_address ||
    (!!cart?.shipping_address &&
      cart.billing_address.first_name === cart.shipping_address.first_name &&
      cart.billing_address.last_name === cart.shipping_address.last_name &&
      cart.billing_address.address_1 === cart.shipping_address.address_1 &&
      cart.billing_address.address_2 === cart.shipping_address.address_2 &&
      cart.billing_address.company === cart.shipping_address.company &&
      cart.billing_address.postal_code === cart.shipping_address.postal_code &&
      cart.billing_address.city === cart.shipping_address.city &&
      cart.billing_address.country_code ===
        cart.shipping_address.country_code &&
      cart.billing_address.province === cart.shipping_address.province &&
      cart.billing_address.phone === cart.shipping_address.phone);

  return {
    shipping: {
      firstName: cart?.shipping_address?.first_name || "",
      lastName: cart?.shipping_address?.last_name || "",
      email: cart?.email || "",
      phone: cart?.shipping_address?.phone || "",
      addressLine1: cart?.shipping_address?.address_1 || "",
      addressLine2: cart?.shipping_address?.address_2 || "",
      company: cart?.shipping_address?.company || "",
      postalCode: cart?.shipping_address?.postal_code || "",
      city: cart?.shipping_address?.city || "",
      countryCode:
        cart?.shipping_address?.country_code?.toUpperCase() ||
        DEFAULT_COUNTRY_CODE,
      state: cart?.shipping_address?.province || "",
    },
    sameAsShipping: isSameAsShipping,
    billing: cart?.billing_address
      ? {
          firstName: cart?.billing_address?.first_name || "",
          lastName: cart?.billing_address?.last_name || "",
          email: cart?.email || "",
          phone: cart?.billing_address?.phone || "",
          addressLine1: cart?.billing_address?.address_1 || "",
          addressLine2: cart?.billing_address?.address_2 || "",
          company: cart?.billing_address?.company || "",
          postalCode: cart?.billing_address?.postal_code || "",
          city: cart?.billing_address?.city || "",
          countryCode:
            cart?.billing_address?.country_code?.toUpperCase() ||
            DEFAULT_COUNTRY_CODE,
          state: cart?.billing_address?.province || "",
        }
      : null,
  } as ShippingFormValues;
};
