import { CURRENCY_CODE } from "@/app/constants/api";
import { HttpTypes } from "@medusajs/types";
import { ProductFormValues } from "../schemas";

// TODO: Implement tags

// Constants for default variant/option names
const DEFAULT_OPTION_NAME = "Default option";
const DEFAULT_VARIANT_NAME = "Default variant";

/**
 * Check if form uses default variant (no explicit variants defined)
 */
const usesDefaultVariant = (formValues: ProductFormValues): boolean => {
  return formValues.variants.length === 0 && formValues.options.length === 0;
};

/**
 * Build options array - either from explicit options or create a default
 */
const buildOptions = (formValues: ProductFormValues) => {
  if (usesDefaultVariant(formValues)) {
    return [
      {
        title: DEFAULT_OPTION_NAME,
        values: [DEFAULT_VARIANT_NAME],
      },
    ];
  }
  return formValues.options.map((option) => ({
    title: option.name,
    values: option.values,
  }));
};

/**
 * Build variants array - either from explicit variants or create a default
 */
const buildVariants = (formValues: ProductFormValues) => {
  if (usesDefaultVariant(formValues)) {
    const dv = formValues.defaultVariant;
    return [
      {
        title: DEFAULT_VARIANT_NAME,
        prices: dv?.price
          ? [{ currency_code: CURRENCY_CODE, amount: dv.price }]
          : [],
        options: { [DEFAULT_OPTION_NAME]: DEFAULT_VARIANT_NAME },
        manage_inventory: true,
        allow_backorder: false,
      },
    ];
  }
  return formValues.variants.map((variant) => ({
    ...(variant.id && { id: variant.id }), // Include id if exists (for updates)
    title: variant.title,
    sku: variant.sku || undefined,
    prices: variant.prices,
    options: variant.options,
    manage_inventory: true,
    allow_backorder: false,
  }));
};

export const transformFormToCreateProduct = (
  formValues: ProductFormValues,
): HttpTypes.AdminCreateProduct => {
  return {
    title: formValues.title,
    ...(formValues.description && { description: formValues.description }),
    status: formValues.status,
    is_giftcard: false,
    discountable: true,
    thumbnail: formValues.media?.[0] || undefined,
    images: formValues.media?.map((url) => ({ url })) || [],
    handle: formValues.title.toLowerCase().replace(/\s+/g, "-"),
    weight: formValues.shipping.weight,
    options: buildOptions(formValues),
    variants: buildVariants(formValues),
    // tags: formValues.tags?.map((tag) => ({ value: tag })) || [],
    categories: formValues.category ? [{ id: formValues.category }] : [],
  };
};

export const transformFormToUpdateProduct = (
  formValues: ProductFormValues,
): HttpTypes.AdminUpdateProduct => {
  return {
    title: formValues.title,
    ...(formValues.description && { description: formValues.description }),
    status: formValues.status,
    thumbnail: formValues.media?.[0] || undefined,
    images: formValues.media?.map((url) => ({ url })) || [],
    handle: formValues.title.toLowerCase().replace(/\s+/g, "-"),
    weight: formValues.shipping.weight,
    options: buildOptions(formValues),
    variants: buildVariants(formValues),
    // tags: formValues.tags?.map((tag) => ({ value: tag })) || [],
    categories: formValues.category ? [{ id: formValues.category }] : [],
  };
};
