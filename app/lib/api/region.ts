"use server";

import { sdk } from "../medusa/config";

/**
 * Get a region by ID
 * Public endpoint - no authentication required
 */
export async function getRegion(regionId: string) {
  return sdk.store.region.retrieve(regionId);
}

/**
 * List all regions
 * Public endpoint - no authentication required
 */
export async function listRegions() {
  return sdk.store.region.list();
}
