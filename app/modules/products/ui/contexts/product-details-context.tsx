"use client";

import { HttpTypes } from "@medusajs/types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type ProductDetailsState = {
  // Selected configuration values (e.g., { color: "Red", size: "Large" })
  selectedConfigurations: Record<string, string>;
  // Derived: currently selected variant based on configurations
  selectedVariant?: HttpTypes.StoreProductVariant | undefined;
  product: HttpTypes.StoreProduct;
};

type ProductDetailsContextValue = ProductDetailsState & {
  // Update a specific configuration
  setConfiguration: (configId: string, value: string) => void;
  // Update all configurations at once
  setSelectedConfigurations: (
    selectedConfigurations: Record<string, string>,
  ) => void;
  // Reset to initial state
  reset: (initialSelectedConfigurations?: Record<string, string>) => void;
};

const ProductDetailsContext = createContext<
  ProductDetailsContextValue | undefined
>(undefined);

type ProductDetailsProviderProps = {
  children: React.ReactNode;
  initialSelectedConfigurations?: Record<string, string>;
  product: HttpTypes.StoreProduct; // Add product prop to compute variant
};

export function ProductDetailsProvider({
  children,
  initialSelectedConfigurations = {},
  product, // Add product parameter
}: ProductDetailsProviderProps) {
  const [selectedConfigurations, setSelectedConfigurationsState] = useState<
    Record<string, string>
  >(initialSelectedConfigurations);

  const setConfiguration = useCallback((configId: string, value: string) => {
    setSelectedConfigurationsState((prev) => ({ ...prev, [configId]: value }));
  }, []);

  const setSelectedConfigurations = useCallback(
    (newSelectedConfigurations: Record<string, string>) => {
      setSelectedConfigurationsState(newSelectedConfigurations);
    },
    [],
  );

  const reset = useCallback((newInitialSelectedConfigurations = {}) => {
    setSelectedConfigurationsState(newInitialSelectedConfigurations);
  }, []);

  // Compute selected variant based on current configurations
  const selectedVariant = useMemo(() => {
    if (
      !product?.variants ||
      Object.keys(selectedConfigurations).length === 0
    ) {
      return undefined;
    }

    // Find variant that matches all selected configurations
    return product.variants.find((variant: any) => {
      // Check if this variant matches all selected configuration options
      return Object.entries(selectedConfigurations).every(
        ([optionId, value]) => {
          return variant.options?.some(
            (opt: any) => opt.option_id === optionId && opt.value === value,
          );
        },
      );
    });
  }, [selectedConfigurations, product?.variants]);

  const value: ProductDetailsContextValue = {
    product,
    selectedConfigurations,
    selectedVariant, // Add computed variant
    setConfiguration,
    setSelectedConfigurations,
    reset,
  };

  return (
    <ProductDetailsContext.Provider value={value}>
      {children}
    </ProductDetailsContext.Provider>
  );
}

export function useProductDetailsContext() {
  const ctx = useContext(ProductDetailsContext);
  if (!ctx) {
    throw new Error(
      "useProductDetails must be used within ProductDetailsProvider",
    );
  }
  return ctx;
}
