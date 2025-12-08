import { HttpTypes } from "@medusajs/types";
import { ProductFormValues } from "../schemas";

type InventoryLevelUpdate = {
  inventory_item_id: string;
  location_id: string;
  stocked_quantity: number;
};

type BatchInventoryPayload = {
  create: InventoryLevelUpdate[];
  delete: never[];
  update: InventoryLevelUpdate[];
};

/**
 * Build inventory batch payload for updating an existing product.
 * Separates variants into creates (new levels) and updates (existing levels).
 */
export const buildInventoryUpdatePayload = (
  values: ProductFormValues,
  defaultLocationId: string,
): BatchInventoryPayload | null => {
  const variantsWithInventory = values.variants.filter(
    (v) => v.inventory_item_id && v.available !== undefined,
  );

  // Separate into create (no existing level) and update (has existing level)
  const create = variantsWithInventory
    .filter((v) => !v.has_inventory_level)
    .map((v) => ({
      inventory_item_id: v.inventory_item_id!,
      location_id: defaultLocationId,
      stocked_quantity: v.available!,
    }));

  const update = variantsWithInventory
    .filter((v) => v.has_inventory_level)
    .map((v) => ({
      inventory_item_id: v.inventory_item_id!,
      location_id: defaultLocationId,
      stocked_quantity: v.available!,
    }));

  if (create.length === 0 && update.length === 0) {
    return null;
  }

  return { create, delete: [], update };
};

/**
 * Build inventory batch payload for creating a new product.
 * Uses the created product response to get inventory item IDs.
 */
export const buildInventoryCreatePayload = (
  values: ProductFormValues,
  createdVariants: HttpTypes.AdminProductVariant[],
  defaultLocationId: string,
): BatchInventoryPayload | null => {
  if (createdVariants.length === 0) {
    return null;
  }

  const inventoryCreates: InventoryLevelUpdate[] = [];

  // Check if using simple product (defaultVariant) or multi-variant
  const isSimpleProduct = values.variants.length === 0;

  if (isSimpleProduct) {
    // Simple product: use defaultVariant.inventory
    const inventoryQty = values.defaultVariant?.inventory;
    if (inventoryQty !== undefined && inventoryQty > 0) {
      const firstVariant = createdVariants[0];
      const inventoryItemId = (firstVariant as any)?.inventory_items?.[0]
        ?.inventory_item_id;

      if (inventoryItemId) {
        inventoryCreates.push({
          inventory_item_id: inventoryItemId,
          location_id: defaultLocationId,
          stocked_quantity: inventoryQty,
        });
      }
    }
  } else {
    // Multi-variant: use variants[].available
    values.variants.forEach((formVariant, index) => {
      if (formVariant.available !== undefined && formVariant.available > 0) {
        const createdVariant = createdVariants[index];
        const inventoryItemId = (createdVariant as any)?.inventory_items?.[0]
          ?.inventory_item_id;

        if (inventoryItemId) {
          inventoryCreates.push({
            inventory_item_id: inventoryItemId,
            location_id: defaultLocationId,
            stocked_quantity: formVariant.available,
          });
        }
      }
    });
  }

  if (inventoryCreates.length === 0) {
    return null;
  }

  return { create: inventoryCreates, delete: [], update: [] };
};
