import { CURRENCY_CODE } from "@/app/constants/api";
import { ProductIndexDocument } from "../types";

/**
 * Gets the price range for a product from its variants
 * @param product - The product to get price range for
 * @returns An object with min and max prices, or null if no prices available
 */
export function getProductPriceRange(product: ProductIndexDocument): {
  min: number;
  max: number;
} | null {
  if (!product.variants || product.variants.length === 0) {
    return null;
  }

  const allPrices: number[] = [];

  // Collect all prices from all variants
  for (const variant of product.variants) {
    if (variant.prices && variant.prices.length > 0) {
      allPrices.push(...variant.prices);
    }
  }

  if (allPrices.length === 0) {
    return null;
  }

  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  return {
    min: minPrice,
    max: maxPrice,
  };
}

/**
 * Formats a price range for display
 * @param priceRange - The price range object from getProductPriceRange
 * @param currency - The currency code (default: CURRENCY_CODE from api constants)
 * @returns Formatted price string
 */
export function formatPriceRange(
  priceRange: { min: number; max: number } | null,
  currency: string = CURRENCY_CODE,
): string {
  if (!priceRange) {
    return "Price not available";
  }

  const { min, max } = priceRange;

  // Format prices with commas
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US").format(price);
  };

  if (min === max) {
    // Same price for all variants
    return `${currency} ${formatPrice(min)}`;
  } else {
    // Price range
    return `${currency} ${formatPrice(min)} - ${currency} ${formatPrice(max)}`;
  }
}
