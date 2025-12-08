"use client";

import { CURRENCY_CODE } from "@/app/constants/api";
import { z } from "zod";

// Price structure for single currency (CURRENCY_CODE)
const priceSchema = z.object({
  currency_code: z.literal(CURRENCY_CODE),
  amount: z.number().min(0),
});

// Product option (like Size, Color)
const productOptionSchema = z.object({
  name: z.string().min(1, "Option name is required"),
  values: z.array(z.string().min(1)).min(1, "At least one value is required"),
});

// Product variant with prices
const productVariantSchema = z.object({
  id: z.string().optional(), // For existing variants
  title: z.string().min(1, "Variant title is required"),
  sku: z.string().optional(),
  options: z.record(z.string(), z.string()), // e.g., { Size: "M", Color: "Red" }
  prices: z.array(priceSchema),
  // Note: inventory_quantity is managed separately through inventory items in Medusa
});

// Updated product form schema
export const productFormSchema = z.object({
  title: z.string().min(1, "Please enter a title"),
  description: z.string().optional(),
  status: z.enum(["draft", "proposed", "published", "rejected"]),
  media: z.array(z.string()).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),

  // Default variant fields (used when variants are disabled)
  defaultVariant: z
    .object({
      price: z.number().min(0).optional(),
      inventory: z.number().min(0).optional(),
    })
    .optional(),

  // Variant-related fields (used when variants are enabled)
  options: z.array(productOptionSchema),
  variants: z.array(productVariantSchema),
  shipping: z.object({
    package: z.string().optional(),
    weight: z.number().min(0).optional(),
  }),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
export type ProductOption = z.infer<typeof productOptionSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
export type Price = z.infer<typeof priceSchema>;
