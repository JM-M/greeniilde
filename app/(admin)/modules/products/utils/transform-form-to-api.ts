import { HttpTypes } from "@medusajs/types";
import { ProductFormValues } from "../schemas";

// TODO: Implement tags

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
    options: formValues.options.map((option) => ({
      title: option.name,
      values: option.values,
      metadata: { test: "hello world" },
    })),
    variants: formValues.variants.map((variant) => ({
      title: variant.title,
      sku: variant.sku || undefined,
      prices: variant.prices,
      options: variant.options,
      manage_inventory: true, // Enable inventory management
      allow_backorder: false, // Don't allow backorders by default
    })),
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
    options: formValues.options.map((option) => ({
      title: option.name,
      values: option.values,
    })),
    variants: formValues.variants.map((variant) => ({
      ...(variant.id && { id: variant.id }), // Include id if it exists (for updates)
      title: variant.title,
      sku: variant.sku || undefined,
      prices: variant.prices,
      options: variant.options,
      manage_inventory: true, // Enable inventory management
      allow_backorder: false, // Don't allow backorders by default
    })),
    // tags: formValues.tags?.map((tag) => ({ value: tag })) || [],
    categories: formValues.category ? [{ id: formValues.category }] : [],
  };
};
